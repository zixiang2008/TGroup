const i18n = require('../../utils/i18n.js');

// 120+ 身体感受词汇（来自 Body Sensation Vocabulary）
const sensations = [
    { en: 'achy', zh: '酸痛', bodypart: '肌肉/关节', example: '久坐后的背部酸痛' },
    { en: 'airy', zh: '轻盈', bodypart: '胸腔/头部', example: '放松时身体的轻飘感' },
    { en: 'alive', zh: '鲜活', bodypart: '全身', example: '运动后的活力感' },
    { en: 'bloated', zh: '胀满', bodypart: '腹部', example: '饭后腹部膨胀感' },
    { en: 'blocked', zh: '阻塞', bodypart: '喉咙/胸口', example: '想说又说不出的堵' },
    { en: 'breathless', zh: '呼吸困难', bodypart: '胸腔', example: '紧张时气短' },
    { en: 'brittle', zh: '脆弱', bodypart: '全身', example: '感觉一碰就碎' },
    { en: 'bubbly', zh: '冒泡', bodypart: '胸口/胃', example: '兴奋时的雀跃感' },
    { en: 'burning', zh: '灼烧', bodypart: '胸口/脸', example: '愤怒或尴尬时的灼热' },
    { en: 'buzzy', zh: '嗡嗡', bodypart: '头部/全身', example: '焦虑时的震动感' },
    { en: 'chilled', zh: '发冷', bodypart: '全身', example: '恐惧时的寒意' },
    { en: 'clammy', zh: '湿冷', bodypart: '手掌/皮肤', example: '紧张时手心出汗' },
    { en: 'closed', zh: '关闭', bodypart: '喉咙/心', example: '不想与人交流时' },
    { en: 'cold', zh: '冰冷', bodypart: '四肢/全身', example: '恐惧时手脚冰凉' },
    { en: 'congested', zh: '充血', bodypart: '头部/鼻腔', example: '哭泣后的鼻塞感' },
    { en: 'constricted', zh: '收缩', bodypart: '喉咙/胸', example: '焦虑时喉咙发紧' },
    { en: 'constricted breath', zh: '呼吸紧促', bodypart: '胸腔', example: '紧张时呼吸变浅' },
    { en: 'contracted', zh: '收紧', bodypart: '肌肉', example: '保护性的肌肉紧缩' },
    { en: 'cool', zh: '凉爽', bodypart: '皮肤', example: '平静时的清凉感' },
    { en: 'cozy', zh: '舒适', bodypart: '全身', example: '安全环境中的温暖感' },
    { en: 'crampy', zh: '抽筋', bodypart: '腹部/腿', example: '紧张时的肌肉痉挛' },
    { en: 'damp', zh: '潮湿', bodypart: '手掌/皮肤', example: '紧张出汗' },
    { en: 'dense', zh: '沉重', bodypart: '全身', example: '悲伤时身体变重' },
    { en: 'dizzy', zh: '眩晕', bodypart: '头部', example: '恐慌时头晕' },
    { en: 'dull', zh: '钝痛', bodypart: '头部/身体', example: '长期压力的隐隐不适' },
    { en: 'elastic', zh: '弹性', bodypart: '肌肉/身体', example: '放松后的柔软灵活' },
    { en: 'electric', zh: '电流感', bodypart: '脊柱/全身', example: '兴奋或震惊时的触电感' },
    { en: 'empty', zh: '空空的', bodypart: '胸部/腹部', example: '失落时内心的空洞' },
    { en: 'energized', zh: '充满能量', bodypart: '全身', example: '运动后或灵感来时' },
    { en: 'expanding', zh: '膨胀/扩张', bodypart: '胸腔', example: '喜悦时胸口打开' },
    { en: 'faint', zh: '微弱', bodypart: '头部/全身', example: '极度疲劳或恐惧' },
    { en: 'flaccid', zh: '松弛', bodypart: '肌肉', example: '完全放松时的肌肉' },
    { en: 'fluid', zh: '流动', bodypart: '全身', example: '冥想时能量流动感' },
    { en: 'flushed', zh: '发红发热', bodypart: '脸部', example: '尴尬或兴奋时脸红' },
    { en: 'flutter', zh: '颤动', bodypart: '胸口/胃', example: '紧张期待时心跳加速' },
    { en: 'frantic', zh: '慌乱', bodypart: '全身', example: '恐慌时的躁动不安' },
    { en: 'frozen', zh: '僵住', bodypart: '全身', example: '惊吓时的身体凝固' },
    { en: 'full', zh: '充实', bodypart: '胸部/腹部', example: '满足时的饱满感' },
    { en: 'furry', zh: '毛茸茸', bodypart: '皮肤', example: '起鸡皮疙瘩的前兆' },
    { en: 'goose bumpy', zh: '起鸡皮疙瘩', bodypart: '皮肤', example: '感动或恐惧时的反应' },
    { en: 'gurgling', zh: '咕噜', bodypart: '腹部/胃', example: '紧张时肚子叫' },
    { en: 'hard', zh: '僵硬', bodypart: '肌肉/关节', example: '愤怒时身体绷紧' },
    { en: 'heavy', zh: '沉重', bodypart: '全身/四肢', example: '抑郁时身体如灌铅' },
    { en: 'hot', zh: '发热', bodypart: '脸/胸/手', example: '愤怒或尴尬时的热感' },
    { en: 'icy', zh: '冰冷刺骨', bodypart: '全身', example: '极度恐惧时的冰冷' },
    { en: 'intense', zh: '强烈', bodypart: '全身', example: '情绪高峰时的体感' },
    { en: 'itchy', zh: '发痒', bodypart: '皮肤', example: '焦躁时的皮肤不适' },
    { en: 'jagged', zh: '锯齿感', bodypart: '神经', example: '被惊吓后的余波' },
    { en: 'jittery', zh: '颤抖', bodypart: '手/全身', example: '喝太多咖啡或紧张时' },
    { en: 'jumbly', zh: '混乱', bodypart: '头部/胃', example: '不知所措时的翻腾' },
    { en: 'jumpy', zh: '惊跳', bodypart: '全身', example: '过度警觉时一惊一乍' },
    { en: 'knotted', zh: '打结', bodypart: '胃/肩', example: '焦虑时胃里打结' },
    { en: 'light', zh: '轻松', bodypart: '全身', example: '放下负担后的轻快' },
    { en: 'loose', zh: '松散', bodypart: '肌肉', example: '冥想后的放松感' },
    { en: 'moist', zh: '湿润', bodypart: '眼睛/手', example: '感动时眼眶湿润' },
    { en: 'moving', zh: '流动的', bodypart: '内部', example: '情绪在身体中移动' },
    { en: 'nauseous', zh: '恶心', bodypart: '胃', example: '极度紧张或嫌恶时' },
    { en: 'numb', zh: '麻木', bodypart: '全身/局部', example: '长期压抑后的无感' },
    { en: 'open', zh: '打开', bodypart: '胸腔/心', example: '信任时心打开的感觉' },
    { en: 'paralyzed', zh: '瘫痪', bodypart: '全身', example: '极度恐惧时动弹不得' },
    { en: 'pounding', zh: '怦怦跳', bodypart: '心脏', example: '紧张或兴奋时的心跳' },
    { en: 'pressure', zh: '压迫感', bodypart: '胸口/头', example: '压力大时的胸闷头痛' },
    { en: 'prickly', zh: '刺痛', bodypart: '皮肤', example: '回血或紧张时的针刺' },
    { en: 'puffy', zh: '肿胀', bodypart: '眼睛/脸', example: '哭泣后的浮肿感' },
    { en: 'pulled', zh: '被拉扯', bodypart: '胸口/腹', example: '牵挂某人时的拉拽' },
    { en: 'pulsing', zh: '脉动', bodypart: '血管/全身', example: '运动后的脉动感' },
    { en: 'quaking', zh: '颤抖', bodypart: '腿/全身', example: '极度恐惧时的发抖' },
    { en: 'quiet', zh: '安静', bodypart: '全身', example: '深度冥想时的寂静感' },
    { en: 'quivering', zh: '颤栗', bodypart: '嘴唇/手', example: '即将哭泣时的颤抖' },
    { en: 'radiating', zh: '放射', bodypart: '从中心到周围', example: '温暖或疼痛从一点扩散' },
    { en: 'ragged', zh: '粗糙', bodypart: '喉咙/呼吸', example: '哭泣后呼吸不稳' },
    { en: 'raw', zh: '生涩/敏感', bodypart: '喉咙/心', example: '受伤后的脆弱敏感' },
    { en: 'rolling', zh: '翻滚', bodypart: '胃/腹', example: '紧张时的胃翻腾' },
    { en: 'shaky', zh: '颤抖的', bodypart: '手/声音', example: '恐惧或激动时发抖' },
    { en: 'sharp', zh: '尖锐的', bodypart: '局部', example: '突如其来的痛感' },
    { en: 'shimmering', zh: '闪烁', bodypart: '皮肤/全身', example: '兴奋时的全身闪亮感' },
    { en: 'shivery', zh: '发抖', bodypart: '全身', example: '寒冷或恐惧时的颤搐' },
    { en: 'shudder', zh: '战栗', bodypart: '脊椎/全身', example: '恐惧或厌恶时一阵颤栗' },
    { en: 'silky', zh: '丝滑', bodypart: '皮肤/内在', example: '极度放松的流畅感' },
    { en: 'smooth', zh: '顺滑', bodypart: '全身', example: '一切顺利时的流畅感' },
    { en: 'soft', zh: '柔软', bodypart: '肌肉/心', example: '被感动时心变软' },
    { en: 'spacious', zh: '宽敞', bodypart: '胸腔', example: '深呼吸后的开阔感' },
    { en: 'spacious breathing', zh: '呼吸宽畅', bodypart: '胸腔', example: '放松冥想时' },
    { en: 'spasming', zh: '痉挛', bodypart: '肌肉', example: '极度紧张的肌肉抽搐' },
    { en: 'spinning', zh: '旋转', bodypart: '头部', example: '恐慌或醉酒时天旋地转' },
    { en: 'sticky', zh: '粘着', bodypart: '皮肤/内在', example: '怎么也甩不掉的感觉' },
    { en: 'still', zh: '静止', bodypart: '全身', example: '深度冥想时的完全安静' },
    { en: 'stretchy', zh: '可伸展', bodypart: '肌肉', example: '做瑜伽时的感觉' },
    { en: 'stringy', zh: '紧绷如弦', bodypart: '肌肉/神经', example: '长期紧张的肌肉' },
    { en: 'strong', zh: '强壮/有力', bodypart: '全身', example: '充满力量时的感觉' },
    { en: 'suffocating', zh: '窒息', bodypart: '喉咙/胸', example: '极度焦虑时呼吸困难' },
    { en: 'sweaty', zh: '出汗', bodypart: '手掌/全身', example: '紧张或炎热时' },
    { en: 'tender', zh: '柔嫩/温柔', bodypart: '心/受伤处', example: '被善意触动时' },
    { en: 'tense', zh: '紧绷', bodypart: '肩/颈/背', example: '压力大时肌肉紧绷' },
    { en: 'thick', zh: '厚重', bodypart: '头部/身体', example: '疲劳时头脑昏沉' },
    { en: 'throbbing', zh: '抽痛跳动', bodypart: '头/受伤处', example: '头痛时的搏动感' },
    { en: 'tickly', zh: '痒痒', bodypart: '皮肤', example: '轻微刺激的愉悦感' },
    { en: 'tight', zh: '紧', bodypart: '胸/喉/拳', example: '愤怒或焦虑时的紧缩' },
    { en: 'tightness of skin', zh: '皮肤绷紧', bodypart: '面部/全身', example: '紧张时的面部表情' },
    { en: 'tingling', zh: '刺麻', bodypart: '手脚/皮肤', example: '兴奋或血流回归' },
    { en: 'trembly', zh: '微颤', bodypart: '手/唇', example: '紧张或激动时的轻微颤动' },
    { en: 'tremulous', zh: '颤抖不止', bodypart: '全身', example: '惊恐后持续颤抖' },
    { en: 'twitchy', zh: '抽搐', bodypart: '眼/肌肉', example: '疲劳时眼皮跳' },
    { en: 'vibration', zh: '振动', bodypart: '全身', example: '能量流动的振动感' },
    { en: 'warm', zh: '温暖', bodypart: '胸部/手/全身', example: '被爱包围时的温暖' },
    { en: 'wobbly', zh: '摇晃不稳', bodypart: '腿/全身', example: '恐惧或惊吓后腿软' },
];

