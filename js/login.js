(() => {
  const app = window.PulPulse;
  
  // Elementlar borligini tekshiramiz
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("usernameInput");
  const languageSelect = document.getElementById("languageSelect");
  const continueBtn = document.getElementById("continueBtn");
  const continueText = document.getElementById("continueText");

  // Agar forma topilmasa, konsolga xato chiqaramiz
  if (!loginForm) {
      console.error("Xato: 'loginForm' ID-li element topilmadi!");
      return;
  }

  if (languageSelect) app.bindLanguageSelect(languageSelect);
  app.applyI18n();
  renderContinue();

  // Kirish hodisasi
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = usernameInput.value.trim();
    
    if (name) {
      app.setCurrentUser(name);
      // Dashboardga o'tish
      window.location.href = "dashboard.html";
    }
  });

  // Davom etish tugmasi
  continueBtn?.addEventListener("click", () => {
    window.location.href = "dashboard.html";
  });

  function renderContinue() {
    const current = app.getCurrentUser();
    if (current && continueText && continueBtn) {
      continueText.textContent = app.t("dashboard.welcome", { name: current });
      continueBtn.textContent = app.t("login.continue", { name: current });
      continueBtn.classList.remove("hidden");
    }
  }
})();
