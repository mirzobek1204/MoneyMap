const STORAGE_KEY = "daily_expenses_app_v2";
const LEGACY_STORAGE_KEY = "daily_expenses_app_v1";
const CURRENT_USER_KEY = "daily_expenses_current_user";

const state = {
  currentUser: "",
  data: loadData(),
  filters: {
    fromDate: "",
    toDate: "",
    category: "",
  },
};

const els = {
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
  renderAll();
}

function bindEvents() {
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
  showToast(`Xush kelibsiz, ${username}. ${getDailyChallenge(username)}`);
}

function onExpenseSubmit(event) {
  event.preventDefault();
  if (!state.currentUser) {
    alert("Avval foydalanuvchini tanlang.");
    return;
  }

  const date = els.dateInput.value;
  const amount = Number(els.amountInput.value);
  const category = els.categoryInput.value;
  const note = els.noteInput.value.trim();

  if (!date || !Number.isFinite(amount) || amount <= 0 || !category) {
    alert("Sana, miqdor va kategoriya togri kiritilishi shart.");
    return;
  }

  const expense = {
    id: createId(),
    date,
    amount,
    category,
    note,
    createdAt: new Date().toISOString(),
  };

  state.data.users[state.currentUser].push(expense);
  saveData();

  els.amountInput.value = "";
  els.noteInput.value = "";
  renderAll();

  const streak = calcExpenseStreak(getCurrentUserExpenses());
  showToast(`Xarajat saqlandi. Hozirgi expense streak: ${streak} kun.`);
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
    category: els.filterCategory.value,
  };
  renderTable();
}

function onTableClick(event) {
  const btn = event.target.closest("button[data-action='delete']");
  if (!btn || !state.currentUser) return;

  const id = btn.dataset.id;
  const list = state.data.users[state.currentUser] || [];
  state.data.users[state.currentUser] = list.filter((item) => item.id !== id);
  saveData();
  renderAll();
  showToast("Xarajat ochirildi.");
}

function saveMonthlyBudget() {
  if (!state.currentUser) {
    alert("Avval foydalanuvchini tanlang.");
    return;
  }

  const value = Number(els.monthlyBudgetInput.value);
  if (!Number.isFinite(value) || value < 0) {
    alert("Budget qiymati togri bo'lishi kerak.");
    return;
  }

  state.data.budgets[state.currentUser] = value;
  saveData();
  renderMotivation();
  showToast("Oylik budget saqlandi.");
}

function clearCurrentUserData() {
  if (!state.currentUser) {
    alert("Avval foydalanuvchini tanlang.");
    return;
  }

  const ok = confirm(`${state.currentUser} uchun xarajatlar va budgetni tozalaysizmi?`);
  if (!ok) return;

  state.data.users[state.currentUser] = [];
  state.data.budgets[state.currentUser] = 0;
  saveData();
  renderAll();
  showToast("Joriy user malumotlari tozalandi.");
}

function exportCurrentUserData() {
  if (!state.currentUser) {
    alert("Avval foydalanuvchini tanlang.");
    return;
  }

  const payload = {
    version: 2,
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
    alert("Avval foydalanuvchini tanlang.");
    event.target.value = "";
    return;
  }

  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || "{}"));
      if (!Array.isArray(parsed.expenses)) {
        throw new Error("Format notogri. expenses array bolishi kerak.");
      }

      const normalized = parsed.expenses
        .map((item) => ({
          id: item.id || createId(),
          date: item.date || "",
          amount: Number(item.amount),
          category: item.category || "Boshqa",
          note: item.note || "",
          createdAt: item.createdAt || new Date().toISOString(),
        }))
        .filter((item) => item.date && Number.isFinite(item.amount) && item.amount > 0);

      const current = state.data.users[state.currentUser] || [];
      const existingIds = new Set(current.map((item) => item.id));
      const merged = [...current];

      for (const item of normalized) {
        if (existingIds.has(item.id)) {
          item.id = createId();
        }
        merged.push(item);
        existingIds.add(item.id);
      }

      state.data.users[state.currentUser] = merged;

      if (Number.isFinite(Number(parsed.budget)) && Number(parsed.budget) >= 0) {
        state.data.budgets[state.currentUser] = Number(parsed.budget);
      }

      saveData();
      renderAll();
      showToast("JSON muvaffaqiyatli yuklandi.");
    } catch (err) {
      alert(`Import xatolik: ${err.message}`);
    } finally {
      event.target.value = "";
    }
  };

  reader.readAsText(file);
}

function renderAll() {
  renderCurrentUser();
  renderStats();
  renderMotivation();
  renderTable();
}

