// DOM Elements


   // ********************************************************************//
 //           Strong Password Generator  date - 12/08/2024               //
// ******************************************************************** //


const passwordLengthInput = document.getElementById("passwordLength");
const lengthValueSpan = document.getElementById("lengthValue");
const includeUppercaseCheckbox = document.getElementById("includeUppercase");
const includeLowercaseCheckbox = document.getElementById("includeLowercase");
const includeNumbersCheckbox = document.getElementById("includeNumbers");
const includeSymbolsCheckbox = document.getElementById("includeSymbols");
const generateBtn = document.getElementById("generateBtn"); 
const passwordDisplaySpan = document.getElementById("passwordDisplay");
const copyBtn = document.getElementById("copyBtn");
const passwordStrengthBar = document.getElementById("passwordStrengthBar");
const strengthText = document.getElementById("strengthText");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const messageBox = document.getElementById("messageBox");

// Character Sets
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

// Password History Array
let passwordHistory = JSON.parse(localStorage.getItem("passwordHistory")) || [];

// --- Functions ---

// Function to update password length display
passwordLengthInput.addEventListener("input", () => {
  lengthValueSpan.textContent = passwordLengthInput.value;
});

// Function to generate password
generateBtn.addEventListener("click", generatePassword);

function generatePassword() {
  const length = parseInt(passwordLengthInput.value);
  let characterPool = "";
  let generatedPassword = "";
  let guaranteedChars = [];

  if (includeUppercaseCheckbox.checked) {
    characterPool += uppercaseChars;
    guaranteedChars.push(getRandomChar(uppercaseChars));
  }
  if (includeLowercaseCheckbox.checked) {
    characterPool += lowercaseChars;
    guaranteedChars.push(getRandomChar(lowercaseChars));
  }
  if (includeNumbersCheckbox.checked) {
    characterPool += numberChars;
    guaranteedChars.push(getRandomChar(numberChars));
  }
  if (includeSymbolsCheckbox.checked) {
    characterPool += symbolChars;
    guaranteedChars.push(getRandomChar(symbolChars));
  }

  if (characterPool === "") {
    showMessage("Please select at least one character type!", "error");
    passwordDisplaySpan.textContent = "";
    updateStrength("");
    return;
  }

  // Add guaranteed characters first
  for (let i = 0; i < guaranteedChars.length; i++) {
    generatedPassword += guaranteedChars[i];
  }

  // Fill the rest of the password length
  for (let i = generatedPassword.length; i < length; i++) {
    generatedPassword += getRandomChar(characterPool);
  }

  // Shuffle the password to randomize positions of guaranteed characters
  generatedPassword = shuffleString(generatedPassword);

  passwordDisplaySpan.textContent = generatedPassword;
  updateStrength(generatedPassword);
  addPasswordToHistory(generatedPassword);
}

// Helper function to get a random character from a string
function getRandomChar(charSet) {
  const randomIndex = Math.floor(Math.random() * charSet.length);
  return charSet[randomIndex];
}

// Helper function to shuffle a string
function shuffleString(str) {
  let array = str.split("");
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array.join("");
}

// Function to update password strength indicator
function updateStrength(password) {
  let score = 0;
  const length = password.length;

  if (length > 0) {
    // Length bonus
    score += length * 4;

    // Character type bonuses
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*()_+\[\]{}|;:,.<>?]/.test(password);

    if (hasUppercase) score += 10;
    if (hasLowercase) score += 10;
    if (hasNumbers) score += 10;
    if (hasSymbols) score += 10;

    // Combinations bonus
    let uniqueCharTypes = 0;
    if (hasUppercase) uniqueCharTypes++;
    if (hasLowercase) uniqueCharTypes++;
    if (hasNumbers) uniqueCharTypes++;
    if (hasSymbols) uniqueCharTypes++;
    score += uniqueCharTypes * 15; // Bonus for diversity

    // Deductions for common patterns (simplified for this example)
    // No deductions for now to keep it simple, but could add for sequential chars, repeated chars etc.
  }

  let strength = "Weak";
  let barWidth = 0;
  let barClass = "";
  let textClass = "";

  if (score < 40) {
    strength = "Weak";
    barWidth = (score / 40) * 33; // Scale to 33% for weak
    barClass = "strength-weak";
    textClass = "text-weak";
  } else if (score < 80) {
    strength = "Medium";
    barWidth = 33 + ((score - 40) / 40) * 33; // Scale from 33% to 66% for medium
    barClass = "strength-medium";
    textClass = "text-medium";
  } else {
    strength = "Strong";
    barWidth = 66 + ((score - 80) / 40) * 34; // Scale from 66% to 100% for strong
    barClass = "strength-strong";
    textClass = "text-strong";
  }

  passwordStrengthBar.style.width = `${Math.min(100, barWidth)}%`; // Cap at 100%
  passwordStrengthBar.className = ""; // Clear previous classes
  passwordStrengthBar.classList.add(barClass);

  strengthText.textContent = `Strength: ${strength}`;
  strengthText.className = "strength-text"; // Reset class
  strengthText.classList.add(textClass);
}

// Function to copy password to clipboard
copyBtn.addEventListener("click", () => {
  const password = passwordDisplaySpan.textContent;
  if (password) {
    // Use document.execCommand('copy') for better iframe compatibility
    const textarea = document.createElement("textarea");
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    showMessage("Password copied to clipboard!");
  } else {
    showMessage("No password to copy!", "error");
  }
});

// Function to add password to history
function addPasswordToHistory(password) {
  if (password && !passwordHistory.includes(password)) {
    // Avoid duplicates
    passwordHistory.unshift(password); // Add to the beginning
    if (passwordHistory.length > 10) {
      // Limit history to 10 items
      passwordHistory.pop();
    }
    saveHistory();
    renderHistory();
  }
}

// Function to render history list
function renderHistory() {
  historyList.innerHTML = ""; // Clear current list
  if (passwordHistory.length === 0) {
    historyList.innerHTML =
      '<li class="text-center text-muted">No history yet. Generate some passwords!</li>';
    return;
  }
  passwordHistory.forEach((pw) => {
    const li = document.createElement("li");
    li.innerHTML = `
                    <span>${pw}</span>
                    <button class="copy-history-btn" data-password="${pw}" title="Copy this password">
                        <i class="fas fa-copy"></i>
                    </button>
                `;
    historyList.appendChild(li);
  });
  // Add event listeners for history copy buttons
  document.querySelectorAll(".copy-history-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const passwordToCopy = this.dataset.password;
      const textarea = document.createElement("textarea");
      textarea.value = passwordToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      showMessage("Password copied from history!");
    });
  });
}

// Function to save history to local storage
function saveHistory() {
  localStorage.setItem("passwordHistory", JSON.stringify(passwordHistory));
}

// Function to clear history
clearHistoryBtn.addEventListener("click", () => {
  passwordHistory = [];
  saveHistory();
  renderHistory();
  showMessage("Password history cleared!");
});

// Custom message box function
function showMessage(message, type = "success") {
  messageBox.textContent = message;
  messageBox.className = "message-box show"; // Reset and show
  if (type === "error") {
    messageBox.classList.add("error");
  } else {
    messageBox.classList.remove("error");
  }

  setTimeout(() => {
    messageBox.classList.remove("show");
  }, 3000); // Hide after 3 seconds
}

// Initial render
renderHistory();
updateStrength(""); // Initialize strength display
