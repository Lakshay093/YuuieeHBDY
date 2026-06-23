import { useEffect, useRef, useState } from "react";

const symbols = ["\u2726", "\u2665", "\u2736"];

export default function CursorSparkles() {
  const [sparkles, setSparkles] = useState([]);
  const idRef = useRef(0);
  const lastMoveRef = useRef(0);

  useEffect(() => {
    const addSparkle = (x, y, burst = false) => {
      const count = burst ? 5 : 1;
      const next = Array.from({ length: count }, (_, index) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = burst ? 16 + Math.random() * 30 : 8 + Math.random() * 14;
        return {
          id: idRef.current++,
          x,
          y,
          dx: Math.cos(angle) * distance,
          dy: Math.sin(angle) * distance,
          symbol: symbols[(idRef.current + index) % symbols.length],
          size: burst ? 14 + Math.random() * 8 : 10 + Math.random() * 5
        };
      });

      setSparkles((items) => [...items.slice(-28), ...next]);
      window.setTimeout(() => {
        setSparkles((items) => items.filter((item) => !next.some((sparkle) => sparkle.id === item.id)));
      }, 780);
    };

    const onPointerMove = (event) => {
      const now = performance.now();
      if (now - lastMoveRef.current < 95) return;
      lastMoveRef.current = now;
      addSparkle(event.clientX, event.clientY);
    };

    const onPointerDown = (event) => {
      addSparkle(event.clientX, event.clientY, true);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <div className="cursor-sparkles" aria-hidden="true">
      {sparkles.map((sparkle) => (
        <span
          className="cursor-sparkle"
          key={sparkle.id}
          style={{
            "--x": `${sparkle.x}px`,
            "--y": `${sparkle.y}px`,
            "--dx": `${sparkle.dx}px`,
            "--dy": `${sparkle.dy}px`,
            "--size": `${sparkle.size}px`
          }}
        >
          {sparkle.symbol}
        </span>
      ))}
    </div>
  );
}
