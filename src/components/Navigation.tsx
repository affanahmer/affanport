"use client";

import { useEffect, useState, useRef } from "react";
import { PROFILE, NAV } from "@/lib/data";
import { useScrollProgress } from "@/lib/hooks";
import { scrollToTarget } from "@/lib/scroll";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const scrollProgress = useScrollProgress();
  const [menuOpen, setMenuOpen] = useState(false);
  const navPillRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    NAV.forEach(item => {
      const el = document.getElementById(item.href.substring(1));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [menuOpen]);

  useEffect(() => {
    if (activeSection && navPillRef.current && indicatorRef.current) {
      const activeLink = navPillRef.current.querySelector(`[data-href="#${activeSection}"]`) as HTMLElement;
      if (activeLink) {
        indicatorRef.current.style.width = `${activeLink.offsetWidth}px`;
        indicatorRef.current.style.transform = `translateX(${activeLink.offsetLeft}px)`;
        indicatorRef.current.style.opacity = '1';
      } else {
        indicatorRef.current.style.opacity = '0';
      }
    }
  }, [activeSection]);

  const initials = PROFILE.name.split(' ').map(n => n[0]).join('');

  return (
    <>
      <style>{`
        .progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          height: 2px;
          background: var(--ink);
          z-index: 100;
          transform-origin: left;
        }
        .nav-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 24px var(--gutter);
          z-index: 50;
          display: flex;
          justify-content: space-between;
          align-items: center;
          pointer-events: none;
        }
        .nav-wrapper > * {
          pointer-events: auto;
        }
        .logo-mark {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 500;
        }
        .initials {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          transition: background-color 0.3s var(--ease), color 0.3s var(--ease), transform 0.5s var(--ease);
        }
        .initials:hover {
          transform: rotate(360deg);
        }
        .logo-mark.is-scrolled .initials {
          background-color: var(--ink);
          color: var(--paper);
        }
        .name-text {
          transition: opacity 0.3s var(--ease), transform 0.3s var(--ease);
        }
        .logo-mark.is-scrolled .name-text {
          opacity: 0;
          transform: translateX(-10px);
          pointer-events: none;
        }
        .nav-pill {
          display: none;
          align-items: center;
          background: transparent;
          border-radius: 999px;
          padding: 4px;
          position: relative;
          transition: background 0.3s var(--ease), backdrop-filter 0.3s var(--ease), box-shadow 0.3s var(--ease);
        }
        @media (min-width: 768px) {
          .nav-pill { display: flex; }
        }
        .nav-pill.is-scrolled {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 24px rgba(0,0,0,0.04), inset 0 0 0 1px var(--line);
        }
        .nav-link {
          position: relative;
          z-index: 2;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 500;
          color: var(--mute);
          transition: color 0.3s var(--ease);
        }
        .nav-link:hover, .nav-link.active {
          color: var(--ink);
        }
        .nav-link.active {
          color: #fff;
        }
        .indicator {
          position: absolute;
          top: 4px;
          left: 0;
          height: calc(100% - 8px);
          background: var(--ink);
          border-radius: 999px;
          z-index: 1;
          transition: transform 0.4s var(--ease), width 0.4s var(--ease), opacity 0.3s var(--ease);
          opacity: 0;
        }
        
        .menu-btn {
          display: block;
          padding: 8px 16px;
          border-radius: 999px;
          background: var(--card);
          box-shadow: inset 0 0 0 1px var(--line);
          font-size: 14px;
          font-weight: 500;
        }
        @media (min-width: 768px) {
          .menu-btn { display: none; }
        }

        .mobile-menu {
          position: fixed;
          inset: 0;
          background: var(--paper);
          z-index: 200;
          display: flex;
          flex-direction: column;
          padding: 24px var(--gutter);
          clip-path: circle(0% at 100% 0);
          transition: clip-path 0.6s var(--ease);
        }
        .mobile-menu.is-open {
          clip-path: circle(150% at 100% 0);
        }
        .mobile-header {
          display: flex;
          justify-content: flex-end;
        }
        .mobile-links {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 24px;
        }
        .mobile-link {
          font-size: clamp(2.5rem, 8vw, 4rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.04em;
          display: flex;
          align-items: center;
          gap: 16px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.4s var(--ease), transform 0.4s var(--ease);
        }
        .mobile-menu.is-open .mobile-link {
          opacity: 1;
          transform: translateY(0);
        }
        .mobile-link-num {
          font-family: var(--font-mono);
          font-size: 1rem;
          color: var(--mute);
          font-weight: 400;
        }
      `}</style>

      <div 
        className="progress-bar" 
        style={{ transform: `scaleX(${scrollProgress})` }} 
      />

      <nav className="nav-wrapper">
        <a href="#hero" className={`logo-mark ${scrolled ? 'is-scrolled' : ''}`} onClick={(e) => { e.preventDefault(); scrollToTarget('#hero'); }}>
          <div className="initials">{initials}</div>
          <span className="name-text">{PROFILE.name}</span>
        </a>

        <div className={`nav-pill ${scrolled ? 'is-scrolled' : ''}`} ref={navPillRef}>
          <div className="indicator" ref={indicatorRef} />
          {NAV.map(item => (
            <a 
              key={item.href}
              href={item.href}
              data-href={item.href}
              className={`nav-link ${activeSection === item.href.substring(1) ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        <button className="menu-btn" onClick={() => setMenuOpen(true)}>
          Menu
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}>
        <div className="mobile-header">
          <button className="menu-btn" onClick={() => setMenuOpen(false)}>Close</button>
        </div>
        <div className="mobile-links">
          {NAV.map((item, i) => (
            <a 
              key={item.href} 
              href={item.href}
              className="mobile-link"
              style={{ transitionDelay: `${i * 0.05 + 0.2}s` }}
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                setTimeout(() => scrollToTarget(item.href), 400);
              }}
            >
              <span className="mobile-link-num">0{i+1}</span>
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
