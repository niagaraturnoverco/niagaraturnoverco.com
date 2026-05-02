#!/usr/bin/env python3
"""
Niagara Turnover Co. — CRO Patch v2.0
======================================
Drop in repo root. Run:  python3 patch.py
Writes patched copies to ./patched/  (originals untouched).
Then:  cp patched/*.html . && git add -A && git commit -m 'cro patch v2' && git push

CHANGES APPLIED (all 13 HTML files):
  1. Pricing tiers: 1BR $140-175, 2BR $175-220, 3BR $220-275, 4BR+ $275-400+
  2. CTA text: "Check Availability First" everywhere
  3. CTA subcopy: "Send your listing link and turnover window..."
  4. Deposit framing: "$25 slot deposit... applied to your final price"
  5. Trust strip: 4 static proof stats (100% on-time, 7 cities, 0 missed, no contracts)
  6. FAQ: 4 new Q&As appended (pricing, deposit, recurring, flow)
  7. Blog CTAs: unified standard block on both articles
  8. Cost of Failure section (homepage + pricing page, above pricing)
  9. Who This Is For section (homepage + pricing page, above pricing)
 10. Recurring Coverage upsell (homepage + pricing page, after tier cards)
 11. pricing.html: own <title> and canonical tag
 12. JSON-LD schema: updated offer prices
"""

import os, re

REPO = os.path.dirname(os.path.abspath(__file__))
OUT  = os.path.join(REPO, "patched")
os.makedirs(OUT, exist_ok=True)

FILES = [
    "index.html", "pricing.html", "services.html", "confirmation.html",
    "airbnb-cleaner-cancelled-niagara.html", "airbnb-turnover-niagara-falls.html",
    "fort-erie.html", "niagara-falls.html", "niagara-on-the-lake.html",
    "port-colborne.html", "st-catharines.html", "thorold.html", "welland.html",
]

# ─── 1. PRICING ──────────────────────────────────────────────────────────────
def p_pricing(h):
    h = h.replace("$140\u2013$200", "$140\u2013$175")
    h = h.replace("$140-$200",      "$140\u2013$175")
    h = h.replace("$200\u2013$260", "$220\u2013$275")
    h = h.replace("$200-$260",      "$220\u2013$275")
    h = h.replace("$260\u2013$400+","$275\u2013$400+")
    h = h.replace("$260-$400+",     "$275\u2013$400+")
    h = h.replace("$140\u2013$320+","$140\u2013$400+")
    h = h.replace(
        "Pricing is based on unit size: 1\u20132BR is $140\u2013$200, 3BR is $200\u2013$260, 4+BR is $260\u2013$400+. Final price depends on laundry service, unit condition, and turnaround timing. Text your listing for an exact number in 15 minutes.",
        "Pricing is based on unit size: 1BR $140\u2013$175, 2BR $175\u2013$220, 3BR $220\u2013$275, 4BR+ $275\u2013$400+. Final price depends on laundry, unit condition, and turnaround timing. Text your listing for an exact number in 15 minutes."
    )
    # blog article list items
    h = h.replace("<li><strong>1\u20132 Bedroom units:</strong> $140\u2013$200 per turnover</li>",
                  "<li><strong>1 Bedroom:</strong> $140\u2013$175 per turnover</li>\n  <li><strong>2 Bedrooms:</strong> $175\u2013$220 per turnover</li>")
    h = h.replace("<li><strong>3 Bedroom units:</strong> $200\u2013$260 per turnover</li>",
                  "<li><strong>3 Bedrooms:</strong> $220\u2013$275 per turnover</li>")
    h = h.replace("<li><strong>4+ Bedroom units:</strong> $260\u2013$400+ per turnover</li>",
                  "<li><strong>4+ Bedrooms:</strong> $275\u2013$400+ per turnover</li>")
    for bad in ["$85", "$105", "$125"]:
        h = h.replace(bad, "[see exact quote]")
    return h

