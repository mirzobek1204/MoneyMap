(() => {
  const app = window.PulPulse;
  const user = app.requireAuth();
  if (!user) return;

  const els = {
    languageSelect: document.getElementById("languageSelect"),
    logoutBtn: document.getElementById("logoutBtn"),
    welcomeText: document.getElementById("welcomeText"),
    todayTotal: document.getElementById("todayTotal"),
    monthTotal: document.getElementById("monthTotal"),
    allTotal: document.getElementById("allTotal"),
    challengeText: document.getElementById("challengeText"),
    expenseForm: document.getElementById("expenseForm"),
    dateInput: document.getElementById("dateInput"),
    amountInput: document.getElementById("amountInput"),
    categoryInput: document.getElementById("categoryInput"),
    noteInput: document.getElementById("noteInput"),
    budgetInput: document.getElementById("budgetInput"),
    saveBudgetBtn: document.getElementById("saveBudgetBtn"),
    budgetBar: document.getElementById("budgetBar"),
    budgetUsedText: document.getElementById("budgetUsedText"),
    budgetLeftText: document.getElementById("budgetLeftText"),
    streakText: document.getElementById("streakText"),
    insightText: document.getElementById("insightText"),
    recentBody: document.getElementById("recentBody"),
    recentEmpty: document.getElementById("recentEmpty"),
  };

  app.bindLanguageSelect(els.languageSelect);
  app.applyI18n();
  bindEvents();
  render();

  document.addEventListener("pulpulse:lang", render);

  function bindEvents() {
    els.logoutBtn.addEventListener("click", app.logout);

    els.expenseForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const date = els.dateInput.value;
      const amount = Number(els.amountInput.value);
      const category = app.normalizeCategory(els.categoryInput.value);
      const note = els.noteInput.value.trim();

      if (!date || !Number.isFinite(amount) || amount <= 0 || !category) {
        alert(app.t("expense.invalid"));
        return;
      }

      app.addExpense(user, { date, amount, category, note });
      els.amountInput.value = "";
      els.noteInput.value = "";
      render();
      app.showToast(app.t("toast.saved"));
    });

    els.expenseForm.addEventListener("click", (event) => {
      const quick = event.target.closest("[data-quick]");
      if (!quick) return;
      const amount = Number(quick.dataset.quick);
      if (!Number.isFinite(amount)) return;
      els.amountInput.value = amount;
      els.amountInput.focus();
    });

    els.saveBudgetBtn.addEventListener("click", () => {
      const value = Number(els.budgetInput.value);
      if (!Number.isFinite(value) || value < 0) {
        alert(app.t("budget.invalid"));
        return;
      }
      app.setBudget(user, value);
      render();
      app.showToast(app.t("toast.budgetSaved"));
    });
  }

  function render() {
    els.welcomeText.textContent = app.t("dashboard.welcome", { name: user });
    els.dateInput.value = app.todayIso();

    const stats = app.getStats(user);
    els.todayTotal.textContent = app.formatCurrency(stats.today);
    els.monthTotal.textContent = app.formatCurrency(stats.month);
    els.allTotal.textContent = app.formatCurrency(stats.total);

    const challenge = app.getChallenge(user);
    els.challengeText.textContent = `${app.t("dashboard.challengePrefix")} ${challenge}`;

    const budget = app.getBudget(user);
    els.budgetInput.value = budget > 0 ? String(budget) : "";
    const progress = budget > 0 ? (stats.month / budget) * 100 : 0;
    els.budgetBar.style.width = `${Math.min(Math.max(progress, 0), 100)}%`;
    els.budgetBar.style.background = progress > 100
      ? "linear-gradient(90deg,#ef4444,#dc2626)"
      : progress > 85
        ? "linear-gradient(90deg,#f59e0b,#ea580c)"
        : "linear-gradient(90deg,#22c55e,#16a34a)";

    els.budgetUsedText.textContent = app.t("budget.used", { amount: app.formatCurrency(stats.month) });
    if (budget <= 0) {
      els.budgetLeftText.textContent = app.t("budget.unset");
    } else if (stats.month <= budget) {
      els.budgetLeftText.textContent = app.t("budget.left", { amount: app.formatCurrency(budget - stats.month) });
    } else {
      els.budgetLeftText.textContent = app.t("budget.over", { amount: app.formatCurrency(stats.month - budget) });
    }

    els.streakText.textContent = app.t("dashboard.streak", {
      expense: String(app.getExpenseStreak(user)),
      visit: String(app.getVisitStreak(user)),
    });
    els.insightText.textContent = app.getInsight(user);

    const recent = [...app.getExpenses(user)].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);
    els.recentBody.innerHTML = "";
    els.recentEmpty.textContent = recent.length ? "" : app.t("expenses.empty");

    for (const item of recent) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.date}</td>
        <td>${app.t(`category.${item.category}`)}</td>
        <td>${app.formatCurrency(item.amount)}</td>
        <td>${item.note || "-"}</td>
      `;
      els.recentBody.appendChild(row);
    }
  }
})();
