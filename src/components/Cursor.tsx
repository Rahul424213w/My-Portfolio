import { useCursor } from '../hooks/useCursor';

export default function Cursor() {
  const cursorRef = useCursor();

  return (
    <div className="cursor" id="cursor" ref={cursorRef}>
      {/* Linux DMZ-Black style arrow cursor */}
      <svg
        className="cursor-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
      >
        {/* White outline stroke for the classic Linux cursor border */}
        <path
          d="M3 2L3 18L7.5 13.5L10.5 20L12.5 19L9.5 12.5L15.5 12.5L3 2Z"
          fill="white"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Black fill — the arrow body */}
        <path
          d="M3 2L3 18L7.5 13.5L10.5 20L12.5 19L9.5 12.5L15.5 12.5L3 2Z"
          fill="black"
          stroke="black"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
