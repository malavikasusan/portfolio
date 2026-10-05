import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/caseStudies";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/info`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Only include non-gated case studies dynamically following the data flag
  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies
    .filter((cs) => !cs.gated)
    .map((cs) => ({
      url: `${SITE_URL}/work/${cs.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...caseStudyRoutes];
}
