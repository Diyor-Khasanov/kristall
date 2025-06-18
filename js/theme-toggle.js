document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-toggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Check for saved user preference or use system preference
  const currentTheme =
    localStorage.getItem("theme") ||
    (prefersDarkScheme.matches ? "dark" : "light");

  // Apply the current theme
  if (currentTheme === "dark") {
    document.body.classList.add("dark-theme");
  }

  // Toggle theme on button click
  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");

    const theme = document.body.classList.contains("dark-theme")
      ? "dark"
      : "light";
    localStorage.setItem("theme", theme);
  });

  // Listen for system theme changes
  prefersDarkScheme.addEventListener("change", (e) => {
    const newTheme = e.matches ? "dark" : "light";
    document.body.classList.toggle("dark-theme", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  });
});