function renderCurrentUser() {
  if (!state.currentUser) {
    els.currentUserText.textContent = "Hali foydalanuvchi tanlanmagan.";
    return;
  }

  const count = (state.data.users[state.currentUser] || []).length;
  els.currentUserText.textContent = `Joriy foydalanuvchi: ${state.currentUser} (${count} ta xarajat).`;
}

function renderStats() {
  const list = getCurrentUserExpenses();
  const today = toDateOnly(new Date());
  const monthPrefix = today.slice(0, 7);

  const todaySum = sumBy(list.filter((x) => x.date === today));
  const monthSum = sumBy(list.filter((x) => x.date.startsWith(monthPrefix)));
  const allSum = sumBy(list);

  els.todayTotal.textContent = toCurrency(todaySum);
  els.monthTotal.textContent = toCurrency(monthSum);
  els.allTotal.textContent = toCurrency(allSum);
}

function renderMotivation() {
  if (!state.currentUser) {
    els.challengeText.textContent = "Avval user tanlang. Shunda challenge paydo boladi.";
    els.budgetProgressBar.style.width = "0%";
    els.budgetUsed.textContent = "Sarflangan: 0 so'm";
    els.budgetLeft.textContent = "Qolgan: 0 so'm";
    els.levelValue.textContent = "1";
    els.xpValue.textContent = "0";
    els.expenseStreakValue.textContent = "0";
    els.visitStreakValue.textContent = "0";
    els.insightText.textContent = "Hali malumot yo'q.";
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

  els.budgetUsed.textContent = `Sarflangan: ${toCurrency(monthSpent)}`;
  if (budget > 0) {
    const left = budget - monthSpent;
    els.budgetLeft.textContent = left >= 0
      ? `Qolgan: ${toCurrency(left)}`
      : `Limitdan oshdi: ${toCurrency(Math.abs(left))}`;
  } else {
    els.budgetLeft.textContent = "Budget belgilanmagan.";
  }

  const expenseStreak = calcExpenseStreak(list);
  const visitStreak = state.data.visits[state.currentUser]?.streak || 1;

  const xp = list.length * 5 + expenseStreak * 15 + visitStreak * 12 + (budget > 0 && monthSpent <= budget ? 30 : 0);
  const level = 1 + Math.floor(xp / 120);

  els.levelValue.textContent = String(level);
  els.xpValue.textContent = String(xp);
  els.expenseStreakValue.textContent = String(expenseStreak);
  els.visitStreakValue.textContent = String(visitStreak);

  els.challengeText.textContent = getDailyChallenge(state.currentUser);
  els.insightText.textContent = buildInsight(list, budget, monthSpent);

  const badges = buildBadges({
    expenseCount: list.length,
    expenseStreak,
    visitStreak,
    budget,
    monthSpent,
  });

  if (!badges.length) {
    els.badgesList.innerHTML = "<span class='muted'>Badge olish uchun faol davom eting.</span>";
  } else {
    els.badgesList.innerHTML = badges.map((name) => `<span class="badge-chip">${name}</span>`).join("");
  }
}

function renderTable() {
  const list = applyFilters(getCurrentUserExpenses());
  els.expenseTableBody.innerHTML = "";
  els.emptyState.style.display = list.length ? "none" : "block";
  els.filteredTotal.textContent = `Filter natijasi: ${toCurrency(sumBy(list))}`;

  const sorted = [...list].sort((a, b) => {
    if (a.date === b.date) {
      return b.createdAt.localeCompare(a.createdAt);
    }
    return b.date.localeCompare(a.date);
  });

  for (const expense of sorted) {
    const row = els.rowTemplate.content.firstElementChild.cloneNode(true);
    row.querySelector("[data-col='date']").textContent = expense.date;
    row.querySelector("[data-col='category']").textContent = expense.category;
    row.querySelector("[data-col='amount']").textContent = toCurrency(expense.amount);
    row.querySelector("[data-col='note']").textContent = expense.note || "-";
    row.querySelector("[data-action='delete']").dataset.id = expense.id;
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
  if (!list.length) {
    return "Bugun kamida bitta xarajat yozing, insightlar avtomatik chiqadi.";
  }

  const totalsByCategory = {};
  for (const item of list) {
    totalsByCategory[item.category] = (totalsByCategory[item.category] || 0) + Number(item.amount || 0);
  }

  const topCategory = Object.entries(totalsByCategory)
    .sort((a, b) => b[1] - a[1])[0];

  const today = toDateOnly(new Date());
  const last7Start = shiftDate(today, -6);
  const prev7Start = shiftDate(today, -13);
  const prev7End = shiftDate(today, -7);

  const last7 = sumBy(list.filter((x) => x.date >= last7Start && x.date <= today));
  const prev7 = sumBy(list.filter((x) => x.date >= prev7Start && x.date <= prev7End));

  let trend = "Oxirgi 7 kun trendi hali shakllanmoqda.";
  if (prev7 > 0) {
    const diff = ((last7 - prev7) / prev7) * 100;
    if (diff > 8) trend = `Oxirgi 7 kun xarajati ${Math.round(diff)}% oshgan.`;
    if (diff < -8) trend = `Oxirgi 7 kun xarajati ${Math.round(Math.abs(diff))}% kamaygan.`;
  }

  let budgetState = "Budget belgilanmagan.";
  if (budget > 0 && monthSpent <= budget) {
    budgetState = "Ajoyib, oylik budget ichidasiz.";
  }
  if (budget > 0 && monthSpent > budget) {
    budgetState = "Diqqat, oylik budget limitidan oshib ketdingiz.";
  }

  return `Eng katta kategoriya: ${topCategory[0]} (${toCurrency(topCategory[1])}). ${trend} ${budgetState}`;
}

function buildBadges(params) {
  const badges = [];

  if (params.expenseCount >= 1) badges.push("Start");
  if (params.expenseCount >= 15) badges.push("Tracker");
  if (params.expenseCount >= 50) badges.push("Master");
  if (params.expenseStreak >= 3) badges.push("3-kun streak");
  if (params.expenseStreak >= 7) badges.push("7-kun streak");
  if (params.visitStreak >= 5) badges.push("Qayta-qayta kiruvchi");
  if (params.budget > 0 && params.monthSpent <= params.budget) badges.push("Budget himoyachisi");

  return badges;
}

function getDailyChallenge(username) {
  const challenges = [
    "Bugungi challenge: 1 ta xarajatga aniq izoh yozing.",
    "Bugungi challenge: transport xarajatidan kamida 10,000 som tejang.",
    "Bugungi challenge: ortiqcha xaridni 1 marta toxtating.",
    "Bugungi challenge: xarajat kiritganda kategoriya tanlashni unutmang.",
    "Bugungi challenge: bugun kechqurun hisobotni qayta tekshiring.",
  ];

  const key = `${username}-${toDateOnly(new Date())}`;
  const hash = [...key].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return challenges[hash % challenges.length];
}

function loadData() {
  const fallback = { users: {}, budgets: {}, visits: {} };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return normalizeData(JSON.parse(raw));
    }

    const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacyRaw) {
      const legacy = JSON.parse(legacyRaw);
      const migrated = migrateLegacyData(legacy);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }

    return fallback;
  } catch {
    return fallback;
  }
}

