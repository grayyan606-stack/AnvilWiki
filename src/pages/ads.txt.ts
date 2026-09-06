import type { APIRoute } from 'astro';
import { getAdsenseClient } from '../lib/ads';

/**
 * Generate /ads.txt only when a real AdSense publisher ID is configured.
 *
 * The Google authorization line must never be emitted with a placeholder ID:
 * an invalid ads.txt can make approved inventory unmonetizable. Set
 * PUBLIC_ADSENSE_CLIENT to the real account ID supplied by AdSense.
 */
const publisherId = getAdsenseClient(import.meta.env.PUBLIC_ADSENSE_CLIENT);

const headers = { 'Content-Type': 'text/plain; charset=utf-8' };

export const GET: APIRoute = () => {
  // Until the publisher ID exists, omit ads.txt rather than ship an invalid
  // zero-authorization file. A real account ID may also be used before review.
  if (!publisherId) {
    return new Response(null, { status: 404, headers });
  }

  return new Response(
    `google.com, ${publisherId.replace(/^ca-/, '')}, DIRECT, f08c47fec0942fa0\n`,
    { headers },
  );
};
