(() => {
  const app = window.PulPulse;
  const languageSelect = document.getElementById("languageSelect");
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("usernameInput");
  const continueText = document.getElementById("continueText");
  const continueBtn = document.getElementById("continueBtn");

  app.bindLanguageSelect(languageSelect);
  app.applyI18n();
  renderContinue();

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = usernameInput.value.trim().toLowerCase();
    if (!name) return;
    app.setCurrentUser(name);
    location.href = "dashboard.html";
  });

  continueBtn.addEventListener("click", () => {
    location.href = "dashboard.html";
  });

  document.addEventListener("pulpulse:lang", renderContinue);

  function renderContinue() {
    const current = app.getCurrentUser();
    if (!current) {
      continueText.textContent = "";
      continueBtn.classList.add("hidden");
      continueBtn.textContent = "";
      return;
    }

    continueText.textContent = app.t("dashboard.welcome", { name: current });
    continueBtn.textContent = app.t("login.continue", { name: current });
    continueBtn.classList.remove("hidden");
  }
})();
