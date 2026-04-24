(() => {
  const app = window.PulPulse;
  
  // Elementlar borligini tekshiramiz
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("usernameInput");
  const languageSelect = document.getElementById("languageSelect");

  // Agar forma topilmasa, konsolga xato chiqaramiz
  if (!loginForm) {
      console.error("Xato: 'loginForm' ID-li element topilmadi!");
      return;
  }

  if (languageSelect) app.bindLanguageSelect(languageSelect);
  app.applyI18n();

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
})();
