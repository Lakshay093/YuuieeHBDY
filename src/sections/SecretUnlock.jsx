import { useState } from "react";
import { Lock, Unlock } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import { siteConfig } from "../data/siteConfig";

export default function SecretUnlock() {
  const [answer, setAnswer] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");

  const check = () => {
    const normalized = answer.trim().toLowerCase();
    if (siteConfig.secretAnswers.includes(normalized)) {
      setUnlocked(true);
      setError("");
    } else {
      setError("Almost. Try the sweetest answer.");
    }
  };

  return (
    <section id="secret" className="relative z-10 px-5 py-20">
      <SectionHeader eyebrow="Secret" title="A locked little surprise" />
      <div className="reveal glass mx-auto max-w-3xl p-7 text-center">
        {unlocked ? (
          <div>
            <Unlock className="mx-auto text-gold" size={34} />
            <h3 className="mt-4 font-display text-4xl">You found it</h3>
            <p className="mx-auto mt-4 max-w-xl text-white/68">This one is my favorite, Yuuiee. If I could save one thing from today, it would be the thought of you smiling while reading this.</p>
            <div className="secret-frame">
              <img src="/images/secret-surprise.png" alt="A magical birthday portrait" loading="lazy" decoding="async" />
            </div>
            <p className="secret-caption">I hope this made you smile, even a little.</p>
          </div>
        ) : (
          <div>
            <Lock className="mx-auto text-gold" size={34} />
            <p className="mt-5 text-xl">What is the cutest thing about you?</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <input className="secret-input" value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="smile, eyes, everything..." />
              <button className="button justify-center" onClick={check}>Unlock</button>
            </div>
            {error && <p className="mt-3 text-sm text-blush">{error}</p>}
          </div>
        )}
      </div>
    </section>
  );
}
