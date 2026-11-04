"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { buildsPage, type BuildCard } from "@/content";
import { easeRise, seen, spring } from "@/lib/motion";
import { Glyph } from "./Glyph";
import { Eyebrow, Headline, Rise, useTilt } from "./kit";

const cq = (n: number, w: number) => `${((n / w) * 100).toFixed(3)}cqw`;

const MotionLink = motion.create(Link);

export function BuildsShowcase() {
  const [cases, protos] = buildsPage.rows;
  const [mobileCategory, setMobileCategory] = useState(cases.id);
  const tabButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const [urban, whatsapp, blinkit, spotify, pipeline] = cases.cards as BuildCard[];
  const [saathi, batwa, corpsim] = protos.cards;
  return (
    <section id="work" className="glass-rim builds-showcase relative overflow-hidden rounded-[30px] border border-line/70 bg-[#fbf5f0]/90 p-3 pt-7 md:p-5 md:pt-8">
      <div className="px-3 md:px-4">
        <Eyebrow>{buildsPage.eyebrow}</Eyebrow>
        <div className="relative mt-3 w-fit">
          <Headline as="h1" lines={[buildsPage.heading]} className="text-[clamp(30px,3.4vw,46px)] text-ink" />
        </div>
        <Rise as="p" className="mt-3 max-w-[640px] text-[16px] leading-relaxed text-ink-soft md:text-[17px]">{buildsPage.sub}</Rise>
      </div>
      <div role="tablist" aria-label="Project category" className="glass-nav glass-pill mt-5 grid grid-cols-2 gap-1 rounded-full p-1.5 md:hidden">
        {[cases, protos].map((row, index) => <button key={row.id} id={"builds-tab-" + row.id} type="button" role="tab" aria-selected={mobileCategory === row.id} aria-controls={"builds-panel-" + row.id} tabIndex={mobileCategory === row.id ? 0 : -1}
          ref={el => {tabButtons.current[index] = el;}}
          className={"min-h-11 rounded-full px-3 py-2 text-[14px] font-semibold transition-colors " + (mobileCategory === row.id ? "glass-active text-brand" : "text-ink-soft")}
          onClick={() => setMobileCategory(row.id)}
          onKeyDown={event => {
            if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
            event.preventDefault();
            const next = event.key === "Home" ? 0 : event.key === "End" ? 1 : 1-index;
            setMobileCategory(buildsPage.rows[next].id);
            tabButtons.current[next]?.focus();
          }}>{index === 0 ? "Case Studies" : "Prototypes"}</button>)}
      </div>
      <Row label={cases} className="mt-6" mobileActive={mobileCategory === cases.id}>
        <div className="mobile-rail project-grid grid gap-3 sm:grid-cols-2 lg:contents" role="region" aria-label="Case study previews" tabIndex={0}>
          <Card card={urban} i={0} plate className="sm:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-span-3 lg:row-start-1" box="h-[280px] sm:h-[320px] lg:h-full">
            <DocumentVisual src={urban.preview!} variant="lead" />
          </Card>
          <Card card={whatsapp} i={1} textW={175} className="sm:col-span-2 lg:col-span-3 lg:col-start-3 lg:row-start-1" box="h-[280px] sm:h-[210px] lg:h-full">
            <DocumentVisual src={whatsapp.preview!} variant="wide" />
          </Card>
          <Card card={blinkit} i={2} textW={150} className="lg:col-span-2 lg:col-start-3 lg:row-span-2 lg:row-start-2" box="h-[280px] sm:h-[210px] lg:h-full">
            <DocumentVisual src={blinkit.preview!} variant="wide" />
          </Card>
          <Card card={spotify} i={3} textW={150} className="lg:col-start-5 lg:row-start-2" box="h-[280px] sm:h-[210px] lg:h-full">
            <DocumentVisual src={spotify.preview!} variant="phone" />
          </Card>
          <Card card={pipeline} i={4} textW={160} className="lg:col-start-5 lg:row-start-3" box="h-[280px] sm:h-[210px] lg:h-full">
            <DocumentVisual src={pipeline.preview!} variant="small" />
          </Card>
        </div>
      </Row>
      <Row label={protos} className="mt-5" protos mobileActive={mobileCategory === protos.id}>
        <div className="mobile-rail project-grid grid gap-3 sm:grid-cols-2 lg:contents" role="region" aria-label="Prototype previews" tabIndex={0}>
          <Card card={saathi} i={0} plate className="sm:col-span-2 lg:col-span-1" box="h-[260px] lg:h-full"><PrdStack /></Card>
          <Card card={batwa} i={1} plate box="h-[260px] lg:h-full"><BatuaPhones /></Card>
          <Card card={corpsim} i={2} plate box="h-[260px] lg:h-full">
            <Place style={{left:cq(26,346),top:cq(28,346),width:cq(294,346)}} delay={0.15}>
              <Browser src="/builds/corpsim.jpg" w={346} height={245} sizes="(max-width: 1024px) 80vw, 360px" scroll />
            </Place>
          </Card>
        </div>
      </Row>
    </section>
  );
}

