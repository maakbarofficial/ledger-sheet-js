import "./style.css";

function toggleTheme() {
  const container = document.querySelector(".container");
  const isDarkMode = container.classList.toggle("dark-mode");
  const theme = isDarkMode ? "dark" : "light";
  localStorage.setItem("theme", theme);
}

function applyStoredTheme() {
  const container = document.querySelector(".container");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    container.classList.add("dark-mode");
  }
}
applyStoredTheme();

document.getElementById("theme-toggle").addEventListener("click", toggleTheme);

function getDateTime() {
  const now = new Date();
  // Format the date to DD-MM-YYYY with day
  const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = now.toLocaleDateString('en-GB', options).replace(/\//g, '-'); // DD-MM-YYYY format
  // Get the current time in 12-hour format with AM/PM
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? String(hours).padStart(2, '0') : '12';

  const currentTime = `${hours}:${minutes}:${seconds} ${ampm}`;

  document.getElementById('current-time').textContent = currentTime;
  document.getElementById('current-date').textContent = formattedDate;
}
getDateTime();
setInterval(getDateTime, 1000);

function sum(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function sumOfnNumbers(...nums) {
  return nums.reduce((acc, num) => acc + num, 0);
}

function getInputValue(elementId) {
  return parseFloat(document.getElementById(elementId).value) || 0;
}

function postOutputValue(elementId, value) {
  document.getElementById(elementId).value = value;
}

// Store input values in localStorage in real-time
function saveInputsToLocalStorage() {
  const inputs = document.querySelectorAll("input[type='number']");
  let inputValues = {};

  inputs.forEach((input) => {
    inputValues[input.id] = input.value;
  });

  localStorage.setItem("sheetData", JSON.stringify(inputValues));
}

// Load stored values on page load
function loadInputsFromLocalStorage() {
  const storedValues = JSON.parse(localStorage.getItem("sheetData")) || {};

  Object.keys(storedValues).forEach((key) => {
    const inputField = document.getElementById(key);
    if (inputField) {
      inputField.value = storedValues[key];
    }
  });
}

loadInputsFromLocalStorage();

function calculateEasyLoad() {
  let telenorOpeningBalance = getInputValue("telenor-opening-balance");
  let jazzOpeningBalance = getInputValue("jazz-opening-balance");
  let ufoneOpeningBalance = getInputValue("ufone-opening-balance");
  let zongOpeningBalance = getInputValue("zong-opening-balance");

  let telenorNewBalance = getInputValue("telenor-new-balance");
  let jazzNewBalance = getInputValue("jazz-new-balance");
  let ufoneNewBalance = getInputValue("ufone-new-balance");
  let zongNewBalance = getInputValue("zong-new-balance");

  let telenorReversalBalance = getInputValue("telenor-reversal-balance");
  let jazzReversalBalance = getInputValue("jazz-reversal-balance");
  let ufoneReversalBalance = getInputValue("ufone-reversal-balance");
  let zongReversalBalance = getInputValue("zong-reversal-balance");

  let telenorTotalRs = sumOfnNumbers(telenorOpeningBalance, telenorNewBalance, telenorReversalBalance);
  let jazzTotalRs = sumOfnNumbers(jazzOpeningBalance, jazzNewBalance, jazzReversalBalance);
  let ufoneTotalRs = sumOfnNumbers(ufoneOpeningBalance, ufoneNewBalance, ufoneReversalBalance);
  let zongTotalRs = sumOfnNumbers(zongOpeningBalance, zongNewBalance, zongReversalBalance);

  postOutputValue("telenor-total-rs", telenorTotalRs);
  postOutputValue("jazz-total-rs", jazzTotalRs);
  postOutputValue("ufone-total-rs", ufoneTotalRs);
  postOutputValue("zong-total-rs", zongTotalRs);

  postOutputValue("telenor-total-eload-sell", subtract(telenorTotalRs, getInputValue("telenor-closing-balance")));
  postOutputValue("jazz-total-eload-sell", subtract(jazzTotalRs, getInputValue("jazz-closing-balance")));
  postOutputValue("ufone-total-eload-sell", subtract(ufoneTotalRs, getInputValue("ufone-closing-balance")));
  postOutputValue("zong-total-eload-sell", subtract(zongTotalRs, getInputValue("zong-closing-balance")));
}

function calculateEasyLoadSummery() {
  postOutputValue("telenor-eload-summery", getInputValue("telenor-total-eload-sell"));
  postOutputValue("jazz-eload-summery", getInputValue("jazz-total-eload-sell"));
  postOutputValue("ufone-eload-summery", getInputValue("ufone-total-eload-sell"));
  postOutputValue("zong-eload-summery", getInputValue("zong-total-eload-sell"));
  postOutputValue("eload-summery-total", sumOfnNumbers(getInputValue("telenor-eload-summery"), getInputValue("jazz-eload-summery"), getInputValue("ufone-eload-summery"), getInputValue("zong-eload-summery")));
  postOutputValue("eload-summery-ad", getInputValue("telenor-total-eload-sell"));
  postOutputValue("eload-summery-total-sell", getInputValue("telenor-total-eload-sell"));
}

function calculateCards() {
  postOutputValue("remaining-cards", getInputValue("total-cards") - getInputValue("sell-cards"))
}

// Sheet Calculation
function sheetCalculation() {
  calculateEasyLoad()
  calculateEasyLoadSummery()
  calculateCards()
}

document.querySelectorAll("input[type='number']").forEach(input => {
  input.addEventListener("input", sheetCalculation);
  input.addEventListener("input", saveInputsToLocalStorage);
});