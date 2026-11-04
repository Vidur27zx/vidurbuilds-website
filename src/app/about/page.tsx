import type { Metadata } from "next";
import { AboutView } from "@/components/AboutPage";
import { PageTransition } from "@/components/Providers";
import { aboutPage, profile } from "@/content";

export const metadata: Metadata = {
  title: `About ${profile.name} | Product & Project Management`,
  description: "Meet Vidur Ramachandran, a Hyderabad-based product generalist with experience in research, AI, product delivery and cross-functional collaboration.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PageTransition>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "ProfilePage", url: "https://vidurbuilds.in/about",
        mainEntity: { "@type": "Person", "@id": "https://vidurbuilds.in/about#vidur", name: profile.name, jobTitle: profile.role,
          description: aboutPage.sub, url: "https://vidurbuilds.in/", image: "https://vidurbuilds.in" + profile.headshot,
          sameAs: [profile.linkedin], address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressCountry: "IN" },
          knowsAbout: ["Product management", "Project management", "Product strategy", "User research", "AI prototyping", "Cross-functional collaboration"] },
      }).replace(/</g, "\\u003c") }} />
      <AboutView />
    </PageTransition>
  );
}
