import type { MetadataRoute } from "next";

import { resourceArticles } from "@/lib/resource-articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://emoease.org";

  const routes = ["", "/about", "/programs", "/community", "/events", "/resources", "/support", "/find-a-therapist", "/get-help-now", "/privacy", "/terms"];

  const pageEntries = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1 : 0.7,
  }));

  const resourceEntries = resourceArticles.map((article) => ({
    url: `${baseUrl}/resources/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...pageEntries, ...resourceEntries];
}
