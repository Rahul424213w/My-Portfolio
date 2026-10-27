import GlassFolder, { type FolderFile } from "@/components/ui/glass-folder-cards";

export default function ProjectGlassFolders() {
  const aiFiles: FolderFile[] = [
    {
      name: "TruthLens",
      meta: "Gemini AI · Node.js",
      image: "images/photo 7.png",
      href: "https://truth-lens-3urx.onrender.com/",
    },
    {
      name: "Krishi Bandhu",
      meta: "Groq · Next.js 16",
      image: "images/photo 11.png",
      href: "https://github.com/Rahul424213w/Krishi--V01",
    },
    {
      name: "TripSync AI",
      meta: "Next.js · Firebase",
      image: "images/photo 9.png",
      href: "https://github.com/Rahul424213w/Tripsync-ai",
    },
  ];

  const platformFiles: FolderFile[] = [
    {
      name: "Velocity",
      meta: "Socket.IO · Leaflet",
      image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80",
      href: "https://github.com/Rahul424213w/bus-tracking",
    },
    {
      name: "ScreenBook",
      meta: "MongoDB · Express",
      image: "images/photo 6.png",
      href: "https://screen-book.onrender.com/",
    },
    {
      name: "PeerMatch",
      meta: "Groq Llama · Campus",
      image: "images/photo 4.png",
      href: "https://github.com/Rahul424213w/PeerMatch2",
    },
  ];

  const intelligenceFiles: FolderFile[] = [
    {
      name: "PriceWatch Pro",
      meta: "FastAPI · Groq 70B",
      image: "images/photo 3.png",
      href: "https://github.com/Rahul424213w/price-watch-pro",
    },
    {
      name: "AnnSetu",
      meta: "ML · Firebase",
      image: "images/photo 10.png",
      href: "https://github.com/Rahul424213w/AnnSetu-EPOCH",
    },
    {
      name: "My Portfolio",
      meta: "React · Vite · GLSL",
      image: "images/photo 5.png",
      href: "https://github.com/Rahul424213w/My-Portfolio",
    },
  ];

  return (
    <div className="relative w-full">
      {/* Dossiers Grid Container */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d0f14]/80 p-6 md:p-12 backdrop-blur-xl shadow-2xl">
        {/* Subtle Decorative Pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 text-white opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(currentColor 1.2px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Section Header */}
        <div className="relative z-10 mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Built From Ideas.<br />
              Engineered to Work.
            </h3>
            <p className="mt-2 text-sm text-neutral-400 max-w-xl leading-relaxed">
              A collection of projects exploring software, intelligent systems, and creative engineering. Each build represents a problem solved, a concept tested, and another step forward.
            </p>
          </div>

          <div></div>
        </div>

        {/* 3 Glass Folder Dossiers */}
        <div className="relative z-10 grid grid-cols-1 items-end justify-items-center gap-y-16 gap-x-10 md:grid-cols-2 lg:grid-cols-3 py-4">
          {/* Folder 1: AI & Trust */}
          <div className="flex flex-col items-center">
            <GlassFolder
              label="AI & Trust Systems"
              meta="3 projects"
              tone="dark"
              art="ember"
              seed={14}
              action="more"
              labelPlacement="bottom-left"
              files={aiFiles}
              menu={[
                {
                  label: "Open TruthLens",
                  onSelect: () => window.open("https://truth-lens-3urx.onrender.com/", "_blank"),
                },
                {
                  label: "Open Krishi Bandhu",
                  onSelect: () => window.open("https://github.com/Rahul424213w/Krishi--V01", "_blank"),
                },
                {
                  label: "Open TripSync AI",
                  onSelect: () => window.open("https://github.com/Rahul424213w/Tripsync-ai", "_blank"),
                },
              ]}
            />
          </div>

          {/* Folder 2: Realtime & Web */}
          <div className="flex flex-col items-center">
            <GlassFolder
              label="Realtime & Web Apps"
              meta="3 projects"
              tone="dark"
              art="aurora"
              seed={42}
              action="more"
              labelPlacement="bottom-left"
              files={platformFiles}
              menu={[
                {
                  label: "Open Velocity",
                  onSelect: () => window.open("https://github.com/Rahul424213w/bus-tracking", "_blank"),
                },
                {
                  label: "Open ScreenBook",
                  onSelect: () => window.open("https://screen-book.onrender.com/", "_blank"),
                },
                {
                  label: "Open PeerMatch",
                  onSelect: () => window.open("https://github.com/Rahul424213w/PeerMatch2", "_blank"),
                },
              ]}
            />
          </div>

          {/* Folder 3: Intelligence & Impact */}
          <div className="flex flex-col items-center">
            <GlassFolder
              label="Intelligence & Impact"
              meta="3 projects"
              tone="dark"
              art="verdant"
              seed={77}
              action="more"
              labelPlacement="bottom-left"
              files={intelligenceFiles}
              menu={[
                {
                  label: "Open PriceWatch Pro",
                  onSelect: () => window.open("https://github.com/Rahul424213w/price-watch-pro", "_blank"),
                },
                {
                  label: "Open AnnSetu",
                  onSelect: () => window.open("https://github.com/Rahul424213w/AnnSetu-EPOCH", "_blank"),
                },
                {
                  label: "Open Portfolio",
                  onSelect: () => window.open("https://github.com/Rahul424213w/My-Portfolio", "_blank"),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
