export const SAMPLE = false;

export const profile = {
  name: "Vidur Ramachandran",
  firstName: "Vidur",

  brand: "Vidur Builds",
  initial: "V",
  role: "Product Generalist & Builder",
  location: "Hyderabad, India",
  email: "vidur2002@gmail.com",
  linkedin: "https://in.linkedin.com/in/vidurr",
  resumeUrl: "/assets/Vidur_CV.pdf",
  bookingUrl: "https://cal.com/vidur-r-a55ab0",

  // Add the Instagram profile URL here when available. An empty value hides the link.
  instagram: "https://www.instagram.com/vidur.life?mdxt=YmQ5cnVlcW4yMnoz",
  photo: "/media/vidur-face.jpg",
  headshot: "/photos/headshot.jpg",
  openTo:
    "Product Manager, Project Manager, Associate PM, Product Analyst, Business Analyst and Founder's Office roles, plus selective consulting work.",
};

export type IconName =
  | "box"
  | "briefcase"
  | "chart"
  | "chef"
  | "code"
  | "compass"
  | "cpu"
  | "database"
  | "dumbbell"
  | "heart"
  | "info"
  | "layers"
  | "leaf"
  | "lightbulb"
  | "map-pin"
  | "message"
  | "message-more"
  | "mic"
  | "pen"
  | "plane"
  | "presentation"
  | "rocket"
  | "search"
  | "shield"
  | "sparkles"
  | "target"
  | "user"
  | "users"
  | "wallet"
  | "zap";

export type Chip = {
  id: string;
  name: string;
  logo: string;

  wordmark?: string;
  role: string;
  period: string;
  blurb: string;
  href: string;
  dark?: boolean;
};

export const chips: Record<"iagent" | "saathi" | "deloitte", Chip> = {
  iagent: {
    id: "iagent",
    name: "iAgent Labs",
    logo: "/logos/iagent.svg",
    role: "Product / Program Management",
    period: "Aug 2026 – now",
    blurb: "Marketplace and AI-led product execution.",
    href: "https://iagentlabs.com/",
  },
  saathi: {
    id: "saathi",
    name: "Saathi",
    logo: "/logos/saathi.png",
    role: "Product: UX, AI & Operations",
    period: "Sep 2026 – now",
    blurb: "Roadmapping, user research and fintech onboarding.",
    href: "https://www.saathi.money/",
  },
  deloitte: {
    id: "deloitte",
    name: "Deloitte",
    logo: "/logos/deloitte-mark.svg",
    wordmark: "/logos/deloitte.svg",
    role: "Deloitte USI Consulting",
    period: "Feb 2024 – Jun 2025",
    blurb: "Enterprise data work for Fortune 500 clients.",
    href: "https://www.deloitte.com/ui/en/about.html",
  },
};

export const hero = {
  eyebrow: ["Product", "Research", "Strategy", "Execution"],
  greeting: "Hi, I'm Vidur.",

  role: "Product Generalist & Builder.",
  lead: "I work across product strategy, user research, prototyping and execution — building products that make sense to people.",
};

export type HeroCard = {
  id: "work" | "info" | "experience";

  title: string;
  text: string;
  href: string;
  icon: IconName;
  tone: "peach" | "caramel" | "cream";
};

export const heroCards: HeroCard[] = [
  {
    id: "work",
    title: "Recent\nWork",
    text: "A few problems I've worked on recently.",
    href: "/builds",
    icon: "layers",
    tone: "peach",
  },
  {
    id: "info",
    title: "Info",
    text: "A bit about my background, interests and what drives me.",
    href: "/about",
    icon: "info",
    tone: "caramel",
  },
  {
    id: "experience",
    title: "My Experience",
    text: "Deloitte, Acumen Connect, Pi Dot, iAgent Labs and Saathi Money.",
    href: "/#journey",
    icon: "briefcase",
    tone: "cream",
  },
];

