"use client";

import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform, type MotionStyle, type MotionValue } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { beyond, profile, type Cluster, type Photo } from "@/content";
import { useOverlay } from "@/lib/hooks";
import { seen, spring, springBouncy, springDrop } from "@/lib/motion";
import { SwipeCards } from "./SwipeCards";
import { Glyph } from "./Glyph";
import { ArrowUpRight, ChevronLeft, ChevronRight, Close, InstagramMark } from "./icons";
import { Eyebrow, Headline, Sparks } from "./kit";
import { Portal } from "./ui";

const ALL = beyond.clusters.flatMap((c) => c.photos.map((p) => p.photo));

const DRIFT = [36, 12, 52];

export function BeyondWork() {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const stage = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start end", "end start"] });

  return (
    <section id="beyond" className="relative mt-12 md:mt-14 lg:px-7">
      <Eyebrow>{beyond.eyebrow}</Eyebrow>
      <Headline lines={beyond.heading} className="mt-4 text-[clamp(28px,2.8vw,40px)] text-ink md:mt-5" />
      <p className="mt-3 max-w-[36rem] text-[15px] leading-[1.5] text-ink-soft md:hidden">
        A mix of workouts, food, travel and small experiments that keep me going.
      </p>

      <div className="beyond-mobile-collage mt-6 grid grid-cols-2 items-start gap-x-3 gap-y-5 md:hidden">
        {beyond.clusters.map((c, ci) => (
          <ClusterView key={c.id} cluster={c} index={ci} progress={scrollYProgress} onOpen={(p) => setOpen(ALL.indexOf(p))} />
        ))}
      </div>
      <div className="hidden md:block">
      <SwipeCards
        viewportRef={stage}
        label="Photo collections"
        className="beyond-rail mobile-rail mx-auto mt-6 max-w-[1080px] grid gap-x-[1.6%] gap-y-10 md:grid-cols-2 lg:mt-8 lg:grid-cols-[460fr_460fr_520fr] lg:gap-y-0"
      >
        {beyond.clusters.map((c, ci) => (
          <ClusterView
            key={c.id}
            cluster={c}
            index={ci}
            progress={scrollYProgress}
            onOpen={(p) => setOpen(ALL.indexOf(p))}
          />
        ))}
      </SwipeCards>
      </div>

      <Portal>
        <AnimatePresence>
          {open !== null && <Lightbox index={open} onIndex={setOpen} onClose={close} />}
        </AnimatePresence>
      </Portal>
    </section>
  );
}

