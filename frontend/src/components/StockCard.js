// src/components/StockCard.js
import React, { useEffect, useState } from "react";

export default function StockCard({ stock, price, previousPrice }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (price !== undefined) {
      setHistory((prev) => [...prev.slice(-15), price]);
    }
  }, [price]);

  const isUp =
    previousPrice !== undefined && price !== undefined
      ? price >= previousPrice
      : true;

  return (
    <div className="card">
      <h3 style={{ marginBottom: "6px" }}>{stock}</h3>

      {price !== undefined ? (
        <div
          style={{
            color: isUp ? "var(--green)" : "var(--red)",
            fontSize: "20px",
            fontWeight: 700,
            marginBottom: "8px",
          }}
        >
          {isUp ? "▲" : "▼"} ₹{price}
        </div>
      ) : (
        <div style={{ color: "var(--text-muted)" }}>Loading...</div>
      )}

      {/* Sparkline */}
      <svg width="100%" height="50">
        {history.map((p, i) => {
          if (i === 0) return null;
          const x1 = ((i - 1) / history.length) * 260;
          const x2 = (i / history.length) * 260;
          const y1 = 50 - history[i - 1] / 25;
          const y2 = 50 - p / 25;

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="2"
            />
          );
        })}
      </svg>

      <div
        style={{
          marginTop: "8px",
          fontSize: "12px",
          color: "var(--text-muted)",
        }}
      >
        Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
}
