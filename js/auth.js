/* ============================================
   认证系统 - auth.js
   2位汉字用户名 + 4位PIN码登录
   ============================================ */

const Auth = (() => {
    const USERS_KEY = 'sa_users';
    const SESSION_KEY = 'sa_session';

    function getUsers() {
        try { return JSON.parse(localStorage.getItem(USERS_KEY) || '{}'); } catch { return {}; }
    }

    function saveUsers(users) {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    // Simple hash for PIN (not cryptographic, just obfuscation)
    function hashPin(pin) {
        let h = 0;
        const str = 'sa_' + pin + '_key';
        for (let i = 0; i < str.length; i++) {
            h = ((h << 5) - h) + str.charCodeAt(i);
            h = h & h;
        }
        return h.toString(36);
    }

    function isValidUsername(name) {
        return /^[\u4e00-\u9fff]{2}$/.test(name);
    }

    function isValidPin(pin) {
        return /^\d{4}$/.test(pin);
    }

    function register(username, pin) {
        if (!isValidUsername(username)) return { ok: false, error: 'usernameFormat' };
        if (!isValidPin(pin)) return { ok: false, error: 'pinFormat' };
        const users = getUsers();
        if (users[username]) return { ok: false, error: 'userExists' };
        users[username] = { hash: hashPin(pin), created: Date.now() };
        saveUsers(users);
        return { ok: true };
    }

    function login(username, pin) {
        if (!isValidUsername(username)) return { ok: false, error: 'usernameFormat' };
        if (!isValidPin(pin)) return { ok: false, error: 'pinFormat' };
        const users = getUsers();
        if (!users[username] || users[username].hash !== hashPin(pin)) {
            return { ok: false, error: 'wrongCredentials' };
        }
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({ username, time: Date.now() }));
        window.dispatchEvent(new CustomEvent('authChanged'));
        return { ok: true };
    }

    function logout() {
        sessionStorage.removeItem(SESSION_KEY);
        window.dispatchEvent(new CustomEvent('authChanged'));
    }

    function isLoggedIn() {
        try {
            const s = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');
            return !!(s && s.username);
        } catch { return false; }
    }

    function getUsername() {
        try {
            const s = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');
            return s?.username || null;
        } catch { return null; }
    }

    // Show login modal, call callback on success
    function requireLogin(callback) {
        if (isLoggedIn()) { callback?.(); return; }
        showLoginModal(callback);
    }

    function showLoginModal(callback) {
        // Remove existing modal if any
        document.getElementById('auth-modal')?.remove();

        let isRegisterMode = false;
        const t = I18n.t.bind(I18n);

        const modal = document.createElement('div');
        modal.id = 'auth-modal';
        modal.className = 'auth-modal open';

        function renderModal() {
            const title = isRegisterMode ? t('auth.registerTitle') : t('auth.loginTitle');
            const desc = isRegisterMode ? t('auth.registerDesc') : t('auth.loginDesc');
            const btnText = isRegisterMode ? t('auth.register') : t('auth.login');
            const switchText = isRegisterMode ? t('auth.switchToLogin') : t('auth.switchToRegister');

            modal.innerHTML = `
                <div class="auth-modal-overlay"></div>
                <div class="auth-modal-content">
                    <button class="modal-close auth-close-btn">✕</button>
                    <div class="auth-icon">🔐</div>
                    <h3 class="auth-title">${title}</h3>
                    <p class="auth-desc">${desc}</p>
                    <div class="auth-form">
                        <input type="text" class="auth-input" id="auth-username" placeholder="${t('auth.username')}" maxlength="2" autocomplete="off" />
                        <input type="password" class="auth-input" id="auth-pin" placeholder="${t('auth.pin')}" maxlength="4" inputmode="numeric" pattern="[0-9]*" autocomplete="off" />
                        <div class="auth-error" id="auth-error"></div>
                        <button class="auth-submit-btn" id="auth-submit">${btnText}</button>
                        <button class="auth-switch-btn" id="auth-switch">${switchText}</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            // Bind events
            modal.querySelector('.auth-modal-overlay').addEventListener('click', () => modal.remove());
            modal.querySelector('.auth-close-btn').addEventListener('click', () => modal.remove());
            modal.querySelector('#auth-switch').addEventListener('click', () => {
                isRegisterMode = !isRegisterMode;
                renderModal();
            });
            modal.querySelector('#auth-submit').addEventListener('click', handleSubmit);
            modal.querySelector('#auth-pin').addEventListener('keydown', e => { if (e.key === 'Enter') handleSubmit(); });
        }

        function handleSubmit() {
            const username = document.getElementById('auth-username').value.trim();
            const pin = document.getElementById('auth-pin').value.trim();
            const errorEl = document.getElementById('auth-error');

            let result;
            if (isRegisterMode) {
                result = register(username, pin);
                if (result.ok) {
                    errorEl.style.color = 'var(--text-accent)';
                    errorEl.textContent = t('auth.error.registerSuccess');
                    isRegisterMode = false;
                    setTimeout(() => renderModal(), 1200);
                    return;
                }
            } else {
                result = login(username, pin);
                if (result.ok) {
                    modal.remove();
                    callback?.();
                    return;
                }
            }
            errorEl.style.color = '#ef4444';
            errorEl.textContent = t('auth.error.' + result.error);
        }

        renderModal();
    }

    return { register, login, logout, isLoggedIn, getUsername, requireLogin, showLoginModal, isValidUsername, isValidPin };
})();