export const experienceLogos = [
  { name: "Deloitte", wordmark: "/logos/deloitte.svg" },
  { name: "Pi.Dot", logo: "/logos/pidot.svg" },
  { name: "Acumen Connect", wordmark: "/logos/acumen-wordmark.png" },
  { name: "iAgent Labs", logo: "/logos/iagent.svg" },
  { name: "Saathi Money", logo: "/logos/saathi.png" },
];

export const intro = {
  kicker: "Intro video",
  label: "Hear it from me",
  blurb: "My background, how I work and what I'm building.",
  src: "/media/vidur-intro.mp4",
  loop: "/media/vidur-intro-loop.mp4",
  poster: "/media/vidur-intro-poster.jpg",
  loopPoster: "/media/vidur-intro-loop.jpg",
  length: "0:21",
};

export const about = {
  eyebrow: "A bit about me",
  headline: ["A product generalist.", "Research, CX and growth."],
  body: "I work at the intersection of user research, product strategy, design and technology, turning complex problems into simple, intuitive experiences. Currently at iAgent Labs and Saathi. Previously at Deloitte.",
  cta: "More about me",
  skills: [
    { label: "User Research", icon: "users" },
    { label: "Product Strategy", icon: "layers" },
    { label: "UX Thinking", icon: "sparkles" },
    { label: "AI Prototyping", icon: "cpu" },
    { label: "GTM", icon: "chart" },
  ] satisfies { label: string; icon: IconName }[],
  photo: "/photos/golden-gate.jpg",
  photoAlt: "Vidur in front of the Golden Gate Bridge at night",
  place: "San Francisco",
};

export type Role = {
  id: string;
  company: string;
  type: string;
  role?: string;
  period: string;
  current?: boolean;
  text: string;
  tags: string[];
  logo?: string;

  logoWide?: boolean;
  href?: string;

  independent?: boolean;
};

export const journey = {
  eyebrow: "Work history",
  heading: "My journey so far.",
  sub: "Different roles, same thread — finding problems, building useful products, and getting them into people's hands.",
  independent: { title: "Independent Work", note: ["Part-time", "Pro bono", "Consulting"] },

  roles: [
    { id: "deloitte", company: "Deloitte USI Consulting", type: "Full-time", role: "Associate Analyst – Advertising, Marketing & Commerce", period: "Feb 2024 – Jun 2025", text: "Supported AEP and AJO delivery, SQL data validation, UAT and operational reporting with cross-functional teams.", tags: ["AEP", "AJO", "SQL", "Data Validation", "UAT"], logo: "/logos/deloitte-mark.svg", href: "https://www.deloitte.com/ui/en/about.html" },
    { id: "acumen", company: "Acumen Connect", type: "Internship → Full-time", role: "Product Associate", period: "Jan 2023 – Feb 2024", text: "Internship: Jan–May 2023; full-time: Jun 2023–Feb 2024. Supported product delivery, issue tracking, stakeholder coordination and SOPs.", tags: ["Product", "Operations", "Stakeholder Coordination"], logo: "/logos/acumen-wordmark.png", logoWide: true, href: "https://www.linkedin.com/company/acumen-connect-pvt-ltd/posts/" },
    { id: "pidot", company: "Pi Dot", type: "Pro bono", role: "Founder's Office Associate", period: "Sep 2025 – Apr 2026", text: "Supported the founder with product requirements and coordination.", tags: ["Product Requirements", "Coordination"], logo: "/logos/pidot.svg", href: "https://www.pidot.in/", independent: true },
    { id: "iagent", company: "iAgent Labs", type: "Part-time", role: "Product Generalist", period: "Aug 2026 – Present", current: true, text: "Identifying AI automation opportunities and shaping requirements with stakeholders and engineering teams.", tags: ["AI Automation", "Product", "Stakeholder Management"], logo: "/logos/iagent.svg", href: "https://iagentlabs.com/", independent: true },
    { id: "saathi", company: "Saathi Money", type: "Part-time", role: "Product & AI", period: "Sep 2026 – Present", current: true, text: "Working on AI finance product scope and roadmaps, user discovery and internal GenAI automation.", tags: ["Product Strategy", "User Discovery", "GenAI"], logo: "/logos/saathi.png", href: "https://www.saathi.money/", independent: true },
  ] satisfies Role[],
};

