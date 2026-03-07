/* 深度发问翻译 */
window.QuestioningLang = {
    zh: {
        title: '深度发问', intro: '通过多维度的自我提问，一层层深入觉察真实的内在。选择一个维度，从表层开始探索。',
        dimensions: [{ name: '身体', color: '#ef4444' }, { name: '情绪', color: '#f59e0b' }, { name: '思维', color: '#8b5cf6' }, { name: '关系', color: '#eab308' }, { name: '意义', color: '#22c55e' }],
        questions: {
            body: [{ d: 1, q: '此刻你的身体有什么感觉？', h: '暂停下来，扫描全身：从头顶到脚底' }, { d: 1, q: '哪个部位感觉最紧张？', h: '肩膀？下巴？胃部？' }, { d: 2, q: '这种紧张是什么时候开始的？', h: '今天？还是很久了？' }, { d: 2, q: '如果这种身体感觉可以说话，它会说什么？', h: '闭上眼，静静听' }, { d: 3, q: '你的身体最需要什么？', h: '休息？运动？触碰？安全感？' }],
            emotion: [{ d: 1, q: '此刻最明显的情绪是什么？', h: '如果说不清，试着去"情绪罗盘"找找' }, { d: 1, q: '这个情绪是什么颜色？什么温度？', h: '用感官去描述它' }, { d: 2, q: '这个情绪背后想告诉你什么？', h: '每种情绪都有它的信息' }, { d: 2, q: '最近一周，你最常感到什么？', h: '画一条情绪曲线' }, { d: 3, q: '如果完全接受这个情绪，会发生什么？', h: '不试图改变，只是允许' }],
            thought: [{ d: 1, q: '此刻你脑海中最大的想法是什么？', h: '只要说出它来' }, { d: 1, q: '你注意到自己有什么"应该"的想法吗？', h: '我应该更…我不应该…' }, { d: 2, q: '这个想法是事实，还是你的诠释？', h: '区分观察和评判' }, { d: 2, q: '如果你最好的朋友有同样的想法，你会怎么跟他/她说？', h: '把善意给自己' }, { d: 3, q: '你在用谁的标准评价自己？', h: '父母的？社会的？自己真正的？' }],
            relation: [{ d: 1, q: '最近和谁的互动让你印象深刻？', h: '开心的或不开心的都算' }, { d: 1, q: '有什么话你一直想说但没说出口？', h: '不评判，只是承认它的存在' }, { d: 2, q: '在亲近的关系中，你通常扮演什么角色？', h: '照顾者？倾听者？逃避者？' }, { d: 2, q: '你最害怕在关系中出现什么？', h: '被抛弃？被控制？不被理解？' }, { d: 3, q: '你理想中的关系是什么样的？', h: '具体描述你想要的感受' }],
            meaning: [{ d: 1, q: '如果今天是你人生中最后一天，你会做什么？', h: '不需要伟大的答案' }, { d: 1, q: '什么事情能让你忘记时间？', h: '那可能就是你的热情所在' }, { d: 2, q: '你最想被记住的是什么？', h: '不是成就，而是品质' }, { d: 2, q: '你现在的生活和理想的生活之间差什么？', h: '诚实地面对这个差距' }, { d: 3, q: '如果你内心最深处有一个声音，它在说什么？', h: '那个从未对别人说过的' }]
        }
    },
    en: {
        title: 'Deep Inquiry', intro: 'Through multi-dimensional self-questioning, explore your authentic inner world layer by layer. Choose a dimension to begin.',
        dimensions: [{ name: 'Body', color: '#ef4444' }, { name: 'Emotion', color: '#f59e0b' }, { name: 'Thought', color: '#8b5cf6' }, { name: 'Relation', color: '#eab308' }, { name: 'Meaning', color: '#22c55e' }],
        questions: {
            body: [{ d: 1, q: 'What sensations do you notice in your body right now?', h: 'Pause and scan from head to toe' }, { d: 1, q: 'Which part feels the most tense?', h: 'Shoulders? Jaw? Stomach?' }, { d: 2, q: 'When did this tension begin?', h: 'Today? Or has it been a while?' }, { d: 2, q: 'If this body sensation could speak, what would it say?', h: 'Close your eyes and listen' }, { d: 3, q: 'What does your body need most?', h: 'Rest? Movement? Touch? Safety?' }],
            emotion: [{ d: 1, q: 'What is the most prominent emotion right now?', h: 'If unsure, try the Emotion Compass' }, { d: 1, q: 'What color and temperature is this emotion?', h: 'Describe it with your senses' }, { d: 2, q: 'What message is behind this emotion?', h: 'Every emotion carries information' }, { d: 2, q: 'What have you felt most this past week?', h: 'Draw an emotional curve' }, { d: 3, q: 'What would happen if you fully accepted this emotion?', h: 'Don\'t try to change it, just allow it' }],
            thought: [{ d: 1, q: 'What is the biggest thought in your mind right now?', h: 'Just say it out loud' }, { d: 1, q: 'Do you notice any "should" thoughts?', h: 'I should be more... I shouldn\'t...' }, { d: 2, q: 'Is this thought a fact or your interpretation?', h: 'Distinguish observation from judgment' }, { d: 2, q: 'If your best friend had this thought, what would you tell them?', h: 'Give that kindness to yourself' }, { d: 3, q: 'Whose standards are you judging yourself by?', h: 'Parents\'? Society\'s? Your true own?' }],
            relation: [{ d: 1, q: 'Who left an impression on you recently?', h: 'Good or bad interactions count' }, { d: 1, q: 'Is there something you\'ve been wanting to say but haven\'t?', h: 'No judgment, just acknowledge it' }, { d: 2, q: 'In close relationships, what role do you usually play?', h: 'Caretaker? Listener? Avoider?' }, { d: 2, q: 'What do you fear most in relationships?', h: 'Abandonment? Control? Being misunderstood?' }, { d: 3, q: 'What does your ideal relationship look like?', h: 'Describe the feelings you want' }],
            meaning: [{ d: 1, q: 'If today were your last day, what would you do?', h: 'No grand answers needed' }, { d: 1, q: 'What makes you lose track of time?', h: 'That might be where your passion lives' }, { d: 2, q: 'What do you most want to be remembered for?', h: 'Not achievements, but qualities' }, { d: 2, q: 'What\'s the gap between your current and ideal life?', h: 'Honestly face the difference' }, { d: 3, q: 'If the deepest voice inside you could speak, what would it say?', h: 'The one you\'ve never told anyone' }]
        }
    },
    ja: {
        title: '深い問い', intro: '多次元の自己質問を通じて、本当の内面を層ごとに探求しましょう。次元を選んで始めてください。',
        dimensions: [{ name: '身体', color: '#ef4444' }, { name: '感情', color: '#f59e0b' }, { name: '思考', color: '#8b5cf6' }, { name: '関係', color: '#eab308' }, { name: '意味', color: '#22c55e' }],
        questions: {
            body: [{ d: 1, q: '今、体にどんな感覚がありますか？', h: '頭からつま先までスキャンして' }, { d: 1, q: 'どこが一番緊張していますか？', h: '肩？顎？胃？' }, { d: 2, q: 'この緊張はいつ始まりましたか？', h: '今日？それとも前から？' }, { d: 2, q: 'この体の感覚が話せたら、何を言いますか？', h: '目を閉じて聴いて' }, { d: 3, q: '体が最も必要としているものは？', h: '休息？運動？触れ合い？安心感？' }],
            emotion: [{ d: 1, q: '今一番感じている感情は？', h: 'わからなければ感情コンパスへ' }, { d: 1, q: 'この感情は何色？何の温度？', h: '感覚で描写して' }, { d: 2, q: 'この感情の裏にあるメッセージは？', h: 'すべての感情には情報がある' }, { d: 2, q: 'この一週間で最も多かった感情は？', h: '感情の曲線を描いて' }, { d: 3, q: 'この感情を完全に受け入れたら何が起きる？', h: '変えようとせず、ただ許す' }],
            thought: [{ d: 1, q: '今、頭の中で一番大きい考えは？', h: '声に出してみて' }, { d: 1, q: '「すべき」という考えに気づきますか？', h: 'もっと…すべき、…してはダメ' }, { d: 2, q: 'その考えは事実？それとも解釈？', h: '観察と判断を区別して' }, { d: 2, q: '親友が同じ考えを持っていたら何と言いますか？', h: 'その優しさを自分にも' }, { d: 3, q: '誰の基準で自分を評価していますか？', h: '親の？社会の？本当の自分の？' }],
            relation: [{ d: 1, q: '最近誰とのやり取りが印象的でしたか？', h: '楽しいものも辛いものも' }, { d: 1, q: 'ずっと言いたかったけど言えなかったことは？', h: '判断せず、存在を認めるだけ' }, { d: 2, q: '親しい関係であなたはどんな役割を演じますか？', h: '世話人？聞き手？回避者？' }, { d: 2, q: '関係で最も恐れていることは？', h: '見捨てられる？支配される？理解されない？' }, { d: 3, q: '理想の関係はどんなものですか？', h: '望む感覚を具体的に' }],
            meaning: [{ d: 1, q: '今日が人生最後の日なら何をしますか？', h: '大げさな答えは不要' }, { d: 1, q: '時間を忘れるほど夢中になれることは？', h: 'それが情熱のありか' }, { d: 2, q: 'どんな人として記憶されたいですか？', h: '業績ではなく品質' }, { d: 2, q: '今の生活と理想の生活の差は？', h: '正直にそのギャップと向き合って' }, { d: 3, q: '心の一番奥の声が話せたら何と言いますか？', h: '誰にも言ったことのないもの' }]
        }
    },
    th: {
        title: 'คำถามลึก', intro: 'สำรวจตัวตนภายในผ่านคำถามหลายมิติ เลือกมิติเพื่อเริ่มต้น',
        dimensions: [{ name: 'ร่างกาย', color: '#ef4444' }, { name: 'อารมณ์', color: '#f59e0b' }, { name: 'ความคิด', color: '#8b5cf6' }, { name: 'ความสัมพันธ์', color: '#eab308' }, { name: 'ความหมาย', color: '#22c55e' }],
        questions: {
            body: [{ d: 1, q: 'ตอนนี้ร่างกายรู้สึกอย่างไร?', h: 'หยุดและสแกนจากศีรษะถึงเท้า' }, { d: 1, q: 'ส่วนไหนตึงที่สุด?', h: 'ไหล่? ขากรรไกร? ท้อง?' }, { d: 2, q: 'ความตึงนี้เริ่มเมื่อไหร่?', h: 'วันนี้? หรือนานแล้ว?' }, { d: 2, q: 'ถ้าความรู้สึกในร่างกายนี้พูดได้ มันจะพูดว่าอะไร?', h: 'หลับตาและฟัง' }, { d: 3, q: 'ร่างกายต้องการอะไรมากที่สุด?', h: 'พักผ่อน? เคลื่อนไหว? สัมผัส? ความปลอดภัย?' }],
            emotion: [{ d: 1, q: 'อารมณ์ที่ชัดเจนที่สุดตอนนี้คืออะไร?', h: 'ถ้าไม่แน่ใจ ลองดูเข็มทิศอารมณ์' }, { d: 1, q: 'อารมณ์นี้เป็นสีอะไร? อุณหภูมิเท่าไหร่?', h: 'อธิบายด้วยประสาทสัมผัส' }, { d: 2, q: 'อารมณ์นี้พยายามบอกอะไร?', h: 'ทุกอารมณ์มีข้อมูล' }, { d: 2, q: 'สัปดาห์ที่ผ่านมารู้สึกอะไรบ่อยที่สุด?', h: 'วาดเส้นกราฟอารมณ์' }, { d: 3, q: 'ถ้ายอมรับอารมณ์นี้เต็มที่จะเกิดอะไรขึ้น?', h: 'ไม่พยายามเปลี่ยน แค่ปล่อยให้เป็น' }],
            thought: [{ d: 1, q: 'ความคิดที่ใหญ่ที่สุดในหัวตอนนี้คืออะไร?', h: 'แค่พูดออกมา' }, { d: 1, q: 'สังเกตเห็นความคิด "ควร" ไหม?', h: 'ฉันควร... ฉันไม่ควร...' }, { d: 2, q: 'ความคิดนี้เป็นข้อเท็จจริงหรือการตีความ?', h: 'แยกการสังเกตจากการตัดสิน' }, { d: 2, q: 'ถ้าเพื่อนสนิทมีความคิดนี้ จะบอกเขาว่าอะไร?', h: 'มอบความเมตตานั้นให้ตัวเอง' }, { d: 3, q: 'คุณตัดสินตัวเองด้วยมาตรฐานของใคร?', h: 'พ่อแม่? สังคม? ตัวเองจริงๆ?' }],
            relation: [{ d: 1, q: 'เมื่อเร็วๆ นี้ปฏิสัมพันธ์กับใครที่ประทับใจ?', h: 'ทั้งดีและไม่ดี' }, { d: 1, q: 'มีอะไรที่อยากพูดแต่ยังไม่ได้พูด?', h: 'ไม่ตัดสิน แค่ยอมรับว่ามีอยู่' }, { d: 2, q: 'ในความสัมพันธ์ใกล้ชิด คุณมักเล่นบทอะไร?', h: 'ผู้ดูแล? ผู้ฟัง? ผู้หลีกเลี่ยง?' }, { d: 2, q: 'กลัวอะไรมากที่สุดในความสัมพันธ์?', h: 'ถูกทอดทิ้ง? ถูกควบคุม? ไม่ถูกเข้าใจ?' }, { d: 3, q: 'ความสัมพันธ์ในอุดมคติเป็นอย่างไร?', h: 'อธิบายความรู้สึกที่ต้องการ' }],
            meaning: [{ d: 1, q: 'ถ้าวันนี้เป็นวันสุดท้าย จะทำอะไร?', h: 'ไม่ต้องยิ่งใหญ่' }, { d: 1, q: 'อะไรทำให้ลืมเวลา?', h: 'นั่นอาจเป็นสิ่งที่หลงใหล' }, { d: 2, q: 'อยากให้คนจดจำในเรื่องอะไร?', h: 'ไม่ใช่ผลงาน แต่เป็นคุณสมบัติ' }, { d: 2, q: 'ช่องว่างระหว่างชีวิตปัจจุบันและในอุดมคติคืออะไร?', h: 'เผชิญความแตกต่างอย่างซื่อสัตย์' }, { d: 3, q: 'เสียงที่ลึกที่สุดในใจจะพูดว่าอะไร?', h: 'สิ่งที่ไม่เคยบอกใคร' }]
        }
    }
};
