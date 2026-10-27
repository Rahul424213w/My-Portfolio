import { useEffect, type RefObject } from 'react';
import { greetings } from '../data/greetings';

/** Cycles the multilingual "hello" in the hero, with a slide/fade transition. */
export function useGreeting(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const timers: number[] = [];
    let index = 0;

    const animate = (text: string) => {
      // EXIT: slide current word upward + fade out
      el.style.transform = 'translateY(-100%)';
      el.style.opacity = '0';

      timers.push(
        window.setTimeout(() => {
          // Instant reset — disable transition, snap below, then re-enable
          el.style.transition = 'none';
          el.textContent = text;
          el.style.transform = 'translateY(60%)';
          el.style.opacity = '0';

          void el.offsetHeight; // force reflow

          // ENTER: slide up into place
          el.style.transition = 'transform 0.12s cubic-bezier(0.4,0,0.2,1), opacity 0.12s ease';
          el.style.transform = 'translateY(0)';
          el.style.opacity = '1';
        }, 140),
      );
    };

    const cycle = () => {
      index = (index + 1) % greetings.length;
      animate(greetings[index]);
      timers.push(window.setTimeout(cycle, 800));
    };

    timers.push(window.setTimeout(cycle, 1000));

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [ref]);
}