function migrateLegacyData(legacy) {
  const migrated = { users: {}, budgets: {}, visits: {} };
  if (!legacy || typeof legacy !== "object") return migrated;

  if (legacy.users && typeof legacy.users === "object") {
    for (const [username, value] of Object.entries(legacy.users)) {
      if (Array.isArray(value)) {
        migrated.users[username] = value;
      }
    }
  }

  return migrated;
}

function normalizeData(parsed) {
  const normalized = {
    users: {},
    budgets: {},
    visits: {},
  };

  if (parsed && typeof parsed === "object" && parsed.users && typeof parsed.users === "object") {
    for (const [username, value] of Object.entries(parsed.users)) {
      normalized.users[username] = Array.isArray(value) ? value : [];
    }
  }

  if (parsed && typeof parsed === "object" && parsed.budgets && typeof parsed.budgets === "object") {
    for (const [username, value] of Object.entries(parsed.budgets)) {
      const num = Number(value);
      normalized.budgets[username] = Number.isFinite(num) && num >= 0 ? num : 0;
    }
  }

  if (parsed && typeof parsed === "object" && parsed.visits && typeof parsed.visits === "object") {
    for (const [username, value] of Object.entries(parsed.visits)) {
      if (value && typeof value === "object") {
        normalized.visits[username] = {
          streak: Number(value.streak || 0),
          lastDate: typeof value.lastDate === "string" ? value.lastDate : "",
        };
      }
    }
  }

  return normalized;
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
}

function sumBy(list) {
  return list.reduce((acc, item) => acc + Number(item.amount || 0), 0);
}

function toCurrency(value) {
  return `${Math.round(value).toLocaleString("uz-UZ")} so'm`;
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

  if (toastTimer) {
    clearTimeout(toastTimer);
  }

  toastTimer = setTimeout(() => {
    els.toast.classList.remove("show");
  }, 2500);
}