# ─── 2. CTA TEXT ─────────────────────────────────────────────────────────────
def p_cta(h):
    h = h.replace(">Reserve Your Turnover Slot \u2192<",    ">Check Availability First \u2192<")
    h = h.replace(">Reserve Your Turnover Slot \u2192</a>", ">Check Availability First \u2192</a>")
    h = h.replace(">Reserve Your Turnover Slot &rarr;<",    ">Check Availability First &rarr;<")
    h = h.replace(">Reserve Your Turnover Slot &rarr;</a>", ">Check Availability First &rarr;</a>")
    return h

# ─── 3. CTA SUBCOPY ──────────────────────────────────────────────────────────
def p_subcopy(h):
    h = h.replace("Takes 30 seconds \u2014 we confirm coverage before anything is booked",
                  "Send your listing link and turnover window. We confirm coverage before payment.")
    h = h.replace("Takes 30 seconds — we confirm coverage before anything is booked",
                  "Send your listing link and turnover window. We confirm coverage before payment.")
    h = h.replace("Unconfirmed slots are released to other hosts.",
                  "Availability confirmed in under 15 minutes \u00b7 No commitment until we say yes.")
    return h

# ─── 4. DEPOSIT FRAMING ──────────────────────────────────────────────────────
_D = "If coverage is available, a $25 slot deposit secures the turnover \u2014 applied to your final price."
def p_deposit(h):
    for old in [
        "$25 deposit \u00b7 applied to your turnover",
        "$25 deposit \u00b7 Applied to your turnover \u00b7 Availability confirmed first",
        "$25 deposit \u00b7 Applied to your turnover \u00b7 Slot locked immediately",
        "$25 deposit secures your slot \u00b7 Applied to your first turnover",
        "$25 deposit \u00b7 Availability confirmed first \u00b7 Applied to your turnover",
        "$25 deposit \u00b7 Applied to your turnover",
        "$25 deposit · applied to your turnover",
        "$25 deposit · Applied to your turnover · Availability confirmed first",
        "$25 deposit · Applied to your turnover · Slot locked immediately",
        "$25 deposit secures your slot · Applied to your first turnover",
        "$25 deposit · Availability confirmed first · Applied to your turnover",
        "$25 deposit · Applied to your turnover",
    ]:
        h = h.replace(old, _D)
    return h

# ─── 5. TRUST STRIP ──────────────────────────────────────────────────────────
_T_OLD = '    <div class="trust-row reveal d2">\n      <div class="trust-item hi"><span class="trust-dot"></span>3 hosts requested coverage today</div>\n      <div class="trust-item hi"><span class="trust-dot"></span>Limited spots this week</div>\n      <div class="trust-item"><span class="trust-dot"></span>4.9 Google Rating</div>\n      <div class="trust-item"><span class="trust-dot"></span>Registered Ontario Business</div>\n    </div>'
_T_NEW = '    <div class="trust-row reveal d2">\n      <div class="trust-item hi"><span class="trust-dot"></span>100% On-Time Check-In Protection</div>\n      <div class="trust-item hi"><span class="trust-dot"></span>7 Niagara Cities Covered</div>\n      <div class="trust-item"><span class="trust-dot"></span>0 Missed Check-Ins</div>\n      <div class="trust-item"><span class="trust-dot"></span>No Contracts Required</div>\n    </div>'
def p_trust(h): return h.replace(_T_OLD, _T_NEW)

