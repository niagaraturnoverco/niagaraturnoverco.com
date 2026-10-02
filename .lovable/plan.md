# Efficient imagery across the site

## Scope
Add purposeful imagery across the full site while preserving the blue-and-white brand, current copy, and Airtable lead flow.

## Changes
- Add a reusable, performance-focused image component for stable aspect ratios, responsive sizing, lazy loading, and subtle load transitions.
- Give the commercial overview, commercial service/city pages, property-manager page, walkthrough page, About, and Contact a relevant visual using existing CDN-hosted assets.
- Keep the homepage image as the only high-priority load; all supporting and below-the-fold images will load lazily.
- Rebalance layouts so photos support the conversion path without covering copy or creating oversized page sections.
- Use descriptive alt text and fixed dimensions/aspect ratios to prevent layout shift.
- Avoid large unused assets and repeated image grids; select the lightest relevant existing files where possible.

## Technical details
- Reuse existing `.asset.json` CDN pointers rather than adding new binary files.
- Centralize commercial image selection by page type so generated service routes remain consistent and maintainable.
- Update the project architecture note to reflect that all lead actions now use Airtable, replacing the obsolete on-site lead rule.
- Verify the main route families at desktop and mobile widths, confirm Airtable links remain intact, and check the preview build log.
