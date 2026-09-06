---
title: "Chapter 7 · Prepare and Enable AdSense"
description: "Verify ownership, publish useful original content, pass AdSense review, deploy consent controls, and enable ads only on reviewed article pages."
manual: learn
order: 7
icon: lucide:dollar-sign
tldr: "Prepare a complete, useful site and accurate trust pages, add your real publisher ID for ownership verification, and request review. After the site is Ready, deploy the applicable Google-certified consent platform, approve specific article pages, add the required slot IDs, and turn on the two advertising gates."
updated: 2026-09-06
---

## Where you are, and what this chapter solves

The site is live and Google is indexing it. But visitors arrive and you have nothing to sell — this chapter turns the **ad slots** on. Visitors see ads, and Google pays you a share.

## What you'll have when this chapter is done

- Ad slots live and revenue accumulating
- The switch locations for comments and traffic analytics (optional — flip them on whenever you want)

## A few words to know

- **AdSense**: Google's ad middleman. It places ads into your pages; when ads get seen or clicked, Google pays you monthly.
- **RPM**: how much you earn per thousand page views. Tier list and codes pages usually have the highest RPM.
- **Lighthouse 4×100**: Google's health check for websites — four scores of 100 for speed / accessibility / best practices / SEO. This template ships with a perfect score out of the box — the ad slots lazy-load, so turning them on doesn't drop the score.

## Step 1: Apply for AdSense (self-check first, don't rush to submit)

**Pre-application checklist** (missing any one makes rejection likely):

- ☐ A domain you own (bought in Chapter 5; the free pages.dev domain basically fails review)
- ☐ Enough original, useful content for the site's purpose; Google does not publish a fixed minimum article count or word count
- ☐ Privacy policy and terms of service pages (**the template already ships them built in** at `/privacy-policy` and `/terms-of-service` — nothing for you to do)
- ☐ No dead links on the site (`pnpm check-links` passes)

**How to do it**: open [adsense.google.com](https://adsense.google.com), add your site, install one of the verification methods shown there, and request review.
**If you get rejected**: use the exact reason in AdSense and the Policy center. Fix the affected pages or site behavior, verify the public deployment, and request another review when the issue is resolved.

## Step 2: Verify the account without serving ads

Copy your own publisher ID into `PUBLIC_ADSENSE_CLIENT`. The build uses it for the static `google-adsense-account` meta tag and the root `ads.txt` line. This does not serve ads while the advertising gates remain false. Never publish a sample ID or another publisher's ID.

This repository contains `wrangler.toml`, so its `[vars]` section controls the Cloudflare Pages build variables. The Cloudflare dashboard variable UI is ignored while that file is present.

## Step 3: Prepare consent and approved pages

Before serving ads, deploy and test the Google-certified TCF CMP required for your affected EEA, UK, and Switzerland traffic. The template's local cookie banner is not a certified CMP. Confirm accept, reject, manage, and withdrawal behavior, then set `PUBLIC_ADSENSE_CMP_READY=true`.

Review each article that may carry ads. Set `adsEnabled: true` only in qualifying article frontmatter. Legal pages, navigation pages, empty results, drafts, and noindex pages remain ad-free.

## Step 4: Enable the required ad units

After the site status is Ready, create only the ad units you plan to use and update `wrangler.toml`:
**How to do it**:

1. AdSense dashboard → **Ads** → by ad unit, grab your publisher ID (looks like `ca-pub-followed-by-digits`) and each ad slot's ID.
| Variable name (copy exactly, case-sensitive) | What you enter |
|---|---|
| `PUBLIC_ADSENSE_CLIENT` | Your publisher ID (starts with ca-pub-) |
| `PUBLIC_ADSENSE_ENABLED` | `true` only after review is Ready |
| `PUBLIC_ADSENSE_CMP_READY` | `true` only after the applicable certified CMP is deployed and tested |
| `PUBLIC_ADSENSE_SLOT_STICKY` | The bottom banner slot ID |
| `PUBLIC_ADSENSE_SLOT_SIDEBAR` | The sidebar slot ID |
| `PUBLIC_ADSENSE_SLOT_INCONTENT` | The in-article slot ID |

Set unused slot IDs to an empty string. Save, rebuild, and deploy.

**You'll see**: ads appear at the bottom / in the sidebar / mid-article (fresh ad slots can take hours to days to fill with real ads — blank at first is normal).
**Confirm it worked**: inspect an approved article and an excluded page in a fresh browser. The approved article may request ads only after the configured consent path; the excluded page must not load the AdSense script or render an ad unit. Do not click live ads during testing.

## Optional: comments and analytics (the same switch-panel game)

- **Comments** (Giscus, hosted on your GitHub repo's discussions): the variables are `PUBLIC_GISCUS_REPO` and 3 more; when you want them, the developer manual's feature-toggles chapter has the full steps.
- **Traffic analytics**: Google Analytics 4 (variable `PUBLIC_GA_ID`) or Cloudflare's built-in analytics (variable `PUBLIC_CF_BEACON_TOKEN`) — pick one or run both.

## Realistic revenue expectations

- The golden window is the **2 to 8 weeks** after a game explodes. Inside the window, Google hands you rankings step by step — **zero revenue in the first 1 to 2 weeks is normal**, not failure.
- The revenue formula ≈ page count × rankings × revenue per thousand views. In the first 30 days, push page count; after that, push rankings (freshness + internal links).

## If you get stuck

- **"An ad slot stays blank"**: confirm the site is Ready, both advertising gates are true, the article has `adsEnabled: true`, the relevant slot ID is present, and consent behavior is working. New units may also take time to fill.
- **"AdSense rejected me"**: follow the stated review or policy reason. More pages do not fix ownership, navigation, privacy, invalid traffic, or low-value copied content.

## ✅ Acceptance criteria (all must hold)

- Ads genuinely display on the live site (if you've passed AdSense review)
- ☐ Your real publisher ID verifies correctly and `ads.txt` matches it
- ☐ Both advertising gates are enabled only after review and CMP testing
- ☐ Only reviewed articles opt in; excluded routes issue no ad requests
- ☐ Your expectations are set: zero revenue the first two weeks is normal

## Next step

The ads are on, but game guides fear one thing above all — going stale. Stale content loses rankings and visitors. The last chapter: a 30-minute weekly freshness rhythm that keeps the site earning. [Go to Chapter 8 · Weekly Freshness and Growth](/landing/docs/weekly-ops)
