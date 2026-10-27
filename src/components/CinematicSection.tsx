import { useEffect, useRef, type CSSProperties } from 'react';
import type { CinematicSectionData } from '../data/cinematic';

interface CinematicSectionProps {
  data: CinematicSectionData;
}

export default function CinematicSection({ data }: CinematicSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Pause offscreen videos on mobile to save battery and data
  useEffect(() => {
    if (window.innerWidth > 768) return;
    const videos = sectionRef.current?.querySelectorAll<HTMLVideoElement>('video');
    if (!videos?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 },
    );
    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="cinematic-section" ref={sectionRef} data-scene>
      <div className="cinematic-text-container">
        <div className="cinematic-text-inner">
          <div className="cinematic-subtitle">{data.subtitle}</div>
          <h2 className="cinematic-title">
            <span className="block">{data.titleTop}</span>
            <span className="block text-gradient">{data.titleBottom}</span>
          </h2>
        </div>
      </div>

      {data.layers.map((layer, index) => (
        <div
          key={layer.src}
          className={`parallax-layer layer-${index + 1} glass-strong shadow-2xl`}
          data-speed={layer.speed}
          data-delay={layer.delay}
          style={{ '--layer-speed': layer.speed } as CSSProperties}
        >
          <div className="parallax-layer-inner" style={{ transitionDelay: `${layer.delay}s` }}>
            {layer.type === 'video' ? (
              <video src={layer.src} autoPlay loop muted playsInline></video>
            ) : (
              <img src={layer.src} alt="" loading="lazy" />
            )}
            <div className="layer-overlay"></div>
          </div>
        </div>
      ))}
    </section>
  );
}
