import type { Transition } from "motion/react";

export const spring: Transition = { type: "spring", stiffness: 235.2, damping: 26.6 };

export const springSnappy: Transition = { type: "spring", stiffness: 274.4, damping: 25.2 };

export const springSoft: Transition = { type: "spring", stiffness: 186.2, damping: 23.8 };

export const springBouncy: Transition = { type: "spring", stiffness: 205.8, damping: 20.3 };

export const followSpring = { stiffness: 343, damping: 26.6, mass: 0.6 };

export const springDrop: Transition = { type: "spring", stiffness: 210.7, damping: 23.8, mass: 0.9 };

export const easeOut = [0.22, 0.61, 0.36, 1] as const;

export const easeRise = [0.2, 0.75, 0.25, 1] as const;

export const seen = { once: true, margin: "0px 0px -4% 0px" } as const;

export const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: "some", margin: "0px 0px -4% 0px" },
  transition: { duration: 0.34286, ease: easeOut },
} as const;