# ─── 6. FAQ ───────────────────────────────────────────────────────────────────
_FAQ_MARKER = "      <div style=\"padding:0 1.4rem 1.1rem;\">We document everything with photos. Damage, missing items, or deteriorating condition is reported immediately \u2014 before the next guest sees it. If your unit isn\u2019t guest-ready by check-in, we fix it at no charge.</div>\n    </div>\n  </div>\n</div>\n</div>\n</section>"
_FAQ_ALSO   = "      <div style=\"padding:0 1.4rem 1.1rem;\">We document everything with photos. Damage, missing items, or deteriorating condition is reported immediately — before the next guest sees it. If your unit isn't guest-ready by check-in, we fix it at no charge.</div>\n    </div>\n  </div>\n</div>\n</div>\n</section>"
_FAQ_NEW_ITEMS = """
  <div class="faq-item" style="border-bottom:1px solid var(--border);">
    <button class="faq-q" style="width:100%;background:none;border:none;display:flex;justify-content:space-between;align-items:center;padding:1.1rem 1.4rem;text-align:left;color:var(--text);font-size:.88rem;font-weight:500;gap:1rem;cursor:pointer;transition:background .15s;">
      Why is your pricing higher than other Niagara cleaners?<span style="color:var(--gold);font-size:1.1rem;flex-shrink:0;transition:transform .3s;">+</span>
    </button>
    <div class="faq-a" style="max-height:0;overflow:hidden;transition:max-height .35s ease;font-size:.875rem;color:var(--muted);line-height:1.7;">
      <div style="padding:0 1.4rem 1.1rem;">We\u2019re not a cleaning service \u2014 we\u2019re a coverage system. Backup crew, photo confirmation, 24/7 dispatch, 100% on-time across 50+ turnovers. A cleaner who no-shows costs you $400+ in refunds and a 1-star review. We\u2019re priced for hosts who\u2019ve done that math.</div>
    </div>
  </div>
  <div class="faq-item" style="border-bottom:1px solid var(--border);">
    <button class="faq-q" style="width:100%;background:none;border:none;display:flex;justify-content:space-between;align-items:center;padding:1.1rem 1.4rem;text-align:left;color:var(--text);font-size:.88rem;font-weight:500;gap:1rem;cursor:pointer;transition:background .15s;">
      What happens to my $25 deposit if you can\u2019t cover my turnover?<span style="color:var(--gold);font-size:1.1rem;flex-shrink:0;transition:transform .3s;">+</span>
    </button>
    <div class="faq-a" style="max-height:0;overflow:hidden;transition:max-height .35s ease;font-size:.875rem;color:var(--muted);line-height:1.7;">
      <div style="padding:0 1.4rem 1.1rem;">Refunded immediately \u2014 same business day, same payment method. We only confirm the deposit after confirming availability, so this is rare. If it happens, you get your money back without asking.</div>
    </div>
  </div>
  <div class="faq-item" style="border-bottom:1px solid var(--border);">
    <button class="faq-q" style="width:100%;background:none;border:none;display:flex;justify-content:space-between;align-items:center;padding:1.1rem 1.4rem;text-align:left;color:var(--text);font-size:.88rem;font-weight:500;gap:1rem;cursor:pointer;transition:background .15s;">
      Do you offer recurring coverage for hosts with multiple listings?<span style="color:var(--gold);font-size:1.1rem;flex-shrink:0;transition:transform .3s;">+</span>
    </button>
    <div class="faq-a" style="max-height:0;overflow:hidden;transition:max-height .35s ease;font-size:.875rem;color:var(--muted);line-height:1.7;">
      <div style="padding:0 1.4rem 1.1rem;">Yes \u2014 and it\u2019s how most multi-unit hosts work with us. Recurring coverage: locked-in slots, priority dispatch, predictable pricing. Most hosts with 2+ listings save 4\u20136 hours per week. Mention \u201crecurring\u201d when you submit.</div>
    </div>
  </div>
  <div class="faq-item">
    <button class="faq-q" style="width:100%;background:none;border:none;display:flex;justify-content:space-between;align-items:center;padding:1.1rem 1.4rem;text-align:left;color:var(--text);font-size:.88rem;font-weight:500;gap:1rem;cursor:pointer;transition:background .15s;">
      Do I have to pay before you confirm availability?<span style="color:var(--gold);font-size:1.1rem;flex-shrink:0;transition:transform .3s;">+</span>
    </button>
    <div class="faq-a" style="max-height:0;overflow:hidden;transition:max-height .35s ease;font-size:.875rem;color:var(--muted);line-height:1.7;">
      <div style="padding:0 1.4rem 1.1rem;">No. Submit listing \u2192 confirm coverage in 15 min \u2192 see exact pricing \u2192 $25 deposit secures slot \u2192 full payment after turnover. If we can\u2019t cover you, you never enter payment.</div>
    </div>
  </div>"""

def p_faq(h):
    suffix = "\n</div>\n</div>\n</section>"
    for marker in [_FAQ_MARKER, _FAQ_ALSO]:
        if marker in h:
            replacement = marker.replace(suffix, _FAQ_NEW_ITEMS + suffix)
            h = h.replace(marker, replacement)
    return h

