import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';

interface Peep {
  image: HTMLImageElement;
  rect: [number, number, number, number];
  width: number;
  height: number;
  x: number;
  y: number;
  anchorY: number;
  scaleX: number;
  walk: gsap.core.Timeline | null;
  render: (ctx: CanvasRenderingContext2D) => void;
}

const PEEP_SRC = 'images/photo 1.png';
const ROWS = 15;
const COLS = 7;

const randomRange = (min: number, max: number) => min + Math.random() * (max - min);
const removeFromArray = <T,>(arr: T[], index: number) => arr.splice(index, 1)[0];
const removeRandomFromArray = <T,>(arr: T[]) => removeFromArray(arr, (randomRange(0, arr.length) | 0));

/**
 * Walking-peeps canvas animation (illustration by openpeeps.com).
 * Ported 1:1 from the original crowd.js.
 */
export function useCrowd(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];
    const stage = { width: 0, height: 0 };

    const resetPeep = (peep: Peep) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const offsetY = 100 - 250 * gsap.parseEase('power2.in')(Math.random());
      const startY = stage.height - peep.height + offsetY;
      let startX: number;
      let endX: number;

      if (direction === 1) {
        startX = -peep.width;
        endX = stage.width;
        peep.scaleX = 1;
      } else {
        startX = stage.width + peep.width;
        endX = 0;
        peep.scaleX = -1;
      }

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;
      return { startY, endX };
    };

    const normalWalk = (peep: Peep, props: { startY: number; endX: number }) => {
      const { startY, endX } = props;
      const xDuration = 10;
      const yDuration = 0.25;
      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.5, 1.5));
      tl.to(peep, { duration: xDuration, x: endX, ease: 'none' }, 0);
      tl.to(
        peep,
        {
          duration: yDuration,
          repeat: (xDuration / yDuration) | 0,
          yoyo: true,
          y: startY - 10,
        },
        0,
      );
      return tl;
    };

    const createPeep = (image: HTMLImageElement, rect: [number, number, number, number]): Peep => ({
      image,
      rect,
      width: rect[2],
      height: rect[3],
      x: 0,
      y: 0,
      anchorY: 0,
      scaleX: 1,
      walk: null,
      render(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scaleX, 1);
        ctx.drawImage(
          this.image,
          this.rect[0],
          this.rect[1],
          this.rect[2],
          this.rect[3],
          0,
          0,
          this.width,
          this.height,
        );
        ctx.restore();
      },
    });

    const createPeeps = (img: HTMLImageElement) => {
      const { naturalWidth: w, naturalHeight: h } = img;
      const rectW = w / ROWS;
      const rectH = h / COLS;
      for (let i = 0; i < ROWS * COLS; i++) {
        allPeeps.push(createPeep(img, [(i % ROWS) * rectW, ((i / ROWS) | 0) * rectH, rectW, rectH]));
      }
    };

    const addPeepToCrowd = (): Peep => {
      const peep = removeRandomFromArray(availablePeeps);
      const props = resetPeep(peep);
      const walk = normalWalk(peep, props).eventCallback('onComplete', () => {
        removeFromArray(crowd, crowd.indexOf(peep));
        availablePeeps.push(peep);
        if (availablePeeps.length) addPeepToCrowd();
      });
      peep.walk = walk;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);
      return peep;
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!crowd.length) return;
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);
      crowd.forEach((peep) => peep.render(ctx));
      ctx.restore();
    };

    const resize = () => {
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      canvas.width = stage.width * devicePixelRatio;
      canvas.height = stage.height * devicePixelRatio;

      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });
      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);

      while (availablePeeps.length) {
        addPeepToCrowd().walk?.progress(Math.random());
      }
    };

    // Size + start the ticker immediately so the canvas is live on page load.
    // The crowd appears the moment the sprite sheet is decoded.
    stage.width = canvas.clientWidth || window.innerWidth;
    stage.height = canvas.clientHeight || window.innerHeight * 0.9;
    canvas.width = stage.width * devicePixelRatio;
    canvas.height = stage.height * devicePixelRatio;
    gsap.ticker.add(render);

    const img = new Image();
    img.onload = () => {
      createPeeps(img);
      resize();
    };
    img.onerror = () => console.warn('[crowd] Could not load peeps sprite — animation disabled.');
    img.src = PEEP_SRC;

    const onResize = () => {
      if (allPeeps.length) resize();
    };
    window.addEventListener('resize', onResize);

    return () => {
      gsap.ticker.remove(render);
      window.removeEventListener('resize', onResize);
      crowd.forEach((peep) => peep.walk?.kill());
      allPeeps.forEach((peep) => peep.walk?.kill());
    };
  }, [canvasRef]);
}
