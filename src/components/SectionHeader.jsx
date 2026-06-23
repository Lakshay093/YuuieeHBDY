export default function SectionHeader({ eyebrow, title, children }) {
  return (
    <div className="reveal mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 text-xs uppercase tracking-[0.45em] text-gold">{eyebrow}</p>
      <h2 className="font-display text-4xl text-white md:text-6xl">{title}</h2>
      {children && <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/68">{children}</p>}
    </div>
  );
}
