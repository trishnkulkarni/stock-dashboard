// src/components/Sparkline.js
import React, { useEffect, useRef, useState } from "react";

function Sparkline({ currentPrice, stock }) {
  const canvasRef = useRef(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory((prev) => {
      const updated = [...prev, currentPrice];
      return updated.slice(-20); // keep last 20 values
    });
  }, [currentPrice]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || history.length < 2) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const max = Math.max(...history);
    const min = Math.min(...history);

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = history[history.length - 1] >= history[0] ? "var(--green)" : "var(--red)";

    history.forEach((val, i) => {
      const x = (i / (history.length - 1)) * width;
      const y = height - ((val - min) / (max - min)) * height;

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.stroke();
  }, [history]);

  return <canvas ref={canvasRef} width={180} height={50} />;
}

export default Sparkline;
