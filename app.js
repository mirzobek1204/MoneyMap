const STORAGE_KEY = "daily_expenses_app_v3";
const LEGACY_STORAGE_KEY = "daily_expenses_app_v2";
const LEGACY_STORAGE_KEY_OLD = "daily_expenses_app_v1";
const CURRENT_USER_KEY = "daily_expenses_current_user";
const LANGUAGE_KEY = "daily_expenses_lang";

const CATEGORY_KEYS = ["food", "transport", "utilities", "health", "fun", "other"];

const CATEGORY_ALIASES = {
  food: "food",
  ovqat: "food",
  еда: "food",
  transport: "transport",
  транспорт: "transport",
  utilities: "utilities",
  kommunal: "utilities",
  коммунал: "utilities",
  health: "health",
  sogliq: "health",
  "sog'liq": "health",
  здоровье: "health",
  fun: "fun",
  kongilochar: "fun",
  "ko'ngilochar": "fun",
  развлечения: "fun",
  other: "other",
  boshqa: "other",
  другое: "other",
};

const I18N = {
  uz: {
    language: { label: "Til", uz: "Uzbek", en: "English", ru: "Русский" },
    hero: {
      title: "Kundalik Xarajatlarni Aqlli Tarzda Boshqaring",
      subtitle: "Xarajatlarni kiriting, progressni kuzating, challenge va streak orqali doimiy motivatsiyada qoling.",
    },
    common: { save: "Saqlash", select: "Tanlang", days: "kun", currency: "so'm" },
    auth: {
      title: "Foydalanuvchi",
      username: "Ism (username)",
      usernamePlaceholder: "masalan: ali",
      submit: "Kirish / Almashtirish",
      noUser: "Hali foydalanuvchi tanlanmagan.",
      currentUser: "Joriy foydalanuvchi: {name} ({count} ta xarajat).",
      chooseUserAlert: "Avval foydalanuvchini tanlang.",
    },
    motivation: {
      title: "Motivatsiya Markazi",
      budgetTitle: "Oylik Budget Maqsadi",
      budgetPlaceholder: "Masalan: 3000000",
      levelTitle: "Level va Streak",
      levelSuffix: "daraja",
      expenseStreak: "Xarajat streak",
      visitStreak: "Kirish streak",
      insightTitle: "Shaxsiy Insight",
      noChallengeUser: "Avval user tanlang. Challenge shu yerda chiqadi.",
      budgetUsed: "Sarflangan: {amount}",
      budgetLeft: "Qolgan: {amount}",
      budgetExceeded: "Limitdan oshdi: {amount}",
      budgetNotSet: "Budget belgilanmagan.",
      challenges: [
        "Bugungi challenge: 1 ta xarajatga aniq izoh yozing.",
        "Bugungi challenge: transportdan kamida 10 000 so'm tejang.",
        "Bugungi challenge: bugun bitta ortiqcha xaridni to'xtating.",
        "Bugungi challenge: har xarajatga kategoriya tanlang.",
        "Bugungi challenge: kechqurun hisobotni qayta ko'ring.",
      ],
    },
    expense: {
      title: "Xarajat Qo'shish",
      date: "Sana",
      amount: "Miqdor (so'm)",
      amountPlaceholder: "50000",
      category: "Kategoriya",
      note: "Izoh",
      notePlaceholder: "Qisqa izoh...",
      quickAmount: "Tez summa:",
      invalidAlert: "Sana, miqdor va kategoriya to'g'ri kiritilishi shart.",
      invalidBudgetAlert: "Budget qiymati to'g'ri bo'lishi kerak.",
    },
    category: {
      food: "Ovqat",
      transport: "Transport",
      utilities: "Kommunal",
      health: "Sog'liq",
      fun: "Ko'ngilochar",
      other: "Boshqa",
    },
    stats: { today: "Bugun", month: "Joriy Oy", all: "Umumiy" },
    filter: {
      title: "Filter",
      from: "Boshlanish sanasi",
      to: "Tugash sanasi",
      all: "Barchasi",
      apply: "Filter Qo'llash",
    },
    list: {
      title: "Ro'yxat",
      export: "JSON Yuklab Olish",
      import: "JSON Yuklash",
      clearUser: "Joriy user ma'lumotlarini tozalash",
      filteredTotal: "Filter natijasi: {amount}",
      empty: "Xarajatlar hozircha yo'q.",
      clearConfirm: "{name} uchun xarajatlar va budgetni tozalaysizmi?",
    },
    table: { date: "Sana", category: "Kategoriya", amount: "Miqdor", note: "Izoh", action: "Amal", delete: "O'chirish" },
    insight: {
      empty: "Bugun kamida bitta xarajat yozing, insightlar avtomatik chiqadi.",
      topCategory: "Eng katta kategoriya: {category} ({amount}).",
      trendBase: "Oxirgi 7 kun trendi hali shakllanmoqda.",
      trendUp: "Oxirgi 7 kun xarajati {percent}% oshgan.",
      trendDown: "Oxirgi 7 kun xarajati {percent}% kamaygan.",
      budgetOk: "Ajoyib, oylik budget ichidasiz.",
      budgetOver: "Diqqat, oylik budget limitidan oshib ketdingiz.",
      budgetUnset: "Budget belgilanmagan.",
      badgesHint: "Badge olish uchun faol davom eting.",
    },
    badges: {
      starter: "Start",
      tracker: "Tracker",
      master: "Master",
      expense3: "3 kunlik streak",
      expense7: "7 kunlik streak",
      visit5: "Doimiy kiruvchi",
      budgetKeeper: "Budget himoyachisi",
    },
    toast: {
      welcome: "Xush kelibsiz, {name}. {challenge}",
      saved: "Xarajat saqlandi. Hozirgi xarajat streak: {days} kun.",
      deleted: "Xarajat o'chirildi.",
      budgetSaved: "Oylik budget saqlandi.",
      userCleared: "Joriy user ma'lumotlari tozalandi.",
      imported: "JSON muvaffaqiyatli yuklandi.",
      languageChanged: "Til o'zgardi: {language}.",
    },
    import: {
      invalidFormat: "Format noto'g'ri. expenses massiv bo'lishi kerak.",
      errorPrefix: "Import xatolik",
    },
  },
  en: {
    language: { label: "Language", uz: "Uzbek", en: "English", ru: "Russian" },
    hero: {
      title: "Manage Daily Expenses Smarter",
      subtitle: "Track spending, monitor progress, and stay motivated with challenges and streaks.",
    },
    common: { save: "Save", select: "Select", days: "days", currency: "UZS" },
    auth: {
      title: "User",
      username: "Name (username)",
      usernamePlaceholder: "for example: ali",
      submit: "Login / Switch",
      noUser: "No user selected yet.",
      currentUser: "Current user: {name} ({count} expenses).",
      chooseUserAlert: "Please select a user first.",
    },
    motivation: {
      title: "Motivation Center",
      budgetTitle: "Monthly Budget Goal",
      budgetPlaceholder: "Example: 3000000",
      levelTitle: "Level and Streak",
      levelSuffix: "level",
      expenseStreak: "Expense streak",
      visitStreak: "Visit streak",
      insightTitle: "Personal Insight",
      noChallengeUser: "Select a user first. Challenge will appear here.",
      budgetUsed: "Spent: {amount}",
      budgetLeft: "Left: {amount}",
      budgetExceeded: "Exceeded by: {amount}",
      budgetNotSet: "Budget is not set.",
      challenges: [
        "Today challenge: add one expense with a clear note.",
        "Today challenge: save at least 10,000 in transport.",
        "Today challenge: avoid one unnecessary purchase today.",
        "Today challenge: always choose a category for each expense.",
        "Today challenge: review your report in the evening.",
      ],
    },
    expense: {
      title: "Add Expense",
      date: "Date",
      amount: "Amount",
      amountPlaceholder: "50000",
      category: "Category",
      note: "Note",
      notePlaceholder: "Short note...",
      quickAmount: "Quick amount:",
      invalidAlert: "Date, amount and category are required.",
      invalidBudgetAlert: "Budget value must be valid.",
    },
    category: { food: "Food", transport: "Transport", utilities: "Utilities", health: "Health", fun: "Entertainment", other: "Other" },
    stats: { today: "Today", month: "This Month", all: "Total" },
    filter: { title: "Filter", from: "Start date", to: "End date", all: "All", apply: "Apply Filter" },
    list: {
      title: "List",
      export: "Download JSON",
      import: "Upload JSON",
      clearUser: "Clear current user data",
      filteredTotal: "Filtered total: {amount}",
      empty: "No expenses yet.",
      clearConfirm: "Do you want to clear expenses and budget for {name}?",
    },
    table: { date: "Date", category: "Category", amount: "Amount", note: "Note", action: "Action", delete: "Delete" },
    insight: {
      empty: "Add at least one expense today to unlock insights.",
      topCategory: "Top category: {category} ({amount}).",
      trendBase: "7-day trend is still forming.",
      trendUp: "Last 7 days spending is up by {percent}%.",
      trendDown: "Last 7 days spending is down by {percent}%.",
      budgetOk: "Great, you are within your monthly budget.",
      budgetOver: "Attention, you are over your monthly budget.",
      budgetUnset: "Budget is not set.",
      badgesHint: "Stay active to unlock badges.",
    },
    badges: {
      starter: "Starter",
      tracker: "Tracker",
      master: "Master",
      expense3: "3-day streak",
      expense7: "7-day streak",
      visit5: "Regular visitor",
      budgetKeeper: "Budget keeper",
    },
    toast: {
      welcome: "Welcome, {name}. {challenge}",
      saved: "Expense saved. Current expense streak: {days} days.",
      deleted: "Expense deleted.",
      budgetSaved: "Monthly budget saved.",
      userCleared: "Current user data cleared.",
      imported: "JSON imported successfully.",
      languageChanged: "Language changed: {language}.",
    },
    import: { invalidFormat: "Invalid format. expenses must be an array.", errorPrefix: "Import error" },
  },
  ru: {
    language: { label: "Язык", uz: "Узбекский", en: "Английский", ru: "Русский" },
    hero: {
      title: "Управляйте Ежедневными Расходами Умнее",
      subtitle: "Добавляйте расходы, отслеживайте прогресс и сохраняйте мотивацию через челленджи и серии.",
    },
    common: { save: "Сохранить", select: "Выберите", days: "дней", currency: "сум" },
    auth: {
      title: "Пользователь",
      username: "Имя (username)",
      usernamePlaceholder: "например: ali",
      submit: "Войти / Сменить",
      noUser: "Пользователь пока не выбран.",
      currentUser: "Текущий пользователь: {name} ({count} расходов).",
      chooseUserAlert: "Сначала выберите пользователя.",
    },
    motivation: {
      title: "Центр Мотивации",
      budgetTitle: "Цель Месячного Бюджета",
      budgetPlaceholder: "Например: 3000000",
      levelTitle: "Уровень и Серия",
      levelSuffix: "уровень",
      expenseStreak: "Серия расходов",
      visitStreak: "Серия посещений",
      insightTitle: "Личный Инсайт",
      noChallengeUser: "Сначала выберите пользователя. Челлендж появится здесь.",
      budgetUsed: "Потрачено: {amount}",
      budgetLeft: "Осталось: {amount}",
      budgetExceeded: "Превышение: {amount}",
      budgetNotSet: "Бюджет не задан.",
      challenges: [
        "Челлендж дня: добавьте один расход с подробной заметкой.",
        "Челлендж дня: сэкономьте минимум 10 000 на транспорте.",
        "Челлендж дня: откажитесь от одной лишней покупки.",
        "Челлендж дня: всегда выбирайте категорию для расхода.",
        "Челлендж дня: вечером пересмотрите отчет.",
      ],
    },
    expense: {
      title: "Добавить Расход",
      date: "Дата",
      amount: "Сумма",
      amountPlaceholder: "50000",
      category: "Категория",
      note: "Заметка",
      notePlaceholder: "Короткая заметка...",
      quickAmount: "Быстрая сумма:",
      invalidAlert: "Дата, сумма и категория обязательны.",
      invalidBudgetAlert: "Введите корректный бюджет.",
    },
    category: { food: "Еда", transport: "Транспорт", utilities: "Коммунальные", health: "Здоровье", fun: "Развлечения", other: "Другое" },
    stats: { today: "Сегодня", month: "Этот Месяц", all: "Итого" },
    filter: { title: "Фильтр", from: "Дата начала", to: "Дата окончания", all: "Все", apply: "Применить Фильтр" },
    list: {
      title: "Список",
      export: "Скачать JSON",
      import: "Загрузить JSON",
      clearUser: "Очистить данные текущего пользователя",
      filteredTotal: "Итог по фильтру: {amount}",
      empty: "Расходов пока нет.",
      clearConfirm: "Очистить расходы и бюджет для пользователя {name}?",
    },
    table: { date: "Дата", category: "Категория", amount: "Сумма", note: "Заметка", action: "Действие", delete: "Удалить" },
    insight: {
      empty: "Добавьте хотя бы один расход сегодня, чтобы открыть инсайты.",
      topCategory: "Топ категория: {category} ({amount}).",
      trendBase: "Тренд за 7 дней пока формируется.",
      trendUp: "Расходы за 7 дней выросли на {percent}%.",
      trendDown: "Расходы за 7 дней снизились на {percent}%.",
      budgetOk: "Отлично, вы в пределах месячного бюджета.",
      budgetOver: "Внимание, вы превысили месячный бюджет.",
      budgetUnset: "Бюджет не задан.",
      badgesHint: "Будьте активнее, чтобы открыть бейджи.",
    },
    badges: {
      starter: "Старт",
      tracker: "Трекер",
      master: "Мастер",
      expense3: "Серия 3 дня",
      expense7: "Серия 7 дней",
      visit5: "Постоянный пользователь",
      budgetKeeper: "Хранитель бюджета",
    },
    toast: {
      welcome: "Добро пожаловать, {name}. {challenge}",
      saved: "Расход сохранен. Текущая серия расходов: {days}.",
      deleted: "Расход удален.",
      budgetSaved: "Месячный бюджет сохранен.",
      userCleared: "Данные текущего пользователя очищены.",
      imported: "JSON успешно загружен.",
      languageChanged: "Язык изменен: {language}.",
    },
    import: { invalidFormat: "Неверный формат. expenses должен быть массивом.", errorPrefix: "Ошибка импорта" },
  },
};

