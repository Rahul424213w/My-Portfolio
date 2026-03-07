// =====================
// CUSTOM CURSOR
// =====================
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let mx = 0, my = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

setInterval(() => {
  trail.style.left = mx + 'px';
  trail.style.top = my + 'px';
}, 80);

document.querySelectorAll('a, button, .skill-chip, .proj-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
  });
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