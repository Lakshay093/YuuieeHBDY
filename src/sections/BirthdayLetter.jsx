import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import { siteConfig } from "../data/siteConfig";

export default function BirthdayLetter() {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const preview = siteConfig.letter.join(" ").slice(0, 170);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTyped(preview.slice(0, index));
      index += 1;
      if (index > preview.length) clearInterval(interval);
    }, 28);
    return () => clearInterval(interval);
  }, [preview]);

  return (
    <section id="letter" className="relative z-10 px-5 py-20">
      <SectionHeader eyebrow="Letter" title="Something I wanted to say" />
      <div className="reveal letter-paper mx-auto max-w-3xl">
        <p>{typed}</p>
        <button className="button mt-8" onClick={() => setOpen(true)}><Heart size={18} /> Read My Heart</button>
      </div>
      {open && (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <div className="letter-modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setOpen(false)}>Close</button>
            {siteConfig.letter.map((line) => <p key={line}>{line}</p>)}
          </div>
        </div>
      )}
    </section>
  );
}
