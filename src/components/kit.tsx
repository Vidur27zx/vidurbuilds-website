"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, type Variants } from "motion/react";
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import type { IconName } from "@/content";
import { easeRise, seen, springSnappy } from "@/lib/motion";
import { Glyph } from "./Glyph";
import { ArrowRight, ArrowUpRight } from "./icons";

export function Sparks({
  className = "",
  style,
  delay = 0.35,
  size = 40,
}: {
  className?: string;
  style?: CSSProperties;
  delay?: number;
  size?: number;
}) {
  const strokes = ["M8.5 22 11.5 5.5", "M16.5 26.5 30 15.5", "M19.5 35 35 34"];
  return (
    <motion.svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      fill="none"
      aria-hidden
      className={`pointer-events-none ${/(^|\s)text-/.test(className) ? "" : "text-brand"} ${className}`}
      style={{ ...style, transformOrigin: "10% 90%" }}
      initial={{ scale: 1 }}
      whileInView={{ scale: 1 }}
      viewport={seen}
      transition={{ duration: 0.28573, ease: "easeOut" }}
    >
      {strokes.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={seen}
          transition={{ duration: 0.1, delay: delay + i * 0.06, ease: "easeOut" }}
        />
      ))}
    </motion.svg>
  );
}

export function Eyebrow({
  children,
  icon,
  pill = false,
  caps = true,
  className = "",
}: {
  children: ReactNode;
  icon?: IconName;
  pill?: boolean;
  caps?: boolean;
  className?: string;
}) {
  const motionProps = {
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: seen,
    transition: { duration: 0.28573, ease: easeRise },
  };
  if (!pill) {
    return (
      <motion.p className={`eyebrow ${className}`} {...motionProps}>
        {children}
      </motion.p>
    );
  }
  return (
    <motion.p
      className={`glass-pill inline-flex items-center gap-2.5 rounded-full bg-peach/80 px-4 py-2 shadow-[0_6px_16px_-8px_rgba(74,36,18,0.35)] ring-1 ring-white/70 ${
        caps
          ? "eyebrow !text-espresso"
          : "text-[16px] font-bold text-espresso md:text-[18px] lg:px-[calc(22*var(--u))] lg:py-[calc(12*var(--u))] lg:text-[calc(21*var(--u))]"
      } ${className}`}
      {...motionProps}
    >
      {icon && (
        <motion.span
          className="inline-flex text-brand"
          initial={{ rotate: -25, scale: 0.6 }}
          whileInView={{ rotate: 0, scale: 1 }}
          viewport={seen}
          transition={{ ...springSnappy, delay: 0.05358 }}
        >
          <Glyph name={icon} size={caps ? 17 : 19} strokeWidth={2.2} fill={icon === "user" ? "currentColor" : "none"} />
        </motion.span>
      )}
      {children}
    </motion.p>
  );
}

const rise: Variants = {
  hidden: { y: "108%", rotate: 1.5 },
  show: { y: 0, rotate: 0, transition: { duration: 0.42857, ease: easeRise } },
};

export function Headline({
  lines,
  as = "h2",
  className = "",
  delay = 0,
  children,
}: {
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
  children?: ReactNode;
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={`display ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={seen}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03571, delayChildren: delay } } }}
    >
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <motion.span className="block origin-bottom-left" variants={rise}>
            {line}
            {i === lines.length - 1 && children}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function Rise({
  children,
  className = "",
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "p";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={seen}
      transition={{ duration: 0.34286, delay, ease: easeRise }}
    >
      {children}
    </Tag>
  );
}

const tileTone = {
  peach: "bg-peach text-brand",
  terracotta: "bg-gradient-to-br from-[#d8925f] to-[#b9673a] text-white shadow-[0_8px_18px_-8px_rgba(150,70,30,0.7)]",
  sage: "bg-[#c9d0ad] text-[#566040]",
  cream: "bg-cream text-brand",
  white: "bg-white/90 text-brand",
};

export function IconTile({
  icon,
  tone = "peach",
  size = 56,
  round = false,
  className = "",
}: {
  icon: IconName;
  tone?: keyof typeof tileTone;
  size?: number;
  round?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`grid shrink-0 place-items-center ${round ? "rounded-full" : "rounded-[16px]"} ${tileTone[tone]} ${className}`}
      style={{ width: size, height: size }}
    >
      <Glyph name={icon} size={Math.round(size * 0.48)} strokeWidth={1.9} />
    </span>
  );
}

export function SkillPill({ label, icon, i = 0 }: { label: string; icon: IconName; i?: number }) {
  return (
    <motion.span
      className="glass-pill group inline-flex items-center gap-2 rounded-full bg-[#fdf6ee] px-4 py-2.5 text-[14px] font-semibold text-ink shadow-[0_6px_14px_-8px_rgba(74,36,18,0.35)] ring-1 ring-line md:text-[15px] lg:gap-[calc(9*var(--u))] lg:px-[calc(14*var(--u))] lg:py-[calc(8*var(--u))] lg:text-[14px]"
      initial={{ opacity: 0, y: 14, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={seen}
      whileHover={{ y: -3 }}
      transition={{ ...springSnappy, delay: 0.03571 + i * 0.03 }}
    >
      <span className="inline-flex text-brand transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
        <Glyph name={icon} size={18} strokeWidth={2} />
      </span>
      {label}
    </motion.span>
  );
}

export function Framed({
  src,
  alt,
  aspect,
  sizes,
  focus,
  className = "",
  preload = false,
}: {
  src: string;
  alt: string;
  aspect: number | string;
  sizes: string;
  focus?: string;
  className?: string;
  preload?: boolean;
}) {
  return (
    <span className={`frame block ${className}`}>
      <span className="frame-in" style={{ aspectRatio: aspect }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          style={focus ? { objectPosition: focus } : undefined}
        />
      </span>
    </span>
  );
}

const arrowTone = {
  rust: "bg-brand text-white shadow-[0_8px_16px_-8px_rgba(147,68,26,0.9)]",
  white: "bg-white text-caramel shadow-[0_8px_16px_-8px_rgba(0,0,0,0.35)]",
  cream: "bg-[#fdf3ea] text-brand shadow-[0_6px_14px_-8px_rgba(74,36,18,0.4)] ring-1 ring-white",
};

export function ArrowDot({
  tone = "rust",
  diagonal = false,
  size = 44,
  square = false,
}: {
  tone?: keyof typeof arrowTone;
  diagonal?: boolean;
  size?: number;
  square?: boolean;
}) {
  const Icon = diagonal ? ArrowUpRight : ArrowRight;
  return (
    <span
      className={`grid shrink-0 place-items-center ${square ? "rounded-[14px]" : "rounded-full"} ${arrowTone[tone]} transition-transform duration-300 group-hover:scale-105`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <Icon
        width={size * 0.42}
        height={size * 0.42}
        strokeWidth={2.2}
        className={`transition-transform duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] ${
          diagonal ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5" : "group-hover:translate-x-1"
        }`}
      />
    </span>
  );
}

export function useTilt(max = 4) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 392, damping: 28 });
  const rotateY = useSpring(ry, { stiffness: 392, damping: 28 });
  return {
    style: { rotateX, rotateY, transformPerspective: 1100 },
    onPointerMove: (e: PointerEvent<HTMLElement>) => {
      if (e.pointerType !== "mouse") return;
      const r = e.currentTarget.getBoundingClientRect();
      ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
      rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
    },
    onPointerLeave: () => {
      rx.set(0);
      ry.set(0);
    },
  };
}
