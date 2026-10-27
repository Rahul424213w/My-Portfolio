import { useRef } from 'react';
import { useCrowd } from '../hooks/useCrowd';
import { useGreeting } from '../hooks/useGreeting';
import { heroSocials } from '../data/socials';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const greetingRef = useRef<HTMLSpanElement>(null);

  useCrowd(canvasRef);
  useGreeting(greetingRef);

  return (
    <header className="hero hero-crowd" data-scene>
      <div className="hero-bg"></div>
      <div className="grid-lines"></div>

      {/* GREETING — independent absolute position, never affects name layout */}
      <div className="hero-greeting-wrap">
        <span className="hero-greeting-text" id="hero-greeting" ref={greetingRef}>
          Hello
        </span>
      </div>

      {/* NAME — independent absolute position, always static */}
      <div className="hero-crowd-name-row text-roll-container">
        <h1 className="hero-crowd-name">
          <span className="hero-crowd-im">i'm </span>
          <span className="hero-name-text text-roll">Rahul A K</span>
        </h1>
      </div>

      {/* CROWD CANVAS */}
      <canvas id="crowd-canvas" className="crowd-canvas" ref={canvasRef}></canvas>

      {/* SOCIALS (Top Right) */}
      <div className="hero-socials hero-socials-top-right">
        {heroSocials.map((social) => (
          <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
            {social.icon}
            {social.label}
          </a>
        ))}
      </div>

      <div className="scroll-hint">
        <div className="scroll-line"></div>
        Scroll to explore
      </div>
    </header>
  );
}
