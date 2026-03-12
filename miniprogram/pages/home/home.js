const i18n = require('../../utils/i18n.js');

Page({
    data: {
        greeting: '',
        dailyLabel: '',
        dailyQuote: '',
        cards: [],
        langOpen: false,
        langs: []
    },

    onLoad() {
        i18n.init();
        this.updateUI();
    },

    onShow() {
        this.updateUI();
    },

    updateUI() {
        const h = new Date().getHours();
        let timeKey = h < 11 ? 'morning' : h < 13 ? 'noon' : h < 18 ? 'afternoon' : 'evening';
        const greeting = i18n.t('greeting.' + timeKey) + i18n.t('greetingSuffix');

        const quotes = i18n.getDailyQuotes();
        const dailyQuote = quotes[Math.floor(Math.random() * quotes.length)];

        const cardData = [
            { page: 'emotions', icon: '😊' },
            { page: 'questioning', icon: '🔍' },
            { page: 'recall', icon: '⏰' },
            { page: 'meditation', icon: '🧘' },
            { page: 'brain', icon: '🧠' },
            { page: 'dialogue', icon: '💬' },
            { page: 'actions', icon: '🏃' },
            { page: 'sharing', icon: '📝' },
            { page: 'appendix', icon: '📋' }
        ];

        const cards = cardData.map(c => ({
            ...c,
            title: i18n.t('cards.' + c.page + '.title'),
            desc: i18n.t('cards.' + c.page + '.desc')
        }));

        this.setData({
            greeting,
            dailyLabel: i18n.t('dailyLabel'),
            dailyQuote,
            cards,
            langs: i18n.getSupported().map(l => ({ code: l, name: i18n.tLang('langName', l), active: l === i18n.getLang() }))
        });
    },

    refreshQuote() {
        const quotes = i18n.getDailyQuotes();
        this.setData({ dailyQuote: quotes[Math.floor(Math.random() * quotes.length)] });
    },

    navigateTo(e) {
        const page = e.currentTarget.dataset.page;
        const tabPages = ['emotions', 'meditation', 'dialogue'];
        if (tabPages.includes(page)) {
            wx.switchTab({ url: '/pages/' + page + '/' + page });
        } else {
            wx.navigateTo({ url: '/pages/' + page + '/' + page });
        }
    },

    switchLang(e) {
        const lang = e.currentTarget.dataset.lang;
        i18n.setLang(lang);
        this.updateUI();
        this.setData({ langOpen: false });
    },

    toggleLang() {
        this.setData({ langOpen: !this.data.langOpen });
    }
});
