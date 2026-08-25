/**
 * Site configuration — the single source of truth for game-specific metadata.
 *
 * 👉 APPLY TEMPLATE: Change every field here when building a new game wiki.
 * This is part of the CONFIG LAYER — framework code reads from here, never the reverse.
 */

export interface SiteConfig {
  /** Full site name, used in <title> suffix and Organization JSON-LD. e.g. "Anvil Quest Wiki" */
  name: string;
  /** Short name for PWA manifest and mobile logo. e.g. "AQ Wiki" */
  shortName: string;
  /** Site description for Organization JSON-LD and og:site_name. */
  description: string;
  /** Domain without protocol or trailing slash. e.g. "anvilquestwiki.wiki" */
  domain: string;
  /** Hero tagline shown under the site title. */
  tagline: string;
  /** Copyright / legal disclaimer line shown in footer. */
  legalNotice: string;
  social: {
    /** Official game website URL (the game itself, not the wiki). */
    official: string;
    discord?: string;
    youtube?: string;
    twitter?: string;
    reddit?: string;
  };
  /**
   * Canonical URLs about the GAME (Steam page, official site, Wikipedia entry…).
   * Emitted as Organization JSON-LD `sameAs` — helps Google / AI engines link
   * this wiki to the game's knowledge-graph entity.
   */
  sameAs?: string[];
  game: {
    /** Full game name. */
    name: string;
    /** Platform: "Roblox" | "Steam" | "Epic Games" | "Mobile" | ... */
    platform: string;
    /** Developer / studio name. */
    developer: string;
    /** Genre description. */
    genre: string;
    /** ISO release date (optional). */
    releaseDate?: string;
  };
  /**
   * Dimensions of the default OG/Twitter share image (public/images/hero.webp).
   * Emitted as og:image:width / og:image:height so social crawlers can render
   * the share card without downloading the image first.
   */
  ogImageWidth: number;
  ogImageHeight: number;
  /** Default author name for articles without an explicit `author` in frontmatter (E-E-A-T signal). */
  defaultAuthor?: string;
}

export const site: SiteConfig = {
  name: 'Steal an Egg Wiki',
  shortName: 'Egg Wiki',
  description:
    'Independent Steal an Egg wiki with verified codes status, egg and pet indexes, mutations, biomes, guides, calculators, and update tracking.',
  domain: 'steal-an-egg-wiki.pages.dev',
  tagline: 'Steal smarter. Hatch better. Progress faster.',
  legalNotice:
    'Steal an Egg Wiki is an independent fan-made resource. It is not affiliated with Roblox or the game developer.',
  social: {
    official: 'https://www.roblox.com/games/107778070777162/Steal-An-Egg',
  },
  sameAs: ['https://www.roblox.com/games/107778070777162/Steal-An-Egg'],
  game: {
    name: 'Steal an Egg',
    platform: 'Roblox',
    developer: 'and Collect Rare Pets',
    genre: 'Collection and progression',
  },
  // hero.webp follows the site's 16:9 cover standard.
  ogImageWidth: 1200,
  ogImageHeight: 675,
  defaultAuthor: 'Steal an Egg Wiki Editors',
};

/** Absolute site URL (no trailing slash). Falls back to the Astro `site` config. */
export const siteUrl: string = (process.env.SITE_URL || `https://${site.domain}`).replace(
  /\/$/,
  '',
);
