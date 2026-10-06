"use client";

import { useRef, useEffect, useState } from "react";
import { TIMELINE } from "@/lib/data";
import { useScrollProgress } from "@/lib/hooks";

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress from when the top of the section enters the bottom of the screen
      // to when the bottom of the section leaves the top of the screen.
      // But for a spine, we want it to start when the top reaches the middle of the screen
      const start = rect.top - windowHeight * 0.6;
      const end = rect.height;
      
      let p = -start / end;
      p = Math.max(0, Math.min(1, p));
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // init
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="section-container" ref={sectionRef}>
      <style>{`
        .exp-header {
          margin-bottom: 80px;
        }

        .timeline {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          padding-block: 40px;
        }
        
        .timeline-spine {
          position: absolute;
          left: 16px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--line);
        }
        @media (min-width: 768px) {
          .timeline-spine {
            left: 50%;
            transform: translateX(-50%);
          }
        }
        
        .timeline-progress {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          background: var(--ink);
          transform-origin: top;
          transition: transform 0.1s linear;
        }

        .timeline-item {
          position: relative;
          margin-bottom: 64px;
          width: 100%;
          display: flex;
          justify-content: flex-end;
          padding-left: 48px;
        }
        @media (min-width: 768px) {
          .timeline-item {
            width: 50%;
            padding-left: 0;
          }
          .timeline-item:nth-child(odd) {
            justify-content: flex-end;
            padding-right: 48px;
          }
          .timeline-item:nth-child(even) {
            margin-left: 50%;
            justify-content: flex-start;
            padding-left: 48px;
          }
        }

        .timeline-dot {
          position: absolute;
          left: 16px;
          top: 0;
          transform: translateX(-50%);
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--paper);
          border: 2px solid var(--line);
          z-index: 2;
          transition: border-color 0.4s var(--ease), background 0.4s var(--ease);
        }
        @media (min-width: 768px) {
          .timeline-dot {
            left: 100%;
          }
          .timeline-item:nth-child(even) .timeline-dot {
            left: 0;
          }
        }
        
        .timeline-item.is-active .timeline-dot {
          border-color: var(--ink);
          background: var(--ink);
        }

        .timeline-content {
          background: var(--card);
          padding: 32px;
          border-radius: 24px;
          box-shadow: inset 0 0 0 1px var(--line);
          width: 100%;
          transition: transform 0.4s var(--ease), box-shadow 0.4s var(--ease), opacity 0.4s var(--ease);
          opacity: 0.5;
          transform: translateY(10px);
        }
        .timeline-item.is-active .timeline-content {
          opacity: 1;
          transform: translateY(0);
          box-shadow: inset 0 0 0 1px var(--line), 0 12px 32px -12px rgba(0,0,0,0.05);
        }

        .timeline-year {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--mute);
          margin-bottom: 8px;
        }
        .timeline-title {
          font-size: 20px;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.01em;
          margin-bottom: 4px;
        }
        .timeline-place {
          font-size: 14px;
          color: var(--ink-2);
          font-weight: 500;
          margin-bottom: 16px;
        }
        .timeline-detail {
          font-size: 14px;
          color: var(--mute);
          line-height: 1.5;
        }

        .timeline-next {
          background: transparent;
          border: 1px dashed var(--mute);
          box-shadow: none;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 32px;
          text-align: center;
          cursor: pointer;
        }
        .timeline-next:hover {
          background: var(--card);
          border-style: solid;
        }
        .next-text {
          font-family: var(--font-serif);
          font-size: 24px;
          color: var(--ink);
        }
      `}</style>

      <div className="exp-header">
        <div className="section-tag rv">04 — Experience</div>
        <h2 className="h2-heading rv" style={{ '--i': 1 } as any}>
          My <i>journey.</i>
        </h2>
      </div>

      <div className="timeline">
        <div className="timeline-spine">
          <div 
            className="timeline-progress" 
            style={{ height: '100%', transform: `scaleY(${progress})` }} 
          />
        </div>

        {TIMELINE.map((item, i) => {
          // Determine if this item should be lit based on progress
          const itemProgressThreshold = i / (TIMELINE.length + 1);
          const isActive = progress > itemProgressThreshold;

          return (
            <div key={i} className={`timeline-item ${isActive ? 'is-active' : ''}`}>
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-title">{item.title}</div>
                <div className="timeline-place">{item.place}</div>
                {item.detail && <div className="timeline-detail">{item.detail}</div>}
              </div>
            </div>
          );
        })}

        <div className={`timeline-item ${progress > 0.9 ? 'is-active' : ''}`}>
          <div className="timeline-dot" />
          <a href="#contact" className="timeline-content timeline-next">
            <span className="next-text">Next — Your team?</span>
          </a>
        </div>
      </div>
    </section>
  );
}
