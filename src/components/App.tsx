"use client";

import { useEffect, useRef } from "react";
import { SmoothScroll } from "@/lib/scroll";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Work } from "@/components/sections/Work";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function App() {
  const isReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (isReduced) return;
    
    // Global Reveal Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -15% 0px" });

    document.querySelectorAll(".rv, .rv-mask").forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isReduced]);

  return (
    <>
      <SmoothScroll />
      <Navigation />
      
      <main>
        <div id="hero"><Hero /></div>
        <div id="about"><About /></div>
        <div id="skills"><Skills /></div>
        <div id="work"><Work /></div>
        <div id="experience"><Experience /></div>
        <div id="contact"><Contact /></div>
      </main>
    </>
  );
}
