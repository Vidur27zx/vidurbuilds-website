import type { Metadata } from "next";
import { BuildsShowcase } from "@/components/Builds";
import { PageTransition } from "@/components/Providers";
import { profile } from "@/content";

export const metadata: Metadata = {
  title: `Product Case Studies & Prototypes | ${profile.name}`,
  description: "Explore product management case studies, PRDs and prototypes by Vidur Ramachandran, including customer experience, AI, strategy and data projects.",
  alternates: { canonical: "/builds" },
};

export default function BuildsPage() {
  return (
    <PageTransition>
      <BuildsShowcase />
    </PageTransition>
  );
}
