import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, MapPin, Phone, Calendar, ShieldCheck, Clock } from "lucide-react";

const SCHEDULING_URL =
  "https://airtable.com/app3bo82kH3gBbh7D/pagam8AZIIRd6Xqew/form";
const ONBOARDING_URL =
  "https://airtable.com/app3bo82kH3gBbh7D/pagfETpx8mh312gUE/form";
const PHONE_TEL = "tel:+12892577725";
const SITE = "https://niagara-turnover-flow.lovable.app";

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

      <header className="border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-serif text-lg">
            Niagara Turnover Co.
          </Link>
          <Button asChild size="sm" variant="outline">
            <a href={PHONE_TEL}>
              <Phone className="h-4 w-4 mr-2" /> Call
            </a>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <span>Service Area</span>
          <span className="mx-2">/</span>
          <span className="text-foreground">{data.name}</span>
        </nav>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4" />
          <span>{data.region}</span>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl mb-4">
          {data.name} Airbnb & STR Turnover Cleaning
        </h1>
        <p className="text-lg text-muted-foreground mb-8">{data.blurb}</p>

        <div className="flex flex-wrap gap-3 mb-12">
          <Button asChild size="lg">
            <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
              <Calendar className="h-4 w-4 mr-2" /> Client Scheduling <ArrowRight className="h-4 w-4 ml-2" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={ONBOARDING_URL} target="_blank" rel="noopener noreferrer">
              <ShieldCheck className="h-4 w-4 mr-2" /> Client On-Boarding
            </a>
          </Button>
        </div>

        <section className="mb-12">
          <h2 className="font-serif text-2xl mb-4">What we cover in {data.shortName ?? data.name}</h2>
          <ul className="space-y-2 text-muted-foreground">
            {data.highlights.map((h) => (
              <li key={h} className="flex gap-2">
                <Clock className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            Neighborhoods served: {data.neighborhoods.join(" · ")}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl mb-4">{data.name} turnover FAQs</h2>
          <Accordion type="single" collapsible className="w-full">
            {data.faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl mb-4">Other Niagara Region coverage</h2>
          <div className="flex flex-wrap gap-2">
            {CITIES.filter((c) => c.slug !== data.slug).map((c) => (
              <Link
                key={c.slug}
                to={`/service-area/${c.slug}`}
                className="text-sm px-3 py-2 rounded-md border border-border hover:border-primary transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CityLanding;
