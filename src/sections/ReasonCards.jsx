import { useState } from "react";
import SectionHeader from "../components/SectionHeader";
import { siteConfig } from "../data/siteConfig";

export default function ReasonCards() {
  const [flipped, setFlipped] = useState({});
  return (
    <section className="relative z-10 px-5 py-20">
      <SectionHeader eyebrow="Reasons" title="Twenty reasons you are special" />
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {siteConfig.reasons.map((reason, index) => (
          <button
            className={`reveal flip-card ${flipped[index] ? "is-flipped" : ""}`}
            key={reason}
            onClick={() => setFlipped((state) => ({ ...state, [index]: !state[index] }))}
            aria-label={`Reason ${index + 1}`}
          >
            <span className="flip-face flip-front">Reason #{index + 1}</span>
            <span className="flip-face flip-back">{reason}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
