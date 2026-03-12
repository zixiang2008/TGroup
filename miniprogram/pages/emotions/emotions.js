const i18n = require('../../utils/i18n.js');

// 完整的 91 条情绪数据（无需登录即可使用）
const emotionsDataZh = [
    // === 不舒服的感受 (negative) ===
    { zh: '愤怒', en: 'enraged', type: 'negative', intensity: 5, scene: '当底线被严重践踏时', suggestions: ['找安全空间释放能量', '做剧烈运动', '深呼吸20次', '写下原因不评判'] },
    { zh: '恼火', en: 'pissed off', type: 'negative', intensity: 5, scene: '被反复挑衅时', suggestions: ['离开现场冷静', '洗冷水脸', '告诉自己这是正常的', '等情绪消退再回应'] },
    { zh: '生气', en: 'angry', type: 'negative', intensity: 4, scene: '期望落空时', suggestions: ['用T语言表达', '做10个深蹲', '问自己触动什么', '找人倾诉'] },
    { zh: '烦躁', en: 'irritated', type: 'negative', intensity: 3, scene: '被小事反复打扰', suggestions: ['暂时隔离干扰源', '做呼吸练习', '散步5分钟', '接纳这份烦躁'] },
    { zh: '不耐烦', en: 'impatient', type: 'negative', intensity: 3, scene: '等待太久或进展太慢', suggestions: ['做3次深呼吸', '问自己为什么着急', '接受不能控制的', '找其他事做'] },
    { zh: '震惊', en: 'shocked', type: 'negative', intensity: 5, scene: '遭遇意想不到的事', suggestions: ['允许自己震惊', '做深呼吸', '找安全环境', '感受身体存在'] },
    { zh: '沮丧', en: 'frustrated', type: 'negative', intensity: 3, scene: '努力了但没成效', suggestions: ['回顾已有进步', '调整方法', '暂时放下', '请教他人'] },
    { zh: '焦虑', en: 'anxious', type: 'negative', intensity: 3, scene: '对未来不确定', suggestions: ['写下担忧清单', '做10分钟冥想', '注意力回到当下', '减少看手机'] },
    { zh: '恐慌', en: 'panicked', type: 'negative', intensity: 5, scene: '感觉失控或极度害怕', suggestions: ['5-4-3-2-1感官训练', '抓住实体物品', '慢呼吸', '告诉自己这会过去'] },
    { zh: '担心', en: 'worried', type: 'negative', intensity: 2, scene: '关心的事可能出问题', suggestions: ['问自己现在能做什么', '做力所能及的准备', '信任对方', '做放松练习'] },
    { zh: '悲伤', en: 'sad', type: 'negative', intensity: 3, scene: '失去重要的人或事', suggestions: ['允许眼泪流出', '找安全的人诉说', '拥抱自己', '悲伤说明曾在乎'] },
    { zh: '心碎', en: 'heartbroken', type: 'negative', intensity: 5, scene: '深爱的关系破裂', suggestions: ['允许悲痛存在', '不急着振作', '寻求支持', '一天一天来'] },
    { zh: '低落', en: 'down', type: 'negative', intensity: 2, scene: '整体能量不高', suggestions: ['做轻度运动', '晒太阳10分钟', '吃健康食物', '不强迫自己开心'] },
    { zh: '绝望', en: 'hopeless', type: 'negative', intensity: 5, scene: '看不到出路', suggestions: ['找信任的人倾诉', '拨打心理热线', '告诉自己感受会变', '做一件微小的事'] },
    { zh: '无助', en: 'helpless', type: 'negative', intensity: 4, scene: '无力改变处境', suggestions: ['找到能控制的小事', '寻求外部帮助', '回忆曾克服困难的经历', '接纳当下的无力'] },
    { zh: '孤独', en: 'lonely', type: 'negative', intensity: 3, scene: '感到被隔离', suggestions: ['联系老朋友', '去有人的地方', '尝试新社交', '与自己做朋友'] },
    { zh: '害怕', en: 'scared', type: 'negative', intensity: 4, scene: '面对未知或威胁', suggestions: ['找安全的人或地方', '问恐惧保护什么', '从小步骤开始', '回忆克服恐惧的经历'] },
    { zh: '紧张', en: 'tense', type: 'negative', intensity: 3, scene: '即将面临重要场合', suggestions: ['渐进式肌肉放松', '紧张说明在乎', '充分准备', '慢速深呼吸'] },
    { zh: '不安', en: 'uneasy', type: 'negative', intensity: 2, scene: '隐约感觉不对劲', suggestions: ['回想身体信号', '写下不安的来源', '和信任的人聊聊', '做身体扫描'] },
    { zh: '内疚', en: 'guilty', type: 'negative', intensity: 3, scene: '觉得辜负了期望', suggestions: ['检查内疚是否合理', '采取弥补行动', '原谅自己', '学会说不'] },
    { zh: '后悔', en: 'regretful', type: 'negative', intensity: 3, scene: '做了不该做的事', suggestions: ['不过度自责', '问自己学到什么', '如可以道歉', '原谅过去的自己'] },
    { zh: '羞耻', en: 'ashamed', type: 'negative', intensity: 4, scene: '核心自我被否定', suggestions: ['区分羞耻和内疚', '与信任的人分享', '每个人都有脆弱面', '你不等于你的行为'] },
    { zh: '失望', en: 'disappointed', type: 'negative', intensity: 3, scene: '结果和期望有落差', suggestions: ['允许自己失望', '审视期望是否合理', '寻找成长', '调整计划'] },
    { zh: '嫉妒', en: 'jealous', type: 'negative', intensity: 3, scene: '别人有自己想要的', suggestions: ['承认嫉妒不评判', '转化为动力', '列出已拥有的', '向对方学习'] },
    { zh: '委屈', en: 'aggrieved', type: 'negative', intensity: 3, scene: '付出未被看到', suggestions: ['向安全的人表达', '记录你的付出', '你的感受是合理的', '学习表达需求'] },
    { zh: '疲惫', en: 'fatigued', type: 'negative', intensity: 2, scene: '长期透支后', suggestions: ['优质睡眠优先', '学会拒绝', '做恢复能量的事', '调整生活方式'] },
    { zh: '麻木', en: 'numb', type: 'negative', intensity: 2, scene: '长期压抑或过度刺激', suggestions: ['不评判这种状态', '做身体感知练习', '尝试简单的感官刺激', '这是保护机制'] },
    { zh: '迷茫', en: 'uncertain', type: 'negative', intensity: 2, scene: '不知道方向', suggestions: ['写下知道和不知道的', '找有经验的人聊', '迷茫是转变的开始', '做好当下能做的'] },
    { zh: '厌恶', en: 'disgusted', type: 'negative', intensity: 4, scene: '遇到违背价值观的事', suggestions: ['远离让你不适的环境', '厌恶保护你的底线', '表达你的立场', '回到让你舒服的环境'] },
    { zh: '嫌弃', en: 'contemptuous', type: 'negative', intensity: 3, scene: '对某人或某事不满', suggestions: ['嫌弃下面藏着什么？', '是标准太高吗？', '尝试理解对方', '回到自身'] },
    { zh: '压抑', en: 'suppressed', type: 'negative', intensity: 3, scene: '情绪被强行按下', suggestions: ['找安全的出口释放', '写日记', '做运动', '不需要永远坚强'] },
    { zh: '崩溃', en: 'overwhelmed', type: 'negative', intensity: 5, scene: '承受超过极限', suggestions: ['停下所有事情', '找安全的人陪伴', '允许自己脆弱', '一次只处理一件事'] },
    { zh: '空虚', en: 'empty', type: 'negative', intensity: 3, scene: '感觉内心没有东西', suggestions: ['做触觉练习', '与人产生连接', '做有意义的小事', '空虚也是一种信号'] },
    { zh: '被抛弃感', en: 'abandoned', type: 'negative', intensity: 4, scene: '重要的人离开', suggestions: ['你的价值不因他人离开而改变', '表达你的感受', '寻求支持', '给自己时间'] },
    // === 中性感受 (neutral) ===
    { zh: '无聊', en: 'bored', type: 'neutral', intensity: 1, scene: '缺乏刺激', suggestions: ['尝试新活动', '让头脑休息', '问自己渴望什么', '出去散步'] },
    { zh: '犹豫', en: 'hesitant', type: 'neutral', intensity: 2, scene: '面对选择不确定', suggestions: ['列出利弊', '听直觉的声音', '设决定截止时间', '先试试'] },
    { zh: '有保护心', en: 'protective', type: 'neutral', intensity: 2, scene: '想守护重要的人', suggestions: ['确认方式是对方需要的', '保护还是控制？', '信任对方能力', '用关心代替担忧'] },
    { zh: '矛盾', en: 'conflicted', type: 'neutral', intensity: 3, scene: '内心有两种声音', suggestions: ['允许矛盾存在', '写下两方的想法', '矛盾说明你在成长', '不急着做决定'] },
    { zh: '淡淡的', en: 'neutral', type: 'neutral', intensity: 1, scene: '没有特别的感受', suggestions: ['享受这份平淡', '注意身体的微妙感觉', '不必追求强烈感受', '做身体扫描'] },
    { zh: '怀旧', en: 'nostalgic', type: 'neutral', intensity: 2, scene: '回忆过去的美好', suggestions: ['享受回忆', '和老朋友联系', '怀旧说明你珍惜', '写下值得纪念的事'] },
    { zh: '若有所思', en: 'contemplative', type: 'neutral', intensity: 2, scene: '沉浸在思考中', suggestions: ['记录你的想法', '做冥想', '和人分享思考', '不急于得到答案'] },
    { zh: '警觉', en: 'alert', type: 'neutral', intensity: 3, scene: '感知到环境变化', suggestions: ['注意身体信号', '评估是否安全', '做几次深呼吸', '信任你的直觉'] },
    // === 舒服的感受 (positive) ===
    { zh: '惊讶', en: 'surprised', type: 'positive', intensity: 4, scene: '遇到意料之外的好事', suggestions: ['充分感受惊喜', '分享喜悦', '记录美好瞬间', '保持好奇心'] },
    { zh: '兴奋', en: 'excited', type: 'positive', intensity: 4, scene: '对即将发生的好事期待', suggestions: ['享受期待过程', '把能量用在准备', '分享期待', '保持开放心态'] },
    { zh: '喜悦', en: 'delighted', type: 'positive', intensity: 4, scene: '遇到令人高兴的事', suggestions: ['微笑感受喜悦', '感恩带来喜悦的人', '分享周围的人', '做更多喜悦的事'] },
    { zh: '骄傲', en: 'proud', type: 'positive', intensity: 4, scene: '为成就感到自豪', suggestions: ['对自己说你做到了', '庆祝每个小成就', '分享喜悦', '用自信面对挑战'] },
    { zh: '感恩', en: 'grateful', type: 'positive', intensity: 3, scene: '意识到拥有的一切', suggestions: ['每天写3件感恩的事', '向让你感恩的人表达', '把感恩变成习惯', '从小事发现感恩'] },
    { zh: '好奇', en: 'curious', type: 'positive', intensity: 3, scene: '对新事物感兴趣', suggestions: ['立即去探索', '保持提问习惯', '好奇心是智慧起源', '和不同人交流'] },
    { zh: '放松', en: 'relaxed', type: 'positive', intensity: 2, scene: '身心没有紧张', suggestions: ['享受当下轻松', '做创造性的事', '保持轻松节奏', '记住放松方法'] },
    { zh: '平和', en: 'peaceful', type: 'positive', intensity: 2, scene: '内心没有冲突', suggestions: ['做冥想深化平和', '让平和成为基调', '分享这份能量', '在平和中做决定'] },
    { zh: '满足', en: 'content', type: 'positive', intensity: 2, scene: '刚刚好的感觉', suggestions: ['享受够了的感觉', '不被比较打扰', '感恩拥有的', '在满足中成长'] },
    { zh: '温暖', en: 'warm', type: 'positive', intensity: 2, scene: '被关心或产生连接', suggestions: ['感受身体温暖', '表达感谢', '传递温暖', '珍惜连接'] },
    { zh: '宁静', en: 'serene', type: 'positive', intensity: 1, scene: '深层的平静和安宁', suggestions: ['在宁静中与自己对话', '做感恩冥想', '写日记', '把宁静作为家'] },
    { zh: '冷静', en: 'calm', type: 'positive', intensity: 1, scene: '情绪稳定头脑清晰', suggestions: ['用这状态做重要决策', '练习冥想', '观察自己', '帮助他人找到冷静'] },
    { zh: '自信', en: 'confident', type: 'positive', intensity: 3, scene: '相信自己的能力', suggestions: ['趁此状态挑战新事物', '记住这个感觉', '鼓励别人', '自信不是完美'] },
    { zh: '希望', en: 'hopeful', type: 'positive', intensity: 3, scene: '对未来有信心', suggestions: ['制定计划', '写下愿景', '分享希望', '每天做一小步'] },
    { zh: '幸福', en: 'happy', type: 'positive', intensity: 4, scene: '深层的满足和快乐', suggestions: ['停下来感受幸福', '分享幸福', '记录这一刻', '幸福不需要理由'] },
    { zh: '感动', en: 'touched', type: 'positive', intensity: 3, scene: '被善意或美好触动', suggestions: ['让泪水自由流淌', '向触动你的人表达', '做一件善事传递', '记录感动时刻'] },
    { zh: '释然', en: 'relieved', type: 'positive', intensity: 3, scene: '放下了执念', suggestions: ['让身体也放松', '感受轻松', '释然是智慧', '珍惜这份自由'] },
    { zh: '被爱', en: 'loved', type: 'positive', intensity: 4, scene: '感受到来自他人的爱', suggestions: ['接受这份爱', '回馈爱', '你值得被爱', '记住这种温度'] },
    { zh: '安全感', en: 'secure', type: 'positive', intensity: 2, scene: '感觉被保护', suggestions: ['享受安全', '从安全出发探索', '帮他人创造安全', '安全是成长的基础'] },
    { zh: '敬畏', en: 'awed', type: 'positive', intensity: 4, scene: '面对宏大或美妙的事物', suggestions: ['完全沉浸', '保持谦逊', '记录这份感受', '敬畏让人变得渺小而伟大'] },
    { zh: '勇敢', en: 'courageous', type: 'positive', intensity: 3, scene: '面对恐惧仍然前进', suggestions: ['为自己骄傲', '勇气是做害怕的事', '记录勇敢时刻', '鼓励他人勇敢'] },
    { zh: '充实', en: 'fulfilled', type: 'positive', intensity: 3, scene: '做了有意义的事', suggestions: ['享受充实感', '做更多有意义的事', '分享经验', '充实不等于忙碌'] },
    { zh: '轻松', en: 'lighthearted', type: 'positive', intensity: 2, scene: '没有负担的感觉', suggestions: ['做有趣的事', '和朋友相聚', '保持这份轻盈', '运动放大轻松'] },
    { zh: '活力', en: 'energized', type: 'positive', intensity: 4, scene: '充满能量和动力', suggestions: ['趁有能量完成重要任务', '运动放大活力', '分享能量', '记住活力的来源'] },
    { zh: '连接感', en: 'connected', type: 'positive', intensity: 3, scene: '与他人或世界产生共鸣', suggestions: ['珍惜这份连接', '表达你的感受', '与更多人创造连接', '连接是人类本能需求'] },
];

