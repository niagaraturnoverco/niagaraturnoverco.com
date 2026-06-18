import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Star,
  Camera,
  Check,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Zap,
} from "lucide-react";

const SCHEDULING_URL =
  "https://airtable.com/app3bo82kH3gBbh7D/pagam8AZIIRd6Xqew/form";
const ONBOARDING_URL =
  "https://airtable.com/app3bo82kH3gBbh7D/pagfETpx8mh312gUE/form";
const PHONE = "(289) 257-7725";
const PHONE_TEL = "tel:+12892577725";
const SITE = "https://niagara-turnover-flow.lovable.app";

const ext = { target: "_blank" as const, rel: "noopener noreferrer" as const };

type CityFaq = { q: string; a: string };
type City = {
  slug: string;
  name: string;
  shortName?: string;
  region: string;
  blurb: string;
  neighborhoods: string[];
  highlights: string[];
  faqs: CityFaq[];
};

const CITIES: City[] = [
  {
    slug: "niagara-falls",
    name: "Niagara Falls",
    region: "Niagara Region, Ontario",
    blurb:
      "Same-day Airbnb and STR turnover cleaning across Niagara Falls — from Fallsview and Lundy's Lane corridor to Chippawa and Stamford. Built for back-to-back guest stays.",
    neighborhoods: ["Fallsview", "Lundy's Lane", "Chippawa", "Stamford", "Mount Carmel"],
    highlights: [
      "Tourist-corridor turnovers with tight same-day windows",
      "Linen swap, restock, and photo-grade reset between guests",
      "Coordination with hosts on Airbnb, Vrbo and direct bookings",
    ],
    faqs: [
      {
        q: "Do you cover Fallsview and Lundy's Lane short-term rentals?",
        a: "Yes — Fallsview, Lundy's Lane, Clifton Hill area, Chippawa and Stamford are all inside our standard Niagara Falls turnover zone with same-day availability when slots are open.",
      },
      {
        q: "How fast can you turn a Niagara Falls Airbnb between checkout and check-in?",
        a: "Standard tourist-zone turnovers in Niagara Falls run in a 3–5 hour window. Confirm coverage first, then we lock the slot on your booking calendar.",
      },
      {
        q: "Do you handle linen and consumables for Niagara Falls STRs?",
        a: "Yes. We restock guest consumables, swap linens, and flag damage or low inventory before the next guest arrives so you avoid 1-star surprises.",
      },
      {
        q: "Can you support multiple Niagara Falls properties on a recurring basis?",
        a: "Operators with two or more Niagara Falls units should start with Client On-Boarding — that locks in priority dispatch and repeatable standards across your portfolio.",
      },
    ],
  },
  {
    slug: "st-catharines",
    name: "St. Catharines",
    region: "Niagara Region, Ontario",
    blurb:
      "Property turnover and STR cleaning across St. Catharines — Port Dalhousie, downtown, and Brock University rentals. Listing-ready resets for hosts and property managers.",
    neighborhoods: ["Port Dalhousie", "Downtown", "Glenridge", "Western Hill", "Brock area"],
    highlights: [
      "Student-rental and STR turnover between tenants",
      "Listing prep and photo-grade reset for relisting",
      "Recurring readiness for multi-unit portfolios",
    ],
    faqs: [
      {
        q: "Do you clean Airbnbs near Brock University and downtown St. Catharines?",
        a: "Yes — Glenridge, downtown, Western Hill and Port Dalhousie are part of our standard St. Catharines coverage. Same-day turnover when an opening exists.",
      },
      {
        q: "Can you reset a St. Catharines unit between student tenants?",
        a: "Yes. Move-out resets in St. Catharines are common around April–May. We deep clean, photograph the result, and hand it back listing-ready.",
      },
      {
        q: "Do you charge more for Port Dalhousie waterfront properties?",
        a: "Pricing follows property size and turnover scope, not postal code. Use the Cost of Failure Calculator or request a quote through Client Scheduling.",
      },
    ],
  },
  {
    slug: "niagara-on-the-lake",
    name: "Niagara-on-the-Lake",
    shortName: "NOTL",
    region: "Niagara Region, Ontario",
    blurb:
      "Premium STR turnover for Niagara-on-the-Lake — Old Town, wine-country estates, and Shaw Festival rentals. Discreet, photo-grade, guest-ready.",
    neighborhoods: ["Old Town", "Virgil", "St. Davids", "Queenston", "Wine Route estates"],
    highlights: [
      "Discreet, premium-tier service for high-rate NOTL listings",
      "Wine-country estate turnover and event reset",
      "Tight Shaw Festival weekend windows",
    ],
    faqs: [
      {
        q: "Do you service Niagara-on-the-Lake Old Town and wine-country rentals?",
        a: "Yes — Old Town, Virgil, St. Davids, Queenston and wine-route estates are all part of our NOTL coverage area.",
      },
      {
        q: "Can you handle a Shaw Festival weekend turnover?",
        a: "Yes. Festival weekends book up fast — confirm coverage early in the week so we can lock your turnover window before Saturday changeovers fill.",
      },
      {
        q: "Do you work with NOTL property managers running multiple cottages?",
        a: "Yes. Multi-property NOTL operators should start with Client On-Boarding for priority dispatch and consistent standards across each estate.",
      },
    ],
  },
  {
    slug: "welland",
    name: "Welland",
    region: "Niagara Region, Ontario",
    blurb:
      "STR, mid-term and move-out cleaning across Welland — canal-side rentals, Niagara College housing, and family-property turnovers.",
    neighborhoods: ["Downtown Welland", "Dain City", "Cooks Mills", "Niagara College area"],
    highlights: [
      "Mid-term and contractor housing turnover",
      "Move-out resets for sale or relisting",
      "Recurring readiness for Welland landlords",
    ],
    faqs: [
      {
        q: "Do you cover Welland and the Niagara College housing area?",
        a: "Yes — downtown Welland, Dain City, Cooks Mills and the Niagara College corridor are all inside our standard Welland coverage zone.",
      },
      {
        q: "Can you clean a Welland rental before I list it for sale?",
        a: "Yes. A pre-listing reset in Welland typically pays for itself in faster photos and stronger first-week showings.",
      },
    ],
  },
  {
    slug: "thorold",
    name: "Thorold",
    region: "Niagara Region, Ontario",
    blurb:
      "Turnover and move-out cleaning across Thorold — student rentals near Brock, canal-side homes, and recurring property readiness.",
    neighborhoods: ["Downtown Thorold", "Confederation Heights", "Allanburg", "Port Robinson"],
    highlights: [
      "Brock-adjacent student turnover",
      "Move-out resets and damage reporting",
      "Recurring readiness across Thorold rentals",
    ],
    faqs: [
      {
        q: "Do you clean Brock-adjacent student rentals in Thorold?",
        a: "Yes — Confederation Heights and downtown Thorold student units are core Thorold coverage, including end-of-lease deep cleans.",
      },
      {
        q: "How fast can you turn a Thorold unit between tenants?",
        a: "Standard Thorold move-out resets run inside a single working day when booked in advance. Same-day depends on calendar openings.",
      },
    ],
  },
  {
    slug: "port-colborne",
    name: "Port Colborne",
    region: "Niagara Region, Ontario",
    blurb:
      "Cottage, lakefront and STR turnover across Port Colborne — Sugarloaf Marina area, Nickel Beach rentals, and seasonal property readiness.",
    neighborhoods: ["Sugarloaf", "Nickel Beach", "Downtown Port Colborne", "Sherkston-adjacent"],
    highlights: [
      "Lakefront cottage turnover between guest weeks",
      "Seasonal open-up and close-down resets",
      "Coordination with marina and beach-area hosts",
    ],
    faqs: [
      {
        q: "Do you service Port Colborne cottages and Nickel Beach rentals?",
        a: "Yes — Sugarloaf, Nickel Beach and Sherkston-adjacent properties are part of our standard Port Colborne coverage area.",
      },
      {
        q: "Can you handle a Saturday cottage turnover in Port Colborne?",
        a: "Saturdays are the peak turnover day in Port Colborne. Confirm coverage early in the week — Saturday slots are the first to fill.",
      },
    ],
  },
  {
    slug: "fort-erie",
    name: "Fort Erie",
    region: "Niagara Region, Ontario",
    blurb:
      "STR and cottage turnover across Fort Erie — Crystal Beach, Ridgeway, and Bay Beach rentals. Photo-grade reset for waterfront listings.",
    neighborhoods: ["Crystal Beach", "Ridgeway", "Bay Beach", "Stevensville", "Downtown Fort Erie"],
    highlights: [
      "Crystal Beach and Bay Beach STR turnover",
      "Cottage-week resets and inventory restock",
      "Recurring coverage for Ridgeway hosts",
    ],
    faqs: [
      {
        q: "Do you cover Crystal Beach and Ridgeway Airbnbs?",
        a: "Yes — Crystal Beach, Bay Beach, Ridgeway and Stevensville are part of our standard Fort Erie turnover coverage.",
      },
      {
        q: "Can you turn a Crystal Beach cottage in a single afternoon?",
        a: "Standard Crystal Beach turnovers run 3–5 hours depending on guest count and bedroom count. Confirm coverage first to lock the slot.",
      },
    ],
  },
];

