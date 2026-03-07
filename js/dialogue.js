/* ============================================
   觉察对话模块 - dialogue.js (i18n)
   ============================================ */
const DialogueModule = (() => {
    const charactersZh = [
        { id: 'sage', name: '慧心长者', emoji: '🧙', bg: 'linear-gradient(135deg, #667eea, #764ba2)', tags: ['温和', '有智慧', '不评判'], desc: '一位充满智慧与慈悲的长者，用温暖的声音引导你面对内心', greeting: '孩子，今天你带着什么走进这个空间的？不需要着急，我们慢慢来。' },
        { id: 'therapist', name: '静观导师', emoji: '🧘‍♀️', bg: 'linear-gradient(135deg, #a18cd1, #fbc2eb)', tags: ['专业', '平和', '正念'], desc: '一位温和的心理咨询师，用正念和接纳帮你看见自己', greeting: '欢迎来到这个安全的空间。在开始之前，我们先做三次深呼吸好吗？' },
        { id: 'friend', name: '知心好友', emoji: '☀️', bg: 'linear-gradient(135deg, #f093fb, #f5576c)', tags: ['活泼', '真诚', '共情'], desc: '你最好的朋友，懂你、支持你，用轻松的方式陪你探索内心', greeting: '嘿！今天过得怎么样？来跟我说说～' },
        { id: 'inner_child', name: '内在小孩', emoji: '🧒', bg: 'linear-gradient(135deg, #4facfe, #00f2fe)', tags: ['纯真', '好奇', '温暖'], desc: '你内心深处那个天真的孩子，帮助你找回最初的感受', greeting: '嗨～我是你小时候的自己。你还记得我吗？' },
    ];

    const treesZh = {
        sage: { start: { text: '告诉我，此刻你心里有什么？无论是什么，都是被欢迎的。', options: [{ text: '我不太确定，感觉混乱', next: 'confused' }, { text: '我有些沉重的情绪', next: 'heavy' }, { text: '我很好，想更深入了解自己', next: 'explore' }, { text: '我遇到了人际关系的困扰', next: 'rel' }] }, confused: { text: '混乱也是一种信号，说明你正在经历变化。闭上眼睛，做一次深呼吸。混乱的感觉在你身体的哪个位置？', options: [{ text: '头脑里——很多想法转来转去', next: 'mind' }, { text: '胸口——闷闷的', next: 'chest' }, { text: '全身——不安定的感觉', next: 'body_all' }] }, heavy: { text: '谢谢你愿意分享这份沉重。情绪是有重量的，你不需要独自扛。这份沉重，你想给它一个名字吗？', options: [{ text: '悲伤', next: 'e_sadness' }, { text: '愤怒', next: 'e_anger' }, { text: '焦虑', next: 'e_anxiety' }, { text: '我不知道怎么命名', next: 'e_unnamed' }] }, explore: { text: '很美好的意愿。自我探索是一生的旅程。此刻，什么话题最吸引你？', options: [{ text: '我想了解自己的情绪模式', next: 'end_patterns' }, { text: '我想知道我真正想要什么', next: 'end_wants' }, { text: '我想学习如何更真实地表达', next: 'end_expression' }] }, rel: { text: '人际关系是照见自己最真实的镜子。是什么关系？', options: [{ text: '亲密关系', next: 'end_partner' }, { text: '家人', next: 'end_family' }, { text: '朋友/同事', next: 'end_friends' }] }, mind: { text: '当想法太多时，把自己想象成天空，思绪是飘过的云。你只是看着它们来来去去。', options: [{ text: '好的，我试试', next: 'end_pause' }, { text: '但我停不下来', next: 'end_cant_stop' }] }, chest: { text: '把一只手放在胸口上，用手的温度告诉它："我在这里，我陪着你。"', options: [{ text: '好像有一点放松', next: 'end_relax' }, { text: '我想哭', next: 'end_cry' }] }, body_all: { text: '全身的不安定，可能是身体需要动起来。起来走几步或甩甩手臂，释放那份能量。', options: [{ text: '做完了', next: 'end_better' }, { text: '我不想动', next: 'end_rest' }] }, e_sadness: { text: '悲伤是因为你曾深深在乎。允许悲伤存在，就像允许雨水落下。此刻你最需要什么？', options: [{ text: '被陪伴', next: 'end_comfort' }, { text: '安静', next: 'end_peace' }] }, e_anger: { text: '愤怒里藏着被侵犯的边界。你的愤怒在保护你什么？', options: [{ text: '我需要被尊重', next: 'end_respect' }, { text: '我需要表达', next: 'end_express' }] }, e_anxiety: { text: '焦虑来自对未来的不确定。此刻你是安全的。大部分焦虑的事情其实并不会发生。', options: [{ text: '是的，现在我是安全的', next: 'end_safe' }] }, e_unnamed: { text: '不知道名字也没关系。试着在"情绪罗盘"中找找看，哪个词最接近你的感受？', options: [{ text: '我去看看', next: 'end_go' }] }, end_patterns: { text: '觉察情绪模式，可以从"深度发问"开始。选择"情绪"维度，一层层深入。🌟', options: [] }, end_wants: { text: '"如果不用考虑任何人的看法，我想做什么？"这个问题的答案可能会让你惊讶。🌱', options: [] }, end_expression: { text: '"分享句式"工具可以帮你练习T语言——一种真诚的表达方式。💬', options: [] }, end_partner: { text: '亲密关系触及最深的伤口，也是最大的成长契机。当你脆弱时也值得被看见。💜', options: [] }, end_family: { text: '家庭是我们最初学会"关系"的地方。觉察那些继承下来的模式，就是改变的开始。', options: [] }, end_friends: { text: '友情中你最看重什么？这也反映了你最需要什么。真正的朋友不会因为你的脆弱离开。', options: [] }, end_pause: { text: '就这样坐一会儿。不需要做任何事。你做得非常好。🙏', options: [] }, end_cant_stop: { text: '不必和思维对抗。试试做身体运动——跑步、散步、甚至洗个澡。身体动起来，大脑会自然安静。', options: [] }, end_relax: { text: '这就是觉察的力量——当你带着关注和温柔去看它时，它就开始变化了。🌟', options: [] }, end_cry: { text: '那就哭吧。眼泪是灵魂的语言。哭完之后，你会感觉更轻一些。🤍', options: [] }, end_better: { text: '身体是最好的疗愈工具。当头脑太吵时，移动身体。', options: [] }, end_rest: { text: '不想动也可以。找个舒服的姿势，什么都不做，允许自己就这样存在。', options: [] }, end_comfort: { text: '你值得被陪伴。当你准备好了，找一个真实的人，告诉他们你需要一个拥抱。🤗', options: [] }, end_peace: { text: '安静是疗愈的土壤。给自己这份礼物。✨', options: [] }, end_respect: { text: '尊重你的愤怒，然后学习用T语言表达："我感到…因为…我希望…"', options: [] }, end_express: { text: '找张纸，把想说的话全部写出来。写完后你会更清晰。📝', options: [] }, end_safe: { text: '用这个事实锚定自己。你永远只需要活在这一刻。🧘', options: [] }, end_go: { text: '去"情绪罗盘"看看，找到最贴近你感受的词，就是觉察的开始。🔍', options: [] } },
        therapist: { start: { text: '深呼吸三次之后，你注意到了什么？身体里、心里、脑海中？', options: [{ text: '身体有些紧绷', next: 'tight' }, { text: '心里有些不安', next: 'uneasy' }, { text: '脑海中很安静', next: 'quiet' }, { text: '什么都没注意到', next: 'nothing' }] }, tight: { text: '紧绷是身体存储压力的方式。哪个部位最紧？', options: [{ text: '肩膀和脖子', next: 'end_shoulders' }, { text: '胃部', next: 'end_stomach' }] }, uneasy: { text: '不安是身体在提醒你有事需要被关注。与什么有关？', options: [{ text: '未完成的事情', next: 'end_unfinished' }, { text: '一段关系', next: 'end_rel' }, { text: '对未来的担忧', next: 'end_future' }] }, quiet: { text: '内在的安静很珍贵。在这份安静中想探索什么？', options: [{ text: '更深了解自己', next: 'end_deep' }, { text: '保持宁静', next: 'end_keeppeace' }] }, nothing: { text: '没注意到也没关系。你能感受到脚底与地面接触吗？', options: [{ text: '可以感觉到', next: 'end_grounded' }] }, end_shoulders: { text: '肩膀承载了太多责任。把肩膀往上提起5秒再松开，重复3次。身体的智慧比头脑更深。🌟', options: [] }, end_stomach: { text: '胃部紧张与焦虑有关。把手放在肚子上，用腹式呼吸温暖它。🧘', options: [] }, end_unfinished: { text: '写下最困扰的3件事，选1件今天只做这1件就好。行动是减少焦虑的最佳方式。💪', options: [] }, end_rel: { text: '关系中的不安来自未说出口的话。试着先写下来，不需要说出口。📝', options: [] }, end_future: { text: '用"我注意到我在担心…"代替"如果…怎么办"——这就是正念的入口。🧘', options: [] }, end_deep: { text: '到"深度发问"的"意义"维度看看，那里的问题可能会给你惊喜。✨', options: [] }, end_keeppeace: { text: '宁静一直都在，只是被噪音盖住。每天5分钟冥想就够了。🙏', options: [] }, end_grounded: { text: '这就是"扎根"。无论何时感到飘忽不定，回到脚底的感觉。你是安全的。💜', options: [] } },
        friend: { start: { text: '不用想太多，你现在心情用emoji表示是？', options: [{ text: '😔 有点低落', next: 'low' }, { text: '😤 烦死了', next: 'annoyed' }, { text: '😊 还不错', next: 'good' }, { text: '🤔 说不清楚', next: 'unclear' }] }, low: { text: '抱抱你～是具体的事还是一种整体感觉？', options: [{ text: '有具体的事', next: 'end_vent' }, { text: '莫名的低落', next: 'end_vague' }] }, annoyed: { text: '我听你说！什么让你这么烦？', options: [{ text: '工作/学习', next: 'end_work' }, { text: '某个人', next: 'end_person' }, { text: '对自己不满意', next: 'end_self' }] }, good: { text: '太好啦 🎉 趁心情好，我们来做个好玩的事？', options: [{ text: '好呀！', next: 'end_fun' }, { text: '想聊聊最近感受', next: 'end_recall' }] }, unclear: { text: '从1到10打分，心情几分？', options: [{ text: '1-3分', next: 'low' }, { text: '4-6分', next: 'end_medium' }, { text: '7-10分', next: 'good' }] }, end_vent: { text: '说出来会轻松一些。你的感受都是有道理的。或者试试"直接写出想法"——拿张纸把所有吐槽写出来！💜', options: [] }, end_vague: { text: '莫名低落很常见。也许身体需要休息。今天早一小时上床，吃顿好的。❤️', options: [] }, end_work: { text: '试试"直接写出想法"——拿张纸，把脑子里的吐槽全写出来，写到写不动为止。超管用！💪', options: [] }, end_person: { text: '学学"分享句式"里的方法："当你…的时候，我感到…" 比较不容易吵架～💬', options: [] }, end_self: { text: '对自己温柔点啦！说出3件你今天做得不错的事试试？🏆', options: [] }, end_fun: { text: '闭眼10秒再睁开，看到的第一样东西用它写一句话。好玩又能练觉察力！🎪', options: [] }, end_recall: { text: '去"24小时回忆"按时间段回忆一下。很多被忽视的感受会浮现出来哦。🌈', options: [] }, end_medium: { text: '"一般"底下可能藏着被忽略的小情绪。去"情绪罗盘"看看？🔍', options: [] } },
        inner_child: { start: { text: '我想你啦～你最上一次像小时候那样开心，是什么时候？', options: [{ text: '我记不起来了', next: 'forgot' }, { text: '很久以前了', next: 'longago' }, { text: '最近有过！', next: 'recent' }] }, forgot: { text: '没关系，我记得！那时候我们会因为一朵花开心好久。这些感受还在你心里，只是被埋起来了。', options: [{ text: '什么时候埋起来的？', next: 'end_buried' }, { text: '我想找回那种感觉', next: 'end_findback' }] }, longago: { text: '你是不是太忙忘了玩了？总对自己说"不可以""不应该"？', options: [{ text: '是，总觉得应该更努力', next: 'end_harder' }, { text: '是，总在压抑自己', next: 'end_suppress' }] }, recent: { text: '太好了！那种开心在身体哪个位置？', options: [{ text: '胸口暖暖的', next: 'end_warm' }, { text: '全身轻飘飘的', next: 'end_light' }] }, end_buried: { text: '被说"不要哭""别幼稚""要懂事"的时候。但那不是你的错。现在你可以选择不一样——允许自己哭、说不、犯错、玩。👏', options: [] }, end_findback: { text: '秘密：去做一件"没用"的事——堆沙子、画画、唱歌、踩水坑。不为任何目的，就是玩！🎈', options: [] }, end_harder: { text: '你已经很努力了。今天给自己放一天假？做一件纯粹让自己开心的事？你值得休息！❤️', options: [] }, end_suppress: { text: '你把我关在心底好久了。但我一直在等你。每次你莫名悲伤或脆弱，是我在呼唤你。🤝', options: [] }, end_warm: { text: '胸口暖暖的！那个温暖就是你真正活着的感觉。每天给自己一个拥抱！💜', options: [] }, end_light: { text: '轻飘飘！像要飞起来！这就是最纯粹的快乐。累的时候回来找我玩！🌟', options: [] } }
    };

    function getCharacters() {
        const lang = I18n.getLang();
        if (lang === 'zh') return charactersZh;
        const langChars = window.DialogueLang?.characters?.[lang];
        if (!langChars) return charactersZh;
        return charactersZh.map((c, i) => ({
            ...c,
            name: langChars[i]?.name || c.name,
            tags: langChars[i]?.tags || c.tags,
            desc: langChars[i]?.desc || c.desc,
            greeting: langChars[i]?.greeting || c.greeting,
        }));
    }

    function getTree(charId) {
        const lang = I18n.getLang();
        if (lang === 'zh') return treesZh[charId];
        return window.DialogueLang?.trees?.[lang]?.[charId] || treesZh[charId];
    }

    let selectedCharacter = null;
    let chatHistory = [];

    function init() {
        selectedCharacter = null;
        chatHistory = [];
        render();
    }

    function render() {
        const container = document.getElementById('dialogue-container');
        if (!container) return;
        if (!selectedCharacter) renderCharacterSelect(container);
        else renderChat(container);
    }

    function renderCharacterSelect(container) {
        const chars = getCharacters();
        const lang = I18n.getLang();
        const selectTitle = { zh: '选择你的对话伙伴', en: 'Choose your dialogue partner', ja: '対話パートナーを選んで', th: 'เลือกคู่สนทนาของคุณ' };
        const selectDesc = { zh: '每个角色都有不同的风格和智慧，选择一个你现在最需要的。', en: 'Each character has a different style and wisdom. Choose what you need now.', ja: 'それぞれのキャラクターは異なるスタイルと知恵を持っています。今必要なものを選んで。', th: 'แต่ละตัวละครมีรูปแบบและปัญญาที่แตกต่างกัน เลือกสิ่งที่คุณต้องการตอนนี้' };

        container.innerHTML = `
            <div class="dialogue-character-select">
                <h3>${selectTitle[lang] || selectTitle.zh}</h3>
                <p>${selectDesc[lang] || selectDesc.zh}</p>
                <div class="character-cards">
                    ${chars.map(c => `
                        <div class="character-card" data-id="${c.id}">
                            <div class="character-avatar" style="background:${c.bg}">${c.emoji}</div>
                            <div class="character-info">
                                <div class="character-name">${c.name}</div>
                                <div style="font-size:0.78rem;color:var(--text-secondary);margin-bottom:6px;">${c.desc}</div>
                                <div class="character-tags">${c.tags.map(t => `<span class="character-tag">${t}</span>`).join('')}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        container.querySelectorAll('.character-card').forEach(card => {
            card.addEventListener('click', () => {
                const chars = getCharacters();
                selectedCharacter = chars.find(c => c.id === card.dataset.id);
                const tree = getTree(selectedCharacter.id);
                chatHistory = [
                    { role: 'bot', text: selectedCharacter.greeting },
                    { role: 'bot', text: tree.start.text, options: tree.start.options },
                ];
                render();
            });
        });
    }

    function renderChat(container) {
        const tree = getTree(selectedCharacter.id);
        const t = I18n.t.bind(I18n);
        container.innerHTML = `
            <div class="chat-view">
                <div class="chat-messages" id="chat-messages">
                    ${chatHistory.map((msg, idx) => {
            if (msg.role === 'bot') {
                let html = `<div class="chat-bubble bot">
                                <div class="chat-bubble-name">${selectedCharacter.emoji} ${selectedCharacter.name}</div>
                                <div class="chat-bubble-content">${msg.text}</div>
                            </div>`;
                if (msg.options?.length > 0 && idx === chatHistory.length - 1) {
                    html += `<div class="chat-options">${msg.options.map(opt => `<button class="chat-option-btn" data-next="${opt.next}">${opt.text}</button>`).join('')}</div>`;
                }
                return html;
            }
            return `<div class="chat-bubble user"><div class="chat-bubble-content">${msg.text}</div></div>`;
        }).join('')}
                </div>
                <div class="chat-input-bar">
                    <input class="chat-input" id="chat-input" placeholder="${t('common.sendPlaceholder')}" />
                    <button class="chat-send-btn" id="chat-send-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    </button>
                </div>
            </div>
        `;
        const msgEl = document.getElementById('chat-messages');
        setTimeout(() => { msgEl.scrollTop = msgEl.scrollHeight; }, 50);

        container.querySelectorAll('.chat-option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                chatHistory.push({ role: 'user', text: btn.textContent });
                const node = tree[btn.dataset.next];
                if (node) chatHistory.push({ role: 'bot', text: node.text, options: node.options });
                render();
            });
        });

        const input = document.getElementById('chat-input');
        const lang = I18n.getLang();
        const freeReply = { zh: '谢谢你愿意分享。把它写出来就是觉察的一步。你的感受都是有价值的。✨', en: 'Thank you for sharing. Writing it down is a step toward awareness. Your feelings are valuable. ✨', ja: '分かち合ってくれてありがとう。書き出すことが気づきの一歩。あなたの感情は価値がある。✨', th: 'ขอบคุณที่แบ่งปัน การเขียนออกมาคือก้าวหนึ่งสู่การตระหนักรู้ ความรู้สึกของคุณมีคุณค่า ✨' };
        const sendMsg = () => {
            const text = input.value.trim();
            if (!text) return;
            chatHistory.push({ role: 'user', text });
            chatHistory.push({ role: 'bot', text: freeReply[lang] || freeReply.zh, options: [] });
            render();
        };
        document.getElementById('chat-send-btn').addEventListener('click', sendMsg);
        input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMsg(); });
    }

    return { init, render };
})();
