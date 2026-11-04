"use client";

import { motion } from "motion/react";
import { springBouncy } from "@/lib/motion";

export function BrandMark({
  size = 40,
  animate = true,
  className,
}: {
  size?: number;
  animate?: boolean;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Vidur Ramachandran"
      className={className}
    >
      <defs>
        <linearGradient id="bm-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a2412" />
          <stop offset="1" stopColor="#2e1408" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#bm-bg)" />
      <motion.path
        d="M15 18.5 L28 45 L41 18.5"
        fill="none"
        stroke="#fdf3ea"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animate ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.24999, delay: 0.05358, ease: [0.65, 0, 0.35, 1] }}
      />
      <motion.circle
        cx="48"
        cy="41.5"
        r="5.2"
        fill="#fdf3ea"
        initial={animate ? { scale: 0 } : false}
        animate={{ scale: 1 }}
        transition={{ ...springBouncy, delay: 0.28573 }}
        style={{ transformOrigin: "48px 41.5px" }}
      />
    </svg>
  );
}
