import { useEffect, type RefObject } from 'react';

/**
 * Magnetic morphing text: a circle grows under the cursor showing the next
 * word, and the word list advances every time the cursor leaves.
 */
export function useMagneticText(
  containerRef: RefObject<HTMLDivElement | null>,
  circleRef: RefObject<HTMLDivElement | null>,
  innerContainerRef: RefObject<HTMLDivElement | null>,
  baseTextRef: RefObject<HTMLSpanElement | null>,
  innerTextRef: RefObject<HTMLSpanElement | null>,
  words: string[],
) {
  useEffect(() => {
    const container = containerRef.current;
    const circle = circleRef.current;
    const innerContainer = innerContainerRef.current;
    const baseTextEl = baseTextRef.current;
    const innerTextEl = innerTextRef.current;
    if (!container || !circle || !innerContainer || !baseTextEl || !innerTextEl) return;

    let wordIndex = 0;
    if (words.length >= 2) {
      baseTextEl.textContent = words[0];
      innerTextEl.textContent = words[1];
    }

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let animationFrame = 0;
    let transitionTimeout = 0;

    const updateSize = () => {
      innerContainer.style.width = `${container.offsetWidth}px`;
      innerContainer.style.height = `${container.offsetHeight}px`;
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const animate = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      circle.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      innerContainer.style.transform = `translate(${-currentX}px, ${-currentY}px)`;

      animationFrame = requestAnimationFrame(animate);
    };

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
    };

    const onMouseEnter = (event: MouseEvent) => {
      window.clearTimeout(transitionTimeout);
      const rect = container.getBoundingClientRect();
      targetX = currentX = event.clientX - rect.left;
      targetY = currentY = event.clientY - rect.top;

      circle.style.width = '150px';
      circle.style.height = '150px';

      cancelAnimationFrame(animationFrame);
      animate();
    };

    const onMouseLeave = () => {
      circle.style.width = '0px';
      circle.style.height = '0px';
      cancelAnimationFrame(animationFrame);

      if (!words.length) return;
      transitionTimeout = window.setTimeout(() => {
        wordIndex = (wordIndex + 1) % words.length;
        const nextWordIndex = (wordIndex + 1) % words.length;

        baseTextEl.textContent = words[wordIndex];
        innerTextEl.textContent = words[nextWordIndex];
      }, 500);
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('resize', updateSize);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      window.clearTimeout(transitionTimeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [containerRef, circleRef, innerContainerRef, baseTextRef, innerTextRef, words]);
}