const state = {
  language: loadLanguage(),
  currentUser: "",
  data: loadData(),
  filters: { fromDate: "", toDate: "", category: "" },
};

const els = {
  languageSelect: document.getElementById("languageSelect"),
  loginForm: document.getElementById("loginForm"),
  usernameInput: document.getElementById("usernameInput"),
  currentUserText: document.getElementById("currentUserText"),
  expenseForm: document.getElementById("expenseForm"),
  dateInput: document.getElementById("dateInput"),
  amountInput: document.getElementById("amountInput"),
  categoryInput: document.getElementById("categoryInput"),
  noteInput: document.getElementById("noteInput"),
  filterForm: document.getElementById("filterForm"),
  fromDate: document.getElementById("fromDate"),
  toDate: document.getElementById("toDate"),
  filterCategory: document.getElementById("filterCategory"),
  expenseTableBody: document.getElementById("expenseTableBody"),
  rowTemplate: document.getElementById("rowTemplate"),
  emptyState: document.getElementById("emptyState"),
  todayTotal: document.getElementById("todayTotal"),
  monthTotal: document.getElementById("monthTotal"),
  allTotal: document.getElementById("allTotal"),
  filteredTotal: document.getElementById("filteredTotal"),
  exportBtn: document.getElementById("exportBtn"),
  importInput: document.getElementById("importInput"),
  clearUserBtn: document.getElementById("clearUserBtn"),
  monthlyBudgetInput: document.getElementById("monthlyBudgetInput"),
  saveBudgetBtn: document.getElementById("saveBudgetBtn"),
  budgetProgressBar: document.getElementById("budgetProgressBar"),
  budgetUsed: document.getElementById("budgetUsed"),
  budgetLeft: document.getElementById("budgetLeft"),
  levelValue: document.getElementById("levelValue"),
  xpValue: document.getElementById("xpValue"),
  expenseStreakValue: document.getElementById("expenseStreakValue"),
  visitStreakValue: document.getElementById("visitStreakValue"),
  insightText: document.getElementById("insightText"),
  challengeText: document.getElementById("challengeText"),
  badgesList: document.getElementById("badgesList"),
  toast: document.getElementById("toast"),
};

