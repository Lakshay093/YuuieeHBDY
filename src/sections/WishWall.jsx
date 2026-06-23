import SectionHeader from "../components/SectionHeader";
import { siteConfig } from "../data/siteConfig";

export default function WishWall() {
  return (
    <section className="relative z-10 px-5 py-20">
      <SectionHeader eyebrow="Wishes" title="Things I hope find you" />
      <div className="wish-wall mx-auto max-w-6xl">
        {siteConfig.wishes.map((wish, index) => (
          <span className="wish-bubble reveal" style={{ animationDelay: `${index * 0.35}s` }} key={wish}>
            {wish}
          </span>
        ))}
      </div>
    </section>
  );
}
