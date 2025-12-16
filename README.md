
---

## 📈 Stock Trading Dashboard (Real-Time)

A real-time stock trading dashboard built using **React**, **Node.js**, **Socket.IO**, and **Render**, allowing multiple users to subscribe/unsubscribe to stocks and receive live price updates asynchronously.

---

## 🚀 Features

* 🔐 **User Authentication**

  * Register & Login with email and password
  * Prevents duplicate registration
* 📊 **Real-Time Stock Updates**

  * Live stock price updates every second (simulated)
  * Powered by WebSockets (Socket.IO)
* 🔁 **Subscribe / Unsubscribe Stocks**

  * Supported stocks:

    * `GOOG`
    * `TSLA`
    * `AMZN`
    * `META`
    * `NVDA`
* 👥 **Multi-User Support**

  * Different users can subscribe to different stocks
  * Dashboards update asynchronously
* 🌙 **Light / Dark Theme Toggle**
* 🌐 **Deployed on Render**

  * Backend: Node.js Web Service
  * Frontend: Static Site

---

## 🛠 Tech Stack

### Frontend

* React (Create React App)
* Socket.IO Client
* Plain CSS (Theme variables)

### Backend

* Node.js
* Express
* Socket.IO

### Deployment

* Render (Backend + Frontend)
* GitHub (Version control)

---

## 📂 Project Structure

```
stock-dashboard/
│
├── backend/
│   ├── server.js
│   ├── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── socket.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│
└── README.md
```

---

## ⚙️ How to Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/trishnkulkarni/stock-dashboard.git
cd stock-dashboard
```

---

### 2️⃣ Start Backend

```bash
cd backend
npm install
node server.js
```

Backend will run on:

```
http://localhost:5000
```

---

### 3️⃣ Start Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend will open at:

```
http://localhost:3000
```

---

## 🌐 Deployed URLs

* **Frontend**:
  👉 [https://stock-dashboard.onrender.com](https://stock-dashboard.onrender.com)
* **Backend**:
  👉 [https://stock-dashboard-backend-v1.onrender.com](https://stock-dashboard-backend-v1.onrender.com)

> ⚠️ Note: Render free tier may take ~30–50 seconds to wake up if idle.

---

## 🔌 WebSocket Configuration

In production, frontend connects to backend via:

```js
// src/socket.js
import { io } from "socket.io-client";

const socket = io("https://stock-dashboard-backend-v1.onrender.com");

export default socket;
```

---

## 🧠 How It Works (Brief)

* User logs in / registers
* Frontend opens a WebSocket connection
* Backend:

  * Tracks user subscriptions
  * Emits stock price updates every second
* Frontend:

  * Renders live prices
  * Updates UI instantly on subscribe/unsubscribe

---

## 📌 Notes for Interviewers

* Demonstrates **real-time systems**
* Shows **WebSocket-based async communication**
* Clean separation of frontend and backend
* Production deployment experience

---

## 👤 Author

**Trisha N Kulkarni**
Computer Science Engineering
Interested in AI/ML, Full-Stack & Real-Time Systems

---


