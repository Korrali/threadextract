import type { MetadataRoute } from "next";

const BASE = "https://threadextract.korrali.com";

const TOOLS = ["slack-thread-to-markdown"];
const VS_COMPETITORS = ["tettra", "guru", "slab", "confluence", "notion-ai"];
const TEAMS = ["engineering", "support", "product", "customer-success", "ops"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const toolPages = TOOLS.map((slug) => ({
    url: `${BASE}/tools/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const vsPages = VS_COMPETITORS.map((slug) => ({
    url: `${BASE}/vs/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const teamPages = TEAMS.map((slug) => ({
    url: `${BASE}/for/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/vs`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/for`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...toolPages,
    ...vsPages,
    ...teamPages,
  ];
}
