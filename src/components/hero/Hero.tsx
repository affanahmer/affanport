"use client";

import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [needsInteraction, setNeedsInteraction] = useState(false);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    // Try playing with sound
    vid.volume = 1;
    vid.muted = false;
    
    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setIsPlaying(true);
        setIsMuted(false);
      }).catch(error => {
        // Autoplay blocked, fallback to muted
        vid.muted = true;
        vid.play().then(() => {
          setIsPlaying(true);
          setIsMuted(true);
          setNeedsInteraction(true);
        });
      });
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio < 0.35) {
        vid.pause();
        setIsPlaying(false);
      } else {
        vid.play();
        setIsPlaying(true);
      }
    }, { threshold: [0.35] });

    observer.observe(vid);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!needsInteraction) return;

    const unlockSound = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        setIsMuted(false);
        setNeedsInteraction(false);
      }
    };

    window.addEventListener('pointerdown', unlockSound, { once: true });
    window.addEventListener('keydown', unlockSound, { once: true });
    window.addEventListener('touchend', unlockSound, { once: true });

    return () => {
      window.removeEventListener('pointerdown', unlockSound);
      window.removeEventListener('keydown', unlockSound);
      window.removeEventListener('touchend', unlockSound);
    };
  }, [needsInteraction]);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
      if (needsInteraction && !videoRef.current.muted) {
        setNeedsInteraction(false);
      }
    }
  };

  return (
    <div className="hero-section">
      <style>{`
        .hero-section {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 80px;
          overflow: hidden;
        }
        .hero-video-container {
          position: relative;
          height: min(96svh, 1040px);
          aspect-ratio: 768 / 960;
          z-index: 2;
          mix-blend-mode: multiply;
        }
        @media (max-width: 768px) {
          .hero-video-container {
            height: 62svh;
          }
        }
        .hero-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 24px;
        }
        .ghost-word {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(6rem, 18vw, 20rem);
          font-weight: 700;
          color: transparent;
          -webkit-text-stroke: 2px var(--line);
          z-index: 1;
          text-transform: uppercase;
          line-height: 1;
          letter-spacing: -0.04em;
          white-space: nowrap;
          pointer-events: none;
        }
        .hero-content {
          position: absolute;
          bottom: clamp(32px, 8vh, 64px);
          left: 0;
          width: 100%;
          padding-inline: var(--gutter);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 24px;
        }
        @media (min-width: 768px) {
          .hero-content {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
          }
        }
        .hero-role {
          font-size: clamp(3rem, 7vw, 6rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.04em;
          max-width: 15ch;
        }
        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .sound-btn {
          position: absolute;
          bottom: 24px;
          right: 24px;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: var(--ink);
          color: var(--paper);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 20;
          transition: transform 0.2s var(--ease);
        }
        .sound-btn:hover {
          transform: scale(1.05);
        }
        .sound-ping {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid var(--ink);
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          pointer-events: none;
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }
        .sound-icon {
          width: 14px;
          height: 14px;
          fill: currentColor;
        }
      `}</style>

      <div className="ghost-word rv">{PROFILE.firstName}</div>

      <div className="hero-video-container rv">
        <video 
          ref={videoRef}
          className="hero-video"
          playsInline 
          loop 
          preload="auto"
          poster="/portrait-bust.webp"
          suppressHydrationWarning
        >
          <source src="/hero/hero.webm" type="video/webm" />
          <source src="/hero/hero.mp4" type="video/mp4" />
        </video>

        <button 
          className="sound-btn" 
          onClick={toggleSound}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {needsInteraction && <div className="sound-ping" />}
          {isMuted ? (
            <svg className="sound-icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          ) : (
            <svg className="sound-icon" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          )}
        </button>
      </div>

      <div className="hero-content">
        <h1 className="hero-role rv">{PROFILE.role}.</h1>
        <div className="hero-ctas rv">
          <a href="#work" className="btn-primary">Explore work</a>
          <a href="#contact" className="btn-secondary">Let's talk</a>
          <a href={PROFILE.resumePath} className="btn-secondary" download>Résumé &darr;</a>
        </div>
      </div>
    </div>
  );
}
