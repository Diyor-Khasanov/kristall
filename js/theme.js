document.addEventListener("DOMContentLoaded", function () {
  const themeSwitch = document.getElementById("theme-switch");
  const html = document.documentElement;

  // Check for saved theme preference or use preferred color scheme
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  // Apply the saved theme
  if (savedTheme === "dark") {
    html.setAttribute("data-theme", "dark");
    themeSwitch.checked = true;
  } else {
    html.setAttribute("data-theme", "light");
    themeSwitch.checked = false;
  }

  // Theme switcher event
  themeSwitch.addEventListener("change", function () {
    if (this.checked) {
      html.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  });

  // Watch for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      const newTheme = e.matches ? "dark" : "light";
      html.setAttribute("data-theme", newTheme);
      themeSwitch.checked = e.matches;
      localStorage.setItem("theme", newTheme);
    });
});
