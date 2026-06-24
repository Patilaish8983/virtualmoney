# BrokeSim: Learn by Losing (Financial Literacy Simulation)

An interactive, full-stack financial literacy game built with React (frontend), Node.js/Express (backend), and SQLite (database).

**BrokeSim** allows users to play as one of four character personas, make simulated financial decisions, experience "wealth losses" from common traps (speculative crypto, lifestyle inflation, bad insurance endowment policies, scams), and audit their results to master real-world financial literacy.

---

## 📁 Folder Structure

```
financial_game/
├── frontend/         # Vite + React Client App
├── backend/          # Node.js + Express API Server
│   └── brokesim.db   # SQLite Database File (auto-generated)
└── README.md
```

---

## 🚀 How to Run Locally

### 1. Start the Backend Server

Open a terminal window and navigate to the backend folder:

```bash
cd backend
npm install
npm start
```

This starts the API server on `http://localhost:5000` and initializes the SQLite database `brokesim.db`.

### 2. Start the Frontend App

Open a second terminal window and navigate to the frontend folder:

```bash
cd frontend
npm install
npm run dev
```

Open your browser and navigate to the local server address (usually `http://localhost:5173`).

---

## 🎮 Character Personas
- 🎓 **Sam (Student)**: Deals with crypto hype, BNPL laptop debt, student health cover add-ons, and P2P lending.
- 👩‍💼 **Priya (Working Woman)**: Navigates high-commission endowment insurance traps, emergency fund planning, and lifestyle inflation.
- 👴 **Mr. Gupta (Retired Senior)**: Shields his retirement corpus from corporate deposit defaults, phishing scams, and health premium decisions.
- 🚀 **Vikram (High Earner)**: Manages option trading risks, expensive luxury car loans, and term insurance policies.

---

## 🛠️ Tech Stack & Design System
- **Frontend**: React, Lucide React (Icons), Vanilla CSS (Custom Glassmorphism, animations, HSL themes).
- **Backend**: Node.js, Express.
- **Database**: SQLite3.

---

## 📤 Uploading to GitHub

When you're ready to host this project on GitHub:
1. Initialize a Git repository at the root folder:
   ```bash
   git init
   ```
2. Create a `.gitignore` file to ignore node dependencies and local databases:
   ```bash
   # Add a .gitignore file at the root
   node_modules/
   backend/brokesim.db
   frontend/dist/
   ```
3. Commit and push:
   ```bash
   git add .
   git commit -m "Initial commit of BrokeSim application"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
