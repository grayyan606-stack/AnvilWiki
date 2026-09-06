import type { APIRoute } from 'astro';

/**
 * Generate /ads.txt only when a real AdSense publisher ID is configured.
 *
 * The Google authorization line must never be emitted with a placeholder ID:
 * an invalid ads.txt can make approved inventory unmonetizable. Set
 * PUBLIC_ADSENSE_CLIENT to ca-pub-XXXXXXXXXXXXXXXX after AdSense approval.
 */
const adsenseClient = import.meta.env.PUBLIC_ADSENSE_CLIENT as string | undefined;
const publisherId = adsenseClient?.trim() ?? '';

const headers = { 'Content-Type': 'text/plain; charset=utf-8' };

export const GET: APIRoute = () => {
  // Until the publisher ID exists, omit ads.txt rather than ship an invalid
  // zero-authorization file. Set PUBLIC_ADSENSE_CLIENT after AdSense approval.
  if (!publisherId) {
    return new Response(null, { status: 404, headers });
  }

  if (!/^ca-pub-\d{16}$/.test(publisherId)) {
    throw new Error(
      'PUBLIC_ADSENSE_CLIENT must be a valid AdSense publisher ID in the form ca-pub-XXXXXXXXXXXXXXXX.',
    );
  }

  return new Response(
    `google.com, ${publisherId.replace(/^ca-/, '')}, DIRECT, f08c47fec0942fa0\n`,
    { headers },
  );
};
