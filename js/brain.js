/* ============================================
   感受模式模块 - brain.js (i18n)
   ============================================ */
const BrainModule = (() => {
    function getData() { return window.BrainLang?.[I18n.getLang()] || window.BrainLang?.zh; }

    function init() { render(); }

    function render() {
        const container = document.getElementById('brain-container');
        if (!container) return;
        const data = getData();
        if (!data) return;

        container.innerHTML = `
            <div class="brain-intro">
                <h3>${data.title}</h3>
                <p>${data.intro}</p>
            </div>
            <div class="brain-comparison">
                <div class="brain-side left">
                    <div class="brain-side-icon">🧠</div>
                    <h4>${data.leftBrain}</h4>
                    <p>${data.leftDesc}</p>
                </div>
                <div class="brain-arrow">→</div>
                <div class="brain-side right">
                    <div class="brain-side-icon">💗</div>
                    <h4>${data.rightBrain}</h4>
                    <p>${data.rightDesc}</p>
                </div>
            </div>
            <h4 class="practices-title">${data.practiceTitle}</h4>
            <div class="practices-list">
                ${data.practices.map((p, i) => `
                    <div class="practice-card" data-idx="${i}">
                        <div class="practice-icon">${p.icon}</div>
                        <div class="practice-info">
                            <div class="practice-title">${p.title}</div>
                            <div class="practice-desc">${p.desc}</div>
                            <div class="practice-time">⏱ ${p.time}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    return { init };
})();