# ─── 7. BLOG CTAs ─────────────────────────────────────────────────────────────
_BLOG_NEW = '''<div class="article-cta-block">
  <h3>Need turnover coverage in Niagara?</h3>
  <p>Built for hosts who can\u2019t afford a failed check-in. Same-day coverage across all 7 Niagara cities \u2014 100% on-time, 0 missed check-ins, no contracts.</p>
  <a href="https://buy.stripe.com/14A14n9Z0dWTb4c86SfIs00" class="btn" onclick="if(typeof gtag!==\'undefined\')gtag(\'event\',\'deposit_click\',{event_category:\'Conversion\',event_label:\'Article CTA\'});">Check Availability First \u2192</a>
  <p style="margin-top:.6rem;font-size:.82rem;color:var(--muted);">Send your listing link and turnover window. We confirm coverage before payment.</p>
  <p style="margin-top:.4rem;font-size:.72rem;color:var(--gold);font-family:var(--mono);">If coverage is available, a $25 slot deposit secures the turnover \u2014 applied to your final price. No deposit if we can\u2019t cover you.</p>
  <p style="margin-top:.4rem;font-size:.7rem;color:var(--muted);font-family:var(--mono);">Or text your listing \u2192 <a href="tel:+12892577725" style="color:var(--gold);">(289) 257-7725</a></p>
</div>'''
def p_blog(h):
    return re.sub(r'<div class="article-cta-block">.*?</div>\s*</div>', _BLOG_NEW, h, flags=re.DOTALL)

