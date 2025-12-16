// backend/server.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// In-memory user store
const users = {}; // email -> { password }
const userSubscriptions = {};

const SUPPORTED_STOCKS = ["GOOG", "TSLA", "AMZN", "META", "NVDA"];

io.on("connection", (socket) => {
  io.emit("online_users", io.engine.clientsCount);

  // REGISTER
  socket.on("register", ({ email, password }) => {
    if (users[email]) {
      socket.emit("auth_error", "User is already registered");
      return;
    }

    users[email] = { password };
    userSubscriptions[email] = [];

    socket.emit("register_success", "Registration successful. Please login.");
  });

  // LOGIN (STRICT)
  socket.on("login", ({ email, password }) => {
    if (!users[email]) {
      socket.emit("auth_error", "User not registered. Please register first.");
      return;
    }

    if (users[email].password !== password) {
      socket.emit("auth_error", "Invalid password");
      return;
    }

    socket.email = email;
    socket.emit("login_success", userSubscriptions[email]);
  });

  // Subscribe
  socket.on("subscribe", ({ email, stock }) => {
    if (!userSubscriptions[email].includes(stock)) {
      userSubscriptions[email].push(stock);
    }
    socket.emit("subscribed_stocks", userSubscriptions[email]);
  });

  // Unsubscribe
  socket.on("unsubscribe", ({ email, stock }) => {
    userSubscriptions[email] = userSubscriptions[email].filter(
      (s) => s !== stock
    );
    socket.emit("subscribed_stocks", userSubscriptions[email]);
  });

  socket.on("disconnect", () => {
    io.emit("online_users", io.engine.clientsCount);
  });
});

// Price updates
setInterval(() => {
  const prices = {};
  SUPPORTED_STOCKS.forEach((s) => {
    prices[s] = Number((Math.random() * 1000 + 100).toFixed(2));
  });
  io.emit("price_update", prices);
}, 1000);

server.listen(5000, () =>
  console.log("Backend running on port 5000")
);
