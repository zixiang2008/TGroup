const i18n = require('../../utils/i18n.js');
const auth = require('../../utils/auth.js');

const charactersZh = [
    { id: 'sage', name: '慧心长者', emoji: '🧙', bg: 'linear-gradient(135deg, #667eea, #764ba2)', tags: ['温和', '有智慧', '不评判'], desc: '充满智慧与慈悲的长者', greeting: '孩子，今天你带着什么走进这个空间的？' },
    { id: 'therapist', name: '静观导师', emoji: '🧘‍♀️', bg: 'linear-gradient(135deg, #a18cd1, #fbc2eb)', tags: ['专业', '平和', '正念'], desc: '温和的心理咨询师', greeting: '欢迎来到安全的空间。先做三次深呼吸好吗？' },
    { id: 'friend', name: '知心好友', emoji: '☀️', bg: 'linear-gradient(135deg, #f093fb, #f5576c)', tags: ['活泼', '真诚', '共情'], desc: '懂你的好朋友', greeting: '嘿！今天过得怎么样？来跟我说说～' },
    { id: 'inner_child', name: '内在小孩', emoji: '🧒', bg: 'linear-gradient(135deg, #4facfe, #00f2fe)', tags: ['纯真', '好奇', '温暖'], desc: '你内心深处的那个孩子', greeting: '嗨～我是你小时候的自己。你还记得我吗？' },
];

// 按经验等级提供不同深度的对话树
// experienced: 更深入的探索，可能触及创伤
// beginner/none: 温和引导，避免触发创伤
const treesGentle = {
    sage: { start: { text: '此刻你心里有什么？不需要想太多，感受就好。', options: [{ text: '有些情绪', next: 'emo' }, { text: '想放松一下', next: 'relax' }] }, emo: { text: '情绪就像天气，自然来去。你愿意给它一个名字吗？可以去情绪罗盘看看哪个词最接近。🔍', options: [] }, relax: { text: '那就做3次深呼吸吧。吸气4秒，屏住2秒，呼气6秒。感受空气的温度。🌿', options: [] } },
    therapist: { start: { text: '让我们从简单的开始。深呼吸三次，注意到了什么？', options: [{ text: '身体有些紧', next: 'tight' }, { text: '心比较安静', next: 'quiet' }] }, tight: { text: '紧绷是正常的。轻轻活动一下肩膀和脖子，不需要用力。🌟', options: [] }, quiet: { text: '内心的安静是宝贵的。享受这份宁静。✨', options: [] } },
    friend: { start: { text: '不用想太多，你现在心情如何？用emoji表示～', options: [{ text: '😊 还不错', next: 'good' }, { text: '😐 一般般', next: 'ok' }] }, good: { text: '太好了！那今天做一件让自己开心的小事吧 🎉', options: [] }, ok: { text: '一般般很正常～要不要去散个步？走着走着可能就好了 🌈', options: [] } },
    inner_child: { start: { text: '嗨～你今天笑了吗？', options: [{ text: '笑了！', next: 'smiled' }, { text: '好像没有', next: 'notyet' }] }, smiled: { text: '太好啦！笑的时候哪里最开心？嘴巴？眼睛？心里？💜', options: [] }, notyet: { text: '那我现在做个鬼脸给你看！😜 好了，现在试着嘴角上扬一下？🎈', options: [] } }
};

const treesDeep = {
    sage: { start: { text: '告诉我，此刻你心里有什么？无论是什么，都是被欢迎的。', options: [{ text: '感觉混乱', next: 'confused' }, { text: '有些沉重', next: 'heavy' }, { text: '想了解自己', next: 'explore' }] }, confused: { text: '混乱也是信号。闭上眼睛做深呼吸。混乱在身体哪个位置？', options: [{ text: '头脑里', next: 'end_mind' }, { text: '胸口', next: 'end_chest' }] }, heavy: { text: '谢谢你分享这份沉重。你想给它一个名字吗？', options: [{ text: '悲伤', next: 'end_sad' }, { text: '焦虑', next: 'end_anx' }, { text: '不知道', next: 'end_unnamed' }] }, explore: { text: '很美好的意愿。什么话题最吸引你？', options: [{ text: '情绪模式', next: 'end_patterns' }, { text: '真正想要什么', next: 'end_wants' }] }, end_mind: { text: '把自己想象成天空，思绪是飘过的云。你只是看着它们来去。🙏', options: [] }, end_chest: { text: '把手放在胸口，用手的温度告诉它：我在这里，我陪着你。🌟', options: [] }, end_sad: { text: '悲伤是因为你曾深深在乎。允许悲伤存在。你最需要什么？被陪伴还是安静？🤍', options: [] }, end_anx: { text: '焦虑来自对未来的不确定。此刻你是安全的。大部分焦虑的事不会发生。🧘', options: [] }, end_unnamed: { text: '不知道名字也没关系。去情绪罗盘看看哪个词最接近你的感受？🔍', options: [] }, end_patterns: { text: '觉察情绪模式：下次某种情绪出现时，停下来问自己：上一次有这种感觉是什么时候？它总是在相似的情境中出现吗？🌟', options: [] }, end_wants: { text: '如果不用考虑任何人，你想做什么？这个答案可能让你惊讶。坐下来，花5分钟写出来。🌱', options: [] } },
    therapist: { start: { text: '深呼吸三次后，你注意到了什么？身体里、心里、脑海中？', options: [{ text: '身体有些紧绷', next: 'tight' }, { text: '心里有些不安', next: 'uneasy' }, { text: '脑海很安静', next: 'quiet' }] }, tight: { text: '紧绷是身体存储压力的方式。把肩膀往上提起5秒再松开，重复3次。然后问自己：这份紧绷想告诉我什么？🌟', options: [] }, uneasy: { text: '不安是身体在提醒你有事需要被关注。试着先写下来：我不安是因为______。写的过程本身就是疗愈。📝', options: [] }, quiet: { text: '内在的安静很珍贵。在安静中问自己：如果这份安静有颜色，它是什么颜色？感受它在身体中流淌。✨', options: [] } },
    friend: { start: { text: '来来来，直接说，最近有啥事儿让你纠结的？', options: [{ text: '😔 有点低落', next: 'low' }, { text: '😤 烦死了', next: 'annoyed' }, { text: '😊 还不错', next: 'good' }] }, low: { text: '抱抱你～说出来会轻松些。你最不想面对的那个事情是什么？写下来看看，写的过程就是在处理。💜', options: [] }, annoyed: { text: '拿张纸把脑子里的吐槽全写出来，写到写不动为止！然后撕掉或烧掉，超管用！💪', options: [] }, good: { text: '太好啦 🎉 那趁这个好状态，做一件一直想做但拖着没做的事！行动起来！🎪', options: [] } },
    inner_child: { start: { text: '我想你啦～你上一次像小时候那样开心，是什么时候？', options: [{ text: '记不起来了', next: 'forgot' }, { text: '很久以前', next: 'long' }, { text: '最近有过！', next: 'recent' }] }, forgot: { text: '没关系，我记得！那时候我们会因为一朵花开心好久。秘密：去做一件"没用"的事——堆沙子、画画、唱歌。试试看？🎈', options: [] }, long: { text: '你是不是太忙忘了玩了？你已经很努力了。今天给自己放一天假：不学习、不工作、不思考，只做让你开心的事。❤️', options: [] }, recent: { text: '太好了！那种开心在身体哪个位置？胸口暖暖的就是你真正活着的感觉。用5分钟写下让你开心的3件最小的事。💜', options: [] } }
};

