"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Keep supplied standalone styles and scripts isolated while using one page scrollbar.
export function CaseDocument({ title, src, next }: { title: string; src: string; next: { title: string; href: string } }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const observer = useRef<ResizeObserver | null>(null);
  const [height, setHeight] = useState(900);
  useEffect(() => {
    // An SSR iframe can finish loading before React attaches its onLoad handler.
    measure();
    return () => observer.current?.disconnect();
  }, [src]);
  function measure() {
    observer.current?.disconnect();
    const doc = frame.current?.contentDocument;
    if (!doc?.body) return;
    const update = () => setHeight(Math.ceil(doc.body.getBoundingClientRect().height + parseFloat(getComputedStyle(doc.body).marginTop || "0") + parseFloat(getComputedStyle(doc.body).marginBottom || "0")) + 2);
    observer.current = new ResizeObserver(update);
    observer.current.observe(doc.body);
    update();
  }
  return <article className="mt-4 min-w-0">
    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
      <h1 className="display text-[clamp(28px,3vw,40px)]">{title}</h1>
      <a href={src} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-[14px] font-semibold text-brand underline underline-offset-4">Open full page ↗</a>
    </div>
    <iframe ref={frame} src={src} title={`${title} case study`} onLoad={measure} className="block w-full rounded-2xl border-0 bg-surface" style={{ height }} />
    <Link href={next.href} className="mt-6 flex min-h-12 items-center justify-between rounded-2xl bg-paper p-4 font-semibold">Next: {next.title}<span aria-hidden>→</span></Link>
  </article>;
}
