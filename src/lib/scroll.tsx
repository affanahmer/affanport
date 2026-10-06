"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export let lenis: Lenis | null = null;

export function SmoothScroll() {
  useEffect(() => {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return null;
}

export const scrollToTarget = (target: string) => {
  lenis?.scrollTo(target, { offset: -100 });
};
