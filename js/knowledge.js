/* ============================================
   专业知识库 - knowledge.js
   ============================================ */

const KnowledgeModule = (() => {
    const data = {
        zh: {
            title: '📚 专业知识库', intro: '来自 BeingYourself 的身心灵整合疗愈知识体系',
            dimensionTitle: '🔮 身心灵三维方法',
            dimensions: [
                { icon: '🧠', name: 'MIND · 心智', desc: '运用基于临在的探询工具，理解并柔化心智循环、生存策略，消化自我构建。' },
                { icon: '🫀', name: 'BODY · 身体', desc: '回归身体的先天智慧，通过安全地会见身体沉默承载的情绪/创伤，邀请它们的安全释放，恢复安全感、扎根感和韧性。' },
                { icon: '✨', name: 'SPIRIT · 灵性', desc: '带着敬畏向内转向，学会感知内在存在的宁静脉动——与生命整体的活的连接——从这个基础上，你的本真自然开始浮现。' }
            ],
            taoTitle: '☯ 道的方式',
            taoLines: ['道的方式不是修复，是流动。', '不是努力，是临在。', '不是强迫，是允许。', '疗愈不是用努力走向完美。', '而是回归你从未破碎的本质——你的真实本性。', '道教导我们放下控制、比较和强迫。', '回到存在的自然节奏。', '信任生命——而非恐惧。'],
            methodsTitle: '🎓 六大专业方法',
            methods: [
                { icon: '💜', name: 'Compassionate Inquiry', author: 'Dr. Gabor Maté', desc: '基于临在的身心治疗，揭示隐藏的信念，解开痛苦的情感根源。' },
                { icon: '🪞', name: 'Internal Family System', author: 'Dr. Richard Schwartz', desc: '创伤知情的模式，温和地映射和交朋友你的内在部分，促进自我理解、和谐与疗愈。' },
                { icon: '🌊', name: 'NARM 神经情感关系模型', author: 'Dr. Laurence Heller', desc: '以身体为中心的方法，处理早期关系和发展性创伤，处理身份认同模式。' },
                { icon: '🌑', name: 'Shadow Constellation', author: 'Nir Esterman', desc: '"身体与阴影之道"，照亮隐藏的家族动力和无意识的忠诚，让看不见的模式浮出并转化。' },
                { icon: '🌱', name: 'Holistic Life Coaching', author: 'Alan Cohen', desc: '全人方法，支持你在创伤/痛苦恢复之外转变生活——将选择、关系和人生目标与最本真的自我对齐。' },
                { icon: '💎', name: 'Diamond Approach', author: 'A.H. Almaas', desc: '灵性探询之道，温和地揭示人格模式之下你本质的真相，培育临在、清晰和内在自由。' }
            ],
            areasTitle: '🎯 三大服务领域',
            areas: [
                { icon: '💆', name: '慢性疼痛与躯体症状恢复', desc: '症状不是敌人，而是信息。一起揭示疼痛的情感根源，探索保护性信念，邀请神经系统的调节。' },
                { icon: '🌸', name: '情绪处理与创伤释放', desc: '你的感受不需要被管理或推开。它们需要被安全、温和、临在地会见——不判断，不急促。' },
                { icon: '🔍', name: '自我探询与具身觉知', desc: '运用临在探询、深层身体聆听和调谐的临在来探索模式之下的你是谁。这不是智识的，是回到存在的感受。' }
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
                { icon: '🧠', name: 'MIND', desc: 'Using presence-based inquiry tools to understand and soften mental loops, survival strategies, and digest ego constructs.' },
                { icon: '🫀', name: 'BODY', desc: 'Returning to the innate wisdom of the body, meeting emotions/trauma it has held in silence, inviting safe release.' },
                { icon: '✨', name: 'SPIRIT', desc: 'Turning inward with reverence, sensing the quiet pulse of being — a living connection to the wholeness of life.' }
            ],
            taoTitle: '☯ The Way of Tao',
            taoLines: ['The Way of Tao is not to fix, but to flow.', 'It\'s not effort, but presence.', 'Not force, but allowing.', 'Healing is not about efforting your way to perfection.', 'It\'s about surrendering back to your true nature.', 'The Tao teaches us to let go of control, comparison, and force.', 'To return to the natural rhythm of being.', 'To trust life — not fear it.'],
            methodsTitle: '🎓 Six Professional Modalities',
            methods: [
                { icon: '💜', name: 'Compassionate Inquiry', author: 'Dr. Gabor Maté', desc: 'Presence-based somatic psychotherapy revealing hidden beliefs and emotional roots of suffering.' },
                { icon: '🪞', name: 'Internal Family System', author: 'Dr. Richard Schwartz', desc: 'Trauma-informed modality that gently maps and befriends inner parts.' },
                { icon: '🌊', name: 'NARM', author: 'Dr. Laurence Heller', desc: 'Body-centered approach addressing early relational and developmental trauma.' },
                { icon: '🌑', name: 'Shadow Constellation', author: 'Nir Esterman', desc: 'Illuminates hidden family dynamics and unconscious loyalties.' },
                { icon: '🌱', name: 'Holistic Life Coaching', author: 'Alan Cohen', desc: 'Supports transformation beyond trauma recovery — aligning with your authentic self.' },
                { icon: '💎', name: 'Diamond Approach', author: 'A.H. Almaas', desc: 'A path of spiritual inquiry revealing your essence beneath personality patterns.' }
            ],
            areasTitle: '🎯 Three Service Areas',
            areas: [
                { icon: '💆', name: 'Chronic Pain & Somatic Recovery', desc: 'The symptom is not the enemy — it\'s a message.' },
                { icon: '🌸', name: 'Emotional Processing & Trauma Release', desc: 'Your feelings need to be met — safely, gently, and with presence.' },
                { icon: '🔍', name: 'Self-Inquiry & Embodied Awareness', desc: 'Using presence-based inquiry to explore who you are beneath the patterns.' }
            ],
            forWhomTitle: '👥 Who Is This For',
            forWhom: ['Navigating chronic pain or somatic symptoms', 'Overwhelmed by emotion and longing for safe space', 'Tired of striving to fix yourself', 'Seeking reconnection with your truth', 'A seeker ready to embody authenticity'],
            linkTitle: 'Learn More → Visit Official Website'
        },
        ja: {
            title: '📚 知識ベース', intro: 'BeingYourselfの心身魂統合ヒーリング知識体系',
            dimensionTitle: '🔮 心・体・魂',
            dimensions: [
                { icon: '🧠', name: 'MIND · 心', desc: 'プレゼンスベースの探求ツールで、メンタルループを理解し柔らげる。' },
                { icon: '🫀', name: 'BODY · 体', desc: '体の先天的な知恵に戻り、沈黙のなかに抱えてきた感情やトラウマと安全に出会う。' },
                { icon: '✨', name: 'SPIRIT · 魂', desc: '敬意をもって内側に向き合い、存在の静かな脈動を感じ取る。' }
            ],
            taoTitle: '☯ 道の方法',
            taoLines: ['道とは修復ではなく、流れること。', '努力ではなく、プレゼンス。', '強制ではなく、許容。'],
            methodsTitle: '🎓 六つの専門メソッド',
            methods: [
                { icon: '💜', name: 'Compassionate Inquiry', author: 'Dr. Gabor Maté', desc: '隠れた信念を明らかにし、苦しみの感情的根源を解きほぐす。' },
                { icon: '🪞', name: 'Internal Family System', author: 'Dr. Richard Schwartz', desc: '内なるパーツを優しくマッピングする。' },
                { icon: '🌊', name: 'NARM', author: 'Dr. Laurence Heller', desc: '早期の関係性トラウマに取り組む身体中心のアプローチ。' },
                { icon: '🌑', name: 'Shadow Constellation', author: 'Nir Esterman', desc: '隠れた家族力学と無意識の忠誠を照らし出す。' },
                { icon: '🌱', name: 'Holistic Life Coaching', author: 'Alan Cohen', desc: 'トラウマ回復を超えた人生変革のサポート。' },
                { icon: '💎', name: 'Diamond Approach', author: 'A.H. Almaas', desc: '人格パターンの下にある本質の真実を明らかにする。' }
            ],
            areasTitle: '🎯 三つのサービス領域',
            areas: [
                { icon: '💆', name: '慢性痛・身体症状の回復', desc: '症状は敵ではなくメッセージ。' },
                { icon: '🌸', name: '感情処理・トラウマ解放', desc: '感情は安全に、優しくプレゼンスをもって迎える。' },
                { icon: '🔍', name: '自己探求・具現化された気づき', desc: 'プレゼンスベースの探求で自分を探る。' }
            ],
            forWhomTitle: '👥 対象者',
            forWhom: ['慢性痛やストレスに悩んでいる方', '感情に圧倒されている方', '自己改善に疲れた方', '本当の自分とつながりたい方', '本質を体現したいリーダー'],
            linkTitle: '詳しくは → 公式サイトへ'
        },
        th: {
            title: '📚 คลังความรู้', intro: 'ความรู้การเยียวยาแบบบูรณาการจาก BeingYourself',
            dimensionTitle: '🔮 กาย · ใจ · จิตวิญญาณ',
            dimensions: [
                { icon: '🧠', name: 'MIND', desc: 'ใช้เครื่องมือสำรวจแบบมีสติเพื่อเข้าใจวงจรจิตใจ' },
                { icon: '🫀', name: 'BODY', desc: 'กลับสู่ภูมิปัญญาของร่างกาย พบปะอารมณ์ที่ซ่อนอยู่' },
                { icon: '✨', name: 'SPIRIT', desc: 'หันเข้าข้างในด้วยความเคารพ สัมผัสจังหวะเงียบของการดำรงอยู่' }
            ],
            taoTitle: '☯ วิถีแห่งเต๋า',
            taoLines: ['วิถีแห่งเต๋าไม่ใช่การแก้ไข แต่คือการไหล', 'ไม่ใช่ความพยายาม แต่คือการมีอยู่'],
            methodsTitle: '🎓 หกวิธีเชี่ยวชาญ',
            methods: [
                { icon: '💜', name: 'Compassionate Inquiry', author: 'Dr. Gabor Maté', desc: 'จิตบำบัดแบบมีสติ' },
                { icon: '🪞', name: 'IFS', author: 'Dr. Richard Schwartz', desc: 'ทำแผนที่ส่วนต่างๆภายในตัวคุณ' },
                { icon: '🌊', name: 'NARM', author: 'Dr. Laurence Heller', desc: 'แนวทางที่เน้นร่างกาย' },
                { icon: '🌑', name: 'Shadow Constellation', author: 'Nir Esterman', desc: 'ส่องแสงพลวัตครอบครัว' },
                { icon: '🌱', name: 'Life Coaching', author: 'Alan Cohen', desc: 'สนับสนุนการเปลี่ยนแปลงชีวิต' },
                { icon: '💎', name: 'Diamond Approach', author: 'A.H. Almaas', desc: 'สำรวจจิตวิญญาณ' }
            ],
            areasTitle: '🎯 สามด้านบริการ',
            areas: [
                { icon: '💆', name: 'ฟื้นฟูอาการเรื้อรัง', desc: 'อาการไม่ใช่ศัตรู แต่คือข้อความ' },
                { icon: '🌸', name: 'ประมวลผลอารมณ์', desc: 'ความรู้สึกต้องการพบปะอย่างปลอดภัย' },
                { icon: '🔍', name: 'สำรวจตนเอง', desc: 'ค้นพบตัวตนที่แท้จริง' }
            ],
            forWhomTitle: '👥 เหมาะสำหรับ',
            forWhom: ['ผู้ประสบความเจ็บปวดเรื้อรัง', 'ผู้ถูกอารมณ์ท่วมท้น', 'ผู้เหนื่อยจากการพัฒนาตัวเอง', 'ผู้แสวงหาความจริง'],
            linkTitle: 'เรียนรู้เพิ่มเติม → เยี่ยมชมเว็บไซต์'
        }
    };

    function init() {
        const container = document.getElementById('knowledge-container');
        if (!container) return;
        const lang = I18n.getLang();
        const d = data[lang] || data.zh;

        container.innerHTML = `
            <div class="page-intro">
                <h2 class="page-intro-title">${d.title}</h2>
                <p class="page-intro-text">${d.intro}</p>
            </div>

            <h3 class="kb-section-title">${d.dimensionTitle}</h3>
            <div class="kb-dimensions">
                ${d.dimensions.map(dim => `
                    <div class="kb-dimension-card">
                        <div class="kb-dim-icon">${dim.icon}</div>
                        <div class="kb-dim-name">${dim.name}</div>
                        <div class="kb-dim-desc">${dim.desc}</div>
                    </div>
                `).join('')}
            </div>

            <div class="kb-tao-card">
                <h3 class="kb-section-title" style="margin-top:0;">${d.taoTitle}</h3>
                ${d.taoLines.map(l => `<p class="kb-tao-line">${l}</p>`).join('')}
            </div>

            <h3 class="kb-section-title">${d.methodsTitle}</h3>
            ${d.methods.map(m => `
                <div class="kb-method-card">
                    <div class="kb-method-header">
                        <span class="kb-method-icon">${m.icon}</span>
                        <div>
                            <div class="kb-method-name">${m.name}</div>
                            <div class="kb-method-author">${m.author}</div>
                        </div>
                    </div>
                    <p class="kb-method-desc">${m.desc}</p>
                </div>
            `).join('')}

            <h3 class="kb-section-title">${d.areasTitle}</h3>
            ${d.areas.map(a => `
                <div class="kb-area-card">
                    <span class="kb-area-icon">${a.icon}</span>
                    <div>
                        <div class="kb-area-name">${a.name}</div>
                        <p class="kb-area-desc">${a.desc}</p>
                    </div>
                </div>
            `).join('')}

            <h3 class="kb-section-title">${d.forWhomTitle}</h3>
            <div class="kb-for-card">
                ${d.forWhom.map(f => `<div class="kb-for-item"><span class="kb-bullet">•</span>${f}</div>`).join('')}
            </div>

            <a href="https://www.beingyourself.love" target="_blank" rel="noopener" class="kb-link-card">
                <span class="kb-link-icon">🌐</span>
                <div>
                    <div class="kb-link-title">${d.linkTitle}</div>
                    <div class="kb-link-url">www.beingyourself.love</div>
                </div>
                <span class="kb-link-arrow">→</span>
            </a>
        `;
    }

    return { init };
})();