# ─── 8+9. COST OF FAILURE + WHO THIS IS FOR ──────────────────────────────────
_COST_WHO = """
<!-- COST OF FAILURE -->
<section class="section" style="background:var(--bg2);border-bottom:1px solid var(--border);">
<div class="container">
  <div class="reveal" style="text-align:center;max-width:540px;margin:0 auto 2.5rem;">
    <span class="eyebrow">Why this isn\u2019t a price comparison</span>
    <h2>What a Single Missed Turnover <em>Actually Costs.</em></h2>
    <p style="color:var(--muted);font-size:.95rem;">The cheapest cleaner in Niagara isn\u2019t cheap if they don\u2019t show up.</p>
  </div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:var(--rl);overflow:hidden;" class="reveal">
    <div style="background:var(--bg3);padding:1.75rem;"><div style="font-family:var(--mono);font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:.6rem;">Refunded night</div><div style="font-family:var(--serif);font-size:1.8rem;line-height:1;background:var(--gold-grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:.5rem;">$200\u2013$450</div><p style="font-size:.82rem;color:var(--muted);line-height:1.6;margin:0;">A check-in delay or unclean unit means a partial or full refund \u2014 gone before your next guest.</p></div>
    <div style="background:var(--bg3);padding:1.75rem;"><div style="font-family:var(--mono);font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:.6rem;">1-star review</div><div style="font-family:var(--serif);font-size:1.8rem;line-height:1;background:var(--gold-grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:.5rem;">\u223c$1,800</div><p style="font-size:.82rem;color:var(--muted);line-height:1.6;margin:0;">Airbnb suppresses sub-4.7 listings. Lower ranking = fewer bookings for 30\u201390 days.</p></div>
    <div style="background:var(--bg3);padding:1.75rem;"><div style="font-family:var(--mono);font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:.6rem;">Emergency replacement</div><div style="font-family:var(--serif);font-size:1.8rem;line-height:1;background:var(--gold-grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:.5rem;">$250\u2013$400+</div><p style="font-size:.82rem;color:var(--muted);line-height:1.6;margin:0;">Last-minute panic-rate pricing \u2014 if you can find anyone within four hours.</p></div>
    <div style="background:var(--bg3);padding:1.75rem;"><div style="font-family:var(--mono);font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:.6rem;">Your Saturday</div><div style="font-family:var(--serif);font-size:1.8rem;line-height:1;background:var(--gold-grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:.5rem;">3\u20135 hrs</div><p style="font-size:.82rem;color:var(--muted);line-height:1.6;margin:0;">You drive to the unit, strip linens, scrub bathrooms, apologize to a guest in the driveway.</p></div>
  </div>
  <p style="text-align:center;margin-top:1.25rem;font-size:.88rem;color:var(--muted);font-style:italic;">A reliable turnover system costs less than one failure. That\u2019s the entire pitch.</p>
</div>
</section>
<!-- WHO THIS IS FOR -->
<section class="section" style="border-bottom:1px solid var(--border);">
<div class="container">
  <div class="reveal" style="text-align:center;max-width:540px;margin:0 auto 2.5rem;">
    <span class="eyebrow">Built for serious hosts</span>
    <h2>This Is Built for Hosts Who<br><em>Can\u2019t Afford a Failed Turnover.</em></h2>
    <p style="color:var(--muted);font-size:.95rem;">If a missed check-in costs you a 1-star review, a refund, or a repeat guest \u2014 this is for you.</p>
  </div>
  <div class="fit-grid reveal" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;">
    <div style="background:var(--bg3);border:1px solid var(--border);border-radius:var(--rl);padding:1.75rem;"><div style="font-family:var(--mono);font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:.75rem;">Multi-unit hosts</div><h3 style="margin-bottom:.5rem;">2+ listings, back-to-back bookings.</h3><p style="font-size:.85rem;color:var(--muted);line-height:1.65;margin:0;">One unreliable cleaner takes down your whole weekend. You need a system \u2014 not a person who \u201ctries their best.\u201d</p></div>
    <div style="background:var(--bg3);border:1px solid var(--border-gold);border-radius:var(--rl);padding:1.75rem;"><div style="font-family:var(--mono);font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:.75rem;">Remote &amp; out-of-town owners</div><h3 style="margin-bottom:.5rem;">You\u2019re not there to walk the unit.</h3><p style="font-size:.85rem;color:var(--muted);line-height:1.65;margin:0;">You need photo proof and a system that doesn\u2019t require your input. Photos land when the job is done \u2014 not when the guest messages you.</p></div>
    <div style="background:var(--bg3);border:1px solid var(--border);border-radius:var(--rl);padding:1.75rem;"><div style="font-family:var(--mono);font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:.75rem;">Premium &amp; high-rated listings</div><h3 style="margin-bottom:.5rem;">Your rate depends on a 5\u2605 score.</h3><p style="font-size:.85rem;color:var(--muted);line-height:1.65;margin:0;">A single sloppy turnover erases six months of reviews. Hosts charging $200+/night can\u2019t absorb that hit.</p></div>
  </div>
  <p style="text-align:center;margin-top:1.5rem;font-size:.82rem;color:var(--dim);font-style:italic;">If you\u2019re running a side rental and price is your only factor, we\u2019re probably not the right fit \u2014 and we\u2019d rather tell you that up front.</p>
</div>
</section>
"""

def p_cost_who(h, fname):
    if fname not in ("index.html", "pricing.html"): return h
    m = "\n<!-- PRICING PREVIEW -->"
    if m in h: h = h.replace(m, "\n" + _COST_WHO + "\n<!-- PRICING PREVIEW -->")
    return h