// Real local case-study pages, rendered as inert thumbnails inside the original
// browser/phone composition. The parent card remains the only interactive link.
function DocumentPreview({src, phone = false, tall = false}: {src: string; phone?: boolean; tall?: boolean}) {
  const host = useRef<HTMLSpanElement>(null);
  const [scale, setScale] = useState(0);
  const width = phone ? 390 : 1100;
  const height = phone ? 844 : tall ? 1040 : 760;
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / width));
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);
  return <span className="block overflow-hidden rounded-[12px] bg-surface shadow-[0_18px_36px_-20px_rgba(74,36,18,0.5)] ring-1 ring-black/5">
    {!phone && <span className="flex gap-1 border-b border-black/5 bg-white px-2 py-1.5">{["#ff6b5e", "#ffc24a", "#4fd07c"].map(c=><span key={c} className="h-1.5 w-1.5 rounded-full" style={{background:c}} />)}</span>}
    <span ref={host} className="relative block overflow-hidden" style={{aspectRatio:width + "/" + height}}>
      <iframe src={src} title="Project preview" tabIndex={-1} aria-hidden="true" sandbox="allow-scripts" loading="lazy" className="pointer-events-none absolute top-0 left-0 border-0" style={{width,height,transform:"scale(" + scale + ")",transformOrigin:"top left"}} />
    </span>
  </span>;
}
function DocumentVisual({src, variant}: {src:string; variant:"lead"|"wide"|"phone"|"small"}) {
  const w = variant === "lead" ? 520 : variant === "wide" ? 652 : 314;
  const x = variant === "lead" ? 42 : variant === "wide" ? 250 : variant === "phone" ? 235 : 184;
  const width = variant === "lead" ? 432 : variant === "wide" ? 362 : variant === "phone" ? 60 : 112;
  return <span className={"case-visual case-visual-" + variant}><Place style={{left:cq(x,w),top:cq(26,w),width:cq(width,w)}} delay={0.125}>
    <span className={variant === "phone" ? "block rotate-[-10deg]" : variant === "small" ? "block rotate-[-7deg]" : "block"}>
      <DocumentPreview src={src} phone={variant === "phone"} tall={variant === "lead"} />
    </span>
  </Place></span>;
}

type RowData = (typeof buildsPage.rows)[number];