let toastTimer = null;

init();

function init() {
  els.dateInput.value = toDateOnly(new Date());

  const rememberedUser = localStorage.getItem(CURRENT_USER_KEY);
  if (rememberedUser) {
    state.currentUser = rememberedUser;
    ensureUserBucket(rememberedUser);
    registerVisit(rememberedUser);
  }

  bindEvents();
  applyLanguage();
}

function bindEvents() {
  els.languageSelect.addEventListener("change", onLanguageChange);
  els.loginForm.addEventListener("submit", onLoginSubmit);
  els.expenseForm.addEventListener("submit", onExpenseSubmit);
  els.expenseForm.addEventListener("click", onQuickAmountClick);
  els.filterForm.addEventListener("submit", onFilterSubmit);
  els.expenseTableBody.addEventListener("click", onTableClick);
  els.exportBtn.addEventListener("click", exportCurrentUserData);
  els.importInput.addEventListener("change", importCurrentUserData);
  els.clearUserBtn.addEventListener("click", clearCurrentUserData);
  els.saveBudgetBtn.addEventListener("click", saveMonthlyBudget);
}

function onLanguageChange(event) {
  state.language = event.target.value;
  localStorage.setItem(LANGUAGE_KEY, state.language);
  applyLanguage();
  showToast(t("toast.languageChanged", { language: t(`language.${state.language}`) }));
}

