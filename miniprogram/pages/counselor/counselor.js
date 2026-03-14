const i18n = require('../../utils/i18n.js');

const STORAGE_KEY = 'counselor_signups';
const MAX_COUNT = 25;

const counselorData = {
    zh: {
        title: '🤝 专业咨询支持', intro: '每25位伙伴组成一期，由专业咨询师 Yue 提供线上会议支持',
        counselorRole: 'BeingYourself 创始人 · 身心灵整合咨询师',
        counselorBio: '我经历过极端的童年逆境（ACE评分10/10），走过情绪痛苦、混乱、压抑和羞耻。我的身体、灵魂、精神——都在试图说出我不敢说的话。疗愈始于我停止奔跑和修复的那一刻。',
        counselorTags: ['Compassionate Inquiry', 'IFS', 'NARM', 'Shadow Constellation', 'Diamond Approach'],
        meetingTitle: '📊 线上会议报名进度',
        meetingDesc: '每满25人开启一期线上团体会议，由 Yue 亲自带领，提供临在式的团体觉察体验。',
        personLabel: '人',
        waitingText: '正在召集中，期待你的加入！',
        fullText: '本期人数已满！会议即将安排，请留意群内通知。',
        signUpBtn: '✋ 我要报名参加',
        signedUpText: '你已成功报名，请耐心等待通知',
        groupTitle: '📢 入群与通知',
        groupDesc: '报名后加入群聊，便于接收会议安排和资料分享。',
        groupSteps: [
            '点击下方按钮复制群聊链接',
            '在微信中粘贴并加入群聊',
            '满25人后群内发布会议时间',
            '按时参加线上会议'
        ],
        groupActionTitle: '加入 BeingYourself 觉察群',
        groupActionDesc: '点击复制群聊邀请链接',
        servicesTitle: '🌟 支持方式',
        services: [
            { key: 'group', icon: '👥', name: '25人团体线上会议', desc: '每期25人，由 Yue 带领的临在式团体觉察体验，在群体共鸣中深化自我认知。' },
            { key: 'private', icon: '🤝', name: '1x1 私人咨询', desc: '一次深入的身心探询会话，提供清晰和自我连接。' },
            { key: 'journey', icon: '🏔️', name: '3个月英雄之旅', desc: '定制化的消化、释放与回归之路，配备核心课程和持续支持。' }
        ],
        linkTitle: '预约免费咨询 → 访问官方网站'
    },
    en: {
        title: '🤝 Professional Support', intro: 'Every 25 participants form a group for an online session led by counselor Yue',
        counselorRole: 'BeingYourself Founder · Mind-Body-Spirit Counselor',
        counselorBio: 'I\'ve lived through extreme adverse childhood experience (ACE score 10/10). My healing began when I stopped running and fixing — when I found the courage to meet my inner parts.',
        counselorTags: ['Compassionate Inquiry', 'IFS', 'NARM', 'Shadow Constellation', 'Diamond Approach'],
        meetingTitle: '📊 Online Meeting Sign-up Progress',
        meetingDesc: 'A group meeting is initiated every 25 sign-ups, personally led by Yue for a presence-based group awareness experience.',
        personLabel: 'people',
        waitingText: 'Gathering participants, we\'d love you to join!',
        fullText: 'This group is full! Meeting will be scheduled soon — stay tuned in the group chat.',
        signUpBtn: '✋ Sign Me Up',
        signedUpText: 'You\'ve signed up! Please wait for notification',
        groupTitle: '📢 Join Group & Notifications',
        groupDesc: 'Join the group chat after signing up to receive meeting schedules and resources.',
        groupSteps: [
            'Tap below to copy the group link',
            'Paste it in WeChat to join the group',
            'Meeting time announced when 25 people join',
            'Attend the online meeting on schedule'
        ],
        groupActionTitle: 'Join BeingYourself Awareness Group',
        groupActionDesc: 'Tap to copy group invitation link',
        servicesTitle: '🌟 Support Options',
        services: [
            { key: 'group', icon: '👥', name: '25-Person Group Meeting', desc: 'Presence-based group awareness experience, deepening self-knowledge through collective resonance.' },
            { key: 'private', icon: '🤝', name: '1x1 Private Session', desc: 'A focused somatic inquiry session for clarity and self-connection.' },
            { key: 'journey', icon: '🏔️', name: '3-Month Hero Journey', desc: 'Custom-designed path to digest, release, and return to yourself with core curriculum.' }
        ],
        linkTitle: 'Book Free Consultation → Visit Website'
    },
    ja: {
        title: '🤝 専門サポート', intro: '25名が集まるごとに、カウンセラーYueがオンラインミーティングを開催',
        counselorRole: 'BeingYourself創設者 · 心身霊統合カウンセラー',
        counselorBio: '極端な逆境的小児期体験を経て（ACEスコア10/10）、自分自身と向き合う勇気を見つけた時に癒しが始まりました。',
        counselorTags: ['Compassionate Inquiry', 'IFS', 'NARM', 'Shadow Constellation', 'Diamond Approach'],
        meetingTitle: '📊 オンラインミーティング申込状況',
        meetingDesc: '25名集まるごとにグループミーティングを開催。Yue自ら率いるプレゼンスベースの体験。',
        personLabel: '人',
        waitingText: '参加者募集中です！',
        fullText: '定員に達しました！ミーティングの準備中です。',
        signUpBtn: '✋ 参加申込',
        signedUpText: '申込完了！通知をお待ちください',
        groupTitle: '📢 グループ参加',
        groupDesc: '申込後、グループチャットに参加して情報を受け取りましょう。',
        groupSteps: ['下のボタンでリンクをコピー', 'WeChatで貼り付けて参加', '25名で日程発表', 'ミーティングに参加'],
        groupActionTitle: 'BeingYourself気づきグループに参加',
        groupActionDesc: 'タップしてリンクをコピー',
        servicesTitle: '🌟 サポート方法',
        services: [
            { key: 'group', icon: '👥', name: '25名グループミーティング', desc: '集団の共鳴で自己認識を深めるプレゼンスベースの体験。' },
            { key: 'private', icon: '🤝', name: '1x1プライベートセッション', desc: '集中的な身体探求セッション。' },
            { key: 'journey', icon: '🏔️', name: '3ヶ月ヒーローの旅', desc: 'カスタムデザインの消化・解放・帰還の旅。' }
        ],
        linkTitle: '無料相談予約 → ウェブサイトへ'
    },
    th: {
        title: '🤝 การสนับสนุนมืออาชีพ', intro: 'ทุก 25 คนจะจัดประชุมออนไลน์โดยที่ปรึกษา Yue',
        counselorRole: 'ผู้ก่อตั้ง BeingYourself · ที่ปรึกษาบูรณาการกาย-ใจ-จิต',
        counselorBio: 'ฉันผ่านประสบการณ์วัยเด็กที่ยากลำบากอย่างยิ่ง (ACE 10/10) การเยียวยาเริ่มเมื่อฉันหยุดวิ่งและแก้ไข',
        counselorTags: ['Compassionate Inquiry', 'IFS', 'NARM', 'Shadow Constellation', 'Diamond Approach'],
        meetingTitle: '📊 ความคืบหน้าการลงทะเบียน',
        meetingDesc: 'เปิดประชุมกลุ่มทุก 25 คน นำโดย Yue',
        personLabel: 'คน',
        waitingText: 'กำลังรวบรวมผู้เข้าร่วม!',
        fullText: 'กลุ่มเต็มแล้ว! จะแจ้งกำหนดการเร็วๆนี้',
        signUpBtn: '✋ ลงทะเบียน',
        signedUpText: 'ลงทะเบียนแล้ว! รอการแจ้งเตือน',
        groupTitle: '📢 เข้าร่วมกลุ่ม',
        groupDesc: 'เข้าร่วมกลุ่มแชทหลังลงทะเบียนเพื่อรับข่าวสาร',
        groupSteps: ['แตะด้านล่างเพื่อคัดลอกลิงก์', 'วางใน WeChat เพื่อเข้ากลุ่ม', 'ประกาศเวลาเมื่อครบ 25 คน', 'เข้าร่วมประชุมตามกำหนด'],
        groupActionTitle: 'เข้ากลุ่ม BeingYourself',
        groupActionDesc: 'แตะเพื่อคัดลอกลิงก์เชิญ',
        servicesTitle: '🌟 ตัวเลือกการสนับสนุน',
        services: [
            { key: 'group', icon: '👥', name: 'ประชุมกลุ่ม 25 คน', desc: 'ประสบการณ์การตระหนักรู้กลุ่มแบบมีสติ' },
            { key: 'private', icon: '🤝', name: 'เซสชัน 1x1', desc: 'เซสชันสำรวจร่างกายเฉพาะบุคคล' },
            { key: 'journey', icon: '🏔️', name: 'การเดินทาง 3 เดือน', desc: 'เส้นทางที่ออกแบบมาเฉพาะสำหรับคุณ' }
        ],
        linkTitle: 'จองปรึกษาฟรี → เยี่ยมชมเว็บไซต์'
    }
};

