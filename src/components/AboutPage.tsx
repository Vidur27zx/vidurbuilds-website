"use client";

import { CalendarDays, CircleCheck, FileText, Mail as MailIcon } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { aboutPage, profile, working } from "@/content";
import { easeRise, seen, spring, springBouncy, springDrop, springSnappy } from "@/lib/motion";
import { Glyph } from "./Glyph";
import { ArrowRight, ArrowUpRight } from "./icons";
import { Eyebrow, Framed, Headline, IconTile, Rise, SkillPill, Sparks } from "./kit";
import { Tools } from "./Tools";
import { Pill } from "./ui";

export function AboutView() {
  return (
    <div className="space-y-5 md:space-y-6">
      <Intro />
      <div className="flex flex-wrap justify-center gap-2.5 py-3 md:gap-3 lg:justify-start lg:py-3">
        {aboutPage.skills.map((s, i) => (
          <SkillPill key={s.label} label={s.label} icon={s.icon} i={i} />
        ))}
      </div>
      <div className="about-context-row grid items-stretch gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <WhereWorked />
        <WhatDrives />
      </div>
      <HowIWork />
      <Tools />
      <div className="grid items-start gap-4 md:gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <GoodToKnow />
        <OpenTo />
      </div>
      <BuildTogether />
    </div>
  );
}

function Intro() {
  return (
    <section className="grid items-center gap-10 pt-2 md:grid-cols-[minmax(200px,250px)_minmax(0,1fr)] md:gap-10 md:pt-6 md:pb-8 lg:gap-12">
      <div className="relative mx-auto w-[min(70%,250px)] md:mx-0 md:w-full">
        <Sparks className="absolute -top-14 -left-1 z-10 rotate-[-80deg]" size={52} delay={0.25} />
        <motion.span
          aria-hidden
          className="absolute -inset-x-3 top-6 -bottom-5 rounded-[44px] bg-gradient-to-br from-[#f3cba7] to-[#e9b48b]"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: -11 }}
          transition={{ ...spring, delay: 0.10714 }}
        />
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: -50, rotate: 6, scale: 1.05 }}
          animate={{ opacity: 1, y: 0, rotate: -5, scale: 1 }}
          whileHover={{ rotate: -2, scale: 1.02 }}
          transition={{ ...springDrop, delay: 0.05358 }}
        >
          <Framed
            src={profile.headshot}
            alt={profile.name}
            aspect="1"
            sizes="300px"
            focus="50% 30%"
            preload
            className="group !rounded-[34px] !p-[10px] [&>.frame-in]:!rounded-[26px]"
          />
        </motion.div>
      </div>
      <div>
        <Eyebrow>{aboutPage.eyebrow}</Eyebrow>
        <div className="relative mt-3 md:mt-4">
          <Headline
            as="h1"
            lines={aboutPage.heading}
            className="text-[clamp(30px,3vw,42px)] tracking-[-0.04em] text-[#3d1a09]"
          >
          </Headline>
        </div>
        <Rise as="p" delay={0.1} className="mt-5 max-w-[700px] text-[16px] leading-[1.55] text-ink-soft md:text-[17px]">
          {aboutPage.sub}
        </Rise>
      </div>
    </section>
  );
}

