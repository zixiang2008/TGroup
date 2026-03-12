const i18n = require('../../utils/i18n.js');
const auth = require('../../utils/auth.js');

// 基础问题（任何人都可使用）
const basicQuestions = {
    zh: [
        '此刻，你身体里有什么感觉？',
        '如果给现在的情绪画一幅画，它是什么颜色、什么形状？',
        '今天有什么事情让你印象深刻？',
        '你现在最想做什么？',
        '回想今天，有什么让你微笑的事吗？'
    ],
    en: [
        'What sensations do you notice in your body right now?',
        'If you painted your current emotion, what color and shape would it be?',
        'What stood out to you today?',
        'What do you most want to do right now?',
        'Thinking about today, was there anything that made you smile?'
    ],
    ja: [
        '今、体の中にどんな感覚がありますか？',
        '今の感情を絵にしたら何色、何の形？',
        '今日印象に残ったことは？',
        '今一番したいことは？',
        '今日、微笑んだ瞬間はありましたか？'
    ],
    th: [
        'ตอนนี้คุณรู้สึกอะไรในร่างกาย?',
        'ถ้าวาดอารมณ์ตอนนี้ เป็นสีอะไรรูปร่างอะไร?',
        'วันนี้มีอะไรน่าประทับใจ?',
        'ตอนนี้อยากทำอะไรมากที่สุด?',
        'วันนี้มีอะไรทำให้ยิ้มไหม?'
    ]
};

// 深度问题（需登录 + 给予安全提示）
const deepQuestions = {
    zh: [
        '你现在最想逃避的是什么？',
        '如果不用考虑任何人的看法，你最想做什么？',
        '你害怕别人看到你的哪一面？',
        '什么时候你觉得自己最"真实"？',
        '你上一次哭是什么时候？为什么？',
        '你心里有没有一句从来没说出口的话？',
        '如果可以和过去的自己说一句话，你会说什么？',
        '你觉得哪种情绪你最不允许自己感受？'
    ],
    en: [
        'What are you most trying to avoid right now?',
        'If you didn\'t care about anyone\'s opinion, what would you do?',
        'What side of yourself do you hide from others?',
        'When do you feel most "authentic"?',
        'When was the last time you cried? Why?',
        'Is there something you\'ve never said aloud?',
        'If you could tell your past self one thing, what would it be?',
        'Which emotion do you least allow yourself to feel?'
    ],
    ja: [
        '今一番逃げたい事は？',
        '誰の目も気にしなくていいなら何をしたい？',
        '他人に見せたくない自分の面は？',
        '最も「本当の自分」を感じる時は？',
        '最後に泣いたのはいつ？なぜ？',
        '口に出したことのない言葉はある？',
        '過去の自分に一言言えるなら何と言う？',
        '自分に感じることを許さない感情は？'
    ],
    th: [
        'ตอนนี้อยากหนีจากอะไรมากที่สุด?',
        'ถ้าไม่ต้องสนใจใคร อยากทำอะไร?',
        'ด้านไหนที่ซ่อนจากคนอื่น?',
        'เมื่อไหร่ที่รู้สึกเป็น "ตัวเอง" มากที่สุด?',
        'ร้องไห้ครั้งสุดท้ายเมื่อไหร่ ทำไม?',
        'มีอะไรที่ไม่เคยพูดออกมาไหม?',
        'ถ้าบอกตัวเองในอดีตได้หนึ่งคำ จะพูดอะไร?',
        'อารมณ์ไหนที่ไม่ยอมให้ตัวเองรู้สึก?'
    ]
};

const titles = { zh: '深度发问', en: 'Deep Inquiry', ja: '深い問い', th: 'คำถามลึก' };
const intros = { zh: '以下问题没有标准答案。在安静舒适的环境中，慢慢感受每一个问题。', en: 'These questions have no right answer. In a quiet space, slowly feel each question.', ja: '正解のない質問です。静かな環境で問いを感じてください。', th: 'คำถามเหล่านี้ไม่มีคำตอบที่ถูกต้อง ค่อยๆ รู้สึก' };
const deepLabels = { zh: '🔒 深度探索（需登录）', en: '🔒 Deep Exploration (Login Required)', ja: '🔒 深い探求（ログイン必要）', th: '🔒 การสำรวจลึก (ต้องเข้าสู่ระบบ)' };
const deepUnlocked = { zh: '🔓 深度探索', en: '🔓 Deep Exploration', ja: '🔓 深い探求', th: '🔓 การสำรวจลึก' };
const safetyNotes = { zh: '⚠️ 以下问题可能触及深层感受。请在安全的环境中进行，如果感到不适请随时停下来。', en: '⚠️ These questions may touch deep feelings. Please do this in a safe space and stop anytime you feel uncomfortable.', ja: '⚠️ 以下の質問は深い感情に触れる可能性があります。安全な環境で行い、不快に感じたら止めてください。', th: '⚠️ คำถามเหล่านี้อาจสัมผัสความรู้สึกลึก หยุดเมื่อรู้สึกไม่สบายใจ' };
const loginPrompts = { zh: '登录后解锁深度问题', en: 'Login to unlock deep questions', ja: 'ログインして深い問いを解放', th: 'เข้าสู่ระบบเพื่อปลดล็อก' };