function Row({
  label,
  protos = false,
  mobileActive = true,
  className = "",
  children,
}: {
  label: RowData;
  protos?: boolean;
  mobileActive?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const [lead, ...rest] = label.title.split(" ");
  return (
    <div
      id={"builds-panel-" + label.id} role="tabpanel" aria-labelledby={"builds-tab-" + label.id} data-mobile-active={mobileActive}
      className={`builds-row grid gap-4 rounded-[26px] bg-[#fcf6f1] p-2.5 ring-1 ring-[#f1e3d6] lg:gap-[calc(14*var(--u))] lg:rounded-[calc(28*var(--u))] lg:p-[calc(10*var(--u))] ${
        protos
          ? "lg:grid-cols-[calc(195*var(--u))_minmax(0,505fr)_minmax(0,308fr)_minmax(0,346fr)] lg:grid-rows-[calc(287*var(--u))] lg:gap-[calc(16*var(--u))]"
          : "lg:grid-cols-[calc(195*var(--u))_minmax(0,520fr)_minmax(0,213fr)_minmax(0,213fr)_minmax(0,213fr)] lg:grid-rows-[calc(185*var(--u))_calc(116*var(--u))_calc(116*var(--u))]"
      } ${className}`}
      style={{ boxShadow: "0 20px 44px -36px rgba(74,36,18,0.45), inset 0 1px 0 rgba(255,255,255,0.9)" }}
    >
      <motion.div
        className={`builds-row-label flex items-center gap-4 px-2 pt-2 pb-1 lg:flex-col ${protos ? "" : "lg:row-span-3"} lg:items-start lg:gap-0 lg:px-[calc(10*var(--u))] lg:pt-[calc(14*var(--u))]`}
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={seen}
        transition={{ duration: 0.21429, ease: easeRise }}
      >
        <motion.span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-[16px] sm:h-14 sm:w-14 bg-gradient-to-b from-[#fbe8d8] to-[#f6d7c0] text-[#75310c] shadow-[0_10px_22px_-12px_rgba(150,70,30,0.6),inset_0_1px_0_rgba(255,255,255,0.8)] lg:h-[calc(60*var(--u))] lg:w-[calc(60*var(--u))] lg:rounded-[calc(16*var(--u))]"
          initial={{ scale: 0.5, rotate: -20 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={seen}
          whileHover={{ rotate: -8, scale: 1.06 }}
          transition={{ type: "spring", stiffness: 509.6, damping: 16.8, delay: 0.03571 }}
        >
          <Glyph
            name={label.icon}
            size={30}
            strokeWidth={1.7}
            className="lg:h-[calc(32*var(--u))] lg:w-[calc(32*var(--u))]"
          />
        </motion.span>
        <div className="min-w-0 flex-1 lg:flex-none">
          <h2 className="display text-[24px] tracking-[-0.035em] text-[#1a0a04] lg:mt-[calc(18*var(--u))] lg:text-[calc(33*var(--u))] lg:leading-[0.97]">
            <span className="lg:block">{lead}</span> {rest.join(" ")}
          </h2>
          <p className="mt-1.5 text-[15px] leading-[1.4] text-[#2a1d17] lg:mt-[calc(16*var(--u))] lg:max-w-[calc(165*var(--u))] lg:text-[calc(17*var(--u))] lg:leading-[calc(23*var(--u))]">
            {label.text}
          </p>
        </div>
      </motion.div>
      {children}
    </div>
  );
}

function Card({
  card,
  i,
  plate = false,
  textW = 170,
  className = "",
  box,
  children,
}: {
  card: BuildCard;
  i: number;
  plate?: boolean;

  textW?: number;
  className?: string;
  box: string;
  children: ReactNode;
}) {
  const tilt = useTilt(3);
  const external = !card.href.startsWith("/");
  const Tag = external ? motion.a : MotionLink;
  return (
    <motion.div
      className={`min-w-0 h-full ${className}`}
      initial={{ opacity: 0, y: 34, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={seen}
      transition={{ ...spring, delay: 0.02857 + i * 0.045 }}
    >
      <Tag
        href={card.href}
        data-project={card.id}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        onPointerMove={tilt.onPointerMove}
        onPointerLeave={tilt.onPointerLeave}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.985 }}
        transition={spring}
        className={`builds-card glass-rim group @container relative block overflow-hidden rounded-[22px] shadow-[0_18px_36px_-28px_rgba(74,36,18,0.55)] ring-1 ring-white/70 transition-shadow duration-500 hover:shadow-[0_36px_60px_-30px_rgba(74,36,18,0.55)] lg:rounded-[calc(24*var(--u))] ${box}`}
        style={{ ...tilt.style, background: `linear-gradient(180deg, ${card.tint[0]}, ${card.tint[1]})` }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_0%,rgba(255,255,255,0.55),transparent_60%)] opacity-60 transition-opacity duration-500 group-hover:opacity-100"
        />
        <span className="absolute inset-0" aria-hidden>
          {children}
        </span>
        {plate ? (
          <span
            className="project-caption absolute inset-x-0 bottom-0 z-10 flex items-center gap-2.5 rounded-t-[20px] border-t border-white/60 px-5 pt-4 pb-4 backdrop-blur-md lg:gap-[calc(10*var(--u))] lg:rounded-t-[calc(22*var(--u))] lg:px-[calc(16*var(--u))] lg:pt-[calc(12*var(--u))] lg:pb-[calc(12*var(--u))]"
            style={{ background: `color-mix(in srgb, ${card.plate || card.tint[0]} 76%, transparent)` }}
          >
            <span className="min-w-0 flex-1">
              <span className="caption-title block text-[17px] leading-tight font-bold tracking-[-0.02em] text-[#1a0a04] lg:text-[calc(17*var(--u))]">
                {card.title}
              </span>
              <span className="caption-summary mt-1 block text-[14.5px] text-[#2a1d17] lg:mt-[calc(5*var(--u))] lg:text-[calc(15*var(--u))]">
                {card.text}
              </span>
            </span>

          </span>
        ) : (
          <span className="relative z-10 flex h-full max-w-[60%] flex-col p-5 lg:max-w-[66%] lg:px-[calc(24*var(--u))] lg:pt-[calc(22*var(--u))] lg:pb-[calc(14*var(--u))]">
            <span className="bento-title block text-[20px] leading-tight font-bold tracking-[-0.02em] text-[#1a0a04] lg:text-[calc(19.5*var(--u))]">
              {card.title}
            </span>
            <span
              className="bento-summary mt-1.5 block text-[15px] leading-[1.3] text-[#2a1d17] lg:mt-[calc(8*var(--u))] lg:text-[calc(14.5*var(--u))] lg:leading-[calc(20*var(--u))]"
              style={{ maxWidth: `calc(${textW} * var(--u))` }}
            >
              {card.text}
            </span>
          </span>
        )}
        {card.focus && <span className="sr-only">{card.focus}</span>}
        {external && <span className="sr-only">(opens in a new tab)</span>}
      </Tag>
    </motion.div>
  );
}

function Place({ style, delay, children }: { style: CSSProperties; delay: number; children: ReactNode }) {
  return (
    <motion.span
      className="absolute block"
      style={style}
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={seen}
      transition={{ type: "spring", stiffness: 215.6, damping: 23.8, delay }}
    >
      {children}
    </motion.span>
  );
}

const lift = "block transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

function Browser({
  src,
  w,
  height,
  sizes,
  scroll = false,
}: {
  src: string;
  w: number;
  height: number;
  sizes: string;
  scroll?: boolean;
}) {
  return (
    <span
      className="flex flex-col overflow-hidden bg-white shadow-[0_24px_44px_-26px_rgba(74,36,18,0.6)] ring-1 ring-black/5"
      style={{ borderRadius: cq(12, w), height: cq(height, w) }}
    >
      <span
        className="flex shrink-0 items-center border-b border-black/5"
        style={{ gap: cq(5, w), padding: `${cq(8, w)} ${cq(11, w)}` }}
      >
        {["#ff6b5e", "#ffc24a", "#4fd07c"].map((c) => (
          <span key={c} className="rounded-full" style={{ background: c, width: cq(7, w), height: cq(7, w) }} />
        ))}
      </span>
      <span className="relative block flex-1 overflow-hidden">
        <Image
          src={src}
          alt=""
          fill
          sizes={sizes}
          draggable={false}
          className={`object-cover object-left-top ${
            scroll ? "transition-[object-position] duration-[1600ms] ease-in-out group-hover:object-[0%_60%]" : ""
          }`}
        />
      </span>
    </span>
  );
}

function Phone({
  src,
  box,
  sizes,
}: {
  src: string;
  box: { x: number; y: number; w: number; h: number; r: number };
  sizes: string;
}) {
  return (
    <span
      className="relative block overflow-hidden shadow-[0_26px_40px_-18px_rgba(20,10,30,0.55)]"
      style={{
        aspectRatio: `${box.w} / ${box.h}`,
        borderRadius: `${(box.r / box.w) * 100}% / ${(box.r / box.h) * 100}%`,
      }}
    >
      <span
        className="absolute block"
        style={{
          width: `${(1600 / box.w) * 100}%`,
          height: `${(1000 / box.h) * 100}%`,
          left: `${(-box.x / box.w) * 100}%`,
          top: `${(-box.y / box.h) * 100}%`,
        }}
      >
        <Image src={src} alt="" fill sizes={sizes} className="object-cover" draggable={false} />
      </span>
    </span>
  );
}

const BATUA_PHONE = { x: 1088, y: 62, w: 397, h: 876, r: 62 };
const SAATHI_PHONE = { x: 1058, y: 133, w: 350, h: 734, r: 54 };

function BatuaVisual() {
  const W = 520;
  return (
    <>
      <Place style={{ left: cq(47, W), top: cq(28, W), width: cq(428, W) }} delay={0.1}>
        <span className={`${lift} group-hover:-translate-x-[0.8cqw] group-hover:-translate-y-[1.2cqw]`}>
          <Browser src="/builds/batua.jpg" w={W} height={300} sizes="(max-width: 1024px) 80vw, 460px" />
        </span>
      </Place>
      <Place style={{ left: cq(345, W), top: cq(63, W), width: cq(118, W) }} delay={0.19}>
        <span className={`${lift} group-hover:-translate-y-[2.4cqw] group-hover:-rotate-3`}>
          <span className="bob block" style={{ animationDelay: "-1.2s" }}>
            <Phone src="/builds/batua.jpg" box={BATUA_PHONE} sizes="(max-width: 1024px) 80vw, 560px" />
          </span>
        </span>
      </Place>
    </>
  );
}

function CorpSimVisual() {
  const W = 652;
  return (
    <Place style={{ left: cq(250, W), top: cq(30, W), width: cq(362, W) }} delay={0.15}>
      <span className="block max-lg:translate-x-[14cqw]">
        <span className={`${lift} rotate-[-1.5deg] group-hover:-translate-y-[1.5cqw] group-hover:rotate-0`}>
          <Browser src="/builds/corpsim.jpg" w={W} height={250} scroll sizes="(max-width: 1024px) 70vw, 440px" />
        </span>
      </span>
    </Place>
  );
}

function SaathiVisual() {
  const W = 314;
  return (
    <Place style={{ left: cq(184, W), top: cq(24, W), width: cq(108, W) }} delay={0.175}>
      <span className={`${lift} rotate-[-12deg] group-hover:-translate-y-[4cqw] group-hover:rotate-[-6deg]`}>
        <span className="bob block" style={{ animationDelay: "-2.4s" }}>
          <Phone src="/builds/saathi.jpg" box={SAATHI_PHONE} sizes="(max-width: 1024px) 50vw, 360px" />
        </span>
      </span>
    </Place>
  );
}

const CODE: { t: string; c?: string }[][] = [
  [{ t: "def ", c: "#ff8b8b" }, { t: "check_exceptions" }, { t: "(df):" }],
  [{ t: '    """Run exception checks on pipeline data"""', c: "#f4e3a1" }],
  [{ t: "    exceptions = []" }],
  [{ t: "    if ", c: "#ff8b8b" }, { t: "df[" }, { t: "'amount'", c: "#b5e08f" }, { t: "].isnull().any():" }],
  [{ t: "        exceptions.append(" }, { t: "'Missing amount'", c: "#b5e08f" }, { t: ")" }],
  [{ t: "    return ", c: "#ff8b8b" }, { t: "exceptions" }],
];
const CODE_LEN = CODE.reduce((n, l) => n + l.reduce((m, p) => m + p.t.length, 0) + 1, 0);

function useTyping(speed: number) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduce = useReducedMotion();
  const [chars, setChars] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setChars(CODE_LEN);
      return;
    }
    let raf = 0;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t + 650;
      const n = Math.max(0, Math.floor((t - start) / speed));
      setChars(Math.min(CODE_LEN, n));
      if (n < CODE_LEN) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, speed]);
  return { ref, chars };
}

