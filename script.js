// =====================
// INTRO ANIMATION (GSAP)
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const introTL = gsap.timeline({ delay: 0.15 });
  const shape   = document.getElementById("intro-shape");

  // Step 1: Dot appears + "hey" fades up
  introTL
    .to(shape, { opacity: 1, duration: 0.35, ease: "power3.out" })
    .to("#text-line-1", { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, "<0.05");

  // Step 2: Morph to rectangle, corner accents appear, "I'm Rahul" fades up
  introTL
    .to("#text-line-1", { opacity: 0, y: -8, duration: 0.18, ease: "power2.in" }, "+=0.45")
    .to(shape, {
      width: 130,
      height: 52,
      borderRadius: 14,
      duration: 0.45,
      ease: "expo.out"
    })
    .to(".shape-red-piece",   { opacity: 1, duration: 0.22, ease: "power2.out" }, "-=0.25")
    .to(".shape-green-piece", { opacity: 1, duration: 0.22, ease: "power2.out" }, "-=0.2")
    .to("#text-line-2", { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, "-=0.15");

  // Step 3: Morph to green sphere, text switches to subtitle
  introTL
    .to("#text-line-2",       { opacity: 0, y: -8, duration: 0.18, ease: "power2.in" }, "+=0.55")
    .to(".shape-red-piece",   { opacity: 0, duration: 0.18 }, "<")
    .to(".shape-green-piece", { opacity: 0, duration: 0.18 }, "<")
    .to(shape, {
      width: 130,
      height: 130,
      borderRadius: "50%",
      duration: 0.55,
      ease: "expo.inOut",
      onStart: () => shape.classList.add("sphere")
    })
    .to(".smiley-face", { opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.15")
    .to("#text-line-3", { opacity: 1, y: 0,  duration: 0.4, ease: "power3.out" }, "-=0.1");

  // Step 4: Enter button slides up
  introTL
    .to("#enter-btn", {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power3.out",
      onComplete: () => {
        document.getElementById("enter-btn").classList.add("active");
      }
    }, "+=0.15");

  // Enter button click: fade out loader, play audio
  document.getElementById("enter-btn").addEventListener("click", () => {
    const loader = document.getElementById("initial-loader");
    gsap.to(loader, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        loader.style.visibility = "hidden";
        loader.style.display    = "none";
        document.body.classList.remove("loading");
      }
    });

    const heroAudio = document.getElementById("hero-audio");
    if (heroAudio) {
      heroAudio.muted = false;
      window.isManuallyMuted = false;
      heroAudio.play().catch(e => console.log("Audio play prevented:", e));
      if (window.syncMuteState) window.syncMuteState(false);
    }
  });
});


// =====================
// CUSTOM CURSOR
// =====================
const cursor = document.getElementById('cursor');
let mx = 0, my = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;

  if (cursor) {
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  }
});

// Cursor hover effect
document.querySelectorAll('a, button, .proj-card, .magnetic-text-container').forEach(el => {
  el.addEventListener('mouseenter', () => cursor?.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor?.classList.remove('hover'));
});


// =====================
// MAGNETIC TEXT (MORPHING CURSOR)
// =====================
document.querySelectorAll('.magnetic-text-container').forEach(container => {
  const circle = container.querySelector('.magnetic-circle');
  const innerContainer = container.querySelector('.inner-text-container');
  const baseTextEl = container.querySelector('.base-text');
  const innerTextEl = container.querySelector('.inner-text');

  const words = JSON.parse(container.getAttribute('data-words') || '[]');
  let wordIndex = 0;

  if (words.length >= 2) {
    baseTextEl.textContent = words[0];
    innerTextEl.textContent = words[1];
  }

  let currentX = 0, currentY = 0;
  let targetX = 0, targetY = 0;
  let animationFrame;
  let transitionTimeout;

  const updateSize = () => {
    innerContainer.style.width = container.offsetWidth + 'px';
    innerContainer.style.height = container.offsetHeight + 'px';
  };

  updateSize();
  window.addEventListener('resize', updateSize);

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    targetX = e.clientX - rect.left;
    targetY = e.clientY - rect.top;
  });

  container.addEventListener('mouseenter', (e) => {
    clearTimeout(transitionTimeout);
    const rect = container.getBoundingClientRect();
    targetX = currentX = e.clientX - rect.left;
    targetY = currentY = e.clientY - rect.top;

    circle.style.width = '150px';
    circle.style.height = '150px';

    cancelAnimationFrame(animationFrame);
    animate();
  });

  container.addEventListener('mouseleave', () => {
    circle.style.width = '0px';
    circle.style.height = '0px';
    cancelAnimationFrame(animationFrame);

    if (words.length > 0) {
      transitionTimeout = setTimeout(() => {
        wordIndex = (wordIndex + 1) % words.length;
        const nextWordIndex = (wordIndex + 1) % words.length;

        baseTextEl.textContent = words[wordIndex];
        innerTextEl.textContent = words[nextWordIndex];
      }, 500);
    }
  });

  const animate = () => {
    currentX += (targetX - currentX) * 0.15;
    currentY += (targetY - currentY) * 0.15;

    circle.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    innerContainer.style.transform = `translate(${-currentX}px, ${-currentY}px)`;

    animationFrame = requestAnimationFrame(animate);
  };
});


