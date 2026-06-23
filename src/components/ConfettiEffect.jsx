import confetti from "canvas-confetti";

export function burstConfetti() {
  const options = { particleCount: 80, spread: 72, startVelocity: 36, scalar: 0.9 };
  confetti({ ...options, origin: { x: 0.18, y: 0.72 }, colors: ["#ff3d77", "#ffd36f", "#fff4f8"] });
  confetti({ ...options, origin: { x: 0.82, y: 0.72 }, colors: ["#ffc2d6", "#c91f58", "#ffd36f"] });
}
