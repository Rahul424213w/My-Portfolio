import type { CSSProperties } from 'react';
import ProjectGlassFolders from './ProjectGlassFolders';

export default function Projects() {
  return (
    <section id="projects" className="projects-showcase max-w-[1360px] mx-auto px-4 md:px-8 py-16" data-scene>
      <div className="section-label scene-item mb-10" style={{ '--i': 0 } as CSSProperties}>
        <span className="num">02 //</span>
        <h2>Projects</h2>
        <div className="line"></div>
      </div>

      <div className="scene-item" style={{ '--i': 1 } as CSSProperties}>
        <ProjectGlassFolders />
      </div>
    </section>
  );
}
