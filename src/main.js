import "./style.css";

// Theme Toggler
function toggleTheme() {
  const container = document.querySelector(".container");
  container.classList.toggle("dark-mode");

  const theme = container.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", theme);
}

const container = document.querySelector(".container");
if (localStorage.getItem("theme") === "dark") {
  container.classList.add("dark-mode");
}

document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
