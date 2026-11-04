"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveHorizontal, RotateCcw, Volume2, VolumeX } from "lucide-react";
import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { chips, experienceLogos, hero, heroCards, intro, profile, type Chip, type HeroCard } from "@/content";
import { useOverlay } from "@/lib/hooks";
import { easeOut, spring, springSnappy } from "@/lib/motion";
import { Glyph } from "./Glyph";
import { Close, Pause, Play } from "./icons";
import { ArrowDot } from "./kit";
import { Portal } from "./ui";

export function Hero() {
  const [introRect, setIntroRect] = useState<DOMRect | null>(null);
  const words = hero.role.split(" ");
  const accent = words.pop();

  return (
    <section className="hero-surface panel relative px-5 pt-6 pb-5 md:px-8 md:pt-8 md:pb-6 lg:px-9">
      <p className="eyebrow flex flex-wrap items-center gap-x-2 gap-y-1 max-sm:text-[11px] max-sm:tracking-[0.14em] sm:gap-x-3">
        {hero.eyebrow.map((w, i) => (
          <span
            key={w}
            className="hero-in flex items-center gap-2 sm:gap-3"
            style={{ animationDelay: `${0.0125 + i * 0.0175}s` }}
          >
            {i > 0 && <span className="h-[5px] w-[5px] rounded-full bg-brand/70" aria-hidden />}
            {w}
          </span>
        ))}
      </p>

      <h1 className="display mt-3 text-[clamp(32px,3.8vw,56px)] text-ink md:mt-4">
        <span className="line-mask">
          <span className="line-rise" style={{ animationDelay: "0.05358s" }}>
            {hero.greeting}
          </span>
        </span>
        <span className="line-mask">
          <span className="line-rise" style={{ animationDelay: "0.09643s" }}>
            {words.join(" ")} <span className="text-brand">{accent}</span>
          </span>
        </span>
      </h1>

      <div className="hero-in" style={{ animationDelay: "0.16072s" }}>
        <p className="mt-4 max-w-[700px] text-[16px] leading-[1.5] text-ink-soft md:mt-5 md:text-[18px] lg:text-[clamp(16px,1.2vw,18px)]">
          {hero.lead}
        </p>

        <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-3 text-[15px] text-ink-soft md:mt-5 md:text-[15px]">
          <span className="inline-flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2.5">
              Currently at <ChipPill chip={chips.iagent} />
            </span>
            <span className="inline-flex items-center gap-2.5">
              and <ChipPill chip={chips.saathi} />
            </span>
          </span>
          <span className="hidden h-[5px] w-[5px] rounded-full bg-ink/25 sm:inline-block" aria-hidden />
          <span className="inline-flex items-center gap-2.5">
            Previously at <ChipPill chip={chips.deloitte} />
          </span>
        </p>
      </div>

      <CardDeck onOpenIntro={setIntroRect} />

      <Portal>
        <AnimatePresence>
          {introRect && <IntroModal key="intro" origin={introRect} onClose={() => setIntroRect(null)} />}
        </AnimatePresence>
      </Portal>
    </section>
  );
}

const TILT = [
  { rotate: -2, y: 5 },
  { rotate: 2.5, y: 0 },
  { rotate: -2, y: 7 },
  { rotate: 2.5, y: 3 },
];

const WIDTH = [
  "w-[70vw] max-w-[290px] sm:w-[440px] sm:max-w-none lg:w-[28vw] lg:max-w-[380px]",
  "w-[60vw] max-w-[240px] sm:w-[250px] sm:max-w-none lg:w-[16vw] lg:max-w-[220px]",
  "w-[64vw] max-w-[260px] sm:w-[280px] sm:max-w-none lg:w-[17vw] lg:max-w-[240px]",
  "w-[72vw] max-w-[290px] sm:w-[320px] sm:max-w-none lg:w-[19vw] lg:max-w-[270px]",
];

