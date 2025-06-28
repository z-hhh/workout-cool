import { MetadataRoute } from "next/types";

import { getSitemapData } from "@/features/programs/actions/get-sitemap-data.action";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.workout.cool";
  const currentDate = new Date().toISOString();

  // Static routes with locale support
  const staticRoutes = [
    // Home pages
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/fr`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    // Auth pages (lower priority as they're functional pages)
    {
      url: `${baseUrl}/auth/signin`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/auth/signup`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    // About pages
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/fr/about`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/about`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    // Legal pages
    {
      url: `${baseUrl}/legal/privacy`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${baseUrl}/legal/terms`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${baseUrl}/legal/sales-terms`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${baseUrl}/fr/legal/privacy`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${baseUrl}/fr/legal/terms`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${baseUrl}/fr/legal/sales-terms`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${baseUrl}/en/legal/privacy`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${baseUrl}/en/legal/terms`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${baseUrl}/en/legal/sales-terms`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
  ];

  // Get dynamic program data for sitemap
  const programsData = await getSitemapData();

  // Generate dynamic routes
  const dynamicRoutes: MetadataRoute.Sitemap = [];

  // Add programs index pages for each locale
  const locales = ["fr", "en", "es", "pt", "ru", "zh-cn"];
  locales.forEach((locale) => {
    dynamicRoutes.push({
      url: `${baseUrl}/${locale}/programs`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    });
  });

  // Add program detail pages and their sessions
  programsData.forEach((program) => {
    // Program detail pages for each locale
    const programSlugs = {
      fr: program.slug,
      en: program.slugEn,
      es: program.slugEs,
      pt: program.slugPt,
      ru: program.slugRu,
      "zh-cn": program.slugZhCn,
    };

    Object.entries(programSlugs).forEach(([locale, slug]) => {
      if (slug) {
        // Program detail page
        dynamicRoutes.push({
          url: `${baseUrl}/${locale}/programs/${slug}`,
          lastModified: program.updatedAt.toISOString(),
          changeFrequency: "weekly" as const,
          priority: 0.9,
        });

        // Program weeks and sessions
        program.weeks.forEach((week) => {
          week.sessions.forEach((session) => {
            const sessionSlugs = {
              fr: session.slug,
              en: session.slugEn,
              es: session.slugEs,
              pt: session.slugPt,
              ru: session.slugRu,
              "zh-cn": session.slugZhCn,
            };

            const sessionSlug = sessionSlugs[locale as keyof typeof sessionSlugs];
            if (sessionSlug) {
              dynamicRoutes.push({
                url: `${baseUrl}/${locale}/programs/${slug}/session/${sessionSlug}`,
                // lastModified: session.updatedAt.toISOString(),
                lastModified: new Date().toISOString(), // TODO: add this back in when we have a way to update the sitemap
                changeFrequency: "monthly" as const,
                priority: 0.7,
              });
            }
          });
        });
      }
    });
  });

  // Combine static and dynamic routes
  return [...staticRoutes, ...dynamicRoutes];
}
