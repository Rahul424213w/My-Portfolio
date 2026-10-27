import { useEffect } from 'react';

/** Reveals every `.fade-in` section when it scrolls into view. */
export function useFadeIn() {
  useEffect(() => {
    const faders = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('show');
        });
      },
      { threshold: 0.1 },
    );
    faders.forEach((fader) => observer.observe(fader));
    return () => observer.disconnect();
  }, []);
}
