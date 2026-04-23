(() => {
  const app = window.PulPulse;
  const user = app.requireAuth();
  if (!user) return;

  const els = {
    languageSelect: document.getElementById("languageSelect"),
    logoutBtn: document.getElementById("logoutBtn"),
    welcomeText: document.getElementById("welcomeText"),
    filterForm: document.getElementById("filterForm"),
    fromDate: document.getElementById("fromDate"),
    toDate: document.getElementById("toDate"),
    filterCategory: document.getElementById("filterCategory"),
    filteredText: document.getElementById("filteredText"),
    tableBody: document.getElementById("tableBody"),
    emptyText: document.getElementById("emptyText"),
    clearBtn: document.getElementById("clearBtn"),
  };

  const filters = { fromDate: "", toDate: "", category: "" };

  app.bindLanguageSelect(els.languageSelect);
  app.applyI18n();
  bindEvents();
  render();

  document.addEventListener("pulpulse:lang", render);

  function bindEvents() {
    els.logoutBtn.addEventListener("click", app.logout);

    els.filterForm.addEventListener("submit", (event) => {
      event.preventDefault();
      filters.fromDate = els.fromDate.value;
      filters.toDate = els.toDate.value;
      filters.category = app.normalizeCategory(els.filterCategory.value);
      renderTable();
    });

    els.tableBody.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-delete]");
      if (!btn) return;
      app.deleteExpense(user, btn.dataset.delete);
      render();
      app.showToast(app.t("toast.deleted"));
    });

    els.clearBtn.addEventListener("click", () => {
      if (!confirm(app.t("danger.confirm"))) return;
      app.clearCurrentUserData(user);
      render();
      app.showToast(app.t("toast.cleared"));
    });
  }

  function render() {
    els.welcomeText.textContent = app.t("dashboard.welcome", { name: user });
    renderTable();
  }

  function renderTable() {
    const rows = applyFilters(app.getExpenses(user));
    const sorted = [...rows].sort((a, b) => {
      if (a.date === b.date) return b.createdAt.localeCompare(a.createdAt);
      return b.date.localeCompare(a.date);
    });

    els.tableBody.innerHTML = "";
    els.filteredText.textContent = app.t("expenses.filtered", { amount: app.formatCurrency(sumBy(sorted)) });
    els.emptyText.textContent = sorted.length ? "" : app.t("expenses.empty");

    for (const item of sorted) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.date}</td>
        <td>${app.t(`category.${item.category}`)}</td>
        <td>${app.formatCurrency(item.amount)}</td>
        <td>${item.note || "-"}</td>
        <td><button class="danger mini" type="button" data-delete="${item.id}">${app.t("table.delete")}</button></td>
      `;
      els.tableBody.appendChild(tr);
    }
  }

  function applyFilters(list) {
    return list.filter((item) => {
      if (filters.fromDate && item.date < filters.fromDate) return false;
      if (filters.toDate && item.date > filters.toDate) return false;
      if (filters.category && item.category !== filters.category) return false;
      return true;
    });
  }

  function sumBy(list) {
    return list.reduce((acc, item) => acc + Number(item.amount || 0), 0);
  }
})();
