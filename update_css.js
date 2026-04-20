const fs = require('fs');

const cssPath = 'c:\\Users\\rahul\\Desktop\\My-Portfolio - Copy\\style.css';
let content = fs.readFileSync(cssPath, 'utf-8');

// Find the start of .loader and the start of .skill-chip
const startIndex = content.indexOf('/* Loader Animation */');
const endIndex = content.indexOf('.skill-chip {');

if (startIndex !== -1 && endIndex !== -1) {
  const newCss = `
/* ------------------------------------------- */
/* PLAYING CARD REVEAL EFFECT                  */
/* ------------------------------------------- */
:root {
  --playingcard-bg: #18192b;
  --playingcard-fg: #f8fafc;
  --playingcard-outline-color: #3d3759;
  --playingcard-hover-outline-color: #7c6ee6;
  --playingcard-canvas-bg: #23244a;
  --playingcard-canvas-colors: 143,108,255;99,102,241;80,115,184;
  --playingcard-inscription-color: #00a9fe;
  --playingcard-inscription-color-hover: #8F04A7;
}

.playing-card {
  width: 100%;
  max-width: 412px;
  aspect-ratio: 3/4;
  cursor: pointer;
  perspective: 1000px;
}

.playing-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  padding: 1px;
  background: var(--playingcard-outline-color);
  transition: background 2s ease-in-out 0.7s, transform 0.3s ease;
  display: flex;
  flex-direction: column;
}

.playing-card:hover .playing-card-inner {
  background: var(--playingcard-hover-outline-color);
  transform: translateY(-5px);
}

.playing-card.revealed .playing-card-inner {
  background: #3a3a3a !important; /* Matches hover state of revealed card from React code */
}

.playing-card-bg {
  background-color: var(--playingcard-bg);
  border-radius: 16px;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 1;
}

.playing-card.revealed .playing-card-bg {
  background-color: #000;
}

.playing-card-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.playing-card.revealed .playing-card-canvas {
  opacity: 1;
}

/* Vignette Mask Overlay */
.playing-card-mask {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  mask-image: radial-gradient(400px at center, white, transparent);
  -webkit-mask-image: radial-gradient(400px at center, white, transparent);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.playing-card.revealed .playing-card-mask {
  opacity: 1;
}

.playing-card-text {
  position: absolute;
  z-index: 2;
  color: var(--playingcard-inscription-color);
  font-weight: bold;
  font-family: 'Space Mono', monospace;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  transition: color 2.4s ease-in-out 1s;
}

.playing-card:hover .playing-card-text {
  color: var(--playingcard-inscription-color-hover);
}

.playing-card-text.top-left {
  top: 20px;
  left: 20px;
}

.playing-card-text.bottom-right {
  bottom: 20px;
  right: 20px;
  transform: scale(-1);
}

.playing-card-text div {
  margin-bottom: -2px; /* manual letter spacing */
}

.playing-card-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  pointer-events: none;
}

.playing-card-image img {
  height: 36%;
  aspect-ratio: 1/1;
  object-fit: contain;
  object-position: center;
}

`;
  
  content = content.substring(0, startIndex) + newCss + content.substring(endIndex);
  fs.writeFileSync(cssPath, content, 'utf-8');
  console.log('CSS updated successfully.');
} else {
  console.log('Could not find injection points.');
}
