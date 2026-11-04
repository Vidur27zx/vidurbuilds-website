import type { MetadataRoute } from "next";
import { caseStudies } from "@/content";

const BASE = "https://vidurbuilds.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/builds`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.8 },
    ...["saathi-money", "batwa", "corpsim"].map((slug) => ({
      url: `${BASE}/prototype/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...caseStudies.map((c) => ({
      url: `${BASE}/case-study/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
