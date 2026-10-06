"use client";

import { useState } from "react";
import { PROJECTS } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";

export function Work() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="section-container">
      <style>{`
        .work-header {
          margin-bottom: 48px;
        }
        
        .gallery-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          height: auto;
        }
        @media (min-width: 1024px) {
          .gallery-container {
            flex-direction: row;
            height: min(78svh, 600px);
          }
        }

        .panel {
          position: relative;
          background: var(--card);
          border-radius: 24px;
          box-shadow: inset 0 0 0 1px var(--line);
          overflow: hidden;
          transition: flex 0.6s var(--ease), background 0.3s var(--ease);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          min-height: 80px;
        }
        @media (min-width: 1024px) {
          .panel {
            flex-direction: row;
            flex: 1;
            min-height: auto;
          }
          .panel.is-active {
            flex: 8;
            cursor: default;
            box-shadow: inset 0 0 0 1px var(--line), 0 24px 48px -12px rgba(0,0,0,0.08);
          }
        }
        /* Mobile active state */
        @media (max-width: 1023px) {
          .panel.is-active {
            height: auto;
            cursor: default;
            box-shadow: inset 0 0 0 1px var(--line), 0 24px 48px -12px rgba(0,0,0,0.08);
          }
          .panel:not(.is-active) .panel-content {
            display: none;
          }
        }

        .spine {
          padding: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: opacity 0.3s var(--ease);
        }
        @media (min-width: 1024px) {
          .spine {
            position: absolute;
            inset: 0;
            flex-direction: column;
            padding: 32px 24px;
          }
          .panel.is-active .spine {
            opacity: 0;
            pointer-events: none;
          }
        }
        
        .spine-num {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--mute);
        }
        .spine-title {
          font-size: 18px;
          font-weight: 600;
          white-space: nowrap;
        }
        @media (min-width: 1024px) {
          .spine-title {
            writing-mode: vertical-rl;
            transform: rotate(180deg);
          }
        }
        .spine-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid var(--line);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ink);
          transition: transform 0.3s var(--ease), background 0.3s var(--ease);
        }
        .panel:hover .spine-btn {
          transform: rotate(90deg);
          background: var(--soft);
        }

        .panel-content {
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s var(--ease);
          transition-delay: 0s;
        }
        .panel.is-active .panel-content {
          opacity: 1;
          pointer-events: auto;
          transition-delay: 0.3s;
        }
        @media (min-width: 1024px) {
          .panel-content {
            position: absolute;
            inset: 0;
            flex-direction: row;
            padding: 48px;
            gap: 48px;
          }
        }

        .panel-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 300px;
        }
        .panel-kicker {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--mute);
          text-transform: uppercase;
          margin-bottom: 16px;
          display: flex;
          gap: 8px;
        }
        .panel-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 24px;
        }
        .panel-desc {
          font-size: 16px;
          line-height: 1.6;
          color: var(--mute);
          margin-bottom: 32px;
        }
        
        .panel-features {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-bottom: 32px;
        }
        @media (min-width: 640px) {
          .panel-features {
            grid-template-columns: 1fr 1fr;
          }
        }
        .panel-feature {
          font-size: 14px;
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }
        .panel-feature::before {
          content: '✓';
          color: var(--mute);
        }

        .panel-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: auto;
          margin-bottom: 32px;
        }
        .tech-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .panel-right {
          flex: 1.2;
          background: var(--paper);
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          box-shadow: inset 0 0 0 1px var(--line);
        }
        /* Clip path wipe reveal */
        .panel.is-active .panel-right {
          animation: wipe 0.8s var(--ease) forwards;
          animation-delay: 0.2s;
          clip-path: inset(0 100% 0 0);
        }
        @keyframes wipe {
          to { clip-path: inset(0 0 0 0); }
        }

        .ui-label {
          position: absolute;
          top: 16px;
          right: 16px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--mute);
          text-transform: uppercase;
          background: rgba(255,255,255,0.8);
          padding: 4px 8px;
          border-radius: 4px;
          backdrop-filter: blur(4px);
        }

        /* Illustrative UIs in pure CSS */
        .ui-wireframe {
          width: 80%;
          height: 80%;
          border: 2px solid var(--line);
          border-radius: 8px;
          background: #fff;
          display: flex;
          flex-direction: column;
          padding: 16px;
          gap: 16px;
          opacity: 0.8;
          filter: grayscale(100%);
        }
        .ui-header {
          height: 24px;
          background: var(--soft);
          border-radius: 4px;
          width: 40%;
        }
        .ui-row {
          display: flex;
          gap: 16px;
        }
        .ui-box {
          height: 64px;
          background: var(--soft);
          border-radius: 4px;
          flex: 1;
        }
        .ui-lines {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 2;
        }
        .ui-line {
          height: 12px;
          background: var(--soft);
          border-radius: 4px;
        }
      `}</style>

      <div className="work-header">
        <div className="section-tag rv">03 — Selected work</div>
        <h2 className="h2-heading rv" style={{ '--i': 1 } as any}>
          Things I've <i>built.</i>
        </h2>
      </div>

      <div className="gallery-container rv" style={{ '--i': 2 } as any}>
        {PROJECTS.map((proj, i) => {
          const isActive = activeIndex === i;
          return (
            <div 
              key={proj.id}
              className={`panel ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveIndex(i)}
              onFocus={() => setActiveIndex(i)}
              tabIndex={0}
            >
              <div className="spine">
                <span className="spine-num">{proj.index}</span>
                <span className="spine-title">{proj.title}</span>
                <div className="spine-btn">+</div>
              </div>

              <div className="panel-content">
                <div className="panel-left">
                  <div className="panel-kicker">
                    <span>{proj.index}</span>
                    <span>/</span>
                    <span>{proj.kicker}</span>
                  </div>
                  <h3 className="panel-title">{proj.title}</h3>
                  <p className="panel-desc">{proj.description}</p>
                  
                  <div className="panel-features">
                    {proj.features.map(f => (
                      <div key={f} className="panel-feature">{f}</div>
                    ))}
                  </div>

                  <div className="panel-tech">
                    {proj.tech.map(t => {
                      // Map tech name to devicon name if needed, or use TechLogo logic
                      let searchName = t;
                      if (t.includes("MERN")) searchName = "MongoDB";
                      return (
                        <div key={t} className="tech-chip">
                          <TechLogo name={searchName} size={14} />
                          {t}
                        </div>
                      );
                    })}
                  </div>

                  {proj.github && (
                    <div>
                      <a href={proj.github} target="_blank" rel="noreferrer" className="btn-secondary">
                        View on GitHub ↗
                      </a>
                    </div>
                  )}
                </div>

                <div className="panel-right">
                  <div className="ui-label">Illustrative UI</div>
                  
                  {/* Generic wireframe UI */}
                  <div className="ui-wireframe">
                    <div className="ui-header" />
                    <div className="ui-row">
                      <div className="ui-box" />
                      <div className="ui-lines">
                        <div className="ui-line" style={{ width: '100%' }} />
                        <div className="ui-line" style={{ width: '80%' }} />
                        <div className="ui-line" style={{ width: '60%' }} />
                      </div>
                    </div>
                    <div className="ui-row">
                      <div className="ui-box" />
                      <div className="ui-lines">
                        <div className="ui-line" style={{ width: '90%' }} />
                        <div className="ui-line" style={{ width: '70%' }} />
                        <div className="ui-line" style={{ width: '50%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
