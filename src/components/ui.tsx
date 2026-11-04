"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, type MotionValue } from "motion/react";
import {
  useEffect,
  useState,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { followSpring, reveal, spring } from "@/lib/motion";

export function Portal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? createPortal(children, document.body) : null;
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={reveal.initial}
      whileInView={reveal.whileInView}
      viewport={reveal.viewport}
      transition={{ ...reveal.transition, delay }}
    >
      {children}
    </motion.div>
  );
}

const MotionLink = motion.create(Link);

type PillProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "ink" | "brand" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  external?: boolean;
  className?: string;
  ariaLabel?: string;
};

const pillLook = {
  ink: "bg-espresso text-[#fdf3ea] shadow-[0_10px_22px_-10px_rgba(74,36,18,0.8)] hover:bg-[#5a2d17]",
  brand: "bg-brand text-white shadow-[0_10px_22px_-10px_rgba(147,68,26,0.8)] hover:bg-[#a34d1f]",
  ghost: "bg-white text-ink ring-1 ring-line shadow-[0_6px_14px_-10px_rgba(74,36,18,0.5)] hover:bg-[#fffaf5]",
  outline: "text-espresso ring-[1.5px] ring-espresso/80 hover:bg-espresso hover:text-[#fdf3ea]",
};

const pillSize = {
  sm: "px-3 py-1.5 text-[12.5px] rounded-[10px]",
  md: "px-4 py-2.5 text-[14px] rounded-xl",
  lg: "px-6 py-3.5 text-[17px] rounded-2xl md:text-[19px]",
};

export function Pill({
  children,
  href,
  onClick,
  variant = "ink",
  size = "md",
  external,
  className = "",
  ariaLabel,
}: PillProps) {
  const cls = `glass-pill group inline-flex items-center gap-2 font-semibold whitespace-nowrap transition-colors duration-200 ${pillSize[size]} ${pillLook[variant]} ${className}`;

  const magnet = useMagnet(size === "lg" ? 0.28 : 0);
  const hover = size === "lg" ? undefined : { y: -2 };
  const tap = { scale: 0.96 };
  const shared = {
    className: cls,
    whileHover: hover,
    whileTap: tap,
    transition: spring,
    "aria-label": ariaLabel,
    ...magnet,
  };
  if (href && !external && href.startsWith("/")) {
    return (
      <MotionLink href={href} {...shared}>
        {children}
      </MotionLink>
    );
  }
  if (href) {
    return (
      <motion.a href={href} {...shared} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" onClick={onClick} {...shared}>
      {children}
    </motion.button>
  );
}

export function useMagnet(strength = 0.28) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 431.2, damping: 21, mass: 0.6 });
  const y = useSpring(my, { stiffness: 431.2, damping: 21, mass: 0.6 });
  if (!strength) return {};
  return {
    style: { x, y },
    onPointerMove: (e: ReactPointerEvent<HTMLElement>) => {
      if (e.pointerType !== "mouse") return;
      const r = e.currentTarget.getBoundingClientRect();
      mx.set((e.clientX - (r.left + r.width / 2)) * strength);
      my.set((e.clientY - (r.top + r.height / 2)) * strength);
    },
    onPointerLeave: () => {
      mx.set(0);
      my.set(0);
    },
  };
}

export function useCursorFollow(ref: RefObject<HTMLElement | null>) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, followSpring);
  const y = useSpring(my, followSpring);
  const onMouseMove = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left + 14);
    my.set(e.clientY - r.top + 18);
  };
  return { x, y, onMouseMove };
}

export function CursorLabel({
  show,
  x,
  y,
  children,
}: {
  show: boolean;
  x: MotionValue<number>;
  y: MotionValue<number>;
  children: ReactNode;
}) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-30 hidden rounded-md bg-espresso px-2.5 py-1 text-[12px] font-semibold whitespace-nowrap text-white shadow-lg md:block"
      style={{ x, y }}
      initial={false}
      animate={{ opacity: show ? 1 : 0, rotate: show ? -7 : 0, scale: show ? 1 : 0.85 }}
      transition={spring}
    >
      {children}
    </motion.div>
  );
}

export function Waveform({
  bars = 24,
  active = true,
  color = "currentColor",
  className = "",
  height = 40,
}: {
  bars?: number;
  active?: boolean;
  color?: string;
  className?: string;
  height?: number;
}) {
  return (
    <span className={`flex items-center gap-[3px] ${className}`} style={{ height }} aria-hidden>
      {Array.from({ length: bars }, (_, i) => {
        const peak = (0.35 + 0.65 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6))).toFixed(2);
        return (
          <span
            key={i}
            className={`h-full w-[3px] rounded-full ${active ? "wave-bar" : ""}`}
            style={
              {
                background: color,
                transform: active ? undefined : "scaleY(0.15)",
                "--peak": peak,
                animationDuration: `${(1.1 + (i % 5) * 0.14).toFixed(2)}s`,
                animationDelay: `${((i % 7) * 0.06).toFixed(2)}s`,
              } as CSSProperties
            }
          />
        );
      })}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="rounded-md bg-peach/60 px-2 py-0.5 text-[11px] font-medium text-ink-soft">{children}</span>;
}