function CodeLines({ chars, w, size }: { chars: number; w: number; size: number }) {
  let left = chars;
  return (
    <span className="block font-mono text-[#f2ece8]" style={{ fontSize: cq(size, w), lineHeight: 1.7 }}>
      {CODE.map((line, li) => {
        const parts = line.map((p, pi) => {
          const shown = Math.max(0, Math.min(p.t.length, left));
          left -= p.t.length;
          return shown ? (
            <span key={pi} style={{ color: p.c }}>
              {p.t.slice(0, shown)}
            </span>
          ) : null;
        });
        const lineLen = line.reduce((n, p) => n + p.t.length, 0);
        const typing = left < 0 && left > -lineLen - 1;
        const last = li === CODE.length - 1 && chars >= CODE_LEN;
        left -= 1;
        return (
          <span key={li} className="flex whitespace-pre">
            <span
              className="inline-block text-right text-[#7d7173] select-none"
              style={{ width: "1.6em", marginRight: "1.1em" }}
            >
              {li + 1}
            </span>
            {parts}
            {(typing || last) && <span className="caret ml-px inline-block w-[0.55em] bg-[#f4e3a1]/85">&nbsp;</span>}
          </span>
        );
      })}
    </span>
  );
}

function Editor({ w, width, children }: { w: number; width: number; children: ReactNode }) {
  return (
    <span
      className="block bg-gradient-to-b from-[#302c2d] to-[#252223] shadow-[0_26px_44px_-20px_rgba(30,15,8,0.75)] ring-1 ring-white/10"
      style={{ width: cq(width, w), borderRadius: cq(12, w), padding: `${cq(12, w)} ${cq(16, w)} ${cq(18, w)}` }}
    >
      <span className="flex" style={{ gap: cq(6, w), marginBottom: cq(14, w) }}>
        {["#ff6b5e", "#ffc24a", "#4fd07c"].map((c) => (
          <span key={c} className="rounded-full" style={{ background: c, width: cq(9, w), height: cq(9, w) }} />
        ))}
      </span>
      {children}
    </span>
  );
}