export type CaseStudy = {
  slug: string;
  group: string;
  title: string;
  summary: string;
  metrics: string[];
  demo: "guidance" | "money" | "simulation" | "pipeline";
  link?: { label: string; href: string };
  locked?: boolean;
  document?: string;
  sections: { heading: string; body: string }[];
};

export const caseStudies: CaseStudy[] = [
{"slug":"urban-company","title":"Urban Company","group":"Customer Experience & AI Support","summary":"Improving customer support, service recovery, and AI-to-human escalation.","metrics":[],"demo":"pipeline","document":"/case-studies/urban-company.html","sections":[]},
{"slug":"whatsapp","title":"WhatsApp","group":"Product Feature Case Study","summary":"An interactive case study exploring a Promotions inbox for WhatsApp.","metrics":[],"demo":"guidance","document":"/case-studies/whatsapp.html","sections":[]},
{"slug":"blinkit-freshchoice","title":"Blinkit FreshChoice","group":"Product Feature Innovation","summary":"Choosing eligible shorter-shelf-life batches at discounted prices.","metrics":[],"demo":"pipeline","document":"/case-studies/blinkit-freshchoice.html","sections":[]},
{"slug":"spotify","title":"Spotify","group":"Product & Business Strategy","summary":"Audiobook monetization, Premium bundling, and international expansion strategy.","metrics":[],"demo":"pipeline","document":"/case-studies/spotify.html","sections":[]},
{"slug":"pipeline-checks","title":"Pipeline Checks","group":"Data & Process Optimization","summary":"Automated validation, anomaly detection, and operational reporting.","metrics":[],"demo":"pipeline","document":"/case-studies/pipeline-checks.html","sections":[]},
  {
    slug: "saathi-guidance-layer",
    group: "Consulting",
    title: "Saathi Money: an in-app guidance layer",
    summary:
      "A concept PRD for Saathi's existing mobile app: calm, contextual guidance at the moments that decide trust, from onboarding and saving to borrowing, rewards and financial health.",
    metrics: ["7 decision moments mapped", "English · Hindi · Telugu"],
    demo: "guidance",
    link: { label: "Open the PRD prototype", href: "https://saathi-prd.vercel.app/" },
    sections: [
      {
        heading: "The problem",
        body: "New users see many finance surfaces, but may not know what Saathi helps them do first, whether it is safe, or how to use it in their own language.",
      },
      {
        heading: "The decision",
        body: "Keep the existing app intact and add guidance only at real decision points. Start with language, voice and simple safety before asking for any financial action.",
      },
      {
        heading: "What I designed",
        body: "A calmer V1 across onboarding, home, goals, borrowing, rewards, health and trust. Home becomes a command center, borrowing puts EMI, interest and comfort range before eligibility, and rewards stay separate from real savings.",
      },
      {
        heading: "How I'd measure it",
        body: "Onboarding completion, first-action completion and helpful-explanation rate improving together. Then first goal created, EMI explainer opens before eligibility, and fewer questions about token value.",
      },
    ],
  },
  {
    slug: "batua",
    group: "Prototypes",
    title: "Batua: money clarity for India",
    summary:
      "A mobile-first finance app concept that brings accounts, cards, UPI, investments, loans and goals into one calm decision surface. Other apps help people see money; Batua helps them understand it and act.",
    metrics: ["Goal: safe action in under 30s", "Read-only, consent-led"],
    demo: "money",
    link: { label: "Open the prototype", href: "https://batua-prd.vercel.app/" },
    sections: [
      {
        heading: "The problem",
        body: "Urban Indian users juggle salary accounts, UPI, two to four cards, investments, EPF/NPS, subscriptions and EMIs. Existing apps show dashboards but rarely explain them in plain language.",
      },
      {
        heading: "Who it's for",
        body: "Salaried professionals aged 24 to 38 with several money sources, household managers tracking shared spend, and first-time investors who want guidance without trading complexity.",
      },
      {
        heading: "What I built",
        body: "A PRD and high-fidelity prototype: explainable transactions, a credit card command center, budgets and goals that feed one safe-to-spend number, a subscription radar, and a plain-language wealth view.",
      },
      {
        heading: "How I'd measure it",
        body: "North star: weekly users who complete one recommended money action. Guardrails: category corrections below 8 percent, and above 95 percent success at finding and revoking data permissions.",
      },
    ],
  },
  {
    slug: "corpsim",
    group: "Prototypes",
    title: "CorpSim: the job before day one",
    summary:
      "A functional corporate-readiness simulation. Students step into an AI-powered virtual desktop, handle real emails and stakeholder meetings, and are scored on the skills employers hire for.",
    metrics: ["Functional prototype", "5-day simulations"],
    demo: "simulation",
    link: { label: "Try the prototype", href: "https://corp-sim-zeta.vercel.app/" },
    sections: [
      {
        heading: "The idea",
        body: "A founder-led idea: graduates reach their first job without ever having worked inside a company. The brief was open-ended; the job was to turn it into something people could actually try.",
      },
      {
        heading: "What I did",
        body: "Product framing, scenario flows and the working prototype: one program setup brief, AI stakeholders across sales, logistics, finance and leadership, and an eight-pillar evaluation rubric.",
      },
      {
        heading: "What it shows",
        body: "A university or employer can launch a role-ready simulation, such as a market-expansion analyst working through pricing, logistics and risk to a final executive recommendation.",
      },
      {
        heading: "Scope",
        body: "Implemented: product framing, flows and the prototype. Proposed: the production architecture.",
      },
    ],
  },
  {
    slug: "deloitte-data-investigation",
    group: "Enterprise",
    title: "Finding the failure inside 18M+ records",
    summary:
      "Enterprise data investigation across customer-data workflows at Deloitte USI: SQL-led root-cause analysis, earlier exception checks in Python, and the runbooks that made fixes repeatable.",
    metrics: ["18M+ records analysed", "Helped cut resolution time 28%"],
    demo: "pipeline",
    sections: [
      {
        heading: "Context",
        body: "When data-quality issues show up late in a workflow, finding the source takes longer and downstream teams trust the output less. The question was whether exceptions could surface earlier, in a form someone could investigate.",
      },
      {
        heading: "What I did",
        body: "Investigated recurring pipeline failures with SQL audits and root-cause analysis, validated large datasets, and found schema mismatches that were affecting downstream workflows.",
      },
      {
        heading: "What shipped",
        body: "A small, inspectable validation flow (clean, detect, review) for an LG Brazil engagement, plus SOPs and runbooks for support and QA so recurring issues were handled the same way every time.",
      },
      {
        heading: "Result",
        body: "Contributed to a 28% improvement in average incident-resolution time. Shared as an anonymised method, with no client data or proprietary code.",
      },
    ],
  },
];