// =====================
// TYPING EFFECT (REMOVED)
// =====================


// =====================
// FADE IN ON SCROLL
// =====================
const faders = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
}, { threshold: 0.1 });
faders.forEach(f => observer.observe(f));


// =====================
// CONTACT FORM SUBMIT
// =====================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = this.querySelector('.submit-btn');
    const originalText = btn.textContent;

    // Loading state
    btn.textContent = 'Sending...';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    const formData = new FormData(this);

    try {
      const response = await fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        btn.textContent = 'Sent! ✦';
        btn.style.background = 'var(--cyan)';
        this.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      btn.textContent = 'Error! ✖';
      btn.style.background = '#ff4444';
    } finally {
      btn.style.opacity = '1';
      btn.disabled = false;
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = 'var(--acid)';
      }, 3000);
    }
  });
}


// =====================
// NAV SCROLL EFFECT
// =====================
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.floating-nav');
  if (nav) {
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
});

// =====================
// THEME TOGGLE LOGIC
// =====================
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  // Check localStorage for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.documentElement.classList.add('light-mode');
  }

  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('light-mode');

    // Save preference
    if (document.documentElement.classList.contains('light-mode')) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
  });
}

// =====================
// GLOBAL AUDIO CONTROL
// =====================
const heroAudio = document.getElementById('hero-audio');
const cinematicAudio = document.getElementById('cinematic-audio');
const muteBtnFloat = document.getElementById('mute-btn-float');

if (muteBtnFloat) {
  const iconUnmuted = muteBtnFloat.querySelector('.icon-unmuted');
  const iconMuted = muteBtnFloat.querySelector('.icon-muted');
  window.isManuallyMuted = false;

  const updateMuteIcons = (isMuted) => {
    if (isMuted) {
      iconUnmuted.style.display = 'none';
      iconMuted.style.display = 'block';
      muteBtnFloat.classList.remove('playing');
    } else {
      iconUnmuted.style.display = 'block';
      iconMuted.style.display = 'none';
      muteBtnFloat.classList.add('playing');
    }
  };

  window.syncMuteState = (isMuted) => {
    if (heroAudio) heroAudio.muted = isMuted;
    if (cinematicAudio) cinematicAudio.muted = isMuted;
    window.isManuallyMuted = isMuted;
    updateMuteIcons(isMuted);
  };

  muteBtnFloat.addEventListener('click', () => {
    const newState = !window.isManuallyMuted;
    syncMuteState(newState);

    if (!newState) {
      // If unmuting, try to play current audio
      if (heroAudio && heroAudio.paused && !heroAudio.dataset.outOfView) {
        heroAudio.play().catch(() => { });
      } else if (cinematicAudio && cinematicAudio.paused && cinematicAudio.dataset.inView === 'true') {
        cinematicAudio.play().catch(() => { });
      }
    }
  });

  // Autoplay management
  const attemptAutoplay = () => {
    if (window.isManuallyMuted) return;
    if (heroAudio) {
      heroAudio.play().then(() => {
        updateMuteIcons(false);
      }).catch(() => {
        // Wait for first interaction
        const startAudio = () => {
          if (!window.isManuallyMuted) {
            heroAudio.play().then(() => {
              updateMuteIcons(false);
              window.removeEventListener('click', startAudio);
              window.removeEventListener('scroll', startAudio);
            }).catch(() => { });
          }
        };
        window.addEventListener('click', startAudio);
        window.addEventListener('scroll', startAudio, { passive: true });
      });
    }
  };

  attemptAutoplay();

  // Audio Transitions
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    const audioObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (heroAudio && !window.isManuallyMuted) heroAudio.play().catch(() => { });
          if (cinematicAudio) cinematicAudio.pause();
          if (heroAudio) delete heroAudio.dataset.outOfView;
        } else {
          if (heroAudio) {
            heroAudio.pause();
            heroAudio.dataset.outOfView = 'true';
          }
          if (cinematicAudio && entry.boundingClientRect.top < 0) {
            cinematicAudio.dataset.inView = 'true';
            if (!window.isManuallyMuted) {
              cinematicAudio.muted = false;
              cinematicAudio.play().catch(() => { });
            }
          }
        }
      });
    }, { threshold: 0.1 });
    audioObserver.observe(heroSection);
  }
}

