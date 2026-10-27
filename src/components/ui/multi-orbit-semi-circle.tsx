import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { Brain, Puzzle, Smartphone, type LucideIcon } from "lucide-react";
import { MeshGradientSVG } from "@/components/ui/shader-svg";

export interface Skill {
  name: string;
  icon: (size: number) => ReactNode;
}

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const img = (path: string) => (size: number) => (
  <img
    src={`${DEVICON}/${path}`}
    alt=""
    width={size}
    height={size}
    className="object-contain cursor-pointer transition-transform hover:scale-110"
    style={{ minWidth: size, minHeight: size }}
  />
);

const lucide = (Icon: LucideIcon) => (size: number) => (
  <Icon size={size} className="cursor-pointer transition-transform hover:scale-110 text-[var(--acid)]" />
);

export const DEFAULT_SKILLS: Skill[] = [
  { name: "React", icon: img("react/react-original.svg") },
  { name: "TypeScript", icon: img("typescript/typescript-original.svg") },
  { name: "JavaScript", icon: img("javascript/javascript-original.svg") },
  { name: "Node.js", icon: img("nodejs/nodejs-original.svg") },
  { name: "Python", icon: img("python/python-original.svg") },
  { name: "C++", icon: img("cplusplus/cplusplus-original.svg") },

  { name: "HTML5", icon: img("html5/html5-original.svg") },
  { name: "CSS3", icon: img("css3/css3-original.svg") },
  { name: "Tailwind CSS", icon: img("tailwindcss/tailwindcss-original.svg") },
  { name: "Git", icon: img("git/git-original.svg") },
  { name: "MongoDB", icon: img("mongodb/mongodb-original.svg") },
  { name: "MySQL", icon: img("mysql/mysql-original.svg") },
  { name: "PostgreSQL", icon: img("postgresql/postgresql-original.svg") },
  { name: "Firebase", icon: img("firebase/firebase-original.svg") },

  { name: "Docker", icon: img("docker/docker-original.svg") },
  { name: "Redux", icon: img("redux/redux-original.svg") },
  { name: "Figma", icon: img("figma/figma-original.svg") },
  { name: "Linux", icon: img("linux/linux-original.svg") },
  { name: "Android", icon: img("android/android-original.svg") },
  { name: "Kotlin", icon: img("kotlin/kotlin-original.svg") },
  { name: "Microsoft Azure", icon: img("azure/azure-original.svg") },
  { name: "AI / ML", icon: lucide(Brain) },
  { name: "Problem Solving", icon: lucide(Puzzle) },
  { name: "Responsive Design", icon: lucide(Smartphone) },
];

const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const MESH_BOX = 170;
const MESH_PAD = 64;
const MESH_CONTENT = MESH_BOX - MESH_PAD;
const BLOB_RATIO = 115.4 / 231;
const BLOB_OFFSET = 13.4;

const RING_DEFS = [
  { start: 0, end: 6, factor: 0.17 },
  { start: 6, end: 14, factor: 0.28 },
  { start: 14, end: 24, factor: 0.39 },
];

const floatVars = (seed: number, amplitude: number): CSSProperties => {
  const pick = (n: number) => (rand(seed * 10 + n) * 2 - 1) * amplitude;
  return {
    "--fx1": `${pick(1).toFixed(1)}px`,
    "--fy1": `${pick(2).toFixed(1)}px`,
    "--fx2": `${pick(3).toFixed(1)}px`,
    "--fy2": `${pick(4).toFixed(1)}px`,
    "--fx3": `${pick(5).toFixed(1)}px`,
    "--fy3": `${pick(6).toFixed(1)}px`,
    "--float-dur": `${(7 + rand(seed * 10 + 7) * 6).toFixed(2)}s`,
    "--float-delay": `${(-rand(seed * 10 + 8) * 7).toFixed(2)}s`,
  } as CSSProperties;
};

interface OrbitItem {
  skill: Skill;
  homeX: number;
  homeY: number;
  collapseX: number;
  collapseY: number;
  seed: number;
}

interface SemiCircleOrbitProps {
  items: OrbitItem[];
  centerY: number;
  iconSize: number;
  expanded: boolean;
  itemRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
}

