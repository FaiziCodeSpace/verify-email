# 📧 Email Verification – Node.js App

**Email Verification** is a lightweight Express.js-based application that allows users to receive a verification code through email and confirm their identity. Designed for learning, prototyping, and showcasing backend logic using local JSON storage and no external database.

---

## ⚙️ Tech Stack

- **Node.js**
- **Express.js**
- **Nodemailer**
- **EJS Templating**
- **Local JSON Storage**
- **Custom CSS**

---

## 🚀 Features

- Send a verification code to any valid email address
- Input code and verify identity
- Code-based verification logic
- Local JSON file tracks verified users
- Clean and professional UI using EJS and CSS
- Fully functional backend without a database

---

## 📁 Project Structure
```
project-root/
│
├── data/
│ └── verified.json # Stores verified emails
│
├── public/
│ └── style.css # Form styling
│
├── views/
│ ├── sendCode.ejs # Form to enter email
│ └── verify.ejs # Form to verify code
│
├── .env # Contains email + app password
├── .gitignore
├── app.js # Main application logic
├── package.json
└── README.md
```

---

## 🔑 Environment Setup

Create a `.env` file in the root directory and add the following:

```env
EMAIL=your-email@gmail.com
PASS=your-app-password
PORT=3000
```

How to Run
```
npm install
node app.js
```
Open in browser:
```
http://localhost:3000
```

📌 Notes
No MongoDB or SQL required.

Ideal for learning how email verification works with raw Express.js.

Gmail requires an App Password (not your regular email password).

📦 Sample Use Case
1. Visit / to enter email.

2. A verification code is sent to the provided email.

3. Enter the code to verify.

4. Verified emails are saved to verified.json.

Built for learning and practice purposes by Faizan
