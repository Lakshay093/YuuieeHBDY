import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { siteConfig } from "./data/siteConfig";
import { useGsapReveal } from "./hooks/useGsapReveal";
import { useScrollProgress } from "./hooks/useScrollProgress";
import CursorSparkles from "./components/CursorSparkles";
import FloatingParticles from "./components/FloatingParticles";
import OpeningTransition from "./components/OpeningTransition";
import HeroSurprise from "./sections/HeroSurprise";
import BirthdayReveal from "./sections/BirthdayReveal";
import MemoryTimeline from "./sections/MemoryTimeline";
import ReasonCards from "./sections/ReasonCards";
import BirthdayLetter from "./sections/BirthdayLetter";
import MiniGame from "./sections/MiniGame";
import SecretUnlock from "./sections/SecretUnlock";
import PhotoGallery from "./sections/PhotoGallery";
import WishWall from "./sections/WishWall";
import FinalSurprise from "./sections/FinalSurprise";

export default function App() {
  const [entered, setEntered] = useState(false);
  const [opening, setOpening] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [muted, setMuted] = useState(false);
  const progress = useScrollProgress();
  const audioRef = useRef(null);

  useGsapReveal();

  const playBirthdaySong = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.68;
    audio.play().catch(() => {});
  };

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = muted;
    audioRef.current.volume = 0.68;
  }, [muted]);

  useEffect(() => {
    if (entered) playBirthdaySong();
  }, [entered]);

  useEffect(() => {
    if (!entered) return;
    const resumeSong = () => playBirthdaySong();
    window.addEventListener("pointerdown", resumeSong, { once: true });
    window.addEventListener("keydown", resumeSong, { once: true });
    return () => {
      window.removeEventListener("pointerdown", resumeSong);
      window.removeEventListener("keydown", resumeSong);
    };
  }, [entered]);

  const handleOpen = () => {
    setOpening(true);
    playBirthdaySong();
  };

  const completeOpening = () => {
    setEntered(true);
    setOpening(false);
    playBirthdaySong();
  };

  const toggleMuted = () => {
    setMuted((value) => !value);
    playBirthdaySong();
  };

  return (
    <main className="min-h-screen overflow-hidden bg-night text-white">
      <FloatingParticles />
      <CursorSparkles />
      <div className="fixed left-0 top-0 z-50 h-1 bg-rose shadow-glow" style={{ width: `${progress * 100}%` }} />
      <button
        className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/10 text-blush backdrop-blur-xl transition hover:border-rose hover:text-white"
        onClick={toggleMuted}
        aria-label={muted ? "Unmute ambient audio" : "Mute ambient audio"}
      >
        {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
      {siteConfig.localFallbackTrack.src && (
        <audio ref={audioRef} src={siteConfig.localFallbackTrack.src} loop preload="none" playsInline />
      )}

      {!entered && opening ? (
        <OpeningTransition onComplete={completeOpening} />
      ) : !entered ? (
        <HeroSurprise onOpen={handleOpen} />
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <BirthdayReveal onComplete={() => setRevealed(true)} />
          {revealed && (
            <>
              <MemoryTimeline />
              <ReasonCards />
              <BirthdayLetter />
              <MiniGame />
              <SecretUnlock />
              <PhotoGallery />
              <WishWall />
              <FinalSurprise />
              <footer className="site-footer">
                <span>
                  Made by Lakshay <span className="site-footer-heart" aria-hidden="true">&hearts;</span>
                </span>
                <span className="site-footer-note">It took 178 hours to make this universe for u.</span>
                <svg className="footer-heartbeat" viewBox="0 0 180 26" aria-hidden="true" focusable="false">
                  <path
                    className="footer-heartbeat-glow"
                    d="M2 15 H30 L38 11 L47 17 L58 3 L68 24 L78 15 H105 L113 12 L122 18 L133 4 L143 24 L153 15 H178"
                  />
                  <path
                    className="footer-heartbeat-line"
                    d="M2 15 H30 L38 11 L47 17 L58 3 L68 24 L78 15 H105 L113 12 L122 18 L133 4 L143 24 L153 15 H178"
                  />
                </svg>
              </footer>
            </>
          )}
        </motion.div>
      )}
    </main>
  );
}
