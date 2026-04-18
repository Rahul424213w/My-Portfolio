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
// TYPING EFFECT
// =====================
const roles = ["Web Developer 💻", "CSE Student 🎓", "Tech Enthusiast 🚀", "UI Craftsman ✨"];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typingEl = document.getElementById("typing");

function typeEffect() {
  const current = roles[roleIndex % roles.length];
  if (!isDeleting && charIndex <= current.length) {
    typingEl.textContent = current.substring(0, charIndex++);
    setTimeout(typeEffect, 100);
  } else if (isDeleting && charIndex >= 0) {
    typingEl.textContent = current.substring(0, charIndex--);
    setTimeout(typeEffect, 60);
  } else {
    if (!isDeleting) {
      isDeleting = true;
      setTimeout(typeEffect, 1200);
    } else {
      isDeleting = false;
      roleIndex++;
      setTimeout(typeEffect, 300);
    }
  }
}
typeEffect();


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
function handleSubmit(btn) {
  btn.textContent = 'Sent! ✦';
  btn.style.background = 'var(--cyan)';
  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = 'var(--acid)';
  }, 3000);
}


// =====================
// NAV SCROLL EFFECT
// =====================
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.style.borderBottomColor = window.scrollY > 50
    ? 'rgba(200,255,0,0.2)'
    : 'rgba(200,255,0,0.1)';
});