// src/components/Login.js
import React, { useEffect, useState } from "react";
import socket from "../socket";


export default function Login({ setEmail }) {
  const [email, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // login | register
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    socket.on("auth_error", (msg) => {
      setError(msg);
      setSuccess("");
    });

    socket.on("register_success", (msg) => {
      setSuccess(msg);
      setError("");
      // DO NOT auto-login after register
      setMode("login");
    });

    socket.on("login_success", () => {
      setEmail(email); // ONLY login triggers dashboard
    });

    return () => {
      socket.off("auth_error");
      socket.off("register_success");
      socket.off("login_success");
    };
  }, [email, setEmail]);

  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  const submit = () => {
    setError("");
    setSuccess("");

    if (!gmailRegex.test(email)) {
      setError("Please enter a valid Gmail address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (mode === "register") {
      socket.emit("register", { email, password });
    } else {
      socket.emit("login", { email, password });
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>{mode === "login" ? "Login" : "Register"}</h2>

        <input
          placeholder="Gmail"
          value={email}
          onChange={(e) => setEmailInput(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <button onClick={submit} style={styles.button}>
          {mode === "login" ? "Login" : "Register"}
        </button>

        <p
          style={styles.switch}
          onClick={() => setMode(mode === "login" ? "register" : "login")}
        >
          {mode === "login"
            ? "New user? Register first"
            : "Already registered? Login"}
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#eef2f7,#dbeafe)",
  },
  card: {
    width: "360px",
    padding: "30px",
    borderRadius: "14px",
    background: "#fff",
    boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
  },
  error: { color: "#dc2626", fontSize: "13px", marginBottom: "10px" },
  success: { color: "#16a34a", fontSize: "13px", marginBottom: "10px" },
  switch: {
    marginTop: "12px",
    fontSize: "13px",
    color: "#2563eb",
    cursor: "pointer",
  },
};
