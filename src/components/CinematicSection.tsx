import { useEffect, useRef, type CSSProperties } from 'react';
import type { CinematicSectionData } from '../data/cinematic';

interface CinematicSectionProps {
  data: CinematicSectionData;
}

type Layer = CinematicSectionData['layers'][number];

function LayerMedia({ layer }: { layer: Layer }) {
  return layer.type === 'video' ? (
    <video src={layer.src} autoPlay loop muted playsInline />
  ) : (
    <img src={layer.src} alt="" loading="lazy" />
  );
}

function ParallaxCard({
  layer,
  index,
  extraClass = '',
}: {
  layer: Layer;
  index: number;
  extraClass?: string;
}) {
  return (
    <div
      className={`parallax-layer layer-${index + 1} glass-strong shadow-2xl${extraClass ? ` ${extraClass}` : ''}`}
      data-speed={layer.speed}
      data-delay={layer.delay}
      style={{ '--layer-speed': layer.speed } as CSSProperties}
    >
      <div className="parallax-layer-inner" style={{ transitionDelay: `${layer.delay}s` }}>
        <LayerMedia layer={layer} />
        <div className="layer-overlay" />
      </div>
    </div>
  );
}

export default function CinematicSection({ data }: CinematicSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Pause offscreen videos on mobile to save battery
  useEffect(() => {
    if (window.innerWidth > 768) return;
    const videos = sectionRef.current?.querySelectorAll<HTMLVideoElement>('video');
    if (!videos?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        });
      },
      { threshold: 0.3 },
    );
    videos.forEach((v) => observer.observe(v));
    return () => observer.disconnect();
  }, []);

  // Split layers: top 3 | bottom 5
  const topLayers = data.layers.slice(0, 3);
  const bottomLayers = data.layers.slice(3);

  return (
    <section className="cinematic-section" ref={sectionRef} data-scene>

      {/* ── DESKTOP: sticky centred text overlay ─────────────────────────── */}
      <div className="cinematic-text-container">
        <div className="cinematic-text-inner">
          <div className="cinematic-subtitle">{data.subtitle}</div>
          <h2 className="cinematic-title">
            <span className="block">{data.titleTop}</span>
            <span className="block text-gradient">{data.titleBottom}</span>
          </h2>
        </div>
      </div>

      {/* ── DESKTOP: absolute parallax layer canvas ──────────────────────── */}
      <div className="cinematic-layers-desktop">
        {data.layers.map((layer, i) => (
          <ParallaxCard key={`d-${layer.src}-${i}`} layer={layer} index={i} />
        ))}
      </div>

      {/* ── MOBILE: compact photo grid + text sandwich ───────────────────── */}
      <div className="cinematic-grid-mobile">

        {/* Row A — 3 compact portrait cards */}
        <div className="mobile-row mobile-row-top">
          {topLayers.map((layer, i) => (
            <ParallaxCard key={`mt-${layer.src}-${i}`} layer={layer} index={i} extraClass="mobile-card" />
          ))}
        </div>

        {/* Text strip in the middle */}
        <div className="cinematic-text-mobile">
          <div className="cinematic-subtitle">{data.subtitle}</div>
          <h2 className="cinematic-title">
            <span className="block">{data.titleTop}</span>
            <span className="block text-gradient">{data.titleBottom}</span>
          </h2>
        </div>

        {/* Row B — 5 cards in a 3+2 staggered grid */}
        <div className="mobile-row mobile-row-bottom">
          {bottomLayers.map((layer, i) => (
            <ParallaxCard
              key={`mb-${layer.src}-${i}`}
              layer={layer}
              index={i + 3}
              extraClass={`mobile-card mobile-bot-${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