function onLoginSubmit(event) {
  event.preventDefault();
  const username = els.usernameInput.value.trim().toLowerCase();
  if (!username) return;

  state.currentUser = username;
  ensureUserBucket(username);
  registerVisit(username);
  localStorage.setItem(CURRENT_USER_KEY, username);
  els.usernameInput.value = "";

  renderAll();
  showToast(t("toast.welcome", { name: username, challenge: getDailyChallenge(username) }));
}

function onExpenseSubmit(event) {
  event.preventDefault();
  if (!state.currentUser) {
    alert(t("auth.chooseUserAlert"));
    return;
  }

  const date = els.dateInput.value;
  const amount = Number(els.amountInput.value);
  const category = normalizeCategory(els.categoryInput.value);
  const note = els.noteInput.value.trim();

  if (!date || !Number.isFinite(amount) || amount <= 0 || !CATEGORY_KEYS.includes(category)) {
    alert(t("expense.invalidAlert"));
    return;
  }

  state.data.users[state.currentUser].push({
    id: createId(),
    date,
    amount,
    category,
    note,
    createdAt: new Date().toISOString(),
  });

  saveData();
  els.amountInput.value = "";
  els.noteInput.value = "";
  renderAll();

  const streak = calcExpenseStreak(getCurrentUserExpenses());
  showToast(t("toast.saved", { days: String(streak) }));
}