function CodePeek() {
  const W = 321;
  const { ref, chars } = useTyping(14);
  return (
    <Place style={{ left: cq(196, W), top: cq(46, W) }} delay={0.2}>
      <span ref={ref} className={`${lift} rotate-[-8deg] group-hover:-translate-y-[4cqw] group-hover:rotate-[-4deg]`}>
        <Editor w={W} width={300}>
          <CodeLines chars={chars} w={W} size={8} />
        </Editor>
      </span>
    </Place>
  );
}

function CodeEditor() {
  const W = 346;
  const { ref, chars } = useTyping(24);
  return (
    <Place style={{ left: cq(30, W), top: cq(38, W) }} delay={0.15}>
      <span
        ref={ref}
        className={`${lift} rotate-[-4deg] group-hover:-translate-y-[2.5cqw] group-hover:rotate-[-1.5deg]`}
      >
        <span className="bob block" style={{ animationDelay: "-3s" }}>
          <Editor w={W} width={300}>
            <span className="block min-h-[11.2em]" style={{ fontSize: cq(11.5, W) }}>
              <CodeLines chars={chars} w={W} size={11.5} />
            </span>
          </Editor>
        </span>
      </span>
    </Place>
  );
}

const PRD_SECTIONS = ["Vision", "Onboarding", "Borrowing & rewards", "Trust", "Launch plan"];