Page({
    data: {
        statusBarHeight: 0, navHeight: 0,
        title: '', intro: '',
        counselorRole: '', counselorBio: '', counselorTags: [],
        meetingTitle: '', meetingDesc: '', personLabel: '',
        currentCount: 0, progressPercent: 0, isFull: false,
        waitingText: '', fullText: '',
        signUpBtn: '', hasSignedUp: false, signedUpText: '',
        groupTitle: '', groupDesc: '', groupSteps: [],
        groupActionTitle: '', groupActionDesc: '',
        servicesTitle: '', services: [],
        linkTitle: ''
    },

    onLoad() {
        const sysInfo = wx.getSystemInfoSync();
        this.setData({
            statusBarHeight: sysInfo.statusBarHeight,
            navHeight: sysInfo.statusBarHeight + 44
        });
        i18n.init();
        this.updateUI();
        this.loadSignupData();
    },

    onShow() {
        this.updateUI();
        this.loadSignupData();
    },

    updateUI() {
        const d = counselorData[i18n.getLang()] || counselorData.zh;
        this.setData({
            title: d.title, intro: d.intro,
            counselorRole: d.counselorRole, counselorBio: d.counselorBio, counselorTags: d.counselorTags,
            meetingTitle: d.meetingTitle, meetingDesc: d.meetingDesc, personLabel: d.personLabel,
            waitingText: d.waitingText, fullText: d.fullText,
            signUpBtn: d.signUpBtn, signedUpText: d.signedUpText,
            groupTitle: d.groupTitle, groupDesc: d.groupDesc, groupSteps: d.groupSteps,
            groupActionTitle: d.groupActionTitle, groupActionDesc: d.groupActionDesc,
            servicesTitle: d.servicesTitle, services: d.services,
            linkTitle: d.linkTitle
        });
    },

    loadSignupData() {
        const data = wx.getStorageSync(STORAGE_KEY) || { count: 0, signed: false };
        const count = Math.min(data.count, MAX_COUNT);
        this.setData({
            currentCount: count,
            progressPercent: Math.round((count / MAX_COUNT) * 100),
            isFull: count >= MAX_COUNT,
            hasSignedUp: data.signed
        });
    },

    signUp() {
        const data = wx.getStorageSync(STORAGE_KEY) || { count: 0, signed: false };
        if (data.signed) return;

        data.count = Math.min(data.count + 1, MAX_COUNT);
        data.signed = true;
        wx.setStorageSync(STORAGE_KEY, data);

        this.loadSignupData();

        const lang = i18n.getLang();
        const msgs = {
            zh: '报名成功！请加入群聊等待通知',
            en: 'Signed up! Please join the group chat for updates',
            ja: '申込完了！グループチャットに参加してお待ちください',
            th: 'ลงทะเบียนสำเร็จ! เข้ากลุ่มแชทรอการแจ้งเตือน'
        };
        wx.showToast({ title: msgs[lang] || msgs.zh, icon: 'none', duration: 2500 });
    },

    copyGroupLink() {
        wx.setClipboardData({
            data: 'https://www.beingyourself.love/contact-1',
            success: () => {
                const lang = i18n.getLang();
                const msgs = {
                    zh: '链接已复制，请在微信中粘贴',
                    en: 'Link copied! Paste in WeChat',
                    ja: 'リンクをコピーしました',
                    th: 'คัดลอกลิงก์แล้ว'
                };
                wx.showToast({ title: msgs[lang] || msgs.zh, icon: 'none', duration: 2000 });
            }
        });
    },

    goBack() { wx.navigateBack(); },

    openWebsite() {
        wx.setClipboardData({
            data: 'https://www.beingyourself.love',
            success: () => {
                wx.showToast({ title: i18n.getLang() === 'zh' ? '链接已复制，请在浏览器中打开' : 'Link copied!', icon: 'none', duration: 2500 });
            }
        });
    }
});