function getEmotionName(e) {
    const lang = i18n.getLang();
    if (lang === 'zh') return e.zh;
    if (lang === 'en') return e.en;
    return e.zh;
}

function makeDots(n) {
    return '●'.repeat(n) + '○'.repeat(5 - n);
}

Page({
    data: {
        introText: '',
        filters: {},
        currentFilter: 'all',
        filteredEmotions: [],
        showModal: false,
        detail: {},
        totalCount: 0
    },

    onLoad() {
        i18n.init();
        this.updateUI();
    },

    onShow() {
        this.updateUI();
    },

    updateUI() {
        const introTexts = {
            zh: '点击任意情绪了解它。共 ' + emotionsDataZh.length + ' 种情绪，无需登录即可使用。',
            en: emotionsDataZh.length + ' emotions to explore. No login required.',
            ja: emotionsDataZh.length + ' の感情を探索。ログイン不要。',
            th: emotionsDataZh.length + ' อารมณ์ ไม่ต้องเข้าสู่ระบบ'
        };
        this.setData({
            introText: introTexts[i18n.getLang()] || introTexts.zh,
            totalCount: emotionsDataZh.length,
            filters: {
                all: i18n.t('filters.all') + ' (' + emotionsDataZh.length + ')',
                negative: i18n.t('filters.negative'),
                neutral: i18n.t('filters.neutral'),
                positive: i18n.t('filters.positive')
            }
        });
        this.applyFilter(this.data.currentFilter);
    },

    setFilter(e) {
        const filter = e.currentTarget.dataset.filter;
        this.setData({ currentFilter: filter });
        this.applyFilter(filter);
    },

    applyFilter(filter) {
        let data = emotionsDataZh;
        if (filter !== 'all') data = data.filter(e => e.type === filter);

        // 更新过滤器计数
        if (filter !== 'all') {
            const count = data.length;
            const filterKey = filter;
            const filters = { ...this.data.filters };
            filters[filterKey] = i18n.t('filters.' + filterKey) + ' (' + count + ')';
            this.setData({ filters });
        }

        const filteredEmotions = data.map((e, i) => {
            const origIndex = emotionsDataZh.indexOf(e);
            return {
                origIndex,
                name: getEmotionName(e),
                en: e.en,
                type: e.type,
                dots: makeDots(e.intensity)
            };
        });
        this.setData({ filteredEmotions });
    },

    showDetail(e) {
        // 无需登录即可查看详情
        const index = e.currentTarget.dataset.index;
        const em = emotionsDataZh[index];
        if (!em) return;

        this.setData({
            showModal: true,
            detail: {
                name: getEmotionName(em),
                en: em.en,
                dots: makeDots(em.intensity),
                intensityLabel: i18n.t('emotionDetail.intensity'),
                sceneLabel: i18n.t('emotionDetail.scene'),
                scene: em.scene,
                suggestionsLabel: i18n.t('emotionDetail.suggestions'),
                suggestions: em.suggestions,
                tagsLabel: i18n.t('emotionDetail.tags'),
                typeLabel: i18n.t('emotionTypes.' + em.type),
                intensityValue: em.intensity
            }
        });
    },

    closeModal() {
        this.setData({ showModal: false });
    },

    preventClose() { }
});
