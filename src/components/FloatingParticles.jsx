import { motion } from "framer-motion";

const particles = Array.from({ length: 42 }, (_, index) => ({
  id: index,
  left: `${(index * 23) % 100}%`,
  delay: (index % 9) * 0.7,
  duration: 8 + (index % 7),
  symbol: index % 5 === 0 ? "♪" : index % 3 === 0 ? "✦" : "♥"
}));

export default function FloatingParticles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,61,119,.22),transparent_30%),radial-gradient(circle_at_82%_4%,rgba(255,211,111,.16),transparent_25%),radial-gradient(circle_at_50%_82%,rgba(255,142,179,.14),transparent_30%),linear-gradient(135deg,#10030a,#3a0717_48%,#080208)]" />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute bottom-[-40px] text-sm text-white/25"
          style={{ left: particle.left }}
          animate={{ y: "-110vh", x: [0, 18, -12, 0], opacity: [0, 0.85, 0] }}
          transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: "linear" }}
        >
          {particle.symbol}
        </motion.span>
      ))}
    </div>
  );
}
