import { useEffect, useState } from 'react';
import Cursor from './components/Cursor';
import FloatingNav from './components/FloatingNav';
import Hero from './components/Hero';
import MarqueeStrip from './components/MarqueeStrip';
import CinematicSection from './components/CinematicSection';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import SiteFooter from './components/SiteFooter';
import StarburstThanksFooter from './components/ui/starburst-thanks-footer';
import { AnimatorTitlePreloader } from './components/ui/animator-title-preloader';
import { cinematicSections } from './data/cinematic';
import { useFadeIn } from './hooks/useFadeIn';
import { useCinematicScroll } from './hooks/useCinematicScroll';

export default function App() {
  // The title card plays on every load; the page stays locked until it lands.
  const [ready, setReady] = useState(false);

  useFadeIn();
  useCinematicScroll(ready);

  // Lock scrolling while the title card is on screen.
  useEffect(() => {
    document.body.classList.toggle('preloading', !ready);
    return () => document.body.classList.remove('preloading');
  }, [ready]);

  return (
    <>
      <Cursor />
      {!ready ? (
        <AnimatorTitlePreloader
          durationMs={1800}
          kicker="Portfolio"
          title="Selected Works"
          connector="by"
          name="Rahul A K"
          meta=""
          scene=""
          onComplete={() => setReady(true)}
        />
      ) : (
        <>
          <FloatingNav />
          <Hero />
          <MarqueeStrip />
          {cinematicSections.map((section, index) => (
            <CinematicSection key={index} data={section} />
          ))}
          <Skills />
          <Projects />
          <Contact />
          <StarburstThanksFooter
            name="Rahul A K"
            thanks={["Thank you", "Obrigado", "Gracias", "Merci", "Danke", "Grazie", "Arigato", "Dhanyavaad"]}
            tagline="for stopping by"
            signoff="Built with curiosity & precision."
            links={[
              { caption: "More of my code", label: "github.com/Rahul424213w", href: "https://github.com/Rahul424213w" },
              { caption: "Connect with me", label: "linkedin.com/in/rahul-a-k-42a422321", href: "https://www.linkedin.com/in/rahul-a-k-42a422321/" },
            ]}
            email="rahulak424213w@gmail.com"
            phone=""
            background="#0a0a0a"
            ink="#f4f4f2"
            accent="#ff1f5a"
            height="100svh"
            starPoints={10}
          />
          <SiteFooter />
        </>
      )}
    </>
  );
}