function CardDeck({ onOpenIntro }: { onOpenIntro: (r: DOMRect) => void }) {
  const track = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [max, setMax] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [settled, setSettled] = useState(false);
  const moved = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const id = setTimeout(() => setSettled(true), 325);
    return () => clearTimeout(id);
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      const el = track.current;
      const bounds = viewport.current?.getBoundingClientRect();
      if (!el || !bounds) return;
      const left = el.getBoundingClientRect().left - x.get();
      const right = left + el.scrollWidth;
      const next = Math.max(0, Math.round(right - bounds.right));
      setMax(next);
      if (-x.get() > next) x.set(-next);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    if (viewport.current) ro.observe(viewport.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [x]);

  const slideTo = (target: number) => {
    animate(x, Math.max(-max, Math.min(0, target)), { type: "spring", stiffness: 352.8, damping: 36.4 });
  };

  const onFocus = (e: FocusEvent<HTMLDivElement>) => {
    const card = (e.target as HTMLElement).closest("[data-card]");
    if (!card) return;
    const index = Number(card.getAttribute("data-card"));
    if (Number.isFinite(index)) setHovered(index);
    const r = card.getBoundingClientRect();
    const bounds = viewport.current?.getBoundingClientRect();
    if (!bounds) return;
    if (r.right > bounds.right) slideTo(x.get() - (r.right - bounds.right));
    else if (r.left < bounds.left) slideTo(x.get() + (bounds.left - r.left));
  };

  const slots: (HeroCard | "intro")[] = ["intro", ...heroCards];

  return (
    <div className="relative mt-6 md:mt-7">
      <div ref={viewport} className="hero-deck-viewport overflow-x-clip">
        <motion.div
          ref={track}
          className="hero-deck-track flex w-max cursor-grab touch-pan-y lg:mx-auto items-start pt-4 pb-8 active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -max, right: 0 }}
          dragElastic={0.14}
          dragTransition={{ power: 0.28, timeConstant: 260, bounceStiffness: 127.4, bounceDamping: 21 }}
          onDragStart={() => {
            moved.current = true;
            setHovered(null);
          }}
          onDragEnd={() => setTimeout(() => (moved.current = false), 0)}

          onClickCapture={(e) => {
            if (moved.current) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          onFocus={onFocus}
          onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHovered(null); }}
          onMouseLeave={() => setHovered(null)}
        >
          {slots.map((slot, i) => {
            const on = hovered === i;
            return (
              <motion.div
                key={i}
                data-card={i}
                className={`relative shrink-0 ${WIDTH[i]} ${i ? "-ml-2 sm:-ml-2 lg:ml-1" : ""}`}
                style={{ zIndex: on ? 20 : [6, 5, 4, 5][i] }}

                initial={{ opacity: 0, x: -90 * i - 30, y: 40, rotate: 0, scale: 0.9 }}
                animate={{
                  opacity: hovered !== null && !on ? 0.72 : 1,
                  x: 0,
                  y: on && !reduced ? -9 : TILT[i].y,
                  rotate: on ? TILT[i].rotate * 0.15 : TILT[i].rotate,
                  scale: on && !reduced ? 1.015 : 1,
                }}
                transition={{
                  default: settled ? spring : { type: "spring", stiffness: 333.2, damping: 28, delay: 0.19642 + i * 0.0225 },
                  opacity: { duration: 0.28573, delay: settled ? 0 : 0.08 + i * 0.025 },
                }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered((h) => (h === i ? null : h))}
              >
                {slot === "intro" ? (
                  <div>
                    <IntroCard hovered={on} onOpen={onOpenIntro} />
                  </div>
                ) : (
                  <div>
                    <DeckCard card={slot} hovered={on} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <p className="mt-1 flex items-center justify-center gap-3 text-[13px] font-medium text-ink-soft/80">
        Pick a card
        <span className="inline-flex items-center gap-1.5 text-[12px] md:hidden">
          <MoveHorizontal size={16} strokeWidth={1.7} aria-hidden="true" />
          Swipe
        </span>
      </p>
    </div>
  );
}

const cardLook: Record<HeroCard["tone"], string> = {
  peach: "bg-gradient-to-b from-[#fae7d7] to-[#f6dcc8] text-ink ring-1 ring-white/60",
  caramel: "bg-gradient-to-br from-[#985333] to-[#85482d] text-[#fdf3ea] ring-1 ring-white/30",
  cream: "bg-gradient-to-b from-[#fcefe5] to-[#f9e9dc] text-ink ring-1 ring-white/60",
};

function DeckCard({ card, hovered }: { card: HeroCard; hovered: boolean }) {
  const dark = card.tone === "caramel";
  return (
    <Link
      href={card.href}
      draggable={false}
      className={`glass-rim group relative flex h-[230px] flex-col overflow-hidden rounded-[28px] p-5 select-none sm:h-[250px] sm:p-6 lg:h-[clamp(240px,17vw,260px)] lg:p-5 ${cardLook[card.tone]} ${
        hovered ? "shadow-[0_22px_42px_-25px_rgba(74,36,18,0.4)]" : "shadow-[0_16px_32px_-25px_rgba(74,36,18,0.3)]"
      } transition-shadow duration-300`}
    >
      {dark && <InfoWaves hovered={hovered} />}
      <motion.span
        className={`relative inline-flex w-fit ${dark ? "text-[#fdf3ea]" : "text-brand"}`}
        animate={{ rotate: hovered ? -10 : 0, scale: hovered ? 1.1 : 1 }}
        transition={springSnappy}
      >
        <Glyph name={card.icon} size={28} strokeWidth={1.6} />
      </motion.span>
      <h2
        className={`display relative mt-3 whitespace-pre-line ${
          card.id === "experience"
            ? "text-[24px] sm:text-[26px] lg:text-[clamp(23px,1.8vw,27px)]"
            : "text-[28px] sm:text-[30px] lg:text-[clamp(25px,2vw,29px)]"
        }`}
      >
        {card.title}
      </h2>
      {card.id === "experience" ? (
        <ExperienceLogos />
      ) : (
        <p
          className={`relative mt-3 max-w-[220px] text-[15px] leading-[1.4] sm:text-[15px] lg:text-[15px] ${dark ? "text-[#fdf3ea]/90" : "text-ink-soft"}`}
        >
          {card.text}
        </p>
      )}
      <span className="relative mt-auto pt-3">
        <ArrowDot tone={dark ? "white" : "rust"} size={36} />
      </span>
      <span className="sr-only">{card.id === "experience" ? card.text : ""}</span>
    </Link>
  );
}

function InfoWaves({ hovered }: { hovered: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 300 200"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -right-2 -bottom-2 h-[55%] w-[95%]"
      aria-hidden
      animate={{ scale: hovered ? 1.06 : 1, y: hovered ? -4 : 0 }}
      style={{ transformOrigin: "100% 100%" }}
      transition={{ type: "spring", stiffness: 313.6, damping: 25.2 }}
    >
      <defs>
        <linearGradient id="iw1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c9784a" />
          <stop offset="1" stopColor="#e9a172" />
        </linearGradient>
        <linearGradient id="iw2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f2b585" />
          <stop offset="1" stopColor="#f8cfa7" />
        </linearGradient>
      </defs>
      <path d="M300 30 C250 60 230 120 150 150 C100 170 50 175 0 200 L300 200 Z" fill="url(#iw1)" opacity="0.75" />
      <path d="M300 90 C260 110 240 160 170 180 C140 190 110 195 90 200 L300 200 Z" fill="url(#iw2)" />
    </motion.svg>
  );
}

function ExperienceLogos() {
  return (
    <div className="relative mt-4 grid grid-cols-2 items-center gap-x-1 gap-y-2 text-[12px] font-semibold leading-tight text-ink lg:text-[clamp(12px,0.9vw,13px)]">
      {experienceLogos.map((l, i) => (
        <span
          key={l.name}
          className={`flex min-w-0 items-center gap-1 whitespace-nowrap ${i === 4 ? "col-start-2" : ""} ${i % 2 || i === 4 ? "border-l-[1.5px] border-ink/25 pl-2" : ""}`}
        >
          {l.wordmark ? (
            <img
              src={l.wordmark}
              alt={l.name}
              width={86}
              height={16}
              className={l.name === "Acumen Connect" ? "h-[21px] w-auto max-w-full object-contain" : "h-[15px] w-auto max-w-full object-contain"}
              draggable={false}
            />
          ) : (
            <>
              <span className="relative h-[18px] w-[18px] shrink-0">
                <Image src={l.logo!} alt="" fill sizes="18px" className="object-contain" draggable={false} />
              </span>
              {l.name}
            </>
          )}
        </span>
      ))}
    </div>
  );
}

function IntroCard({ hovered, onOpen }: { hovered: boolean; onOpen: (r: DOMRect) => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.2 });
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 431.2, damping: 28 });
  const rotateY = useSpring(ry, { stiffness: 431.2, damping: 28 });

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (inView && !reduce) void v.play().catch(() => {});
    else v.pause();
  }, [inView, reduce]);

  const onMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 8);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div style={{ perspective: 1000 }}>
      <motion.button
        ref={ref}
        type="button"
        aria-label={`${intro.label}: play the ${intro.length} intro video`}
        onClick={() => ref.current && onOpen(ref.current.getBoundingClientRect())}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY }}
        className={`frame group relative block h-[230px] w-full !rounded-[30px] !p-2 text-left text-white select-none sm:h-[250px] lg:h-[clamp(240px,17vw,260px)] ${
          hovered ? "!shadow-[0_40px_70px_-26px_rgba(46,20,8,0.6)]" : ""
        }`}
      >
        <span className="relative block h-full overflow-hidden rounded-[23px] bg-[#2a1810]">
          <motion.video
            ref={video}
            src={intro.loop}
            poster={intro.loopPoster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover object-[50%_54%]"
            animate={{ scale: hovered ? 1.08 : 1.02 }}
            transition={{ duration: 0.28573, ease: easeOut }}
          />
          <span
            className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent via-40% to-black/80"
            aria-hidden
          />

          <span className="absolute inset-x-0 top-0 flex items-center justify-between p-4 md:p-5">
            <span className="flex items-center gap-2 rounded-full bg-black/45 py-1.5 pr-3.5 pl-2.5 text-[13px] font-medium backdrop-blur-md md:text-[15px]">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping-soft absolute inset-0 rounded-full bg-hot" />
                <span className="relative h-3 w-3 rounded-full bg-hot ring-2 ring-white/20" />
              </span>
              {intro.kicker}
            </span>
            <span className="rounded-full bg-black/45 px-3 py-1.5 text-[13px] font-semibold tabular-nums backdrop-blur-md md:text-[15px]">
              {intro.length}
            </span>
          </span>

          <span className="absolute inset-0 grid place-items-center" aria-hidden>
            <PlayOrb hovered={hovered} />
          </span>

          <span className="absolute inset-x-0 bottom-0 p-4 md:p-6">
            <span className="display block text-[24px] text-white sm:text-[26px] lg:text-[clamp(24px,2vw,29px)]">
              {intro.label}
            </span>
            <span className="mt-1.5 block text-[13px] text-white/85 sm:text-[15px] lg:text-[16px]">{intro.blurb}</span>
          </span>
        </span>
      </motion.button>
    </div>
  );
}

