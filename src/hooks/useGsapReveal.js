import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal(selector = ".reveal") {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(selector).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 56 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%" }
          }
        );
      });
    });
    return () => ctx.revert();
  }, [selector]);
}
