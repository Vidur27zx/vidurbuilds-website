"use client";

import Image from "next/image";
import { CalendarDays, FileText, Mail as MailIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { letter, profile, socials, working } from "@/content";
import { easeRise, seen, spring, springBouncy, springDrop } from "@/lib/motion";
import { ArrowUpRight, LinkedInSquare } from "./icons";
import { Eyebrow, Framed, Headline, IconTile, Rise, Sparks, useTilt } from "./kit";
import { useMagnet } from "./ui";

export function WorkingWithMe() {
  return (
    <section className="panel relative mt-14 overflow-hidden px-5 pt-8 pb-8 md:mt-14 md:px-8 md:pt-10 md:pb-10">
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[560px] w-[760px] rounded-[50%] bg-[#f6e2d5]/80"
        initial={{ scale: 0.85, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={seen}
        transition={{ duration: 0.42857, ease: easeRise }}
      />
      <div className="relative grid items-start gap-7 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-10">
        <div>
          <Eyebrow>{working.eyebrow}</Eyebrow>
          <div className="relative mt-4 w-fit md:mt-5">
            <Headline lines={working.heading} className="text-[clamp(28px,2.8vw,40px)] text-[#6a2e16]" />
          </div>
          <Rise
            as="p"
            delay={0.06}
            className="mt-5 max-w-[460px] text-[16px] leading-[1.5] text-ink-soft md:text-[17px]"
          >
            {working.sub}
          </Rise>
          <motion.div
            className="relative mx-auto mt-10 w-[min(100%,300px)] lg:mx-0 lg:mt-14 lg:ml-[14%]"
            initial={{ opacity: 0, y: 40, rotate: 6 }}
            whileInView={{ opacity: 1, y: 0, rotate: -4 }}
            viewport={seen}
            whileHover={{ rotate: -1, scale: 1.03 }}
            transition={springDrop}
          >
            <Framed
              src={profile.headshot}
              alt={profile.name}
              aspect="1"
              sizes="300px"
              focus="50% 30%"
              className="group !rounded-[30px] !p-[10px] [&>.frame-in]:!rounded-[22px]"
            />
          </motion.div>
        </div>

        <div className="grid content-start gap-4 sm:grid-cols-2 md:gap-3">
          {working.traits.map((t, i) => (
            <TraitCard key={t.id} t={t} i={i} />
          ))}
        </div>
      </div>

      <motion.div
        className="relative mx-auto mt-7 flex max-w-[1060px] flex-col items-start gap-3 rounded-[28px] bg-gradient-to-r from-[#e9edd3] to-[#e3e8ca] px-6 py-5 shadow-[0_24px_44px_-30px_rgba(80,90,40,0.6)] ring-1 ring-white/70 sm:flex-row sm:items-center sm:gap-6 sm:rounded-full sm:px-10 md:mt-7"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={seen}
        transition={{ duration: 0.26786, ease: easeRise, delay: 0.03571 }}
      >
        <span className="flex items-center gap-5">
          <Bullseye />
          <span className="hidden h-10 w-px bg-ink/20 sm:block" aria-hidden />
          <span className="display text-[24px] tracking-[-0.03em] whitespace-nowrap text-ink md:text-[24px]">
            In short
          </span>
        </span>
        <p className="text-[16px] text-ink-soft italic md:text-[17px]">{working.short}</p>
      </motion.div>
    </section>
  );
}

type Trait = (typeof working.traits)[number];

function TraitCard({ t, i }: { t: Trait; i: number }) {
  const tilt = useTilt(3);
  return (
    <motion.article
      {...tilt}
      className={`glass-rim group relative flex flex-col rounded-[26px] p-5 md:p-5 ${
        t.tone === "peach"
          ? "bg-gradient-to-br from-[#f7dccb] to-[#edc7ae] shadow-[0_26px_50px_-30px_rgba(150,70,30,0.55)]"
          : "bg-gradient-to-br from-[#fdf0e6] to-[#fae9dc] shadow-[0_20px_40px_-30px_rgba(74,36,18,0.45)]"
      } ring-1 ring-white/80`}
      initial={{ opacity: 0, y: 34, rotate: i % 2 ? 2 : -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={seen}
      whileHover={{ y: -6 }}
      transition={{ ...spring, delay: 0.03571 + i * 0.05 }}
    >
      <motion.span
        className="inline-flex w-fit"
        initial={{ scale: 0.3, rotate: -40 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={seen}
        transition={{ ...springBouncy, delay: 0.10714 + i * 0.05 }}
      >
        <span className="inline-flex transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-[10deg] group-hover:scale-110">
          <IconTile icon={t.icon} tone={t.tone === "peach" ? "terracotta" : "peach"} size={44} />
        </span>
      </motion.span>
      <h3 className="display mt-4 text-[21px] tracking-[-0.03em] text-ink md:mt-4 md:text-[23px]">{t.title}</h3>
      <p className="mt-3 text-[16px] leading-[1.5] text-ink-soft md:text-[17px] lg:text-[17px] lg:leading-[1.4]">
        {t.text}
      </p>
    </motion.article>
  );
}

function Bullseye() {
  return (
    <motion.svg
      viewBox="0 0 40 40"
      width={44}
      height={44}
      fill="none"
      aria-hidden
      className="shrink-0 text-[#5d6844]"
      initial="hidden"
      whileInView="show"
      viewport={seen}
    >
      <motion.g
        variants={{
          hidden: { scale: 1 },
          show: { scale: [1, 0.86, 1.04, 1], transition: { delay: 0.33929, duration: 0.16072 } },
        }}
        style={{ transformOrigin: "18px 22px" }}
        stroke="currentColor"
        strokeWidth="2.6"
      >
        <circle cx="18" cy="22" r="14" />
        <circle cx="18" cy="22" r="8.5" />
        <circle cx="18" cy="22" r="3" fill="currentColor" />
      </motion.g>
      <motion.g
        variants={{
          hidden: { x: 16, y: -16, opacity: 0 },
          show: { x: 0, y: 0, opacity: 1, transition: { delay: 0.21429, duration: 0.13571, ease: [0.5, 0, 0.9, 0.6] } },
        }}
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21 33 7" />
        <path d="M28 6h6v6" />
      </motion.g>
    </motion.svg>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative mt-12 md:mt-14 lg:px-7">
      <Eyebrow className="!text-[#8a4b2c]">{letter.eyebrow}</Eyebrow>
      <div className="relative mt-4 w-fit md:mt-5">
        <Headline lines={letter.heading} className="text-[clamp(28px,2.8vw,40px)] text-[#3d1706]" />
      </div>
      <Rise
        as="p"
        delay={0.06}
        className="mt-5 max-w-[960px] text-[16px] leading-[1.5] text-ink-soft md:text-[17px] lg:text-[17px]"
      >
        {letter.sub}
      </Rise>

      <div className="mt-8 grid items-start gap-10 md:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-10">
        <Letter />
        <ReachOut />
      </div>
    </section>
  );
}

const WORD_GAP = 0.045;

function Letter() {
  const reduced = useReducedMotion();
  const paragraphs = [letter.greeting, ...letter.lines];
  let n = 0;
  const startOf = paragraphs.map((p) => {
    const at = n;
    n += p.split(" ").length + 3;
    return at;
  });
  const done = n * WORD_GAP + 0.6;

  return (
    <div className="relative mx-auto w-full max-w-[640px] pt-8 pl-3 sm:pl-6 lg:mx-0">
      <motion.span
        aria-hidden
        className="absolute top-[86px] right-[18px] bottom-[-26px] left-0 rounded-[30px] bg-gradient-to-br from-[#c88d66] to-[#9b5a35] shadow-[0_30px_50px_-28px_rgba(90,40,15,0.8)]"
        initial={{ opacity: 0, rotate: -2 }}
        whileInView={{ opacity: 1, rotate: -5 }}
        viewport={seen}
        transition={{ ...spring, delay: 0.08928 }}
      />
      <motion.div
        className="glass-rim relative rounded-[28px] bg-[#fdf2e5] px-6 pt-7 pb-6 shadow-[0_34px_60px_-32px_rgba(74,36,18,0.55),inset_0_1px_0_rgba(255,255,255,0.9)] sm:px-8 sm:pt-8"
        style={{
          backgroundImage:
            "radial-gradient(120% 80% at 20% 0%, rgba(255,255,255,0.7), transparent 60%), radial-gradient(rgba(140,90,60,0.05) 1px, transparent 1px)",
          backgroundSize: "auto, 5px 5px",
        }}
        initial={{ opacity: 0, y: 46, rotate: -9 }}
        whileInView={{ opacity: 1, y: 0, rotate: -3 }}
        viewport={seen}
        transition={springDrop}
      >
        <Paperclip />
        <div className="font-sans text-[16px] leading-[1.7] text-[#3f342e] sm:text-[17px] lg:text-[18px]">
          {paragraphs.map((p, i) => (
            <p key={i} className={i ? "mt-4" : "mb-1"}>
              <Written text={p} start={0.35 + startOf[i] * WORD_GAP} reduced={!!reduced} />
            </p>
          ))}
          <p className="mt-6">
            <Written text={letter.signoff[0]} start={done} reduced={!!reduced} />
          </p>
          <div className="relative mt-1 w-fit">
            <motion.p
              className="font-hand text-[38px] leading-none text-brand sm:text-[44px]"
              initial={reduced ? false : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0 -10% 0 0)" }}
              viewport={seen}
              transition={reduced ? { duration: 0 } : { duration: 0.4, delay: done + 0.3, ease: "easeOut" }}
            >
              {letter.signoff[1]}
            </motion.p>
            <svg
              viewBox="0 0 120 20"
              className="absolute -bottom-4 -left-2 h-5 w-[118px] text-brand"
              fill="none"
              aria-hidden
            >
              <motion.path
                d="M3 14c20-3 50-9 76-9 14 0 26 1 37-3"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                initial={reduced ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={seen}
                transition={reduced ? { duration: 0 } : { duration: 0.21429, delay: done + 0.9, ease: "easeInOut" }}
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Written({ text, start, reduced }: { text: string; start: number; reduced: boolean }) {
  if (reduced) return <>{text}</>;
  return (
    <span aria-label={text}>
      {text.split(" ").map((w, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block"
          initial={{ clipPath: "inset(-20% 100% -20% -8%)" }}
          whileInView={{ clipPath: "inset(-20% -8% -20% -8%)" }}
          viewport={seen}
          transition={{ duration: 0.13, delay: start + i * WORD_GAP, ease: "linear" }}
        >
          {w}
          {" "}
        </motion.span>
      ))}
    </span>
  );
}

function Paperclip() {
  return (
    <motion.svg
      viewBox="0 0 40 100"
      className="absolute -top-12 right-[12%] h-[96px] w-[38px] text-[#9d5a33] drop-shadow-[0_4px_4px_rgba(74,36,18,0.25)]"
      fill="none"
      aria-hidden
      initial={{ opacity: 0, y: -40, rotate: 40 }}
      whileInView={{ opacity: 1, y: 0, rotate: 14 }}
      viewport={seen}
      transition={{ ...springBouncy, delay: 0.19642 }}
    >
      <path
        d="M27 60V20a9 9 0 0 0-18 0v52a13 13 0 0 0 26 0V30"
        stroke="currentColor"
        strokeWidth="4.2"
        strokeLinecap="round"
      />
      <path d="M18 64V24" stroke="currentColor" strokeWidth="4.2" strokeLinecap="round" />
    </motion.svg>
  );
}

function ReachOut() {
  const magnet = useMagnet(0.1);
  const tile =
    "glass-rim group flex h-[88px] flex-col items-center justify-center gap-2.5 rounded-[20px] bg-gradient-to-b from-[#f8e7da] to-[#f3dccb] px-3 text-[15px] font-semibold text-[#4d1f0a] shadow-[0_18px_30px_-22px_rgba(74,36,18,0.6)] ring-1 ring-white/70 md:h-[96px] md:text-[17px]";
  const icon =
    "inline-flex transition-transform duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1 group-hover:scale-110";

  return (
    <div className="lg:pt-6">
      <div className="flex items-center gap-6 md:gap-8">
        <div className="relative">
          <Sparks className="absolute -top-8 -left-8 rotate-[-75deg]" size={46} delay={0.25} />
          <motion.span
            className="relative block h-[130px] w-[130px] overflow-hidden rounded-full shadow-[0_24px_40px_-20px_rgba(74,36,18,0.6)] ring-[8px] ring-[#fdf6ee] md:h-[144px] md:w-[144px]"
            initial={{ opacity: 0, scale: 0.6, rotate: -14 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={seen}
            whileHover={{ scale: 1.05, rotate: -3 }}
            transition={{ ...springBouncy, delay: 0.07144 }}
          >
            <Image
              src={profile.headshot}
              alt={profile.name}
              fill
              sizes="190px"
              className="object-cover object-[50%_30%]"
            />
          </motion.span>
        </div>
        <Rise delay={0.15} className="min-w-0">
          <p className="display text-[34px] text-ink md:text-[42px]">{letter.card.name}</p>
          <p className="mt-2 flex flex-wrap gap-x-2 text-[17px] text-ink-soft md:text-[17px]">
            {letter.card.tags.map((t, i) => (
              <span key={t} className="inline-flex items-center gap-2">
                {i > 0 && <span className="text-ink/40">·</span>}
                {t}
              </span>
            ))}
          </p>
        </Rise>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-[1fr_1fr_1.7fr] md:mt-7 md:gap-3">
        {[
          { label: "LinkedIn", href: socials[0].href, icon: <LinkedInSquare width={34} height={34} /> },
          { label: "Resume", href: profile.resumeUrl, icon: <FileText size={34} strokeWidth={1.7} /> },
        ].map((l, i) => (
          <motion.a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className={tile}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={seen}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            transition={{ ...spring, delay: 0.12501 + i * 0.04 }}
          >
            <span className={icon}>{l.icon}</span>
            {l.label}
          </motion.a>
        ))}
        <motion.a
          href={`mailto:${profile.email}`}
          aria-label={`Email ${profile.email}`}
          className={`${tile} col-span-2 sm:col-span-1`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={seen}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.97 }}
          transition={{ ...spring, delay: 0.18214 }}
        >
          <span className={icon}><MailIcon size={34} strokeWidth={1.7} /></span>
          <span className="break-all">{profile.email}</span>
        </motion.a>
      </div>

      <motion.div
        className="mt-6 md:mt-7"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={seen}
        transition={{ ...spring, delay: 0.21429 }}
      >
        <motion.a
          href={profile.bookingUrl}
          target="_blank"
          rel="noreferrer"
          {...magnet}
          className="glass-rim group relative flex items-center gap-5 overflow-hidden rounded-[22px] bg-gradient-to-r from-[#925838] via-[#7e4425] to-[#6c3519] p-4 text-[#fdf3ea] shadow-[0_30px_50px_-26px_rgba(90,40,15,0.85)] md:gap-7 md:p-5"
          whileTap={{ scale: 0.985 }}
          transition={spring}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[420%]"
          />
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-[16px] bg-gradient-to-b from-[#d9ad8f] to-[#c0896a] text-[#fdf3ea] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] md:h-[60px] md:w-[60px]">
            <CalendarDays
              size={34}
              strokeWidth={1.7}
              className="transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-[8deg] group-hover:scale-110"
            />
          </span>
          <span className="h-14 w-px shrink-0 bg-white/25" aria-hidden />
          <span className="min-w-0 flex-1">
            <span className="display block text-[24px] tracking-[-0.03em] md:text-[25px]">{letter.chat.title}</span>
            <span className="mt-1 block text-[15px] text-[#fdf3ea]/85 md:text-[17px]">{letter.chat.text}</span>
          </span>
          <ArrowUpRight
            width={30}
            height={30}
            strokeWidth={2}
            className="mr-2 shrink-0 transition-transform duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </motion.a>
      </motion.div>
    </div>
  );
}
