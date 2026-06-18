# Visual Overhaul — Niagara Turnover Co.

A focused redesign of the homepage. Locked theme: **black + white + gold**, blended for conversion. Tone: **uplifting and confident**, while still naming the pain honestly and keeping claims fair.

## Design principles (locked)

- **Palette:** Deep black `#0A0A0A` base, off-white `#F5F1E8` (warm paper, not stark white), gold `#D4A24C` primary accent, soft gold `#E8C77A` glow. White used as surface on alternating sections so the page breathes instead of fighting one dark mood.
- **Tone shift:** Headlines reframe from purely punitive ("everything gets expensive") to **problem + solution in the same breath** ("When readiness slips, costs rise — we close the gap before guests notice"). Pain stays, but the page moves toward relief, not dread.
- **Fairness guardrails:** No invented stats. Keep the existing 24h / 7 areas / +50% rush numbers. Rewrite copy to be specific, plain, and verifiable.
- **Rhythm:** Alternate dark and warm-white sections so the eye resets every 1–2 blocks. Break the uniform 3-card grid.

## Section-by-section plan

### 1. Hero — add a visual anchor
- Two-column split on desktop, stacked on mobile.
- **Left:** New headline + subhead + dual CTA + trust strip (response time, areas served, rush capability) rendered as a compact gold-bordered card instead of loose chips.
- **Right:** Layered photo composition — a real interior turnover photo (clean, lit room) with a small gold "Ready ✓" status chip floating over it, and a subtle parallax/scroll fade. Photo generated via imagegen; saved to `src/assets/`.
- New headline candidates (uplifting + honest): *"Properties that are ready by the time guests arrive."* with secondary line *"We handle the turnover, listing prep, and recurring readiness so revenue doesn't slip through coordination gaps."*

### 2. The Real Risk — split layout
- Convert the 3 chip cards into a **zigzag list**: left column = bold gold numeral + risk phrase, right column = one-sentence consequence. Removes the "row of identical cards" feel and reads like an argument, not a checklist.

### 3. Request → Route → Confirm — keep, restyle
- Tighten the two-column layout. Add a thin animated gold connector line drawing down the steps on scroll (CSS only, no extra deps).

### 4. Cost calculator — warm-surface section
- Flip this section to the **off-white surface** with black text and gold inputs. Creates the strongest visual reset on the page and makes the calculator feel like a tool, not another dark card.

### 5. Services — feature one, support two
- Break the equal 3-up grid into a **1-large + 2-small bento**: Emergency Turnover Coverage as the hero card (with a small photo thumbnail), Property Readiness and Recurring as supporting cards. Establishes hierarchy.

### 6. Four steps — horizontal track
- Replace the 4-card row with a horizontal **stepper track** with gold dot connectors, numerals oversized in outline gold, copy beneath. Distinct shape from every other section.

### 7. Pricing — warm-surface, table-forward
- Move pricing onto the off-white surface. Standard turnovers becomes a clean price table (rows with hairline dividers, not boxed cards). Same-Day/Emergency stays as an outlined gold callout to the right. Recurring coverage becomes a single full-width band underneath.

### 8. Who this is for — icon row, not card grid
- Convert to a single horizontal **icon + label row** (6 items), each with a thin gold underline on hover. Removes the most repetitive grid on the page.

### 9. Testimonials — add faces and properties
- Each testimonial gets a generated property thumbnail (top) + a generated portrait avatar (next to name) + a gold pull-quote mark. Cards become asymmetric: featured quote (larger) + two supporting quotes.

### 10. FAQ — visual treatment
- Two-column on desktop. Active item expands with a soft gold left-border and warm-white inner surface. Adds a small "Still have questions? Call us" gold inline CTA after the last item.

### 11. Final CTA — full-bleed gold band
- Replace the bordered dark card with a **full-bleed warm-gold gradient band**, black text, two black-outline buttons. Acts as the page's visual exhale and most assertive conversion moment.

### 12. Partner block + footer
- Partner block: warm-white surface, photo thumb of Sherkston, two outlined buttons. Footer stays dark, tighten spacing, add small "Licensed & insured · Serving Niagara since [year]" line for trust.

## Imagery to generate (all `src/assets/`)

1. `hero-turnover.jpg` — clean, warm-lit short-term rental interior, freshly turned (16:9, premium).
2. `service-emergency.jpg` — small thumbnail of a turnover-in-progress, neutral.
3. `testimonial-property-1/2/3.jpg` — three exterior/interior property thumbnails.
4. `avatar-peter.jpg`, `avatar-gabriella.jpg`, `avatar-host.jpg` — neutral portrait avatars (square).
5. `partner-sherkston.jpg` — cottage exterior thumbnail.

All photo-realistic, warm tones to harmonize with the off-white surface and gold accent. Saved as `.jpg` (not transparent).

## Tokens to add to `src/index.css`

- `--surface-paper: 43 35% 94%;` (warm off-white)
- `--ink: 0 0% 4%;` (deep black on paper sections)
- `--gold: 38 60% 56%;` (primary accent)
- `--gold-glow: 40 72% 70%;` (highlight)
- `--gold-deep: 36 55% 40%;` (hover/active)
- New utilities: `.section-paper`, `.section-ink`, `.gold-rule`, `.gold-underline-hover`.

## Files touched (estimated)

- `src/index.css` — add tokens + 3 utilities.
- `tailwind.config.ts` — register new color tokens.
- `src/pages/Index.tsx` (or section components under `src/components/sections/*`) — restructure 12 sections above.
- `src/assets/*` — 8 new generated images.
- No new dependencies. No route/data changes. No backend changes.

## What I will NOT do

- No new fonts (existing DM Sans + DM Serif stay — they already fit the editorial gold-on-black direction).
- No invented stats, no fake logos, no fabricated case studies.
- No motion libraries beyond what's already installed.
- No copy that overpromises ("guaranteed," "always," "#1").

## Out of scope (ask separately if wanted)

- New routes / city landing pages.
- Lighthouse CI (still pending from earlier plan).
- Form submission backend.
