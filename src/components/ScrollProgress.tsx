import { useEffect, useRef } from "react";

/**
 * Thin accent-colored progress bar fixed at the very top of the viewport.
 * Uses direct DOM manipulation (no React state) so it never triggers re-renders.
 */
const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 z-[200] h-[2px] w-full bg-accent origin-left"
      style={{
        transform: "scaleX(0)",
        boxShadow: "0 0 8px hsl(51 93% 57% / 0.7)",
        transition: "none",
      }}
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;