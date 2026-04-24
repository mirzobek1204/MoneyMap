(() => {
  const app = window.PulPulse;
  
  // 1. Avtorizatsiyani tekshirish
  const user = app.requireAuth();
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
  render();

  // Til o'zgarganda qayta chizish
  document.addEventListener("pulpulse:lang", render);

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

    // Xarajat qo'shish formasi
    els.expenseForm?.addEventListener("submit", (event) => {
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
      
      // Formani tozalash
      els.amountInput.value = "";
      els.noteInput.value = "";
      
      render();
      app.showToast(app.t("toast.saved"));
    });

    // Tezkor summalar (Quick amounts)
    els.expenseForm?.addEventListener("click", (event) => {
      const quick = event.target.closest("[data-quick]");
      if (quick && els.amountInput) {
        els.amountInput.value = quick.dataset.quick;
        els.amountInput.focus();
      }
    });

    // Budgetni saqlash
    els.saveBudgetBtn?.addEventListener("click", () => {
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
    // 1. Salomlashish
    if (els.welcomeText) {
      els.welcomeText.textContent = app.t("dashboard.welcome", { name: user });
    }
    
    if (els.dateInput) els.dateInput.value = app.todayIso();

    // 2. Statistika
    const stats = app.getStats(user);
    if (els.todayTotal) els.todayTotal.textContent = app.formatCurrency(stats.today);
    if (els.monthTotal) els.monthTotal.textContent = app.formatCurrency(stats.month);
    if (els.allTotal) els.allTotal.textContent = app.formatCurrency(stats.total);

    // 3. Challenge va Insight
    const challenge = app.getChallenge(user);
    if (els.challengeText) {
      els.challengeText.textContent = `${app.t("dashboard.challengePrefix")} ${challenge}`;
    }
    
    if (els.streakText) {
      els.streakText.textContent = app.t("dashboard.streak", {
        expense: String(app.getExpenseStreak(user)),
        visit: String(app.getVisitStreak(user)),
      });
    }

    if (els.insightText) {
      els.insightText.textContent = app.getInsight(user);
    }

    // 4. Budget vizualizatsiyasi
    const budget = app.getBudget(user);
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
      els.budgetUsedText.textContent = app.t("budget.used", { amount: app.formatCurrency(stats.month) });
    }

    if (els.budgetLeftText) {
      if (budget <= 0) {
        els.budgetLeftText.textContent = app.t("budget.unset");
      } else if (stats.month <= budget) {
        els.budgetLeftText.textContent = app.t("budget.left", { amount: app.formatCurrency(budget - stats.month) });
      } else {
        els.budgetLeftText.textContent = app.t("budget.over", { amount: app.formatCurrency(stats.month - budget) });
      }
    }

    // 5. Oxirgi amallar jadvali (O'chirish tugmasi bilan)
    renderRecentTransactions(user);
  }

  function renderRecentTransactions(user) {
    if (!els.recentBody) return;

    const recent = [...app.getExpenses(user)]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 8);

    els.recentBody.innerHTML = "";
    if (els.recentEmpty) {
        els.recentEmpty.textContent = recent.length ? "" : app.t("expenses.empty");
    }

    recent.forEach(item => {
      const row = document.createElement("tr");
      row.className = "hover:bg-gray-50 transition-colors";
      row.innerHTML = `
        <td class="px-4 py-3 text-sm">${item.date}</td>
        <td class="px-4 py-3 text-sm font-medium">${app.t(`category.${item.category}`)}</td>
        <td class="px-4 py-3 text-sm font-bold text-red-600">-${app.formatCurrency(item.amount)}</td>
        <td class="px-4 py-3 text-sm text-gray-500">${item.note || "-"}</td>
        <td class="px-4 py-3 text-right">
          <button class="delete-btn p-1 hover:bg-red-100 rounded text-red-500 transition-colors" data-id="${item.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </td>
      `;

      // O'chirish hodisasi
      row.querySelector(".delete-btn").addEventListener("click", () => {
        if (confirm(app.t("danger.confirm") || "Ushbu amalni o'chirmoqchimisiz?")) {
          app.deleteExpense(user, item.id);
          render();
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