export const samplePassword = "demo";

export type Photo = { src: string; alt: string; caption: string; w: number; h: number };

const photo = {
  classRoom: {
    src: "/photos/class-room.jpg",
    alt: "Vidur teaching a classroom of students from the front",
    caption: "Guest lecture",
    w: 689,
    h: 487,
  },
  classPresenting: {
    src: "/photos/class-presenting.jpg",
    alt: "Vidur presenting a slide on five product stages to a class",
    caption: "Same five stages, three worlds",
    w: 473,
    h: 547,
  },
  forest: {
    src: "/photos/coorg-walk.jpg",
    alt: "Vidur walking down a forest trail between tall trees",
    caption: "A forest trail",
    w: 1400,
    h: 874,
  },
  pelican: {
    src: "/photos/pelican.jpg",
    alt: "A pelican on a pier railing at sunset",
    caption: "Pier at golden hour",
    w: 709,
    h: 945,
  },
  miami: {
    src: "/photos/miami-beach.jpg",
    alt: "A Miami Beach surfboard standing in the sand by the sea",
    caption: "Miami Beach",
    w: 709,
    h: 945,
  },
  sunset: {
    src: "/photos/beach-sunset.jpg",
    alt: "Vidur on a beach at sunset",
    caption: "Chasing sunsets",
    w: 228,
    h: 228,
  },
  padel: {
    src: "/photos/padel.jpg",
    alt: "Vidur on a padel court after the rain",
    caption: "On the court",
    w: 709,
    h: 945,
  },
  food: {
    src: "/photos/food-plate.jpg",
    alt: "A plate of cabbage stir-fry and spinach kebabs",
    caption: "Cooked at home",
    w: 709,
    h: 945,
  },
  walk: {
    src: "/photos/thumbs-up.jpg",
    alt: "Vidur smiling with a thumbs up on a morning walk",
    caption: "Morning walk",
    w: 509,
    h: 660,
  },
  pasta: {
    src: "/photos/protein-pasta.jpg",
    alt: "Vidur cooking high-protein pasta for a reel",
    caption: "High-protein pasta",
    w: 247,
    h: 233,
  },
} satisfies Record<string, Photo>;

