import { useEffect } from "react";
import { motion } from "framer-motion";

const stars = Array.from({ length: 16 }, (_, index) => ({
  id: index,
  angle: (index / 16) * 360,
  delay: (index % 5) * 0.12
}));

export default function OpeningTransition({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1150);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <section className="opening-transition relative z-10 grid min-h-screen place-items-center px-5 text-center">
      <motion.div
        className="opening-orbit"
        initial={{ opacity: 0, scale: 0.82 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {stars.map((star) => (
          <span
            className="opening-star"
            key={star.id}
            style={{ "--angle": `${star.angle}deg`, "--delay": `${star.delay}s` }}
          />
        ))}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          Assembling Yuuiee's little universe...
        </motion.p>
      </motion.div>
    </section>
  );
}
