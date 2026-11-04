"use client";

import { Flag, Inbox, MousePointer2, Users } from "lucide-react";
import { AnimatePresence, animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import type { CaseStudy } from "@/content";
import { useLoopStep } from "@/lib/hooks";
import { spring, springBouncy, springSnappy } from "@/lib/motion";
import { Check } from "./icons";

export function Demo({ kind }: { kind: CaseStudy["demo"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });

  const tall = kind === "guidance" || kind === "money";
  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden rounded-2xl border border-line bg-[#f1ede4] text-ink sm:aspect-[4/3] lg:aspect-[16/9] ${
        tall ? "aspect-[3/4]" : "aspect-[5/6]"
      }`}
    >
      {kind === "guidance" && <GuidanceDemo active={inView} />}
      {kind === "money" && <MoneyDemo active={inView} />}
      {kind === "simulation" && <SimulationDemo active={inView} />}
      {kind === "pipeline" && <PipelineDemo active={inView} />}
    </div>
  );
}

function Window({ title, short, children }: { title: string; short: string; children: ReactNode }) {
  return (
    <div className="absolute inset-[4%] flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5 md:inset-[5%]">
      <div className="flex shrink-0 items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff6b5e]" />
        <span className="h-2 w-2 rounded-full bg-[#ffc24a]" />
        <span className="h-2 w-2 rounded-full bg-[#4fd07c]" />
        <span className="ml-2 text-[10.5px] font-semibold text-ink-soft md:text-[11px]">
          <span className="sm:hidden">{short}</span>
          <span className="hidden sm:inline">{title}</span>
        </span>
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  );
}

const MOMENTS = [
  { name: "Onboarding", tip: "Pick your language. You can listen to any page." },
  { name: "Home", tip: "Start with one small goal this week." },
  { name: "Goals", tip: "Rs. 20 a day becomes Rs. 600 a month." },
  { name: "Borrow", tip: "See the EMI first, then check eligibility." },
  { name: "Rewards", tip: "Cashback is a bonus. Savings stay separate." },
  { name: "Health", tip: "Your score went up. Here's what helped." },
  { name: "Trust", tip: "See who can read your data, and change it." },
];
const LANGS = ["EN", "हिं", "తె"];

function GuidanceDemo({ active }: { active: boolean }) {
  const step = useLoopStep(MOMENTS.length, 2000, active);
  const m = MOMENTS[step];
  return (
    <Window title="Saathi · guidance at real decision points" short="Saathi · guidance layer">
      <div className="grid h-full grid-cols-[47%_1fr] gap-3 p-3 md:grid-cols-[44%_1fr] md:gap-5 md:p-5">
        <div className="relative flex items-center justify-center">
          <div className="relative flex aspect-[9/17] h-full max-h-[420px] w-auto max-w-full flex-col overflow-hidden rounded-[18px] border-[3px] border-ink bg-[#faf7ff] p-2 md:rounded-[20px] md:border-4 md:p-2.5">
            <div className="flex items-center gap-1 text-[10px] font-extrabold text-[#9b4fd6] md:text-[11px]">
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#e1559b] to-[#7b6cf2] md:h-3 md:w-3" />
              saathi
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={m.name}
                className="mt-2 md:mt-3"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.07857 }}
              >
                <div className="text-[12px] font-bold md:text-[13px]">{m.name}</div>
                <div className="mt-1.5 space-y-1">
                  <div className="h-2 w-[85%] rounded bg-[#e9e2f7]" />
                  <div className="h-2 w-[60%] rounded bg-[#e9e2f7]" />
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-2 rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-[#eee6fb] md:mt-3 md:p-2">
              <div className="flex items-baseline justify-between gap-1 text-[9.5px] font-bold md:text-[10px]">
                <span>Goal</span>
                <span className="text-[#9b4fd6]">Rs. {(600 + step * 300).toLocaleString("en-IN")}</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#efe8fb]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#9b4fd6] to-[#e1559b]"
                  initial={false}
                  animate={{ width: `${18 + step * 11}%` }}
                  transition={spring}
                />
              </div>
            </div>
            {step === 0 && (
              <div className="mt-2 flex gap-1">
                {LANGS.map((l, i) => (
                  <motion.span
                    key={l}
                    className="rounded-full px-1.5 py-0.5 text-[9.5px] font-semibold ring-1 ring-[#c9b8ef]"
                    animate={{ background: i === 1 ? "#9b4fd6" : "#ffffff", color: i === 1 ? "#ffffff" : "#1c1b18" }}
                    transition={{ delay: 0.17858 }}
                  >
                    {l}
                  </motion.span>
                ))}
              </div>
            )}
            <AnimatePresence mode="wait">
              <motion.div
                key={m.tip}
                className="absolute inset-x-2 bottom-8 rounded-xl bg-gradient-to-br from-[#9b4fd6] to-[#e1559b] p-2 text-[10px] leading-snug font-semibold text-white shadow-lg md:inset-x-2.5 md:bottom-10 md:p-2.5 md:text-[10.5px]"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.95, transition: { duration: 0.04286 } }}
                transition={{ ...springSnappy, delay: 0.08928 }}
              >
                {m.tip}
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-x-2 bottom-2 h-4 rounded-full bg-gradient-to-r from-[#9b4fd6] to-[#e1559b] md:inset-x-2.5 md:bottom-2.5 md:h-5" />
          </div>
        </div>
        <div className="flex min-w-0 flex-col justify-center gap-1 md:gap-1.5">
          {MOMENTS.map((x, i) => {
            const on = i === step;
            const done = i < step;
            return (
              <div key={x.name} className="relative flex items-center gap-2 rounded-lg px-2 py-1 md:gap-2.5 md:px-2.5">
                {on && (
                  <motion.span
                    layoutId="saathi-moment"
                    className="absolute inset-0 z-0 rounded-lg bg-[#f1e8ff]"
                    transition={spring}
                  />
                )}
                <span
                  className={`relative z-[1] grid h-4 w-4 shrink-0 place-items-center rounded-full md:h-5 md:w-5 ${
                    done || on ? "bg-[#9b4fd6] text-white" : "ring-1 ring-ink/20"
                  }`}
                >
                  {done && <Check width={10} height={10} strokeWidth={3} />}
                </span>
                <span
                  className={`relative z-[1] text-[11.5px] font-semibold md:text-[13px] ${on ? "text-[#6b2fb0]" : done ? "text-ink-soft" : ""}`}
                >
                  {x.name}
                </span>
                {on && (
                  <motion.span
                    className="relative z-[1] ml-auto hidden rounded bg-white px-1.5 py-0.5 text-[10px] font-bold text-[#9b4fd6] shadow-sm lg:block"
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={springSnappy}
                  >
                    Guidance shown
                  </motion.span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Window>
  );
}

const MONTH = [
  { label: "Salary", amount: "+82,000", tone: "good" },
  { label: "Rent", amount: "−25,000", tone: "" },
  { label: "Card bill", amount: "−22,000", tone: "" },
  { label: "SIP", amount: "−14,000", tone: "" },
  { label: "Streaming", amount: "−500", tone: "flag" },
];

function MoneyDemo({ active }: { active: boolean }) {
  const step = useLoopStep(6, 1600, active);
  const worth = useMotionValue(0);
  const shown = useTransform(worth, (v) => Math.round(v).toLocaleString("en-IN"));
  useEffect(() => {
    if (!active) return;
    if (step === 0) {
      worth.set(0);
      const c = animate(worth, 382000, { duration: 0.42857, ease: [0.22, 0.61, 0.36, 1] });
      return () => c.stop();
    }
  }, [step, active, worth]);
  return (
    <Window title="Batua · net worth to safe action" short="Batua · money clarity">
      <div className="grid h-full grid-rows-[auto_1fr] gap-2.5 p-3 sm:grid-cols-[52%_1fr] sm:grid-rows-1 md:gap-5 md:p-5">
        <div className="flex min-w-0 flex-col justify-center gap-2 md:gap-3">
          <div className="rounded-xl bg-[#faf7f2] p-2.5 ring-1 ring-black/5 md:p-3.5">
            <div className="text-[10px] font-semibold text-ink-soft md:text-[11px]">Net worth</div>
            <div className="display text-[22px] tabular-nums md:text-[30px]">
              Rs. <motion.span>{shown}</motion.span>
            </div>
            <svg viewBox="0 0 200 40" className="mt-1 hidden w-full sm:block" fill="none" aria-hidden>
              <motion.path
                d="M2 32C24 30 34 18 52 22s26 10 44 2 30-14 48-8 30 6 54-6"
                stroke="#93441a"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={false}
                animate={{ pathLength: step === 0 ? 0.05 : 1 }}
                transition={{ duration: step === 0 ? 0.2 : 1, ease: "easeOut" }}
              />
            </svg>
          </div>
          <div className="relative flex items-center justify-between rounded-xl bg-[#faf7f2] p-2.5 ring-1 ring-black/5 md:p-3.5">
            <div>
              <div className="text-[10px] font-semibold text-ink-soft md:text-[11px]">Safe to spend</div>
              <div className="display text-[17px] md:text-[22px]">Rs. 1,200/day</div>
            </div>
            <motion.span
              className="rounded-full bg-ink px-2.5 py-1 text-[10.5px] font-bold text-white md:px-3 md:text-[12px]"
              animate={step === 2 ? { scale: [1, 0.88, 1] } : { scale: 1 }}
              transition={{ duration: 0.10714 }}
            >
              Why
            </motion.span>
            <AnimatePresence>
              {step >= 2 && step <= 3 && (
                <>
                  <motion.div
                    className="absolute inset-0 z-10 grid place-items-center rounded-xl bg-ink px-3 text-center text-[11px] leading-snug font-semibold text-white sm:hidden"
                    initial={{ opacity: 0, rotateX: -70 }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    exit={{ opacity: 0, rotateX: 70, transition: { duration: 0.05358 } }}
                    transition={springSnappy}
                  >
                    Rent, a card bill and your SIP are due before payday.
                  </motion.div>
                  <motion.div
                    className="absolute right-1 bottom-[calc(100%+6px)] z-10 hidden w-[86%] rounded-xl bg-ink p-2 text-[10.5px] leading-snug text-white shadow-lg sm:block md:p-2.5 md:text-[11px]"
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, transition: { duration: 0.05358 } }}
                    transition={springSnappy}
                  >
                    Rent, a card bill and your SIP are due before payday.
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex min-w-0 flex-col justify-center">
          <div className="mb-1.5 hidden text-[10px] font-bold tracking-wide text-ink-soft uppercase sm:block md:mb-2 md:text-[10.5px]">
            This month
          </div>
          <div className="space-y-1 md:space-y-1.5">
            {MONTH.map((r, i) => (
              <motion.div
                key={r.label}
                className={`flex items-center justify-between rounded-lg px-2.5 py-[3px] text-[11px] sm:py-1 md:py-1.5 md:text-[12.5px] ${
                  r.tone === "flag" && step >= 4 ? "bg-[#ffe9e3] ring-1 ring-[#ffb3a1]" : "bg-[#faf7f2]"
                }`}
                initial={false}
                animate={{ opacity: step >= 1 ? 1 : 0.25, x: step >= 1 ? 0 : 8 }}
                transition={{ ...spring, delay: step === 1 ? i * 0.04 : 0 }}
              >
                <span className="font-semibold">{r.label}</span>
                <span className={`tabular-nums ${r.tone === "good" ? "font-bold text-[#12a05c]" : ""}`}>
                  {r.amount}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="mt-1.5 h-5 md:mt-2">
            <AnimatePresence>
              {step >= 4 && (
                <motion.div
                  className="w-fit rounded-md bg-hot px-2 py-0.5 text-[10.5px] font-bold text-white md:text-[11px]"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={springBouncy}
                >
                  Unused for 41 days. Pause it?
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Window>
  );
}

const OPTIONS = ["Send a rough draft now", "Ask which markets matter most", "Wait for complete data"];
const SCORES = [
  { label: "Clarity", v: 4 },
  { label: "Priorities", v: 5 },
  { label: "People", v: 4 },
];

function SimulationDemo({ active }: { active: boolean }) {
  const step = useLoopStep(6, 1600, active);
  return (
    <Window title="CorpSim · Day 2 of 5 · Market expansion analyst" short="CorpSim · Day 2 of 5">
      <div className="grid h-full grid-cols-[13%_1fr] md:grid-cols-[10%_1fr]">
        <div className="flex flex-col items-center gap-3 bg-[#0f1b3d] pt-3 text-white/70 md:pt-4">
          <span className="relative grid h-7 w-7 place-items-center rounded-md bg-white/15 text-white md:h-8 md:w-8">
            <Inbox className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden />
            <AnimatePresence>
              {step === 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-hot"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={springBouncy}
                />
              )}
            </AnimatePresence>
          </span>
          <span className="grid h-7 w-7 place-items-center rounded-md md:h-8 md:w-8">
            <Users className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden />
          </span>
        </div>
        <div className="relative flex min-w-0 flex-col gap-2 p-3 md:gap-2.5 md:p-4">
          <div className="rounded-xl bg-[#f4f6fb] p-2.5 ring-1 ring-[#dfe5f3] md:p-3">
            <div className="flex items-center justify-between text-[10px] text-ink-soft md:text-[11px]">
              <span className="font-bold text-ink">Head of Sales</span>
              <span>9:42 AM</span>
            </div>
            <div className="mt-0.5 text-[12px] font-bold md:text-[13px]">Singapore pricing by 4pm?</div>
            <div className="text-[10.5px] leading-snug text-ink-soft md:text-[11.5px]">
              Leadership wants a first cut before the review.
            </div>
          </div>
          <div className="grid gap-1.5">
            {OPTIONS.map((o, i) => {
              const picked = step >= 2 && i === 1;
              return (
                <motion.div
                  key={o}
                  className={`relative rounded-lg px-2.5 py-1.5 text-[11px] font-semibold ring-1 md:px-3 md:text-[12px] ${
                    picked ? "bg-[#1f4fe0] text-white ring-[#1f4fe0]" : "bg-white ring-black/10"
                  }`}
                  initial={false}
                  animate={{ opacity: step >= 1 ? (step >= 3 && !picked ? 0.35 : 1) : 0.3, y: step >= 1 ? 0 : 4 }}
                  transition={{ ...spring, delay: step === 1 ? i * 0.04 : 0 }}
                >
                  {o}
                  {i === 1 && step === 2 && (
                    <motion.span
                      className="absolute right-3 -bottom-2 text-ink"
                      initial={{ x: 24, y: 14, opacity: 0 }}
                      animate={{ x: 0, y: 0, opacity: 1 }}
                      transition={springSnappy}
                    >
                      <MousePointer2 className="h-4 w-4 fill-white" aria-hidden />
                    </motion.span>
                  )}
                </motion.div>
              );
            })}
          </div>
          <AnimatePresence>
            {step >= 3 && (
              <motion.div
                className="mt-auto rounded-xl bg-[#0f1b3d] p-2.5 text-white shadow-xl md:p-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10, transition: { duration: 0.05358 } }}
                transition={spring}
              >
                <div className="text-[11px] font-bold md:text-[12px]">Good call: you clarified scope first.</div>
                <div className="mt-2 grid grid-cols-3 gap-2 md:gap-3">
                  {SCORES.map((s, i) => (
                    <div key={s.label} className="min-w-0">
                      <div className="truncate text-[9.5px] text-white/70 md:text-[10px]">{s.label}</div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/15">
                        <motion.div
                          className="h-full rounded-full bg-[#5b8cff]"
                          initial={{ width: 0 }}
                          animate={{ width: `${s.v * 20}%` }}
                          transition={{ ...spring, delay: 0.07144 + i * 0.05 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Window>
  );
}

const STAGES = ["Ingest", "Validate", "Investigate", "Resolve"];
const FLAGS = ["Missing values", "Threshold exceptions", "Schema conflicts"];

function PipelineDemo({ active }: { active: boolean }) {
  const step = useLoopStep(7, 1300, active);
  const count = useMotionValue(0);
  const label = useTransform(count, (v) => (v >= 18 ? "18M+" : `${v.toFixed(1)}M`));
  useEffect(() => {
    if (!active) return;
    if (step === 0) {
      count.set(0);
      const c = animate(count, 18, { duration: 0.57143, ease: "easeOut" });
      return () => c.stop();
    }
  }, [step, active, count]);
  const routed = step >= 5;
  return (
    <Window title="Customer-data workflow · anonymised" short="Data workflow · anonymised">
      <div className="flex h-full flex-col justify-between gap-3 p-3 md:p-5">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <div className="text-[10px] font-semibold text-ink-soft md:text-[11px]">Records checked</div>
            <motion.div className="display text-[26px] tabular-nums md:text-[34px]">{label}</motion.div>
          </div>
          <div className="h-6">
            <AnimatePresence>
              {step >= 6 && (
                <motion.span
                  className="block rounded-md bg-mint px-2 py-1 text-[10.5px] font-bold text-[#126b3a] md:px-2.5 md:text-[12.5px]"
                  initial={{ opacity: 0, scale: 0.7, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={springBouncy}
                >
                  28% faster resolution
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="relative">
          <div className="absolute top-[14px] right-[12%] left-[12%] h-[2px] bg-line md:top-[18px]" />
          {active &&
            [0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute top-[11px] h-2 w-2 rounded-full bg-brand md:top-[15px]"
                initial={{ left: "12%", opacity: 0 }}
                animate={{ left: ["12%", "88%"], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.71429, repeat: Infinity, delay: i * 0.4, ease: "linear" }}
              />
            ))}
          <div className="relative grid grid-cols-4">
            {STAGES.map((s, i) => (
              <div key={s} className="flex flex-col items-center gap-1">
                <motion.span
                  className="grid h-7 w-7 place-items-center rounded-full bg-white text-[11px] font-bold ring-2 ring-brand md:h-9 md:w-9 md:text-[12px]"
                  animate={i === 1 && step >= 1 && step <= 4 ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                  transition={{ duration: 0.17858 }}
                >
                  {i + 1}
                </motion.span>
                <span className="text-[10px] font-semibold md:text-[11.5px]">{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-1.5 sm:ml-[25%] sm:w-1/2 md:gap-2">
          {FLAGS.map((f, i) => (
            <div key={f} className="h-[26px] rounded-lg border border-dashed border-ink/10 md:h-[30px]">
              <AnimatePresence>
                {step >= i + 2 && (
                  <motion.div
                    className="flex h-full items-center justify-between gap-1 rounded-lg bg-[#fff4e5] px-2.5 text-[11px] font-semibold ring-1 ring-[#ffd59a] md:text-[11.5px]"
                    initial={{ opacity: 0, y: -8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1, x: routed ? 10 : 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.04286 } }}
                    transition={spring}
                  >
                    <span className="min-w-0">{f}</span>
                    <span className="flex shrink-0 items-center gap-0.5 rounded bg-[#ff9f1c] px-1.5 py-0.5 text-[9.5px] font-bold text-white md:text-[10px]">
                      <Flag className="h-2.5 w-2.5" aria-hidden />
                      {routed ? "Review" : "Flag"}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </Window>
  );
}