export type Placed = {
  photo: Photo;
  left: number;
  top: number;
  width: number;
  aspect: number;
  rotate: number;
  focus?: string;
};

export type Cluster = {
  id: "classes" | "travel" | "fitness";

  aspect: number;
  offset: number;
  photos: Placed[];
  label: { title: string; note?: string; icon: IconName; dark?: boolean; left: number; top: number; rotate: number };
  spark?: { left: number; top: number; rotate: number };
};

export const beyond = {
  eyebrow: "Beyond work",
  heading: ["Classes, places", "and a healthier me."],
  clusters: [
    {
      id: "classes",
      aspect: 460 / 565,
      offset: 6.5,
      photos: [
        { photo: photo.classRoom, left: 1, top: 1, width: 96, aspect: 452 / 330, rotate: -4.5 },
        { photo: photo.classPresenting, left: 24, top: 49, width: 70, aspect: 320 / 285, rotate: 3, focus: "55% 35%" },
      ],
      label: { title: "Guest lecture", note: "Design Thinking", icon: "mic", dark: true, left: 6, top: 80, rotate: -5 },
    },
    {
      id: "travel",
      aspect: 460 / 675,
      offset: 0,
      photos: [
        { photo: photo.forest, left: 5, top: 0, width: 89, aspect: 410 / 272, rotate: 3 },
        { photo: photo.pelican, left: 1, top: 39, width: 50, aspect: 230 / 276, rotate: -4 },
        { photo: photo.miami, left: 48, top: 37, width: 51, aspect: 235 / 275, rotate: 4 },
        { photo: photo.sunset, left: 28, top: 68, width: 56, aspect: 257 / 207, rotate: 3, focus: "50% 45%" },
      ],
      label: { title: "Travel", icon: "map-pin", left: 1, top: 78, rotate: -4 },
    },
    {
      id: "fitness",
      aspect: 520 / 648,
      offset: 4.2,
      photos: [
        { photo: photo.padel, left: 1, top: 1, width: 53, aspect: 275 / 315, rotate: -3 },
        { photo: photo.food, left: 49, top: 0, width: 50, aspect: 258 / 323, rotate: 3 },
        { photo: photo.walk, left: 1, top: 49, width: 47, aspect: 242 / 267, rotate: 3, focus: "50% 20%" },
        { photo: photo.pasta, left: 49, top: 51, width: 50, aspect: 262 / 278, rotate: -3 },
      ],
      label: { title: "Documenting my fitness journey", icon: "dumbbell", left: 16, top: 79, rotate: -4 },
      spark: { left: 79, top: 93, rotate: 70 },
    },
  ] satisfies Cluster[],
};