function ClusterView({
  cluster: c,
  index,
  progress,
  onOpen,
}: {
  cluster: Cluster;
  index: number;
  progress: MotionValue<number>;
  onOpen: (p: Photo) => void;
}) {
  const y = useTransform(progress, [0, 1], [DRIFT[index], -DRIFT[index]]);
  const last = index === beyond.clusters.length - 1;
  return (
    <motion.div
      className={`@container beyond-cluster beyond-cluster-${c.id} relative lg:mt-[var(--off)] ${last ? "md:col-span-2 md:mx-auto md:w-[min(100%,560px)] lg:col-span-1 lg:mx-0 lg:w-auto" : ""}`}
      style={{ "--off": `${c.offset}%`, y } as MotionStyle}
    >
      <motion.div
        className="relative"
        style={{ aspectRatio: c.aspect }}
        initial="hidden"
        whileInView="show"
        viewport={seen}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03929, delayChildren: index * 0.06 } } }}
      >
        {c.photos.map((p, i) => (
          <motion.button
            key={p.photo.src}
            type="button"
            onClick={() => onOpen(p.photo)}
            aria-label={`Open photo: ${p.photo.caption}`}
            className="group absolute block cursor-zoom-in"
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: `${p.width}%`, zIndex: i + 1 }}
            variants={{
              hidden: { opacity: 0, y: -46, rotate: p.rotate + (i % 2 ? 9 : -9), scale: 1.08 },
              show: { opacity: 1, y: 0, rotate: p.rotate, scale: 1, transition: springDrop },
            }}
            whileHover={{ rotate: 0, scale: 1.05, y: -6, zIndex: 20, transition: spring }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="frame block !rounded-[18px] !p-[6px] transition-shadow duration-300 group-hover:!shadow-[0_30px_50px_-18px_rgba(74,36,18,0.5)] sm:!p-[7px]">
              <span className="frame-in !rounded-[12px]" style={{ aspectRatio: p.aspect }}>
                <Image
                  src={p.photo.src}
                  alt={p.photo.alt}
                  fill
                  sizes="(max-width: 768px) 60vw, 300px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                  style={p.focus ? { objectPosition: p.focus } : undefined}
                />
              </span>
            </span>
          </motion.button>
        ))}

        <ClusterLabel label={c.label} />
        {c.spark && (
          <span
            className="absolute z-30"
            style={{ left: `${c.spark.left}%`, top: `${c.spark.top}%`, rotate: `${c.spark.rotate}deg` }}
          >
            <Sparks size={44} delay={0.9 + index * 0.06} />
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}

function ClusterLabel({ label }: { label: Cluster["label"] }) {
  const ig = label.icon === "dumbbell" && profile.instagram;
  return (
    <motion.div
      className={`beyond-cluster-label absolute z-30 flex items-center gap-3 rounded-[22px] px-4 py-3 sm:px-4 sm:py-3 ${
        label.dark
          ? "bg-gradient-to-br from-[#7f3d1e] to-[#5c2913] text-[#fdf3ea] shadow-[0_18px_34px_-16px_rgba(60,25,10,0.8)] ring-[3px] ring-[#fdf6ee]"
          : "bg-[#fdf6ee] text-ink shadow-[0_18px_34px_-16px_rgba(74,36,18,0.55)] ring-1 ring-white"
      }`}
      style={{ left: `${label.left}%`, top: `${label.top}%`, fontSize: "clamp(14px, 4.4cqw, 20px)" }}
      variants={{
        hidden: { opacity: 0, x: -24, rotate: label.rotate - 10, scale: 0.85 },
        show: { opacity: 1, x: 0, rotate: label.rotate, scale: 1, transition: { ...springBouncy, delay: 0.16072 } },
      }}
      whileHover={{ rotate: label.rotate + 2, scale: 1.03, transition: spring }}
    >
      <span className={`inline-flex shrink-0 ${label.dark ? "" : "text-ink"}`}>
        <Glyph name={label.icon} size={label.note || ig ? 30 : 28} strokeWidth={1.8} />
      </span>
      <span className="leading-[1.15]">
        <span className={`block font-bold tracking-[-0.01em] ${label.icon === "dumbbell" ? "max-w-[10em]" : ""}`}>
          {label.title}
        </span>
        {label.note && <span className="block text-[0.78em] font-medium opacity-90">{label.note}</span>}
        {ig && (
          <a
            href={profile.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow my fitness journey on Instagram (opens in a new tab)"
            className="mt-2 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-[0.66em] font-semibold text-ink hover:text-brand"
          >
            <InstagramMark width={16} height={16} /> Follow on Instagram
            <ArrowUpRight width={13} height={13} />
          </a>
        )}
      </span>
    </motion.div>
  );
}

function Lightbox({ index, onIndex, onClose }: { index: number; onIndex: (i: number) => void; onClose: () => void }) {
  useOverlay(true, onClose);
  const touchStart = useRef<{x:number; y:number} | null>(null);
  const photo = ALL[index];
  const go = (d: number) => onIndex((index + d + ALL.length) % ALL.length);

  const maxW = Math.min(photo.w * 1.6, 900, window.innerWidth - 32, (window.innerHeight * 0.72 * photo.w) / photo.h);
  return (
    <motion.div
      className="fixed inset-0 z-[70] grid place-items-center bg-[#1c0d05]/70 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <AnimatePresence mode="wait">
        <motion.figure
          key={photo.src}
          className="frame relative w-full !rounded-[24px] !p-2.5 !pb-3"
          style={{ maxWidth: maxW }}
          initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.04286 } }}
          transition={spring}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={e => { const t = e.touches[0]; touchStart.current = {x:t.clientX,y:t.clientY}; }}
          onTouchEnd={e => { const start = touchStart.current; const t = e.changedTouches[0]; if (start && Math.abs(t.clientX-start.x) > 48 && Math.abs(t.clientX-start.x) > Math.abs(t.clientY-start.y)*1.3) go(t.clientX < start.x ? 1 : -1); touchStart.current = null; }}
        >
          <span
            className="relative block overflow-hidden rounded-[16px]"
            style={{ aspectRatio: `${photo.w} / ${photo.h}` }}
          >
            <Image src={photo.src} alt={photo.alt} fill sizes="900px" className="object-contain" />
          </span>
          <figcaption className="mt-2 text-center font-hand text-[24px] text-ink-soft">{photo.caption}</figcaption>
        </motion.figure>
      </AnimatePresence>
      {[-1, 1].map((d) => (
        <button
          key={d}
          type="button"
          aria-label={d < 0 ? "Previous photo" : "Next photo"}
          onClick={(e) => {
            e.stopPropagation();
            go(d);
          }}
          className={`absolute bottom-6 grid h-11 w-11 place-items-center rounded-full bg-[#fdf6ee] text-espresso shadow-lg hover:bg-white md:top-1/2 md:bottom-auto md:-translate-y-1/2 ${
            d < 0 ? "left-[calc(50%-56px)] md:left-6" : "right-[calc(50%-56px)] md:right-6"
          }`}
        >
          {d < 0 ? <ChevronLeft /> : <ChevronRight />}
        </button>
      ))}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-[#fdf6ee] text-espresso shadow-lg hover:bg-white"
      >
        <Close width={14} height={14} />
      </button>
    </motion.div>
  );
}
