import { Suspense } from "react";
import { About } from "@/components/About";
import { BeyondWork } from "@/components/BeyondWork";
import { Contact, WorkingWithMe } from "@/components/Closing";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { PageTransition } from "@/components/Providers";
import type { Metadata } from "next";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <PageTransition>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: "Vidur Builds", url: "https://vidurbuilds.in/" }).replace(/</g, "\\u003c") }} />
      <Hero />

      <Suspense>
        <About />
      </Suspense>
      <Suspense>
        <Journey />
      </Suspense>
      <Suspense>
        <BeyondWork />
      </Suspense>
      <Suspense>
        <WorkingWithMe />
      </Suspense>
      <Suspense>
        <Contact />
      </Suspense>
    </PageTransition>
  );
}
