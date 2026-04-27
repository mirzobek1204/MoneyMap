(() => {
  const app = window.PulPulse;
  
  // Elementlar borligini tekshiramiz
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("usernameInput");
  const passwordInput = document.getElementById("passwordInput");
  const languageSelect = document.getElementById("languageSelect");

  // Agar forma topilmasa, konsolga xato chiqaramiz
  if (!loginForm) {
      console.error("Xato: 'loginForm' ID-li element topilmadi!");
      return;
  }

  if (languageSelect) app.bindLanguageSelect(languageSelect);
  app.applyI18n();

  // Kirish hodisasi
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = usernameInput.value.trim();
    const password = passwordInput?.value ?? "";
    
    const result = await app.loginWithPassword(name, password);
    if (!result.ok) {
      if (result.reason === "too_short") app.showToast(app.t("login.tooShort"));
      else app.showToast(app.t("login.invalid"));
      return;
    }

    // Dashboardga o'tish
    window.location.href = "dashboard.html";
  });
})();
