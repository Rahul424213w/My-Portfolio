import { useEffect } from 'react';

const clamp = (value: number, min = 0, max = 1) => (value < min ? min : value > max ? max : value);

/** How much the scene content lags behind the page scroll, in px. */
const CONTENT_LAG = 70;

/**
 * Scroll-linked cinematic transitions.
 *
 * Every element marked with `data-scene` receives three custom properties that
 * the stylesheet turns into motion:
 *
 *   --scene-progress : 0 → 1 across the scene's pass through the viewport
 *   --scene-reveal   : 0 → 1 envelope (fades in on entry, out on exit)
 *   --scene-shift    : px of parallax lag applied to the scene content
 *
 * Values are written straight to the DOM (never through React state) so
 * scrolling never triggers a re-render.
 */
export function useCinematicScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]'));
    if (!scenes.length) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Reveal the collage layers once they come into view.
    // This runs in every motion mode — the entrance is a fade, not a movement.
    const layers = Array.from(document.querySelectorAll<HTMLElement>('.parallax-layer'));
    const layerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' },
    );
    layers.forEach((layer) => layerObserver.observe(layer));

    /** Reduced motion: keep every scene fully visible and perfectly still. */
    const applyStatic = () => {
      scenes.forEach((scene) => {
        scene.style.setProperty('--scene-progress', '0.5');
        scene.style.setProperty('--scene-reveal', '1');
        scene.style.setProperty('--scene-shift', '0px');
      });
    };

    if (motionQuery.matches) {
      applyStatic();
      return () => layerObserver.disconnect();
    }

    const lastSignature = new Map<HTMLElement, string>();

    const update = () => {
      const viewport = window.innerHeight || 1;

      // Read first, write after — avoids layout thrashing.
      const metrics: { scene: HTMLElement; top: number; bottom: number; height: number }[] = [];
      for (const scene of scenes) {
        const rect = scene.getBoundingClientRect();
        if (rect.bottom < -viewport || rect.top > viewport * 2) continue;
        metrics.push({ scene, top: rect.top, bottom: rect.bottom, height: rect.height });
      }

      for (const { scene, top, bottom, height } of metrics) {
        const progress = clamp((viewport - top) / (height + viewport));
        const enter = clamp((viewport - top) / (viewport * 0.28));
        const exit = clamp(bottom / (viewport * 0.45));
        const reveal = Math.min(enter, exit);
        // Content lags behind the page once the scene's top has passed the
        // viewport top; 0 → CONTENT_LAG across the scene's own scroll range.
        const lag = clamp(-top / Math.max(height, 1));
        const shift = lag * CONTENT_LAG;

        const signature = `${progress.toFixed(3)}|${reveal.toFixed(3)}|${shift.toFixed(1)}`;
        if (lastSignature.get(scene) === signature) continue;
        lastSignature.set(scene, signature);

        scene.style.setProperty('--scene-progress', progress.toFixed(4));
        scene.style.setProperty('--scene-reveal', reveal.toFixed(4));
        scene.style.setProperty('--scene-shift', `${shift.toFixed(1)}px`);
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();

    return () => {
      layerObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [enabled]);
}
