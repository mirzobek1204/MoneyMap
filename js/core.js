(() => {
  const STORAGE_KEY = "pulpulse_data_v4";
  const LEGACY_KEYS = ["daily_expenses_app_v3", "daily_expenses_app_v2", "daily_expenses_app_v1"];
  const CURRENT_USER_KEY = "daily_expenses_current_user";
  const LANGUAGE_KEY = "daily_expenses_lang";

  const CATEGORIES = ["food", "transport", "utilities", "health", "fun", "other"];
  const CATEGORY_ALIASES = {
    ovqat: "food",
    РµРґР°: "food",
    food: "food",
    transport: "transport",
    С‚СЂР°РЅСЃРїРѕСЂС‚: "transport",
    kommunal: "utilities",
    РєРѕРјРјСѓРЅР°Р»: "utilities",
    utilities: "utilities",
    "sogliq": "health",
    "sog'liq": "health",
    Р·РґРѕСЂРѕРІСЊРµ: "health",
    health: "health",
    "kongilochar": "fun",
    "ko'ngilochar": "fun",
    СЂР°Р·РІР»РµС‡РµРЅРёСЏ: "fun",
    fun: "fun",
    boshqa: "other",
    РґСЂСѓРіРѕРµ: "other",
    other: "other",
  };

  const I18N = {
    uz: {
      language: { label: "Til", uz: "Uzbek", en: "English", ru: "Р СѓСЃСЃРєРёР№" },
      nav: { dashboard: "Dashboard", expenses: "Xarajatlar", logout: "Chiqish" },
      login: {
        title: "Xarajatlarni boshqarish endi oson",
        subtitle: "Ismingizni kiriting va darhol ishlatishni boshlang.",
        inputLabel: "Ism",
        placeholder: "Ismingiz",
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
        streak: "Faol kunlar: xarajat {expense} kun, kirish {visit} kun",
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
        placeholder: "Your name",
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
        streak: "Active days: expenses {expense}, visits {visit}",
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
      language: { label: "РЇР·С‹Рє", uz: "РЈР·Р±РµРєСЃРєРёР№", en: "РђРЅРіР»РёР№СЃРєРёР№", ru: "Р СѓСЃСЃРєРёР№" },
      nav: { dashboard: "Р”Р°С€Р±РѕСЂРґ", expenses: "Р Р°СЃС…РѕРґС‹", logout: "Р’С‹Р№С‚Рё" },
      login: {
        title: "РЈС‡РµС‚ СЂР°СЃС…РѕРґРѕРІ СЃС‚Р°Р» РїСЂРѕС‰Рµ",
        subtitle: "Р’РІРµРґРёС‚Рµ РёРјСЏ Рё СЃСЂР°Р·Сѓ РЅР°С‡РЅРёС‚Рµ РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ СЃР°Р№С‚.",
        inputLabel: "РРјСЏ",
        placeholder: "Username",
        submit: "Р’РѕР№С‚Рё",
        continue: "РџСЂРѕРґРѕР»Р¶РёС‚СЊ РєР°Рє {name}",
      },
      dashboard: {
        title: "РћР±С‰РёР№ РћР±Р·РѕСЂ",
        welcome: "Р”РѕР±СЂРѕ РїРѕР¶Р°Р»РѕРІР°С‚СЊ, {name}",
        progress: "РџСЂРѕРіСЂРµСЃСЃ",
        recent: "РџРѕСЃР»РµРґРЅРёРµ Р Р°СЃС…РѕРґС‹",
        allExpenses: "РЎРјРѕС‚СЂРµС‚СЊ РІСЃРµ",
        challengePrefix: "Р§РµР»Р»РµРЅРґР¶ РґРЅСЏ:",
        streak: "РЎРµСЂРёСЏ СЂР°СЃС…РѕРґРѕРІ: {expense} РґРЅРµР№, РЎРµСЂРёСЏ РІС…РѕРґРѕРІ: {visit} РґРЅРµР№",
      },
      stats: { today: "РЎРµРіРѕРґРЅСЏ", month: "Р­С‚РѕС‚ РјРµСЃСЏС†", total: "РС‚РѕРіРѕ" },
      expense: {
        title: "РќРѕРІС‹Р№ Р Р°СЃС…РѕРґ",
        date: "Р”Р°С‚Р°",
        amount: "РЎСѓРјРјР°",
        amountPlaceholder: "50000",
        category: "РљР°С‚РµРіРѕСЂРёСЏ",
        note: "Р—Р°РјРµС‚РєР°",
        notePlaceholder: "РљРѕСЂРѕС‚РєР°СЏ Р·Р°РјРµС‚РєР°",
        quick: "Р‘С‹СЃС‚СЂР°СЏ СЃСѓРјРјР°",
        invalid: "Р”Р°С‚Р°, СЃСѓРјРјР° Рё РєР°С‚РµРіРѕСЂРёСЏ РѕР±СЏР·Р°С‚РµР»СЊРЅС‹.",
      },
      budget: {
        monthly: "РњРµСЃСЏС‡РЅС‹Р№ Р±СЋРґР¶РµС‚",
        placeholder: "3000000",
        used: "РџРѕС‚СЂР°С‡РµРЅРѕ: {amount}",
        left: "РћСЃС‚Р°Р»РѕСЃСЊ: {amount}",
        over: "РџСЂРµРІС‹С€РµРЅРёРµ: {amount}",
        unset: "Р‘СЋРґР¶РµС‚ РЅРµ Р·Р°РґР°РЅ.",
        invalid: "РќРµРєРѕСЂСЂРµРєС‚РЅРѕРµ Р·РЅР°С‡РµРЅРёРµ Р±СЋРґР¶РµС‚Р°.",
      },
      filter: { title: "Р¤РёР»СЊС‚СЂ", from: "Р”Р°С‚Р° РЅР°С‡Р°Р»Р°", to: "Р”Р°С‚Р° РѕРєРѕРЅС‡Р°РЅРёСЏ", all: "Р’СЃРµ", apply: "РџСЂРёРјРµРЅРёС‚СЊ" },
      expenses: { title: "РЎРїРёСЃРѕРє Р Р°СЃС…РѕРґРѕРІ", filtered: "РС‚РѕРі РїРѕ С„РёР»СЊС‚СЂСѓ: {amount}", empty: "РџРѕРєР° РЅРµС‚ СЂР°СЃС…РѕРґРѕРІ." },
      table: { date: "Р”Р°С‚Р°", category: "РљР°С‚РµРіРѕСЂРёСЏ", amount: "РЎСѓРјРјР°", note: "Р—Р°РјРµС‚РєР°", action: "Р”РµР№СЃС‚РІРёРµ", delete: "РЈРґР°Р»РёС‚СЊ" },
      category: {
        food: "Р•РґР°",
        transport: "РўСЂР°РЅСЃРїРѕСЂС‚",
        utilities: "РљРѕРјРјСѓРЅР°Р»СЊРЅС‹Рµ",
        health: "Р—РґРѕСЂРѕРІСЊРµ",
        fun: "Р Р°Р·РІР»РµС‡РµРЅРёСЏ",
        other: "Р”СЂСѓРіРѕРµ",
      },
      common: { select: "Р’С‹Р±РµСЂРёС‚Рµ", save: "РЎРѕС…СЂР°РЅРёС‚СЊ", currency: "СЃСѓРј" },
      danger: {
        title: "РЈРїСЂР°РІР»РµРЅРёРµ Р”Р°РЅРЅС‹РјРё",
        text: "Р‘СѓРґСѓС‚ РѕС‡РёС‰РµРЅС‹ С‚РѕР»СЊРєРѕ РґР°РЅРЅС‹Рµ С‚РµРєСѓС‰РµРіРѕ РїСЂРѕС„РёР»СЏ.",
        clear: "РћС‡РёСЃС‚РёС‚СЊ С‚РµРєСѓС‰РёР№ РїСЂРѕС„РёР»СЊ",
        confirm: "РћС‡РёСЃС‚РёС‚СЊ РґР°РЅРЅС‹Рµ С‚РµРєСѓС‰РµРіРѕ РїСЂРѕС„РёР»СЏ?",
      },
      insight: {
        empty: "Р”РѕР±Р°РІСЊС‚Рµ С…РѕС‚СЏ Р±С‹ РѕРґРёРЅ СЂР°СЃС…РѕРґ РґР»СЏ РёРЅСЃР°Р№С‚РѕРІ.",
        top: "РўРѕРї РєР°С‚РµРіРѕСЂРёСЏ: {category} ({amount}).",
        trendBase: "РўСЂРµРЅРґ Р·Р° 7 РґРЅРµР№ РїРѕРєР° С„РѕСЂРјРёСЂСѓРµС‚СЃСЏ.",
        trendUp: "Р Р°СЃС…РѕРґС‹ Р·Р° РїРѕСЃР»РµРґРЅРёРµ 7 РґРЅРµР№ РІС‹СЂРѕСЃР»Рё РЅР° {percent}%.",
        trendDown: "Р Р°СЃС…РѕРґС‹ Р·Р° РїРѕСЃР»РµРґРЅРёРµ 7 РґРЅРµР№ СЃРЅРёР·РёР»РёСЃСЊ РЅР° {percent}%.",
        budgetOk: "Р’С‹ РІ СЂР°РјРєР°С… Р±СЋРґР¶РµС‚Р°.",
        budgetOver: "Р’С‹ РїСЂРµРІС‹СЃРёР»Рё Р±СЋРґР¶РµС‚.",
        budgetUnset: "Р‘СЋРґР¶РµС‚ РЅРµ Р·Р°РґР°РЅ.",
      },
      toast: {
        language: "РЇР·С‹Рє РёР·РјРµРЅРµРЅ: {language}",
        saved: "Р Р°СЃС…РѕРґ СЃРѕС…СЂР°РЅРµРЅ.",
        deleted: "Р Р°СЃС…РѕРґ СѓРґР°Р»РµРЅ.",
        budgetSaved: "Р‘СЋРґР¶РµС‚ СЃРѕС…СЂР°РЅРµРЅ.",
        cleared: "Р”Р°РЅРЅС‹Рµ РѕС‡РёС‰РµРЅС‹.",
        loginRequired: "РЎРЅР°С‡Р°Р»Р° РІРѕР№РґРёС‚Рµ.",
      },
      challenge: [
        "Р”РѕР±Р°РІСЊС‚Рµ РѕРґРёРЅ СЂР°СЃС…РѕРґ СЃ РїРѕРЅСЏС‚РЅРѕР№ Р·Р°РјРµС‚РєРѕР№.",
        "РЎСЌРєРѕРЅРѕРјСЊС‚Рµ РјРёРЅРёРјСѓРј 10 000 РЅР° С‚СЂР°РЅСЃРїРѕСЂС‚Рµ.",
        "РћС‚РєР°Р¶РёС‚РµСЃСЊ РѕС‚ РѕРґРЅРѕР№ Р»РёС€РЅРµР№ РїРѕРєСѓРїРєРё СЃРµРіРѕРґРЅСЏ.",
        "Р’СЃРµРіРґР° РІС‹Р±РёСЂР°Р№С‚Рµ РєР°С‚РµРіРѕСЂРёСЋ РґР»СЏ СЂР°СЃС…РѕРґР°.",
        "РџСЂРѕРІРµСЂСЊС‚Рµ РѕС‚С‡РµС‚ 2 РјРёРЅСѓС‚С‹ РІРµС‡РµСЂРѕРј.",
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
    const clean = low.replace(/[^a-zа-я0-9]/gi, "");
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

