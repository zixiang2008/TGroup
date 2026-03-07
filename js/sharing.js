/* ============================================
   分享句式模块 - sharing.js (i18n)
   ============================================ */
const SharingModule = (() => {
    function getData() { return window.SharingLang?.[I18n.getLang()] || window.SharingLang?.zh; }

    function init() { render(); }

    function render() {
        const container = document.getElementById('sharing-container');
        if (!container) return;
        const data = getData();
        if (!data) return;
        const t = I18n.t.bind(I18n);

        container.innerHTML = `
            <div class="sharing-intro">
                <h3>${data.title}</h3>
                <p>${data.intro}</p>
            </div>

            <div class="sharing-template">
                <h4>${data.template.label}</h4>
                <div class="template-fields">
                    <div class="template-row">
                        <label>${data.template.when}</label>
                        <input type="text" class="template-input" id="tpl-when" placeholder="${data.template.whenPlaceholder}" />
                    </div>
                    <div class="template-row">
                        <label>${data.template.interpret}</label>
                        <input type="text" class="template-input" id="tpl-interpret" placeholder="${data.template.interpretPlaceholder}" />
                    </div>
                    <div class="template-row">
                        <label>${data.template.feel}</label>
                        <input type="text" class="template-input" id="tpl-feel" placeholder="${data.template.feelPlaceholder}" />
                    </div>
                    <div class="template-row">
                        <label>${data.template.want}</label>
                        <input type="text" class="template-input" id="tpl-want" placeholder="${data.template.wantPlaceholder}" />
                    </div>
                </div>
                <button class="sharing-generate-btn" id="sharing-generate">${data.template.generate}</button>
                <div class="sharing-result" id="sharing-result" style="display:none;">
                    <h4>${data.template.result}</h4>
                    <p id="sharing-output"></p>
                    <button class="sharing-copy-btn" id="sharing-copy">${data.template.copyBtn}</button>
                </div>
            </div>

            <div class="sharing-examples">
                <h4>${data.examplesTitle}</h4>
                ${data.examples.map(ex => `<div class="example-card"><p>${ex}</p></div>`).join('')}
            </div>

            <div class="sharing-tips">
                ${data.tips.map(tip => `
                    <div class="tip-card">
                        <h5>${tip.title}</h5>
                        <p>${tip.desc}</p>
                    </div>
                `).join('')}
            </div>
        `;

        document.getElementById('sharing-generate')?.addEventListener('click', () => {
            const when = document.getElementById('tpl-when').value.trim();
            const interpret = document.getElementById('tpl-interpret').value.trim();
            const feel = document.getElementById('tpl-feel').value.trim();
            const want = document.getElementById('tpl-want').value.trim();
            if (!when && !feel) return;

            const sentence = `${data.template.when}${when}，${data.template.interpret}${interpret}，${data.template.feel}${feel}，${data.template.want}${want}。`;
            document.getElementById('sharing-output').textContent = sentence;
            document.getElementById('sharing-result').style.display = '';
        });

        document.getElementById('sharing-copy')?.addEventListener('click', () => {
            const text = document.getElementById('sharing-output').textContent;
            navigator.clipboard?.writeText(text).then(() => {
                const btn = document.getElementById('sharing-copy');
                btn.textContent = t('common.copied');
                setTimeout(() => { btn.textContent = data.template.copyBtn; }, 2000);
            });
        });
    }

    return { init };
})();
