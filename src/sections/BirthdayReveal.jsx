import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Gift, Images, Music2 } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { burstConfetti } from "../components/ConfettiEffect";

const revealKeepsakes = [
  { icon: Music2, label: "A birthday song", detail: "playing softly in the background" },
  { icon: Images, label: "Six memories", detail: "saved for Yuuiee like tiny stars" },
  { icon: Gift, label: "One secret", detail: "waiting for the sweetest answer" }
];

const orbitStars = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  angle: index * 36,
  delay: (index % 5) * 0.18
}));

export default function BirthdayReveal({ onComplete }) {
  const [count, setCount] = useState(3);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const timer = setTimeout(() => {
      if (count > 1) setCount(count - 1);
      else {
        setDone(true);
        burstConfetti();
        onComplete();
      }
    }, 850);
    return () => clearTimeout(timer);
  }, [count, done, onComplete]);

  return (
    <section id="birthday" className="birthday-reveal-section relative z-10 grid min-h-screen place-items-center px-5 text-center">
      {!done ? (
        <motion.div key={count} initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="font-display text-8xl text-gold">
          {count}
        </motion.div>
      ) : (
        <motion.div className="birthday-reveal-content" initial={{ opacity: 0, scale: 0.86 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
          <p className="text-xs uppercase tracking-[0.5em] text-gold">Today the sky has a reason</p>
          <div className="reveal-title-wrap">
            {orbitStars.map((star) => (
              <span
                className="reveal-orbit-star"
                key={star.id}
                style={{ "--angle": `${star.angle}deg`, "--delay": `${star.delay}s` }}
                aria-hidden="true"
              />
            ))}
            <h1 className="mt-4 font-display text-5xl md:text-8xl">{siteConfig.revealMessage} <span className="text-rose">&hearts;</span></h1>
          </div>
          <div className="reveal-constellation">
            <p className="reveal-note">This little universe opens for Yuuiee with music, memories, and a secret made only for her.</p>
            <div className="reveal-keepsakes">
              {revealKeepsakes.map(({ icon: Icon, label, detail }) => (
                <div className="reveal-keepsake" key={label}>
                  <Icon size={20} />
                  <strong>{label}</strong>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