function SemiCircleOrbit({ items, centerY, iconSize, expanded, itemRefs }: SemiCircleOrbitProps) {
  return (
    <>
      {items.map((item) => {
        const { skill } = item;
        const tooltipAbove = item.homeY > centerY;

        return (
          <div
            key={skill.name}
            ref={(el) => {
              itemRefs.current[skill.name] = el;
            }}
            data-hx={item.homeX}
            data-hy={item.homeY}
            className="absolute"
            style={{
              left: `${item.homeX - iconSize / 2}px`,
              top: `${item.homeY - iconSize / 2}px`,
              zIndex: 5,
              transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div
              style={{
                transform: expanded ? "translate(0px, 0px)" : `translate(${item.collapseX.toFixed(1)}px, ${item.collapseY.toFixed(1)}px)`,
                transition: "transform 0.22s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <div
                className="flex flex-col items-center group orbit-float"
                style={floatVars(item.seed, iconSize * 0.28)}
              >
                {skill.icon(iconSize)}

                <div
                  className={`absolute ${
                    tooltipAbove ? "bottom-[calc(100%+8px)]" : "top-[calc(100%+8px)]"
                  } hidden group-hover:block w-28 rounded-lg bg-black px-2 py-1 text-xs text-white shadow-lg text-center`}
                >
                  {skill.name}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-black ${
                      tooltipAbove ? "top-full" : "bottom-full"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

interface MultiOrbitSemiCircleProps {
  skills?: Skill[];
  heading?: string;
}

export default function MultiOrbitSemiCircle({
  skills = DEFAULT_SKILLS,
  heading = "Skills",
}: MultiOrbitSemiCircleProps) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const updateSize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const baseWidth = Math.min(size.width * 0.72, 660);

  const iconSize =
    size.width < 480
      ? Math.max(30, baseWidth * 0.065)
      : size.width < 768
      ? Math.max(32, baseWidth * 0.065)
      : Math.max(36, baseWidth * 0.075);

  const outer = baseWidth * 0.39;
  const sphereWidth = outer * 2 + iconSize;
  const sphereHeight = sphereWidth;
  const centerX = sphereWidth / 2;
  const centerY = sphereHeight / 2;

  const repelRadius = Math.max(140, iconSize * 4);
  const safeZone = iconSize * 0.8;

  const repel = (event: ReactPointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const mx = event.clientX - rect.left;
    const my = event.clientY - rect.top;

    for (const el of Object.values(itemRefs.current)) {
      const hx = el?.dataset.hx;
      const hy = el?.dataset.hy;
      if (!el || !hx || !hy) continue;
      const dx = parseFloat(hx) - mx;
      const dy = parseFloat(hy) - my;
      const dist = Math.hypot(dx, dy);

      if (dist < safeZone || dist >= repelRadius) {
        if (el.style.transform) el.style.transform = "";
      } else {
        const push = (1 - dist / repelRadius) * 42;
        el.style.transform = `translate(${((dx / dist) * push).toFixed(1)}px, ${((dy / dist) * push).toFixed(1)}px)`;
      }
    }
  };

  const resetRepel = () => {
    for (const el of Object.values(itemRefs.current)) {
      if (el) el.style.transform = "";
    }
  };

  const collapseTimer = useRef<number | null>(null);

  const isMobile = size.width > 0 && size.width < 768;
  const isExpanded = isMobile || expanded;

  const handleEnter = () => {
    if (isMobile) return;
    if (collapseTimer.current !== null) {
      window.clearTimeout(collapseTimer.current);
      collapseTimer.current = null;
    }
    setExpanded(true);
  };

  const handleLeave = () => {
    resetRepel();
    if (isMobile) return;
    if (collapseTimer.current !== null) window.clearTimeout(collapseTimer.current);
    collapseTimer.current = window.setTimeout(() => {
      collapseTimer.current = null;
      setExpanded(false);
    }, 120);
  };

  useEffect(() => {
    return () => {
      if (collapseTimer.current !== null) window.clearTimeout(collapseTimer.current);
    };
  }, []);

  const items = useMemo(() => {
    const result: OrbitItem[] = [];
    if (!size.width) return result;

    const meshScale = size.width < 640 ? 0.62 : 1;
    const meshRadius = BLOB_RATIO * MESH_CONTENT * meshScale;
    const meshOffsetY = BLOB_OFFSET * meshScale;
    const clearRadius = meshRadius + meshOffsetY + iconSize / 2 + 16;
    const rowGap = iconSize;
    const maxRowRadius = outer;

    const ringDefs = RING_DEFS.map((def, i) => ({
      ...def,
      end: i === RING_DEFS.length - 1 ? skills.length : def.end,
      radius: baseWidth * def.factor,
    }));

    ringDefs.forEach((ring, rowIndex) => {
      const ringSkills = skills.slice(ring.start, ring.end);
      const ringCount = Math.max(1, ringSkills.length);
      const step = 360 / ringCount;
      const rowRadius = Math.min(clearRadius + rowIndex * rowGap, maxRowRadius);
      const rowOffset = (rowIndex % 2) * (step / 2);

      ringSkills.forEach((skill, i) => {
        const homeAngle = ((i / ringCount) * 360 * Math.PI) / 180;
        const homeX = centerX + ring.radius * Math.cos(homeAngle);
        const homeY = centerY - ring.radius * Math.sin(homeAngle);

        const collapsedAngle = homeAngle + (rowOffset * Math.PI) / 180;
        const collapsedX = centerX + rowRadius * Math.cos(collapsedAngle);
        const collapsedY = centerY - rowRadius * Math.sin(collapsedAngle);

        result.push({
          skill,
          homeX,
          homeY,
          collapseX: collapsedX - homeX,
          collapseY: collapsedY - homeY,
          seed: i * 11 + rowIndex * 7 + 3,
        });
      });
    });

    return result;
  }, [skills, iconSize, outer, baseWidth, centerX, centerY, size.width]);

  return (
    <section className="py-20 relative min-h-screen w-full overflow-hidden">
          <div className="relative flex flex-col items-center text-center z-10 px-4 sm:px-10 lg:px-16">
        <h1 className="my-3 text-2xl sm:text-3xl lg:text-4xl font-bold font-[Syne] tracking-tight text-[#f2ecdf]">{heading}</h1>

        <div
          ref={containerRef}
          className="relative mx-auto mt-14 md:mt-0 flex items-center justify-center"
          style={{ width: sphereWidth, height: sphereHeight }}
          onPointerEnter={handleEnter}
          onPointerMove={repel}
          onPointerLeave={handleLeave}
        >
          <div className="absolute z-0 w-full max-w-[170px] pointer-events-none opacity-80 scale-[0.62] sm:scale-100">
            <MeshGradientSVG />
          </div>
          <SemiCircleOrbit
            items={items}
            centerY={centerY}
            iconSize={iconSize}
            expanded={isExpanded}
            itemRefs={itemRefs}
          />
        </div>
      </div>
    </section>
  );
}
