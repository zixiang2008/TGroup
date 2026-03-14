/* ============================================
   专业咨询支持 - counselor.js
   ============================================ */

const CounselorModule = (() => {
    const STORAGE_KEY = 'counselor_signups';
    const MAX_COUNT = 25;

    const data = {
        zh: {
            title: '🤝 专业咨询支持', intro: '每25位伙伴组成一期，由专业咨询师 Yue 提供线上会议支持',
            counselorRole: 'BeingYourself 创始人 · 身心灵整合咨询师',
            counselorBio: '我经历过极端的童年逆境（ACE评分10/10），走过情绪痛苦、混乱、压抑和羞耻。我的身体、灵魂、精神——都在试图说出我不敢说的话。疗愈始于我停止奔跑和修复的那一刻。',
            tags: ['Compassionate Inquiry', 'IFS', 'NARM', 'Shadow Constellation', 'Diamond Approach'],
            meetingTitle: '📊 线上会议报名进度',
            meetingDesc: '每满25人开启一期线上团体会议，由 Yue 亲自带领。',
            personLabel: '人', waitingText: '正在召集中，期待你的加入！',
            fullText: '本期人数已满！会议即将安排。', signUpBtn: '✋ 我要报名参加',
            signedUpText: '✅ 你已成功报名，请耐心等待通知',
            groupTitle: '📢 入群与通知', groupDesc: '报名后加入群聊，便于接收会议安排和资料分享。',
            groupSteps: ['点击下方按钮复制群聊链接', '在微信中粘贴并加入群聊', '满25人后群内发布会议时间', '按时参加线上会议'],
            groupActionTitle: '加入 BeingYourself 觉察群', groupActionDesc: '点击复制群聊邀请链接',
            servicesTitle: '🌟 支持方式',
            services: [
                { icon: '👥', name: '25人团体线上会议', desc: '每期25人，由 Yue 带领的临在式团体觉察体验。' },
                { icon: '🤝', name: '1x1 私人咨询', desc: '一次深入的身心探询会话，提供清晰和自我连接。' },
                { icon: '🏔️', name: '3个月英雄之旅', desc: '定制化的消化、释放与回归之路。' }
            ],
            linkTitle: '预约免费咨询 → 访问官方网站', signedMsg: '报名成功！请加入群聊等待通知', linkCopied: '链接已复制！'
        },
        en: {
            title: '🤝 Professional Support', intro: 'Every 25 participants form a group for an online session led by counselor Yue',
            counselorRole: 'BeingYourself Founder · Mind-Body-Spirit Counselor',
            counselorBio: 'I\'ve lived through extreme adverse childhood experience (ACE score 10/10). My healing began when I stopped running and fixing.',
            tags: ['Compassionate Inquiry', 'IFS', 'NARM', 'Shadow Constellation', 'Diamond Approach'],
            meetingTitle: '📊 Online Meeting Sign-up Progress',
            meetingDesc: 'A group meeting is initiated every 25 sign-ups, personally led by Yue.',
            personLabel: 'people', waitingText: 'Gathering participants, join us!',
            fullText: 'This group is full! Meeting coming soon.', signUpBtn: '✋ Sign Me Up',
            signedUpText: '✅ You\'ve signed up! Please wait for notification',
            groupTitle: '📢 Join Group & Notifications', groupDesc: 'Join the group chat for meeting schedules.',
            groupSteps: ['Tap below to copy the group link', 'Paste in WeChat to join', 'Meeting time announced at 25 people', 'Attend the online meeting'],
            groupActionTitle: 'Join BeingYourself Group', groupActionDesc: 'Tap to copy group link',
            servicesTitle: '🌟 Support Options',
            services: [
                { icon: '👥', name: '25-Person Group Meeting', desc: 'Presence-based group awareness experience.' },
                { icon: '🤝', name: '1x1 Private Session', desc: 'A focused somatic inquiry session.' },
                { icon: '🏔️', name: '3-Month Hero Journey', desc: 'Custom-designed path to return to yourself.' }
            ],
            linkTitle: 'Book Free Consultation → Visit Website', signedMsg: 'Signed up successfully!', linkCopied: 'Link copied!'
        },
        ja: {
            title: '🤝 専門サポート', intro: '25名が集まるごとに、カウンセラーYueがオンラインミーティングを開催',
            counselorRole: 'BeingYourself創設者 · 心身霊統合カウンセラー',
            counselorBio: '極端な逆境的小児期体験を経て（ACE 10/10）、自分自身と向き合う勇気を見つけた時に癒しが始まりました。',
            tags: ['Compassionate Inquiry', 'IFS', 'NARM', 'Shadow Constellation', 'Diamond Approach'],
            meetingTitle: '📊 申込状況', meetingDesc: '25名でグループミーティングを開催。',
            personLabel: '人', waitingText: '参加者募集中！', fullText: '定員に達しました！',
            signUpBtn: '✋ 参加申込', signedUpText: '✅ 申込完了！通知をお待ちください',
            groupTitle: '📢 グループ参加', groupDesc: 'グループチャットに参加して情報を受け取りましょう。',
            groupSteps: ['下のボタンでリンクをコピー', 'WeChatで貼り付けて参加', '25名で日程発表', 'ミーティングに参加'],
            groupActionTitle: 'BeingYourselfグループに参加', groupActionDesc: 'タップしてリンクをコピー',
            servicesTitle: '🌟 サポート方法',
            services: [
                { icon: '👥', name: '25名グループ', desc: 'プレゼンスベースの体験。' },
                { icon: '🤝', name: '1x1セッション', desc: '集中的な身体探求。' },
                { icon: '🏔️', name: '3ヶ月の旅', desc: 'カスタムデザインの旅。' }
            ],
            linkTitle: '無料相談予約 → ウェブサイトへ', signedMsg: '申込完了！', linkCopied: 'コピーしました！'
        },
        th: {
            title: '🤝 การสนับสนุน', intro: 'ทุก 25 คนจะจัดประชุมออนไลน์โดย Yue',
            counselorRole: 'ผู้ก่อตั้ง BeingYourself',
            counselorBio: 'ฉันผ่านประสบการณ์วัยเด็กที่ยากลำบาก (ACE 10/10)',
            tags: ['Compassionate Inquiry', 'IFS', 'NARM', 'Shadow Constellation', 'Diamond Approach'],
            meetingTitle: '📊 ความคืบหน้า', meetingDesc: 'เปิดประชุมทุก 25 คน',
            personLabel: 'คน', waitingText: 'กำลังรวบรวม!', fullText: 'กลุ่มเต็มแล้ว!',
            signUpBtn: '✋ ลงทะเบียน', signedUpText: '✅ ลงทะเบียนแล้ว!',
            groupTitle: '📢 เข้าร่วมกลุ่ม', groupDesc: 'เข้าร่วมกลุ่มแชทเพื่อรับข่าวสาร',
            groupSteps: ['คัดลอกลิงก์', 'วางใน WeChat', 'ประกาศเมื่อครบ 25', 'เข้าร่วมประชุม'],
            groupActionTitle: 'เข้ากลุ่ม BeingYourself', groupActionDesc: 'แตะเพื่อคัดลอก',
            servicesTitle: '🌟 ตัวเลือก',
            services: [
                { icon: '👥', name: 'ประชุมกลุ่ม', desc: 'ประสบการณ์กลุ่ม' },
                { icon: '🤝', name: 'เซสชัน 1x1', desc: 'เซสชันส่วนตัว' },
                { icon: '🏔️', name: '3 เดือน', desc: 'เส้นทางเฉพาะ' }
            ],
            linkTitle: 'จองปรึกษาฟรี → เว็บไซต์', signedMsg: 'สำเร็จ!', linkCopied: 'คัดลอกแล้ว!'
        }
    };

    function getSignupData() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { count: 0, signed: false }; }
        catch { return { count: 0, signed: false }; }
    }

    function init() {
        const container = document.getElementById('counselor-container');
        if (!container) return;
        const lang = I18n.getLang();
        const d = data[lang] || data.zh;
        const signup = getSignupData();
        const count = Math.min(signup.count, MAX_COUNT);
        const percent = Math.round((count / MAX_COUNT) * 100);
        const isFull = count >= MAX_COUNT;

        container.innerHTML = `
            <div class="page-intro">
                <h2 class="page-intro-title">${d.title}</h2>
                <p class="page-intro-text">${d.intro}</p>
            </div>

            <!-- 咨询师简介 -->
            <div class="cs-profile-card">
                <div class="cs-avatar">🌿</div>
                <div class="cs-name">Yue</div>
                <div class="cs-role">${d.counselorRole}</div>
                <p class="cs-bio">${d.counselorBio}</p>
                <div class="cs-tags">${d.tags.map(t => `<span class="cs-tag">${t}</span>`).join('')}</div>
            </div>

            <!-- 25人会议进度 -->
            <div class="cs-meeting-card">
                <h3 class="kb-section-title">${d.meetingTitle}</h3>
                <p class="cs-meeting-desc">${d.meetingDesc}</p>
                <div class="cs-progress-bar"><div class="cs-progress-fill" style="width:${percent}%"></div></div>
                <div class="cs-progress-text">${count} / ${MAX_COUNT} ${d.personLabel}</div>
                <div class="cs-status ${isFull ? 'full' : ''}">${isFull ? '🎉 ' + d.fullText : '⏳ ' + d.waitingText}</div>
                ${!signup.signed && !isFull ? `<button class="btn-primary cs-signup-btn" id="cs-signup-btn">${d.signUpBtn}</button>` : ''}
                ${signup.signed ? `<div class="cs-signed-badge">${d.signedUpText}</div>` : ''}
            </div>

            <!-- 入群通知 -->
            <div class="cs-group-card">
                <h3 class="kb-section-title">${d.groupTitle}</h3>
                <p class="cs-group-desc">${d.groupDesc}</p>
                <div class="cs-steps">
                    ${d.groupSteps.map((s, i) => `<div class="cs-step"><span class="cs-step-num">${i + 1}</span><span>${s}</span></div>`).join('')}
                </div>
                <button class="cs-group-action" id="cs-copy-group">
                    <span>💬</span>
                    <div><div class="kb-link-title">${d.groupActionTitle}</div><div class="kb-link-url">${d.groupActionDesc}</div></div>
                    <span class="kb-link-arrow">→</span>
                </button>
            </div>

            <!-- 服务方式 -->
            <h3 class="kb-section-title">${d.servicesTitle}</h3>
            ${d.services.map(s => `
                <div class="kb-area-card">
                    <span class="kb-area-icon">${s.icon}</span>
                    <div><div class="kb-area-name">${s.name}</div><p class="kb-area-desc">${s.desc}</p></div>
                </div>
            `).join('')}

            <a href="https://www.beingyourself.love" target="_blank" rel="noopener" class="kb-link-card">
                <span class="kb-link-icon">🌐</span>
                <div><div class="kb-link-title">${d.linkTitle}</div><div class="kb-link-url">www.beingyourself.love</div></div>
                <span class="kb-link-arrow">→</span>
            </a>
        `;

        // 报名事件
        const signupBtn = document.getElementById('cs-signup-btn');
        if (signupBtn) {
            signupBtn.addEventListener('click', () => {
                const s = getSignupData();
                if (s.signed) return;
                s.count = Math.min(s.count + 1, MAX_COUNT);
                s.signed = true;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
                alert(d.signedMsg);
                init(); // re-render
            });
        }

        // 复制群链接
        const copyBtn = document.getElementById('cs-copy-group');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                navigator.clipboard?.writeText('https://www.beingyourself.love/contact-1')
                    .then(() => alert(d.linkCopied))
                    .catch(() => { /* fallback */ });
            });
        }
    }

    return { init };
})();
