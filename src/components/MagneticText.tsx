import { useRef } from 'react';
import { useMagneticText } from '../hooks/useMagneticText';

interface MagneticTextProps {
  words: string[];
}

export default function MagneticText({ words }: MagneticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const innerContainerRef = useRef<HTMLDivElement>(null);
  const baseTextRef = useRef<HTMLSpanElement>(null);
  const innerTextRef = useRef<HTMLSpanElement>(null);

  useMagneticText(containerRef, circleRef, innerContainerRef, baseTextRef, innerTextRef, words);

  return (
    <div className="magnetic-text-container" data-words={JSON.stringify(words)}>
      <span className="base-text" ref={baseTextRef}>
        {words[0]}
      </span>
      <div className="magnetic-circle" ref={circleRef}>
        <div className="inner-text-container" ref={innerContainerRef}>
          <span className="inner-text" ref={innerTextRef}>
            {words[1]}
          </span>
        </div>
      </div>
    </div>
  );
}
