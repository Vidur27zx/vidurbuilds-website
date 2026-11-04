"use client";

import { MapPin } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { PointerEvent } from "react";
import { about } from "@/content";
import { seen, springBouncy, springDrop } from "@/lib/motion";
import { ArrowRight } from "./icons";
import { Eyebrow, Framed, Headline, Rise, SkillPill } from "./kit";
import { Pill } from "./ui";

export function About() {
  return (
    <section
      id="about"
      className="panel dot-grid relative mt-6 overflow-hidden px-5 py-7 md:mt-10 md:px-8 md:py-8 lg:px-[calc(34*var(--u))] lg:pt-[calc(32*var(--u))] lg:pb-[calc(32*var(--u))]"
    >
      <div className="grid items-center gap-4 md:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(260px,calc(280*var(--u)))] lg:gap-[calc(32*var(--u))]">
        <div>
          <Eyebrow>
            {about.eyebrow}
          </Eyebrow>
          <Headline
            lines={about.headline}
            className="mt-4 text-[clamp(28px,2.8vw,40px)] tracking-[-0.05em] text-ink md:mt-5 lg:text-[clamp(30px,2.8vw,40px)]"
          />
          <Rise
            as="p"
            delay={0.075}
            className="mt-4 max-w-[860px] text-[16px] leading-[1.55] text-ink-soft md:mt-5 md:text-[17px] lg:max-w-[52vw] lg:text-[17px] lg:leading-[1.45]"
          >
            {about.body}
          </Rise>
          <div className="mt-4 flex flex-wrap gap-1.5 md:mt-5 md:gap-3 lg:gap-[calc(14*var(--u))]">
            {about.skills.map((s, i) => (
              <SkillPill key={s.label} label={s.label} icon={s.icon} i={i} />
            ))}
          </div>
          <Rise delay={0.175} className="mt-5 md:mt-11 lg:mt-7">
            <Pill
              href="/about"
              size="lg"
              className="lg:!gap-3 lg:!rounded-[calc(18*var(--u))] lg:!px-[calc(32*var(--u))] lg:!py-[calc(13*var(--u))] lg:!text-[calc(17*var(--u))]"
            >
              {about.cta}
              <ArrowRight
                width={20}
                height={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Pill>
          </Rise>
        </div>
        <PhotoStack />
      </div>
    </section>
  );
}

function PhotoStack() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 313.6, damping: 25.2 });
  const sy = useSpring(my, { stiffness: 313.6, damping: 25.2 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-7, 7]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const backX = useTransform(sx, [-0.5, 0.5], [12, -12]);
  const backY = useTransform(sy, [-0.5, 0.5], [10, -10]);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      className="group relative mx-auto w-full max-w-[230px] px-4 pt-3 pb-7 sm:max-w-[360px] lg:max-w-none"
      style={{ perspective: 1100 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      <motion.div style={{ x: backX, y: backY }} className="absolute inset-x-6 top-0 bottom-14">
        <motion.span
          aria-hidden
          className="block h-full w-full rounded-[44px] bg-gradient-to-br from-[#f7d4ab] to-[#f0bd8a] shadow-[0_24px_50px_-26px_rgba(150,80,30,0.6)]"
          initial={{ opacity: 0, rotate: 4, x: 50 }}
          whileInView={{ opacity: 1, rotate: -7, x: 18 }}
          viewport={seen}
          transition={{ type: "spring", stiffness: 235.2, damping: 25.2 }}
        />
      </motion.div>
      <motion.div
        className="relative"
        style={{ rotateX, rotateY }}
        initial={{ opacity: 0, y: -70, rotate: 14, scale: 1.06 }}
        whileInView={{ opacity: 1, y: 0, rotate: 4, scale: 1 }}
        viewport={seen}
        transition={{ ...springDrop, delay: 0.05358 }}
      >
        <Framed
          src={about.photo}
          alt={about.photoAlt}
          aspect="0.8"
          sizes="(max-width: 1024px) 80vw, 420px"
          className="!rounded-[30px] !p-[9px] [&>.frame-in]:!rounded-[22px]"
        />
      </motion.div>
      <motion.span
        className="absolute right-0 bottom-4 flex items-center gap-2.5 rounded-2xl bg-[#fdf5ec] px-5 py-3 text-[15px] font-semibold lg:px-[calc(26*var(--u))] lg:py-[calc(15*var(--u))] text-ink shadow-[0_16px_30px_-14px_rgba(74,36,18,0.5)] ring-1 ring-white md:text-[16px]"
        initial={{ opacity: 0, scale: 0.5, rotate: 12 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
        viewport={seen}
        transition={{ ...springBouncy, delay: 0.24999 }}
      >
        <motion.span
          className="inline-flex text-brand"
          initial={{ y: -14 }}
          whileInView={{ y: [-14, 0, -4, 0] }}
          viewport={seen}
          transition={{ duration: 0.24999, delay: 0.30357, times: [0, 0.5, 0.75, 1] }}
        >
          <MapPin size={22} strokeWidth={2} fill="currentColor" stroke="#fdf5ec" />
        </motion.span>
        {about.place}
      </motion.span>
    </div>
  );
}
