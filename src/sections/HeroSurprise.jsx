import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

export default function HeroSurprise({ onOpen }) {
  return (
    <section className="relative z-10 grid min-h-screen place-items-center px-5 text-center">
      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }} className="max-w-4xl">
        <p className="mb-5 text-xs uppercase tracking-[0.5em] text-gold">For {siteConfig.herName}</p>
        <h1 className="font-display text-5xl leading-tight md:text-8xl">{siteConfig.projectTitle}</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/70">{siteConfig.mainMessage}</p>
        <motion.button
          className="mt-10 inline-flex items-center gap-3 rounded-full border border-rose/50 bg-rose/15 px-8 py-4 text-sm font-semibold uppercase tracking-[0.26em] text-white shadow-glow backdrop-blur-xl"
          whileHover={{ scale: 1.04, boxShadow: "0 0 52px rgba(255,61,119,.58)" }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpen}
        >
          <Sparkles size={18} /> Open Your Surprise
        </motion.button>
      </motion.div>
    </section>
  );
}