function PlayOrb({ hovered }: { hovered: boolean }) {
  return (
    <span className="relative grid place-items-center">
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          className="absolute h-14 w-14 rounded-full border-[1.5px] border-white/70 md:h-16 md:w-16"
          animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
          transition={{
            duration: hovered ? 1.1 : 2.2,
            repeat: Infinity,
            delay: i * (hovered ? 0.55 : 1.1),
            ease: "easeOut",
          }}
        />
      ))}
      <motion.span
        className="relative grid h-14 w-14 place-items-center rounded-full border-[2.5px] border-white bg-black/25 backdrop-blur-sm md:h-16 md:w-16"
        animate={{
          scale: hovered ? 1.12 : 1,
          backgroundColor: hovered ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.25)",
        }}
        transition={springSnappy}
      >
        <motion.span
          className="inline-flex"
          animate={{ color: hovered ? "#4a2412" : "#ffffff" }}
          transition={{ duration: 0.07144 }}
        >
          <Play width={22} height={22} className="ml-1" />
        </motion.span>
      </motion.span>
    </span>
  );
}

const BARS = 30;

function fmt(s: number) {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

function IntroModal({ origin, onClose }: { origin: DOMRect; onClose: () => void }) {
  useOverlay(true, onClose);
  const video = useRef<HTMLVideoElement>(null);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const analyser = useRef<AnalyserNode | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [needsSound, setNeedsSound] = useState(false);
  const [ended, setEnded] = useState(false);
  const [chrome, setChrome] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const progress = useMotionValue(0);
  const level = useMotionValue(0);
  const glow = useSpring(level, { stiffness: 274.4, damping: 25.2 });
  const glowScale = useTransform(glow, [0, 0.6], [1, 1.16]);
  const glowOpacity = useTransform(glow, [0, 0.6], [0.5, 0.95]);

  const [box] = useState(() => {
    const maxH = Math.min(window.innerHeight - 48, 760);
    const w = Math.min((maxH * 9) / 16, window.innerWidth - 32);
    return {
      w,
      h: (w * 16) / 9,
      from: {
        x: origin.left + origin.width / 2 - window.innerWidth / 2,
        y: origin.top + origin.height / 2 - window.innerHeight / 2,
        scale: origin.width / w,
      },
    };
  });

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.play().catch(() => {
      v.muted = true;
      setMuted(true);
      setNeedsSound(true);
      void v.play().catch(() => {});
    });
  }, []);

  useEffect(() => {
    const v = video.current;
    const AC =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!v || !AC) return;
    let ctx: AudioContext | null = new AC();
    let cancelled = false;
    ctx
      .resume()
      .then(() => {
        if (cancelled || !ctx || ctx.state !== "running") return;
        const a = ctx.createAnalyser();
        a.fftSize = 256;
        a.smoothingTimeConstant = 0.72;
        ctx.createMediaElementSource(v).connect(a);
        a.connect(ctx.destination);
        analyser.current = a;
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      analyser.current = null;
      void ctx?.close();
      ctx = null;
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    const data = new Uint8Array(128);
    const mid = (BARS - 1) / 2;
    const draw = (t: number) => {
      const v = video.current;
      const on = !!v && !v.paused && !v.ended;
      const a = analyser.current;
      if (a) a.getByteFrequencyData(data);
      let sum = 0;
      bars.current.forEach((el, i) => {
        const d = Math.abs(i - mid);
        let x = 0;

        if (on && v && !v.muted && a) x = Math.min(1, Math.pow(data[2 + Math.floor(d * 1.4)] / 255, 1.7) * 1.25);
        else if (on) x = (0.3 + 0.4 * Math.abs(Math.sin(t / 240 + i * 0.6))) * (1 - d / (mid * 1.6));
        sum += x;
        if (el) el.style.transform = `scaleY(${0.08 + x * 0.92})`;
      });
      level.set(sum / BARS);
      if (v && v.duration) progress.set(v.currentTime / v.duration);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [level, progress]);

  const wake = useCallback(() => {
    setChrome(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setChrome(false), 2400);
  }, []);
  useEffect(() => () => clearTimeout(hideTimer.current), []);

  const toggle = useCallback(() => {
    const v = video.current;
    if (!v) return;
    if (v.paused || v.ended) {
      setEnded(false);
      void v.play();
    } else v.pause();
  }, []);

  const setSound = useCallback((on: boolean) => {
    const v = video.current;
    if (!v) return;
    v.muted = !on;
    setMuted(!on);
    setNeedsSound(false);
    if (on && v.paused) void v.play();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "k") {
        e.preventDefault();
        toggle();
      } else if (e.key === "m") setSound(video.current?.muted ?? false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle, setSound]);

  const seek = (e: PointerEvent<HTMLDivElement>) => {
    const v = video.current;
    if (!v || !v.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    v.currentTime = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * v.duration;
    setEnded(false);
  };

  const showChrome = chrome || !playing;

  return (
    <motion.div
      className="fixed inset-0 z-[70] grid place-items-center bg-[#1c0d05]/65 p-4 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.08928 }}
      onClick={onClose}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute rounded-[80px]"
        style={{
          width: box.w * 1.3,
          height: box.h * 1.02,
          scale: glowScale,
          opacity: glowOpacity,
          backgroundImage: `url(${intro.poster})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(70px) saturate(1.6)",
        }}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${intro.label}: ${profile.name}`}
        className="relative overflow-hidden rounded-[30px] bg-black text-white shadow-[0_30px_80px_rgba(0,0,0,0.5)] ring-[6px] ring-[#fdf6ee]"
        style={{ width: box.w, height: box.h }}
        initial={{ ...box.from, opacity: 0.6 }}
        animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
        exit={{ ...box.from, opacity: 0 }}
        transition={spring}
        onClick={(e) => e.stopPropagation()}
        onPointerMove={wake}
      >
        <video
          ref={video}
          src={intro.src}
          poster={intro.poster}
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full cursor-pointer object-cover"
          onClick={toggle}
          onPlay={() => {
            setPlaying(true);
            wake();
          }}
          onPause={() => setPlaying(false)}
          onEnded={() => {
            setPlaying(false);
            setEnded(true);
          }}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        />

        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 flex items-center gap-2.5 bg-gradient-to-b from-black/60 to-transparent p-4 pb-10"
          initial={false}
          animate={{ opacity: showChrome ? 1 : 0, y: showChrome ? 0 : -8 }}
          transition={{ duration: 0.08928 }}
        >
          <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-white/70">
            <Image src={profile.photo} alt="" fill sizes="36px" className="object-cover" />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block text-[13.5px] font-bold">{profile.name}</span>
            <span className="block text-[11px] text-white/70">{profile.role}</span>
          </span>
        </motion.div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md hover:bg-white/25"
        >
          <Close width={14} height={14} />
        </button>

        <AnimatePresence>
          {!playing && !ended && (
            <motion.button
              type="button"
              onClick={toggle}
              aria-label="Play"
              className="absolute top-1/2 left-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-espresso shadow-2xl backdrop-blur"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.05358 } }}
              transition={springSnappy}
            >
              <Play width={28} height={28} className="ml-1" />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {needsSound && (
            <motion.button
              type="button"
              onClick={() => setSound(true)}
              className="absolute top-[72px] left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[12.5px] font-bold text-espresso shadow-lg"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={springSnappy}
            >
              <Volume2 size={15} aria-hidden /> Tap for sound
            </motion.button>
          )}
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pt-16 pb-4">
          <div className="flex h-14 items-center gap-[3px]" aria-hidden>
            {Array.from({ length: BARS }, (_, i) => (
              <span
                key={i}
                ref={(el) => {
                  bars.current[i] = el;
                }}
                className="h-full flex-1 rounded-full bg-gradient-to-t from-[#b8582a] via-terracotta to-apricot"
                style={{ transform: "scaleY(0.08)" }}
              />
            ))}
          </div>
          <motion.div
            initial={false}
            animate={{ opacity: showChrome ? 1 : 0 }}
            transition={{ duration: 0.08928 }}
            className="mt-3"
          >
            <div
              role="slider"
              tabIndex={0}
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={Math.round(duration)}
              aria-valuenow={Math.round(time)}
              className="group relative h-4 cursor-pointer touch-none"
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                seek(e);
              }}
              onPointerMove={(e) => e.buttons === 1 && seek(e)}
            >
              <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/25" />
              <motion.span
                className="absolute inset-x-0 top-1/2 h-1 origin-left -translate-y-1/2 rounded-full bg-apricot"
                style={{ scaleX: progress }}
              />
            </div>
            <div className="mt-1.5 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={playing ? "Pause" : "Play"}
                  className="grid h-8 w-8 place-items-center rounded-full bg-white/15 hover:bg-white/25"
                >
                  {playing ? <Pause width={13} height={13} /> : <Play width={13} height={13} className="ml-0.5" />}
                </button>
                <span className="text-[11.5px] font-semibold text-white/80 tabular-nums">
                  {fmt(time)} / {fmt(duration)}
                </span>
              </span>
              <button
                type="button"
                onClick={() => setSound(muted)}
                aria-label={muted ? "Unmute" : "Mute"}
                className="grid h-8 w-8 place-items-center rounded-full bg-white/15 hover:bg-white/25"
              >
                {muted ? <VolumeX size={15} aria-hidden /> : <Volume2 size={15} aria-hidden />}
              </button>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {ended && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#2a1208]/75 p-6 text-center backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[
                <p key="t" className="display text-[30px]">
                  Thanks for watching
                </p>,
                <p key="s" className="max-w-[240px] text-[14px] text-white/75">
                  Have a look around, and say hello if something clicks.
                </p>,
                <div key="b" className="mt-2 flex flex-wrap justify-center gap-2">
                  <button
                    type="button"
                    onClick={toggle}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-3.5 py-2 text-[13px] font-semibold hover:bg-white/25"
                  >
                    <RotateCcw size={14} aria-hidden /> Replay
                  </button>
                  <EndLink href="/builds" onClose={onClose}>
                    See my work
                  </EndLink>
                  <EndLink href="/#contact" onClose={onClose} primary>
                    Say hello
                  </EndLink>
                </div>,
              ].map((el, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...springSnappy, delay: 0.02857 + i * 0.04 }}
                >
                  {el}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function EndLink({
  href,
  onClose,
  primary,
  children,
}: {
  href: string;
  onClose: () => void;
  primary?: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[13px] font-semibold ${
        primary ? "bg-[#fdf3ea] text-espresso" : "bg-white/15 hover:bg-white/25"
      }`}
    >
      {children}
    </Link>
  );
}

function ChipPill({ chip }: { chip: Chip }) {
  const [open, setOpen] = useState(false);
  const mx = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 588, damping: 39.2 }) as MotionValue<number>;
  const onMove = (e: MouseEvent<HTMLSpanElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.5);
  };
  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onMouseMove={onMove}
    >
      <a
        href={chip.href}
        target="_blank"
        rel="noreferrer"
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className={`glass-pill inline-flex h-[38px] items-center gap-2 rounded-full bg-[#fffaf5] align-middle text-[14px] font-bold text-ink shadow-[0_6px_16px_-8px_rgba(74,36,18,0.45)] ring-1 ring-line transition-transform duration-300 hover:-translate-y-0.5 md:h-[42px] md:text-[16px] ${
          chip.wordmark ? "px-4" : "pr-4 pl-[5px]"
        }`}
      >
        {chip.wordmark ? (
          <img src={chip.wordmark} alt={chip.name} width={96} height={18} className="h-[17px] w-auto md:h-[19px]" />
        ) : (
          <>
            <span className="relative h-[28px] w-[28px] overflow-hidden rounded-full bg-white ring-1 ring-black/5 md:h-[32px] md:w-[32px]">
              <Image src={chip.logo} alt="" fill sizes="32px" className="object-contain p-[4px]" />
            </span>
            {chip.name}
          </>
        )}
      </a>
      <AnimatePresence>
        {open && (
          <motion.span
            className="pointer-events-none absolute bottom-full left-1/2 z-40 mb-3 -ml-[120px] block w-[240px] rounded-2xl bg-[#fffaf5] p-1.5 text-left text-ink shadow-[0_20px_44px_-14px_rgba(74,36,18,0.45)] ring-1 ring-line"
            style={{ x }}
            initial={{ opacity: 0, y: 8, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96, transition: { duration: 0.05001 } }}
            transition={{ type: "spring", stiffness: 784, damping: 35 }}
          >
            <span className="flex h-[92px] items-center justify-center rounded-xl bg-peach/60">
              <motion.span
                className="relative grid h-16 w-16 place-items-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5"
                initial={{ rotate: -8, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={springSnappy}
              >
                <Image src={chip.logo} alt="" fill sizes="64px" className="object-contain p-2.5" />
              </motion.span>
            </span>
            <span className="block px-2 pt-2 pb-1.5">
              <span className="flex items-baseline justify-between gap-2">
                <span className="text-[13.5px] leading-tight font-bold">{chip.name}</span>
                <span className="text-[11px] font-semibold text-ink-soft/80">{chip.period}</span>
              </span>
              <span className="mt-0.5 block text-[12px] font-semibold text-brand">{chip.role}</span>
              <span className="mt-0.5 block text-[12px] leading-snug font-normal text-ink-soft">{chip.blurb}</span>
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
