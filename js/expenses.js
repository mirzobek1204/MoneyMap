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
    mobileLogoutBtn: document.getElementById("mobileLogoutBtn"),
    mobileSwitchToggle: document.getElementById("mobileSwitchToggle"),
    mobileSwitchMenu: document.getElementById("mobileSwitchMenu"),
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
    els.mobileLogoutBtn?.addEventListener("click", () => app.logout());

    // Mobil menyu
    if (els.mobileSwitchToggle && els.mobileSwitchMenu) {
      els.mobileSwitchToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        els.mobileSwitchMenu.classList.toggle("hidden");
      });

      document.addEventListener("click", (event) => {
        if (!els.mobileSwitchMenu.classList.contains("hidden")) {
          const inside = event.target.closest(".mobile-switch");
          if (!inside) els.mobileSwitchMenu.classList.add("hidden");
        }
      });
    }

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
    // Mobil menyu matnini yangilash
    if (els.mobileSwitchToggle) {
      const map = { uz: "Bo'limlar", en: "Sections", ru: "Разделы" };
      els.mobileSwitchToggle.textContent = map[app.state.language] || "Sections";
    }

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

    for (const item of sorted) {
      const tr = document.createElement("tr");
      tr.className = "border-b hover:bg-gray-50 transition-colors"; // Tailwind klasslari bo'lsa ishlaydi
      tr.innerHTML = `
        <td class="p-3">${item.date}</td>
        <td class="p-3">${app.t(`category.${item.category}`)}</td>
        <td class="p-3 font-bold text-red-600">-${app.formatCurrency(item.amount)}</td>
        <td class="p-3 text-gray-500">${item.note || "-"}</td>
        <td class="p-3 text-right">
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
})();

