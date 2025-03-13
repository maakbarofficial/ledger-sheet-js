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

function sum(num1, num2){
  return num1 + num2;
}

function subtract(num1, num2){
  return num1 - num2;
}

function multiply(num1, num2){
  return num1 * num2;
}

function getInputValue(id){
  return parseFloat(document.getElementById(id).value) || 0;
}

// Sheet Calculation
function sheetCalculation() {
  let telenorNewBalance = getInputValue("telenor-new-balance");
  let jazzNewBalance = getInputValue("jazz-new-balance");
  let ufoneNewBalance = getInputValue("ufone-new-balance");
  let zongNewBalance = getInputValue("zong-new-balance");
  
  let telenorReversalBalance = getInputValue("telenor-reversal-balance");
  let jazzReversalBalance = getInputValue("jazz-reversal-balance");
  let ufoneReversalBalance = getInputValue("ufone-reversal-balance");
  let zongReversalBalance = getInputValue("zong-reversal-balance");

  // let telenorTotalRs = getInputValue("telenor-total-rs");
  // let jazzTotalRs = getInputValue("jazz-total-rs");
  // let ufoneTotalRs = getInputValue("ufone-total-rs");
  // let zongTotalRs = getInputValue("zong-total-rs");

  // let telenorClosingBalance = getInputValue("telenor-closing-balance");
  // let jazzClosingBalance = getInputValue("jazz-closing-balance");
  // let ufoneClosingBalance = getInputValue("ufone-closing-balance");
  // let zongClosingBalance = getInputValue("zong-closing-balance");

  // let telenorTotalEloadSell = getInputValue("telenor-total-eload-sell");
  // let jazzTotalEloadSell = getInputValue("jazz-total-eload-sell");
  // let ufoneTotalEloadSell = getInputValue("ufone-total-eload-sell");
  // let zongTotalEloadSell = getInputValue("zong-total-eload-sell");

  let telenorTotalRs = sum(telenorNewBalance + telenorReversalBalance);

  document.getElementById("telenor-total-rs").value = telenorTotalRs;
}


document.querySelectorAll("input[type='number']").forEach(input => {
  input.addEventListener("input", sheetCalculation);
});