#!/usr/bin/env python3
"""
Niagara Turnover Co. — Site-wide CTA & SMS Fix
===============================================
Run from your repo root:   python3 fix_all.py

What this does:
  1. Adds pre-filled body text to all bare sms: links on area pages + services.html
  2. Standardizes all primary CTA button text to "Check Availability →"
  3. Makes stat counters static (removes animated-from-zero data-target attributes)
  4. Removes the duplicate secondary hero CTA on index.html

Files touched:
  - fort-erie.html          (already fixed — use the updated version from outputs/)
  - niagara-falls.html
  - niagara-on-the-lake.html
  - port-colborne.html
  - st-catharines.html
  - thorold.html
  - welland.html
  - services.html
  - index.html
"""

import re
import os
import shutil
from datetime import datetime

# ── Transformation functions ──────────────────────────────────────────────────

SMS_BODY = "Can%20you%20confirm%20availability%20for%20this%20turnover%20and%20let%20me%20know%20next%20steps%3F"
BARE_SMS  = 'href="sms:+12892577725"'
FULL_SMS  = f'href="sms:+12892577725?body={SMS_BODY}"'


def transform_area_page(html: str) -> str:
    """Fixes for all 7 area pages."""

    # 1. Add SMS body to any bare sms: links
    html = html.replace(BARE_SMS, FULL_SMS)

    # 2. Standardize CTA button text
    html = re.sub(r'>Text Your Listing →<', '>Check Availability →<', html)
    html = re.sub(r'>Text Your Listing<',   '>Check Availability →<', html)

    # 3. Make stats static (fixes "shows 0 on page load" issue)
    html = re.sub(
        r'<div class="stat-num" data-target="100" data-suffix="%">0%</div>',
        '<div class="stat-num">100%</div>', html)
    html = re.sub(
        r'<div class="stat-num" data-target="7">0</div>',
        '<div class="stat-num">7</div>', html)
    html = re.sub(
        r'<div class="stat-num" data-target="1" data-prefix="&lt;" data-suffix="hr">0hr</div>',
        '<div class="stat-num">&lt;1hr</div>', html)

    return html


def transform_services(html: str) -> str:
    """Fixes for services.html."""
    html = html.replace(BARE_SMS, FULL_SMS)
    html = re.sub(r'>Text Your Listing →<', '>Check Availability →<', html)
    html = re.sub(r'>Text Your Listing<',   '>Check Availability →<', html)
    return html


def transform_index(html: str) -> str:
    """
    Removes the duplicate secondary hero CTA that splits user attention.
    Keeps only the primary "Check Availability →" button in the hero.
    """
    # Remove the "See If We Can Cover Your Turnover →" btn-secondary in hero CTA row
    html = re.sub(
        r'\s*<a href="sms:[^"]*"\s+class="btn-secondary">See If We Can Cover Your Turnover →</a>',
        '',
        html
    )
    # Also remove the duplicate presell-cta inline "Check If Your Listing Qualifies →" that
    # creates a second SMS link competing with the main CTA in that section
    # (leave it if you want to keep it — comment out the next block to skip)
    # html = re.sub(
    #     r'<div class="presell-cta">.*?</div>',
    #     '',
    #     html,
    #     flags=re.DOTALL
    # )
    return html


# ── File processing ───────────────────────────────────────────────────────────

AREA_PAGES = [
    "niagara-falls.html",
    "niagara-on-the-lake.html",
    "port-colborne.html",
    "st-catharines.html",
    "thorold.html",
    "welland.html",
]

FILE_MAP = {
    **{f: transform_area_page for f in AREA_PAGES},
    "services.html": transform_services,
    "index.html":    transform_index,
}


def backup(path: str) -> str:
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    bak = f"{path}.bak_{ts}"
    shutil.copy2(path, bak)
    return bak


def process(filename: str, transform_fn) -> None:
    if not os.path.exists(filename):
        print(f"  SKIP  {filename}  (file not found)")
        return

    with open(filename, encoding="utf-8") as f:
        original = f.read()

    updated = transform_fn(original)

    if updated == original:
        print(f"  ----  {filename}  (no changes needed)")
        return

    bak = backup(filename)
    with open(filename, "w", encoding="utf-8") as f:
        f.write(updated)

    # Count changes for reporting
    sms_fixed   = original.count(BARE_SMS) - updated.count(BARE_SMS)
    cta_fixed   = (original.count(">Text Your Listing") -
                   updated.count(">Text Your Listing"))
    stat_fixed  = original.count('data-target=') - updated.count('data-target=')
    print(f"  ✓     {filename}  "
          f"(sms:{sms_fixed}  cta:{cta_fixed}  stats:{stat_fixed})"
          f"  backup → {os.path.basename(bak)}")


if __name__ == "__main__":
    print("\nNiagara Turnover Co. — Applying site-wide CTA fixes\n")
    print("NOTE: fort-erie.html was pre-fixed — replace it with the version")
    print("      from outputs/fort-erie.html before running this script.\n")

    for fname, fn in FILE_MAP.items():
        process(fname, fn)

    print("\nDone. Review each file, then delete the .bak_ backups when satisfied.")
    print("Run: git diff to see all changes before committing.\n")
