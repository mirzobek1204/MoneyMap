(() => {
  const STORAGE_KEY = "pulpulse_data_v4";
  const LEGACY_KEYS = ["daily_expenses_app_v3", "daily_expenses_app_v2", "daily_expenses_app_v1"];
  const CURRENT_USER_KEY = "daily_expenses_current_user";
  const LANGUAGE_KEY = "daily_expenses_lang";

  const CATEGORIES = ["food", "transport", "utilities", "health", "fun", "other"];
  const CATEGORY_ALIASES = {
    ovqat: "food",
    еда: "food",
    food: "food",
    transport: "transport",
    транспорт: "transport",
    kommunal: "utilities",
    коммунал: "utilities",
    utilities: "utilities",
    "sogliq": "health",
    "sog'liq": "health",
    здоровье: "health",
    health: "health",
    "kongilochar": "fun",
    "ko'ngilochar": "fun",
    развлечения: "fun",
    fun: "fun",
    boshqa: "other",
    другое: "other",
    other: "other",
  };

  const I18N = {
    uz: {
      language: { label: "Til", uz: "Uzbek", en: "English", ru: "Русский" },
      nav: { dashboard: "Dashboard", expenses: "Xarajatlar", logout: "Chiqish" },
      login: {
        title: "Xarajatlarni boshqarish endi oson",
        subtitle: "Ismingizni kiriting va darhol ishlatishni boshlang.",
        inputLabel: "Ism",
        placeholder: "Mirzobek",
        submit: "Kirish",
        continue: "{name} sifatida davom etish",
      },
      dashboard: {
        title: "Umumiy Ko'rinish",
        welcome: "Xush kelibsiz, {name}",
        progress: "Progress",
        recent: "So'nggi Xarajatlar",
        allExpenses: "Hammasini ko'rish",
        challengePrefix: "Bugungi challenge:",
        streak: "Xarajat streak: {expense} kun, Kirish streak: {visit} kun",
      },
      stats: { today: "Bugun", month: "Joriy Oy", total: "Umumiy" },
      expense: {
        title: "Yangi Xarajat",
        date: "Sana",
        amount: "Miqdor",
        amountPlaceholder: "50000",
        category: "Kategoriya",
        note: "Izoh",
        notePlaceholder: "Qisqa izoh",
        quick: "Tez summa",
        invalid: "Sana, miqdor va kategoriya majburiy.",
      },
      budget: {
        monthly: "Oylik budget",
        placeholder: "3000000",
        used: "Sarflangan: {amount}",
        left: "Qolgan: {amount}",
        over: "Limitdan oshdi: {amount}",
        unset: "Budget belgilanmagan.",
        invalid: "Budget qiymati noto'g'ri.",
      },
      filter: {
        title: "Filter",
        from: "Boshlanish sana",
        to: "Tugash sana",
        all: "Barchasi",
        apply: "Qo'llash",
      },
      expenses: {
        title: "Xarajatlar Ro'yxati",
        filtered: "Filter natijasi: {amount}",
        empty: "Xarajatlar hozircha yo'q.",
      },
      table: { date: "Sana", category: "Kategoriya", amount: "Miqdor", note: "Izoh", action: "Amal", delete: "O'chirish" },
      category: {
        food: "Ovqat",
        transport: "Transport",
        utilities: "Kommunal",
        health: "Sog'liq",
        fun: "Ko'ngilochar",
        other: "Boshqa",
      },
      common: { select: "Tanlang", save: "Saqlash", currency: "so'm" },
      danger: {
        title: "Ma'lumotlarni Boshqarish",
        text: "Faqat joriy profil ma'lumotlari tozalanadi.",
        clear: "Joriy profilni tozalash",
        confirm: "Joriy profil ma'lumotlarini tozalaysizmi?",
      },
      insight: {
        empty: "Insight uchun kamida bitta xarajat kiriting.",
        top: "Top kategoriya: {category} ({amount}).",
        trendBase: "7 kunlik trend shakllanmoqda.",
        trendUp: "Oxirgi 7 kun xarajat {percent}% oshgan.",
        trendDown: "Oxirgi 7 kun xarajat {percent}% kamaygan.",
        budgetOk: "Siz budget ichidasiz.",
        budgetOver: "Siz budgetdan oshib ketdingiz.",
        budgetUnset: "Budget belgilanmagan.",
      },
      toast: {
        language: "Til o'zgardi: {language}",
        saved: "Xarajat saqlandi.",
        deleted: "Xarajat o'chirildi.",
        budgetSaved: "Budget saqlandi.",
        cleared: "Ma'lumotlar tozalandi.",
        loginRequired: "Avval kirish kerak.",
      },
      challenge: [
        "Bitta xarajatga aniq izoh yozing.",
        "Transportdan kamida 10 000 so'm tejang.",
        "Bitta keraksiz xaridni bekor qiling.",
        "Har xarajatga kategoriya tanlang.",
        "Kechqurun 2 daqiqa hisobotni tekshiring.",
      ],
    },
    en: {
      language: { label: "Language", uz: "Uzbek", en: "English", ru: "Russian" },
      nav: { dashboard: "Dashboard", expenses: "Expenses", logout: "Log out" },
      login: {
        title: "Expense tracking made simple",
        subtitle: "Enter your name and start using the app right away.",
        inputLabel: "Name",
        placeholder: "Mirzobek",
        submit: "Log in",
        continue: "Continue as {name}",
      },
      dashboard: {
        title: "Overview",
        welcome: "Welcome, {name}",
        progress: "Progress",
        recent: "Recent Expenses",
        allExpenses: "View all",
        challengePrefix: "Today's challenge:",
        streak: "Expense streak: {expense} days, Visit streak: {visit} days",
      },
      stats: { today: "Today", month: "This Month", total: "Total" },
      expense: {
        title: "New Expense",
        date: "Date",
        amount: "Amount",
        amountPlaceholder: "50000",
        category: "Category",
        note: "Note",
        notePlaceholder: "Short note",
        quick: "Quick amount",
        invalid: "Date, amount and category are required.",
      },
      budget: {
        monthly: "Monthly budget",
        placeholder: "3000000",
        used: "Spent: {amount}",
        left: "Left: {amount}",
        over: "Exceeded by: {amount}",
        unset: "Budget is not set.",
        invalid: "Invalid budget value.",
      },
      filter: { title: "Filter", from: "Start date", to: "End date", all: "All", apply: "Apply" },
      expenses: { title: "Expense List", filtered: "Filtered total: {amount}", empty: "No expenses yet." },
      table: { date: "Date", category: "Category", amount: "Amount", note: "Note", action: "Action", delete: "Delete" },
      category: {
        food: "Food",
        transport: "Transport",
        utilities: "Utilities",
        health: "Health",
        fun: "Entertainment",
        other: "Other",
      },
      common: { select: "Select", save: "Save", currency: "UZS" },
      danger: {
        title: "Data Control",
        text: "Only the current profile data will be removed.",
        clear: "Clear current profile",
        confirm: "Do you want to clear current profile data?",
      },
      insight: {
        empty: "Add at least one expense to see insights.",
        top: "Top category: {category} ({amount}).",
        trendBase: "7-day trend is still forming.",
        trendUp: "Spending in last 7 days is up by {percent}%.",
        trendDown: "Spending in last 7 days is down by {percent}%.",
        budgetOk: "You are within budget.",
        budgetOver: "You are over budget.",
        budgetUnset: "Budget is not set.",
      },
      toast: {
        language: "Language changed: {language}",
        saved: "Expense saved.",
        deleted: "Expense deleted.",
        budgetSaved: "Budget saved.",
        cleared: "Data cleared.",
        loginRequired: "Please log in first.",
      },
      challenge: [
        "Add one expense with a clear note.",
        "Save at least 10,000 on transport.",
        "Skip one unnecessary purchase today.",
        "Always pick a category for each expense.",
        "Review your report for 2 minutes tonight.",
      ],
    },
    ru: {
      language: { label: "Язык", uz: "Узбекский", en: "Английский", ru: "Русский" },
      nav: { dashboard: "Дашборд", expenses: "Расходы", logout: "Выйти" },
      login: {
        title: "Учет расходов стал проще",
        subtitle: "Введите имя и сразу начните использовать сайт.",
        inputLabel: "Имя",
        placeholder: "Mirzobek",
        submit: "Войти",
        continue: "Продолжить как {name}",
      },
      dashboard: {
        title: "Общий Обзор",
        welcome: "Добро пожаловать, {name}",
        progress: "Прогресс",
        recent: "Последние Расходы",
        allExpenses: "Смотреть все",
        challengePrefix: "Челлендж дня:",
        streak: "Серия расходов: {expense} дней, Серия входов: {visit} дней",
      },
      stats: { today: "Сегодня", month: "Этот месяц", total: "Итого" },
      expense: {
        title: "Новый Расход",
        date: "Дата",
        amount: "Сумма",
        amountPlaceholder: "50000",
        category: "Категория",
        note: "Заметка",
        notePlaceholder: "Короткая заметка",
        quick: "Быстрая сумма",
        invalid: "Дата, сумма и категория обязательны.",
      },
      budget: {
        monthly: "Месячный бюджет",
        placeholder: "3000000",
        used: "Потрачено: {amount}",
        left: "Осталось: {amount}",
        over: "Превышение: {amount}",
        unset: "Бюджет не задан.",
        invalid: "Некорректное значение бюджета.",
      },
      filter: { title: "Фильтр", from: "Дата начала", to: "Дата окончания", all: "Все", apply: "Применить" },
      expenses: { title: "Список Расходов", filtered: "Итог по фильтру: {amount}", empty: "Пока нет расходов." },
      table: { date: "Дата", category: "Категория", amount: "Сумма", note: "Заметка", action: "Действие", delete: "Удалить" },
      category: {
        food: "Еда",
        transport: "Транспорт",
        utilities: "Коммунальные",
        health: "Здоровье",
        fun: "Развлечения",
        other: "Другое",
      },
      common: { select: "Выберите", save: "Сохранить", currency: "сум" },
      danger: {
        title: "Управление Данными",
        text: "Будут очищены только данные текущего профиля.",
        clear: "Очистить текущий профиль",
        confirm: "Очистить данные текущего профиля?",
      },
      insight: {
        empty: "Добавьте хотя бы один расход для инсайтов.",
        top: "Топ категория: {category} ({amount}).",
        trendBase: "Тренд за 7 дней пока формируется.",
        trendUp: "Расходы за последние 7 дней выросли на {percent}%.",
        trendDown: "Расходы за последние 7 дней снизились на {percent}%.",
        budgetOk: "Вы в рамках бюджета.",
        budgetOver: "Вы превысили бюджет.",
        budgetUnset: "Бюджет не задан.",
      },
      toast: {
        language: "Язык изменен: {language}",
        saved: "Расход сохранен.",
        deleted: "Расход удален.",
        budgetSaved: "Бюджет сохранен.",
        cleared: "Данные очищены.",
        loginRequired: "Сначала войдите.",
      },
      challenge: [
        "Добавьте один расход с понятной заметкой.",
        "Сэкономьте минимум 10 000 на транспорте.",
        "Откажитесь от одной лишней покупки сегодня.",
        "Всегда выбирайте категорию для расхода.",
        "Проверьте отчет 2 минуты вечером.",
      ],
    },
  };

  const state = {
    language: loadLanguage(),
    data: loadData(),
  };

  function loadLanguage() {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    if (saved && I18N[saved]) return saved;
    const browser = (navigator.language || "uz").toLowerCase();
    if (browser.startsWith("ru")) return "ru";
    if (browser.startsWith("en")) return "en";
    return "uz";
  }

  function loadData() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return normalizeData(safeJson(raw));

    for (const key of LEGACY_KEYS) {
      const legacyRaw = localStorage.getItem(key);
      if (!legacyRaw) continue;
      const migrated = normalizeData(safeJson(legacyRaw));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
    return { users: {}, budgets: {}, visits: {} };
  }

  function normalizeData(parsed) {
    const normalized = { users: {}, budgets: {}, visits: {} };
    if (!parsed || typeof parsed !== "object") return normalized;

    if (parsed.users && typeof parsed.users === "object") {
      for (const [username, list] of Object.entries(parsed.users)) {
        normalized.users[username] = Array.isArray(list) ? list.map(normalizeExpense).filter(Boolean) : [];
      }
    }
    if (parsed.budgets && typeof parsed.budgets === "object") {
      for (const [username, value] of Object.entries(parsed.budgets)) {
        const n = Number(value);
        normalized.budgets[username] = Number.isFinite(n) && n >= 0 ? n : 0;
      }
    }
    if (parsed.visits && typeof parsed.visits === "object") {
      for (const [username, value] of Object.entries(parsed.visits)) {
        if (!value || typeof value !== "object") continue;
        normalized.visits[username] = {
          streak: Number(value.streak || 0),
          lastDate: typeof value.lastDate === "string" ? value.lastDate : "",
        };
      }
    }
    return normalized;
  }

  function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
  }

  function safeJson(raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }

  function getCurrentUser() {
    return localStorage.getItem(CURRENT_USER_KEY) || "";
  }

  function setCurrentUser(name) {
    localStorage.setItem(CURRENT_USER_KEY, name);
    ensureUser(name);
    touchVisit(name);
  }

  function logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
    location.href = "index.html";
  }

  function ensureUser(name) {
    if (!name) return;
    if (!Array.isArray(state.data.users[name])) state.data.users[name] = [];
    if (!Number.isFinite(Number(state.data.budgets[name]))) state.data.budgets[name] = 0;
    if (!state.data.visits[name]) state.data.visits[name] = { streak: 0, lastDate: "" };
    saveData();
  }

  function requireAuth() {
    const user = getCurrentUser();
    if (!user) {
      location.href = "index.html";
      return "";
    }
    ensureUser(user);
    touchVisit(user);
    return user;
  }

  function touchVisit(user) {
    const today = todayIso();
    const visit = state.data.visits[user];
    if (!visit) return;
    if (visit.lastDate === today) return;
    const yesterday = shiftDate(today, -1);
    visit.streak = visit.lastDate === yesterday ? Number(visit.streak || 0) + 1 : 1;
    visit.lastDate = today;
    saveData();
  }

  function getVisitStreak(user) {
    return Number(state.data.visits[user]?.streak || 0);
  }

  function getExpenses(user) {
    ensureUser(user);
    return state.data.users[user] || [];
  }

  function addExpense(user, payload) {
    ensureUser(user);
    state.data.users[user].push({
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      date: payload.date,
      amount: Number(payload.amount),
      category: normalizeCategory(payload.category),
      note: payload.note || "",
      createdAt: new Date().toISOString(),
    });
    saveData();
  }

  function deleteExpense(user, id) {
    ensureUser(user);
    state.data.users[user] = state.data.users[user].filter((item) => item.id !== id);
    saveData();
  }

  function clearCurrentUserData(user) {
    ensureUser(user);
    state.data.users[user] = [];
    state.data.budgets[user] = 0;
    saveData();
  }

  function setBudget(user, value) {
    ensureUser(user);
    state.data.budgets[user] = Number(value) || 0;
    saveData();
  }

  function getBudget(user) {
    ensureUser(user);
    return Number(state.data.budgets[user] || 0);
  }

  function getStats(user) {
    const list = getExpenses(user);
    const today = todayIso();
    const monthPrefix = today.slice(0, 7);
    return {
      today: sumBy(list.filter((x) => x.date === today)),
      month: sumBy(list.filter((x) => x.date.startsWith(monthPrefix))),
      total: sumBy(list),
    };
  }

  function getExpenseStreak(user) {
    const list = getExpenses(user);
    if (!list.length) return 0;
    const days = new Set(list.map((x) => x.date));
    let cursor = todayIso();
    if (!days.has(cursor)) cursor = shiftDate(cursor, -1);
    let streak = 0;
    while (days.has(cursor)) {
      streak += 1;
      cursor = shiftDate(cursor, -1);
    }
    return streak;
  }

  function getChallenge(user) {
    const list = getI18n("challenge");
    if (!Array.isArray(list) || !list.length) return "";
    const key = `${user}-${todayIso()}`;
    const hash = [...key].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return list[hash % list.length];
  }

  function getInsight(user) {
    const list = getExpenses(user);
    if (!list.length) return t("insight.empty");

    const totals = {};
    for (const item of list) {
      totals[item.category] = (totals[item.category] || 0) + Number(item.amount || 0);
    }
    const [topCategory, topAmount] = Object.entries(totals).sort((a, b) => b[1] - a[1])[0];

    const today = todayIso();
    const last7Start = shiftDate(today, -6);
    const prev7Start = shiftDate(today, -13);
    const prev7End = shiftDate(today, -7);
    const last7 = sumBy(list.filter((x) => x.date >= last7Start && x.date <= today));
    const prev7 = sumBy(list.filter((x) => x.date >= prev7Start && x.date <= prev7End));

    let trend = t("insight.trendBase");
    if (prev7 > 0) {
      const diff = ((last7 - prev7) / prev7) * 100;
      if (diff > 8) trend = t("insight.trendUp", { percent: String(Math.round(diff)) });
      if (diff < -8) trend = t("insight.trendDown", { percent: String(Math.round(Math.abs(diff))) });
    }

    const budget = getBudget(user);
    const month = getStats(user).month;
    let budgetText = t("insight.budgetUnset");
    if (budget > 0 && month <= budget) budgetText = t("insight.budgetOk");
    if (budget > 0 && month > budget) budgetText = t("insight.budgetOver");

    return `${t("insight.top", { category: t(`category.${topCategory}`), amount: formatCurrency(topAmount) })} ${trend} ${budgetText}`;
  }

  function normalizeExpense(item) {
    if (!item || typeof item !== "object") return null;
    const date = typeof item.date === "string" ? item.date : "";
    const amount = Number(item.amount);
    if (!date || !Number.isFinite(amount) || amount <= 0) return null;
    return {
      id: item.id || `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      date,
      amount,
      category: normalizeCategory(item.category),
      note: typeof item.note === "string" ? item.note : "",
      createdAt: item.createdAt || new Date().toISOString(),
    };
  }

  function normalizeCategory(value) {
    if (!value) return "";
    if (CATEGORIES.includes(value)) return value;
    const low = String(value).toLowerCase().trim();
    if (CATEGORY_ALIASES[low]) return CATEGORY_ALIASES[low];
    const clean = low.replace(/[\s'`’_-]/g, "");
    if (CATEGORY_ALIASES[clean]) return CATEGORY_ALIASES[clean];
    return "other";
  }

  function getI18n(path) {
    const steps = path.split(".");
    let value = I18N[state.language];
    for (const step of steps) {
      if (value && Object.prototype.hasOwnProperty.call(value, step)) value = value[step];
      else return path;
    }
    return value;
  }

  function t(path, vars = {}) {
    const raw = getI18n(path);
    if (typeof raw !== "string") return path;
    return raw.replace(/\{(\w+)\}/g, (_, key) => (key in vars ? vars[key] : `{${key}}`));
  }

  function setLanguage(lang) {
    if (!I18N[lang]) return;
    state.language = lang;
    localStorage.setItem(LANGUAGE_KEY, lang);
    applyI18n();
    document.dispatchEvent(new CustomEvent("pulpulse:lang"));
  }

  function applyI18n(root = document) {
    document.documentElement.lang = state.language;
    root.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
    root.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      node.placeholder = t(node.dataset.i18nPlaceholder);
    });
  }

  function bindLanguageSelect(selectEl) {
    if (!selectEl) return;
    selectEl.value = state.language;
    updateLanguageOptionLabels(selectEl);
    selectEl.addEventListener("change", (e) => {
      setLanguage(e.target.value);
      updateLanguageOptionLabels(selectEl);
      showToast(t("toast.language", { language: t(`language.${state.language}`) }));
    });
    document.addEventListener("pulpulse:lang", () => {
      selectEl.value = state.language;
      updateLanguageOptionLabels(selectEl);
    });
  }

  function updateLanguageOptionLabels(selectEl) {
    const labels = { uz: t("language.uz"), en: t("language.en"), ru: t("language.ru") };
    Array.from(selectEl.options).forEach((opt) => {
      if (labels[opt.value]) opt.textContent = labels[opt.value];
    });
  }

  function formatCurrency(amount) {
    const locale = state.language === "ru" ? "ru-RU" : state.language === "en" ? "en-US" : "uz-UZ";
    return `${Math.round(amount).toLocaleString(locale)} ${t("common.currency")}`;
  }

  function sumBy(list) {
    return list.reduce((acc, item) => acc + Number(item.amount || 0), 0);
  }

  function todayIso() {
    return new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  }

  function shiftDate(dateStr, days) {
    const d = new Date(`${dateStr}T00:00:00`);
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }

  function showToast(message) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => el.classList.remove("show"), 2200);
  }

  window.PulPulse = {
    state,
    t,
    applyI18n,
    setLanguage,
    bindLanguageSelect,
    getCurrentUser,
    setCurrentUser,
    requireAuth,
    logout,
    getExpenses,
    addExpense,
    deleteExpense,
    clearCurrentUserData,
    getBudget,
    setBudget,
    getStats,
    getExpenseStreak,
    getVisitStreak,
    getChallenge,
    getInsight,
    formatCurrency,
    normalizeCategory,
    showToast,
    todayIso,
  };
})();