function onQuickAmountClick(event) {
  const btn = event.target.closest("[data-quick-amount]");
  if (!btn) return;
  const amount = Number(btn.dataset.quickAmount);
  if (!Number.isFinite(amount)) return;
  els.amountInput.value = amount;
  els.amountInput.focus();
}

function onFilterSubmit(event) {
  event.preventDefault();
  state.filters = {
    fromDate: els.fromDate.value,
    toDate: els.toDate.value,
    category: normalizeCategory(els.filterCategory.value),
  };
  renderTable();
}

function onTableClick(event) {
  const btn = event.target.closest("button[data-action='delete']");
  if (!btn || !state.currentUser) return;

  const id = btn.dataset.id;
  const current = state.data.users[state.currentUser] || [];
  state.data.users[state.currentUser] = current.filter((item) => item.id !== id);
  saveData();
  renderAll();
  showToast(t("toast.deleted"));
}

function saveMonthlyBudget() {
  if (!state.currentUser) {
    alert(t("auth.chooseUserAlert"));
    return;
  }

  const value = Number(els.monthlyBudgetInput.value);
  if (!Number.isFinite(value) || value < 0) {
    alert(t("expense.invalidBudgetAlert"));
    return;
  }

  state.data.budgets[state.currentUser] = value;
  saveData();
  renderMotivation();
  showToast(t("toast.budgetSaved"));
}

function clearCurrentUserData() {
  if (!state.currentUser) {
    alert(t("auth.chooseUserAlert"));
    return;
  }

  if (!confirm(t("list.clearConfirm", { name: state.currentUser }))) return;
  state.data.users[state.currentUser] = [];
  state.data.budgets[state.currentUser] = 0;
  saveData();
  renderAll();
  showToast(t("toast.userCleared"));
}

function exportCurrentUserData() {
  if (!state.currentUser) {
    alert(t("auth.chooseUserAlert"));
    return;
  }

  const payload = {
    version: 3,
    username: state.currentUser,
    exportedAt: new Date().toISOString(),
    budget: Number(state.data.budgets[state.currentUser] || 0),
    expenses: state.data.users[state.currentUser] || [],
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${state.currentUser}-pulpulse-data.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importCurrentUserData(event) {
  if (!state.currentUser) {
    alert(t("auth.chooseUserAlert"));
    event.target.value = "";
    return;
  }

  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || "{}"));
      if (!Array.isArray(parsed.expenses)) throw new Error(t("import.invalidFormat"));

      const imported = parsed.expenses.map(normalizeExpense).filter(Boolean);
      const current = state.data.users[state.currentUser] || [];
      const existingIds = new Set(current.map((item) => item.id));
      const merged = [...current];

      for (const item of imported) {
        if (existingIds.has(item.id)) item.id = createId();
        merged.push(item);
        existingIds.add(item.id);
      }

      state.data.users[state.currentUser] = merged;
      if (Number.isFinite(Number(parsed.budget)) && Number(parsed.budget) >= 0) {
        state.data.budgets[state.currentUser] = Number(parsed.budget);
      }

      saveData();
      renderAll();
      showToast(t("toast.imported"));
    } catch (err) {
      alert(`${t("import.errorPrefix")}: ${err.message}`);
    } finally {
      event.target.value = "";
    }
  };

  reader.readAsText(file);
}

