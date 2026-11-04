"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { now, profile, socials } from "@/content";
import { easeRise, seen, spring, springSnappy } from "@/lib/motion";
import { BrandMark } from "./BrandMark";
import { ArrowUpRight } from "./icons";

const EXPLORE = [
  { label: "Home", href: "/" },
  { label: "Builds & case studies", href: "/builds" },
  { label: "About me", href: "/about" },
  { label: "Journey", href: "/#journey" },
  { label: "Beyond work", href: "/#beyond" },
  { label: "Contact", href: "/#contact" },
];

const ELSEWHERE = [
  ...socials.map((s) => ({ label: s.label, href: s.href })),
  { label: "Resume", href: profile.resumeUrl },
  { label: "Book a call", href: profile.bookingUrl },
  { label: "Email", href: `mailto:${profile.email}` },
];

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1360px] px-4 pt-12 pb-5 md:px-6 md:pt-14 lg:px-[2.5vw]">
      <motion.div
        className="glass-rim relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#4d2614] via-[#3a1b0c] to-[#2a1207] text-[#fdf3ea] shadow-[0_40px_80px_-40px_rgba(42,18,7,0.8)] md:rounded-[40px]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={seen}
        transition={{ duration: 0.32143, ease: easeRise }}
      >
        <Waves />
        <div className="relative grid grid-cols-2 gap-x-6 gap-y-7 px-5 pt-7 md:px-8 md:pt-9 lg:grid-cols-[1.25fr_0.8fr_0.8fr_1.15fr] lg:gap-8 lg:px-10">
          <Column i={0} className="col-span-2 md:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-3" aria-label={`${profile.brand}, home`}>
              <span className="block transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-8 group-hover:scale-105">
                <BrandMark size={48} animate={false} />
              </span>
              <span className="display text-[22px] tracking-[-0.035em]">{profile.brand}</span>
            </Link>
            <p className="mt-5 max-w-[320px] text-[15px] leading-[1.55] text-[#fdf3ea]/75">
              {profile.role}. Research, strategy and hands-on prototypes, from {profile.location}.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="group mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-apricot"
            >
              <Underlined>{profile.email}</Underlined>
              <ArrowUpRight
                width={16}
                height={16}
                strokeWidth={2.2}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Column>

          <Column i={1} title="Explore">
            <LinkList links={EXPLORE} />
          </Column>

          <Column i={2} title="Elsewhere">
            <LinkList links={ELSEWHERE} />
          </Column>

          <Column i={3} title={now.label} className="col-span-2 md:col-span-1">
            <div className="rounded-[22px] bg-white/[0.07] p-5 ring-1 ring-white/10 backdrop-blur-sm">
              <p className="flex items-start gap-3 text-[15px] leading-[1.5] text-[#fdf3ea]/90">
                <span className="relative mt-[7px] flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping-soft absolute inset-0 rounded-full bg-apricot" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-apricot" />
                </span>
                {now.text}
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                <Clock />
              </div>
            </div>
          </Column>
        </div>

        <div className="relative mt-6 md:mt-8" aria-hidden>
          <Wordmark text={profile.brand} />
        </div>

        <div className="relative flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-5 py-4 text-[13.5px] text-[#fdf3ea]/60 md:px-8 lg:px-10">
          <span>
            © <Year /> {profile.name}
          </span>
          <BackToTop />
        </div>
      </motion.div>
    </footer>
  );
}

function Column({
  i,
  title,
  className = "",
  children,
}: {
  i: number;
  title?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={seen}
      transition={{ duration: 0.24999, delay: 0.05358 + i * 0.045, ease: easeRise }}
    >
      {title && <h2 className="mb-4 text-[12.5px] font-bold tracking-[0.2em] text-apricot/90 uppercase">{title}</h2>}
      {children}
    </motion.div>
  );
}

function Underlined({ children }: { children: ReactNode }) {
  return (
    <span className="relative">
      {children}
      <span
        aria-hidden
        className="absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left scale-x-0 rounded-full bg-current transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
      />
    </span>
  );
}

