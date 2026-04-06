# NextRound AI – Mock Interview Platform

An AI-powered mock interview platform that helps users practice real interview questions, improve answers, and get instant feedback.

---

## 🌐 Live Demo

🔗 Frontend: https://next-round-ai-ebon.vercel.app
🔗 Backend API: https://nextround-ai.onrender.com

---

## ✨ Features

* 🤖 AI-generated interview questions
* 🧠 Smart answer evaluation
* 🔐 User authentication (Login / Signup)
* 📊 Performance tracking & leaderboard
* 🧩 Multiple interview categories
* ⚡ Real-time API responses

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

### Deployment

* Frontend: Vercel
* Backend: Render

---

## 📁 Project Structure

```
NextRound-AI/
│
├── ai-mock-interview/
│   ├── client/     # React frontend
│   └── server/     # Node.js backend
│
├── README.md
```

---

## ⚙️ Environment Variables

### Frontend (`client/.env`)

```
VITE_API_URL=https://nextround-ai.onrender.com
```

### Backend (`server/.env`)

```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 🚀 Getting Started (Local Setup)

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/NextRound-AI.git
cd NextRound-AI
```

### 2️⃣ Setup Backend

```
cd ai-mock-interview/server
npm install
npm run dev
```

### 3️⃣ Setup Frontend

```
cd ../client
npm install
npm run dev
```

---

## 🔐 API Highlights

* `/api/auth` → Authentication routes
* `/api/interview` → Interview questions & evaluation
* `/api/leaderboard` → User rankings

---

## 🧠 Future Improvements

* 🎙️ Voice-based interviews
* 📹 Video interview simulation
* 📈 Detailed analytics dashboard
* 🧾 Resume-based question generation

---

## 👨‍💻 Author

**Neeraj Ruwali**

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and share with others!