function applyLanguage() {
  document.documentElement.lang = state.language;
  els.languageSelect.value = state.language;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  });

  renderAll();
}

function renderAll() {
  renderCurrentUser();
  renderStats();
  renderMotivation();
  renderTable();
}

function renderCurrentUser() {
  if (!state.currentUser) {
    els.currentUserText.textContent = t("auth.noUser");
    return;
  }
  const count = (state.data.users[state.currentUser] || []).length;
  els.currentUserText.textContent = t("auth.currentUser", { name: state.currentUser, count: String(count) });
}

function renderStats() {
  const list = getCurrentUserExpenses();
  const today = toDateOnly(new Date());
  const monthPrefix = today.slice(0, 7);
  els.todayTotal.textContent = toCurrency(sumBy(list.filter((x) => x.date === today)));
  els.monthTotal.textContent = toCurrency(sumBy(list.filter((x) => x.date.startsWith(monthPrefix))));
  els.allTotal.textContent = toCurrency(sumBy(list));
}

function renderMotivation() {
  if (!state.currentUser) {
    els.challengeText.textContent = t("motivation.noChallengeUser");
    els.budgetProgressBar.style.width = "0%";
    els.budgetUsed.textContent = t("motivation.budgetUsed", { amount: toCurrency(0) });
    els.budgetLeft.textContent = t("motivation.budgetLeft", { amount: toCurrency(0) });
    els.levelValue.textContent = "1";
    els.xpValue.textContent = "0";
    els.expenseStreakValue.textContent = "0";
    els.visitStreakValue.textContent = "0";
    els.insightText.textContent = t("insight.empty");
    els.badgesList.innerHTML = "";
    return;
  }

  const list = getCurrentUserExpenses();
  const today = toDateOnly(new Date());
  const monthPrefix = today.slice(0, 7);
  const monthSpent = sumBy(list.filter((x) => x.date.startsWith(monthPrefix)));
  const budget = Number(state.data.budgets[state.currentUser] || 0);

  els.monthlyBudgetInput.value = budget > 0 ? String(budget) : "";
  const progressPercent = budget > 0 ? (monthSpent / budget) * 100 : 0;
  els.budgetProgressBar.style.width = `${Math.min(Math.max(progressPercent, 0), 100)}%`;
  els.budgetProgressBar.style.background = progressPercent > 100
    ? "linear-gradient(90deg, #ef4444, #dc2626)"
    : progressPercent > 85
      ? "linear-gradient(90deg, #f59e0b, #ea580c)"
      : "linear-gradient(90deg, #22c55e, #16a34a)";

  els.budgetUsed.textContent = t("motivation.budgetUsed", { amount: toCurrency(monthSpent) });
  if (budget > 0) {
    const left = budget - monthSpent;
    els.budgetLeft.textContent = left >= 0
      ? t("motivation.budgetLeft", { amount: toCurrency(left) })
      : t("motivation.budgetExceeded", { amount: toCurrency(Math.abs(left)) });
  } else {
    els.budgetLeft.textContent = t("motivation.budgetNotSet");
  }

  const expenseStreak = calcExpenseStreak(list);
  const visitStreak = Number(state.data.visits[state.currentUser]?.streak || 1);
  const xp = list.length * 5 + expenseStreak * 15 + visitStreak * 12 + (budget > 0 && monthSpent <= budget ? 30 : 0);
  const level = 1 + Math.floor(xp / 120);

  els.levelValue.textContent = String(level);
  els.xpValue.textContent = String(xp);
  els.expenseStreakValue.textContent = String(expenseStreak);
  els.visitStreakValue.textContent = String(visitStreak);
  els.challengeText.textContent = getDailyChallenge(state.currentUser);
  els.insightText.textContent = buildInsight(list, budget, monthSpent);

  const badges = buildBadges({ expenseCount: list.length, expenseStreak, visitStreak, budget, monthSpent });
  if (!badges.length) {
    els.badgesList.innerHTML = `<span class="muted">${t("insight.badgesHint")}</span>`;
  } else {
    els.badgesList.innerHTML = badges.map((key) => `<span class="badge-chip">${t(`badges.${key}`)}</span>`).join("");
  }
}