// =====================
// CINEMATIC PARALLAX MULTI-SECTION
// =====================
const cinematicSections = document.querySelectorAll(".cinematic-section");
if (cinematicSections.length > 0) {
  const cinematicObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -10% 0px" });

  cinematicSections.forEach(section => {
    const layers = section.querySelectorAll(".parallax-layer");
    layers.forEach(layer => {
      const delay = layer.dataset.delay || 0;
      const inner = layer.querySelector(".parallax-layer-inner");
      if (inner) inner.style.transitionDelay = `${delay}s`;
      cinematicObserver.observe(layer);
    });
  });

  const updateAllParallax = () => {
    const windowHeight = window.innerHeight;
    const isMobile = window.innerWidth <= 768;
    const mobileDampener = isMobile ? 0.4 : 1;

    cinematicSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const textInner = section.querySelector(".cinematic-text-inner");
      const layers = section.querySelectorAll(".parallax-layer");

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const totalScroll = windowHeight + rect.height;
        const currentScroll = windowHeight - rect.top;
        let progress = currentScroll / totalScroll;
        progress = Math.max(0, Math.min(1, progress));

        if (textInner) {
          const textY = isMobile ? progress * -40 : progress * -80;
          textInner.style.transform = `translateY(${textY}%)`;

          let opacity = 1;
          if (progress < 0.4) {
            opacity = progress / 0.4;
          } else if (progress > 0.9) {
            opacity = 1 - (progress - 0.9) / 0.1;
          }
          textInner.style.opacity = opacity;
        }

        layers.forEach(layer => {
          const speed = parseFloat(layer.dataset.speed) || 0;
          const yOffset = progress * speed * mobileDampener;
          layer.style.transform = `translateY(${yOffset}%)`;
        });
      }
    });
  };

  let parallaxTicking = false;
  window.addEventListener("scroll", () => {
    if (!parallaxTicking) {
      window.requestAnimationFrame(() => {
        updateAllParallax();
        parallaxTicking = false;
      });
      parallaxTicking = true;
    }
  }, { passive: true });

  updateAllParallax();
}

// =====================
// MEDIA TAG AUTO-SWITCHER
// =====================
// Automatically detects if an img has a video source or if a video has an image source
// and replaces the HTML tag appropriately. This allows changing media types just by changing the src.
document.addEventListener("DOMContentLoaded", () => {
  const mediaElements = document.querySelectorAll(".parallax-layer-inner img, .parallax-layer-inner video");
  
  mediaElements.forEach(el => {
    const src = el.getAttribute("src");
    if (!src) return;
    
    const isVideoSrc = src.match(/\.(mp4|webm|ogg)$/i);
    const isImageSrc = src.match(/\.(jpeg|jpg|png|gif|webp)$/i);
    const isImgTag = el.tagName.toLowerCase() === "img";
    const isVideoTag = el.tagName.toLowerCase() === "video";
    
    if (isImgTag && isVideoSrc) {
      const video = document.createElement("video");
      video.src = src;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.setAttribute("playsinline", "");
      if (el.className) video.className = el.className;
      el.replaceWith(video);
    } else if (isVideoTag && isImageSrc) {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.loading = "lazy";
      if (el.className) img.className = el.className;
      el.replaceWith(img);
    }
  });
});

// =====================
// MOBILE VIDEO OPTIMIZATION
// =====================
// Pauses videos when not visible on mobile to save battery and data
document.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.innerWidth <= 768;
  if (!isMobile) return;
  
  const videos = document.querySelectorAll(".parallax-layer video");
  if (videos.length === 0) return;
  
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.play().catch(() => {});
      } else {
        entry.target.pause();
      }
    });
  }, { threshold: 0.3 });
  
  videos.forEach(video => {
    videoObserver.observe(video);
  });
});
