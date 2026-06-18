# Swap in optimized WebP/AVIF images to fix LCP

The four heaviest images on the site (totaling ~7.7 MB) are the bottleneck for LCP on mobile. I can't re-encode them in the sandbox (no image-tooling credentials), so the fastest path is: **you upload optimized versions, I swap the pointers**.

## What to upload

Please drop these into chat (drag into the composer, or use the + button). One file per slot, any of these is fine: `.webp`, `.avif`, or a much smaller `.jpg`.

| Slot | Current file | Current size | Target |
|---|---|---|---|
| Hero (LCP) | `premium-spa-bath.jpg` | 2.80 MB | ≤ 150 KB, 1600w |
| Gallery | `premium-villa-pool.jpg` | 2.39 MB | ≤ 200 KB, 1600w |
| Gallery | `premium-lobby-stair.jpg` | 1.72 MB | ≤ 200 KB, 1600w |
| Gallery | `premium-sunset-pool.jpg` | 0.78 MB | ≤ 120 KB, 1200w |

Recommended encoder: [Squoosh](https://squoosh.app) → WebP quality 75, or AVIF quality 50. Keep the original filenames if possible (just change the extension) so I can map them 1:1.

## What I'll do once the files arrive

1. Upload each optimized image to the Lovable CDN via `lovable-assets create`.
2. Rewrite the matching `.asset.json` pointers in `src/assets/` (e.g. `luxury-bath-suite.jpg.asset.json` → new asset_id + WebP URL).
3. Update `<link rel="preload">` in `index.html` to point at the new hero URL and add `type="image/webp"` (or AVIF).
4. Update the hero `<img>` tag to use a `<picture>` with AVIF/WebP `<source>` + JPG fallback if you send multiple formats.
5. Re-run the Lighthouse mobile audit and report the new LCP/Performance score.

## Notes

- No code changes happen until you upload. If you'd rather I generate replacement images with the built-in image generator instead of re-encoding the existing photos, say the word and I'll go that route (different visuals, but guaranteed small).
- This change is presentation-only — no business logic touched.
