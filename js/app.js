/* ============================================
   主应用逻辑 - app.js (i18n + auth 集成版)
   ============================================ */

(function () {
    const t = I18n.t.bind(I18n);
    const APP_VERSION = 'v2.1.0';
    // Direct module references — const declarations don't attach to window
    const pageModules = {
        emotions: EmotionsModule,
        questioning: QuestioningModule,
        recall: RecallModule,
        meditation: MeditationModule,
        brain: BrainModule,
        dialogue: DialogueModule,
        actions: ActionsModule,
        sharing: SharingModule,
        knowledge: KnowledgeModule,
        counselor: CounselorModule
    };
    let currentPage = 'home';

    function initApp() {
        I18n.init();
        I18n.updateDOM();
        setupGreeting();
        setupDailyQuote();
        setupNavigation();
        setupLangSelector();
        updateUserStatus();
        initModules();
        // Listen for language changes
        window.addEventListener('langChanged', () => {
            I18n.updateDOM();
            setupGreeting();
            setupDailyQuote();
            updateHeaderTitle();
            updateUserStatus();
            // Re-init current page module
            if (currentPage !== 'home') {
                const mod = pageModules[currentPage];
                if (mod?.init) mod.init();
            }
        });
        window.addEventListener('authChanged', updateUserStatus);
        // Splash screen
        showVersion();
        setTimeout(() => {
            document.getElementById('splash-screen').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('splash-screen').style.display = 'none';
                document.getElementById('app').style.display = '';
            }, 600);
        }, 2000);
    }

    let greetingTimer = null;
    function setupGreeting() {
        const el = document.getElementById('home-greeting');
        if (!el) return;
        if (greetingTimer) { clearInterval(greetingTimer); greetingTimer = null; }
        const langs = ['zh', 'en', 'ja', 'th'];
        const h = new Date().getHours();
        let timeKey;
        if (h < 11) timeKey = 'morning';
        else if (h < 13) timeKey = 'noon';
        else if (h < 18) timeKey = 'afternoon';
        else timeKey = 'evening';

        // Build greetings for all languages
        const greetings = langs.map(lang => {
            const g = I18n.tLang('greeting.' + timeKey, lang);
            const s = I18n.tLang('greetingSuffix', lang);
            return g + s;
        });

        // Start with current language
        const curLang = I18n.getLang();
        let idx = langs.indexOf(curLang);
        if (idx < 0) idx = 0;
        el.textContent = greetings[idx];
        el.style.transition = 'opacity 0.5s ease';

        // Cycle through languages
        greetingTimer = setInterval(() => {
            el.style.opacity = '0';
            setTimeout(() => {
                idx = (idx + 1) % langs.length;
                el.textContent = greetings[idx];
                el.style.opacity = '1';
            }, 500);
        }, 4000);
    }

    function setupDailyQuote() {
        const quotes = I18n.getDailyQuotes();
        const el = document.getElementById('daily-t-text');
        if (!el) return;
        const showRandom = () => {
            el.textContent = quotes[Math.floor(Math.random() * quotes.length)];
        };
        showRandom();
        const refreshBtn = document.getElementById('daily-t-refresh');
        // Remove old listeners by cloning
        const newBtn = refreshBtn.cloneNode(true);
        refreshBtn.parentNode.replaceChild(newBtn, refreshBtn);
        newBtn.addEventListener('click', showRandom);
    }

    function setupNavigation() {
        // Bottom nav
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const page = btn.dataset.page;
                if (page === 'more') { toggleMoreMenu(); return; }
                navigateTo(page);
            });
        });
        // Home cards
        document.querySelectorAll('.home-card').forEach(card => {
            card.addEventListener('click', () => navigateTo(card.dataset.page));
        });
        // More menu items
        document.querySelectorAll('.more-menu-item').forEach(item => {
            item.addEventListener('click', () => {
                closeMoreMenu();
                navigateTo(item.dataset.page);
            });
        });
        // More menu overlay
        document.getElementById('more-menu-overlay')?.addEventListener('click', closeMoreMenu);
        // Back button
        document.getElementById('back-btn')?.addEventListener('click', () => navigateTo('home'));
    }

    function navigateTo(page) {
        closeMoreMenu();
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const target = document.getElementById('page-' + page);
        if (target) target.classList.add('active');
        currentPage = page;
        // Update bottom nav
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.toggle('active', nav.dataset.page === page || (page === 'home' && nav.dataset.page === 'home'));
        });
        // Back button
        const backBtn = document.getElementById('back-btn');
        backBtn.style.display = page === 'home' ? 'none' : '';
        // Header title
        updateHeaderTitle();
        // Init module
        const mod = pageModules[page];
        if (mod?.init) mod.init();
        // Scroll to top
        document.getElementById('page-container').scrollTop = 0;
    }

    function updateHeaderTitle() {
        const el = document.getElementById('header-title');
        if (currentPage === 'home') {
            el.textContent = t('pages.home');
        } else {
            el.textContent = t('pages.' + currentPage) || currentPage;
        }
    }

    function toggleMoreMenu() {
        document.getElementById('more-menu').classList.toggle('open');
    }
    function closeMoreMenu() {
        document.getElementById('more-menu').classList.remove('open');
    }

    function setupLangSelector() {
        const btn = document.getElementById('lang-btn');
        const dropdown = document.getElementById('lang-dropdown');
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('open');
        });
        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.addEventListener('click', () => {
                I18n.setLang(opt.dataset.lang);
                dropdown.classList.remove('open');
                // Update active indicator
                document.querySelectorAll('.lang-option').forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
            });
        });
        // Close on outside click
        document.addEventListener('click', () => dropdown.classList.remove('open'));
        // Mark current language
        const cur = I18n.getLang();
        document.querySelectorAll('.lang-option').forEach(o => {
            o.classList.toggle('active', o.dataset.lang === cur);
        });
    }

    function updateUserStatus() {
        const el = document.getElementById('user-status');
        if (!el) return;
        if (Auth.isLoggedIn()) {
            el.innerHTML = `<span class="user-badge">${Auth.getUsername()}</span><button class="logout-btn" id="logout-btn">${t('auth.logout')}</button>`;
            document.getElementById('logout-btn')?.addEventListener('click', () => {
                Auth.logout();
            });
        } else {
            el.innerHTML = `<button class="login-btn" id="login-trigger">${t('auth.login')}</button>`;
            document.getElementById('login-trigger')?.addEventListener('click', () => {
                Auth.showLoginModal();
            });
        }
    }

    function initModules() {
        // Init emotions on startup since it has static filter buttons
        if (pageModules.emotions?.init) pageModules.emotions.init();
    }

    function showVersion() {
        const el = document.getElementById('app-version');
        if (el) el.textContent = APP_VERSION;
    }

    // Start
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
})();
