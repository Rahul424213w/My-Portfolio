import MultiOrbitSemiCircle from './ui/multi-orbit-semi-circle';

export default function Skills() {
  return (
    <div id="skills" className="relative overflow-hidden" data-scene>
      <video
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        src="/skills-bg.mp4"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(0, 0, 0, 0.15)" }}
      />
      <div className="relative scene__inner">
        <MultiOrbitSemiCircle />
      </div>
    </div>
  );
}