export const working = {
  eyebrow: "How I work",
  heading: ["What's it like", "working with me?"],
  sub: "A few things people usually tell me about working together.",
  traits: [
    {
      id: "user-first",
      title: "User-first thinker",
      text: "Brings a strong user lens to break down problems and find the right solutions.",
      icon: "users",
      tone: "cream",
    },
    {
      id: "ideas-action",
      title: "Ideas → Action",
      text: "Turns rough ideas into tangible prototypes quickly, and keeps momentum going.",
      icon: "zap",
      tone: "peach",
    },
    {
      id: "collaborative",
      title: "Clear & collaborative",
      text: "Easy to work with, communicates well, and keeps everyone on the same page.",
      icon: "message-more",
      tone: "peach",
    },
    {
      id: "big-picture",
      title: "Big-picture, aligned",
      text: "Moves comfortably across product, design, business and execution without losing sight of the goal.",
      icon: "layers",
      tone: "cream",
    },
  ] satisfies { id: string; title: string; text: string; icon: IconName; tone: "cream" | "peach" }[],
  short: "A generalist who brings user focus, clarity and execution to the table.",
  goodToKnow: [
    "Valid US B1/B2 business visa",
    "Comfortable across time zones",
    "Open to workshops, consulting and cross-functional work",
    "Based in Hyderabad, India (open to remote & global teams)",
  ],
};

export const letter = {
  eyebrow: "Let's connect",
  heading: ["Want to build", "something together?"],
  sub: "I'm always up for a good conversation, a new idea, or an interesting challenge.",
  greeting: "Hey there!",
  lines: [
    "I enjoy turning complex problems into simple, useful experiences — especially when it involves understanding people, exploring ideas, and building together.",
    "If that sounds like something you'd like to collaborate on, I'd love to chat.",
  ],
  signoff: ["Cheers,", "Vidur"],
  card: { name: "Vidur", tags: ["Product", "Research", "Design"] },
  chat: { title: "Let's chat", text: "Grab a slot that works for you." },
};

export type BuildCard = {
  id: string;
  title: string;
  text: string;
  href: string;
  focus?: string;
  preview?: string;
  visual: "case-preview" | "batua" | "corpsim" | "saathi-phone" | "code" | "prd" | "batua-phones" | "code-editor";

  tint: [string, string];
  plate?: string;
};

