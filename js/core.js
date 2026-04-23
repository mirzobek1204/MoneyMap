window.PulPulse = (() => {
  const FALLBACK_LANG = "uz";
  const LOCALES = { uz: "uz-UZ", en: "en-US", ru: "ru-RU" };

  const state = {
    user: localStorage.getItem("pp_user") || null,
    language: localStorage.getItem("pp_lang") || FALLBACK_LANG,
  };

  const translations = {
    uz: {
      "app.name": "PulPulse",
      "currency.suffix": "so'm",
      "language.label": "Til",

      "login.title": "PulPulse",
      "login.subtitle": "Xarajatlaringizni sodda va tez kuzating.",
      "login.nameLabel": "Ismingiz",
      "login.namePlaceholder": "Ismingizni kiriting",
      "login.button": "Kirish",
      "login.continue": "{{name}} sifatida davom etish",

      "nav.dashboard": "Dashboard",
      "nav.expenses": "Xarajatlar",
      "nav.logout": "Chiqish",

      "dashboard.title": "Dashboard",
      "dashboard.welcome": "Xush kelibsiz, {{name}}!",
      "dashboard.challengePrefix": "Challenge:",
      "dashboard.streak": "Streak: xarajat {{expense}} kun, tashrif {{visit}} kun",
      "dashboard.insightTitle": "Insight",
      "dashboard.recentTitle": "Oxirgi xarajatlar",
      "dashboard.recentEmpty": "Hali xarajatlar yo'q.",

      "stats.today": "Bugun",
      "stats.month": "Shu oy",
      "stats.all": "Jami",

      "expense.invalid": "Iltimos, sana va summani to'g'ri kiriting.",
      "expense.date": "Sana",
      "expense.amount": "Summa",
      "expense.category": "Kategoriya",
      "expense.note": "Izoh",
      "expense.save": "Saqlash",

      "budget.title": "Oylik limit",
      "budget.placeholder": "Oylik limit",
      "budget.set": "Limitni o'rnatish",
      "budget.used": "Ishlatildi: {{amount}}",
      "budget.left": "Qoldi: {{amount}}",
      "budget.over": "Oshib ketdi: {{amount}}",
      "budget.unset": "Limit o'rnatilmagan.",
      "budget.invalid": "Limit noto'g'ri.",

      "expenses.title": "Xarajatlar Ro'yxati",
      "expenses.filtered": "Filtr bo'yicha jami: {{amount}}",
      "expenses.empty": "Hech narsa topilmadi.",

      "filter.title": "Filter",
      "filter.from": "Boshlanish sana",
      "filter.to": "Tugash sana",
      "filter.all": "Barchasi",
      "filter.apply": "Qo'llash",

      "table.date": "Sana",
      "table.category": "Kategoriya",
      "table.amount": "Miqdor",
      "table.note": "Izoh",
      "table.action": "Amal",
      "table.delete": "O'chirish",

      "category.food": "Ovqat",
      "category.transport": "Transport",
      "category.utilities": "Kommunal",
      "category.health": "Sog'liq",
      "category.fun": "Ko'ngilochar",
      "category.other": "Boshqa",

      "danger.title": "Ma'lumotlarni Boshqarish",
      "danger.text": "Faqat joriy profil ma'lumotlari tozalanadi.",
      "danger.clear": "Joriy profilni tozalash",
      "danger.confirm": "Ishonchingiz komilmi?",

      "toast.saved": "Saqlandi!",
      "toast.deleted": "O'chirildi!",
      "toast.budgetSaved": "Limit saqlandi!",
      "toast.cleared": "Tozalandi!",
    },
    en: {
      "app.name": "PulPulse",
      "currency.suffix": "UZS",
      "language.label": "Language",

      "login.title": "PulPulse",
      "login.subtitle": "Track your spending quickly and simply.",
      "login.nameLabel": "Name",
      "login.namePlaceholder": "Enter your name",
      "login.button": "Sign in",
      "login.continue": "Continue as {{name}}",

      "nav.dashboard": "Dashboard",
      "nav.expenses": "Expenses",
      "nav.logout": "Logout",

      "dashboard.title": "Dashboard",
      "dashboard.welcome": "Welcome, {{name}}!",
      "dashboard.challengePrefix": "Challenge:",
      "dashboard.streak": "Streak: expenses {{expense}} days, visits {{visit}} days",
      "dashboard.insightTitle": "Insight",
      "dashboard.recentTitle": "Recent expenses",
      "dashboard.recentEmpty": "No expenses yet.",

      "stats.today": "Today",
      "stats.month": "This month",
      "stats.all": "All time",

      "expense.invalid": "Please enter a valid date and amount.",
      "expense.date": "Date",
      "expense.amount": "Amount",
      "expense.category": "Category",
      "expense.note": "Note",
      "expense.save": "Save",

      "budget.title": "Monthly budget",
      "budget.placeholder": "Monthly budget",
      "budget.set": "Set budget",
      "budget.used": "Used: {{amount}}",
      "budget.left": "Left: {{amount}}",
      "budget.over": "Over: {{amount}}",
      "budget.unset": "No budget set.",
      "budget.invalid": "Invalid budget.",

      "expenses.title": "Expenses list",
      "expenses.filtered": "Filtered total: {{amount}}",
      "expenses.empty": "Nothing found.",

      "filter.title": "Filter",
      "filter.from": "From date",
      "filter.to": "To date",
      "filter.all": "All",
      "filter.apply": "Apply",

      "table.date": "Date",
      "table.category": "Category",
      "table.amount": "Amount",
      "table.note": "Note",
      "table.action": "Action",
      "table.delete": "Delete",

      "category.food": "Food",
      "category.transport": "Transport",
      "category.utilities": "Utilities",
      "category.health": "Health",
      "category.fun": "Fun",
      "category.other": "Other",

      "danger.title": "Data management",
      "danger.text": "Only current profile data will be cleared.",
      "danger.clear": "Clear current profile",
      "danger.confirm": "Are you sure?",

      "toast.saved": "Saved!",
      "toast.deleted": "Deleted!",
      "toast.budgetSaved": "Budget saved!",
      "toast.cleared": "Cleared!",
    },
    ru: {
      "app.name": "PulPulse",
      "currency.suffix": "сум",
      "language.label": "Язык",

      "login.title": "PulPulse",
      "login.subtitle": "Удобный трекер расходов.",
      "login.nameLabel": "Имя",
      "login.namePlaceholder": "Введите имя",
      "login.button": "Войти",
      "login.continue": "Продолжить как {{name}}",

      "nav.dashboard": "Дашборд",
      "nav.expenses": "Расходы",
      "nav.logout": "Выйти",

      "dashboard.title": "Дашборд",
      "dashboard.welcome": "Добро пожаловать, {{name}}!",
      "dashboard.challengePrefix": "Челлендж:",
      "dashboard.streak": "Серия: расходы {{expense}} дн., визиты {{visit}} дн.",
      "dashboard.insightTitle": "Инсайт",
      "dashboard.recentTitle": "Последние расходы",
      "dashboard.recentEmpty": "Пока нет расходов.",

      "stats.today": "Сегодня",
      "stats.month": "Этот месяц",
      "stats.all": "Всего",

      "expense.invalid": "Введите корректную дату и сумму.",
      "expense.date": "Дата",
      "expense.amount": "Сумма",
      "expense.category": "Категория",
      "expense.note": "Комментарий",
      "expense.save": "Сохранить",

      "budget.title": "Месячный лимит",
      "budget.placeholder": "Месячный лимит",
      "budget.set": "Установить лимит",
      "budget.used": "Потрачено: {{amount}}",
      "budget.left": "Осталось: {{amount}}",
      "budget.over": "Превышение: {{amount}}",
      "budget.unset": "Лимит не задан.",
      "budget.invalid": "Неверный лимит.",

      "expenses.title": "Список расходов",
      "expenses.filtered": "Итого по фильтру: {{amount}}",
      "expenses.empty": "Ничего не найдено.",

      "filter.title": "Фильтр",
      "filter.from": "С даты",
      "filter.to": "По дату",
      "filter.all": "Все",
      "filter.apply": "Применить",

      "table.date": "Дата",
      "table.category": "Категория",
      "table.amount": "Сумма",
      "table.note": "Комментарий",
      "table.action": "Действие",
      "table.delete": "Удалить",

      "category.food": "Еда",
      "category.transport": "Транспорт",
      "category.utilities": "Коммуналка",
      "category.health": "Здоровье",
      "category.fun": "Развлечения",
      "category.other": "Другое",

      "danger.title": "Управление данными",
      "danger.text": "Очищаются только данные текущего профиля.",
      "danger.clear": "Очистить текущий профиль",
      "danger.confirm": "Вы уверены?",

      "toast.saved": "Сохранено!",
      "toast.deleted": "Удалено!",
      "toast.budgetSaved": "Лимит сохранён!",
      "toast.cleared": "Очищено!",
    },
  };

  function todayIso() {
    return new Date().toISOString().split("T")[0];
  }

  function yesterdayIso() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split("T")[0];
  }

  function t(key, params = {}) {
    let text =
      translations[state.language]?.[key] ?? translations[FALLBACK_LANG]?.[key] ?? key;
    for (const paramKey of Object.keys(params)) {
      text = text.replaceAll(`{{${paramKey}}}`, String(params[paramKey]));
    }
    return text;
  }

  function applyI18n(root = document) {
    const nodes = root.querySelectorAll("[data-i18n]");
    for (const node of nodes) {
      const key = node.getAttribute("data-i18n");
      if (!key) continue;
      node.textContent = t(key);
    }

    const placeholderNodes = root.querySelectorAll("[data-i18n-placeholder]");
    for (const node of placeholderNodes) {
      const key = node.getAttribute("data-i18n-placeholder");
      if (!key) continue;
      node.setAttribute("placeholder", t(key));
    }
    document.documentElement.lang = state.language;
  }

  function setLanguage(lang) {
    const next = translations[lang] ? lang : FALLBACK_LANG;
    state.language = next;
    localStorage.setItem("pp_lang", next);
    applyI18n();
    document.dispatchEvent(new CustomEvent("pulpulse:lang", { detail: { language: next } }));
  }

  function bindLanguageSelect(selectEl) {
    if (!selectEl) return;
    selectEl.value = state.language;
    selectEl.addEventListener("change", (e) => setLanguage(e.target.value));
  }

  function normalizeCategory(value) {
    const raw = String(value || "").trim().toLowerCase();
    const map = {
      utilities: "utilities",
      utility: "utilities",
      kommunal: "utilities",
      communal: "utilities",
      health: "health",
      medicine: "health",
      fun: "fun",
      entertainment: "fun",
      food: "food",
      transport: "transport",
      other: "other",
    };
    return map[raw] || raw;
  }

  function expensesKey(user) {
    return `pp_exp_${user}`;
  }

  function budgetKey(user) {
    return `pp_budget_${user}`;
  }

  function visitLastKey(user) {
    return `pp_visit_last_${user}`;
  }

  function visitStreakKey(user) {
    return `pp_visit_streak_${user}`;
  }

  function getExpenses(user) {
    try {
      const parsed = JSON.parse(localStorage.getItem(expensesKey(user)) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function setExpenses(user, list) {
    localStorage.setItem(expensesKey(user), JSON.stringify(list));
  }

  function addExpense(user, data) {
    const date = String(data?.date || "").trim();
    const amount = Number(data?.amount);
    const category = normalizeCategory(data?.category);
    const note = String(data?.note || "").trim();

    const next = getExpenses(user);
    next.push({
      id: crypto?.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      createdAt: new Date().toISOString(),
      date,
      amount,
      category,
      note,
    });
    setExpenses(user, next);
  }

  function deleteExpense(user, id) {
    const next = getExpenses(user).filter((e) => e.id !== id);
    setExpenses(user, next);
  }

  function getStats(user) {
    const list = getExpenses(user);
    const today = todayIso();
    const monthPrefix = today.slice(0, 7);

    let todaySum = 0;
    let monthSum = 0;
    let totalSum = 0;

    for (const item of list) {
      const amount = Number(item.amount || 0);
      totalSum += amount;
      if (item.date === today) todaySum += amount;
      if (String(item.date || "").startsWith(monthPrefix)) monthSum += amount;
    }

    return { today: todaySum, month: monthSum, total: totalSum };
  }

  function formatCurrency(num) {
    const locale = LOCALES[state.language] || LOCALES.en;
    const normalized = Number.isFinite(Number(num)) ? Number(num) : 0;
    return `${new Intl.NumberFormat(locale).format(normalized)} ${t("currency.suffix")}`;
  }

  function setBudget(user, value) {
    localStorage.setItem(budgetKey(user), String(Number(value || 0)));
  }

  function getBudget(user) {
    const raw = Number(localStorage.getItem(budgetKey(user)) || 0);
    return Number.isFinite(raw) ? raw : 0;
  }

  function touchVisit(user) {
    const today = todayIso();
    const last = localStorage.getItem(visitLastKey(user));
    let streak = Number(localStorage.getItem(visitStreakKey(user)) || 0);

    if (!last) {
      streak = 1;
    } else if (last === today) {
      streak = Math.max(streak, 1);
    } else if (last === yesterdayIso()) {
      streak = Math.max(streak + 1, 2);
    } else {
      streak = 1;
    }

    localStorage.setItem(visitLastKey(user), today);
    localStorage.setItem(visitStreakKey(user), String(streak));
    return streak;
  }

  function getVisitStreak(user) {
    const streak = Number(localStorage.getItem(visitStreakKey(user)) || 0);
    return Number.isFinite(streak) ? streak : 0;
  }

  function getExpenseStreak(user) {
    const dates = new Set(getExpenses(user).map((e) => e.date).filter(Boolean));
    let streak = 0;
    const cursor = new Date();
    while (streak < 3650) {
      const iso = cursor.toISOString().split("T")[0];
      if (!dates.has(iso)) break;
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  }

  function getChallenge(user) {
    const stats = getStats(user);
    const budget = getBudget(user);
    if (budget > 0) {
      const left = budget - stats.month;
      if (left > 0) return `${t("budget.left", { amount: formatCurrency(left) })}`;
      return `${t("budget.over", { amount: formatCurrency(Math.abs(left)) })}`;
    }
    const target = 50000;
    return `${t("stats.today")}: ${formatCurrency(stats.today)} • ${t("expense.save")} < ${formatCurrency(target)}`;
  }

  function getInsight(user) {
    const stats = getStats(user);
    const list = getExpenses(user);
    if (!list.length) return t("dashboard.recentEmpty");

    const monthPrefix = todayIso().slice(0, 7);
    const byCategory = {};
    for (const item of list) {
      if (!String(item.date || "").startsWith(monthPrefix)) continue;
      const cat = normalizeCategory(item.category);
      byCategory[cat] = (byCategory[cat] || 0) + Number(item.amount || 0);
    }

    const top = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];
    if (!top) return `${t("stats.month")}: ${formatCurrency(stats.month)}`;

    return `${t("stats.month")}: ${formatCurrency(stats.month)} • ${t(`category.${top[0]}`)}: ${formatCurrency(top[1])}`;
  }

  function clearCurrentUserData(user) {
    localStorage.removeItem(expensesKey(user));
    localStorage.removeItem(budgetKey(user));
    localStorage.removeItem(visitLastKey(user));
    localStorage.removeItem(visitStreakKey(user));
  }

  function showToast(message) {
    const msg = String(message || "");
    const toast = document.getElementById("toast");
    if (!toast) {
      alert(msg);
      return;
    }

    toast.textContent = msg;
    toast.classList.add("show");

    if (toast._ppTimer) clearTimeout(toast._ppTimer);
    toast._ppTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function requireAuth() {
    if (!state.user) {
      location.href = "index.html";
      return null;
    }
    touchVisit(state.user);
    return state.user;
  }

  function setCurrentUser(name) {
    const trimmed = String(name || "").trim();
    state.user = trimmed || null;
    if (state.user) localStorage.setItem("pp_user", state.user);
  }

  function getCurrentUser() {
    return state.user;
  }

  function logout() {
    localStorage.removeItem("pp_user");
    state.user = null;
    location.href = "index.html";
  }

  setLanguage(state.language);

  return {
    state,
    t,
    applyI18n,
    setLanguage,
    bindLanguageSelect,

    requireAuth,
    setCurrentUser,
    getCurrentUser,
    logout,

    todayIso,
    formatCurrency,
    normalizeCategory,

    getExpenses,
    addExpense,
    deleteExpense,
    getStats,

    setBudget,
    getBudget,

    getChallenge,
    getInsight,
    getExpenseStreak,
    getVisitStreak,

    clearCurrentUserData,
    showToast,
  };
})();
