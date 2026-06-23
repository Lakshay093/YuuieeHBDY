import { motion } from "framer-motion";
import SectionHeader from "../components/SectionHeader";
import { siteConfig } from "../data/siteConfig";

export default function MemoryTimeline() {
  return (
    <section id="memories" className="relative z-10 px-5 py-20">
      <SectionHeader eyebrow="Memories" title="Little moments I kept" />
      <div className="mx-auto max-w-5xl">
        {siteConfig.memories.map((memory, index) => (
          <motion.article key={memory.title} className="reveal timeline-card" whileHover={{ y: -4 }}>
            <div className="timeline-dot" />
            <motion.img
              src={memory.image}
              alt=""
              loading="lazy"
              decoding="async"
              initial={{ filter: "blur(14px)", opacity: 0.58, scale: 1.04 }}
              whileInView={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
              transition={{ duration: 1.05, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.45 }}
            />
            <div>
              <p className="text-sm text-gold">{memory.date}</p>
              <h3 className="mt-2 font-display text-3xl">{memory.title}</h3>
              <p className="mt-3 text-white/66">{memory.message}</p>
            </div>
            <span className="timeline-number">{String(index + 1).padStart(2, "0")}</span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
