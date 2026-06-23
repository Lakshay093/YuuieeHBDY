import { useState } from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "../components/SectionHeader";
import { siteConfig } from "../data/siteConfig";
import { burstConfetti } from "../components/ConfettiEffect";

export default function FinalSurprise() {
  const [open, setOpen] = useState(false);

  const reveal = () => {
    if (!open) setOpen(true);
    burstConfetti();
    setTimeout(burstConfetti, 500);
  };

  return (
    <section id="final" className="relative z-10 min-h-screen px-5 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,211,111,.24),transparent_28%),radial-gradient(circle_at_50%_62%,rgba(255,61,119,.2),transparent_32%),linear-gradient(180deg,transparent,#4b0a20)]" />
      <div className="relative mx-auto grid min-h-[78vh] max-w-5xl place-items-center text-center">
        <div>
          <SectionHeader eyebrow="Finale" title="One last page" />
          <p className="reveal mx-auto max-w-3xl font-display text-3xl leading-tight text-white/88 md:text-5xl">{siteConfig.finalMessage}</p>
          <button className="button mx-auto mt-10" onClick={reveal}>
            <Sparkles size={18} /> One Last Thing...
          </button>
          {open && (
            <motion.div initial={{ opacity: 0, y: 35, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="mt-12">
              <h2 className="font-display text-5xl text-gold md:text-8xl">{siteConfig.finalReveal} &hearts;</h2>
              <a className="mt-8 inline-block text-sm text-blush underline" href={`${window.location.origin}${window.location.pathname}#final`}>
                Share this final moment
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
