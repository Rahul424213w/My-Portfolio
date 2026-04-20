/**
 * Crowd Canvas — Walking people animation
 * Illustration by: https://www.openpeeps.com/
 *
 * OPTIMIZED: Canvas renders instantly, peeps appear as soon as the
 * sprite sheet is loaded. crossOrigin removed (local image = no CORS).
 */

(function () {
  'use strict';

  // ── Greeting cycling ────────────────────────────────────────────────────────
  const greetings = [
    { text: 'Hello',     lang: 'English'  },
    { text: 'こんにちは', lang: 'Japanese' },
    { text: 'Bonjour',   lang: 'French'   },
    { text: 'Hola',      lang: 'Spanish'  },
    { text: '안녕하세요', lang: 'Korean'   },
    { text: 'Ciao',      lang: 'Italian'  },
    { text: 'Hallo',     lang: 'German'   },
    { text: 'नमस्ते',    lang: 'Hindi'    },  // ← final greeting
  ];

  const greetingEl = document.getElementById('hero-greeting');

  if (greetingEl) {
    let idx = 0;

    const animateGreeting = (newText) => {
      // EXIT: slide current word upward + fade out (matches 0.12s CSS transition)
      greetingEl.style.transform = 'translateY(-100%)';
      greetingEl.style.opacity   = '0';

      setTimeout(() => {
        // Instant reset — disable transition, snap below, then re-enable
        greetingEl.style.transition = 'none';
        greetingEl.textContent      = newText;
        greetingEl.style.transform  = 'translateY(60%)';
        greetingEl.style.opacity    = '0';

        void greetingEl.offsetHeight; // force reflow

        // ENTER: slide up into place
        greetingEl.style.transition = 'transform 0.12s cubic-bezier(0.4,0,0.2,1), opacity 0.12s ease';
        greetingEl.style.transform  = 'translateY(0)';
        greetingEl.style.opacity    = '1';
      }, 140); // slightly over 120ms CSS duration
    };

    const cycleGreetings = () => {
      if (idx >= greetings.length - 1) return; // stop at नमस्ते
      idx++;
      animateGreeting(greetings[idx].text);

      if (idx < greetings.length - 1) {
        setTimeout(cycleGreetings, 550); // Snappy high-speed cycle
      }
    };

    setTimeout(cycleGreetings, 600);
  }


  // ── Crowd Canvas ─────────────────────────────────────────────────────────────
  const canvas = document.getElementById('crowd-canvas');
  if (!canvas) return;

  const ctx    = canvas.getContext('2d');
  const PEEP_SRC = 'images/open-peeps-sheet.png';
  const ROWS = 15;
  const COLS = 7;

  const randomRange        = (min, max) => min + Math.random() * (max - min);
  const randomIndex        = (arr)      => (randomRange(0, arr.length) | 0);
  const removeFromArray    = (arr, i)   => arr.splice(i, 1)[0];
  const removeItemFromArray = (arr, item) => removeFromArray(arr, arr.indexOf(item));
  const removeRandomFromArray = (arr)   => removeFromArray(arr, randomIndex(arr));

  const stage = { width: 0, height: 0 };

  // ── Reset + Walk helpers ────────────────────────────────────────────────────
  const resetPeep = ({ peep }) => {
    const direction = Math.random() > 0.5 ? 1 : -1;
    const offsetY   = 100 - 250 * gsap.parseEase('power2.in')(Math.random());
    const startY    = stage.height - peep.height + offsetY;
    let startX, endX;

    if (direction === 1) {
      startX = -peep.width;
      endX   = stage.width;
      peep.scaleX = 1;
    } else {
      startX = stage.width + peep.width;
      endX   = 0;
      peep.scaleX = -1;
    }

    peep.x = startX; peep.y = startY; peep.anchorY = startY;
    return { startX, startY, endX };
  };

  const normalWalk = ({ peep, props }) => {
    const { startY, endX } = props;
    const xDuration = 10;
    const yDuration = 0.25;
    const tl = gsap.timeline();
    tl.timeScale(randomRange(0.5, 1.5));
    tl.to(peep, { duration: xDuration, x: endX, ease: 'none' }, 0);
    tl.to(peep, {
      duration: yDuration,
      repeat: (xDuration / yDuration) | 0,
      yoyo: true,
      y: startY - 10,
    }, 0);
    return tl;
  };

  // ── Peep factory ────────────────────────────────────────────────────────────
  const createPeep = ({ image, rect }) => ({
    image, rect,
    width:  rect[2],
    height: rect[3],
    x: 0, y: 0, anchorY: 0,
    scaleX: 1,
    walk: null,
    render(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(this.scaleX, 1);
      ctx.drawImage(this.image, this.rect[0], this.rect[1], this.rect[2], this.rect[3], 0, 0, this.width, this.height);
      ctx.restore();
    },
  });

  const allPeeps       = [];
  const availablePeeps = [];
  const crowd          = [];

  const createPeeps = (img) => {
    const { naturalWidth: w, naturalHeight: h } = img;
    const rectW = w / ROWS;
    const rectH = h / COLS;
    for (let i = 0; i < ROWS * COLS; i++) {
      allPeeps.push(createPeep({
        image: img,
        rect: [(i % ROWS) * rectW, ((i / ROWS) | 0) * rectH, rectW, rectH],
      }));
    }
  };

  const addPeepToCrowd = () => {
    const peep  = removeRandomFromArray(availablePeeps);
    const props = resetPeep({ peep });
    const walk  = normalWalk({ peep, props })
      .eventCallback('onComplete', () => {
        removeItemFromArray(crowd, peep);
        availablePeeps.push(peep);
        if (availablePeeps.length) addPeepToCrowd();
      });
    peep.walk = walk;
    crowd.push(peep);
    crowd.sort((a, b) => a.anchorY - b.anchorY);
    return peep;
  };

  // ── Render loop ─────────────────────────────────────────────────────────────
  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!crowd.length) return;
    ctx.save();
    ctx.scale(devicePixelRatio, devicePixelRatio);
    crowd.forEach((peep) => peep.render(ctx));
    ctx.restore();
  };

  // ── Resize ───────────────────────────────────────────────────────────────────
  const resize = () => {
    stage.width  = canvas.clientWidth;
    stage.height = canvas.clientHeight;
    canvas.width  = stage.width  * devicePixelRatio;
    canvas.height = stage.height * devicePixelRatio;

    crowd.forEach((p) => { if (p.walk) p.walk.kill(); });
    crowd.length          = 0;
    availablePeeps.length = 0;
    availablePeeps.push(...allPeeps);

    while (availablePeeps.length) {
      addPeepToCrowd().walk.progress(Math.random());
    }
  };

  // ── Init: starts the ticker immediately so the canvas is LIVE on page load ──
  // The crowd appears the moment the sprite sheet is decoded.
  const sizeCanvasNow = () => {
    stage.width  = canvas.clientWidth  || window.innerWidth;
    stage.height = canvas.clientHeight || window.innerHeight * 0.9;
    canvas.width  = stage.width  * devicePixelRatio;
    canvas.height = stage.height * devicePixelRatio;
  };

  sizeCanvasNow();
  gsap.ticker.add(render); // start ticker NOW — renders empty canvas (instant)

  // ── Load image WITHOUT crossOrigin (same-origin file — no CORS needed) ──────
  const img = new Image();
  // NOTE: do NOT set img.crossOrigin for a local file — it causes unnecessary
  // preflight delays and can break loading on some servers.
  img.onload = () => {
    createPeeps(img);
    resize(); // seed crowd immediately
  };
  img.onerror = () =>
    console.warn('[crowd.js] Could not load peeps sprite — animation disabled.');
  img.src = PEEP_SRC;  // browser starts fetching immediately

  window.addEventListener('resize', () => {
    if (allPeeps.length) resize();
  });

})();
