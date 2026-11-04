import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CaseDocument } from "@/components/CaseDocument";
import { Demo } from "@/components/Demos";
import { ArrowLeft, ArrowRight, External } from "@/components/icons";
import { LockGate } from "@/components/LockGate";
import { PageTransition } from "@/components/Providers";
import { Pill, Reveal } from "@/components/ui";
import { caseStudies, profile, type CaseStudy } from "@/content";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/case-study/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = caseStudies.find((c) => c.slug === slug);
  return { title: item ? `${item.title} Case Study | ${profile.name}` : profile.name, description: item?.summary, ...(item && { alternates: { canonical: `/case-study/${item.slug}` } }) };
}

export default function CaseStudyPage({ params }: PageProps<"/case-study/[slug]">) {
  return (
    <PageTransition>
      <section className="rounded-[28px] border border-line/70 bg-surface p-3 md:p-5">
        <Link
          href="/builds"
          className="-m-2 inline-flex items-center gap-1.5 p-2 text-[13px] font-semibold text-ink-soft hover:text-ink"
        >
          <ArrowLeft width={14} height={14} /> Back
        </Link>
        <Suspense fallback={<div className="min-h-[520px]" />}>
          <CaseContent params={params} />
        </Suspense>
      </section>
    </PageTransition>
  );
}

async function CaseContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = caseStudies.findIndex((c) => c.slug === slug);
  if (index < 0) notFound();
  const item = caseStudies[index];
  const sequence = item.document ? caseStudies.filter((c) => c.document) : caseStudies;
  const next = sequence[(sequence.indexOf(item) + 1) % sequence.length];
  if (item.document) return <CaseDocument title={item.title} src={item.document} next={{title: next.title, href: "/case-study/" + next.slug}} />;
  return item.locked ? (
    <LockGate title={item.title}>
      <CaseBody item={item} next={next} />
    </LockGate>
  ) : (
    <CaseBody item={item} next={next} />
  );
}

function CaseBody({ item, next }: { item: CaseStudy; next: CaseStudy }) {
  return (
    <article className="mt-6">
      <p className="text-[12px] font-bold tracking-[0.18em] text-brand uppercase">{item.group}</p>
      <h1 className="display mt-1 text-[clamp(34px,5.4vw,64px)] text-brand">{item.title}</h1>
      <p className="mt-4 max-w-[680px] text-[17px] leading-relaxed text-ink/80 md:text-[19px]">{item.summary}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {item.metrics.map((m) => (
          <span key={m} className="rounded-lg bg-brand/[0.08] px-3 py-1.5 text-[13px] font-bold text-brand">
            {m}
          </span>
        ))}
        {item.link && (
          <Pill href={item.link.href} external variant="brand">
            {item.link.label} <External width={12} height={12} />
          </Pill>
        )}
      </div>
      <div className="mt-8">
        <Demo kind={item.demo} />
      </div>
      <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
        {item.sections.map((s, i) => (
          <Reveal key={s.heading} delay={(i % 2) * 0.06}>
            <h2 className="text-[11px] font-bold tracking-wider text-brand uppercase">{s.heading}</h2>
            <p className="mt-2 text-[16px] leading-relaxed text-ink/80 md:text-[17px]">{s.body}</p>
          </Reveal>
        ))}
      </div>
      <Link
        href={`/case-study/${next.slug}`}
        className="group mt-12 flex items-center justify-between rounded-2xl bg-paper p-5 transition-colors hover:bg-butter/50"
      >
        <span>
          <span className="block text-[12px] font-semibold text-ink-soft">Next case study</span>
          <span className="display mt-0.5 block text-[22px]">{next.title}</span>
        </span>
        <ArrowRight width={20} height={20} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </article>
  );
}