const titles = { zh: '📋 附录：身体感受词汇表', en: '📋 Appendix: Body Sensation Vocabulary', ja: '📋 付録：身体感覚の語彙', th: '📋 ภาคผนวก: คำศัพท์ความรู้สึกทางร่างกาย' };
const intros = { zh: '学会用语言描述身体感受，是觉察练习的重要基础。这里收录了 ' + sensations.length + ' 个常见的身体感受词汇。', en: 'Learning to describe body sensations is a key foundation of awareness practice. ' + sensations.length + ' common body sensation words included.', ja: '身体の感覚を言葉で表現することは気づきの練習の重要な基礎です。', th: 'การเรียนรู้อธิบายความรู้สึกทางร่างกายเป็นพื้นฐานสำคัญ' };
const searchPlaceholders = { zh: '🔍 搜索感受词汇...', en: '🔍 Search sensations...', ja: '🔍 感覚を検索...', th: '🔍 ค้นหา...' };
const bodyPartLabels = { zh: '📍 常见部位', en: '📍 Common body area', ja: '📍 よくある部位', th: '📍 ส่วนของร่างกาย' };
const exampleLabels = { zh: '💡 出现场景', en: '💡 When it occurs', ja: '💡 よくある場面', th: '💡 เมื่อไหร่จะเกิด' };

