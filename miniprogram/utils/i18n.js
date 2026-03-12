/* ============================================
   国际化引擎 — 小程序版
   ============================================ */
const SUPPORTED = ['zh', 'en', 'ja', 'th'];
const STORAGE_KEY = 'sa_lang';

const ui = {
    zh: {
        appName: '觉察', splashTitle: '觉 察', splashSub: '向内看，看见真实的自己',
        greeting: { morning: '早上好', noon: '中午好', afternoon: '下午好', evening: '晚上好' },
        greetingSuffix: '，你现在感觉怎么样？',
        pages: { home: '觉察', emotions: '情绪罗盘', questioning: '深度发问', recall: '24h 回忆', meditation: '冥想空间', brain: '感受模式', dialogue: '觉察对话', actions: '行动建议', sharing: '分享句式' },
        nav: { home: '首页', emotions: '情绪', meditation: '冥想', dialogue: '对话', more: '更多' },
        cards: {
            emotions: { title: '情绪罗盘', desc: '探索120+种情绪' },
            questioning: { title: '深度发问', desc: '多维度自我探索' },
            recall: { title: '24h 回忆', desc: '觉察过去24小时' },
            meditation: { title: '冥想空间', desc: 'T-Group 从这里开始' },
            brain: { title: '感受模式', desc: '从思考切换到感受' },
            dialogue: { title: '觉察对话', desc: '与内在角色对话' },
            actions: { title: '行动建议', desc: '用身体放下头脑' },
            sharing: { title: '分享句式', desc: 'T语言沟通模板' },
            appendix: { title: '身体感受词汇', desc: '106个感受词汇表' }
        },
        dailyLabel: '✨ 今日觉察语',
        filters: { all: '全部', negative: '不舒服的感受', neutral: '中性', positive: '舒服的感受' },
        emotionDetail: { scene: '🎯 出现的场景', suggestions: '💡 与它相处的方式', tags: '🏷️ 标签', intensity: '强度' },
        emotionTypes: { negative: '不舒服', positive: '舒适', neutral: '中性' },
        back: '返回',
        auth: {
            loginTitle: '登录', loginDesc: '输入用户名和 PIN 码',
            registerTitle: '注册', registerDesc: '创建新用户',
            username: '用户名（2个汉字）', pin: 'PIN码（4位数字）',
            login: '登录', register: '注册',
            switchToRegister: '还没有账号？点击注册', switchToLogin: '已有账号？点击登录',
            error: { usernameFormat: '用户名需为2个汉字', pinFormat: 'PIN码需为4位数字', wrongCredentials: '用户名或密码错误', userExists: '用户名已存在', registerSuccess: '注册成功！请登录' },
            loginRequired: '此功能需要登录', loggedAs: '当前用户', logout: '退出'
        },
        common: { save: '💾 保存', copy: '📋 复制到剪贴板', copied: '已复制到剪贴板 ✓', saved: '已保存 ✓', writeHere: '在这里写下你的回答……', sendPlaceholder: '写下你的想法……' },
        langName: '中文'
    },
    en: {
        appName: 'Awareness', splashTitle: 'Awareness', splashSub: 'Look within, see your authentic self',
        greeting: { morning: 'Good morning', noon: 'Good noon', afternoon: 'Good afternoon', evening: 'Good evening' },
        greetingSuffix: ', how are you feeling now?',
        pages: { home: 'Home', emotions: 'Emotions', questioning: 'Inquiry', recall: '24h Recall', meditation: 'Meditation', brain: 'Feeling Mode', dialogue: 'Inner Dialogue', actions: 'Action Tips', sharing: 'T-Language' },
        nav: { home: 'Home', emotions: 'Emotions', meditation: 'Meditate', dialogue: 'Dialogue', more: 'More' },
        cards: {
            emotions: { title: 'Emotion Compass', desc: 'Explore 120+ emotions' },
            questioning: { title: 'Deep Inquiry', desc: 'Multi-dimensional self-exploration' },
            recall: { title: '24h Recall', desc: 'Reflect on the past 24 hours' },
            meditation: { title: 'Meditation Space', desc: 'T-Group starts here' },
            brain: { title: 'Feeling Mode', desc: 'Switch from thinking to feeling' },
            dialogue: { title: 'Inner Dialogue', desc: 'Talk with inner personas' },
            actions: { title: 'Action Tips', desc: 'Let your body quiet the mind' },
            sharing: { title: 'T-Language', desc: 'Communication templates' },
            appendix: { title: 'Body Sensations', desc: '106 sensation vocabulary' }
        },
        dailyLabel: '✨ Daily Awareness',
        filters: { all: 'All', negative: 'Uncomfortable', neutral: 'Neutral', positive: 'Comfortable' },
        emotionDetail: { scene: '🎯 Common Scenarios', suggestions: '💡 Suggestions', tags: '🏷️ Tags', intensity: 'Intensity' },
        emotionTypes: { negative: 'Uncomfortable', positive: 'Comfortable', neutral: 'Neutral' },
        back: 'Back',
        auth: {
            loginTitle: 'Login', loginDesc: 'Enter your username and PIN',
            registerTitle: 'Register', registerDesc: 'Create a new account',
            username: 'Username (2 Chinese chars)', pin: 'PIN (4 digits)',
            login: 'Login', register: 'Register',
            switchToRegister: 'No account? Register', switchToLogin: 'Have an account? Login',
            error: { usernameFormat: 'Username: 2 Chinese characters', pinFormat: 'PIN: 4 digits', wrongCredentials: 'Wrong credentials', userExists: 'Username taken', registerSuccess: 'Registered! Please login' },
            loginRequired: 'Login required', loggedAs: 'User', logout: 'Logout'
        },
        common: { save: '💾 Save', copy: '📋 Copy', copied: 'Copied ✓', saved: 'Saved ✓', writeHere: 'Write your answer here...', sendPlaceholder: 'Write your thoughts...' },
        langName: 'English'
    },
    ja: {
        appName: '気づき', splashTitle: '気づき', splashSub: '内側を見つめ、本当の自分に出会う',
        greeting: { morning: 'おはようございます', noon: 'こんにちは', afternoon: 'こんにちは', evening: 'こんばんは' },
        greetingSuffix: '、今の気持ちはいかがですか？',
        pages: { home: 'ホーム', emotions: '感情コンパス', questioning: '深い問い', recall: '24時間振り返り', meditation: '瞑想空間', brain: '感覚モード', dialogue: '内なる対話', actions: 'アクション', sharing: 'T言語' },
        nav: { home: 'ホーム', emotions: '感情', meditation: '瞑想', dialogue: '対話', more: 'その他' },
        cards: {
            emotions: { title: '感情コンパス', desc: '120+の感情を探索' },
            questioning: { title: '深い問い', desc: '多次元の自己探求' },
            recall: { title: '24時間振り返り', desc: '過去24時間を振り返る' },
            meditation: { title: '瞑想空間', desc: 'T-Groupはここから' },
            brain: { title: '感覚モード', desc: '思考から感覚へ' },
            dialogue: { title: '内なる対話', desc: '内なるペルソナと対話' },
            actions: { title: 'アクション', desc: '体で心を静める' },
            sharing: { title: 'T言語', desc: 'コミュニケーションテンプレート' },
            appendix: { title: '身体感覚', desc: '106の感覚語彙' }
        },
        dailyLabel: '✨ 今日の気づき',
        filters: { all: 'すべて', negative: '不快な感情', neutral: '中性の感情', positive: '快い感情' },
        emotionDetail: { scene: '🎯 よくある場面', suggestions: '💡 アドバイス', tags: '🏷️ タグ', intensity: '強度' },
        emotionTypes: { negative: '不快な感情', positive: '快い感情', neutral: '中性の感情' },
        back: '戻る',
        auth: {
            loginTitle: 'ログイン', loginDesc: 'ユーザー名とPINを入力',
            registerTitle: '登録', registerDesc: '新しいアカウントを作成',
            username: 'ユーザー名（漢字2文字）', pin: 'PIN（数字4桁）',
            login: 'ログイン', register: '登録',
            switchToRegister: 'アカウントがない？登録', switchToLogin: 'アカウントがある？ログイン',
            error: { usernameFormat: 'ユーザー名：漢字2文字', pinFormat: 'PIN：数字4桁', wrongCredentials: '認証情報が間違っています', userExists: 'ユーザー名は使用済み', registerSuccess: '登録成功！ログインしてください' },
            loginRequired: 'ログインが必要', loggedAs: 'ユーザー', logout: 'ログアウト'
        },
        common: { save: '💾 保存', copy: '📋 コピー', copied: 'コピー済み ✓', saved: '保存済み ✓', writeHere: 'ここに回答を書く…', sendPlaceholder: '考えを書く…' },
        langName: '日本語'
    },
    th: {
        appName: 'การตระหนักรู้', splashTitle: 'ตระหนักรู้', splashSub: 'มองเข้าไปข้างใน พบตัวตนที่แท้จริง',
        greeting: { morning: 'สวัสดีตอนเช้า', noon: 'สวัสดีตอนเที่ยง', afternoon: 'สวัสดีตอนบ่าย', evening: 'สวัสดีตอนเย็น' },
        greetingSuffix: ' ตอนนี้คุณรู้สึกอย่างไร?',
        pages: { home: 'หน้าแรก', emotions: 'เข็มทิศอารมณ์', questioning: 'คำถามลึก', recall: 'ย้อนดู 24 ชม.', meditation: 'พื้นที่สมาธิ', brain: 'โหมดรับรู้', dialogue: 'บทสนทนาภายใน', actions: 'คำแนะนำ', sharing: 'ภาษา T' },
        nav: { home: 'หน้าแรก', emotions: 'อารมณ์', meditation: 'สมาธิ', dialogue: 'สนทนา', more: 'เพิ่มเติม' },
        cards: {
            emotions: { title: 'เข็มทิศอารมณ์', desc: 'สำรวจ 120+ อารมณ์' },
            questioning: { title: 'คำถามลึก', desc: 'สำรวจตนเองหลายมิติ' },
            recall: { title: 'ย้อนดู 24 ชม.', desc: 'ตระหนักรู้ 24 ชม.ที่ผ่านมา' },
            meditation: { title: 'พื้นที่สมาธิ', desc: 'T-Group เริ่มที่นี่' },
            brain: { title: 'โหมดรับรู้', desc: 'เปลี่ยนจากคิดเป็นรู้สึก' },
            dialogue: { title: 'บทสนทนาภายใน', desc: 'สนทนากับตัวตนภายใน' },
            actions: { title: 'คำแนะนำ', desc: 'ใช้ร่างกายปล่อยวางจิตใจ' },
            sharing: { title: 'ภาษา T', desc: 'แม่แบบการสื่อสาร' },
            appendix: { title: 'ความรู้สึกร่างกาย', desc: '106 คำศัพท์ความรู้สึก' }
        },
        dailyLabel: '✨ การตระหนักรู้วันนี้',
        filters: { all: 'ทั้งหมด', negative: 'ไม่สบายใจ', neutral: 'เป็นกลาง', positive: 'สบายใจ' },
        emotionDetail: { scene: '🎯 สถานการณ์ที่พบบ่อย', suggestions: '💡 คำแนะนำ', tags: '🏷️ แท็ก', intensity: 'ความเข้มข้น' },
        emotionTypes: { negative: 'ไม่สบายใจ', positive: 'สบายใจ', neutral: 'เป็นกลาง' },
        back: 'กลับ',
        auth: {
            loginTitle: 'เข้าสู่ระบบ', loginDesc: 'กรอกชื่อผู้ใช้และ PIN',
            registerTitle: 'ลงทะเบียน', registerDesc: 'สร้างบัญชีใหม่',
            username: 'ชื่อผู้ใช้ (อักษรจีน 2 ตัว)', pin: 'PIN (ตัวเลข 4 หลัก)',
            login: 'เข้าสู่ระบบ', register: 'ลงทะเบียน',
            switchToRegister: 'ไม่มีบัญชี? ลงทะเบียน', switchToLogin: 'มีบัญชีแล้ว? เข้าสู่ระบบ',
            error: { usernameFormat: 'ชื่อผู้ใช้: อักษรจีน 2 ตัว', pinFormat: 'PIN: ตัวเลข 4 หลัก', wrongCredentials: 'ข้อมูลไม่ถูกต้อง', userExists: 'ชื่อผู้ใช้ถูกใช้แล้ว', registerSuccess: 'ลงทะเบียนสำเร็จ! กรุณาเข้าสู่ระบบ' },
            loginRequired: 'ฟีเจอร์นี้ต้องเข้าสู่ระบบ', loggedAs: 'ผู้ใช้', logout: 'ออกจากระบบ'
        },
        common: { save: '💾 บันทึก', copy: '📋 คัดลอก', copied: 'คัดลอกแล้ว ✓', saved: 'บันทึกแล้ว ✓', writeHere: 'เขียนคำตอบที่นี่...', sendPlaceholder: 'เขียนความคิดของคุณ...' },
        langName: 'ไทย'
    }
};