function Block({
  title,
  icon,
  iconTone = "peach",
  className = "",
  delay = 0,
  children,
}: {
  title: string;
  icon: ReactNode;
  iconTone?: "peach" | "sage" | "apricot";
  className?: string;
  delay?: number;
  children: ReactNode;
}) {
  const tone = {
    peach: "bg-peach text-brand",
    sage: "bg-[#dfe6c6] text-[#5d6844]",
    apricot: "bg-[#f9d9a6] text-brand",
  }[iconTone];
  return (
    <motion.section
      className={`glass-rim relative overflow-hidden rounded-[30px] p-5 shadow-[0_26px_50px_-36px_rgba(74,36,18,0.5)] ring-1 md:p-6 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={seen}
      transition={{ duration: 0.24999, ease: easeRise, delay }}
    >
      <div className="flex items-center gap-4">
        <motion.span
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${tone}`}
          initial={{ scale: 0.4, rotate: -30 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={seen}
          transition={{ ...springBouncy, delay: delay + 0.2 }}
        >
          {icon}
        </motion.span>
        <h2 className="display text-[24px] tracking-[-0.035em] text-ink md:text-[24px]">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

const white = "bg-[#fffaf6]/90 ring-line/80";

function WhereWorked() {
  return (
    <Block title="Where I've worked" icon={<Glyph name="briefcase" size={22} strokeWidth={1.9} />} className={white}>
      <ol className="relative mt-4 space-y-4 pl-1 lg:grid lg:grid-cols-2 lg:gap-x-4 lg:gap-y-4 lg:space-y-0 xl:grid-cols-3">
        <motion.span
          aria-hidden
          className="absolute top-3 bottom-3 left-[11px] w-[2px] origin-top rounded-full bg-peach lg:hidden"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={seen}
          transition={{ duration: 0.28573, delay: 0.12501, ease: "easeInOut" }}
        />
        {aboutPage.worked.map((w, i) => (
          <motion.li
            key={w.name}
            className="relative flex min-w-0 gap-3"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={seen}
            transition={{ duration: 0.17858, delay: 0.14285 + i * 0.11, ease: easeRise }}
          >
            <motion.span
              className="relative mt-1 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={seen}
              transition={{ ...springBouncy, delay: 0.16072 + i * 0.11 }}
            >
              {w.current ? (
                <>
                  <span className="animate-ping-soft absolute inset-1 rounded-full bg-[#e7a64a]/40" />
                  <span className="relative h-3.5 w-3.5 rounded-full border-[2px] border-[#e7a64a] bg-[#fbe2b8]" />
                </>
              ) : (
                <span className="h-3 w-3 rounded-full bg-[#e3ad8e]" />
              )}
            </motion.span>
            <span>
              <span className="block text-[17px] font-bold text-ink md:text-[17px]">
                {w.name}
                {w.aside && <span className="font-normal text-ink-soft lg:block lg:text-[12px] lg:leading-tight"> {w.aside}</span>}
              </span>
              <span className="mt-0.5 block text-[15px] text-brand/90 md:text-[16px] lg:text-[14px] lg:leading-snug">{w.note}</span>
            </span>
          </motion.li>
        ))}
      </ol>
    </Block>
  );
}

function WhatDrives() {
  return (
    <Block
      title="What drives me"
      iconTone="sage"
      icon={<Glyph name="leaf" size={22} strokeWidth={1.9} />}
      className="drives-card flex flex-col bg-gradient-to-br from-[#f4f3e1] to-[#e8ecd0] ring-white/70"
      delay={0.05}
    >
      <div className="drives-content mt-5 grid flex-1 items-center gap-4 sm:grid-cols-[minmax(0,1fr)_110px]">
        <p className="text-[16px] leading-[1.6] text-ink-soft md:text-[16px]">{aboutPage.drives}</p>
        <Summit />
      </div>
    </Block>
  );
}

function Summit() {
  const draw = (delay: number, duration = 1) => ({
    initial: { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: seen,
    transition: { duration, delay, ease: "easeInOut" as const },
  });
  return (
    <svg viewBox="0 0 150 110" className="mx-auto h-auto w-[110px] max-w-full text-[#5d6844]" fill="none" aria-hidden>
      <motion.path
        d="M4 100 L42 56 L58 72 L84 34 L112 70 L124 60 L146 92"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...draw(0.4, 1.2)}
      />
      <motion.path
        d="M78 42 L84 48 L88 41"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...draw(1.3, 0.3)}
      />
      <motion.path d="M84 34 V8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" {...draw(1.5, 0.4)} />
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={seen}
        transition={{ ...springSnappy, delay: 0.66072 }}
        style={{ transformBox: "fill-box", transformOrigin: "0% 50%" }}
      >
        <path
          className="flag-wave"
          d="M85 9 C92 6 96 13 104 10 L101 17 L104 23 C96 26 92 19 85 22 Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
          fill="#e6ecca"
        />
      </motion.g>
      {["M66 10 L70 16", "M60 22 L66 24", "M108 2 L106 9", "M118 12 L112 15"].map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="#c99a3a"
          strokeWidth="2.2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: [0, 1, 1] }}
          viewport={seen}
          transition={{ duration: 0.10714, delay: 1.5 + i * 0.05 }}
        />
      ))}
    </svg>
  );
}

function HowIWork() {
  return (
    <Block title="How I work" icon={<Glyph name="layers" size={22} strokeWidth={1.9} />} className={white}>
      <div className="process-row mt-4 grid items-stretch gap-3 md:grid-cols-[minmax(0,1fr)_48px_minmax(0,1fr)_48px_minmax(0,1fr)] md:gap-0">
        {aboutPage.steps.flatMap((step, i) => {
          const tile = (
            <motion.div
              key={step.title}
              className="process-card glass-rim group rounded-[22px] bg-gradient-to-br from-[#fdeee2] to-[#fae4d3] p-5 ring-1 ring-white/80 md:p-6"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={seen}
              whileHover={{ y: -4 }}
              transition={{ ...spring, delay: 0.08928 + i * 0.15 }}
            >
              <span className="flex items-center gap-3">
                <span className="inline-flex text-brand transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-12 group-hover:scale-110">
                  <Glyph name={step.icon} size={26} strokeWidth={1.9} />
                </span>
                <span className="text-[19px] font-bold text-ink md:text-[17px]">{step.title}</span>
              </span>
              <p className="mt-3 text-[15px] leading-[1.5] text-ink-soft md:text-[16.5px]">{step.text}</p>
            </motion.div>
          );
          if (i === 0) return [tile];
          return [<StepArrow key={`a${i}`} delay={0.15 + i * 0.15} />, tile];
        })}
      </div>
    </Block>
  );
}

function StepArrow({ delay }: { delay: number }) {
  return (
    <span className="grid self-stretch place-items-center py-1 text-brand md:py-0" aria-hidden>
      <motion.span
        className="inline-flex rotate-90 md:rotate-0"
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={seen}
        transition={{ duration: 0.16072, delay, ease: easeRise }}
      >
        <span className="nudge inline-flex">
          <ArrowRight width={28} height={28} strokeWidth={1.8} />
        </span>
      </motion.span>
    </span>
  );
}

function GoodToKnow() {
  return (
    <Block
      title="Good to know"
      iconTone="sage"
      icon={<CircleCheck size={24} strokeWidth={1.9} aria-hidden />}
      className={white}
    >
      <ul className="mt-4 space-y-3">
        {working.goodToKnow.map((item, i) => (
          <motion.li
            key={item}
            className="flex items-start gap-3.5 text-[15.5px] leading-snug text-ink md:text-[17px]"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={seen}
            transition={{ duration: 0.17858, delay: 0.08928 + i * 0.05, ease: easeRise }}
          >
            <span className="mt-[1px] grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#e0ecc9] text-leaf">
              <svg viewBox="0 0 16 16" width="13" height="13" fill="none" aria-hidden>
                <motion.path
                  d="M3.5 8.5 6.5 11.5 12.5 4.5"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={seen}
                  transition={{ duration: 0.12501, delay: 0.16072 + i * 0.05 }}
                />
              </svg>
            </span>
            {item}
          </motion.li>
        ))}
      </ul>
    </Block>
  );
}

function OpenTo() {
  return (
    <Block
      title="Open to"
      iconTone="apricot"
      icon={<Glyph name="target" size={24} strokeWidth={1.9} />}
      className="flex flex-col bg-gradient-to-br from-[#fef1cf] to-[#fde5b3] ring-white/70"
      delay={0.05}
    >
      <p className="mt-5 text-[16px] leading-[1.6] text-ink-soft md:text-[17px]">{profile.openTo}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Pill href={profile.bookingUrl} external size="lg" className="!px-5 !py-3 !text-[16px]">
          <CalendarDays size={19} strokeWidth={1.9} aria-hidden /> Book a call
        </Pill>
        <Pill href={profile.resumeUrl} external variant="ghost" size="lg" className="!px-5 !py-3 !text-[16px]">
          <FileText size={19} strokeWidth={1.9} aria-hidden /> Resume
        </Pill>
      </div>
    </Block>
  );
}

function BuildTogether() {
  return (
    <motion.section
      className="glass-rim relative mt-4 grid items-center gap-6 overflow-hidden rounded-[34px] bg-gradient-to-r from-[#5e3420] via-[#73452b] to-[#6a3c24] px-6 py-7 text-[#fdf3ea] shadow-[0_36px_60px_-34px_rgba(60,25,10,0.9)] md:grid-cols-[auto_1px_minmax(0,1fr)_auto] md:gap-9 md:px-8 md:py-8"
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={seen}
      transition={{ duration: 0.28573, ease: easeRise }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-[#a76a46]/30 blur-2xl"
      />
      <div className="relative w-fit">
        <Headline
          lines={aboutPage.cta.heading}
          className="text-[clamp(28px,2.6vw,38px)] tracking-[-0.04em] text-[#fdf3ea]"
        />
      </div>
      <span className="hidden h-20 w-px bg-white/25 md:block" aria-hidden />
      <p className="relative max-w-[420px] text-[16px] leading-[1.55] text-[#fdf3ea]/85 md:text-[17px]">
        {aboutPage.cta.text}
      </p>
      <motion.a
        href="/#contact"
        className="group relative inline-flex w-fit items-center gap-2.5 rounded-2xl bg-[#fffaf5] px-6 py-4 text-[17px] font-bold text-espresso shadow-[0_16px_30px_-16px_rgba(0,0,0,0.6)] md:text-[17px]"
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.96 }}
        transition={spring}
      >
        <MailIcon size={21} strokeWidth={1.9} aria-hidden />
        Say hello
        <ArrowUpRight
          width={18}
          height={18}
          strokeWidth={2.2}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </motion.a>
    </motion.section>
  );
}
