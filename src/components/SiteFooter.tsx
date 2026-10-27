import { useEffect, useRef } from 'react';

export default function SiteFooter() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.removeAttribute('autoplay');
      video.pause();
      return;
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.15 }
      );
      observer.observe(video);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <footer className="meridian-footer-section" data-scene>
      <video
        ref={videoRef}
        className="footer__video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        disablePictureInPicture
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_144832_2b6b23aa-4416-4fcb-9df4-132349c59edc.mp4"
          type="video/mp4"
        />
      </video>

      <div className="footer__content scene__inner">
        <svg
          className="footer__mark"
          viewBox="0 0 64 64"
          role="img"
          aria-label="Meridian compass"
        >
          <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="32" cy="32" r="25.5" fill="none" stroke="currentColor" strokeWidth=".8" opacity=".5" />
          <g fill="currentColor" opacity=".85">
            <path d="M32 32 L46 18 L35.2 34.4 Z" />
            <path d="M32 32 L46 46 L29.6 35.2 Z" />
            <path d="M32 32 L18 46 L28.8 29.6 Z" />
            <path d="M32 32 L18 18 L34.4 28.8 Z" />
          </g>
          <g stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
            <path d="M32 8 L35.5 28.5 L32 32 Z" fill="currentColor" />
            <path d="M32 8 L28.5 28.5 L32 32 Z" fill="none" />
            <path d="M56 32 L35.5 35.5 L32 32 Z" fill="currentColor" />
            <path d="M56 32 L35.5 28.5 L32 32 Z" fill="none" />
            <path d="M32 56 L28.5 35.5 L32 32 Z" fill="currentColor" />
            <path d="M32 56 L35.5 35.5 L32 32 Z" fill="none" />
            <path d="M8 32 L28.5 28.5 L32 32 Z" fill="currentColor" />
            <path d="M8 32 L28.5 35.5 L32 32 Z" fill="none" />
          </g>
          <circle cx="32" cy="32" r="1.8" fill="var(--meridian-paper)" stroke="currentColor" strokeWidth="1" />
        </svg>

        <p className="footer__brand">
          <a href="#" aria-label="Rahul AK home">
            Rahul AK
          </a>
        </p>

        <p className="footer__tagline">
          Building things for the web, one idea at a time.
        </p>

        <nav className="footer__nav" aria-label="Footer">
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#hero">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="https://github.com/Rahul424213w" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/rahul-a-k-42a422321/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="mailto:rahulak424213w@gmail.com">Email</a></li>
          </ul>
        </nav>

        <p className="footer__copy">
          © <span id="year">{new Date().getFullYear()}</span> Rahul. Designed & built with curiosity.
        </p>
      </div>
    </footer>
  );
}