const selectTitles = { zh: '选择你的对话伙伴', en: 'Choose your dialogue partner', ja: '対話パートナーを選んで', th: 'เลือกคู่สนทนา' };
const selectDescs = { zh: '每个角色有不同的风格和智慧', en: 'Each character has a unique style', ja: 'それぞれ異なるスタイル', th: 'แต่ละตัวละครมีสไตล์ที่แตกต่าง' };
const freeReplies = { zh: '谢谢你愿意分享。写出来就是觉察的一步。✨', en: 'Thank you for sharing. Writing it down is awareness. ✨', ja: '分かち合ってくれてありがとう。✨', th: 'ขอบคุณที่แบ่งปัน ✨' };

Page({
    data: {
        selectTitle: '', selectDesc: '', sendPlaceholder: '',
        characters: [], selectedCharacter: null, chatHistory: [], inputText: '', scrollTo: '',
        depthLabel: ''
    },

    onLoad() { i18n.init(); this.updateUI(); },
    onShow() { this.updateUI(); },

    updateUI() {
        const lang = i18n.getLang();
        const level = auth.getExperienceLevel();
        const depthLabels = {
            experienced: { zh: '深度探索模式', en: 'Deep Mode', ja: '深い探求モード', th: 'โหมดลึก' },
            beginner: { zh: '温和引导模式', en: 'Gentle Mode', ja: '穏やかモード', th: 'โหมดอ่อนโยน' },
            none: { zh: '温和引导模式', en: 'Gentle Mode', ja: '穏やかモード', th: 'โหมดอ่อนโยน' }
        };
        this.setData({
            selectTitle: selectTitles[lang] || selectTitles.zh,
            selectDesc: selectDescs[lang] || selectDescs.zh,
            sendPlaceholder: i18n.t('common.sendPlaceholder'),
            characters: charactersZh,
            depthLabel: auth.isLoggedIn() ? (depthLabels[level][lang] || depthLabels[level].zh) : ''
        });
    },

    selectCharacter(e) {
        const id = e.currentTarget.dataset.id;
        const char = charactersZh.find(c => c.id === id);
        // 根据经验等级选择对话树
        const isDeep = auth.isExperienced();
        const trees = isDeep ? treesDeep : treesGentle;
        const tree = trees[id];

        this._currentTrees = trees;

        this.setData({
            selectedCharacter: char,
            chatHistory: [
                { role: 'bot', text: char.greeting, options: [] },
                { role: 'bot', text: tree.start.text, options: tree.start.options }
            ],
            scrollTo: 'msg-1'
        });
    },

    selectOption(e) {
        const { next, text } = e.currentTarget.dataset;
        const trees = this._currentTrees || treesGentle;
        const tree = trees[this.data.selectedCharacter.id];
        const node = tree[next];
        const history = [...this.data.chatHistory];
        history.push({ role: 'user', text, options: [] });
        if (node) history.push({ role: 'bot', text: node.text, options: node.options || [] });
        this.setData({ chatHistory: history, scrollTo: 'msg-' + (history.length - 1) });
    },

    onInput(e) { this.setData({ inputText: e.detail.value }); },

    sendMessage() {
        const text = this.data.inputText.trim();
        if (!text) return;
        const lang = i18n.getLang();
        const history = [...this.data.chatHistory];
        history.push({ role: 'user', text, options: [] });
        history.push({ role: 'bot', text: freeReplies[lang] || freeReplies.zh, options: [] });
        this.setData({ chatHistory: history, inputText: '', scrollTo: 'msg-' + (history.length - 1) });
    }
});
