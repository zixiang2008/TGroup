/* ============================================
   冥想空间模块 - meditation.js
   v3.0: 环境音系统 + 脑波频率 + 动画切换 + 声音引导
   参考: Calm, Headspace, Insight Timer, myNoise
   ============================================ */
const MeditationModule = (() => {
    function getData() { return window.MeditationLang?.[I18n.getLang()] || window.MeditationLang?.en || window.MeditationLang?.zh; }
    const durations = [3, 5, 10, 15];
    let timer = null, elapsed = 0, totalSeconds = 0, isPaused = false, guideIdx = 0, guideTimer = null;
    let audioCtx = null, bowlInterval = null;

    // --- State ---
    let currentSound = 'rain';
    let currentBrainwave = 'none';
    let currentAnimation = 'bubbles';
    let guideMode = 'full'; // silent, breath, full
    let soundVolume = 0.5;
    let brainwaveVolume = 0.3;

    // --- Active audio nodes ---
    let activeSoundNodes = [];
    let activeBrainwaveNodes = [];

    // ============= AUDIO ENGINE =============
    function getAudioCtx() {
        if (!audioCtx || audioCtx.state === 'closed') {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') audioCtx.resume();
        return audioCtx;
    }

    // --- White/Pink/Brown noise generators ---
    function createNoiseBuffer(ctx, type = 'white', seconds = 4) {
        const sr = ctx.sampleRate;
        const len = sr * seconds;
        const buf = ctx.createBuffer(1, len, sr);
        const data = buf.getChannelData(0);
        let b0=0, b1=0, b2=0, b3=0, b4=0, b5=0, b6=0;
        for (let i = 0; i < len; i++) {
            const white = Math.random() * 2 - 1;
            if (type === 'white') {
                data[i] = white;
            } else if (type === 'pink') {
                b0 = 0.99886*b0 + white*0.0555179; b1 = 0.99332*b1 + white*0.0750759;
                b2 = 0.96900*b2 + white*0.1538520; b3 = 0.86650*b3 + white*0.3104856;
                b4 = 0.55000*b4 + white*0.5329522; b5 = -0.7616*b5 - white*0.0168980;
                data[i] = (b0+b1+b2+b3+b4+b5+b6 + white*0.5362) * 0.11;
                b6 = white * 0.115926;
            } else { // brown
                data[i] = (b0 = (b0 + (0.02 * white)) / 1.02) * 3.5;
            }
        }
        return buf;
    }

    // --- Environment Sound Engine ---
    const soundDefs = {
        rain: { noise: 'white', filterType: 'lowpass', filterFreq: 800, filterQ: 1, gain: 0.25 },
        ocean: { noise: 'white', filterType: 'lowpass', filterFreq: 400, filterQ: 0.7, gain: 0.2, lfo: { freq: 0.08, depth: 0.15 } },
        forest: { noise: 'pink', filterType: 'bandpass', filterFreq: 2000, filterQ: 0.5, gain: 0.12 },
        fire: { noise: 'brown', filterType: 'lowpass', filterFreq: 500, filterQ: 0.5, gain: 0.2 },
        wind: { noise: 'white', filterType: 'bandpass', filterFreq: 600, filterQ: 2, gain: 0.15, lfo: { freq: 0.12, depth: 0.1 } },
        bowl: { type: 'bowl', gain: 0.08 }
    };

    function startEnvironmentSound(soundId) {
        stopNodes(activeSoundNodes);
        activeSoundNodes = [];
        if (soundId === 'none') return;
        const def = soundDefs[soundId];
        if (!def) return;
        const ctx = getAudioCtx();

        if (def.type === 'bowl') {
            // Singing bowl loop
            function bowlLoop() {
                if (!activeSoundNodes._active) return;
                playSingingBowl(8, def.gain * soundVolume * 2);
                activeSoundNodes._bowlTimeout = setTimeout(bowlLoop, 10000);
            }
            activeSoundNodes._active = true;
            bowlLoop();
            return;
        }

        const buf = createNoiseBuffer(ctx, def.noise, 4);
        const src = ctx.createBufferSource();
        src.buffer = buf;
        src.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = def.filterType;
        filter.frequency.value = def.filterFreq;
        filter.Q.value = def.filterQ;

        const gain = ctx.createGain();
        gain.gain.value = def.gain * soundVolume;

        src.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        // LFO modulation for ocean/wind
        if (def.lfo) {
            const lfo = ctx.createOscillator();
            const lfoGain = ctx.createGain();
            lfo.type = 'sine';
            lfo.frequency.value = def.lfo.freq;
            lfoGain.gain.value = def.lfo.depth * soundVolume;
            lfo.connect(lfoGain);
            lfoGain.connect(gain.gain);
            lfo.start();
            activeSoundNodes.push(lfo, lfoGain);
        }

        src.start();
        activeSoundNodes.push(src, filter, gain);
        activeSoundNodes._gainNode = gain;
        activeSoundNodes._basegain = def.gain;
    }

    function updateSoundVolume(vol) {
        soundVolume = vol;
        if (activeSoundNodes._gainNode && activeSoundNodes._basegain) {
            activeSoundNodes._gainNode.gain.value = activeSoundNodes._basegain * vol;
        }
    }

    // --- Brainwave Engine (Binaural Beats) ---
    const brainwaveDefs = {
        none: null,
        delta: { label: 'Delta', baseFreq: 200, beatFreq: 2, desc: '深度睡眠·修复' },
        theta: { label: 'Theta', baseFreq: 200, beatFreq: 6, desc: '深度冥想·创意' },
        alpha: { label: 'Alpha', baseFreq: 200, beatFreq: 10, desc: '放松·平静' },
        beta:  { label: 'Beta',  baseFreq: 200, beatFreq: 20, desc: '专注·清醒' }
    };

    function startBrainwave(id) {
        stopNodes(activeBrainwaveNodes);
        activeBrainwaveNodes = [];
        if (id === 'none' || !brainwaveDefs[id]) return;
        try {
            const ctx = getAudioCtx();
            const def = brainwaveDefs[id];

            // Left channel
            const oscL = ctx.createOscillator();
            oscL.type = 'sine';
            oscL.frequency.value = def.baseFreq;

            // Right channel
            const oscR = ctx.createOscillator();
            oscR.type = 'sine';
            oscR.frequency.value = def.baseFreq + def.beatFreq;

            const gainL = ctx.createGain();
            gainL.gain.value = brainwaveVolume * 0.3;
            const gainR = ctx.createGain();
            gainR.gain.value = brainwaveVolume * 0.3;

            // Stereo panning with fallback
            if (ctx.createStereoPanner) {
                const panL = ctx.createStereoPanner();
                panL.pan.value = -1;
                const panR = ctx.createStereoPanner();
                panR.pan.value = 1;
                oscL.connect(gainL); gainL.connect(panL); panL.connect(ctx.destination);
                oscR.connect(gainR); gainR.connect(panR); panR.connect(ctx.destination);
                activeBrainwaveNodes.push(oscL, oscR, gainL, gainR, panL, panR);
            } else {
                // Fallback: no stereo separation, still play both frequencies
                oscL.connect(gainL); gainL.connect(ctx.destination);
                oscR.connect(gainR); gainR.connect(ctx.destination);
                activeBrainwaveNodes.push(oscL, oscR, gainL, gainR);
            }

            oscL.start(); oscR.start();
            activeBrainwaveNodes._gainL = gainL;
            activeBrainwaveNodes._gainR = gainR;
        } catch (e) {
            console.warn('Brainwave engine error:', e);
        }
    }

    function updateBrainwaveVolume(vol) {
        brainwaveVolume = vol;
        if (activeBrainwaveNodes._gainL) activeBrainwaveNodes._gainL.gain.value = vol * 0.3;
        if (activeBrainwaveNodes._gainR) activeBrainwaveNodes._gainR.gain.value = vol * 0.3;
    }

    function stopNodes(nodes) {
        if (!nodes) return;
        if (nodes._bowlTimeout) clearTimeout(nodes._bowlTimeout);
        nodes._active = false;
        nodes.forEach(n => { try { if (n.stop) n.stop(); else if (n.disconnect) n.disconnect(); } catch(e){} });
        nodes.length = 0;
    }

    // --- Singing Bowl & Bell (from v2) ---
    function playSingingBowl(duration = 4, vol = 0.06) {
        try {
            const ctx = getAudioCtx();
            const now = ctx.currentTime;
            [174, 285, 396].forEach(freq => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now);
                gain.gain.setValueAtTime(0, now);
                gain.gain.linearRampToValueAtTime(vol, now + 0.3);
                gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
                osc.connect(gain); gain.connect(ctx.destination);
                osc.start(now); osc.stop(now + duration);
            });
        } catch (e) {}
    }

    function playBell() {
        try {
            const ctx = getAudioCtx();
            const now = ctx.currentTime;
            [528, 639, 741].forEach(freq => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now);
                gain.gain.setValueAtTime(0.15, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 3);
                osc.connect(gain); gain.connect(ctx.destination);
                osc.start(now); osc.stop(now + 3);
            });
        } catch (e) {}
    }

    // ============= SPEECH ENGINE =============
    const langMap = { zh: 'zh-CN', en: 'en-US', ja: 'ja-JP', th: 'th-TH' };
    function speak(text) {
        if (guideMode === 'silent' || !window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance(text);
        utt.lang = langMap[I18n.getLang()] || 'en-US';
        utt.rate = 0.82; utt.pitch = 1; utt.volume = 0.75;
        window.speechSynthesis.speak(utt);
    }

    // ============= ANIMATION ENGINE =============
    let animFrameId = null;

    function startAnimation(type, container) {
        stopAnimation();
        container.innerHTML = '';
        container.className = 'med-animation-canvas med-anim-' + type;

        if (type === 'bubbles') {
            for (let i = 0; i < 15; i++) {
                const b = document.createElement('div');
                b.className = 'med-bubble';
                const size = 10 + Math.random() * 40;
                b.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;bottom:${-size}px;animation-duration:${8+Math.random()*12}s;animation-delay:${Math.random()*8}s;opacity:${0.15+Math.random()*0.25};`;
                container.appendChild(b);
            }
        } else if (type === 'bowl') {
            for (let i = 0; i < 5; i++) {
                const ring = document.createElement('div');
                ring.className = 'med-bowl-ring';
                ring.style.animationDelay = (i * 2) + 's';
                container.appendChild(ring);
            }
        } else if (type === 'nature') {
            // Floating leaves + fireflies
            for (let i = 0; i < 8; i++) {
                const leaf = document.createElement('div');
                leaf.className = 'med-leaf';
                leaf.textContent = ['🍃','🍂','🌿','✨','🌸'][Math.floor(Math.random()*5)];
                leaf.style.cssText = `left:${Math.random()*100}%;animation-duration:${10+Math.random()*15}s;animation-delay:${Math.random()*10}s;font-size:${12+Math.random()*16}px;`;
                container.appendChild(leaf);
            }
            for (let i = 0; i < 12; i++) {
                const dot = document.createElement('div');
                dot.className = 'med-firefly';
                dot.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;animation-duration:${3+Math.random()*4}s;animation-delay:${Math.random()*5}s;`;
                container.appendChild(dot);
            }
        }
    }

    function stopAnimation() {
        if (animFrameId) { cancelAnimationFrame(animFrameId); animFrameId = null; }
    }

    // ============= RENDER =============
    function init() { render(); }

    function render() {
        const container = document.getElementById('meditation-container');
        if (!container) return;
        const d = getData();
        if (!d) return;
        clearTimers();

        const soundOptions = [
            { id: 'rain', icon: '🌧️', label: d.sounds?.rain || 'Rain' },
            { id: 'ocean', icon: '🌊', label: d.sounds?.ocean || 'Ocean' },
            { id: 'forest', icon: '🌲', label: d.sounds?.forest || 'Forest' },
            { id: 'fire', icon: '🔥', label: d.sounds?.fire || 'Fire' },
            { id: 'wind', icon: '💨', label: d.sounds?.wind || 'Wind' },
            { id: 'bowl', icon: '🔔', label: d.sounds?.bowl || 'Bowl' }
        ];

        const brainwaveOptions = [
            { id: 'none', icon: '—', label: d.brainwaves?.none || 'Off' },
            { id: 'delta', icon: '🧘', label: 'Delta', sub: d.brainwaves?.delta || '0.5-4Hz · Deep Sleep' },
            { id: 'theta', icon: '🌙', label: 'Theta', sub: d.brainwaves?.theta || '4-8Hz · Deep Meditation' },
            { id: 'alpha', icon: '🧠', label: 'Alpha', sub: d.brainwaves?.alpha || '8-14Hz · Relaxation' },
            { id: 'beta', icon: '⚡', label: 'Beta', sub: d.brainwaves?.beta || '14-30Hz · Focus' }
        ];

        const animOptions = [
            { id: 'bubbles', icon: '🫧', label: d.animations?.bubbles || 'Bubbles' },
            { id: 'bowl', icon: '🔔', label: d.animations?.bowl || 'Singing Bowl' },
            { id: 'nature', icon: '🌿', label: d.animations?.nature || 'Nature' }
        ];

        const guideModes = [
            { id: 'silent', icon: '🔇', label: d.guideModes?.silent || 'Silent' },
            { id: 'breath', icon: '🌬️', label: d.guideModes?.breath || 'Breath Only' },
            { id: 'full', icon: '🎙️', label: d.guideModes?.full || 'Full Guide' }
        ];

        container.innerHTML = `
            <div class="meditation-intro">
                <h3>${d.title}</h3>
                <p>${d.intro}</p>
            </div>

            <div class="meditation-setup" id="meditation-setup">
                <!-- Duration -->
                <div class="med-section">
                    <div class="med-section-label">${d.durationLabel || '⏱ Duration'}</div>
                    <div class="duration-options">
                        ${durations.map((m, i) => `
                            <button class="duration-btn ${i === 1 ? 'active' : ''}" data-mins="${m}">${d.durations[i]}</button>
                        `).join('')}
                    </div>
                </div>

                <!-- Environment Sound -->
                <div class="med-section">
                    <div class="med-section-label">${d.soundLabel || '🎵 Ambient Sound'}</div>
                    <div class="med-options-grid med-sound-grid">
                        ${soundOptions.map(s => `
                            <button class="med-option-btn ${s.id === currentSound ? 'active' : ''}" data-sound="${s.id}">
                                <span class="med-option-icon">${s.icon}</span>
                                <span class="med-option-text">${s.label}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>

                <!-- Brainwave -->
                <div class="med-section">
                    <div class="med-section-label">${d.brainwaveLabel || '🧠 Brainwave'}</div>
                    <div class="med-brainwave-hint">${d.brainwaveHint || '🎧 Headphones required for binaural beats'}</div>
                    <div class="med-options-grid med-brainwave-grid">
                        ${brainwaveOptions.map(b => `
                            <button class="med-option-btn med-bw-btn ${b.id === currentBrainwave ? 'active' : ''}" data-bw="${b.id}" title="${b.sub || ''}">
                                <span class="med-option-icon">${b.icon}</span>
                                <span class="med-option-text">${b.label}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>

                <!-- Animation -->
                <div class="med-section">
                    <div class="med-section-label">${d.animLabel || '✨ Visual'}</div>
                    <div class="med-options-row">
                        ${animOptions.map(a => `
                            <button class="med-option-btn ${a.id === currentAnimation ? 'active' : ''}" data-anim="${a.id}">
                                <span class="med-option-icon">${a.icon}</span>
                                <span class="med-option-text">${a.label}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>

                <!-- Guide Mode -->
                <div class="med-section">
                    <div class="med-section-label">${d.guideLabel || '🎤 Guidance'}</div>
                    <div class="med-options-row">
                        ${guideModes.map(g => `
                            <button class="med-option-btn ${g.id === guideMode ? 'active' : ''}" data-guide="${g.id}">
                                <span class="med-option-icon">${g.icon}</span>
                                <span class="med-option-text">${g.label}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>

                <button class="meditation-start-btn" id="meditation-start">${d.startBtn}</button>
            </div>

            <!-- Prepare -->
            <div class="meditation-prepare" id="meditation-prepare" style="display:none;">
                <div class="prepare-circle">
                    <div class="prepare-countdown" id="prepare-countdown">10</div>
                </div>
                <p class="prepare-text">${d.prepareMsg || 'Preparing...'}</p>
                <p class="prepare-sub">${d.prepareSub || 'Adjust posture, close eyes, deep breath...'}</p>
            </div>

            <!-- Active Session -->
            <div class="meditation-active" id="meditation-active" style="display:none;">
                <div class="med-animation-canvas" id="med-anim-canvas"></div>
                <div class="med-session-overlay">
                    <div class="meditation-timer" id="meditation-timer">05:00</div>
                    <div class="meditation-breath" id="meditation-breath"></div>
                    <div class="meditation-guide-text" id="meditation-guide-text"></div>
                    <div class="med-volume-controls">
                        <div class="med-vol-row">
                            <span class="med-vol-icon">🎵</span>
                            <input type="range" class="med-vol-slider" id="med-sound-vol" min="0" max="100" value="${soundVolume*100}">
                        </div>
                        <div class="med-vol-row" id="med-bw-vol-row" style="display:${currentBrainwave === 'none' ? 'none' : 'flex'};">
                            <span class="med-vol-icon">🧠</span>
                            <input type="range" class="med-vol-slider" id="med-bw-vol" min="0" max="100" value="${brainwaveVolume*100}">
                        </div>
                    </div>
                    <div class="meditation-controls">
                        <button class="med-ctrl-btn" id="med-pause">${d.pauseBtn}</button>
                        <button class="med-ctrl-btn" id="med-stop">${d.stopBtn}</button>
                    </div>
                </div>
            </div>

            <!-- Complete -->
            <div class="meditation-complete" id="meditation-complete" style="display:none;">
                <div class="complete-icon">${d.complete}</div>
                <p>${d.completeMsg}</p>
                <button class="meditation-start-btn" id="med-return">${d.returnBtn}</button>
            </div>
        `;

        // --- Bind events ---
        let selectedMins = 5;

        container.querySelectorAll('.duration-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('.duration-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedMins = parseInt(btn.dataset.mins);
            });
        });

        container.querySelectorAll('[data-sound]').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('[data-sound]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentSound = btn.dataset.sound;
            });
        });

        container.querySelectorAll('[data-bw]').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('[data-bw]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentBrainwave = btn.dataset.bw;
            });
        });

        container.querySelectorAll('[data-anim]').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('[data-anim]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentAnimation = btn.dataset.anim;
            });
        });

        container.querySelectorAll('[data-guide]').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('[data-guide]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                guideMode = btn.dataset.guide;
            });
        });

        document.getElementById('meditation-start')?.addEventListener('click', () => startPrepare(selectedMins));
        document.getElementById('med-pause')?.addEventListener('click', togglePause);
        document.getElementById('med-stop')?.addEventListener('click', stopMeditation);
        document.getElementById('med-return')?.addEventListener('click', () => init());

        // Volume sliders
        document.getElementById('med-sound-vol')?.addEventListener('input', e => {
            updateSoundVolume(parseInt(e.target.value) / 100);
        });
        document.getElementById('med-bw-vol')?.addEventListener('input', e => {
            updateBrainwaveVolume(parseInt(e.target.value) / 100);
        });
    }

    // ============= SESSION FLOW =============
    function startPrepare(mins) {
        document.getElementById('meditation-setup').style.display = 'none';
        document.getElementById('meditation-prepare').style.display = '';
        playSingingBowl(6);
        const d = getData();
        if (guideMode !== 'silent') speak(d.prepareMsg || 'Preparing for meditation');

        let countdown = 10;
        const el = document.getElementById('prepare-countdown');
        const prepTimer = setInterval(() => {
            countdown--;
            if (el) el.textContent = countdown;
            if (countdown <= 0) {
                clearInterval(prepTimer);
                document.getElementById('meditation-prepare').style.display = 'none';
                startMeditation(mins);
            }
        }, 1000);
    }

    function startMeditation(mins) {
        const d = getData();
        totalSeconds = mins * 60;
        elapsed = 0;
        isPaused = false;
        guideIdx = 0;

        document.getElementById('meditation-active').style.display = '';
        document.getElementById('meditation-complete').style.display = 'none';

        // Show/hide brainwave volume control
        const bwRow = document.getElementById('med-bw-vol-row');
        if (bwRow) bwRow.style.display = currentBrainwave === 'none' ? 'none' : 'flex';

        updateTimerDisplay();

        // Start audio
        startEnvironmentSound(currentSound);
        startBrainwave(currentBrainwave);

        // Start animation
        const animCanvas = document.getElementById('med-anim-canvas');
        if (animCanvas) startAnimation(currentAnimation, animCanvas);

        // Start breath cycle
        if (guideMode !== 'silent') startBreathCycle();

        // Guide text
        if (guideMode === 'full') {
            showGuideText();
            guideTimer = setInterval(() => {
                if (!isPaused) showGuideText();
            }, 18000);
        }

        // Main timer
        timer = setInterval(() => {
            if (isPaused) return;
            elapsed++;
            updateTimerDisplay();
            if (elapsed >= totalSeconds) {
                completeMeditation();
            }
        }, 1000);
    }

    function completeMeditation() {
        clearTimers();
        stopAllAudio();
        playBell();
        setTimeout(() => playBell(), 1500);
        const d = getData();
        if (guideMode !== 'silent') speak(d.completeMsg || 'Meditation complete');
        document.getElementById('meditation-active').style.display = 'none';
        document.getElementById('meditation-complete').style.display = '';
    }

    function updateTimerDisplay() {
        const remaining = totalSeconds - elapsed;
        const m = Math.floor(remaining / 60).toString().padStart(2, '0');
        const s = (remaining % 60).toString().padStart(2, '0');
        const el = document.getElementById('meditation-timer');
        if (el) el.textContent = `${m}:${s}`;
    }

    function startBreathCycle() {
        const d = getData();
        const breathEl = document.getElementById('meditation-breath');
        if (!breathEl) return;
        let phase = 0;
        const phases = [d.breatheIn, d.hold, d.breatheOut, d.hold];
        const times = [4000, 2000, 6000, 2000];

        function cycle() {
            if (!document.getElementById('meditation-breath')) return;
            breathEl.textContent = phases[phase];
            breathEl.className = 'meditation-breath phase-' + phase;
            if ((phase === 0 || phase === 2) && guideMode !== 'silent') speak(phases[phase]);
            setTimeout(() => {
                phase = (phase + 1) % 4;
                if (document.getElementById('meditation-breath')) cycle();
            }, times[phase]);
        }
        cycle();
    }

    function showGuideText() {
        const d = getData();
        const el = document.getElementById('meditation-guide-text');
        if (!el || !d?.guides) return;
        el.style.opacity = '0';
        setTimeout(() => {
            const text = d.guides[guideIdx % d.guides.length];
            el.textContent = text;
            el.style.opacity = '1';
            speak(text);
            guideIdx++;
        }, 500);
    }

    function togglePause() {
        const d = getData();
        isPaused = !isPaused;
        const btn = document.getElementById('med-pause');
        if (btn) btn.textContent = isPaused ? d.resumeBtn : d.pauseBtn;
        // Pause/resume audio context
        if (isPaused && audioCtx) audioCtx.suspend();
        else if (!isPaused && audioCtx) audioCtx.resume();
    }

    function stopMeditation() {
        clearTimers();
        stopAllAudio();
        playBell();
        window.speechSynthesis?.cancel();
        document.getElementById('meditation-active').style.display = 'none';
        document.getElementById('meditation-complete').style.display = '';
    }

    function stopAllAudio() {
        stopNodes(activeSoundNodes);
        stopNodes(activeBrainwaveNodes);
        window.speechSynthesis?.cancel();
        if (bowlInterval) { clearInterval(bowlInterval); bowlInterval = null; }
    }

    function clearTimers() {
        if (timer) { clearInterval(timer); timer = null; }
        if (guideTimer) { clearInterval(guideTimer); guideTimer = null; }
        if (bowlInterval) { clearInterval(bowlInterval); bowlInterval = null; }
        stopAnimation();
    }

    return { init };
})();
