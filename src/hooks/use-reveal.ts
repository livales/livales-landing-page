import { useEffect } from "react";

/**
 * Adds `is-visible` to `.reveal` elements once they reach the viewport.
 *
 * Checks on scroll/resize rather than with IntersectionObserver so that
 * elements skipped by a fast scroll or an anchor jump (which never
 * "intersect") are still revealed, and re-queries the DOM each time so
 * newly mounted or re-rendered elements are picked up too.
 * Call once at page level; elements can set `--reveal-delay` for staggering.
 */
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");
    (window as Window & { __revealReady?: boolean }).__revealReady = true;

    let frame = 0;
    const check = () => {
      frame = 0;
      const limit = window.innerHeight * 0.92;
      document
        .querySelectorAll<HTMLElement>(".reveal:not(.is-visible)")
        .forEach((el) => {
          // Anything in or above the viewport should be visible.
          if (el.getBoundingClientRect().top < limit) {
            el.classList.add("is-visible");
          }
        });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    check();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
    };
  }, []);
}
