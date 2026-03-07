/* ============================================
   行动建议模块 - actions.js (i18n)
   ============================================ */
const ActionsModule = (() => {
    function getData() { return window.ActionsLang?.[I18n.getLang()] || window.ActionsLang?.zh; }

    function init() { render(); }

    function render() {
        const container = document.getElementById('actions-container');
        if (!container) return;
        const data = getData();
        if (!data) return;

        container.innerHTML = `
            <div class="actions-intro">
                <h3>${data.title}</h3>
                <p>${data.intro}</p>
            </div>
            <div class="actions-list">
                ${data.actions.map((a, i) => `
                    <div class="action-card" data-idx="${i}">
                        <div class="action-header">
                            <span class="action-icon">${a.icon}</span>
                            <span class="action-title">${a.title}</span>
                            <span class="action-time">⏱ ${a.time}</span>
                            <span class="action-expand">▼</span>
                        </div>
                        <div class="action-detail">
                            <p><strong>${I18n.getLang() === 'en' ? 'Why' : I18n.getLang() === 'ja' ? 'なぜ' : I18n.getLang() === 'th' ? 'ทำไม' : '为什么'}：</strong>${a.why}</p>
                            <p><strong>${I18n.getLang() === 'en' ? 'How' : I18n.getLang() === 'ja' ? 'やり方' : I18n.getLang() === 'th' ? 'วิธี' : '怎么做'}：</strong>${a.how}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Toggle expand
        container.querySelectorAll('.action-card').forEach(card => {
            card.querySelector('.action-header').addEventListener('click', () => {
                card.classList.toggle('expanded');
            });
        });
    }

    return { init };
})();