Page({
    data: {
        title: '', intro: '', searchPlaceholder: '', bodyPartLabel: '', exampleLabel: '',
        searchText: '', filteredSensations: [], showDetail: false, detailData: {}
    },

    onLoad() {
        i18n.init();
        this.updateUI();
    },

    onShow() { this.updateUI(); },

    updateUI() {
        const lang = i18n.getLang();
        this.setData({
            title: titles[lang] || titles.zh,
            intro: intros[lang] || intros.zh,
            searchPlaceholder: searchPlaceholders[lang] || searchPlaceholders.zh,
            bodyPartLabel: bodyPartLabels[lang] || bodyPartLabels.zh,
            exampleLabel: exampleLabels[lang] || exampleLabels.zh,
            filteredSensations: sensations
        });
    },

    onSearch(e) {
        const text = e.detail.value.toLowerCase().trim();
        this.setData({
            searchText: text,
            filteredSensations: text ? sensations.filter(s =>
                s.en.includes(text) || s.zh.includes(text)
            ) : sensations
        });
    },

    showSensation(e) {
        const item = this.data.filteredSensations[e.currentTarget.dataset.index];
        this.setData({ showDetail: true, detailData: item });
    },

    closeDetail() { this.setData({ showDetail: false }); },
    preventClose() { }
});
