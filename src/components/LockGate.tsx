"use client";

import { motion, useAnimationControls } from "motion/react";
import { useState, type FormEvent, type ReactNode } from "react";
import { profile, samplePassword } from "@/content";
import { springBouncy, springSoft } from "@/lib/motion";

export function LockGate({ title, children }: { title: string; children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);
  const shake = useAnimationControls();

  if (unlocked) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.17858 }}
      >
        {children}
      </motion.div>
    );
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value === samplePassword) {
      setUnlocked(true);
      return;
    }
    setWrong(true);
    void shake.start({ x: [0, -10, 9, -6, 4, 0], transition: { duration: 0.14285 } });
  };

  const step = (i: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { ...springSoft, delay: 0.05358 + i * 0.06 },
  });

  return (
    <div className="grid min-h-[520px] place-items-center py-8">
      <motion.div
        animate={shake}
        className="w-full max-w-[340px] rounded-[26px] bg-white p-8 text-center shadow-[0_14px_44px_rgba(0,0,0,0.08)] ring-1 ring-black/5"
      >
        <motion.svg width="110" height="120" viewBox="0 0 110 120" className="mx-auto" {...step(0)} aria-hidden>
          <motion.path
            d="M33 54V38a22 22 0 0 1 44 0v16"
            fill="none"
            stroke="#93441a"
            strokeWidth="7"
            strokeLinecap="round"
            initial={{ y: -8 }}
            animate={{ y: 0 }}
            transition={{ ...springBouncy, delay: 0.17858 }}
          />
          <rect x="17" y="52" width="76" height="62" rx="16" fill="#f6f1e8" stroke="#e8e0d1" strokeWidth="2" />
          <circle cx="42" cy="76" r="4.500" fill="#1c1b18" />
          <circle cx="68" cy="76" r="4.500" fill="#1c1b18" />
          <rect x="52" y="88" width="6" height="12" rx="3" fill="#1c1b18" />
        </motion.svg>
        <motion.h1 className="display mt-4 text-[34px] text-brand" {...step(1)}>
          This one&rsquo;s under wraps.
        </motion.h1>
        <motion.p className="mt-2 text-[13px] leading-snug text-ink-soft" {...step(2)}>
          <span className="font-semibold text-ink">{title}</span> covers confidential work and needs a passcode.
        </motion.p>
        <motion.form onSubmit={onSubmit} className="mt-5 space-y-2" {...step(3)}>
          <input
            type="password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setWrong(false);
            }}
            placeholder="Enter passcode"
            aria-label="Passcode"
            aria-invalid={wrong}
            className={`w-full rounded-xl bg-white px-3.5 py-2.5 text-[16px] ring-1 outline-none focus:ring-2 md:text-[14px] ${wrong ? "ring-hot" : "ring-black/15 focus:ring-brand"}`}
          />
          <motion.button
            type="submit"
            className="w-full rounded-xl bg-brand py-2.5 text-[14px] font-bold text-white"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            Unlock
          </motion.button>
          <p className="min-h-[16px] text-[12px] text-hot" role="status">
            {wrong ? "That passcode didn't match." : ""}
          </p>
        </motion.form>
        <motion.p className="text-[12px] text-ink-soft" {...step(4)}>
          No passcode?{" "}
          <a href={`mailto:${profile.email}`} className="font-semibold text-brand underline">
            Ask me for it
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}
