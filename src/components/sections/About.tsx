"use client";

import { useEffect, useRef, useState } from "react";
import { PROFILE, EDUCATION, EXPERIENCE } from "@/lib/data";

export function About() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let velX = 0;
    let velY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      
      // Calculate velocity/distance to angle
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      
      targetX = dy * 20;
      targetY = -dx * 20;
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    let animationId: number;
    const animate = (time: number) => {
      // Spring physics
      const spring = 0.05;
      const friction = 0.85;

      velX += (targetX - currentX) * spring;
      velY += (targetY - currentY) * spring;
      
      velX *= friction;
      velY *= friction;
      
      currentX += velX;
      currentY += velY;

      // Idle sway
      const idleSway = Math.sin(time / 1000) * 2;
      const finalY = currentY + idleSway;

      if (card) {
        card.style.transform = `rotateX(${currentX}deg) rotateY(${finalY}deg)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const currentRole = EXPERIENCE.length > 0 ? EXPERIENCE[0].title : "Developer";
  const recentEdu = EDUCATION.length > 0 ? EDUCATION[0].title : "";

  return (
    <section className="section-container">
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 64px;
          align-items: start;
        }
        @media (min-width: 1024px) {
          .about-grid {
            grid-template-columns: minmax(0,1fr) 320px minmax(0,1fr);
            gap: 48px;
            align-items: stretch;
          }
        }
        
        .about-col {
          display: flex;
          flex-direction: column;
          gap: 32px;
          height: 100%;
        }
        
        .about-lead {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }
        .about-text {
          font-size: 1.125rem;
          line-height: 1.6;
          color: var(--mute);
        }
        .about-links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: auto;
        }

        .id-container {
          perspective: 1000px;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          padding-top: 24px;
        }
        .lanyard-strap {
          width: 30px;
          height: 56px;
          background: var(--ink);
          position: relative;
          z-index: 2;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lanyard-text {
          color: var(--paper);
          font-family: var(--font-mono);
          font-size: 10px;
          white-space: nowrap;
          writing-mode: vertical-rl;
          text-transform: uppercase;
          animation: slide 4s linear infinite;
        }
        @keyframes slide {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .lanyard-clip {
          width: 16px;
          height: 24px;
          background: #d4d4d4;
          border-radius: 4px;
          margin-top: -4px;
          z-index: 1;
          box-shadow: inset 0 0 4px rgba(0,0,0,0.2);
        }
        
        .id-card-wrapper {
          width: 300px;
          height: 404px;
          margin-top: -12px;
          transform-style: preserve-3d;
          transform-origin: top center;
          will-change: transform;
          cursor: pointer;
        }
        .id-card-inner {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .id-card-wrapper:hover .id-card-inner,
        .id-card-wrapper:focus-visible .id-card-inner,
        .id-card-wrapper.is-flipped .id-card-inner {
          transform: rotateY(180deg);
        }
        
        .id-card-face {
          position: absolute;
          inset: 0;
          background: var(--card);
          border-radius: 20px;
          backface-visibility: hidden;
          box-shadow: 0 24px 48px -12px rgba(0,0,0,0.1), inset 0 0 0 1px var(--line);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .id-card-back {
          transform: rotateY(180deg);
          padding: 32px 24px;
          background: var(--card);
          background-image: radial-gradient(var(--line) 1px, transparent 1px);
          background-size: 16px 16px;
        }
        
        .id-top-band {
          background: var(--ink);
          color: var(--paper);
          padding: 12px;
          text-align: center;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
        }
        .id-photo-container {
          padding: 24px;
          display: flex;
          justify-content: center;
        }
        .id-photo-frame {
          width: 128px;
          height: 156px;
          border-radius: 12px;
          background: linear-gradient(135deg, #eee, #ddd);
          padding: 4px;
          position: relative;
        }
        .id-photo-frame::after {
          content: '';
          position: absolute;
          inset: -10px;
          border-radius: 20px;
          background: radial-gradient(circle, rgba(0,0,0,0.05) 0%, transparent 70%);
          z-index: -1;
        }
        .id-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
          filter: grayscale(100%) contrast(1.1);
          transition: transform 0.3s var(--ease);
        }
        .id-card-wrapper:hover .id-photo {
          transform: scale(1.05);
        }
        .id-details {
          padding: 0 24px 24px;
          flex: 1;
        }
        .id-name {
          font-size: 24px;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 4px;
          text-align: center;
        }
        .id-role {
          font-size: 12px;
          color: var(--mute);
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 24px;
        }
        .id-row {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 10px;
          padding-block: 8px;
          border-bottom: 1px dashed var(--line);
        }
        .id-row span:first-child { color: var(--mute); }
        .id-row span:last-child { font-weight: 600; }
        
        .id-footer {
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--soft);
        }
        .id-barcode {
          height: 24px;
          width: 120px;
          background: repeating-linear-gradient(90deg, var(--ink), var(--ink) 2px, transparent 2px, transparent 4px, var(--ink) 4px, var(--ink) 5px, transparent 5px, transparent 8px);
        }
        .id-sticker {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ddd, #fff, #bbb);
          box-shadow: inset 0 0 4px rgba(0,0,0,0.2);
        }

        .back-title {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--mute);
          margin-bottom: 16px;
          font-family: var(--font-mono);
        }
        .back-list {
          list-style: none;
          padding: 0;
          margin: 0 0 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-size: 13px;
          line-height: 1.4;
        }
        .back-list li {
          position: relative;
          padding-left: 16px;
        }
        .back-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: var(--mute);
        }
        .back-sign {
          margin-top: auto;
          border-top: 1px solid var(--ink);
          padding-top: 8px;
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 24px;
          text-align: center;
          color: var(--ink-2);
        }
        .back-found {
          text-align: center;
          font-size: 10px;
          color: var(--mute);
          margin-top: 16px;
        }

        .fact-row {
          padding-block: 16px;
          border-bottom: 1px solid var(--line);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .fact-label {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--mute);
          text-transform: uppercase;
        }
        .fact-value {
          font-size: 16px;
          font-weight: 500;
        }
        .fact-quote {
          margin-top: auto;
          font-family: var(--font-serif);
          font-size: 24px;
          line-height: 1.3;
          color: var(--ink-2);
          border-left: 2px solid var(--ink);
          padding-left: 24px;
        }
      `}</style>

      <div className="section-tag rv">01 — About</div>
      
      <div className="about-grid">
        <div className="about-col rv" style={{ '--i': 1 } as any}>
          <h2 className="about-lead">Hi, I'm {PROFILE.name}.</h2>
          <p className="about-text">{PROFILE.resumeSummary}</p>
          
          <div className="about-links">
            {PROFILE.github && <a href={PROFILE.github} target="_blank" rel="noreferrer" className="btn-secondary">GitHub ↗</a>}
            {PROFILE.linkedin && <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="btn-secondary">LinkedIn ↗</a>}
            <a href={PROFILE.resumePath} download className="btn-primary">Résumé ↓</a>
          </div>
        </div>

        <div className="id-container rv" style={{ '--i': 2 } as any}>
          <div className="lanyard-strap">
            <div className="lanyard-text">{PROFILE.name} · {currentRole} · </div>
          </div>
          <div className="lanyard-clip" />
          
          <div 
            className={`id-card-wrapper ${flipped ? 'is-flipped' : ''}`} 
            ref={cardRef}
            tabIndex={0}
            onClick={() => setFlipped(!flipped)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setFlipped(!flipped); }}
          >
            <div className="id-card-inner">
              <div className="id-card-face">
                <div className="id-top-band">DEVELOPER ID</div>
                <div className="id-photo-container">
                  <div className="id-photo-frame">
                    <img src="/portrait-bust.webp" alt={PROFILE.name} className="id-photo" />
                  </div>
                </div>
                <div className="id-details">
                  <div className="id-name">{PROFILE.name}</div>
                  <div className="id-role">Full-Stack Dev</div>
                  <div className="id-row">
                    <span>ID No.</span>
                    <span>101010</span>
                  </div>
                  <div className="id-row">
                    <span>Dept.</span>
                    <span>Engineering</span>
                  </div>
                  <div className="id-row">
                    <span>Valid till</span>
                    <span>2026</span>
                  </div>
                </div>
                <div className="id-footer">
                  <div className="id-barcode" />
                  <div className="id-sticker" />
                </div>
              </div>
              
              <div className="id-card-face id-card-back">
                <div className="back-title">What I am</div>
                <ul className="back-list">
                  <li>{currentRole}</li>
                  <li>{recentEdu}</li>
                  <li>Built Collabryx & CareSync</li>
                  <li>MERN Stack Specialist</li>
                </ul>
                <div style={{ flex: 1 }} />
                <div className="back-sign">{PROFILE.name}</div>
                <div className="back-found">If found, say hello · {PROFILE.email}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-col rv" style={{ '--i': 3 } as any}>
          <div>
            <div className="fact-row">
              <span className="fact-label">Location</span>
              <span className="fact-value">{PROFILE.location}</span>
            </div>
            <div className="fact-row">
              <span className="fact-label">Education</span>
              <span className="fact-value">{recentEdu}</span>
            </div>
            <div className="fact-row">
              <span className="fact-label">Current Role</span>
              <span className="fact-value">{currentRole}</span>
            </div>
            <div className="fact-row">
              <span className="fact-label">Email</span>
              <span className="fact-value"><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></span>
            </div>
          </div>
          
          <div className="fact-quote">
            "Eager to contribute solid full-stack fundamentals and hands-on project experience to a collaborative engineering team."
          </div>
        </div>
      </div>
    </section>
  );
}
