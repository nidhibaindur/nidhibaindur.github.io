document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;

    // Load theme preference from localStorage
    if (localStorage.getItem("theme") === "light") {
        body.classList.add("light-mode");
        themeToggle.checked = true;
    }

    // Toggle theme
    themeToggle.addEventListener("change", () => {
        body.classList.toggle("light-mode");
        localStorage.setItem("theme", body.classList.contains("light-mode") ? "light" : "dark");
    });
});
