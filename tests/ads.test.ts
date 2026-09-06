import { describe, expect, it } from 'vitest';
import { getAdsenseClient, canServeAds } from '../src/lib/ads';

// Synthetic account identifier for isolated tests only, never a deployment value.
const testClient = 'ca-pub-1234567890123456';

describe('advertising account and display separation', () => {
  it('allows an unconfigured site and validates account syntax', () => {
    expect(getAdsenseClient(undefined)).toBe('');
    expect(getAdsenseClient('  ')).toBe('');
    expect(getAdsenseClient(` ${testClient} `)).toBe(testClient);
    for (const invalid of ['pub-1234567890123456', 'ca-pub-XXXXXXXXXXXXXXX', 'ca-pub-123', '<script>']) {
      expect(() => getAdsenseClient(invalid)).toThrow('PUBLIC_ADSENSE_CLIENT');
    }
  });

  it('does not let verification enable ads or override page exclusions', () => {
    expect(canServeAds(testClient, undefined, 'true', true)).toBe(false);
    expect(canServeAds(testClient, 'false', 'true', true)).toBe(false);
    expect(canServeAds(testClient, 'true', 'false', true)).toBe(false);
    expect(canServeAds(testClient, 'true', 'true', false)).toBe(false);
    expect(canServeAds('', 'true', 'true', true)).toBe(false);
    expect(canServeAds(testClient, 'true', 'true', true)).toBe(true);
  });
});
