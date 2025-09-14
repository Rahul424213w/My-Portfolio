
const roles = ["Web Developer 💻", "CSE Student 🎓", "Tech Enthusiast 🚀"];
let roleIndex = 0;
let charIndex = 0;
let currentRole = "";
let isDeleting = false;
const typingElement = document.getElementById("typing");

function typeEffect() {
  if (roleIndex >= roles.length) roleIndex = 0;
  currentRole = roles[roleIndex];

  if (!isDeleting && charIndex <= currentRole.length) {
    typingElement.textContent = currentRole.substring(0, charIndex);
    charIndex++;
    setTimeout(typeEffect, 120);
  } else if (isDeleting && charIndex >= 0) {
    typingElement.textContent = currentRole.substring(0, charIndex);
    charIndex--;
    setTimeout(typeEffect, 80);
  } else {
    if (!isDeleting) {
      isDeleting = true;
      setTimeout(typeEffect, 1000);
    } else {
      isDeleting = false;
      roleIndex++;
      setTimeout(typeEffect, 300);
    }
  }
}
typeEffect();

const faders = document.querySelectorAll(".fade-in");

function showOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  faders.forEach(el => {
    const rect = el.getBoundingClientRect().top;
    if (rect < triggerBottom) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", showOnScroll);
showOnScroll();
