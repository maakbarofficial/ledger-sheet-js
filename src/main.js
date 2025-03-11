import "./style.css";

// Function to toggle the theme
function toggleTheme() {
  const container = document.querySelector(".container");
  const isDarkMode = container.classList.toggle("dark-mode");
  const theme = isDarkMode ? "dark" : "light";
  localStorage.setItem("theme", theme);
}

// Function to apply the saved theme on page load
function applySavedTheme() {
  const container = document.querySelector(".container");
  const savedTheme = localStorage.getItem("theme");
  
  if (savedTheme === "dark") {
      container.classList.add("dark-mode");
  }
}

// Initialize theme on page load
applySavedTheme();

// Event listener for theme toggle button
document.getElementById("theme-toggle").addEventListener("click", toggleTheme);

// Function to get current time and date in Asia/Karachi
function getDateTime() {
  // Create a new Date object
  const now = new Date();

  // Format the date to DD-MM-YYYY with day
  const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = now.toLocaleDateString('en-GB', options).replace(/\//g, '-'); // DD-MM-YYYY format

  // Get the current time in 12-hour format with AM/PM
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12; // Convert to 12-hour format
  hours = hours ? String(hours).padStart(2, '0') : '12'; // The hour '0' should be '12'

  const currentTime = `${hours}:${minutes}:${seconds} ${ampm}`;

  // Update the HTML elements with the current date and time
  document.getElementById('current-time').textContent = currentTime;
  document.getElementById('current-date').textContent = formattedDate;
}

// Update the time and date immediately and then every second
getDateTime();
setInterval(getDateTime, 1000);