function LinkList({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="space-y-1">
      {links.map((l) => {
        const internal = l.href.startsWith("/") && !l.href.endsWith(".pdf");
        const inner = (
          <>
            <Underlined>{l.label}</Underlined>
            {!internal && (
              <ArrowUpRight
                width={13}
                height={13}
                strokeWidth={2.2}
                className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-70"
              />
            )}
          </>
        );
        const cls =
          "group inline-flex items-center gap-1.5 py-1.5 text-[14px] text-[#fdf3ea]/80 transition-colors hover:text-[#fdf3ea]";
        return (
          <li key={l.label}>
            {internal ? (
              <Link href={l.href} className={cls}>
                {inner}
              </Link>
            ) : (
              <a
                href={l.href}
                className={cls}
                {...(l.href.startsWith("http") || l.href.endsWith(".pdf")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                {inner}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function Year() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}

function Clock() {
  const [t, setT] = useState<Date | null>(null);
  useEffect(() => {
    setT(new Date());
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const secs = t ? Math.floor(t.getTime() / 1000) + 19800 : 36600;
  const label = t
    ? new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit" }).format(t)
    : "";
  const hand = (deg: number, len: number, w: number, color: string, smooth = true) => (
    <motion.line
      x1="20"
      y1="20"
      x2="20"
      y2={20 - len}
      stroke={color}
      strokeWidth={w}
      strokeLinecap="round"
      initial={false}
      animate={{ rotate: deg }}
      transition={
        smooth ? { type: "spring", stiffness: 235.2, damping: 28 } : { type: "spring", stiffness: 784, damping: 25.2 }
      }
      style={{ originX: "20px", originY: "20px", transformBox: "view-box" }}
    />
  );
  return (
    <>
      <svg viewBox="0 0 40 40" className="h-10 w-10 shrink-0" aria-hidden>
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(253,243,234,0.35)"
          strokeWidth="1.5"
        />
        {[0, 90, 180, 270].map((a) => (
          <line
            key={a}
            x1="20"
            y1="4.5"
            x2="20"
            y2="7"
            stroke="rgba(253,243,234,0.5)"
            strokeWidth="1.5"
            strokeLinecap="round"
            transform={`rotate(${a} 20 20)`}
          />
        ))}
        {hand(secs / 120, 8, 2.4, "#fdf3ea")}
        {hand(secs / 10, 12, 1.8, "#fdf3ea")}
        {t && hand(secs * 6, 13, 1.1, "#f5cfa4", false)}
        <circle cx="20" cy="20" r="1.8" fill="#f5cfa4" />
      </svg>
      <span className="text-[14px] leading-tight text-[#fdf3ea]/70">
        <span className="block font-semibold text-[#fdf3ea] tabular-nums">{label || " "}</span>
        IST · {profile.location}
      </span>
    </>
  );
}

function Wordmark({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const wordmark = useRef<HTMLParagraphElement>(null);
  const inView = useInView(wordmark, { once: true, amount: 0.65 });
  return (
    <motion.p
      ref={wordmark}
      className="display flex justify-center overflow-hidden px-4 pb-[0.02em] text-[10vw] leading-[0.8] tracking-[-0.05em] whitespace-nowrap select-none lg:text-[min(10vw,144px)]"
      initial={reduce ? false : "hidden"}
      animate={reduce || inView ? "show" : "hidden"}
      variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.075, delayChildren: 0.08 } } }}
    >
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block bg-gradient-to-b from-[#f5cfa4] via-[#d99a6c] to-[#8e4a2b] bg-clip-text text-transparent"
          style={{ whiteSpace: "pre" }}
          variants={{
            hidden: { y: "105%", opacity: 0 },
            show: { y: "18%", opacity: 1, transition: { duration: reduce ? 0 : 0.42, ease: easeRise } },
          }}
          whileHover={reduce ? undefined : { y: "4%", transition: springSnappy }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.p>
  );
}

function BackToTop() {
  return (
    <motion.button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group inline-flex items-center gap-2.5 rounded-full bg-white/[0.08] py-2 pr-2 pl-4 font-semibold text-[#fdf3ea] ring-1 ring-white/15 transition-colors hover:bg-white/15"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={spring}
    >
      Back to top
      <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-apricot text-espresso">
        <span className="relative block h-4 w-4">
          {[0, 1].map((k) => (
            <svg
              key={k}
              viewBox="0 0 16 16"
              className={`absolute inset-0 h-4 w-4 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
                k === 0 ? "group-hover:-translate-y-5" : "translate-y-5 group-hover:translate-y-0"
              }`}
              fill="none"
              aria-hidden
            >
              <path
                d="M8 13V3M3.5 7.5 8 3l4.5 4.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ))}
        </span>
      </span>
    </motion.button>
  );
}

function Waves() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 800 400"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -top-10 right-0 h-[420px] w-[70%] opacity-90"
    >
      <defs>
        <linearGradient id="fw1" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8e4a2b" stopOpacity="0.55" />
          <stop offset="1" stopColor="#8e4a2b" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fw2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c47a4e" stopOpacity="0.35" />
          <stop offset="1" stopColor="#c47a4e" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className="wave-drift">
        <path d="M800 0 V330 C690 300 640 210 560 150 C470 82 360 60 220 0 Z" fill="url(#fw1)" />
      </g>
      <g className="wave-drift-slow">
        <path d="M800 0 V190 C730 170 690 120 640 80 C590 40 520 20 470 0 Z" fill="url(#fw2)" />
      </g>
    </svg>
  );
}
