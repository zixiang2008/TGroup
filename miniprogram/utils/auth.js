/* ============================================
   认证系统 — 小程序版 v2.1
   增加经验等级评估功能
   ============================================ */
const USERS_KEY = 'sa_users';
const SESSION_KEY = 'sa_session';

function getUsers() {
    try { return JSON.parse(wx.getStorageSync(USERS_KEY) || '{}'); } catch (e) { return {}; }
}

function saveUsers(users) {
    wx.setStorageSync(USERS_KEY, JSON.stringify(users));
}

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

/**
 * 注册用户
 * @param {string} username - 2个汉字
 * @param {string} pin - 4位数字
 * @param {string} experienceLevel - 'experienced' | 'beginner' | 'none'
 */
function register(username, pin, experienceLevel) {
    if (!isValidUsername(username)) return { ok: false, error: 'usernameFormat' };
    if (!isValidPin(pin)) return { ok: false, error: 'pinFormat' };
    const users = getUsers();
    if (users[username]) return { ok: false, error: 'userExists' };
    users[username] = {
        hash: hashPin(pin),
        created: Date.now(),
        experienceLevel: experienceLevel || 'none'  // 'experienced' | 'beginner' | 'none'
    };
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
    const session = {
        username,
        time: Date.now(),
        experienceLevel: users[username].experienceLevel || 'none'
    };
    wx.setStorageSync(SESSION_KEY, JSON.stringify(session));
    getApp().globalData.session = session;
    return { ok: true };
}

function logout() {
    wx.removeStorageSync(SESSION_KEY);
    getApp().globalData.session = null;
}

function isLoggedIn() {
    const app = getApp();
    return !!(app.globalData.session && app.globalData.session.username);
}

function getUsername() {
    const app = getApp();
    return app.globalData.session?.username || null;
}

/**
 * 获取用户经验等级
 * @returns {'experienced'|'beginner'|'none'}
 */
function getExperienceLevel() {
    const app = getApp();
    return app.globalData.session?.experienceLevel || 'none';
}

/**
 * 用户是否有深度探索经验（experienced 用户可接触更深入的问题）
 */
function isExperienced() {
    return getExperienceLevel() === 'experienced';
}

module.exports = {
    register, login, logout, isLoggedIn, getUsername,
    isValidUsername, isValidPin, getExperienceLevel, isExperienced
};
