// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import StockCard from "./StockCard";
import ThemeToggle from "./ThemeToggle";
import socket from "../socket";

const SUPPORTED_STOCKS = ["GOOG", "TSLA", "AMZN", "META", "NVDA"];

function Dashboard({ email, setEmail }) {
  const [subscribed, setSubscribed] = useState([]);
  const [prices, setPrices] = useState({});
  const [previousPrices, setPreviousPrices] = useState({});

  useEffect(() => {
    // Login once when dashboard loads
    socket.emit("login", email);

    const handleLoginSuccess = (stocks) => {
      setSubscribed(stocks || []);
    };

    const handleSubscribedStocks = (stocks) => {
      setSubscribed(stocks || []);
    };

    const handlePriceUpdate = (newPrices) => {
      setPreviousPrices((prev) => prices);
      setPrices(newPrices);
    };

    socket.on("login_success", handleLoginSuccess);
    socket.on("subscribed_stocks", handleSubscribedStocks);
    socket.on("price_update", handlePriceUpdate);

    return () => {
      socket.off("login_success", handleLoginSuccess);
      socket.off("subscribed_stocks", handleSubscribedStocks);
      socket.off("price_update", handlePriceUpdate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  return (
    <div style={{ padding: "25px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "700" }}>
            Stock Trading Terminal
          </h1>
          <div
            style={{
              color: "var(--text-muted)",
              fontSize: "14px",
              marginTop: "4px",
            }}
          >
            Logged in as <b>{email}</b>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <ThemeToggle />

          <button
            onClick={() => setEmail(null)}
            style={{
              padding: "8px 14px",
              borderRadius: "10px",
              border: "1px solid var(--border)",
              background: "var(--card-bg)",
              color: "var(--text)",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* SUBSCRIBE / UNSUBSCRIBE */}
      <div className="card" style={{ marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "10px" }}>Subscribe to Stocks</h3>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {SUPPORTED_STOCKS.map((stock) => {
            const isSubscribed = subscribed.includes(stock);

            return (
              <button
                key={stock}
                onClick={() =>
                  isSubscribed
                    ? socket.emit("unsubscribe", { email, stock })
                    : socket.emit("subscribe", { email, stock })
                }
                style={{
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  background: isSubscribed ? "var(--red)" : "var(--card-bg)",
                  color: isSubscribed ? "#fff" : "var(--text)",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {isSubscribed ? `Unsubscribe ${stock}` : stock}
              </button>
            );
          })}
        </div>

        <p
          style={{
            marginTop: "10px",
            fontSize: "13px",
            color: "var(--text-muted)",
          }}
        >
          Prices update every 1 second (simulated).
        </p>
      </div>

      {/* STOCK CARDS */}
      <h3 style={{ marginBottom: "12px" }}>Your Subscriptions</h3>

      {subscribed.length === 0 ? (
        <div className="card" style={{ color: "var(--text-muted)" }}>
          No subscriptions yet — subscribe to a stock!
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "18px",
          }}
        >
          {subscribed.map((stock) => (
            <StockCard
              key={stock}
              stock={stock}
              price={prices[stock]}
              previousPrice={previousPrices[stock]}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
