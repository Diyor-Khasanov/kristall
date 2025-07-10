// js/i18n.js
document.addEventListener("DOMContentLoaded", () => {
  const langSelect = document.getElementById("languageSelect");
  const defaultLang = localStorage.getItem("lang") || "uz";
  loadLanguage(defaultLang);
  langSelect.value = defaultLang;

  langSelect.addEventListener("change", (e) => {
    const selectedLang = e.target.value;
    localStorage.setItem("lang", selectedLang);
    loadLanguage(selectedLang);
  });
});

function loadLanguage(lang) {
  fetch(`lang/${lang}.json`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelectorAll("[data-i18n]").forEach((elem) => {
        const key = elem.getAttribute("data-i18n");
        if (data[key]) {
          elem.textContent = data[key];
        }
      });
    });
}

function loadLanguage(lang) {
  fetch(`lang/${lang}.json`)
    .then((res) => res.json())
    .then((data) => {
      // Translate text content
      document.querySelectorAll("[data-i18n]").forEach((elem) => {
        const key = elem.getAttribute("data-i18n");
        if (data[key]) {
          elem.textContent = data[key];
        }
      });

      // Translate placeholders
      document.querySelectorAll("[data-i18n-placeholder]").forEach((elem) => {
        const key = elem.getAttribute("data-i18n-placeholder");
        if (data[key]) {
          elem.setAttribute("placeholder", data[key]);
        }
      });
    });
}