Page({
    data: {
        title: '', intro: '', questions: [], writePlaceholder: '',
        showDeep: false, deepLabel: '', safetyNote: '', loginPrompt: '',
        deepQuestions: [], isLoggedIn: false,
        showAuthModal: false, authMode: 'login',
        authUsername: '', authPin: '', authError: '',
        // 注册经验评估
        showExpAssess: false, authExpLevel: ''
    },

    onLoad() { i18n.init(); this.updateUI(); },
    onShow() { this.updateUI(); },

    updateUI() {
        const lang = i18n.getLang();
        const loggedIn = auth.isLoggedIn();
        const basic = (basicQuestions[lang] || basicQuestions.zh).map(q => ({ q, answer: '' }));
        const deep = loggedIn ? (deepQuestions[lang] || deepQuestions.zh).map(q => ({ q, answer: '' })) : [];

        this.setData({
            title: titles[lang] || titles.zh,
            intro: intros[lang] || intros.zh,
            writePlaceholder: i18n.t('common.writeHere'),
            questions: basic,
            isLoggedIn: loggedIn,
            deepLabel: loggedIn ? (deepUnlocked[lang] || deepUnlocked.zh) : (deepLabels[lang] || deepLabels.zh),
            safetyNote: safetyNotes[lang] || safetyNotes.zh,
            loginPrompt: loginPrompts[lang] || loginPrompts.zh,
            deepQuestions: deep,
            showDeep: loggedIn
        });
    },

    onAnswer(e) {
        const idx = e.currentTarget.dataset.index;
        this.setData({ [`questions[${idx}].answer`]: e.detail.value });
    },

    onDeepAnswer(e) {
        const idx = e.currentTarget.dataset.index;
        this.setData({ [`deepQuestions[${idx}].answer`]: e.detail.value });
    },

    // --- 登录/注册弹窗 ---
    showLogin() {
        this.setData({ showAuthModal: true, authMode: 'login', authError: '', authUsername: '', authPin: '' });
    },

    switchAuthMode() {
        this.setData({
            authMode: this.data.authMode === 'login' ? 'register' : 'login',
            authError: '', showExpAssess: false, authExpLevel: ''
        });
    },

    onAuthUsername(e) { this.setData({ authUsername: e.detail.value }); },
    onAuthPin(e) { this.setData({ authPin: e.detail.value }); },

    submitAuth() {
        const { authMode, authUsername, authPin } = this.data;
        const lang = i18n.getLang();

        if (authMode === 'login') {
            const res = auth.login(authUsername, authPin);
            if (res.ok) {
                this.setData({ showAuthModal: false });
                this.updateUI();
            } else {
                this.setData({ authError: i18n.t('auth.error.' + res.error) });
            }
        } else {
            // 注册：先验证格式，再显示经验评估
            if (!auth.isValidUsername(authUsername)) {
                this.setData({ authError: i18n.t('auth.error.usernameFormat') }); return;
            }
            if (!auth.isValidPin(authPin)) {
                this.setData({ authError: i18n.t('auth.error.pinFormat') }); return;
            }
            this.setData({ showExpAssess: true, authError: '' });
        }
    },

    selectExpLevel(e) {
        const level = e.currentTarget.dataset.level;
        this.setData({ authExpLevel: level });
    },

    confirmRegister() {
        const { authUsername, authPin, authExpLevel } = this.data;
        if (!authExpLevel) return;
        const res = auth.register(authUsername, authPin, authExpLevel);
        if (res.ok) {
            wx.showToast({ title: i18n.t('auth.error.registerSuccess'), icon: 'none', duration: 2000 });
            this.setData({ authMode: 'login', showExpAssess: false, authExpLevel: '' });
        } else {
            this.setData({ authError: i18n.t('auth.error.' + res.error) });
        }
    },

    closeAuthModal() {
        this.setData({ showAuthModal: false, showExpAssess: false });
    }
});
