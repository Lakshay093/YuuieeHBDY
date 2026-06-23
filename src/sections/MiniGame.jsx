import { useEffect, useMemo, useState } from "react";
import { Gift } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import { getStored, setStored } from "../utils/storage";

export default function MiniGame() {
  const [score, setScore] = useState(0);
  const [unlocked, setUnlocked] = useState(() => getStored("heart_game_unlocked"));
  const hearts = useMemo(() => Array.from({ length: 12 }, (_, index) => index), []);

  useEffect(() => {
    if (score >= 8) {
      setUnlocked(true);
      setStored("heart_game_unlocked", true);
    }
  }, [score]);

  return (
    <section className="relative z-10 px-5 py-20">
      <SectionHeader eyebrow="Game" title="Catch the hidden hearts">
        Tap the falling hearts before they disappear. A tiny secret opens when you collect enough.
      </SectionHeader>
      <div className="reveal game-stage mx-auto">
        {hearts.map((heart) => (
          <button
            key={heart}
            className="falling-heart"
            style={{ left: `${8 + heart * 7}%`, animationDelay: `${(heart % 6) * 0.7}s`, animationDuration: `${5 + (heart % 4)}s` }}
            onClick={(event) => {
              event.currentTarget.style.display = "none";
              setScore((value) => value + 1);
            }}
            aria-label="Catch heart"
          >
            ♥
          </button>
        ))}
        <div className="game-score"><Gift size={18} /> {score}/8</div>
        {unlocked && <div className="game-message">You found all the love I kept hidden for you ♥</div>}
      </div>
    </section>
  );
}