# ─── 10. RECURRING UPSELL ────────────────────────────────────────────────────
_RECUR = """
<!-- RECURRING COVERAGE UPSELL -->
<section style="background:linear-gradient(135deg,rgba(200,169,110,.06) 0%,var(--bg2) 60%);border-top:1px solid var(--border-gold);border-bottom:1px solid var(--border);padding:56px 0;">
<div class="container">
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;">
    <div class="reveal-l">
      <span class="eyebrow">For hosts with 2+ listings or weekly turnovers</span>
      <h2>Recurring Coverage.<br><em>Locked slots. Priority dispatch.</em></h2>
      <p style="color:var(--muted);font-size:.95rem;line-height:1.7;">One-off turnovers stop making sense when you\u2019re running back-to-back bookings. Recurring hosts get a system \u2014 not just a cleaner.</p>
      <div style="margin-top:1.5rem;display:flex;flex-direction:column;gap:.7rem;">
        <div style="display:flex;align-items:flex-start;gap:.75rem;"><span style="color:var(--gold);flex-shrink:0;">\u2713</span><div><strong style="color:var(--text);">Locked weekly slots</strong> \u2014 your windows reserved before other hosts can book</div></div>
        <div style="display:flex;align-items:flex-start;gap:.75rem;"><span style="color:var(--gold);flex-shrink:0;">\u2713</span><div><strong style="color:var(--text);">Priority dispatch</strong> \u2014 front of the queue in every emergency</div></div>
        <div style="display:flex;align-items:flex-start;gap:.75rem;"><span style="color:var(--gold);flex-shrink:0;">\u2713</span><div><strong style="color:var(--text);">Predictable per-turnover pricing</strong> \u2014 quoted across your full schedule</div></div>
        <div style="display:flex;align-items:flex-start;gap:.75rem;"><span style="color:var(--gold);flex-shrink:0;">\u2713</span><div><strong style="color:var(--text);">Single point of contact</strong> \u2014 one operator across every unit</div></div>
      </div>
      <p style="margin-top:1.25rem;font-size:.82rem;color:var(--muted);font-style:italic;">Most multi-unit Niagara hosts save 4\u20136 hours per week and one bad review per quarter.</p>
      <div style="margin-top:1.5rem;"><a href="https://buy.stripe.com/14A14n9Z0dWTb4c86SfIs00" class="btn" onclick="if(typeof gtag!==\'undefined\')gtag(\'event\',\'deposit_click\',{event_category:\'Conversion\',event_label:\'Recurring Upsell\'});">Ask About Recurring Coverage \u2192</a><p style="margin-top:.4rem;font-size:.72rem;color:var(--muted);font-family:var(--mono);">Mention \u201crecurring\u201d in your listing submission</p></div>
    </div>
    <div class="reveal-r">
      <div style="background:var(--bg3);border:1px solid var(--border-gold);border-radius:var(--rl);padding:2rem;">
        <div style="font-family:var(--mono);font-size:.65rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);margin-bottom:1rem;">What recurring coverage looks like</div>
        <div style="display:flex;flex-direction:column;gap:.75rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;padding:.75rem 1rem;background:var(--bg4);border-radius:var(--r);font-size:.85rem;"><span style="color:var(--muted);">Mon \u2014 check-in</span><span style="color:var(--green);font-family:var(--mono);font-size:.75rem;">\u2713 Covered</span></div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:.75rem 1rem;background:var(--bg4);border-radius:var(--r);font-size:.85rem;"><span style="color:var(--muted);">Wed \u2014 back-to-back</span><span style="color:var(--green);font-family:var(--mono);font-size:.75rem;">\u2713 Covered</span></div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:.75rem 1rem;background:var(--bg4);border-radius:var(--r);font-size:.85rem;"><span style="color:var(--muted);">Fri \u2014 emergency cancellation</span><span style="color:var(--green);font-family:var(--mono);font-size:.75rem;">\u2713 Priority dispatch</span></div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:.75rem 1rem;background:var(--bg4);border-radius:var(--r);font-size:.85rem;"><span style="color:var(--muted);">Sat \u2014 2 units, same window</span><span style="color:var(--green);font-family:var(--mono);font-size:.75rem;">\u2713 Coordinated</span></div>
        </div>
        <p style="margin-top:1rem;font-size:.78rem;color:var(--dim);font-family:var(--mono);">Zero calls. Zero coordination. Photos after each job.</p>
      </div>
    </div>
  </div>
</div>
</section>
"""

def p_recurring(h, fname):
    if fname not in ("index.html", "pricing.html"): return h
    m = '<a href="/pricing" style="color:var(--muted);text-decoration:underline;text-underline-offset:2px;font-size:.75rem;font-family:var(--mono);">See full pricing details \u2192</a>\n</div>\n</section>'
    if m in h: h = h.replace(m, m + _RECUR)
    return h

