import { useEffect, useRef } from 'react';

const HOVER_TARGETS = 'a, button, .showcase__card, .magnetic-text-container';

/** Custom cursor that follows the mouse and grows over interactive elements. */
export function useCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const isHoverable = (target: EventTarget | null): target is Element =>
      target instanceof Element && target.closest(HOVER_TARGETS) !== null;

    const onMouseMove = (event: MouseEvent) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    };

    const onMouseOver = (event: MouseEvent) => {
      if (isHoverable(event.target)) cursor.classList.add('hover');
    };

    const onMouseOut = (event: MouseEvent) => {
      if (isHoverable(event.target) && !isHoverable(event.relatedTarget)) {
        cursor.classList.remove('hover');
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return cursorRef;
}
