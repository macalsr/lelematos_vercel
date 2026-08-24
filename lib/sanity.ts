import { createClient } from "@sanity/client";
import { fallbackWorks, type Work } from "./works";

export type SiteLogo = {
  url: string;
  width: number;
  height: number;
};

export type SiteSettings = {
  siteTitle?: string;
  logoType?: "image" | "text";
  logoImage?: SiteLogo;
  logoText?: string;
  logoAlt?: string;
  favicon?: string;
  instagram?: string;
  whatsapp?: string;
  aboutTitle?: string;
  aboutIntro?: string;
  aboutDetails?: string;
  contactTitle?: string;
  contactEmail?: string;
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const publicFetchOptions = { next: { revalidate: 60 } } as const;

export const isSanityConfigured = Boolean(projectId && dataset);

const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-01",
      useCdn: true,
    })
  : null;

const workProjection = `{
  "slug": slug.current,
  title,
  technique,
  year,
  "category": coalesce(category->title, category),
  description,
  "image": image.asset->url,
  "alt": image.alt,
  "imageWidth": image.asset->metadata.dimensions.width,
  "imageHeight": image.asset->metadata.dimensions.height,
  featured
}`;

const siteSettingsProjection = `{
  siteTitle,
  "logoType": coalesce(logoType, select(defined(logoImage) || defined(logo) => "image", "text")),
  "logoImage": {
    "url": coalesce(logoImage.asset->url, logo.asset->url),
    "width": coalesce(logoImage.asset->metadata.dimensions.width, logo.asset->metadata.dimensions.width),
    "height": coalesce(logoImage.asset->metadata.dimensions.height, logo.asset->metadata.dimensions.height)
  },
  "logoText": coalesce(logoText, "Logo"),
  "logoAlt": coalesce(logoAlt, logoImage.alt, logo.alt),
  "favicon": favicon.asset->url,
  instagram,
  whatsapp,
  aboutTitle,
  aboutIntro,
  aboutDetails,
  contactTitle,
  contactEmail
}`;

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!client) return null;

  try {
    return await client.fetch<SiteSettings | null>(
      `*[_type == "siteSettings"][0] ${siteSettingsProjection}`,
      {},
      publicFetchOptions,
    );
  } catch {
    return null;
  }
}

export async function getWorks(): Promise<Work[]> {
  if (!client) return fallbackWorks;

  try {
    const works = await client.fetch<Work[]>(
      `*[_type == "work"] | order(featured desc, year desc) ${workProjection}`,
      {},
      publicFetchOptions,
    );
    return works.length ? works : fallbackWorks;
  } catch {
    return fallbackWorks;
  }
}

export async function getWork(slug: string): Promise<Work | undefined> {
  if (!client) return fallbackWorks.find((work) => work.slug === slug);

  try {
    const work = await client.fetch<Work | null>(
      `*[_type == "work" && slug.current == $slug][0] ${workProjection}`,
      { slug },
      publicFetchOptions,
    );
    return work || fallbackWorks.find((item) => item.slug === slug);
  } catch {
    return fallbackWorks.find((work) => work.slug === slug);
  }
}
