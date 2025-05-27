# 🔐 Secure Password Generator

A modern, responsive, and feature-rich web application designed to generate strong, customizable passwords. It offers real-time password strength assessment, a history of generated passwords, and a clean, intuitive user interface.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com)

---

## ✨ Features

### 🔧 Customizable Password Generation
- Adjust password length using a slider (**6 to 30 characters**).
- Select character types:
  - ✅ Uppercase letters (A-Z)
  - ✅ Lowercase letters (a-z)
  - ✅ Numbers (0-9)
  - ✅ Symbols (!@#$%^&*)

### 📊 Real-time Password Strength Indicator
- Dynamic color-coded strength bar:
  - 🔴 Weak
  - 🟠 Medium
  - 🟢 Strong

### 📜 Password History
- Stores the last **10 generated passwords**.
- Click to **copy** any historical password.
- Option to **clear all** saved passwords.

### 📋 Copy to Clipboard
- Instantly copy generated passwords or any from the history with one click.

### 💻 Responsive and Modern UI
- Built with **Bootstrap 5** for a sleek, dark-themed design.
- Custom CSS for a polished and professional look.

### 💾 Persistent History
- Saves password history in your **browser’s localStorage**.
- History persists even after closing or refreshing the browser.

---

## 🚀 Technologies Used

- **HTML5** – Markup structure
- **CSS3** – Styling and layout
- **JavaScript (ES6+)** – Core logic and interactivity
- **Bootstrap 5** – Responsive layout and UI components
- **Font Awesome** – Icons (e.g., copy button)

---

## 🧪 Application Usage

- **Adjust Length**: Use the **Password Length** slider to set your desired password length (6–30 characters).
- **Select Character Types**: Check or uncheck the boxes to include:
  - Uppercase letters (A–Z)
  - Lowercase letters (a–z)
  - Numbers (0–9)
  - Symbols (!@#$%^&*)
- **Generate**: Click the **Generate Password** button to create a new password.
- **Copy**: Click the 📋 icon next to the generated password or any password in the history to copy it to your clipboard.
- **Clear History**: Click the **Clear History** button to remove all saved passwords from your local history.

---

## 💾 Local Storage

The application uses your browser's **localStorage** to:
- Store a history of the **last 10 passwords**
- Retain password history even after closing or refreshing the page
- Automatically remove older passwords once the history exceeds 10 items

---

## 📱 Responsiveness

The Password Generator is designed with a **mobile-first** approach and works seamlessly on:
- 📱 Mobile phones
- 📱 Tablets
- 💻 Desktop computers

---

## 💻 How to Use

```bash
git clone https://github.com/rajaroy47/random-passgen.git
cd random-passgen
```

---

## 🤝 Contributing

Contributions are welcome! If you’d like to improve this project:

1. **Fork** the repository.

   ```bash
   git checkout -b feature/your-feature-name
   git commit -m "Add new feature"
   git push origin feature/your-feature-name
   ```