function renderTable() {
  const list = applyFilters(getCurrentUserExpenses());
  els.expenseTableBody.innerHTML = "";
  els.emptyState.style.display = list.length ? "none" : "block";
  els.emptyState.textContent = t("list.empty");
  els.filteredTotal.textContent = t("list.filteredTotal", { amount: toCurrency(sumBy(list)) });

  const sorted = [...list].sort((a, b) => {
    if (a.date === b.date) return b.createdAt.localeCompare(a.createdAt);
    return b.date.localeCompare(a.date);
  });

  for (const expense of sorted) {
    const row = els.rowTemplate.content.firstElementChild.cloneNode(true);
    row.querySelector("[data-col='date']").textContent = expense.date;
    row.querySelector("[data-col='category']").textContent = t(`category.${expense.category}`);
    row.querySelector("[data-col='amount']").textContent = toCurrency(expense.amount);
    row.querySelector("[data-col='note']").textContent = expense.note || "-";
    const deleteBtn = row.querySelector("[data-action='delete']");
    deleteBtn.dataset.id = expense.id;
    deleteBtn.textContent = t("table.delete");
    els.expenseTableBody.appendChild(row);
  }
}

function applyFilters(list) {
  return list.filter((item) => {
    if (state.filters.fromDate && item.date < state.filters.fromDate) return false;
    if (state.filters.toDate && item.date > state.filters.toDate) return false;
    if (state.filters.category && item.category !== state.filters.category) return false;
    return true;
  });
}

function getCurrentUserExpenses() {
  if (!state.currentUser) return [];
  ensureUserBucket(state.currentUser);
  return state.data.users[state.currentUser];
}

function ensureUserBucket(username) {
  let changed = false;
  if (!Array.isArray(state.data.users[username])) {
    state.data.users[username] = [];
    changed = true;
  }
  if (!Number.isFinite(Number(state.data.budgets[username]))) {
    state.data.budgets[username] = 0;
    changed = true;
  }
  if (!state.data.visits[username] || typeof state.data.visits[username] !== "object") {
    state.data.visits[username] = { streak: 0, lastDate: "" };
    changed = true;
  }
  if (changed) saveData();
}

function registerVisit(username) {
  ensureUserBucket(username);
  const today = toDateOnly(new Date());
  const visit = state.data.visits[username];
  if (visit.lastDate === today) return;
  const yesterday = shiftDate(today, -1);
  visit.streak = visit.lastDate === yesterday ? Number(visit.streak || 0) + 1 : 1;
  visit.lastDate = today;
  saveData();
}

function calcExpenseStreak(list) {
  if (!list.length) return 0;
  const days = new Set(list.map((item) => item.date));
  let cursor = toDateOnly(new Date());
  if (!days.has(cursor)) cursor = shiftDate(cursor, -1);
  let streak = 0;
  while (days.has(cursor)) {
    streak += 1;
    cursor = shiftDate(cursor, -1);
  }
  return streak;
}

function buildInsight(list, budget, monthSpent) {
  if (!list.length) return t("insight.empty");

  const totals = {};
  for (const item of list) {
    const key = normalizeCategory(item.category);
    totals[key] = (totals[key] || 0) + Number(item.amount || 0);
  }
  const [topCategory, topAmount] = Object.entries(totals).sort((a, b) => b[1] - a[1])[0];

  const today = toDateOnly(new Date());
  const last7Start = shiftDate(today, -6);
  const prev7Start = shiftDate(today, -13);
  const prev7End = shiftDate(today, -7);
  const last7 = sumBy(list.filter((x) => x.date >= last7Start && x.date <= today));
  const prev7 = sumBy(list.filter((x) => x.date >= prev7Start && x.date <= prev7End));

  let trendText = t("insight.trendBase");
  if (prev7 > 0) {
    const diff = ((last7 - prev7) / prev7) * 100;
    if (diff > 8) trendText = t("insight.trendUp", { percent: String(Math.round(diff)) });
    if (diff < -8) trendText = t("insight.trendDown", { percent: String(Math.round(Math.abs(diff))) });
  }

  let budgetText = t("insight.budgetUnset");
  if (budget > 0 && monthSpent <= budget) budgetText = t("insight.budgetOk");
  if (budget > 0 && monthSpent > budget) budgetText = t("insight.budgetOver");

  return `${t("insight.topCategory", {
    category: t(`category.${topCategory}`),
    amount: toCurrency(topAmount),
  })} ${trendText} ${budgetText}`;
}

