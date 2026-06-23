import { useState } from "react";
import SectionHeader from "../components/SectionHeader";
import { siteConfig } from "../data/siteConfig";

export default function PhotoGallery() {
  const [active, setActive] = useState(null);
  return (
    <section className="relative z-10 px-5 py-20">
      <SectionHeader eyebrow="Gallery" title="A scrapbook of soft moments" />
      <div className="mx-auto columns-1 gap-5 sm:columns-2 lg:columns-3">
        {siteConfig.gallery.map((photo, index) => (
          <button className="reveal polaroid mb-5 w-full break-inside-avoid" key={photo} onClick={() => setActive(photo)}>
            <img src={photo} alt={`Memory ${index + 1}`} loading="lazy" decoding="async" />
            <span>Memory #{index + 1}</span>
          </button>
        ))}
      </div>
      {active && (
        <div className="modal-backdrop" onClick={() => setActive(null)}>
          <img className="zoomed-photo" src={active} alt="" />
        </div>
      )}
    </section>
  );
}
