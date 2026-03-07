/* ============================================
   情绪罗盘模块 - emotions.js (i18n + auth)
   ============================================ */

const EmotionsModule = (() => {
  // 原始中文情绪数据
  const emotionsDataZh = [
    { zh: '愤怒', en: 'enraged', type: 'negative', intensity: 5, scene: '当底线被严重践踏，感受到极大的不公正或被伤害时', suggestions: ['找一个安全的空间，用力锤打枕头或大声呐喊释放能量', '做剧烈运动如跑步、拳击', '深呼吸20次，4秒吸-7秒停-8秒呼', '写下愤怒的原因，不评判，只是写'] },
    { zh: '恼火', en: 'pissed off', type: 'negative', intensity: 5, scene: '被人反复挑衅或感到极度不尊重时', suggestions: ['离开现场，给自己冷静的空间', '洗一个冷水脸', '告诉自己：我现在很恼火，这是正常的', '等情绪消退后再回应'] },
    { zh: '生气', en: 'angry', type: 'negative', intensity: 4, scene: '期望落空，或看到不合理的事情发生时', suggestions: ['用T语言表达："我感到生气，因为……"', '做10个深蹲或俯卧撑', '问自己：这件事触动了我什么价值观？', '找信任的人倾诉'] },
    { zh: '震惊', en: 'shocked', type: 'negative', intensity: 5, scene: '突然遭遇意想不到的坏消息或变故时', suggestions: ['允许自己震惊，不急于反应', '做几次缓慢的深呼吸', '找一个安全稳定的环境坐下来', '脚踩地面，感受身体的存在'] },
    { zh: '胆怯', en: 'intimidated', type: 'negative', intensity: 4, scene: '面对权威或感到被压迫时', suggestions: ['站直身体，做出有力量的姿势', '记住自己过往成功的经历', '小步骤行动，不需要一次到位', '问自己：最坏的情况是什么？'] },
    { zh: '有报复心', en: 'vindictive', type: 'negative', intensity: 5, scene: '感到被深深伤害，想要还击时', suggestions: ['写一封不发出去的信', '觉察这种冲动来自哪个被伤害的部分', '做20分钟有氧运动', '找专业的人谈谈'] },
    { zh: '愤慨', en: 'exasperated', type: 'negative', intensity: 4, scene: '反复遇到同样的问题，感到筋疲力尽时', suggestions: ['暂停正在做的事情', '列出真正让你烦躁的核心问题', '寻求帮助或换一个方式解决', '接受有些事情不在自己控制范围内'] },
    { zh: '不堪重负', en: 'overwhelmed', type: 'negative', intensity: 4, scene: '事情太多太复杂，感觉自己承受不了时', suggestions: ['把所有事情写下来，清空大脑', '只选一件最重要的事先做', '对不重要的事说"不"', '休息10分钟，什么都不做'] },
    { zh: '沮丧', en: 'frustrated', type: 'negative', intensity: 3, scene: '努力了但没有看到成效时', suggestions: ['回顾已经取得的进步', '调整期望和方法', '暂时放下，做些轻松的事', '向有经验的人请教'] },
    { zh: '焦躁', en: 'restless', type: 'negative', intensity: 3, scene: '心神不宁，无法集中注意力时', suggestions: ['做身体扫描冥想', '散步或简单运动', '减少咖啡因摄入', '写下让你不安的事情'] },
    { zh: '恐慌', en: 'panicked', type: 'negative', intensity: 5, scene: '突然感到失控或极度危险时', suggestions: ['5-4-3-2-1练习：说出5个看到的、4个听到的…', '双脚踩地，感受支撑', '提醒自己：这是暂时的', '慢慢数数从1到10'] },
    { zh: '憎恨', en: 'resentful', type: 'negative', intensity: 4, scene: '长期积累的不满和委屈时', suggestions: ['写日记梳理这段关系的经历', '练习宽恕冥想（为自己，不为对方）', '设立健康的边界', '考虑是否需要专业支持'] },
    { zh: '烦躁', en: 'annoyed', type: 'negative', intensity: 3, scene: '被小事打扰或打断时', suggestions: ['觉察是什么具体事情引起了烦躁', '问自己：这件事一周后还重要吗？', '喝杯水，做3次深呼吸', '表达你的需求'] },
    { zh: '不耐烦', en: 'impatient', type: 'negative', intensity: 3, scene: '等待时间太长或进展太慢时', suggestions: ['利用等待时间做正念呼吸', '转移注意力到其他有意义的事情上', '接受有些事情需要时间', '问自己：着急能改变什么？'] },
    { zh: '抗拒', en: 'resistant', type: 'negative', intensity: 3, scene: '被要求做不想做的事情时', suggestions: ['探索抗拒背后的需求是什么', '问自己：这真的违背我的价值观吗？', '找到做这件事的个人意义', '与对方沟通你的感受'] },
    { zh: '厌恶', en: 'disgusted', type: 'negative', intensity: 4, scene: '遇到违背道德或让人反感的事物时', suggestions: ['离开让你不舒服的环境', '用水洗手洗脸，象征性清洁', '表达你的价值观底线', '问自己：这触动了我什么？'] },
    { zh: '害怕', en: 'scared', type: 'negative', intensity: 4, scene: '面对未知、威胁或可能的伤害时', suggestions: ['找一个让你感到安全的人或地方', '问自己：恐惧在保护我什么？', '从小步骤开始面对', '回忆过去克服恐惧的经历'] },
    { zh: '焦虑', en: 'anxious', type: 'negative', intensity: 3, scene: '对未来不确定的事情过度担忧时', suggestions: ['写下担忧清单，区分可控和不可控', '做10分钟正念冥想', '把注意力带回当下正在做的事', '减少看手机/新闻的时间'] },
    { zh: '担心', en: 'worried', type: 'negative', intensity: 2, scene: '关心在乎的人或事可能出问题时', suggestions: ['问自己：我现在能做什么？', '做力所能及的准备', '信任对方有自己的力量', '睡前做身体放松练习'] },
    { zh: '心疼', en: 'concerned', type: 'negative', intensity: 2, scene: '看到他人受苦或处境困难时', suggestions: ['询问对方需要什么帮助', '陪伴而非急于给建议', '照顾好自己的感受', '做力所能及的事'] },
    { zh: '嫉妒', en: 'jealous', type: 'negative', intensity: 3, scene: '看到别人拥有自己想要的东西时', suggestions: ['承认嫉妒，不评判自己', '把嫉妒转化为行动的动力', '列出自己已经拥有的', '向对方学习'] },
    { zh: '羡慕', en: 'envious', type: 'negative', intensity: 2, scene: '欣赏他人的成就但感到自己不够时', suggestions: ['区分健康的欣赏和有毒的比较', '问自己：我真正想要的是什么？', '制定自己的小目标', '感恩自己拥有的'] },
    { zh: '紧张', en: 'tense', type: 'negative', intensity: 3, scene: '即将面临重要场合或挑战时', suggestions: ['渐进式肌肉放松', '告诉自己：紧张说明我在乎', '准备充分可以减少紧张', '做几次慢速深呼吸'] },
    { zh: '有戒备心', en: 'defensive', type: 'negative', intensity: 3, scene: '感到被批评或需要保护自己时', suggestions: ['暂停，不要立即反击', '问自己：对方的话里有真实的部分吗？', '用T语言回应', '保持好奇心而非防御心'] },
    { zh: '有保护心', en: 'protective', type: 'neutral', intensity: 2, scene: '想要守护重要的人或事物时', suggestions: ['确认保护的方式是对方需要的', '问自己：我是在保护还是在控制？', '信任对方的能力', '用关心代替担忧'] },
    { zh: '后悔', en: 'regretful', type: 'negative', intensity: 3, scene: '做了某件事后觉得不该那样做时', suggestions: ['承认错误，但不过度自责', '问自己学到了什么', '如果可以，向对方道歉', '原谅过去的自己'] },
    { zh: '失望', en: 'disappointed', type: 'negative', intensity: 3, scene: '结果和期望有较大落差时', suggestions: ['允许自己感到失望', '重新审视期望是否合理', '寻找失望中的成长', '调整下一步计划'] },
    { zh: '不高兴', en: 'upset', type: 'negative', intensity: 2, scene: '被某件事情影响了心情时', suggestions: ['做自己喜欢的事情', '和朋友聊聊天', '听一首喜欢的音乐', '去自然中走走'] },
    { zh: '犹豫', en: 'hesitant', type: 'neutral', intensity: 2, scene: '面对选择不确定该如何决定时', suggestions: ['列出每个选择的利弊', '听听内心直觉的声音', '给自己设一个决定的截止时间', '先选一个试试，不完美也可以'] },
    { zh: '无聊', en: 'bored', type: 'neutral', intensity: 1, scene: '缺乏刺激或没有感兴趣的事情时', suggestions: ['尝试一项新活动', '无聊也是有价值的——让头脑休息', '问自己：我内心真正渴望什么？', '出去散步，观察周围环境'] },
    { zh: '羞辱', en: 'humiliated', type: 'negative', intensity: 5, scene: '在他人面前被严重贬低或出丑时', suggestions: ['提醒自己：这不代表我的全部', '寻求信任的人的支持', '给自己时间疗愈', '做一件让自己感到价值的事'] },
    { zh: '懊悔', en: 'remorseful', type: 'negative', intensity: 4, scene: '意识到自己的行为给他人造成了伤害时', suggestions: ['真诚地道歉', '采取弥补行动', '原谅自己是人会犯错的', '从中学到教训'] },
    { zh: '悲伤', en: 'sad', type: 'negative', intensity: 3, scene: '失去重要的人或事物时', suggestions: ['允许眼泪流出来', '找一个安全的人诉说', '拥抱自己的身体', '悲伤说明你曾深深在乎'] },
    { zh: '低落', en: 'down', type: 'negative', intensity: 2, scene: '整体能量不高，提不起劲时', suggestions: ['做一些轻度运动如散步', '晒太阳10分钟', '吃健康的食物', '不强迫自己"开心起来"'] },
    { zh: '迷茫', en: 'uncertain', type: 'negative', intensity: 2, scene: '不知道该往哪个方向走时', suggestions: ['写下自己知道的和不知道的', '找有经验的人聊聊', '迷茫可能是转变的开始', '做好当下能做的事'] },
    { zh: '羞愧', en: 'ashamed', type: 'negative', intensity: 4, scene: '觉得自己做了不好的事时', suggestions: ['区分"我做了坏事"和"我是坏人"', '向信任的人分享你的感受', '每个人都会犯错', '做一件弥补的善行'] },
    { zh: '尴尬', en: 'embarrassed', type: 'negative', intensity: 2, scene: '在社交场合出现意外情况时', suggestions: ['幽默面对，笑一笑就过了', '大多数人很快就会忘记', '每个人都有尴尬的时刻', '不必太在意他人的眼光'] },
    { zh: '内疚', en: 'guilty', type: 'negative', intensity: 3, scene: '觉得自己辜负了他人的期望时', suggestions: ['检查内疚是否合理', '采取行动弥补', '原谅自己', '学会说"不"来预防过度承诺'] },
    { zh: '消沉', en: 'subdued', type: 'negative', intensity: 2, scene: '经历挫折后失去活力时', suggestions: ['允许自己休息', '回顾过去克服困难的经历', '一小步一小步来', '寻求专业支持如有需要'] },
    { zh: '无所谓', en: 'indifferent', type: 'neutral', intensity: 1, scene: '对事情失去关心和热情时', suggestions: ['问自己：我在回避什么？', '尝试接触新事物', '无所谓可能是一种自我保护', '找到曾经点燃你热情的事'] },
    { zh: '痛苦', en: 'miserable', type: 'negative', intensity: 5, scene: '承受巨大的身心压力时', suggestions: ['你不必独自承受', '今天就联系一个关心你的人', '做身体需要的事：吃饭、睡觉、洗澡', '专业帮助非常重要'] },
    { zh: '孤独', en: 'lonely', type: 'negative', intensity: 3, scene: '感到被隔离或不被理解时', suggestions: ['主动联系一个老朋友', '去有人的地方如咖啡厅', '尝试新的社交活动', '与自己做朋友，享受独处'] },
    { zh: '受伤', en: 'hurt', type: 'negative', intensity: 3, scene: '被亲近的人的言行伤害到时', suggestions: ['承认受伤是因为在乎', '用T语言表达感受', '给自己疗愈的时间', '设立健康的边界'] },
    { zh: '疲惫', en: 'fatigued', type: 'negative', intensity: 2, scene: '长期透支后身心俱疲时', suggestions: ['优质睡眠是第一优先', '学会拒绝不必要的事', '做让自己恢复能量的事', '考虑生活方式的调整'] },
    { zh: '平淡', en: 'flat', type: 'neutral', intensity: 1, scene: '生活缺乏变化和动力时', suggestions: ['打破日常惯例，尝试新事物', '回忆曾经让你兴奋的事', '设定一个小的挑战目标', '平淡也是一种安稳'] },
    { zh: '绝望', en: 'hopeless', type: 'negative', intensity: 5, scene: '看不到任何出路或希望时', suggestions: ['你现在感受到的不代表永远', '立即联系心理援助热线', '做一件微小的事带来一点掌控感', '回忆生命中度过的艰难时刻'] },
    { zh: '无助', en: 'powerless', type: 'negative', intensity: 4, scene: '面对困境感觉自己无能为力时', suggestions: ['找出一件你能掌控的小事', '寻求他人的帮助', '无助感不代表你真的无能', '一步一步来'] },
    { zh: '抑郁', en: 'depressed', type: 'negative', intensity: 4, scene: '持续感到悲伤和失去兴趣时', suggestions: ['寻求专业心理健康支持', '每天做15分钟轻度运动', '保持基本的生活规律', '告诉一个信任的人你的状态'] },
    { zh: '丧气', en: 'demoralized', type: 'negative', intensity: 3, scene: '多次失败后失去继续的勇气时', suggestions: ['降低目标，从最小的成功开始', '看看他人的失败-成功故事', '休息一段时间再重新开始', '换一个全新的角度思考'] },
    { zh: '冷漠', en: 'apathetic', type: 'neutral', intensity: 1, scene: '对周围的事物完全提不起兴趣时', suggestions: ['这可能是身心疲惫的信号', '做一次身体检查', '尝试接触大自然', '考虑是否需要专业支持'] },
    { zh: '惊讶', en: 'surprised', type: 'positive', intensity: 4, scene: '遇到出乎意料的好事时', suggestions: ['停下来充分感受这份惊喜', '分享你的喜悦给他人', '记录这个美好的瞬间', '对生活保持好奇心'] },
    { zh: '受启发', en: 'inspired', type: 'positive', intensity: 4, scene: '被某个想法、作品或人物深深触动时', suggestions: ['立刻记录下你的灵感', '把灵感转化为具体行动计划', '感恩启发你的源泉', '保持学习和探索'] },
    { zh: '兴高采烈', en: 'elated', type: 'positive', intensity: 5, scene: '达成重要目标或经历美好时刻时', suggestions: ['充分享受这份快乐', '和重要的人分享', '记录在感恩日记中', '回味这份感觉以备低落时用'] },
    { zh: '狂喜', en: 'ecstatic', type: 'positive', intensity: 5, scene: '极度开心到无法自已时', suggestions: ['让自己尽情表达', '用身体感受这份能量', '分享给在乎的人', '享受当下这一刻'] },
    { zh: '有动力', en: 'motivated', type: 'positive', intensity: 4, scene: '找到目标和方向，充满干劲时', suggestions: ['趁热打铁，立即行动', '制定具体的执行计划', '分享你的目标增加动力', '记住这股能量的来源'] },
    { zh: '勇敢', en: 'brave', type: 'positive', intensity: 4, scene: '面对恐惧依然选择行动时', suggestions: ['为自己的勇气感到骄傲', '一步一步，不必完美', '记录自己勇敢的时刻', '鼓励他人也勇敢起来'] },
    { zh: '兴奋', en: 'excited', type: 'positive', intensity: 4, scene: '对即将发生的好事充满期待时', suggestions: ['享受期待的过程', '把兴奋的能量用在准备上', '分享你的期待', '保持开放的心态'] },
    { zh: '欢欣', en: 'joyful', type: 'positive', intensity: 5, scene: '内心深处感到真诚的快乐时', suggestions: ['让自己沉浸其中', '用笑容和行动传递喜悦', '记住这个感觉', '做更多带来这种感受的事'] },
    { zh: '坚定', en: 'determined', type: 'positive', intensity: 4, scene: '清楚自己要什么，愿意付出努力时', suggestions: ['把决心写下来作为提醒', '找一个问责伙伴', '预见困难并准备应对方案', '每天复习你的目标'] },
    { zh: '热切', en: 'eager', type: 'positive', intensity: 3, scene: '渴望学习新事物或开始新旅程时', suggestions: ['立即开始第一步', '保持初心', '享受学习的过程', '找到志同道合的伙伴'] },
    { zh: '骄傲', en: 'proud', type: 'positive', intensity: 4, scene: '为自己或他人的成就感到自豪时', suggestions: ['对自己说："你做到了"', '庆祝每一个小成就', '分享你的喜悦', '用这份自信面对下一个挑战'] },
    { zh: '喜悦', en: 'delighted', type: 'positive', intensity: 4, scene: '遇到令人高兴的事情时', suggestions: ['微笑，让身体感受到喜悦', '感恩带来喜悦的人和事', '分享给周围的人', '做更多让自己喜悦的事'] },
    { zh: '信任', en: 'trusting', type: 'positive', intensity: 3, scene: '对人和事感到安全可靠时', suggestions: ['珍惜让你信任的关系', '用行动维护信任', '也学会信任自己', '感恩能够信任的能力'] },
    { zh: '愉快', en: 'cheerful', type: 'positive', intensity: 3, scene: '心情明朗，觉得生活美好时', suggestions: ['把好心情带给周围的人', '做计划和创造性的活动', '享受这个状态', '记住是什么让你感到愉快'] },
    { zh: '俏皮', en: 'playful', type: 'positive', intensity: 3, scene: '轻松有趣，想要玩耍时', suggestions: ['尽情玩耍和创造', '不要觉得不够"成熟"', '邀请他人一起玩', '保持内在的孩子气'] },
    { zh: '愉快', en: 'happy', type: 'positive', intensity: 3, scene: '生活顺利，感到满意时', suggestions: ['感恩当下', '分享幸福给他人', '做长期计划', '记录幸福的瞬间'] },
    { zh: '关怀', en: 'caring', type: 'positive', intensity: 3, scene: '发自内心想要照顾和帮助他人时', suggestions: ['表达你的关心', '也关怀自己', '用对方需要的方式去关怀', '享受给予的快乐'] },
    { zh: '有希望', en: 'hopeful', type: 'positive', intensity: 3, scene: '看到事情好转的迹象时', suggestions: ['用希望驱动行动', '记录积极的迹象', '分享你的希望', '制定向前的计划'] },
    { zh: '温暖', en: 'warm', type: 'positive', intensity: 2, scene: '被人关心或与人产生连接时', suggestions: ['感受身体里温暖的感觉', '表达感谢', '传递温暖给下一个人', '珍惜这种连接'] },
    { zh: '慈爱', en: 'loving', type: 'positive', intensity: 4, scene: '对他人涌起深深的爱意时', suggestions: ['用行动表达爱', '也爱自己', '享受爱的流动', '不求回报地给予'] },
    { zh: '好奇', en: 'curious', type: 'positive', intensity: 3, scene: '对新事物感兴趣想要探索时', suggestions: ['立即去探索', '保持提问的习惯', '好奇心是智慧的起源', '和不同的人交流'] },
    { zh: '乐观', en: 'optimistic', type: 'positive', intensity: 3, scene: '相信事情会越来越好时', suggestions: ['把乐观变成行动', '分享正能量', '同时也做实际的准备', '帮助他人建立信心'] },
    { zh: '有信心', en: 'confident', type: 'positive', intensity: 3, scene: '对自己的能力感到确信时', suggestions: ['承担新的挑战', '帮助他人建立自信', '谦虚但不自我贬低', '持续精进你的能力'] },
    { zh: '欣慰', en: 'gratified', type: 'positive', intensity: 3, scene: '看到自己的付出结出果实时', suggestions: ['庆祝这份成果', '感谢帮助你的人', '记录这个里程碑', '为下一段旅程做准备'] },
    { zh: '专注', en: 'centered', type: 'positive', intensity: 3, scene: '内外合一，感到扎根和平衡时', suggestions: ['保持这个状态做重要的决定', '做冥想维持专注', '记住回到专注的方法', '在专注中完成重要工作'] },
    { zh: '开放', en: 'open', type: 'positive', intensity: 2, scene: '愿意接受新的可能性时', suggestions: ['尝试不同的观点', '说"是"更多一些', '到新的环境中去', '放下预设的判断'] },
    { zh: '感恩', en: 'grateful', type: 'positive', intensity: 3, scene: '意识到拥有的一切时', suggestions: ['每天写3件感恩的事', '向让你感恩的人表达', '把感恩变成习惯', '从小事中发现值得感恩的'] },
    { zh: '感激', en: 'appreciative', type: 'positive', intensity: 3, scene: '收到帮助或善意时', suggestions: ['真诚地说"谢谢"', '用行动回报', '把这份善意传递下去', '记录在感恩日记中'] },
    { zh: '放松', en: 'relaxed', type: 'positive', intensity: 2, scene: '身心没有紧张或压力时', suggestions: ['享受当下的轻松', '做些创造性的事', '保持放松的生活节奏', '记住放松的方法'] },
    { zh: '满意', en: 'satisfied', type: 'positive', intensity: 2, scene: '事情按照期望进行时', suggestions: ['肯定自己的努力', '享受成就感', '设定新的目标', '和他人分享满足感'] },
    { zh: '如释重负', en: 'relieved', type: 'positive', intensity: 3, scene: '困难过去，压力释放时', suggestions: ['给自己一个拥抱', '做几个深呼吸庆祝', '休息和恢复', '记住这次经历的教训'] },
    { zh: '高兴', en: 'glad', type: 'positive', intensity: 2, scene: '遇到好事或好消息时', suggestions: ['微笑着感受这份高兴', '分享好消息', '做更多开心的事', '回忆时也会微笑'] },
    { zh: '安心', en: 'secure', type: 'positive', intensity: 2, scene: '感到安全和被保护时', suggestions: ['珍惜让你安心的环境和人', '帮助他人也感到安心', '在安全中探索和成长', '感恩稳定的生活'] },
    { zh: '平和', en: 'peaceful', type: 'positive', intensity: 2, scene: '内心没有冲突，一切和谐时', suggestions: ['做冥想深化这份平和', '让平和成为你的基调', '把这份能量分享出去', '在和平中做重要决定'] },
    { zh: '接纳', en: 'accepting', type: 'positive', intensity: 2, scene: '接受事物本来的样子时', suggestions: ['放下想要改变一切的执念', '接纳不完美', '对自己也温柔一些', '接纳是改变的第一步'] },
    { zh: '满足', en: 'content', type: 'positive', intensity: 2, scene: '不多不少，刚刚好的感觉时', suggestions: ['享受"够了"的感觉', '不被比较打扰', '感恩拥有的一切', '在满足中继续成长'] },
    { zh: '冷静', en: 'calm', type: 'positive', intensity: 1, scene: '情绪稳定，头脑清晰时', suggestions: ['用这个状态做重要决策', '练习冥想加深冷静', '在冷静中观察自己', '帮助他人也找到冷静'] },
    { zh: '慵懒', en: 'chill', type: 'positive', intensity: 1, scene: '没有压力，悠闲自在时', suggestions: ['享受不做事的时光', '不给自己压力', '放松是一种能力', '在慵懒中恢复能量'] },
    { zh: '宁静', en: 'serene', type: 'positive', intensity: 1, scene: '深层的平静和安宁时', suggestions: ['在宁静中与自己对话', '做感恩冥想', '写日记记录这份感受', '把宁静作为你的家'] },
    { zh: '平和', en: 'mellow', type: 'positive', intensity: 1, scene: '柔和、温润的内在状态时', suggestions: ['做温和的瑜伽或太极', '和亲近的人待在一起', '品一杯热茶', '享受生活的简单'] },
  ];

  function getLocalizedData() {
    const lang = I18n.getLang();
    if (lang === 'zh') return emotionsDataZh;
    const langData = window.EmotionsLang;
    return emotionsDataZh.map((e, i) => ({
      ...e,
      displayName: langData?.names?.[lang]?.[i] || (lang === 'en' ? e.en : e.zh),
      scene: langData?.scenes?.[lang]?.[i] || e.scene,
    }));
  }

  function getEmotionName(e, i) {
    const lang = I18n.getLang();
    if (lang === 'zh') return e.zh;
    if (lang === 'en') return e.en;
    return window.EmotionsLang?.names?.[lang]?.[i] || e.zh;
  }

  function init() {
    renderFilters();
    renderGrid('all');
    bindEvents();
  }

  function renderFilters() {
    const container = document.getElementById('emotion-filters');
    const introText = document.getElementById('emotions-intro-text');
    const t = I18n.t.bind(I18n);
    if (introText) {
      const lang = I18n.getLang();
      const introTexts = { zh: '点击任意情绪，了解它出现的场景以及如何与它相处', en: 'Tap any emotion to learn when it appears and how to handle it', ja: '感情をタップして、場面と対処法を確認', th: 'แตะอารมณ์ใดก็ได้เพื่อเรียนรู้เกี่ยวกับมัน' };
      introText.textContent = introTexts[lang] || introTexts.zh;
    }
    if (container) {
      container.innerHTML = ['all', 'negative', 'neutral', 'positive'].map(f =>
        `<button class="filter-btn ${f === 'all' ? 'active' : ''}" data-filter="${f}">${t('filters.' + f)}</button>`
      ).join('');
    }
  }

  function renderGrid(filter) {
    const grid = document.getElementById('emotions-grid');
    if (!grid) return;
    let data = emotionsDataZh;
    if (filter === 'negative') data = data.filter(e => e.type === 'negative');
    else if (filter === 'positive') data = data.filter(e => e.type === 'positive');
    else if (filter === 'neutral') data = data.filter(e => e.type === 'neutral');

    grid.innerHTML = data.map((e, i) => {
      const origIdx = emotionsDataZh.indexOf(e);
      const name = getEmotionName(e, origIdx);
      return `<div class="emotion-cell ${e.type}" data-index="${origIdx}">
                <div class="emotion-zh">${name}</div>
                <div class="emotion-en">${e.en}</div>
                <div class="emotion-intensity">${'●'.repeat(e.intensity)}${'○'.repeat(5 - e.intensity)}</div>
            </div>`;
    }).join('');
  }

  function showDetail(index) {
    // Require login to view details
    Auth.requireLogin(() => showDetailContent(index));
  }

  function showDetailContent(index) {
    const e = emotionsDataZh[index];
    if (!e) return;
    const lang = I18n.getLang();
    const t = I18n.t.bind(I18n);
    const name = getEmotionName(e, index);
    const scene = window.EmotionsLang?.scenes?.[lang]?.[index] || e.scene;
    const header = document.getElementById('emotion-modal-header');
    const body = document.getElementById('emotion-modal-body');
    const modal = document.getElementById('emotion-modal');

    header.innerHTML = `
            <div class="modal-emotion-name">${name}</div>
            <div class="modal-emotion-en">${e.en} · ${t('emotionDetail.intensity')} ${'●'.repeat(e.intensity)}${'○'.repeat(5 - e.intensity)}</div>
        `;

    const typeLabel = t('emotionTypes.' + e.type);
    body.innerHTML = `
            <h4>${t('emotionDetail.scene')}</h4>
            <p>${scene}</p>
            <h4>${t('emotionDetail.suggestions')}</h4>
            <ul>${e.suggestions.map(s => `<li>${s}</li>`).join('')}</ul>
            <h4>${t('emotionDetail.tags')}</h4>
            <div>
                <span class="suggestion-tag">${typeLabel}</span>
                <span class="suggestion-tag">${t('emotionDetail.intensity')} ${e.intensity}/5</span>
            </div>
        `;
    modal.classList.add('open');
  }

  function bindEvents() {
    // Filter buttons (use delegation since they're dynamic now)
    document.querySelector('.page-intro')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGrid(btn.dataset.filter);
    });

    // Emotion cells
    document.getElementById('emotions-grid').addEventListener('click', (e) => {
      const cell = e.target.closest('.emotion-cell');
      if (cell) showDetail(parseInt(cell.dataset.index));
    });

    // Close modal
    document.getElementById('modal-close').addEventListener('click', () => {
      document.getElementById('emotion-modal').classList.remove('open');
    });
    document.getElementById('emotion-modal').addEventListener('click', (e) => {
      if (e.target === document.getElementById('emotion-modal')) {
        document.getElementById('emotion-modal').classList.remove('open');
      }
    });
  }

  return { init, emotionsData: emotionsDataZh };
})();