function PrdStack() {
  const W = 505;
  const sheet = "absolute block bg-white shadow-[0_18px_34px_-22px_rgba(74,36,18,0.55)] ring-1 ring-black/[0.04]";
  return (
    <>
      <Place style={{ left: cq(26, W), top: cq(58, W), width: cq(380, W), height: cq(240, W) }} delay={0.09}>
        <span
          className={`${sheet} ${lift} inset-0 rotate-[1deg] opacity-80 group-hover:-translate-x-[2cqw] group-hover:-rotate-[2deg]`}
          style={{ borderRadius: cq(12, W) }}
        />
      </Place>
      <Place style={{ left: cq(50, W), top: cq(40, W), width: cq(390, W), height: cq(240, W) }} delay={0.13}>
        <span
          className={`${sheet} ${lift} inset-0 rotate-[3.5deg] opacity-90 group-hover:-translate-x-[1cqw] group-hover:rotate-[1.5deg]`}
          style={{ borderRadius: cq(12, W) }}
        />
      </Place>
      <Place style={{ left: cq(84, W), top: cq(20, W), width: cq(392, W), height: cq(250, W) }} delay={0.18}>
        <span
          className={`${sheet} ${lift} inset-0 rotate-[6.5deg] group-hover:-translate-y-[1.6cqw] group-hover:rotate-[4deg]`}
          style={{ borderRadius: cq(12, W), padding: `${cq(26, W)} ${cq(26, W)}` }}
        >
          <span className="flex items-start" style={{ gap: cq(18, W) }}>
            <span className="relative shrink-0" style={{ width: cq(38, W), height: cq(38, W), marginTop: cq(4, W) }}>
              <Image src="/logos/saathi.png" alt="" fill sizes="40px" className="object-contain" />
            </span>
            <span className="min-w-0">
              <span className="block font-medium text-[#2a1d17]" style={{ fontSize: cq(13, W) }}>
                Product Requirements Document
              </span>
              <span
                className="display mt-[0.3em] block tracking-[-0.025em] text-[#1a0a04]"
                style={{ fontSize: cq(23, W) }}
              >
                Saathi Money
              </span>
              <span className="mt-[0.35em] block text-[#2a1d17] italic" style={{ fontSize: cq(11.5, W) }}>
                In-app guidance layer
              </span>
            </span>
          </span>
          <span className="block" style={{ marginTop: cq(18, W), marginLeft: cq(2, W) }}>
            {PRD_SECTIONS.map((s, i) => (
              <motion.span
                key={s}
                className="flex items-center text-[#2a1d17]"
                style={{ fontSize: cq(11, W), gap: cq(10, W), lineHeight: 2 }}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={seen}
                transition={{ duration: 0.14285, delay: 0.26786 + i * 0.04 }}
              >
                <span className="rounded-full bg-[#d08a7a]" style={{ width: cq(5, W), height: cq(5, W) }} />
                {s}
              </motion.span>
            ))}
          </span>
        </span>
      </Place>
    </>
  );
}

function BatuaPhones() {
  const W = 308;
  return (
    <>
      <Place style={{ left: cq(38, W), top: cq(57, W), width: cq(77, W) }} delay={0.11}>
        <span className={`${lift} rotate-[-10deg] group-hover:-translate-x-[3cqw] group-hover:rotate-[-15deg]`}>
          <span className="bob block" style={{ animationDelay: "-0.6s" }}>
            <Phone src="/builds/batua.jpg" box={BATUA_PHONE} sizes="200px" />
          </span>
        </span>
      </Place>
      <Place style={{ left: cq(110, W), top: cq(30, W), width: cq(135, W) }} delay={0.19}>
        <span className={`${lift} rotate-[13deg] group-hover:-translate-y-[3cqw] group-hover:rotate-[8deg]`}>
          <span className="bob block" style={{ animationDelay: "-2.2s" }}>
            <Phone src="/builds/batua.jpg" box={BATUA_PHONE} sizes="300px" />
          </span>
        </span>
      </Place>
    </>
  );
}
