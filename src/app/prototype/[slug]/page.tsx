import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@/components/icons";
import { PageTransition } from "@/components/Providers";
import { profile } from "@/content";

const prototypes = [
  { slug: "saathi-money", title: "Saathi Money", url: "https://saathi-prd.vercel.app/" },
  { slug: "batwa", title: "Batwa", url: "https://batua-prd.vercel.app/" },
  { slug: "corpsim", title: "CorpSim", url: "https://corp-sim-zeta.vercel.app/" },
] as const;

export function generateStaticParams() {
  return prototypes.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = prototypes.find((prototype) => prototype.slug === slug);
  return { title: item ? `${item.title} Prototype | ${profile.name}` : profile.name, ...(item && { description: `Explore the ${item.title} prototype and product work by ${profile.name}.`, alternates: { canonical: `/prototype/${item.slug}` } }) };
}

export default async function PrototypePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = prototypes.findIndex((prototype) => prototype.slug === slug);
  if (index < 0) notFound();
  const item = prototypes[index];
  const next = prototypes[(index + 1) % prototypes.length];
  return (
    <PageTransition>
      <section className="rounded-[28px] border border-line/70 bg-surface p-3 md:p-5">
        <Link href="/builds" className="-m-2 inline-flex items-center gap-1.5 p-2 text-[13px] font-semibold text-ink-soft hover:text-ink"><ArrowLeft width={14} height={14} /> Back</Link>
        <article className="mt-4 min-w-0">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h1 className="display text-[clamp(28px,3vw,40px)]">{item.title}</h1>
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-[14px] font-semibold text-brand underline underline-offset-4">Open full page ↗</a>
          </div>
          <iframe src={item.url} title={`${item.title} prototype`} className="block h-[min(78vh,900px)] min-h-[520px] w-full rounded-2xl border-0 bg-surface" />
          <p className="mt-3 text-sm text-ink-soft">If the prototype doesn’t appear above, use <a className="font-semibold text-brand underline underline-offset-4" href={item.url} target="_blank" rel="noopener noreferrer">Open full page</a>.</p>
          <Link href={`/prototype/${next.slug}`} className="mt-6 flex min-h-12 items-center justify-between rounded-2xl bg-paper p-4 font-semibold">Next: {next.title}<span aria-hidden>→</span></Link>
        </article>
      </section>
    </PageTransition>
  );
}
