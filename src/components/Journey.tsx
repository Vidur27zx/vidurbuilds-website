"use client";

import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import { journey, type Role } from "@/content";
import { easeRise, seen, spring, springSnappy } from "@/lib/motion";
import { SwipeCards } from "./SwipeCards";
import { Glyph } from "./Glyph";
import { External } from "./icons";
import { Eyebrow, Headline, Rise, Sparks, useTilt } from "./kit";

export function Journey() {
  const [deloitte, acumen] = journey.roles.filter((r) => !r.independent);
  const independent = journey.roles.filter((r) => r.independent);
  const area = useRef<HTMLDivElement>(null);
  const from = useRef<HTMLDivElement>(null);
  const to = useRef<HTMLDivElement>(null);

  return (
    <section id="journey" className="relative mt-12 md:mt-14 lg:px-7">
      <Eyebrow>
        {journey.eyebrow}
      </Eyebrow>
      <Headline lines={[journey.heading]} className="mt-5 text-[clamp(28px,2.8vw,40px)] text-[#4f2512] lg:text-[clamp(30px,2.8vw,40px)]">
        <Sparks className="ml-1 inline-block -translate-y-[0.55em] align-baseline" size={46} />
      </Headline>
      <Rise as="p" delay={0.05} className="mt-4 max-w-[640px] text-[16px] leading-[1.5] text-ink-soft md:text-[17px]">
        {journey.sub}
      </Rise>

      <div className="mt-6 md:hidden">
        <SwipeCards className="mobile-rail experience-rail" label="Work experience">
          {journey.roles.map((r) => <RoleCard key={r.id} role={r} tone={r.independent ? "sage" : r.id === "deloitte" ? "caramel" : "peach"} enter={{}} delay={0} />)}
        </SwipeCards>
        <p className="mt-2 text-[12px] text-ink-soft">Independent work: part-time · pro bono · consulting</p>
      </div>
      <div ref={area} className="relative mt-8 hidden md:block md:mt-9">
        <div className="professional-cards grid items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_calc(62*var(--u))_minmax(0,1fr)] lg:gap-0">
          <RoleCard role={acumen} tone="peach" enter={{ x: -40, rotate: -2 }} delay={0} />
          <span className="experience-flow grid self-stretch place-items-center py-1 text-brand lg:py-0" aria-hidden><svg viewBox="0 0 62 24" fill="none" preserveAspectRatio="none" className="h-10 w-6 rotate-90 lg:h-6 lg:w-full lg:rotate-0"><motion.path d="M0 12h60M51 4l9 8-9 8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={seen} transition={{ duration: 0.2, ease: "easeInOut" }} /></svg></span>
          <div ref={from}><RoleCard role={deloitte} tone="caramel" enter={{ x: 40, rotate: 2 }} delay={0.1} /></div>
        </div>
        <Connector area={area} from={from} to={to} />
        <div ref={to} className="mt-10 md:mt-9">
        <motion.div className="independent-group glass-rim relative rounded-[34px] bg-gradient-to-br from-[#e6e9cd] to-[#dde2c2] p-4 shadow-[0_30px_60px_-36px_rgba(80,90,40,0.55),inset_0_1px_0_rgba(255,255,255,0.7)] ring-1 ring-white/60 md:p-5"
          initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={seen} transition={{ duration: 0.28573, delay: 0.07144, ease: easeRise }}>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pb-4">
            <span className="flex items-center gap-3.5"><span className="grid h-12 w-12 place-items-center rounded-full bg-[#a3ae84] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"><Glyph name="users" size={22} strokeWidth={2} fill="currentColor" /></span><h3 className="display text-[24px] tracking-[-0.03em] text-ink md:text-[25px] lg:text-[calc(21*var(--u))]">{journey.independent.title}</h3></span>
            <span className="hidden h-7 w-px bg-ink/25 sm:block" aria-hidden />
            <span className="text-[15px] text-ink-soft md:text-[17px] lg:text-[calc(15.5*var(--u))]">{journey.independent.note.join(" • ")}</span>
          </div>
          <div className="independent-cards grid items-stretch gap-3 md:grid-cols-3">
            {independent.map((r, i) => <RoleCard key={r.id} role={r} tone="sage" enter={{ y: 28 }} delay={0.12 + i * 0.03} />)}
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}

const tone = {
  peach: {
    card: "bg-gradient-to-br from-[#f7e2cf] to-[#efcbb0] text-ink ring-1 ring-white/70 shadow-[0_26px_50px_-30px_rgba(120,60,25,0.6)]",
    soft: "text-ink-soft",
    pill: "bg-[#fdf2e7] text-ink",
    tag: "bg-[#fdf2e7]/90 text-ink shadow-[0_4px_10px_-6px_rgba(74,36,18,0.4)]",
  },
  caramel: {
    card: "bg-gradient-to-br from-[#ab7453] to-[#844d30] text-[#fdf3ea] ring-1 ring-[#c99272]/50 shadow-[0_30px_56px_-30px_rgba(90,40,15,0.85)]",
    soft: "text-[#fdf3ea]/90",
    pill: "bg-[#f8e3d2] text-ink",
    tag: "bg-[#f8e3d2] text-ink shadow-[0_4px_10px_-6px_rgba(0,0,0,0.4)]",
  },
  sage: {
    card: "bg-[#efefdd]/80 text-ink ring-1 ring-white/70 shadow-[0_18px_36px_-26px_rgba(80,90,40,0.55)] backdrop-blur-sm",
    soft: "text-ink-soft",
    pill: "bg-[#fbf8ee] text-ink",
    tag: "bg-[#fbf8ee] text-ink shadow-[0_4px_10px_-6px_rgba(80,90,40,0.45)]",
  },
};

function RoleCard({
  role,
  tone: t,
  enter,
  delay,
}: {
  role: Role;
  tone: keyof typeof tone;
  enter: { x?: number; y?: number; rotate?: number };
  delay: number;
}) {
  const look = tone[t];
  const big = t !== "sage";
  const tilt = useTilt(2.5);
  return (
    <motion.a
      href={role.href}
      target="_blank"
      rel="noreferrer"
      {...tilt}
      className={`glass-rim experience-card group relative flex flex-col rounded-[24px] p-4 md:p-4 lg:rounded-[calc(24*var(--u))] lg:px-[calc(18*var(--u))] lg:pt-[calc(18*var(--u))] lg:pb-[calc(18*var(--u))] ${look.card}`}
      initial={{ opacity: 0, ...enter }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
      viewport={seen}
      whileHover={{ y: -6 }}
      transition={{ ...spring, delay }}
    >
      <div className="flex items-center gap-4">
        <span
          className={`relative grid shrink-0 place-items-center overflow-hidden rounded-[18px] bg-white shadow-[0_10px_20px_-10px_rgba(74,36,18,0.45)] transition-transform duration-300 group-hover:-rotate-6 ${
            role.logoWide
              ? "h-[64px] w-[92px] md:h-[72px] md:w-[100px] lg:h-[calc(54*var(--u))] lg:w-[calc(93*var(--u))]"
              : big
                ? "h-[64px] w-[64px] md:h-[72px] md:w-[76px] lg:h-[calc(50*var(--u))] lg:w-[calc(60*var(--u))]"
                : "h-[58px] w-[60px] lg:h-[calc(48*var(--u))] lg:w-[calc(54*var(--u))]"
          }`}
        >
          {role.logo && (
            <Image
              src={role.logo}
              alt={`${role.company} logo`}
              fill
              sizes="100px"
              className={`object-contain ${role.logoWide ? "p-2" : "p-3"}`}
            />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <h3
            className={`text-[20px] leading-tight font-bold tracking-[-0.01em] md:text-[21px] ${big ? "lg:text-[calc(20*var(--u))]" : "lg:text-[calc(19*var(--u))]"}`}
          >
            {role.company}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-[13px] font-semibold whitespace-nowrap md:text-[14px] lg:text-[calc(14*var(--u))] ${look.pill}`}
            >
              {role.type}
            </span>
            {role.current && <NowBadge className={look.pill} />}
          </div>
        </div>
        <External
          width={16}
          height={16}
          className="shrink-0 self-start opacity-0 transition-opacity group-hover:opacity-70"
        />
      </div>
      {role.role && (
        <p className="mt-3 text-[16px] leading-snug font-bold md:text-[17px] lg:mt-3 lg:text-[calc(16.6*var(--u))]">
          {role.role}
        </p>
      )}
      <p
        className={`mt-2 flex items-center gap-2 text-[15px] md:text-[17px] lg:text-[calc(15*var(--u))] ${look.soft}`}
      >
        <CalendarDays size={17} strokeWidth={1.9} aria-hidden />
        {role.period}
      </p>
      <p
        className={`mt-3 text-[15px] leading-[1.45] md:text-[17px] lg:text-[calc(15.5*var(--u))] lg:leading-[calc(18*var(--u))] ${look.soft}`}
      >
        {role.text}
      </p>
      <div className="role-tags mt-3 flex flex-wrap content-start gap-1.5">
        {role.tags.map((tag, i) => (
          <motion.span
            key={tag}
            className={`rounded-full px-2.5 py-1 text-[13px] font-semibold md:text-[14px] lg:text-[calc(14.2*var(--u))] ${look.tag}`}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={seen}
            transition={{ ...springSnappy, delay: delay + 0.15 + i * 0.0125 }}
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
}

function NowBadge({ className }: { className: string }) {
  return (
    <span
      className={`flex items-center gap-1.5 rounded-full py-1 pr-3 pl-2.5 text-[13px] font-semibold md:text-[14px] ${className}`}
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping-soft absolute inset-0 rounded-full bg-leaf" />
        <span className="relative h-2.5 w-2.5 rounded-full bg-leaf" />
      </span>
      Now
    </span>
  );
}


function Connector({ area, from, to }: {
  area: RefObject<HTMLDivElement | null>;
  from: RefObject<HTMLDivElement | null>;
  to: RefObject<HTMLDivElement | null>;
}) {
  const svg = useRef<SVGSVGElement>(null);
  const inView = useInView(svg, { once: true, margin: "0px 0px -4% 0px" });
  const reduced = useReducedMotion();
  const [geo, setGeo] = useState<{ d: string; w: number; h: number; end: [number, number] } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const a = area.current?.getBoundingClientRect();
      const f = from.current?.getBoundingClientRect();
      const t = to.current?.getBoundingClientRect();
      if (!a || !f || !t || !a.width) return;
      const sx = f.left - a.left + f.width * 0.42;
      const sy = f.bottom - a.top;
      const ex = t.left - a.left + t.width * 0.29;
      const ey = t.top - a.top;
      const my = sy + (ey - sy) * 0.42;
      const r = Math.max(0, Math.min(14, Math.abs(sx - ex) / 2, (ey - sy) / 3));
      const dir = ex < sx ? -1 : 1;
      const d = Math.abs(sx - ex) < 2
        ? `M${sx} ${sy} V${ey}`
        : `M${sx} ${sy} V${my - r} Q${sx} ${my} ${sx + dir * r} ${my} H${ex - dir * r} Q${ex} ${my} ${ex} ${my + r} V${ey}`;
      setGeo({ d, w: a.width, h: a.height, end: [ex, ey] });
    };
    measure();
    const observer = new ResizeObserver(measure);
    [area, from, to].forEach((ref) => { if (ref.current) observer.observe(ref.current); });
    return () => observer.disconnect();
  }, [area, from, to]);

  return (
    <svg ref={svg} aria-hidden className="pointer-events-none absolute inset-0 overflow-visible text-sage-deep" width={geo?.w ?? 0} height={geo?.h ?? 0}>
      {geo && <>
        <motion.path d={geo.d} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : undefined}
          transition={{ duration: 0.35713, delay: 0.28573, ease: "easeInOut" }} />
        <motion.path d={`M${geo.end[0] - 6} ${geo.end[1] - 7} L${geo.end[0]} ${geo.end[1]} L${geo.end[0] + 6} ${geo.end[1] - 7}`}
          fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.21429, delay: 0.57143 }} />
        {inView && !reduced && <circle r="3.5" fill="#6f7a52" opacity="0">
          <animateMotion dur="3.7143s" begin="1.1429s" repeatCount="indefinite" path={geo.d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.3 1" />
          <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.1;0.85;1" dur="3.7143s" begin="1.1429s" repeatCount="indefinite" />
        </circle>}
      </>}
    </svg>
  );
}
