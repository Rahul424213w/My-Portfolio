// =====================
// CUSTOM CURSOR
// =====================
const cursor = document.getElementById('cursor');
let mx = 0, my = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;

  // Update main cursor instantly
  if (cursor) {
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  }
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