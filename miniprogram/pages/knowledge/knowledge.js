const i18n = require('../../utils/i18n.js');

const knowledgeData = {
    zh: {
        title: '📚 专业知识库', intro: '来自 BeingYourself 的身心灵整合疗愈知识体系',
        dimensionTitle: '🔮 身心灵三维方法',
        dimensions: [
            { key: 'mind', icon: '🧠', name: 'MIND · 心智', desc: '运用基于临在的探询工具，理解并柔化心智循环、生存策略，消化自我构建。' },
            { key: 'body', icon: '🫀', name: 'BODY · 身体', desc: '回归身体的先天智慧，通过安全地会见身体沉默承载的情绪/创伤，邀请它们的安全释放，恢复安全感、扎根感和韧性。' },
            { key: 'spirit', icon: '✨', name: 'SPIRIT · 灵性', desc: '带着敬畏向内转向，学会感知内在存在的宁静脉动——与生命整体的活的连接——从这个基础上，你的本真自然开始浮现。' }
        ],
        taoTitle: '☯ 道的方式',
        taoLines: ['道的方式不是修复，是流动。', '不是努力，是临在。', '不是强迫，是允许。', '疗愈不是用努力走向完美。', '而是回归你从未破碎的本质——你的真实本性。', '道教导我们放下控制、比较和强迫。', '回到存在的自然节奏。', '信任生命——而非恐惧。'],
        methodsTitle: '🎓 六大专业方法',
        methods: [
            { key: 'ci', icon: '💜', name: 'Compassionate Inquiry', author: 'Dr. Gabor Maté', desc: '基于临在的身心治疗，揭示隐藏的信念，解开痛苦的情感根源。' },
            { key: 'ifs', icon: '🪞', name: 'Internal Family System', author: 'Dr. Richard Schwartz', desc: '创伤知情的模式，温和地映射和交朋友你的内在部分，促进自我理解、和谐与疗愈。' },
            { key: 'narm', icon: '🌊', name: 'NARM 神经情感关系模型', author: 'Dr. Laurence Heller', desc: '以身体为中心的方法，处理早期关系和发展性创伤，处理身份认同模式。' },
            { key: 'shadow', icon: '🌑', name: 'Shadow Constellation', author: 'Nir Esterman', desc: '"身体与阴影之道"，照亮隐藏的家族动力和无意识的忠诚，让看不见的模式浮出并转化。' },
            { key: 'coaching', icon: '🌱', name: 'Holistic Life Coaching', author: 'Alan Cohen', desc: '全人方法，支持你在创伤/痛苦恢复之外转变生活——将选择、关系和人生目标与最本真的自我对齐。' },
            { key: 'diamond', icon: '💎', name: 'Diamond Approach', author: 'A.H. Almaas', desc: '灵性探询之道，温和地揭示人格模式之下你本质的真相，培育临在、清晰和内在自由。' }
        ],
        areasTitle: '🎯 三大服务领域',
        areas: [
            { key: 'pain', icon: '💆', name: '慢性疼痛与躯体症状恢复', desc: '症状不是敌人，而是信息。一起揭示疼痛的情感根源，探索保护性信念，邀请神经系统的调节。' },
            { key: 'emotion', icon: '🌸', name: '情绪处理与创伤释放', desc: '你的感受不需要被管理或推开。它们需要被安全、温和、临在地会见——不判断，不急促。' },
            { key: 'inquiry', icon: '🔍', name: '自我探询与具身觉知', desc: '运用临在探询、深层身体聆听和调谐的临在来探索模式之下的你是谁。这不是智识的，是回到存在的感受。' }
        ],
        forWhomTitle: '👥 适用人群',
        forWhom: [
            '你正经历慢性疼痛/压力/紧张或躯体症状，感到困惑或恐惧',
            '你被情绪淹没，渴望一个安全的空间去不被评判地感受',
            '你花了多年试图修复、优化或改善自己——却感到疲于奋斗',
            '你想重新连接你的真实——而非你的条件化反应或故事',
            '你是一位追寻者、领导者或变革者，准备好以"存在"来体验本真'
        ],
        linkTitle: '了解更多 → 访问官方网站'
    },
    en: {
        title: '📚 Knowledge Base', intro: 'Mind-Body-Spirit integration healing knowledge from BeingYourself',
        dimensionTitle: '🔮 Mind · Body · Spirit',
        dimensions: [
            { key: 'mind', icon: '🧠', name: 'MIND', desc: 'Using presence-based inquiry tools to understand and soften mental loops, survival strategies, and digest ego constructs.' },
            { key: 'body', icon: '🫀', name: 'BODY', desc: 'Returning to the innate wisdom of the body, meeting emotions/trauma it has held in silence, inviting safe release through practices that restore safety and resilience.' },
            { key: 'spirit', icon: '✨', name: 'SPIRIT', desc: 'Turning inward with reverence, sensing the quiet pulse of being — a living connection to the wholeness of life — from which authenticity naturally emerges.' }
        ],
        taoTitle: '☯ The Way of Tao',
        taoLines: ['The Way of Tao is not to fix, but to flow.', 'It\'s not effort, but presence.', 'Not force, but allowing.', 'Healing is not about efforting your way to perfection.', 'It\'s about surrendering back to your true nature.', 'The Tao teaches us to let go of control, comparison, and force.', 'To return to the natural rhythm of being.', 'To trust life — not fear it.'],
        methodsTitle: '🎓 Six Professional Modalities',
        methods: [
            { key: 'ci', icon: '💜', name: 'Compassionate Inquiry', author: 'Dr. Gabor Maté', desc: 'Presence-based somatic psychotherapy that reveals hidden beliefs and unpacks emotional roots of suffering.' },
            { key: 'ifs', icon: '🪞', name: 'Internal Family System', author: 'Dr. Richard Schwartz', desc: 'Trauma-informed modality that gently maps and befriends your inner parts, fostering self-understanding and healing.' },
            { key: 'narm', icon: '🌊', name: 'NARM NeuroAffective Relational Model', author: 'Dr. Laurence Heller', desc: 'Body-centered approach addressing early relational and developmental trauma, working with identity patterns.' },
            { key: 'shadow', icon: '🌑', name: 'Shadow Constellation', author: 'Nir Esterman', desc: 'Illuminates hidden family dynamics and unconscious loyalties, allowing unseen patterns to surface and transform.' },
            { key: 'coaching', icon: '🌱', name: 'Holistic Life Coaching', author: 'Alan Cohen', desc: 'Supports transformation beyond trauma recovery — aligning choices, relationships, and purpose with your authentic self.' },
            { key: 'diamond', icon: '💎', name: 'Diamond Approach', author: 'A.H. Almaas', desc: 'A path of spiritual inquiry revealing the truth of your essence beneath personality patterns.' }
        ],
        areasTitle: '🎯 Three Service Areas',
        areas: [
            { key: 'pain', icon: '💆', name: 'Chronic Pain & Somatic Recovery', desc: 'The symptom is not the enemy — it\'s a message. Together, we uncover emotional roots and invite nervous system regulation.' },
            { key: 'emotion', icon: '🌸', name: 'Emotional Processing & Trauma Release', desc: 'Your feelings need to be met — safely, gently, and with presence — without judgment, without rush.' },
            { key: 'inquiry', icon: '🔍', name: 'Self-Inquiry & Embodied Awareness', desc: 'Using presence-based inquiry, deep body listening to explore who you are beneath the patterns.' }
        ],
        forWhomTitle: '👥 Who Is This For',
        forWhom: [
            'Navigating chronic pain/stress or somatic symptoms and feeling stuck',
            'Overwhelmed by emotion, longing for a safe place to feel without judgment',
            'Spent years trying to fix or improve yourself — tired of striving',
            'Want to reconnect to your truth — not your conditioning or story',
            'A seeker, leader, or change-maker ready to embody authenticity'
        ],
        linkTitle: 'Learn More → Visit Official Website'
    },
    ja: {
        title: '📚 知識ベース', intro: 'BeingYourselfの心身魂統合ヒーリング知識体系',
        dimensionTitle: '🔮 心・体・魂',
        dimensions: [
            { key: 'mind', icon: '🧠', name: 'MIND · 心', desc: 'プレゼンスベースの探求ツールで、メンタルループ、サバイバル戦略を理解し柔らげる。' },
            { key: 'body', icon: '🫀', name: 'BODY · 体', desc: '体の先天的な知恵に戻り、沈黙のなかに抱えてきた感情やトラウマと安全に出会う。' },
            { key: 'spirit', icon: '✨', name: 'SPIRIT · 魂', desc: '敬意をもって内側に向き合い、存在の静かな脈動を感じ取り、本来の自分を取り戻す。' }
        ],
        taoTitle: '☯ 道の方法',
        taoLines: ['道とは修復ではなく、流れること。', '努力ではなく、プレゼンス。', '強制ではなく、許容。', '癒しは完璧への努力ではない。', 'あなたの本質への帰還。'],
        methodsTitle: '🎓 六つの専門メソッド',
        methods: [
            { key: 'ci', icon: '💜', name: 'Compassionate Inquiry', author: 'Dr. Gabor Maté', desc: '隠れた信念を明らかにし、苦しみの感情的根源を解きほぐすプレゼンスベースのセラピー。' },
            { key: 'ifs', icon: '🪞', name: 'Internal Family System', author: 'Dr. Richard Schwartz', desc: '内なるパーツを優しくマッピングし、自己理解と癒しを促進するトラウマ対応モデル。' },
            { key: 'narm', icon: '🌊', name: 'NARM', author: 'Dr. Laurence Heller', desc: '早期の関係性・発達トラウマに取り組む身体中心のアプローチ。' },
            { key: 'shadow', icon: '🌑', name: 'Shadow Constellation', author: 'Nir Esterman', desc: '隠れた家族力学と無意識の忠誠を照らし出す。' },
            { key: 'coaching', icon: '🌱', name: 'Holistic Life Coaching', author: 'Alan Cohen', desc: 'トラウマ回復を超えた人生変革のサポート。' },
            { key: 'diamond', icon: '💎', name: 'Diamond Approach', author: 'A.H. Almaas', desc: '人格パターンの下にある本質の真実を明らかにするスピリチュアルな探求の道。' }
        ],
        areasTitle: '🎯 三つのサービス領域',
        areas: [
            { key: 'pain', icon: '💆', name: '慢性痛・身体症状の回復', desc: '症状は敵ではなくメッセージ。痛みの感情的根源を一緒に探る。' },
            { key: 'emotion', icon: '🌸', name: '感情処理・トラウマ解放', desc: '感情は安全に、優しく、プレゼンスをもって迎える必要がある。' },
            { key: 'inquiry', icon: '🔍', name: '自己探求・具現化された気づき', desc: 'プレゼンスベースの探求で、パターンの下にいる自分を探る。' }
        ],
        forWhomTitle: '👥 対象者',
        forWhom: ['慢性痛やストレスに悩んでいる方', '感情に圧倒され安全な場所を求めている方', '自己改善に疲れた方', '本当の自分とつながりたい方', '本質を体現したいリーダーや探求者'],
        linkTitle: '詳しくは → 公式サイトへ'
    },
    th: {
        title: '📚 คลังความรู้', intro: 'ความรู้การเยียวยาแบบบูรณาการกาย-ใจ-จิตวิญญาณจาก BeingYourself',
        dimensionTitle: '🔮 กาย · ใจ · จิตวิญญาณ',
        dimensions: [
            { key: 'mind', icon: '🧠', name: 'MIND · จิตใจ', desc: 'ใช้เครื่องมือสำรวจแบบมีสติเพื่อเข้าใจและปลดปล่อยวงจรจิตใจ กลยุทธ์เอาตัวรอด' },
            { key: 'body', icon: '🫀', name: 'BODY · ร่างกาย', desc: 'กลับสู่ภูมิปัญญาดั้งเดิมของร่างกาย พบปะอารมณ์/บาดแผลที่ซ่อนอยู่อย่างปลอดภัย' },
            { key: 'spirit', icon: '✨', name: 'SPIRIT · จิตวิญญาณ', desc: 'หันเข้าข้างในด้วยความเคารพ สัมผัสจังหวะเงียบของการดำรงอยู่' }
        ],
        taoTitle: '☯ วิถีแห่งเต๋า',
        taoLines: ['วิถีแห่งเต๋าไม่ใช่การแก้ไข แต่คือการไหล', 'ไม่ใช่ความพยายาม แต่คือการมีอยู่', 'ไม่ใช่การบังคับ แต่คือการอนุญาต'],
        methodsTitle: '🎓 หกวิธีเชี่ยวชาญ',
        methods: [
            { key: 'ci', icon: '💜', name: 'Compassionate Inquiry', author: 'Dr. Gabor Maté', desc: 'จิตบำบัดแบบมีสติ เผยความเชื่อที่ซ่อนอยู่และคลายรากของความทุกข์' },
            { key: 'ifs', icon: '🪞', name: 'Internal Family System', author: 'Dr. Richard Schwartz', desc: 'ทำแผนที่และเป็นมิตรกับส่วนต่างๆภายในตัวคุณ' },
            { key: 'narm', icon: '🌊', name: 'NARM', author: 'Dr. Laurence Heller', desc: 'แนวทางที่เน้นร่างกายสำหรับบาดแผลในช่วงต้นชีวิต' },
            { key: 'shadow', icon: '🌑', name: 'Shadow Constellation', author: 'Nir Esterman', desc: 'ส่องแสงพลวัตครอบครัวที่ซ่อนอยู่' },
            { key: 'coaching', icon: '🌱', name: 'Holistic Life Coaching', author: 'Alan Cohen', desc: 'สนับสนุนการเปลี่ยนแปลงชีวิตเหนือการฟื้นตัวจากบาดแผล' },
            { key: 'diamond', icon: '💎', name: 'Diamond Approach', author: 'A.H. Almaas', desc: 'เส้นทางสำรวจจิตวิญญาณที่เผยสาระแก่นแท้ของคุณ' }
        ],
        areasTitle: '🎯 สามด้านบริการ',
        areas: [
            { key: 'pain', icon: '💆', name: 'ฟื้นฟูอาการเรื้อรัง', desc: 'อาการไม่ใช่ศัตรู แต่คือข้อความ' },
            { key: 'emotion', icon: '🌸', name: 'ประมวลผลอารมณ์', desc: 'ความรู้สึกต้องการพบปะอย่างปลอดภัยและอ่อนโยน' },
            { key: 'inquiry', icon: '🔍', name: 'สำรวจตนเอง', desc: 'ใช้การสำรวจแบบมีสติเพื่อค้นพบตัวตนที่แท้จริง' }
        ],
        forWhomTitle: '👥 เหมาะสำหรับ',
        forWhom: ['ผู้ประสบความเจ็บปวดเรื้อรัง', 'ผู้ถูกอารมณ์ท่วมท้น', 'ผู้เหนื่อยจากการพัฒนาตัวเอง', 'ผู้ต้องการเชื่อมต่อกับตัวตนที่แท้จริง', 'ผู้นำและผู้แสวงหาความจริง'],
        linkTitle: 'เรียนรู้เพิ่มเติม → เยี่ยมชมเว็บไซต์'
    }
};

Page({
    data: {
        statusBarHeight: 0, navHeight: 0,
        title: '', intro: '', dimensionTitle: '', dimensions: [],
        taoTitle: '', taoLines: [], methodsTitle: '', methods: [],
        areasTitle: '', areas: [], forWhomTitle: '', forWhom: [],
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
    },

    onShow() { this.updateUI(); },

    updateUI() {
        const d = knowledgeData[i18n.getLang()] || knowledgeData.zh;
        this.setData({
            title: d.title, intro: d.intro,
            dimensionTitle: d.dimensionTitle, dimensions: d.dimensions,
            taoTitle: d.taoTitle, taoLines: d.taoLines,
            methodsTitle: d.methodsTitle, methods: d.methods,
            areasTitle: d.areasTitle, areas: d.areas,
            forWhomTitle: d.forWhomTitle, forWhom: d.forWhom,
            linkTitle: d.linkTitle
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
