// src/socket.js
import { io } from "socket.io-client";

const socket = io("https://stock-dashboard-backend-itbc.onrender.com", {
  autoConnect: true,
});

export default socket;