function buildBadges(params) {
  const badges = [];
  if (params.expenseCount >= 1) badges.push("starter");
  if (params.expenseCount >= 15) badges.push("tracker");
  if (params.expenseCount >= 50) badges.push("master");
  if (params.expenseStreak >= 3) badges.push("expense3");
  if (params.expenseStreak >= 7) badges.push("expense7");
  if (params.visitStreak >= 5) badges.push("visit5");
  if (params.budget > 0 && params.monthSpent <= params.budget) badges.push("budgetKeeper");
  return badges;
}

function getDailyChallenge(username) {
  const challenges = getI18nValue("motivation.challenges");
  if (!Array.isArray(challenges) || !challenges.length) return "";
  const key = `${username}-${toDateOnly(new Date())}`;
  const hash = [...key].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return challenges[hash % challenges.length];
}

function normalizeCategory(value) {
  if (!value) return "";
  if (CATEGORY_KEYS.includes(value)) return value;

  const low = String(value).trim().toLowerCase();
  if (CATEGORY_ALIASES[low]) return CATEGORY_ALIASES[low];
  const simplified = low.replace(/[\s'`’_-]/g, "");
  if (CATEGORY_ALIASES[simplified]) return CATEGORY_ALIASES[simplified];
  return "other";
}

function normalizeExpense(item) {
  if (!item || typeof item !== "object") return null;
  const date = typeof item.date === "string" ? item.date : "";
  const amount = Number(item.amount);
  if (!date || !Number.isFinite(amount) || amount <= 0) return null;
  return {
    id: typeof item.id === "string" && item.id ? item.id : createId(),
    date,
    amount,
    category: normalizeCategory(item.category || "other") || "other",
    note: typeof item.note === "string" ? item.note : "",
    createdAt: typeof item.createdAt === "string" && item.createdAt ? item.createdAt : new Date().toISOString(),
  };
}

function loadData() {
  const fallback = { users: {}, budgets: {}, visits: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return normalizeData(JSON.parse(raw));

    const legacyV2Raw = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacyV2Raw) {
      const migrated = normalizeData(JSON.parse(legacyV2Raw));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }

    const legacyV1Raw = localStorage.getItem(LEGACY_STORAGE_KEY_OLD);
    if (legacyV1Raw) {
      const migrated = migrateLegacyV1(JSON.parse(legacyV1Raw));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }

    return fallback;
  } catch {
    return fallback;
  }
}

function migrateLegacyV1(legacy) {
  const migrated = { users: {}, budgets: {}, visits: {} };
  if (!legacy || typeof legacy !== "object") return migrated;
  if (!legacy.users || typeof legacy.users !== "object") return migrated;

  for (const [username, list] of Object.entries(legacy.users)) {
    if (Array.isArray(list)) {
      migrated.users[username] = list.map(normalizeExpense).filter(Boolean);
    }
  }
  return migrated;
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
      const num = Number(value);
      normalized.budgets[username] = Number.isFinite(num) && num >= 0 ? num : 0;
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

function loadLanguage() {
  const saved = localStorage.getItem(LANGUAGE_KEY);
  if (saved && I18N[saved]) return saved;
  const browser = (navigator.language || "uz").toLowerCase();
  if (browser.startsWith("ru")) return "ru";
  if (browser.startsWith("en")) return "en";
  return "uz";
}

function getI18nValue(path) {
  const steps = path.split(".");
  let value = I18N[state.language];
  for (const step of steps) {
    if (value && Object.prototype.hasOwnProperty.call(value, step)) {
      value = value[step];
    } else {
      value = undefined;
      break;
    }
  }
  if (value !== undefined) return value;

  value = I18N.uz;
  for (const step of steps) {
    if (value && Object.prototype.hasOwnProperty.call(value, step)) {
      value = value[step];
    } else {
      return path;
    }
  }
  return value;
}

function t(path, params = {}) {
  const raw = getI18nValue(path);
  if (typeof raw !== "string") return path;
  return raw.replace(/\{(\w+)\}/g, (_, key) => (Object.prototype.hasOwnProperty.call(params, key) ? params[key] : `{${key}}`));
}

function sumBy(list) {
  return list.reduce((acc, item) => acc + Number(item.amount || 0), 0);
}

function toCurrency(value) {
  const localeMap = { uz: "uz-UZ", en: "en-US", ru: "ru-RU" };
  const locale = localeMap[state.language] || "uz-UZ";
  return `${Math.round(value).toLocaleString(locale)} ${t("common.currency")}`;
}

function toDateOnly(date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function shiftDate(dateStr, days) {
  const date = new Date(`${dateStr}T00:00:00`);
  date.setDate(date.getDate() + days);
  return toDateOnly(date);
}

function createId() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2600);
}
