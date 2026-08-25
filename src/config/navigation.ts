/**
 * Navigation configuration — the single source of truth for content categories.
 *
 * 👉 APPLY TEMPLATE: Change this array when a new game has different content categories.
 *
 * The `key` MUST be identical in THREE places (rule enforced across the codebase):
 *   1. Here — NAVIGATION_CONFIG[].key
 *   2. src/locales/en.json — nav.<key> (display label) + overview.<key> (list page meta)
 *   3. src/content/wiki/<locale>/<key>/ — MDX directory name
 *
 * Changing this one file automatically affects: nav menu, URL routes, sitemap,
 * content loading, and the sidebar.
 */

// Icons are referenced by string name; astro-icon resolves them from src/icons/.
// We avoid importing the icon component here so this file stays framework-agnostic
// and can be read by non-Astro tooling (scripts, tests).
export interface NavigationItem {
  /** Category slug. Must match `src/content/wiki/<locale>/<key>/` directory name. */
  key: string;
  /** URL path segment. Must be `/${key}`. */
  path: string;
  /** Icon name from src/icons/ (without extension). */
  icon: string;
  /** Whether this category has MDX content (always true for content types). */
  isContentType: true;
  /** Sort order in nav menu (lower = earlier). Optional, defaults to array order. */
  order?: number;
}

export const NAVIGATION_CONFIG: NavigationItem[] = [
  { key: 'codes', path: '/codes', icon: 'lucide:gift', isContentType: true, order: 1 },
  { key: 'wiki', path: '/wiki', icon: 'lucide:book-open', isContentType: true, order: 2 },
  { key: 'eggs', path: '/eggs', icon: 'lucide:egg', isContentType: true, order: 3 },
  { key: 'pets', path: '/pets', icon: 'lucide:paw-print', isContentType: true, order: 4 },
  { key: 'mutations', path: '/mutations', icon: 'lucide:sparkles', isContentType: true, order: 5 },
  { key: 'biomes', path: '/biomes', icon: 'lucide:map', isContentType: true, order: 6 },
  { key: 'guides', path: '/guides', icon: 'lucide:route', isContentType: true, order: 7 },
  { key: 'tools', path: '/tools', icon: 'lucide:calculator', isContentType: true, order: 8 },
  { key: 'updates', path: '/updates', icon: 'lucide:newspaper', isContentType: true, order: 9 },
];

/** Derived list of content type slugs. */
export const CONTENT_TYPES: string[] = NAVIGATION_CONFIG.map((n) => n.key);
