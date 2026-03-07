/* ============================================
   冥想空间模块 - meditation.js (i18n)
   ============================================ */
const MeditationModule = (() => {
    function getData() { return window.MeditationLang?.[I18n.getLang()] || window.MeditationLang?.zh; }
    const durations = [3, 5, 10, 15]; // minutes
    let timer = null, elapsed = 0, totalSeconds = 0, isPaused = false, guideIdx = 0, guideTimer = null;

    function init() { render(); }

    function render() {
        const container = document.getElementById('meditation-container');
        if (!container) return;
        const data = getData();
        if (!data) return;
        clearTimers();

        container.innerHTML = `
            <div class="meditation-intro">
                <h3>${data.title}</h3>
                <p>${data.intro}</p>
            </div>
            <div class="meditation-setup" id="meditation-setup">
                <div class="duration-options">
                    ${durations.map((d, i) => `
                        <button class="duration-btn ${i === 1 ? 'active' : ''}" data-mins="${d}">${data.durations[i]}</button>
                    `).join('')}
                </div>
                <button class="meditation-start-btn" id="meditation-start">${data.startBtn}</button>
            </div>
            <div class="meditation-active" id="meditation-active" style="display:none;">
                <div class="meditation-timer" id="meditation-timer">05:00</div>
                <div class="meditation-breath" id="meditation-breath"></div>
                <div class="meditation-guide-text" id="meditation-guide-text"></div>
                <div class="meditation-controls">
                    <button class="med-ctrl-btn" id="med-pause">${data.pauseBtn}</button>
                    <button class="med-ctrl-btn" id="med-stop">${data.stopBtn}</button>
                </div>
            </div>
            <div class="meditation-complete" id="meditation-complete" style="display:none;">
                <div class="complete-icon">${data.complete}</div>
                <p>${data.completeMsg}</p>
                <button class="meditation-start-btn" id="med-return">${data.returnBtn}</button>
            </div>
        `;

        let selectedMins = 5;
        container.querySelectorAll('.duration-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('.duration-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedMins = parseInt(btn.dataset.mins);
            });
        });

        document.getElementById('meditation-start')?.addEventListener('click', () => startMeditation(selectedMins));
        document.getElementById('med-pause')?.addEventListener('click', togglePause);
        document.getElementById('med-stop')?.addEventListener('click', stopMeditation);
        document.getElementById('med-return')?.addEventListener('click', () => init());
    }

    function startMeditation(mins) {
        const data = getData();
        totalSeconds = mins * 60;
        elapsed = 0;
        isPaused = false;
        guideIdx = 0;

        document.getElementById('meditation-setup').style.display = 'none';
        document.getElementById('meditation-active').style.display = '';
        document.getElementById('meditation-complete').style.display = 'none';

        updateTimerDisplay();
        startBreathCycle();
        showGuideText();

        timer = setInterval(() => {
            if (isPaused) return;
            elapsed++;
            updateTimerDisplay();
            if (elapsed >= totalSeconds) {
                clearTimers();
                document.getElementById('meditation-active').style.display = 'none';
                document.getElementById('meditation-complete').style.display = '';
            }
        }, 1000);

        guideTimer = setInterval(() => {
            if (!isPaused) showGuideText();
        }, 15000);
    }

    function updateTimerDisplay() {
        const remaining = totalSeconds - elapsed;
        const m = Math.floor(remaining / 60).toString().padStart(2, '0');
        const s = (remaining % 60).toString().padStart(2, '0');
        const el = document.getElementById('meditation-timer');
        if (el) el.textContent = `${m}:${s}`;
    }

    function startBreathCycle() {
        const data = getData();
        const breathEl = document.getElementById('meditation-breath');
        if (!breathEl) return;
        let phase = 0;
        const phases = [data.breatheIn, data.hold, data.breatheOut, data.hold];
        const times = [4000, 2000, 6000, 2000];

        function cycle() {
            if (!document.getElementById('meditation-breath')) return;
            breathEl.textContent = phases[phase];
            breathEl.className = 'meditation-breath phase-' + phase;
            setTimeout(() => {
                phase = (phase + 1) % 4;
                if (document.getElementById('meditation-breath')) cycle();
            }, times[phase]);
        }
        cycle();
    }

    function showGuideText() {
        const data = getData();
        const el = document.getElementById('meditation-guide-text');
        if (!el || !data?.guides) return;
        el.style.opacity = '0';
        setTimeout(() => {
            el.textContent = data.guides[guideIdx % data.guides.length];
            el.style.opacity = '1';
            guideIdx++;
        }, 500);
    }

    function togglePause() {
        const data = getData();
        isPaused = !isPaused;
        const btn = document.getElementById('med-pause');
        if (btn) btn.textContent = isPaused ? data.resumeBtn : data.pauseBtn;
    }

    function stopMeditation() {
        clearTimers();
        document.getElementById('meditation-active').style.display = 'none';
        document.getElementById('meditation-complete').style.display = '';
    }

    function clearTimers() {
        if (timer) { clearInterval(timer); timer = null; }
        if (guideTimer) { clearInterval(guideTimer); guideTimer = null; }
    }

    return { init };
})();
