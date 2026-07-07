## Problem

After switching to the blue/white theme, the hero image on Home looks washed out. The overlay stack on top of the carousel was written for a dark theme:

- `bg-gradient-to-t from-background via-background/30 to-background/10` — now fades the image into white
- `bg-gradient-to-r from-background/25 to-transparent` — same, white wash from the left
- The bottom caption card uses `bg-background/50` (white 50%) with light text, so it blends into the photo

Same pattern likely appears on a few other hero/image blocks (chip pills using `bg-background/85`, glass cards).

## Fix

Scope: presentational only in `src/pages/Index.tsx` (and `src/index.css` if needed for a helper).

1. Replace the two image-covering gradients on the hero (lines 551–552) with a subtle dark-ink gradient so the photo stays visible:
   - Bottom-to-top: `from-[hsl(217_45%_12%/0.55)] via-[hsl(217_45%_12%/0.15)] to-transparent`
   - Left-to-right: reduce to `from-[hsl(217_45%_12%/0.25)] to-transparent`
2. Update the floating "Guest-Ready" chip and the bottom caption card so they read on a photo:
   - Chip: white pill (`bg-white/90`) with primary-blue text (already fine) instead of `bg-background/85`.
   - Bottom caption card: `bg-white/85 backdrop-blur border-primary/30`, text switches to `text-foreground` / `text-primary` so it stays readable against the photo.
3. Audit the file for the same pattern on any other image overlay (secondary hero, gallery teaser, CTA bands that sit over photos) and apply the same "dark tint + white glass card" fix. Everything else on plain page background stays as-is.
4. No changes to images, copy, layout, routing, or the design tokens themselves.

## Technical details

- Only Tailwind class edits inside `src/pages/Index.tsx`. No new components, no token changes.
- If the same overlay recipe repeats more than 2–3 times, add a small utility class (e.g. `.photo-scrim`) in `src/index.css` under `@layer components` to keep it consistent.
- Verify by viewing `/` in the preview after the change: hero photo visible, caption legible, chip legible.