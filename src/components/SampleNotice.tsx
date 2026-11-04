"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SAMPLE } from "@/content";
import { spring } from "@/lib/motion";
import { Close } from "./icons";

export function SampleNotice() {
  const [shown, setShown] = useState(true);
  if (!SAMPLE) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[55] flex justify-center md:bottom-6">
      <AnimatePresence>
        {shown && (
          <motion.div
            className="pointer-events-auto flex items-center gap-2 rounded-full bg-ink py-1.5 pr-1.5 pl-3 text-[11.5px] font-semibold text-white shadow-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12, transition: { duration: 0.05358 } }}
            transition={{ ...spring, delay: 0.28573 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-butter" />
            Sample content
            <button
              type="button"
              onClick={() => setShown(false)}
              aria-label="Hide notice"
              className="grid h-5 w-5 place-items-center rounded-full bg-white/15 hover:bg-white/25"
            >
              <Close width={10} height={10} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
