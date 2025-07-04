"use client";

import { useEffect, useRef } from "react";

export default function EnhancedBinaryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Binary rain configuration
    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = Array(columns).fill(0);
    const chars = "01";

    // Colors matching your theme
    const colors = ["#11B55F", "#09302E", "#1D5047"];

    const draw = () => {
      // Create trailing effect
      ctx.fillStyle = "rgba(2, 10, 9, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text properties
      ctx.font = "14px monospace";

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)];

        // Random color from theme
        const color = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillStyle = color;

        // Add glow effect
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;

        // Draw character
        const x = i * 20;
        const y = drops[i] * 20;
        ctx.fillText(char, x, y);

        // Reset drop if it goes off screen or randomly
        if (y > canvas.height || Math.random() > 0.99) {
          drops[i] = 0;
        } else {
          drops[i]++;
        }
      }

      // Reset shadow
      ctx.shadowBlur = 0;
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-2000] opacity-60"
    />
  );
}