const dailyQuotes = {
    zh: ['情绪没有好坏，只是信号。', '你不需要\"想通\"，只需要\"看见\"。', '呼吸是回到当下最简单的路。', '不舒服的感受也值得被温柔对待。', '你的脆弱里，藏着真实的力量。', '每一个情绪都在保护着什么。', '慢下来，才能听见内心的声音。', '接纳不完美，就是最大的勇气。', '今天，你和自己说了什么话？', '你值得被温柔以待，首先从自己开始。'],
    en: ['Emotions have no labels — they are signals.', 'You don\'t need to "figure it out" — just see it.', 'Breathing is the simplest path back to now.', 'Uncomfortable feelings deserve gentle attention too.', 'Your vulnerability holds authentic strength.', 'Every emotion is protecting something.', 'Slow down to hear your inner voice.', 'Accepting imperfection is the greatest courage.', 'What did you say to yourself today?', 'You deserve gentleness, starting from yourself.'],
    ja: ['感情に良い悪いはない — シグナルです。', '「理解」する必要はない — ただ「見る」だけ。', '呼吸は今に戻る最も簡単な道。', '不快な感情も優しく扱う価値がある。', 'あなたの脆さの中に本当の強さがある。', 'すべての感情は何かを守っている。', 'ゆっくりして、心の声を聞こう。', '不完全さを受け入れることが最大の勇気。', '今日、自分に何を言いましたか？', 'あなたは優しくされる価値がある、まず自分から。'],
    th: ['อารมณ์ไม่มีดีชั่ว — มันเป็นสัญญาณ', 'คุณไม่จำเป็นต้อง "เข้าใจ" — แค่ "เห็น"', 'การหายใจคือทางกลับสู่ปัจจุบันที่ง่ายที่สุด', 'ความรู้สึกไม่สบายใจก็สมควรได้รับความอ่อนโยน', 'ความเปราะบางของคุณซ่อนพลังที่แท้จริง', 'ทุกอารมณ์กำลังปกป้องบางสิ่ง', 'ช้าลงเพื่อได้ยินเสียงภายใน', 'การยอมรับความไม่สมบูรณ์แบบคือความกล้าที่ยิ่งใหญ่ที่สุด', 'วันนี้คุณพูดอะไรกับตัวเองบ้าง?', 'คุณสมควรได้รับความอ่อนโยน เริ่มจากตัวเองก่อน']
};

let currentLang = 'zh';

function init() {
    currentLang = wx.getStorageSync(STORAGE_KEY) || 'zh';
    if (!SUPPORTED.includes(currentLang)) currentLang = 'zh';
}

function getLang() { return currentLang; }

function setLang(lang) {
    if (!SUPPORTED.includes(lang)) return;
    currentLang = lang;
    wx.setStorageSync(STORAGE_KEY, lang);
}

function t(key) {
    const keys = key.split('.');
    let obj = ui[currentLang];
    for (const k of keys) {
        if (!obj || typeof obj !== 'object') return key;
        obj = obj[k];
    }
    return obj !== undefined ? obj : key;
}

function tLang(key, lang) {
    const keys = key.split('.');
    let obj = ui[lang] || ui.zh;
    for (const k of keys) {
        if (!obj || typeof obj !== 'object') return key;
        obj = obj[k];
    }
    return obj !== undefined ? obj : key;
}

function getDailyQuotes() {
    return dailyQuotes[currentLang] || dailyQuotes.zh;
}

function getSupported() { return SUPPORTED; }

module.exports = { init, getLang, setLang, t, tLang, getDailyQuotes, getSupported, ui };