export const CITY_SLUGS = CITIES.map((c) => c.slug);

const PRICING: { size: string; price: string }[] = [
  { size: "1 Bedroom", price: "$199" },
  { size: "2 Bedroom", price: "$269" },
  { size: "3 Bedroom", price: "$329" },
  { size: "4 Bedroom", price: "$399" },
  { size: "5+ Bedroom", price: "$499+" },
];

const CityLogo = () => (
  <div className="flex items-center gap-2.5">
    <div className="relative h-10 w-10 shrink-0">
      <div className="absolute inset-0 rounded-lg bg-gradient-gold shadow-gold" />
      <div className="absolute inset-[1px] rounded-[7px] flex items-center justify-center bg-background">
        <span className="font-serif text-base gold-text">NT</span>
      </div>
    </div>
    <div className="leading-tight">
      <div className="font-serif text-base">Niagara Turnover Co.</div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        Property Readiness
      </div>
    </div>
  </div>
);

const CityLanding = () => {
  const { city } = useParams<{ city: string }>();
  const data = CITIES.find((c) => c.slug === city);

  if (!data) return <Navigate to="/" replace />;

  const url = `${SITE}/service-area/${data.slug}`;
  const title = `${data.name} Airbnb & STR Turnover Cleaning | Niagara Turnover Co.`;
  const description = `Premium Airbnb, STR & property turnover cleaning in ${data.name}, ${data.region}. Same-day coverage, listing-ready resets, recurring readiness for operators.`;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Service Area", item: `${SITE}/#service-area` },
      { "@type": "ListItem", position: 3, name: data.name, item: url },
    ],
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Airbnb & STR Turnover Cleaning",
    provider: { "@id": `${SITE}/#business` },
    areaServed: {
      "@type": "City",
      name: data.name,
      containedInPlace: { "@type": "AdministrativeArea", name: data.region },
    },
    url,
    name: `${data.name} Turnover Cleaning`,
    description,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>
      </Helmet>

      {/* Alert bar — matches main site */}
      <div className="bg-gradient-gold text-primary-foreground text-xs sm:text-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
          <span className="font-medium">
            Coverage is confirmed before scheduling. Urgent:{" "}
            <a href={PHONE_TEL} className="underline underline-offset-2 font-semibold">
              {PHONE}
            </a>
          </span>
        </div>
      </div>

      {/* Sticky nav — matches main site */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center"><CityLogo /></Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <Link to="/#intake" className="hover:text-foreground">Submit Request</Link>
            <Link to="/#services" className="hover:text-foreground">Services</Link>
            <Link to="/#pricing" className="hover:text-foreground">Pricing</Link>
            <Link to="/#faq" className="hover:text-foreground">FAQ</Link>
          </nav>
          <a
            href={SCHEDULING_URL}
            {...ext}
            className="hidden sm:inline-flex min-h-[46px] items-center justify-center gap-1.5 rounded-xl bg-gradient-gold px-4 text-xs font-semibold text-primary-foreground shadow-gold border border-primary/30 transition hover:brightness-110 active:scale-[0.98] focus-gold"
          >
            Request Scheduling <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 ntc-grid-bg opacity-30" />
          <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,hsl(43_65%_58%/0.18),transparent_60%)]" />
          <div className="relative mx-auto max-w-5xl px-4 py-14 sm:py-20">
            <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-6">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <span className="mx-2">/</span>
              <span>Service Area</span>
              <span className="mx-2">/</span>
              <span className="text-foreground">{data.name}</span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-primary">
              <MapPin className="h-3 w-3" /> {data.region}
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl mt-5 leading-[1.02]">
              <span className="gold-text italic">{data.name}</span> Airbnb & STR<br />turnover cleaning.
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mt-5 max-w-2xl">{data.blurb}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={SCHEDULING_URL}
                {...ext}
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-gradient-gold px-6 text-sm font-semibold text-primary-foreground shadow-gold border border-primary/30 transition hover:brightness-110 active:scale-[0.98] focus-gold cta-attention"
              >
                Request Client Scheduling <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={ONBOARDING_URL}
                {...ext}
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border-2 border-primary/60 bg-primary/10 px-6 text-sm font-semibold focus-gold"
              >
                Client On-Boarding
              </a>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="gold-pill"><ShieldCheck className="h-3 w-3" /> Coverage confirmed first</span>
              <span className="gold-pill"><Star className="h-3 w-3 fill-primary" /> ★★★★★ Verified Niagara reviews</span>
              <span className="gold-pill"><Camera className="h-3 w-3" /> Photo proof available</span>
            </div>
          </div>
        </section>

        {/* COVERAGE / HIGHLIGHTS */}
        <section className="ntc-gold-halo mx-auto max-w-5xl px-4 py-14 sm:py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-primary">
            <Sparkles className="h-3 w-3" /> What we cover
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl mt-4">
            What turnover looks like in <span className="gold-text">{data.shortName ?? data.name}.</span>
          </h2>

          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {data.highlights.map((h) => (
              <li key={h} className="premium-card p-5 flex gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                <span className="text-sm">{h}</span>
              </li>
            ))}
          </ul>

          <p className="text-sm text-muted-foreground mt-6">
            Neighborhoods served: <span className="text-foreground">{data.neighborhoods.join(" · ")}</span>
          </p>
        </section>

        {/* PRICING REFERENCE — paper surface, matches main site */}
        <section className="section-paper">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:py-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(36_55%_40%/0.35)] bg-[hsl(43_65%_58%/0.10)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[hsl(var(--gold-deep))]">
              <Sparkles className="h-3 w-3" /> {data.shortName ?? data.name} Pricing
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl mt-4 ink">
              Simple starting points. <span className="text-[hsl(var(--gold-deep))]">Final price confirmed after scope.</span>
            </h2>
            <p className="ink-muted mt-3 max-w-2xl">
              Pricing depends on size, condition, laundry, access, timing, and urgency. Same starting rates apply across the Niagara Region.
            </p>

            <div className="paper-card p-7 mt-8 shadow-elegant">
              <div className="divide-y hairline">
                {PRICING.map((p) => (
                  <div key={p.size} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3">
                    <span className="ink inline-flex items-center gap-2.5 min-w-[120px]">
                      <Check className="h-4 w-4 text-[hsl(var(--gold-deep))]" strokeWidth={3} />
                      {p.size}
                    </span>
                    <span className="font-serif text-xl text-[hsl(var(--gold-deep))] ml-auto sm:ml-0">{p.price}</span>
                    <a
                      href={`${SCHEDULING_URL}?utm_source=city_${data.slug}&size=${encodeURIComponent(p.size)}`}
                      {...ext}
                      className="inline-flex min-h-[42px] items-center gap-1.5 rounded-lg border border-[hsl(var(--ink))] bg-[hsl(var(--ink))] px-3.5 text-xs font-semibold text-[hsl(var(--paper))] transition hover:bg-[hsl(0_0%_15%)] focus-gold w-full sm:w-auto justify-center"
                    >
                      Check availability <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                ))}
              </div>
              <p className="text-xs ink-muted mt-5">
                Same-day under 24h: <span className="font-semibold text-[hsl(var(--gold-deep))]">+50% rush fee</span>. Heavy reset / deep clean from $299. See the main site for the full breakdown.
              </p>
            </div>
          </div>
        </section>

        {/* PREMIUM CTA CARD — matches main intake card style */}
        <section className="ntc-gold-halo mx-auto max-w-5xl px-4 py-14 sm:py-16">
          <div className="premium-card p-7 sm:p-10 relative overflow-hidden">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
            <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-primary">
                  <Zap className="h-3 w-3" /> {data.shortName ?? data.name} · Same-day available
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl mt-4">
                  Coverage for {data.name} properties — <span className="gold-text">confirmed before scheduling.</span>
                </h2>
                <p className="text-muted-foreground mt-3 max-w-xl">
                  No payment before coverage is confirmed. Same-day requests are reviewed first. Recurring operators get priority dispatch through On-Boarding.
                </p>
                <ul className="mt-5 grid sm:grid-cols-2 gap-2.5 max-w-xl text-sm">
                  {[
                    "No payment before coverage is confirmed",
                    "Same-day requests reviewed first",
                    "Photo proof available on request",
                    "Priority dispatch for recurring operators",
                  ].map((p) => (
                    <li key={p} className="flex gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" strokeWidth={3} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-5 flex flex-col gap-3">
                <a
                  href={`${SCHEDULING_URL}?utm_source=city_${data.slug}`}
                  {...ext}
                  className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-xl bg-gradient-gold px-6 text-sm font-semibold text-primary-foreground shadow-gold border border-primary/30 transition hover:brightness-110 active:scale-[0.98] focus-gold cta-attention"
                >
                  Request Client Scheduling <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={`${ONBOARDING_URL}?utm_source=city_${data.slug}`}
                  {...ext}
                  className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border-2 border-primary/60 bg-primary/10 px-6 text-sm font-semibold focus-gold"
                >
                  Client On-Boarding
                </a>
                <a
                  href={PHONE_TEL}
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-border bg-card/60 px-6 text-sm font-semibold hover:border-primary/40"
                >
                  <Phone className="h-4 w-4" /> Call {PHONE}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ — matches main site styling */}
        <section className="mx-auto max-w-5xl px-4 py-14 sm:py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-primary">
            <HelpCircle className="h-3 w-3" /> {data.shortName ?? data.name} FAQ
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl mt-4">
            {data.name} turnover <span className="gold-text">questions.</span>
          </h2>

          <Accordion type="single" collapsible className="mt-8 space-y-3">
            {data.faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-border rounded-xl bg-card px-5 data-[state=open]:border-primary/40 data-[state=open]:border-l-2 data-[state=open]:border-l-primary transition-colors"
              >
                <AccordionTrigger className="text-left font-medium hover:no-underline py-5 text-base gap-3">
                  <span className="inline-flex items-start gap-3 flex-1">
                    <HelpCircle className="h-4 w-4 text-primary shrink-0 mt-1" />
                    <span>{f.q}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 text-sm leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* OTHER CITIES */}
        <section className="mx-auto max-w-5xl px-4 py-14 sm:py-16 border-t border-border/60">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-primary">
            <MapPin className="h-3 w-3" /> Other Niagara Coverage
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl mt-4">
            Also covering the <span className="gold-text">rest of the region.</span>
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {CITIES.filter((c) => c.slug !== data.slug).map((c) => (
              <Link
                key={c.slug}
                to={`/service-area/${c.slug}`}
                className="gold-underline inline-flex min-h-[42px] items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 text-sm hover:border-primary/40 hover:bg-primary/[0.06] transition"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-border/60 pb-28 md:pb-12 mt-8">
          <div className="mx-auto max-w-7xl px-4 py-10 grid gap-6 md:grid-cols-3 text-sm">
            <div>
              <CityLogo />
              <p className="text-xs text-muted-foreground/80 mt-4 flex items-center gap-1.5">
                <ShieldCheck className="h-3 w-3 text-primary" /> Coverage confirmed before scheduling
              </p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-primary">Contact</div>
              <ul className="mt-3 space-y-2">
                <li><a href={PHONE_TEL} className="flex items-center gap-2 hover:text-primary"><Phone className="h-4 w-4" /> {PHONE}</a></li>
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-primary">Coverage</div>
              <p className="text-muted-foreground mt-3">
                Niagara Falls · St. Catharines · NOTL · Welland · Thorold · Port Colborne · Fort Erie
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* STICKY MOBILE BAR — matches main site */}
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden safe-bottom border-t border-border/80 bg-background/95 backdrop-blur">
        <div className="grid grid-cols-5 gap-2 p-2.5">
          <a
            href={PHONE_TEL}
            className="col-span-3 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-gold px-4 text-sm font-semibold text-primary-foreground shadow-gold border border-primary/30 focus-gold cta-attention"
          >
            <Phone className="h-4 w-4" /> Call Now
          </a>
          <a
            href={`${SCHEDULING_URL}?utm_source=city_${data.slug}_mobile`}
            {...ext}
            className="col-span-2 inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl border-2 border-primary/60 bg-primary/10 px-2 text-sm font-semibold focus-gold leading-tight"
          >
            Get a Quote <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CityLanding;
