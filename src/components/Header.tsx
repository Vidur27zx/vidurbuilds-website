"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { profile, socials } from "@/content";
import { spring } from "@/lib/motion";
import { BrandMark } from "./BrandMark";
import { ArrowUpRight, LinkedInLetters, Mail } from "./icons";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/builds", label: "Builds" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  const active =
    NAV.find((n) => (n.href === "/" ? pathname === "/" : pathname.startsWith(n.href)))?.href ??
    ((pathname.startsWith("/case-study") || pathname.startsWith("/prototype")) ? "/builds" : "");
  const linkedin = socials[0].href;

  return (
    <>
      <motion.header
        data-site-header
        className="relative z-40 mx-auto flex h-[76px] max-w-[1360px] items-center justify-between px-4 md:h-[84px] md:px-6 lg:px-[calc(2.5vw+28px)]"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.21429, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <Link href="/" className="group flex items-center gap-3" aria-label={`${profile.brand}, home`}>
          <motion.span
            className="block rounded-[14px] shadow-[0_8px_18px_-6px_rgba(58,27,12,0.55)]"
            whileHover={{ rotate: -8, scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            transition={spring}
          >
            <BrandMark size={46} className="h-10 w-10 md:h-[46px] md:w-[46px]" />
          </motion.span>
          <span className="display hidden text-[24px] tracking-[-0.035em] text-ink lg:block">{profile.brand}</span>
        </Link>
        <div className="flex items-center gap-2.5">
          <motion.a
            href={`mailto:${profile.email}`}
            className="glass-pill group inline-flex h-11 items-center gap-2 rounded-xl px-3 text-[15px] font-semibold text-espresso ring-[1.5px] ring-espresso/85 transition-colors hover:bg-espresso hover:text-[#fdf3ea] sm:px-4 md:h-12"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={spring}
            aria-label={`Email ${profile.email}`}
          >
            <Mail width={18} height={18} />
            <span className="hidden sm:inline">Say hello</span>
            <ArrowUpRight
              width={15}
              height={15}
              strokeWidth={2.4}
              className="hidden transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:block"
            />
          </motion.a>
          <motion.a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid h-11 w-11 place-items-center rounded-xl bg-espresso text-[#fdf3ea] shadow-[0_8px_18px_-8px_rgba(58,27,12,0.7)] md:h-12 md:w-12"
            whileHover={{ y: -2, rotate: -4 }}
            whileTap={{ scale: 0.94 }}
            transition={spring}
          >
            <LinkedInLetters width={22} height={22} />
          </motion.a>
        </div>
      </motion.header>
      <div className="pointer-events-none fixed inset-x-0 top-3.5 z-50 flex justify-center md:top-4">
        <nav
          aria-label="Main"
          className={`glass-nav glass-pill pointer-events-auto flex items-center gap-1 rounded-full p-1.5 ${scrolled ? "glass-nav-scrolled" : ""}`}
        >
          {NAV.map((item) => {
            const on = item.href === active;
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                aria-current={on ? "page" : undefined}
                className={`relative touch-manipulation rounded-full px-3.5 py-2.5 text-[15px] font-semibold transition-colors sm:px-5 md:px-7 md:text-[16px] ${
                  on ? "text-brand" : "text-ink hover:text-brand"
                }`}
              >
                {on && (
                  <span className="glass-active pointer-events-none absolute inset-0 rounded-full" />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
