(() => {
  const app = window.PulPulse;
  
  // 1. Avtorizatsiyani tekshirish
  const user = app.requireAuth();
  if (!user) return;

  // 2. UI elementlarini xavfsiz tanlash (Null-check bilan)
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
    topMenuBtn: document.getElementById("topMenuBtn"),
    navBackdrop: document.getElementById("navBackdrop"),
  };

  const filters = { fromDate: "", toDate: "", category: "" };

  // 3. Init
  if (els.languageSelect) app.bindLanguageSelect(els.languageSelect);
  app.applyI18n();
  bindEvents();
  render();

  // Til o'zgarganda sahifani yangilash
  document.addEventListener("pulpulse:lang", render);

  function bindEvents() {
    // Logoutlar
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

    // Filtrni qo'llash
    els.filterForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      filters.fromDate = els.fromDate?.value || "";
      filters.toDate = els.toDate?.value || "";
      filters.category = els.filterCategory ? app.normalizeCategory(els.filterCategory.value) : "";
      renderTable();
    });

    // Jadval ichidagi o'chirish tugmasi (Event Delegation)
    els.tableBody?.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-delete]");
      if (!btn) return;
      
      // O'chirishdan oldin tasdiqlash so'rash (Expert tavsiyasi)
      if (confirm(app.t("danger.confirm") || "O'chirilsinmi?")) {
        app.deleteExpense(user, btn.dataset.delete);
        render(); // RenderTable emas, render chaqiriladi (to'liq UI yangilanishi uchun)
        app.showToast(app.t("toast.deleted"));
      }
    });

    // Barcha ma'lumotlarni tozalash
    els.clearBtn?.addEventListener("click", () => {
      if (!confirm(app.t("danger.confirm"))) return;
      app.clearCurrentUserData(user);
      render();
      app.showToast(app.t("toast.cleared"));
    });
  }

  function render() {
    if (els.welcomeText) {
      els.welcomeText.textContent = app.t("dashboard.welcome", { name: user });
    }
    
    renderTable();
  }

  function renderTable() {
    if (!els.tableBody) return;

    const rows = applyFilters(app.getExpenses(user));
    
    // Saralash: Birinchi sana bo'yicha, keyin yaratilgan vaqti bo'yicha (eng yangilari tepada)
    const sorted = [...rows].sort((a, b) => {
      if (a.date === b.date) {
          // core.js dacreatedAt bo'lsa shuni ishlatadi, aks holda id bo'yicha
          return (b.createdAt || b.id).localeCompare(a.createdAt || a.id);
      }
      return b.date.localeCompare(a.date);
    });

    els.tableBody.innerHTML = "";
    
    if (els.filteredText) {
        els.filteredText.textContent = app.t("expenses.filtered", { 
            amount: app.formatCurrency(sumBy(sorted)) 
        });
    }

    if (els.emptyText) {
        els.emptyText.textContent = sorted.length ? "" : app.t("expenses.empty");
    }

    const labels = {
      date: app.t("table.date"),
      category: app.t("table.category"),
      amount: app.t("table.amount"),
      note: app.t("table.note"),
      action: app.t("table.action"),
    };

    for (const item of sorted) {
      const tr = document.createElement("tr");
      tr.className = "border-b hover:bg-gray-50 transition-colors"; // Tailwind klasslari bo'lsa ishlaydi
      tr.innerHTML = `
        <td class="p-3" data-label="${labels.date}">${item.date}</td>
        <td class="p-3" data-label="${labels.category}">${app.t(`category.${item.category}`)}</td>
        <td class="p-3 font-bold text-red-600" data-label="${labels.amount}">-${app.formatCurrency(item.amount)}</td>
        <td class="p-3 text-gray-500" data-label="${labels.note}">${item.note || "-"}</td>
        <td class="p-3 text-right" data-label="${labels.action}">
          <button class="bg-red-100 text-red-600 px-2 py-1 rounded text-xs hover:bg-red-200" 
                  type="button" 
                  data-delete="${item.id}">
            ${app.t("table.delete") || "Delete"}
          </button>
        </td>
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

  function isSidebarOpen() {
    return document.body.classList.contains("sidebar-open");
  }

  function setSidebarOpen(open) {
    document.body.classList.toggle("sidebar-open", Boolean(open));
  }
})();

