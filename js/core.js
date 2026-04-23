window.PulPulse = (() => {
  const state = {
    user: localStorage.getItem("pp_user") || null,
    language: localStorage.getItem("pp_lang") || "uz",
  };

  const translations = {
    uz: { "app.name": "MoneyMap", "dashboard.welcome": "Xush kelibsiz, {{name}}!", "toast.saved": "Saqlandi!" },
    ru: { "app.name": "MoneyMap", "dashboard.welcome": "Добро пожаловать, {{name}}!", "toast.saved": "Сохранено!" },
    en: { "app.name": "MoneyMap", "dashboard.welcome": "Welcome, {{name}}!", "toast.saved": "Saved!" }
  };

  return {
    state,
    t: (key, params = {}) => {
        let text = translations[state.language][key] || key;
        Object.keys(params).forEach(p => text = text.replace(`{{${p}}}`, params[p]));
        return text;
    },
    requireAuth: () => {
        if (!state.user) location.href = "index.html";
        return state.user;
    },
    setCurrentUser: (name) => {
        state.user = name;
        localStorage.setItem("pp_user", name);
    },
    getCurrentUser: () => state.user,
    logout: () => {
        localStorage.removeItem("pp_user");
        location.href = "index.html";
    },
    todayIso: () => new Date().toISOString().split('T')[0],
    formatCurrency: (num) => new Intl.NumberFormat(state.language === 'uz' ? 'uz-UZ' : 'en-US').format(num) + " so'm",
    getExpenses: (u) => JSON.parse(localStorage.getItem(`pp_exp_${u}`) || "[]"),
    addExpense: (u, data) => {
        const exps = JSON.parse(localStorage.getItem(`pp_exp_${u}`) || "[]");
        exps.push({ id: Date.now().toString(), ...data });
        localStorage.setItem(`pp_exp_${u}`, JSON.stringify(exps));
    },
    deleteExpense: (u, id) => {
        const exps = JSON.parse(localStorage.getItem(`pp_exp_${u}`) || "[]");
        localStorage.setItem(`pp_exp_${u}`, JSON.stringify(exps.filter(e => e.id !== id)));
    },
    getStats: (u) => {
        const exps = JSON.parse(localStorage.getItem(`pp_exp_${u}`) || "[]");
        const today = new Date().toISOString().split('T')[0];
        return {
            today: exps.filter(e => e.date === today).reduce((s, e) => s + Number(e.amount), 0),
            total: exps.reduce((s, e) => s + Number(e.amount), 0)
        };
    },
    applyI18n: () => { /* Tarjima mantiqi */ },
    showToast: (msg) => alert(msg), // Vaqtincha oddiy alert
    bindLanguageSelect: (el) => {
        if (!el) return;
        el.value = state.language;
        el.addEventListener("change", (e) => {
            state.language = e.target.value;
            localStorage.setItem("pp_lang", e.target.value);
            location.reload();
        });
    }
  };
})();
