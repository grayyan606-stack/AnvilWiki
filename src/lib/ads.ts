/** Validate account identity separately from permission to serve advertisements. */
export function getAdsenseClient(value: string | undefined): string {
  const client = value?.trim() ?? '';
  if (client && !/^ca-pub-\d{16}$/.test(client)) {
    throw new Error('PUBLIC_ADSENSE_CLIENT must use ca-pub- followed by 16 digits from your AdSense account.');
  }
  return client;
}

/** An account ID alone is sufficient for verification, never for ad display. */
export function canServeAds(
  client: string,
  enabled: string | undefined,
  cmpReady: string | undefined,
  pageAllowed: boolean,
): boolean {
  return Boolean(client) && enabled === 'true' && cmpReady === 'true' && pageAllowed;
}
