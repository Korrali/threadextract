import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/billing", "/settings", "/claim", "/login", "/api/"],
      },
    ],
    sitemap: "https://threadextract.korrali.com/sitemap.xml",
  };
}
