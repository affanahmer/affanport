"use client";

import { useState } from "react";
import { SKILL_GROUPS } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";

type Skill = {
  name: string;
  symbol: string;
  family: string;
  projects: string[];
  number: number;
};

export function Skills() {
  const [activeFamily, setActiveFamily] = useState<string>("All");
  const [inspectedSkill, setInspectedSkill] = useState<Skill | null>(null);

  // Flatten and assign numbers
  const allSkills: Skill[] = [];
  let num = 1;
  SKILL_GROUPS.forEach(group => {
    group.skills.forEach(skill => {
      allSkills.push({
        ...skill,
        family: group.family,
        number: num++
      });
    });
  });

  const families = ["All", ...SKILL_GROUPS.map(g => g.family)];

  return (
    <section className="section-container" onMouseLeave={() => setInspectedSkill(null)}>
      <style>{`
        .skills-header {
          margin-bottom: 48px;
        }
        .filter-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 32px;
        }
        .chip {
          padding: 8px 16px;
          border-radius: 999px;
          border: 1px solid var(--line);
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s var(--ease);
          background: transparent;
          color: var(--mute);
        }
        .chip.active {
          background: var(--ink);
          color: var(--paper);
          border-color: var(--ink);
        }
        .chip:hover:not(.active) {
          background: var(--soft);
          color: var(--ink);
        }

        .skills-layout {
          display: flex;
          flex-direction: column;
          gap: 48px;
        }
        @media (min-width: 1024px) {
          .skills-layout {
            flex-direction: row;
            align-items: flex-start;
          }
        }

        .periodic-grid {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
        }
        @media (min-width: 768px) {
          .periodic-grid {
            grid-template-columns: repeat(6, minmax(0, 1fr));
          }
        }
        @media (min-width: 1024px) {
          .periodic-grid {
            grid-template-columns: repeat(8, minmax(0, 1fr));
          }
        }

        .element-tile {
          aspect-ratio: 1;
          background: var(--card);
          border-radius: 8px;
          padding: 8px;
          display: flex;
          flex-direction: column;
          box-shadow: inset 0 0 0 1px var(--line);
          cursor: pointer;
          transition: transform 0.2s var(--ease), box-shadow 0.2s var(--ease), opacity 0.3s var(--ease);
        }
        .element-tile.dimmed {
          opacity: 0.3;
          filter: grayscale(100%);
        }
        .element-tile:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: inset 0 0 0 1px var(--ink), 0 8px 24px rgba(0,0,0,0.08);
          z-index: 2;
        }
        
        .el-num {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--mute);
        }
        .el-sym {
          font-size: clamp(1.2rem, 2vw, 1.5rem);
          font-weight: 700;
          line-height: 1.1;
          margin-block: auto;
        }
        .el-name {
          font-size: 10px;
          color: var(--mute);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .inspector-panel {
          width: 100%;
          background: var(--card);
          border-radius: 24px;
          padding: 32px;
          box-shadow: inset 0 0 0 1px var(--line);
          position: sticky;
          top: 120px;
          min-height: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        @media (min-width: 1024px) {
          .inspector-panel {
            width: 320px;
            flex-shrink: 0;
          }
        }

        .inspector-empty {
          color: var(--mute);
          font-size: 14px;
        }
        
        .inspector-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          width: 100%;
          animation: pop 0.4s var(--ease);
        }
        @keyframes pop {
          0% { opacity: 0; transform: scale(0.9) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        .inspector-logo {
          width: 150px;
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .inspector-name {
          font-size: 24px;
          font-weight: 700;
        }
        .inspector-family {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--mute);
          text-transform: uppercase;
        }
        .inspector-projects {
          width: 100%;
          margin-top: 16px;
          padding-top: 24px;
          border-top: 1px dashed var(--line);
          text-align: left;
        }
        .inspector-projects h4 {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--mute);
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .inspector-projects ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .inspector-projects li {
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .inspector-projects li::before {
          content: '→';
          color: var(--mute);
        }
      `}</style>

      <div className="skills-header">
        <div className="section-tag rv">02 — Skills</div>
        <h2 className="h2-heading rv" style={{ '--i': 1 } as any}>
          The periodic table of my <i>stack.</i>
        </h2>

        <div className="filter-chips rv" style={{ '--i': 2 } as any}>
          {families.map(f => (
            <button 
              key={f}
              className={`chip ${activeFamily === f ? 'active' : ''}`}
              onClick={() => setActiveFamily(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="skills-layout">
        <div className="periodic-grid">
          {allSkills.map((skill, i) => {
            const isDimmed = activeFamily !== "All" && activeFamily !== skill.family;
            const cols = 8;
            const row = Math.floor(i / cols);
            const col = i % cols;
            // diagonal wave reveal
            const delay = (row + col) * 0.04;

            return (
              <div key={skill.name} className="rv" style={{ '--i': (row + col) * 0.4 } as any}>
                <div 
                  className={`element-tile ${isDimmed ? 'dimmed' : ''}`}
                  onMouseEnter={() => setInspectedSkill(skill)}
                  onFocus={() => setInspectedSkill(skill)}
                  tabIndex={0}
                >
                  <span className="el-num">{skill.number}</span>
                  <span className="el-sym">{skill.symbol}</span>
                  <span className="el-name">{skill.name}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="inspector-panel rv" style={{ '--i': 5 } as any}>
          {inspectedSkill ? (
            <div className="inspector-content" key={inspectedSkill.name}>
              <div className="inspector-logo">
                <TechLogo name={inspectedSkill.name} size={150} />
              </div>
              <div>
                <div className="inspector-name">{inspectedSkill.name}</div>
                <div className="inspector-family">{inspectedSkill.family}</div>
              </div>
              
              {inspectedSkill.projects.length > 0 && (
                <div className="inspector-projects">
                  <h4>Used in</h4>
                  <ul>
                    {inspectedSkill.projects.map(p => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="inspector-empty">
              Hover over an element to inspect.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