# ─── 11. PRICING PAGE META ────────────────────────────────────────────────────
def p_meta(h, fname):
    if fname != "pricing.html": return h
    h = h.replace("<title>Airbnb Turnover Cleaning Niagara Falls | Same-Day Backup Cleaning</title>",
                  "<title>Airbnb Turnover Pricing Niagara Region | Coverage Rates</title>")
    h = h.replace('<link rel="canonical" href="https://niagaraturnoverco.com">',
                  '<link rel="canonical" href="https://niagaraturnoverco.com/pricing">')
    h = h.replace('<meta property="og:url" content="https://niagaraturnoverco.com">',
                  '<meta property="og:url" content="https://niagaraturnoverco.com/pricing">')
    h = h.replace('<meta property="og:title" content="Airbnb Turnover Cleaning Niagara Falls | Same-Day Backup Cleaning">',
                  '<meta property="og:title" content="Airbnb Turnover Pricing Niagara Region | Coverage Rates">')
    return h

# ─── 12. JSON-LD ──────────────────────────────────────────────────────────────
def p_jsonld(h):
    h = h.replace('{"@type": "Offer", "name": "1-2 Bedroom Turnover", "price": "140", "priceCurrency": "CAD"}',
                  '{"@type": "Offer", "name": "1 Bedroom Turnover", "price": "140", "priceCurrency": "CAD"},\n      {"@type": "Offer", "name": "2 Bedroom Turnover", "price": "175", "priceCurrency": "CAD"}')
    h = h.replace('{"@type": "Offer", "name": "3 Bedroom Turnover", "price": "200", "priceCurrency": "CAD"}',
                  '{"@type": "Offer", "name": "3 Bedroom Turnover", "price": "220", "priceCurrency": "CAD"}')
    h = h.replace('{"@type": "Offer", "name": "4+ Bedroom Turnover", "price": "260", "priceCurrency": "CAD"}',
                  '{"@type": "Offer", "name": "4+ Bedroom Turnover", "price": "275", "priceCurrency": "CAD"}')
    h = h.replace('"text": "1-2 bedroom units: $140-$200. 3 bedroom: $200-$260. 4+ bedroom: $260-$400+. Final price depends on laundry, condition, and timing."',
                  '"text": "1BR: $140-$175. 2BR: $175-$220. 3BR: $220-$275. 4BR+: $275-$400+. Final price depends on laundry, condition, and timing."')
    return h

# ─── HERO SUBHEAD ────────────────────────────────────────────────────────────
def p_subhead(h):
    return h.replace(
        "Same-day coverage, backup cleaners, and full reset coordination across Niagara Region.</p>",
        "Same-day coverage, backup cleaners, and full reset coordination across Niagara Region. Built for hosts who can\u2019t afford a missed check-in.</p>"
    )

# ─── MASTER ───────────────────────────────────────────────────────────────────
def apply_all(h, fname):
    h = p_pricing(h)
    h = p_cta(h)
    h = p_subcopy(h)
    h = p_deposit(h)
    h = p_trust(h)
    h = p_faq(h)
    h = p_blog(h)
    h = p_cost_who(h, fname)
    h = p_recurring(h, fname)
    h = p_meta(h, fname)
    h = p_jsonld(h)
    h = p_subhead(h)
    return h

# ─── RUN ──────────────────────────────────────────────────────────────────────
print(f"\nNiagara Turnover Co. \u2014 CRO Patch v2.0")
print(f"Repo : {REPO}")
print(f"Out  : {OUT}\n")

done = skip = 0
for fname in FILES:
    src = os.path.join(REPO, fname)
    if not os.path.exists(src):
        print(f"  SKIP  {fname}")
        skip += 1; continue
    with open(src, encoding="utf-8") as f: orig = f.read()
    patched = apply_all(orig, fname)
    with open(os.path.join(OUT, fname), "w", encoding="utf-8") as f: f.write(patched)
    cta  = orig.count("Reserve Your Turnover Slot") - patched.count("Reserve Your Turnover Slot")
    prc  = orig.count("$140\u2013$200") + orig.count("$200\u2013$260") + orig.count("$260\u2013$400+")
    diff = len(patched) - len(orig)
    print(f"  \u2713  {fname:<52}  CTAs:{cta:>2}  prices:{prc}  \u0394chars:{diff:>+7}")
    done += 1

print(f"\n{done} files patched, {skip} not found.")
if skip:
    print("  \u2192 Make sure patch.py is in the repo root alongside the HTML files.")
print(f"\nDeploy:\n  cp patched/*.html .\n  git add -A && git commit -m 'cro patch v2' && git push")
