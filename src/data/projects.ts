/**
 * Project data.
 *
 * `showcaseProjects` drives the scroll-linked showcase in the Projects section.
 * Every entry maps to a real, verified repository — the links below were
 * checked against the GitHub profile of Rahul424213w, and the live demos are
 * the deploy URLs published by those repositories.
 */

export interface ShowcaseProject {
  /** Stable key. */
  id: string;
  /** Two digit index used in the editorial numbering. */
  index: string;
  /** Short category line above the title. */
  category: string;
  /** Project name. */
  title: string;
  /** One line summary. */
  tagline: string;
  /** Two or three sentences of detail. */
  description: string;
  /** Preview artwork. Omitted when the project ships no screenshot. */
  image?: string;
  /** Alternative text for the preview artwork. */
  imageAlt?: string;
  /** Shown instead of a screenshot when the repository has no preview image. */
  concept?: string;
  /** Verified technology stack. */
  stack: string[];
  /** Live deployment, when the repository publishes one. */
  liveUrl?: string;
  /** Source code. */
  sourceUrl: string;
  /** Year the project was built. */
  year: string;
}

export const showcaseProjects: ShowcaseProject[] = [
  {
    id: 'velocity',
    index: '01',
    category: 'Real-time Tracking',
    title: 'Velocity',
    tagline: 'Live bus positions, routes and ETAs for campus commuters.',
    description:
      'A college bus tracking system built around a Node.js and Socket.IO realtime core. Drivers log in to run a route, students see the vehicle move on a Leaflet map, and every connected browser receives position updates as they happen.',
    concept: 'Live map interface — drawn from the Leaflet + Socket.IO screens',
    stack: ['Node.js', 'Express', 'Socket.IO', 'Leaflet.js', 'HTML', 'CSS', 'JavaScript'],
    sourceUrl: 'https://github.com/Rahul424213w/bus-tracking',
    year: '2025',
  },
  {
    id: 'truthlens',
    index: '02',
    category: 'Trust & Safety',
    title: 'TruthLens',
    tagline: 'Credibility scoring for the news, text and images you are sent.',
    description:
      'TruthLens passes an article, a piece of text or an image through a Gemini AI pipeline and returns a credibility score, the bias it detects and how reliable it thinks the sources are — a reading aid built for misinformation.',
    image: 'images/photo 7.png',
    imageAlt: 'TruthLens credibility analysis screen',
    stack: ['Node.js', 'Express', 'Gemini AI', 'HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://truth-lens-3urx.onrender.com/',
    sourceUrl: 'https://github.com/Rahul424213w/Truth-lens',
    year: '2025',
  },
  {
    id: 'screenbook',
    index: '03',
    category: 'Media Tracker',
    title: 'ScreenBook',
    tagline: 'Track what you watch, review it, and see the shape of your year.',
    description:
      'A full-stack entertainment tracker for films and series. Search live databases, keep watchlists, log reviews and watch the habits turn into interactive statistics — Node.js and Express on the server, MongoDB for the records.',
    image: 'images/photo 6.png',
    imageAlt: 'ScreenBook watchlist and viewing statistics',
    stack: ['Node.js', 'Express', 'MongoDB', 'HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://screen-book.onrender.com/',
    sourceUrl: 'https://github.com/Rahul424213w/screen-book',
    year: '2025',
  },
  {
    id: 'krishi-bandhu',
    index: '04',
    category: 'Agricultural Intelligence',
    title: 'Krishi Bandhu',
    tagline: 'Multilingual farm advisory and live mandi prices for Indian farmers.',
    description:
      'Krishi Bandhu pairs voice-guided advisory with real-time market prices, collaborative logistics and a four-language interface — English, Hindi, Kannada and Marathi — so the platform can be used on a phone in the field.',
    image: 'images/photo 11.png',
    imageAlt: 'Krishi Bandhu advisory and market price screens',
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS 4',
      'Firebase',
      'Leaflet',
      'Groq',
      'Gemini AI',
    ],
    sourceUrl: 'https://github.com/Rahul424213w/Krishi--V01',
    year: '2025',
  },
  {
    id: 'pricewatch',
    index: '05',
    category: 'Market Intelligence',
    title: 'PriceWatch Pro',
    tagline: 'Amazon pricing intelligence with a command centre for distributors.',
    description:
      'PriceWatch Pro tracks listings across the marketplace, surfaces geographic price arbitrage and Buy Box movement, and pushes scheduled reports through a FastAPI and Groq backend — with Twilio for alerts and Playwright for collection.',
    image: 'images/photo 3.png',
    imageAlt: 'PriceWatch Pro command centre dashboard',
    stack: [
      'React 19',
      'Vite',
      'Tailwind CSS 4',
      'FastAPI',
      'PostgreSQL',
      'Groq · Llama-3-70B',
      'Twilio',
      'Playwright',
    ],
    sourceUrl: 'https://github.com/Rahul424213w/price-watch-pro',
    year: '2025',
  },
  {
    id: 'annsetu',
    index: '06',
    category: 'Social Impact',
    title: 'AnnSetu',
    tagline: 'Surplus food matched between donors, NGOs and volunteers.',
    description:
      'AnnSetu coordinates the collection and delivery of surplus food. An ML engine ranks the requests that need help first, dual-OTP verification closes the handover loop, and traffic-aware routing keeps the delivery moving.',
    image: 'images/photo 10.png',
    imageAlt: 'AnnSetu donation and delivery tracking screens',
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Firebase',
      'Leaflet',
      'Python ML',
      'shadcn/ui',
    ],
    sourceUrl: 'https://github.com/Rahul424213w/AnnSetu-EPOCH',
    year: '2025',
  },
];

export interface Project {
  image: string;
  alt: string;
  tag: string;
  title: string;
  description: string;
  link: string;
  linkLabel: string;
}

/** Secondary work — kept below the showcase as a compact list. */
export const moreProjects: Project[] = [
  {
    image: 'images/photo 9.png',
    alt: 'TripSync AI',
    tag: 'Next.js · TypeScript · Tailwind · Firebase',
    title: 'TripSync AI',
    description:
      'AI-powered travel planning platform that builds personalised itineraries, tracks budgets and replans journeys when plans move.',
    link: 'https://github.com/Rahul424213w/Tripsync-ai',
    linkLabel: 'View Project',
  },
  {
    image: 'images/photo 4.png',
    alt: 'PeerMatch',
    tag: 'Vanilla JS · Express.js · Groq Llama-3',
    title: 'PeerMatch — Campus Connect',
    description:
      'Campus collaboration platform for building teams, finding hackathons and matching with mentors through AI-assisted skill matching.',
    link: 'https://github.com/Rahul424213w/PeerMatch2',
    linkLabel: 'View Project',
  },
  {
    image: 'images/photo 5.png',
    alt: 'My Portfolio',
    tag: 'React · Vite · TypeScript · Tailwind',
    title: 'This Portfolio',
    description:
      'The site you are reading — a cinematic scroll portfolio built with React, Vite and Tailwind, with scroll-linked scene transitions.',
    link: 'https://github.com/Rahul424213w/My-Portfolio',
    linkLabel: 'View Project',
  },
];
