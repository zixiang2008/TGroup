/* ============================================
   24h回忆模块 - recall.js (i18n + auth)
   ============================================ */
const RecallModule = (() => {
    function getData() { return window.RecallLang?.[I18n.getLang()] || window.RecallLang?.zh; }

    function init() {
        Auth.requireLogin(() => render());
    }

    function render() {
        const container = document.getElementById('recall-container');
        if (!container) return;
        const data = getData();
        if (!data) return;
        const t = I18n.t.bind(I18n);
        const saved = JSON.parse(localStorage.getItem('sa_recall') || '{}');

        container.innerHTML = `
            <div class="recall-intro">
                <h3>${data.title}</h3>
                <p>${data.intro}</p>
            </div>
            <div class="recall-timeline">
                ${data.slots.map((slot, i) => `
                    <div class="recall-slot">
                        <div class="recall-time">${slot.time}</div>
                        <div class="recall-prompt">${slot.prompt}</div>
                        <textarea class="recall-answer" data-idx="${i}" placeholder="${t('common.writeHere')}">${saved[i] || ''}</textarea>
                    </div>
                `).join('')}
            </div>
            <button class="recall-save-btn" id="recall-save-btn">${data.saveBtn}</button>
        `;

        // Auto-save on input
        container.querySelectorAll('.recall-answer').forEach(ta => {
            ta.addEventListener('input', () => {
                const saved = JSON.parse(localStorage.getItem('sa_recall') || '{}');
                saved[ta.dataset.idx] = ta.value;
                localStorage.setItem('sa_recall', JSON.stringify(saved));
            });
        });

        document.getElementById('recall-save-btn')?.addEventListener('click', () => {
            const btn = document.getElementById('recall-save-btn');
            btn.textContent = data.savedMsg;
            btn.classList.add('saved');
            setTimeout(() => { btn.textContent = data.saveBtn; btn.classList.remove('saved'); }, 2000);
        });
    }

    return { init };
})();
