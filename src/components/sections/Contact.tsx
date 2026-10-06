"use client";

import { useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const title1 = "Let's build".split("");
  const title2 = "something together.".split("");

  return (
    <footer className="section-container" style={{ paddingBottom: '32px' }}>
      <style>{`
        .contact-content {
          display: flex;
          flex-direction: column;
          gap: 64px;
          margin-bottom: 96px;
          position: relative;
        }

        .contact-heading {
          font-size: clamp(3.5rem, 10vw, 8rem);
          font-weight: 700;
          line-height: 0.9;
          letter-spacing: -0.05em;
          display: flex;
          flex-direction: column;
        }
        .heading-line {
          display: flex;
          flex-wrap: wrap;
        }
        .hop-char {
          display: inline-block;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .hop-char:hover {
          transform: translateY(-20px);
          color: var(--mute);
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        @media (min-width: 768px) {
          .contact-details {
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
          }
        }

        .email-group {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
        }
        
        .email-link {
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          text-decoration: underline;
          text-underline-offset: 8px;
          text-decoration-thickness: 2px;
          text-decoration-color: var(--line);
          transition: text-decoration-color 0.3s var(--ease), color 0.3s var(--ease);
        }
        .email-link:hover {
          text-decoration-color: var(--ink);
        }

        .copy-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 999px;
          background: var(--card);
          border: 1px solid var(--line);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.3s var(--ease);
        }
        .copy-chip:hover {
          background: var(--soft);
        }

        .social-links {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
        }
        .social-link {
          font-size: 18px;
          font-weight: 500;
          color: var(--mute);
          transition: color 0.3s var(--ease);
        }
        .social-link:hover {
          color: var(--ink);
        }

        .spinning-badge {
          position: absolute;
          right: 0;
          top: 0;
          width: 120px;
          height: 120px;
          pointer-events: none;
          display: none;
        }
        @media (min-width: 768px) {
          .spinning-badge {
            display: block;
          }
        }
        .spinning-text {
          animation: spin 10s linear infinite;
          transform-origin: center;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .footer-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding-top: 32px;
          border-top: 1px solid var(--line);
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--mute);
        }
        @media (min-width: 640px) {
          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
          }
        }
        .back-top {
          cursor: pointer;
          transition: color 0.3s var(--ease);
        }
        .back-top:hover {
          color: var(--ink);
        }
      `}</style>

      <div className="section-tag rv">05 — Contact</div>

      <div className="contact-content">
        <div className="spinning-badge rv" style={{ '--i': 1 } as any}>
          <svg viewBox="0 0 100 100" width="120" height="120">
            <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
            <text className="spinning-text" fill="var(--ink)" fontSize="12" letterSpacing="4.5" fontWeight="500">
              <textPath href="#circlePath">
                SAY HELLO · SAY HELLO · SAY HELLO · 
              </textPath>
            </text>
          </svg>
        </div>

        <h2 className="contact-heading rv" style={{ '--i': 2 } as any}>
          <div className="heading-line">
            {title1.map((char, i) => (
              <span key={i} className="hop-char">{char === " " ? "\u00A0" : char}</span>
            ))}
          </div>
          <div className="heading-line" style={{ color: 'var(--mute)' }}>
            {title2.map((char, i) => (
              <span key={i} className="hop-char">{char === " " ? "\u00A0" : char}</span>
            ))}
          </div>
        </h2>

        <div className="contact-details rv" style={{ '--i': 3 } as any}>
          <div className="email-group">
            <a href={`mailto:${PROFILE.email}`} className="email-link">
              {PROFILE.email}
            </a>
            <button className="copy-chip" onClick={handleCopy} aria-live="polite">
              {copied ? "Copied ✓" : "Copy email"}
            </button>
          </div>

          <div className="social-links">
            {PROFILE.phoneHref && <a href={PROFILE.phoneHref} className="social-link">Phone</a>}
            {PROFILE.github && <a href={PROFILE.github} target="_blank" rel="noreferrer" className="social-link">GitHub</a>}
            {PROFILE.linkedin && <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="social-link">LinkedIn</a>}
          </div>
        </div>
      </div>

      <div className="footer-bottom rv" style={{ '--i': 4 } as any}>
        <div>© 2026 {PROFILE.name}</div>
        <button className="back-top" onClick={() => scrollToTarget('#hero')}>Back to top ↑</button>
        <div>Built with Next.js</div>
      </div>
    </footer>
  );
}