export const buildsPage = {
  "eyebrow": "Builds",
  "heading": "Builds & prototypes",
  "sub": "A collection of case studies, working prototypes and PRDs I've built — from early ideas to shipped solutions.",
  "rows": [
    {
      "id": "case-studies",
      "title": "Case Studies",
      "text": "End-to-end stories of problems, process and impact.",
      "icon": "layers",
      "cards": [
        {
          "id": "urban-company",
          "title": "Urban Company",
          "text": "Customer Experience & AI Support",
          "focus": "Improving customer support, service recovery, and AI-to-human escalation.",
          "href": "/case-study/urban-company",
          "preview": "/case-studies/urban-company.html",
          "visual": "case-preview",
          "tint": [
            "#fbe5d8",
            "#f9dec8"
          ],
          "plate": "#fdf1e7"
        },
        {
          "id": "whatsapp",
          "title": "WhatsApp",
          "text": "Product Feature Case Study",
          "focus": "An interactive case study exploring a Promotions inbox for WhatsApp.",
          "href": "/case-study/whatsapp",
          "preview": "/case-studies/whatsapp.html",
          "visual": "case-preview",
          "tint": ["#e5f3e9", "#d3eadc"],
          "plate": "#edf8ef"
        },
        {
          "id": "blinkit-freshchoice",
          "title": "Blinkit FreshChoice",
          "text": "Product Feature Innovation",
          "focus": "Choosing eligible shorter-shelf-life batches at discounted prices.",
          "href": "/case-study/blinkit-freshchoice",
          "preview": "/case-studies/blinkit-freshchoice.html",
          "visual": "case-preview",
          "tint": [
            "#fff1b8",
            "#ffe58b"
          ],
          "plate": "#fdf1e7"
        },
        {
          "id": "spotify",
          "title": "Spotify",
          "text": "Product & Business Strategy",
          "focus": "Audiobook monetization, Premium bundling, and international expansion strategy.",
          "href": "/case-study/spotify",
          "preview": "/case-studies/spotify.html",
          "visual": "case-preview",
          "tint": [
            "#fee6da",
            "#fbdbcc"
          ],
          "plate": "#fdf1e7"
        },
        {
          "id": "pipeline-checks",
          "title": "Pipeline Checks",
          "text": "Data & Process Optimization",
          "focus": "Automated validation, anomaly detection, and operational reporting.",
          "href": "/case-study/pipeline-checks",
          "preview": "/case-studies/pipeline-checks.html",
          "visual": "case-preview",
          "tint": [
            "#f5ebfd",
            "#e9dbf9"
          ],
          "plate": "#fdf1e7"
        }
      ]
    },
    {
      "id": "prototypes",
      "title": "Prototypes & PRDs",
      "text": "Hands-on artifacts that turn ideas into something testable.",
      "icon": "box",
      "cards": [
        {
          "id": "saathi-prd",
          "title": "Saathi Money",
          "text": "Product requirements, scope and roadmap",
          "href": "/prototype/saathi-money",
          "visual": "prd",
          "tint": [
            "#fbe2dc",
            "#f7d9d0"
          ],
          "plate": "#fdebe1"
        },
        {
          "id": "batua-proto",
          "title": "Batwa",
          "text": "Clickable flows & key journeys",
          "href": "/prototype/batwa",
          "visual": "batua-phones",
          "tint": [
            "#e4e8f4",
            "#d6dcec"
          ],
          "plate": "#e8eaf3"
        },
        {
          "id": "corpsim-proto",
          "title": "CorpSim",
          "text": "Experience the job before day one",
          "href": "/prototype/corpsim",
          "visual": "corpsim",
          "tint": [
            "#fdeada",
            "#fbdcbe"
          ],
          "plate": "#fbe9d9"
        }
      ]
    }
  ]
} satisfies { eyebrow: string; heading: string; sub: string; rows: { id: string; title: string; text: string; icon: IconName; cards: BuildCard[] }[] };

export const aboutPage = {
  eyebrow: "About me",
  heading: ["A product generalist", "building at the intersection", "of research, design and growth."],
  sub: "I turn ambiguous problems into simple, useful experiences — through user research, product strategy, design and hands-on building.",
  skills: [
    { label: "User Research", icon: "search" },
    { label: "Product Strategy", icon: "layers" },
    { label: "UX Thinking", icon: "pen" },
    { label: "Prototyping", icon: "code" },
    { label: "GTM", icon: "chart" },
  ] satisfies { label: string; icon: IconName }[],
  worked: [
    { name: "Deloitte", aside: "(Full-time)", note: "Associate Analyst" },
    { name: "Acumen Connect", aside: "(Internship → Full-time)", note: "Product Associate" },
    { name: "Pi Dot", aside: "(Pro bono)", note: "Founder's Office Associate" },
    { name: "iAgent Labs", aside: "(Part-time)", note: "Product Generalist", current: true },
    { name: "Saathi Money", aside: "(Part-time)", note: "Product & AI", current: true },
  ],
  drives:
    "I like being at the messy middle — when the problem isn't fully defined yet, and the shape of the solution is still open. I enjoy bringing people, ideas and context together to make progress.",
  steps: [
    { title: "Research", text: "Understand the user, context and real problem.", icon: "search" },
    { title: "Structure", text: "Turn insight into a clear plan and scope.", icon: "layers" },
    { title: "Prototype", text: "Build, test and learn quickly to move forward.", icon: "code" },
  ] satisfies { title: string; text: string; icon: IconName }[],
  cta: {
    heading: ["Let's build", "something together."],
    text: "A new idea, a hard problem, or just a good conversation — I'm always up for it.",
  },
};

export const socials = [{ id: "linkedin", label: "LinkedIn", href: profile.linkedin }] as const;

export const now = {
  label: "Now building",
  text: "Health Hub: weight-loss management with AI for the day-to-day and doctors in the loop.",
};
