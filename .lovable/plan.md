# Premium conversion plan

## Outcome
Rework the homepage into a more premium, trust-heavy experience that uses the uploaded photos as live visual assets and drives users toward Client On-Boarding as the primary conversion action.

## What I’ll change
1. **Replace current homepage imagery with curated uploaded photos**
   - Use the new uploaded interiors/exteriors as live assets across the homepage.
   - Assign stronger visual roles: hero, supporting editorial grid, trust/gallery moments, and premium service backdrops.
   - Keep alt text and lazy-loading strategy tight so performance stays strong.

2. **Refocus the page hierarchy around premium onboarding conversion**
   - Make Client On-Boarding the dominant CTA throughout the homepage.
   - Keep Scheduling available as the secondary action for urgent/smaller jobs.
   - Adjust copy emphasis so the site speaks more to recurring clients, operators, and multi-property accounts.

3. **Upgrade the homepage art direction**
   - Shift the page from “premium local operator” to a more polished hospitality/property-readiness editorial look.
   - Lean into the current serif + clean sans pairing, but tune spacing, section rhythm, image framing, and contrast for a more high-end feel.
   - Use the best uploaded imagery to create a more cohesive first impression with better emotional pull.

4. **Refresh the full homepage sections**
   - **Hero:** stronger image-led composition, clearer primary onboarding CTA, tighter supporting proof.
   - **Services:** recast cards/visuals to better match premium property readiness.
   - **Social proof / trust sections:** strengthen luxury/performance cues with better imagery pairing.
   - **Gallery / before-after context:** keep proof-oriented sections, but integrate them into the upgraded premium story.
   - **Footer:** ensure the location/contact area still supports conversion and feels consistent with the new visual system.

5. **Use proper asset flow for uploaded images**
   - Convert selected uploaded photos into project assets through the CDN asset flow instead of copying binaries into the repo.
   - Wire those asset pointers into the homepage cleanly so the visuals are production-ready.

## Technical details
- Reuse the existing homepage route in `src/pages/Index.tsx` rather than creating a separate page.
- Preserve the current responsive image strategy where it still makes sense, but adapt it to the uploaded assets workflow.
- Keep changes focused on the homepage and its visual/conversion structure only.
- Avoid backend changes, business-logic expansion, or unrelated route changes.

## Files likely involved
- `src/pages/Index.tsx`
- Possibly `src/components/Picture.tsx` if asset usage needs a small adaptation
- `src/assets/*` for CDN asset pointers
- `src/index.css` only if the premium conversion pass needs token-level polish

## Notes from current codebase
- The homepage already contains a large all-in-one premium marketing layout.
- It already uses optimized image imports and some asset pointers.
- The best approach is a focused refit of that existing page rather than a rebuild from scratch.

## After approval
I’ll implement the homepage refit, wire in the selected uploaded images as real assets, and keep the page optimized for a premium onboarding-first conversion path.