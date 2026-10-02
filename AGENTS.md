# Agent rules
- Commercial lead capture writes to walkthrough_requests via src/components/QuoteForm.tsx; Airtable scheduling links only on residential/STR pages — keeps commercial leads on-site and tracked.
- Funnel events go to lead_events through src/lib/leads.ts trackLead — single place for UTM capture and conversion tracking.
- Per-route head tags use src/components/Seo.tsx (react-helmet-async); index.html holds no canonical — avoids duplicate canonicals.
- Commercial landing page content lives in src/data/commercialPages.ts and routes are generated from it — keeps sitemap and routes in sync.
- Admin access is checked via user_roles + has_role, never client storage — prevents privilege escalation.
