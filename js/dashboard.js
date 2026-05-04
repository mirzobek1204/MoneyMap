(async () => {
  const app = window.PulPulse;

  // 1. Avtorizatsiyani tekshirish
  const user = await app.requireAuth();
  if (!user) return;

  // 2. UI elementlarini xavfsiz tanlash
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
    currencyInput: document.getElementById("currencyInput"),
    currencyPreview: document.getElementById("currencyPreview"),
    amountPreview: document.getElementById("amountPreview"),
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
    topMenuBtn: document.getElementById("topMenuBtn"),
    navBackdrop: document.getElementById("navBackdrop"),
  };

  // 3. Init
  if (els.languageSelect) app.bindLanguageSelect(els.languageSelect);
  app.applyI18n();
  bindEvents();
  await render();

  // Til o'zgarganda qayta chizish
  document.addEventListener("pulpulse:lang", () => void render());

  function bindEvents() {
    // Logout funksiyalari
    els.logoutBtn?.addEventListener("click", () => app.logout());

    // Mobil menyu (drawer sidebar)
    els.topMenuBtn?.addEventListener("click", () => setSidebarOpen(!isSidebarOpen()));
    els.navBackdrop?.addEventListener("click", () => setSidebarOpen(false));
    document.querySelectorAll(".menu-link").forEach((link) => {
      link.addEventListener("click", () => setSidebarOpen(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setSidebarOpen(false);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) setSidebarOpen(false);
    });

    function updateAmountPreview() {
      const amount = Number(els.amountInput?.value || 0);
      const currency = String(els.currencyInput?.value || app.getCurrentCurrency() || "UZS").toUpperCase();
      if (els.currencyPreview) els.currencyPreview.textContent = currency;
      if (els.amountPreview) {
        els.amountPreview.textContent = amount > 0 ? app.formatCurrency(amount, currency) : app.formatCurrency(0, currency);
      }
    }

    els.amountInput?.addEventListener("input", updateAmountPreview);
    els.currencyInput?.addEventListener("change", async () => {
      const currency = String(els.currencyInput.value || "UZS").toUpperCase();
      await app.saveUserCurrency(user, currency);
      updateAmountPreview();
      await render();
    });

    // Xarajat qo'shish formasi
    els.expenseForm?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const date = els.dateInput.value;
      const amount = Number(els.amountInput.value);
      const category = app.normalizeCategory(els.categoryInput.value);
      const note = els.noteInput.value.trim();
      const currency = String(els.currencyInput?.value || app.getCurrentCurrency() || "UZS").toUpperCase();

      if (!date || !Number.isFinite(amount) || amount <= 0 || !category) {
        alert(app.t("expense.invalid"));
        return;
      }

      await app.addExpense(user, { date, amount, category, note, currency });
      
      // Formani tozalash
      els.amountInput.value = "";
      els.noteInput.value = "";
      updateAmountPreview();
      
      await render();
      app.showToast(app.t("toast.saved"));
    });

    // Tezkor summalar (Quick amounts)
    els.expenseForm?.addEventListener("click", (event) => {
      const quick = event.target.closest("[data-quick]");
      if (quick && els.amountInput) {
        els.amountInput.value = quick.dataset.quick;
        els.amountInput.focus();
        if (els.amountInput) els.amountInput.dispatchEvent(new Event("input"));
      }
    });

    // Budgetni saqlash
    els.saveBudgetBtn?.addEventListener("click", async () => {
      const value = Number(els.budgetInput.value);
      if (!Number.isFinite(value) || value < 0) {
        alert(app.t("budget.invalid"));
        return;
      }
      await app.setBudget(user, value);
      await render();
      app.showToast(app.t("toast.budgetSaved"));
    });
  }

  async function render() {
    // 1. Salomlashish
    if (els.welcomeText) {
      els.welcomeText.textContent = app.t("dashboard.welcome", { name: user });
    }
    
    if (els.dateInput) els.dateInput.value = app.todayIso();

    const currency = app.getCurrentCurrency();
    if (els.currencyInput) els.currencyInput.value = currency;
    if (els.currencyPreview) els.currencyPreview.textContent = currency;
    if (els.amountPreview) {
      const amount = Number(els.amountInput?.value || 0);
      els.amountPreview.textContent = app.formatCurrency(amount > 0 ? amount : 0, currency);
    }

    // 2. Statistika
    const stats = await app.getStats(user);
    if (els.todayTotal) els.todayTotal.textContent = app.formatCurrency(stats.today, currency);
    if (els.monthTotal) els.monthTotal.textContent = app.formatCurrency(stats.month, currency);
    if (els.allTotal) els.allTotal.textContent = app.formatCurrency(stats.total, currency);

    // 3. Challenge va Insight
    const challenge = await app.getChallenge(user);
    if (els.challengeText) {
      els.challengeText.textContent = `${app.t("dashboard.challengePrefix")} ${challenge}`;
    }
    
    if (els.streakText) {
      els.streakText.textContent = app.t("dashboard.streak", {
        expense: String(await app.getExpenseStreak(user)),
        visit: String(await app.getVisitStreak(user)),
      });
    }

    if (els.insightText) {
      els.insightText.textContent = await app.getInsight(user);
    }

    // 4. Budget vizualizatsiyasi
    const budget = await app.getBudget(user);
    if (els.budgetInput) els.budgetInput.value = budget > 0 ? String(budget) : "";

    const progress = budget > 0 ? (stats.month / budget) * 100 : 0;
    if (els.budgetBar) {
      els.budgetBar.style.width = `${Math.min(Math.max(progress, 0), 100)}%`;
      els.budgetBar.style.background = progress > 100
        ? "linear-gradient(90deg,#ef4444,#dc2626)"
        : progress > 85
          ? "linear-gradient(90deg,#f59e0b,#ea580c)"
          : "linear-gradient(90deg,#22c55e,#16a34a)";
    }

    if (els.budgetUsedText) {
      els.budgetUsedText.textContent = app.t("budget.used", { amount: app.formatCurrency(stats.month, currency) });
    }

    if (els.budgetLeftText) {
      if (budget <= 0) {
        els.budgetLeftText.textContent = app.t("budget.unset");
      } else if (stats.month <= budget) {
        els.budgetLeftText.textContent = app.t("budget.left", { amount: app.formatCurrency(budget - stats.month, currency) });
      } else {
        els.budgetLeftText.textContent = app.t("budget.over", { amount: app.formatCurrency(stats.month - budget, currency) });
      }
    }

    // 5. Oxirgi amallar jadvali (O'chirish tugmasi bilan)
    await renderRecentTransactions(user, currency);
  }

  async function renderRecentTransactions(user, currency) {
    if (!els.recentBody) return;

    const recent = (await app.getExpenses(user))
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 8);

    els.recentBody.innerHTML = "";
    if (els.recentEmpty) {
      els.recentEmpty.textContent = recent.length ? "" : app.t("expenses.empty");
    }

    const labels = {
      date: app.t("table.date"),
      category: app.t("table.category"),
      amount: app.t("table.amount"),
      note: app.t("table.note"),
      action: app.t("table.action"),
    };

    recent.forEach((item) => {
      const row = document.createElement("tr");
      row.className = "hover:bg-gray-50 transition-colors";
      row.innerHTML = `
        <td class="px-4 py-3 text-sm" data-label="${labels.date}">${item.date}</td>
        <td class="px-4 py-3 text-sm font-medium" data-label="${labels.category}">${app.t(`category.${item.category}`)}</td>
        <td class="px-4 py-3 text-sm font-bold text-red-600" data-label="${labels.amount}">-${app.formatCurrency(item.amount, item.currency || currency)}</td>
        <td class="px-4 py-3 text-sm text-gray-500" data-label="${labels.note}">${item.note || "-"}</td>
        <td class="px-4 py-3 text-right" data-label="${labels.action}">
          <button class="delete-btn p-1 hover:bg-red-100 rounded text-red-500 transition-colors" data-id="${item.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </td>
      `;

      row.querySelector(".delete-btn")?.addEventListener("click", async () => {
        if (confirm(app.t("danger.confirm") || "Ushbu amalni o'chirmoqchimisiz?")) {
          await app.deleteExpense(user, item.id);
          await render();
          app.showToast(app.t("toast.deleted"));
        }
      });

      els.recentBody.appendChild(row);
    });
  }

  function isSidebarOpen() {
    return document.body.classList.contains("sidebar-open");
  }

  function setSidebarOpen(open) {
    document.body.classList.toggle("sidebar-open", Boolean(open));
  }
})();

