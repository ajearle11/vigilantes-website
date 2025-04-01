"use client"
import { useEffect, useRef } from "react";

const useStarfieldCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;
    canvas.style.imageRendering = "pixelated";

    let width = window.innerWidth;
    let height = window.innerHeight;

    let stars: { x: number; y: number; z: number }[] = [];

    const initStars = () => {
      stars = [];
      for (let i = 0; i < 100; i++) {
        stars.push({
          x: Math.random() * width - width / 2,
          y: Math.random() * height - height / 2,
          z: Math.random() * width,
        });
      }
    };

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initStars();
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const draw = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, width, height);

      for (const star of stars) {
        star.z -= 2 + Math.random();
        if (star.z <= 0) star.z = width;

        const k = 128.0 / star.z;
        const x = star.x * k + width / 2;
        const y = star.y * k + height / 2;

        if (x >= 0 && x <= width && y >= 0 && y <= height) {
          const size = (1 - star.z / width) * 2;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
          ctx.fill();
        }
      }
    };

    const interval = setInterval(draw, 1000 / 120);
    draw();

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return canvasRef;
};

export default useStarfieldCanvas