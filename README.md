# My Portfolio — RAK.

A responsive and interactive personal portfolio website built with **React + TypeScript + Vite**.

**Live Site:** [https://rahul-ak.web.app](https://rahul-ak.web.app)

## Features

- Animated intro sequence with GSAP
- Custom cursor with magnetic text effects
- Crowd canvas walking animation
- Cinematic parallax scrolling sections
- Multi-orbit semi-circle skills visualization
- Auto-scrolling project showcase
- Dark/Light theme toggle
- Contact form via Formspree
- Firebase Analytics integration

## Tech Stack

- **Frontend:** React 18 + TypeScript, Vite
- **Styling:** Tailwind CSS + shadcn/ui structure (`src/styles/global.css`)
- **UI components:** shadcn/ui (`src/components/ui`)
- **Animations:** GSAP
- **Hosting:** Firebase Hosting
- **CI/CD:** GitHub Actions
- **Contact:** Formspree

## Project Structure

```
├── index.html            # Vite entry + Firebase CDN scripts
├── public/               # Static assets served as-is
│   ├── images/           # Sprites, project shots, favicon
│   └── photos/           # Cinematic collage photos & videos
└── src/
    ├── components/       # React components (Hero, Skills, Projects, ...)
    │   └── ui/           # shadcn/ui components (button, tooltip, multi-orbit, ...)
    ├── data/             # Content data (projects, parallax layers)
    ├── hooks/            # Behaviour hooks (crowd, parallax, intro, ...)
    ├── lib/              # Shared utilities (cn helper)
    └── styles/           # global.css (Tailwind entry)
```

## Development

```bash
npm install
npm run dev        # start dev server
npm run build      # typecheck + production build (dist/)
npm run preview    # preview the production build
npm run typecheck  # typecheck only
```

## Deployment

This site is hosted on Firebase Hosting and auto-deploys on every push to `main` via GitHub Actions (`npm run build`, then deploy `dist/`).

## Connect

- **GitHub:** [github.com/Rahul424213w](https://github.com/Rahul424213w)
- **LinkedIn:** [linkedin.com/in/rahul-a-k-42a422321/](https://www.linkedin.com/in/rahul-a-k-42a422321/)
- **X/Twitter:** [x.com/Rahulak424213w](https://x.com/Rahulak424213w)
