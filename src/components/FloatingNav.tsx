import { useEffect, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { MoonIcon, SunIcon } from './icons';

export default function FloatingNav() {
  const { toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`floating-nav${scrolled ? ' scrolled' : ''}`}>
      <a href="#" className="logo-small">
        RAK<span className="dot">.</span>
      </a>
      <ul className="nav-links">
        <li>
          <a href="#skills">Skills</a>
        </li>
        <li>
          <a href="#projects">Projects</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
      <button id="theme-toggle" className="theme-toggle" aria-label="Toggle Theme" onClick={toggle}>
        <SunIcon />
        <MoonIcon />
      </button>
    </nav>
  );
}
