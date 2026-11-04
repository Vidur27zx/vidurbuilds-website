"use client";

import { Children, useRef, useState, type ReactNode, type RefObject } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";

/** A layered, touch-draggable deck on mobile; the original grid remains on desktop. */
export function SwipeCards({ children, label, className = "", viewportRef }: {
  children: ReactNode; label: string; className?: string; viewportRef?: RefObject<HTMLDivElement | null>;
}) {
  const cards = Children.toArray(children);
  const isPhoto = label === "Photo collections";
  const [active, setActive] = useState(0);
  const dragged = useRef(false);
  const reduced = useReducedMotion();
  const go = (index: number) => { if (cards.length) setActive((index + cards.length) % cards.length); };
  return <div ref={viewportRef} className="min-w-0">
    <div className={"swipe-deck-wrap mt-5 md:hidden " + (isPhoto ? "photo-deck" : "experience-deck")} role="region" aria-label={label} tabIndex={0}
      onKeyDown={event => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "ArrowRight") { event.preventDefault(); go(active + 1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); go(active - 1); }
      }}>
      <div className="swipe-deck">
        {cards.map((card, index) => {
          const distance = index >= active ? index - active : cards.length - active + index;
          const front = index === active;
          const visible = distance < (isPhoto ? 3 : 4);
          const x = isPhoto || front ? 0 : distance === 1 ? -42 : distance === 2 ? 42 : 0;
          const y = front ? 0 : isPhoto ? -distance * 17 : distance === 3 ? -28 : -11;
          const scale = front ? 1 : isPhoto ? 1 - distance * 0.02 : distance === 3 ? 0.91 : 0.94;
          return <motion.div key={index} className="swipe-deck-layer" aria-hidden={!front} inert={!front}
            style={{ zIndex: cards.length - distance, visibility: visible ? "visible" : "hidden", pointerEvents: front ? "auto" : "none" }}
            animate={{ x, y, scale, rotate: isPhoto || front || distance === 3 ? 0 : distance === 1 ? -4 : 4, opacity: visible ? 1 : 0 }}
            transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 176.4, damping: 22.4 }}
            drag={front ? "x" : false} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.35} dragMomentum={false}
            onDragStart={() => { dragged.current = true; }}
            onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 50 || Math.abs(info.velocity.x) > 450) go(active + (info.offset.x < 0 ? 1 : -1)); window.setTimeout(() => { dragged.current = false; }, 100); }}
            onClickCapture={event => { if (dragged.current) { event.preventDefault(); event.stopPropagation(); } }}>
            <div className="swipe-deck-content">{card}</div>
          </motion.div>;
        })}
      </div>
      <div className="swipe-deck-controls" role="group" aria-label={label + " controls"}>
        <button type="button" className="swipe-deck-arrow" onClick={() => go(active - 1)} disabled={cards.length < 2} aria-label="Previous card"><ChevronLeft size={19} strokeWidth={1.8} /></button>
        <div className="swipe-deck-hint" aria-hidden="true"><MoveHorizontal size={16} strokeWidth={1.7} /><span>Swipe to explore</span></div>
        <button type="button" className="swipe-deck-arrow" onClick={() => go(active + 1)} disabled={cards.length < 2} aria-label="Next card"><ChevronRight size={19} strokeWidth={1.8} /></button>
        <span className="sr-only" aria-live="polite">Card {active + 1} of {cards.length}</span>
      </div>
      <div className="swipe-deck-dots" aria-hidden="true">{cards.map((_, index) => <span key={index} className={index === active ? "is-active" : ""} />)}</div>
    </div>
    <div className="hidden md:block"><div className={className}>{children}</div></div>
  </div>;
}
