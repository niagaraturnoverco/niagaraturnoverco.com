## Goal
Transform the single long-scroll `Index.tsx` into a menu-based multi-page site with a persistent left sidebar navigation.

## Navigation
- Add a shadcn `Sidebar` (collapsible="icon") rendered in a new `AppLayout` shell wrapping all main routes via `<Outlet />`.
- Sidebar contents:
  - Logo at top (reuse existing `Logo` component).
  - Links: Home, Services, Pricing, Gallery, About & Trust, Contact (each with a lucide icon + NavLink active state).
  - Footer block with phone + primary CTA button (Schedule).
- Desktop: sidebar always visible, collapsible to icon strip via `SidebarTrigger` in a slim top header.
- Mobile: sidebar becomes offcanvas drawer; header shows logo + hamburger trigger + phone icon.
- Active route highlight via `NavLink` + `isActive` on `SidebarMenuButton`.

## Page split (6 pages)
Extract the existing sections from `src/pages/Index.tsx` into dedicated pages. Shared bits (hero CTAs, section labels, testimonials data, pricing data, etc.) move into `src/lib/site-content.ts` and small components into `src/components/site/` so pages stay lean.

1. **Home (`/`)** — Hero with rotating image carousel, trust strip, audience row, testimonials teaser (3 cards), FAQ teaser (top 3) with link to full FAQ, final CTA band.
2. **Services (`/services`)** — Risks section, Services cards (3), Readiness quiz, "Why NTC" section.
3. **Pricing (`/pricing`)** — Pricing table, Add-ons grid, Recurring plans, Calculator, CTA.
4. **Gallery (`/gallery`)** — Keep existing page; also include the readiness-standard visual grid moved over from Index.
5. **About & Trust (`/about`)** — Merge current `/trust` content + full testimonials grid + audience + partner logos + brand story copy. Replace `/trust` route with a redirect to `/about`.
6. **Contact (`/contact`)** — Intake/onboarding section, phone/SMS/email cards, scheduling CTA, FAQ full list.

## Routing changes (`src/App.tsx`)
```text
<Route element={<AppLayout />}>
  <Route path="/" element={<Home />} />
  <Route path="/services" element={<Services />} />
  <Route path="/pricing" element={<Pricing />} />
  <Route path="/gallery" element={<Gallery />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/service-area/:city" element={<CityLanding />} />
  <Route path="/trust" element={<Navigate to="/about" replace />} />
</Route>
<Route path="*" element={<NotFound />} />
```

## File changes
- Create `src/components/layout/AppLayout.tsx` (SidebarProvider + AppSidebar + header + Outlet).
- Create `src/components/layout/AppSidebar.tsx`.
- Create `src/lib/site-content.ts` (HERO_IMAGES, testimonials, services, pricing, faqs, addons, recurring, audience, constants).
- Create pages: `src/pages/Home.tsx`, `Services.tsx`, `Pricing.tsx`, `About.tsx`, `Contact.tsx`.
- Update `src/pages/Gallery.tsx` to fit new layout (remove its own header/footer if duplicated).
- Slim or delete `src/pages/Index.tsx` (replaced by `Home.tsx`).
- Update `src/App.tsx` routes as above.

## Preserved behaviors
- All current copy, images, CTAs, tracking calls, Airtable links, phone numbers carry over verbatim.
- SEO: each page gets its own `<title>` + meta description + H1 via a small `<PageMeta>` helper (document.title side-effect, no new deps).
- Footer (existing bottom CTA + paper section) becomes a shared `SiteFooter` component rendered inside `AppLayout` below `<Outlet />`.

## Out of scope
- No redesign of colors, typography, or visual style — sidebar uses existing gold/ink tokens.
- No backend or content changes.
