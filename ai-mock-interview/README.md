# NextRound AI 

> **Crack Your Next Interview With AI Precision.**

NextRound AI is a powerful MERN-stack platform designed to simulate FAANG-level technical interviews. By leveraging advanced AI to dynamically generate role-specific questions and instantaneously evaluate responses, developers can practice System Design, Data Structures, and Core Architecture in a highly-immersive, analytics-driven environment.

![NextRound AI Architecture](https://img.shields.io/badge/Stack-MERN-indigo?style=for-the-badge&logo=react)
![UI](https://img.shields.io/badge/Design-Glassmorphism-fuchsia?style=for-the-badge&logo=framer)
![License](https://img.shields.io/badge/Status-Production_Ready-emerald?style=for-the-badge)

---

## ✨ Core Features

* **🧠 Dynamic AI Interviews**: Generates precisely targeted questions based on the candidate's chosen Role and Experience brackets.
* **📊 Immediate Performance Analytics**: Granular chart-based tracking of your system scoring over the lifecycle of your interview sessions using `recharts`.
* **🏆 Global Leaderboards**: Mongoose aggregation pipelines track and rank the top-performing developers globally based on rolling average accuracies.
* **📜 Digital Certificate Wallet**: A stunning cryptographic-style wallet dispensing "Gold", "Silver", and "Platinum" architectural mastery certificates upon scoring thresholds.
* **📚 Deep Session History**: Comprehensive tracking grids housing all historical mock-interviews, enabling developers to review AI node feedback on past submissions.
* **🎨 FAANG-Level UI/UX**: Built with an ultra-premium aesthetic utilizing `framer-motion` for physics-based view transitions, deep complex gradients, dark-mode glassmorphism, and skeleton loading states.

---

## 💻 Tech Stack

**Frontend Framework**
* **React.js** (Vite)
* **Tailwind CSS** (Global Styling & Utility classes)
* **Framer Motion** (Physics-based component animations & routing transitions)
* **Recharts** (SVG data graphing)
* **Lucide React** (Vector iconography)

**Backend Architecture**
* **Node.js & Express.js** (API Routing)
* **MongoDB & Mongoose** (NoSQL Database & Schema Aggregation)
* **JSON Web Tokens (JWT)** (Encrypted stateless authentication)
* **Bcrypt.js** (Password hashing)

---

##  Getting Started

Provide these instructions to successfully run the environment locally.

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/nextround-ai.git
cd nextround-ai
```

### 2. Install Dependencies
You will need to install Node modules for both the `client` and `server` environments.
```bash
# Install Server modules
cd server
npm install

# Install Client modules
cd ../client
npm install
```

### 3. Environment Pipeline (`.env`)
Create a `.env` file in the root of your `/server` directory and configure the following infrastructure nodes:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_hyper_secure_jwt_secret
```
*(Note: If you are using an external AI service like Gemini/OpenAI to power the Coordinator, ensure its API key is also mapped here).*

### 4. Boot Up the Environments
Run the development servers concurrently:

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

Visit the frontend client at `http://localhost:5173`.

---

## 📁 Directory Structure
```text
nextround-ai/
├── client/
│   ├── src/
│   │   ├── components/       # Reusable UI fragments (Navbar, Custom Buttons)
│   │   ├── pages/            # View-level routing components (Interview, Leaderboard)
│   │   ├── App.jsx           # Master React Router orchestration
│   │   └── index.css         # Global Tailwind directives
│   └── tailwind.config.js    # Design system tokens configuration
│
└── server/
    ├── controllers/          # Business logic (aiController, leaderboardController)
    ├── models/               # Mongoose Schemas (User, Interview)
    ├── routes/               # Express API endpoints (/api/interview)
    ├── middleware/           # JWT Protection logic
    └── index.js              # Application Entrypoint & Middleware configs
```

---

## 🤝 Contributing
Interested in building new features like Stripe integration for premium evaluations or Multiplayer synchronous interviews? Open an issue or submit a Pull Request! Code is expected to remain strictly typed, meticulously separated by concern, and heavily stylized.
