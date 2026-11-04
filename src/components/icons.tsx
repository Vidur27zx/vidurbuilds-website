import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const ArrowRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const ArrowLeft = (p: P) => (
  <svg {...base} {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);
export const External = (p: P) => (
  <svg {...base} {...p}>
    <path d="M14 5h5v5M19 5l-8 8M11 7H6a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-5" />
  </svg>
);
export const Lock = (p: P) => (
  <svg {...base} {...p}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);
export const Mail = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 8 9 6 9-6" />
  </svg>
);
export const Copy = (p: P) => (
  <svg {...base} {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a1 1 0 0 1 1-1h9" />
  </svg>
);
export const Check = (p: P) => (
  <svg {...base} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
export const Close = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const Play = (p: P) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
  </svg>
);
export const Pause = (p: P) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <rect x="6" y="5" width="4.5" height="14" rx="1" />
    <rect x="13.5" y="5" width="4.5" height="14" rx="1" />
  </svg>
);
export const Mic = (p: P) => (
  <svg {...base} {...p}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
  </svg>
);
export const Send = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
);
export const ChevronLeft = (p: P) => (
  <svg {...base} {...p}>
    <path d="m14 6-6 6 6 6" />
  </svg>
);
export const ChevronRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="m10 6 6 6-6 6" />
  </svg>
);
export const FileIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    <path d="M14 3v5h5" />
  </svg>
);
export const CalendarIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M4 10h16M9 3v4M15 3v4" />
  </svg>
);

export function ChannelGlyph({
  id,
  size = 16,
}: {
  id: "voice" | "lab" | "linkedin" | "instagram" | "youtube";
  size?: number;
}) {
  const s = { width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true };
  switch (id) {
    case "linkedin":
      return (
        <svg {...s}>
          <rect width="24" height="24" rx="6" fill="#2a66c9" />
          <path
            d="M7 10v7M7 7v.2M11 17v-4.2a2.4 2.4 0 0 1 4.8 0V17M11 10v7"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );
    case "instagram":
      return (
        <svg {...s}>
          <defs>
            <linearGradient id="ig" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#f9a23b" />
              <stop offset="0.5" stopColor="#e8457a" />
              <stop offset="1" stopColor="#8a4de0" />
            </linearGradient>
          </defs>
          <rect width="24" height="24" rx="7" fill="url(#ig)" />
          <rect x="6" y="6" width="12" height="12" rx="4" stroke="#fff" strokeWidth="2" fill="none" />
          <circle cx="12" cy="12" r="2.6" stroke="#fff" strokeWidth="2" fill="none" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...s}>
          <rect y="3.5" width="24" height="17" rx="5.5" fill="#f03a2e" />
          <path d="M10 8.6v6.8l5.8-3.4Z" fill="#fff" />
        </svg>
      );
    case "lab":
      return (
        <svg {...s}>
          <rect width="24" height="24" rx="7" fill="#ffe78a" />
          <path
            d="M10 5.5v4.6l-3.6 6.3A1.4 1.4 0 0 0 7.6 18.5h8.8a1.4 1.4 0 0 0 1.2-2.1L14 10.1V5.5M9 5.5h6"
            stroke="#1c1b18"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      );
    case "voice":
      return (
        <svg {...s}>
          <rect width="24" height="24" rx="7" fill="#ff5a36" />
          <path d="M6.5 10.5v3M10 8v8M13.5 6v12M17 9.5v5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
  }
}

export const ArrowUpRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7M8.5 7H17v8.5" />
  </svg>
);

export const LinkedInLetters = (p: P) => (
  <svg {...base} strokeWidth={2.6} {...p}>
    <path d="M6 10v8M6 5.6v.2M10.5 18v-8M10.5 13.6a3.3 3.3 0 0 1 6.6 0V18" />
  </svg>
);

export const LinkedInSquare = (p: P) => (
  <svg {...base} stroke="none" {...p}>
    <rect x="2" y="2" width="20" height="20" rx="4.5" fill="currentColor" />
    <path
      d="M7.4 10.4v6.6M7.4 7v.2M11.2 17v-6.6M11.2 13.4a2.7 2.7 0 0 1 5.4 0V17"
      stroke="#fff"
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const InstagramMark = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <path d="M17.2 6.8v.1" strokeWidth={2.6} />
  </svg>
);
