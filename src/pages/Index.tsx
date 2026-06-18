import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import {
  Phone,
  Calendar,
  ShieldCheck,
  Clock,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Check,
  AlertTriangle,
  AlertOctagon,
  Sparkles,
  Building2,
  Home,
  Briefcase,
  Star,
  Mail,
  MessageSquare,
  Quote,
  ClipboardList,
  Route,
  BadgeCheck,
  HelpCircle,
  Calculator,
  TrendingUp,
  Zap,
  Camera,
} from "lucide-react";

import partnerSherkston from "@/assets/partner-sherkston.jpg";
import beforeAfterBedroomBlue from "@/assets/before-after-bedroom-blue.png.asset.json";
import beforeAfterBedroomRose from "@/assets/before-after-bedroom-rose.png.asset.json";
import beforeAfterPiano from "@/assets/before-after-piano.png.asset.json";
import beforeAfterLounge from "@/assets/before-after-lounge.png.asset.json";
import beforeAfterHallway from "@/assets/before-after-hallway.png.asset.json";
import luxuryLivingBright from "@/assets/luxury-living-bright.jpg.asset.json";
import luxuryVacantApartment from "@/assets/luxury-vacant-apartment.jpg.asset.json";
import luxuryVacantKitchen from "@/assets/luxury-vacant-kitchen.jpg.asset.json";
import luxuryTropicalKitchen from "@/assets/luxury-tropical-kitchen.jpg.asset.json";
import luxuryLoftStair from "@/assets/luxury-loft-stair.jpg.asset.json";
import luxuryBathSuite from "@/assets/luxury-bath-suite.jpg.asset.json";
import luxuryExtra01 from "@/assets/luxury-extra-01.webp.asset.json";
import luxuryExtra02 from "@/assets/luxury-extra-02.webp.asset.json";
import luxuryExtra03 from "@/assets/luxury-extra-03.webp.asset.json";
import luxuryExtra04 from "@/assets/luxury-extra-04.webp.asset.json";
import luxuryExtra05 from "@/assets/luxury-extra-05.webp.asset.json";
import luxuryExtra06 from "@/assets/luxury-extra-06.webp.asset.json";
import luxuryExtra07 from "@/assets/luxury-extra-07.webp.asset.json";
import luxuryExtra08 from "@/assets/luxury-extra-08.webp.asset.json";
import luxuryExtra09 from "@/assets/luxury-extra-09.webp.asset.json";
import luxuryExtra10 from "@/assets/luxury-extra-10.webp.asset.json";
import luxuryExtra11 from "@/assets/luxury-extra-11.webp.asset.json";
import luxuryExtra12 from "@/assets/luxury-extra-12.webp.asset.json";
import luxuryExtra13 from "@/assets/luxury-extra-13.webp.asset.json";
import luxuryExtra14 from "@/assets/luxury-extra-14.webp.asset.json";
import luxuryExtra15 from "@/assets/luxury-extra-15.webp.asset.json";
import luxuryExtra16 from "@/assets/luxury-extra-16.webp.asset.json";
import luxuryExtra17 from "@/assets/luxury-extra-17.webp.asset.json";
import luxuryExtra18 from "@/assets/luxury-extra-18.webp.asset.json";
import luxuryExtra19 from "@/assets/luxury-extra-19.webp.asset.json";
import luxuryExtra20 from "@/assets/luxury-extra-20.webp.asset.json";
import luxuryExtra21 from "@/assets/luxury-extra-21.webp.asset.json";
import luxuryExtra22 from "@/assets/luxury-extra-22.webp.asset.json";
import luxuryExtra23 from "@/assets/luxury-extra-23.webp.asset.json";
import luxuryExtra24 from "@/assets/luxury-extra-24.webp.asset.json";
import luxuryExtra25 from "@/assets/luxury-extra-25.webp.asset.json";
import luxuryExtra26 from "@/assets/luxury-extra-26.webp.asset.json";
import luxuryExtra27 from "@/assets/luxury-extra-27.webp.asset.json";
import luxuryExtra28 from "@/assets/luxury-extra-28.webp.asset.json";
import luxuryExtra29 from "@/assets/luxury-extra-29.webp.asset.json";
import luxuryExtra30 from "@/assets/luxury-extra-30.webp.asset.json";
import luxuryExtra31 from "@/assets/luxury-extra-31.webp.asset.json";
import luxuryExtra32 from "@/assets/luxury-extra-32.webp.asset.json";
import luxuryExtra33 from "@/assets/luxury-extra-33.webp.asset.json";
import luxuryExtra34 from "@/assets/luxury-extra-34.webp.asset.json";
import luxuryExtra35 from "@/assets/luxury-extra-35.webp.asset.json";
import luxuryExtra36 from "@/assets/luxury-extra-36.webp.asset.json";
import luxuryExtra37 from "@/assets/luxury-extra-37.webp.asset.json";

// Each WebP is referenced exactly once across the page.
// Reserved for standalone slots (services, readiness grid, inline section images, final CTA):
//   L1 loftStair, L2 livingBright, L3 vacantKitchen, L4 vacantApartment, L5 tropicalKitchen,
//   L6 bathSuite, E01, E03, E11, E13, E16, E25 — 12 standalone images
// HERO carousel below uses 23 unique extras; TESTIMONIAL_IMAGES below uses 8 unique extras.
// 12 + 23 + 8 = 43 unique WebPs, no duplicates anywhere.
const HERO_IMAGES = [
  { src: luxuryExtra02.url, alt: "Contemporary lounge area styled for a polished short-term rental presentation" },
  { src: luxuryExtra05.url, alt: "Bright modern interior detail presented at operator-grade readiness" },
  { src: luxuryExtra06.url, alt: "Warm contemporary living room reset for short-term rental turnover" },
  { src: luxuryExtra08.url, alt: "Considered furniture vignette prepared to a high-presentation standard" },
  { src: luxuryExtra09.url, alt: "Polished interior space ready for a premium check-in moment" },
  { src: luxuryExtra12.url, alt: "Premium bedroom and styling detail prepared for guest arrival" },
  { src: luxuryExtra14.url, alt: "Calm, neutral living area prepared for a premium short-term rental check-in" },
  { src: luxuryExtra17.url, alt: "Bright open living space refreshed for guest readiness" },
  { src: luxuryExtra18.url, alt: "Curated interior space presented at hospitality-grade standards" },
  { src: luxuryExtra19.url, alt: "Sophisticated living detail reset for a premium turnover" },
  { src: luxuryExtra21.url, alt: "Refined home detail prepared for a guest-ready arrival" },
  { src: luxuryExtra22.url, alt: "Warm, considered interior reset to operator-grade readiness" },
  { src: luxuryExtra23.url, alt: "Modern interior corner styled for a polished check-in moment" },
  { src: luxuryExtra26.url, alt: "Contemporary lounge styled for a polished guest experience" },
  { src: luxuryExtra27.url, alt: "Elegant interior vignette presented at premium readiness" },
  { src: luxuryExtra29.url, alt: "Tasteful living area reset to a turnover-ready finish" },
  { src: luxuryExtra30.url, alt: "Bright modern interior detail at hospitality-grade standard" },
  { src: luxuryExtra31.url, alt: "Considered home interior styled for a premium check-in" },
  { src: luxuryExtra32.url, alt: "Refined property interior reset for short-term rental readiness" },
  { src: luxuryExtra34.url, alt: "Warm, light-filled space reset to listing-ready condition" },
  { src: luxuryExtra35.url, alt: "Contemporary interior styled to a polished hospitality standard" },
  { src: luxuryExtra36.url, alt: "Modern home moment prepared for a premium turnover" },
  { src: luxuryExtra37.url, alt: "Refined interior detail reset for a guest-ready presentation" },
];

const TESTIMONIAL_IMAGES = [
  luxuryExtra04.url,
  luxuryExtra07.url,
  luxuryExtra10.url,
  luxuryExtra15.url,
  luxuryExtra20.url,
  luxuryExtra24.url,
  luxuryExtra28.url,
  luxuryExtra33.url,
];





const SCHEDULING_URL =
  "https://airtable.com/app3bo82kH3gBbh7D/pagam8AZIIRd6Xqew/form";
const ONBOARDING_URL =
  "https://airtable.com/app3bo82kH3gBbh7D/pagfETpx8mh312gUE/form";
const PHONE = "(289) 257-7725";
const PHONE_TEL = "tel:+12892577725";
const PHONE_SMS = "sms:+12892577725";

const track = (event: string, payload?: Record<string, unknown>) => {
  // @ts-expect-error dataLayer is optional
  if (typeof window !== "undefined" && window.dataLayer) {
    // @ts-expect-error dataLayer is optional
    window.dataLayer.push({ event, ...payload });
  }
};

const ext = { target: "_blank" as const, rel: "noopener noreferrer" as const };

const Logo = ({ className = "", onPaper = false }: { className?: string; onPaper?: boolean }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <div className="relative h-10 w-10 shrink-0">
      <div className="absolute inset-0 rounded-lg bg-gradient-gold shadow-gold" />
      <div className={`absolute inset-[1px] rounded-[7px] flex items-center justify-center ${onPaper ? "bg-[hsl(var(--paper))]" : "bg-background"}`}>
        <span className="font-serif text-base gold-text">NT</span>
      </div>
    </div>
    <div className="leading-tight">
      <div className="font-serif text-base">Niagara Turnover Co.</div>
      <div className={`text-[10px] uppercase tracking-[0.18em] ${onPaper ? "ink-muted" : "text-muted-foreground"}`}>
        Property Readiness
      </div>
    </div>
  </div>
);

const SectionLabel = ({ children, onPaper = false }: { children: React.ReactNode; onPaper?: boolean }) => (
  <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.18em] ${
    onPaper
      ? "border-[hsl(36_55%_40%/0.35)] bg-[hsl(43_65%_58%/0.10)] text-[hsl(var(--gold-deep))]"
      : "border-primary/30 bg-primary/5 text-primary"
  }`}>
    <Sparkles className="h-3 w-3" />
    {children}
  </div>
);

const PrimaryCTA = ({
  children,
  source,
  className = "",
}: {
  children: React.ReactNode;
  source: string;
  className?: string;
}) => (
  <a
    href={SCHEDULING_URL}
    {...ext}
    onClick={() => track("cta_scheduling", { source })}
    className={`inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-gradient-gold px-6 text-sm font-semibold text-primary-foreground shadow-gold border border-primary/30 transition hover:brightness-110 hover:shadow-[0_20px_60px_-20px_hsl(43_70%_55%/0.55)] active:scale-[0.98] focus-gold ${className}`}
  >
    {children}
    <ArrowRight className="h-4 w-4" />
  </a>
);

const SecondaryCTA = ({
  children,
  source,
  className = "",
  onPaper = false,
}: {
  children: React.ReactNode;
  source: string;
  className?: string;
  onPaper?: boolean;
}) => (
  <a
    href={ONBOARDING_URL}
    {...ext}
    onClick={() => track("cta_onboarding", { source })}
    className={`inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold transition active:scale-[0.98] focus-gold ${
      onPaper
        ? "border-2 border-[hsl(var(--ink))] bg-transparent text-[hsl(var(--ink))] hover:bg-[hsl(var(--ink))] hover:text-[hsl(var(--paper))]"
        : "border-2 border-primary/60 bg-primary/10 text-foreground hover:bg-primary/[0.15]"
    } ${className}`}
  >
    {children}
  </a>
);

const Initials = ({ name }: { name: string }) => {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-gold flex items-center justify-center font-serif text-sm text-primary-foreground shadow-gold">
      {initials}
    </div>
  );
};


const Index = () => {
  const [rate, setRate] = useState<number>(220);
  const [nights, setNights] = useState<number>(2);
  const [bedrooms, setBedrooms] = useState<number>(2);
  const [quiz, setQuiz] = useState<{
    urgent: boolean | null;
    laundry: boolean | null;
    vacant: boolean | null;
    recurring: boolean | null;
  }>({ urgent: null, laundry: null, vacant: null, recurring: null });

  // Hero image rotator — cycles every 5 seconds
  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // NTC starting price by bedroom count — mirrors pricing table
  const ntcPriceByBedroom: Record<number, number> = { 1: 199, 2: 269, 3: 329, 4: 399, 5: 499 };

  const calc = useMemo(() => {
    const cancellation = rate * nights;
    const rebooking = rate * 2 * 0.5;
    // Scaled review/reputation risk: ~4 future nights of lost bookings, defensible math
    const review = Math.round(rate * 4);
    const coord = 150;
    const total = cancellation + rebooking + review + coord;
    const ntcPrice = ntcPriceByBedroom[Math.min(5, Math.max(1, bedrooms))] ?? 329;
    return { cancellation, rebooking, review, coord, total, ntcPrice };
  }, [rate, nights, bedrooms]);

  const quizResult = useMemo<string | null>(() => {
    const { urgent, laundry, vacant, recurring } = quiz;
    if (urgent === null || laundry === null || vacant === null || recurring === null) return null;
    if (urgent) return "Emergency Turnover Coverage";
    if (recurring) return "Recurring Turnover Support";
    if (!vacant) return "Heavy Reset / Deep Clean";
    if (laundry) return "Turnover with Laundry Reset";
    return "Property Readiness / Listing Prep";
  }, [quiz]);


  const risks = [
    ["01", "Guest checks in before the unit is ready", "Refunds, one-star reviews, and listing penalties land within hours."],
    ["02", "Listing photos or showings happen too soon", "The property sells or rents itself short — and you only see it later."],
    ["03", "The cleaner confirms — then cancels the morning of check-in", "By the time you find out, you have hours, not days, to recover the booking."],
  ];


  const services = [
    {
      icon: AlertTriangle,
      title: "Emergency Turnover Coverage",
      desc: "Backup cleaner failed. Guest checks in tonight. We route fast.",
      points: ["Same-day & last-minute requests", "Backup cleaner coverage", "Rush dispatch under 24h"],
      featured: true,
      image: luxuryVacantApartment.url,
      alt: "Vacant premium apartment interior ready for a same-day turnover response",
    },
    {
      icon: Sparkles,
      title: "Property Readiness / Listing Prep",
      desc: "Camera-ready, showing-ready, guest-ready.",
      points: ["Listing prep for realtors", "Move-in / move-out resets", "Heavy reset & deep clean"],
      image: luxuryVacantKitchen.url,
      alt: "Modern vacant kitchen prepared to a listing-ready standard",
    },
    {
      icon: ShieldCheck,
      title: "Recurring Turnover Support",
      desc: "Ongoing readiness for hosts, managers, and operators.",
      points: ["Priority scheduling", "Account & property setup", "Readiness tracking"],
      image: luxuryLoftStair.url,
      alt: "Luxury loft interior reflecting recurring multi-property readiness standards",
    },
  ];

  const pricing = [
    { size: "1 Bedroom", price: "$199" },
    { size: "2 Bedroom", price: "$269" },
    { size: "3 Bedroom", price: "$329" },
    { size: "4 Bedroom", price: "$399" },
    { size: "5+ Bedroom", price: "$499+" },
  ];

  const addons: [string, string][] = [
    ["Heavy Reset / Deep Clean", "+$299"],
    ["Laundry Reset", "+$59 / load"],
    ["Laundry Reset (up to 3 loads)", "+$180"],
    ["Oven Interior Clean", "+$49"],
    ["Pet Hair Reset", "+$99"],
    ["Guest-Ready Photo Proof", "+$29"],
    ["Full Property Report", "+$79"],
  ];

  const recurring = [
    { name: "Host Essentials", price: "from $199/mo" },
    { name: "Starter Coverage", price: "from $399/mo" },
    { name: "Growth Coverage", price: "from $799/mo" },
    { name: "Operator Coverage", price: "from $1,499/mo" },
  ];

  const audience = [
    { icon: Home, label: "Airbnb / STR Hosts" },
    { icon: Building2, label: "Property Managers" },
    { icon: Briefcase, label: "Realtors / Brokers" },
    { icon: Building2, label: "Investors / Developers" },
    { icon: Home, label: "Homeowners" },
  ];

  // NOTE: Testimonial copy below is placeholder crisis→outcome wording shaped to
  // counter the "why not just a cheaper cleaner" objection. Replace with real
  // verbatim or lightly paraphrased client quotes when available.
  const testimonials = [
    {
      name: "Niagara Falls Host",
      quote: "My turnover cleaner cancelled three hours before a 4pm check-in on a long weekend. I called NTC at 1pm. Coverage was confirmed by 1:45 and the property was guest-ready by 3:30. Guest left a 5-star review. Worth every dollar.",
      meta: "Placeholder · STR host, Niagara Falls",
      photo: TESTIMONIAL_IMAGES[0],
    },
    {
      name: "NOTL Property Manager",
      quote: "We manage six STR units across NOTL and St. Catharines. Before NTC we lost roughly one weekend per month to coordination gaps. First quarter on recurring coverage: zero missed turnovers. The price difference paid for itself in protected bookings.",
      meta: "Placeholder · Property manager, NOTL",
      photo: TESTIMONIAL_IMAGES[3],
    },
    {
      name: "St. Catharines Host",
      quote: "The cleaner I found on Marketplace did a 'fine' job but left issues my guest flagged in the review. NTC's first turnover came back with photo proof of every room. I stopped second-guessing.",
      meta: "Placeholder · STR host, St. Catharines",
      photo: TESTIMONIAL_IMAGES[5],
    },
  ];


  const faqs = [
    { q: "What makes NTC different from finding a cleaner myself on Facebook or Marketplace?", a: "You're not just paying for a cleaner. You're paying for dispatch, coordination, quality control, and photo confirmation. If the assigned cleaner cancels, we route a backup. If something is missed, we flag it before your guest does. A Marketplace booking gives you one person and a hope. NTC gives you a system." },
    { q: "What happens if I'm not happy with the result?", a: "Flag it within 24 hours and we resolve it — typically by returning to fix the issue at no additional cost. Coverage means we own the outcome, not just the shift. Photo proof and a written report are available so issues are resolved on evidence, not opinion." },
    { q: "How fast can you confirm availability?", a: "Urgent and same-day requests are reviewed within hours during operating windows. Standard requests are reviewed within 24 hours. Coverage is confirmed before scheduling." },
    { q: "Do I pay before you confirm coverage?", a: "No. Scope, timing, price, and deposit / payment terms are confirmed first. High-risk or same-day jobs may require full payment upfront once coverage is confirmed." },
    { q: "Are you only for Airbnb hosts?", a: "No. We work with STR hosts, property managers, realtors, investors, operators, and homeowners across the Niagara Region." },
    { q: "Are you the cheapest option?", a: "No. NTC is built for properties where timing, reliability, and presentation matter. We are a premium local operator, not a bargain cleaner." },
    { q: "Do you offer property management or co-hosting?", a: "We focus on turnover coverage and property readiness. For recurring operator relationships we offer priority dispatch and account setup through our Client On-Boarding path." },
  ];


  const beforeAfterGallery = [
    {
      title: "Bedroom reset",
      impact: "From visibly unfinished to crisp, guest-ready presentation.",
      image: beforeAfterBedroomBlue.url,
      alt: "Before and after comparison of a short-term rental bedroom reset with straightened bedding and styled pillows",
      featured: true,
    },
    {
      title: "Full bed remake",
      impact: "A cleaner visual finish that reads ready at a glance.",
      image: beforeAfterBedroomRose.url,
      alt: "Before and after comparison of a pink bedroom with wrinkled bedding transformed into a neatly made bed",
    },
    {
      title: "Living room styling",
      impact: "Soft furnishings and layout details make the space feel intentional.",
      image: beforeAfterLounge.url,
      alt: "Before and after comparison of a lounge area with added throws and cushions for a more polished guest setup",
    },
    {
      title: "Amenity corner",
      impact: "An overlooked area becomes a usable, welcoming moment.",
      image: beforeAfterHallway.url,
      alt: "Before and after comparison of a hallway nook transformed into a styled seating area",
    },
    {
      title: "Detail refresh",
      impact: "Even secondary rooms look maintained, not forgotten.",
      image: beforeAfterPiano.url,
      alt: "Before and after comparison of a piano area with added styling and decor for a finished look",
    },
  ];

  const readinessVisuals = [
    {
      src: luxuryLivingBright.url,
      alt: "Bright luxury living room with vaulted ceiling prepared for guest arrival",
      label: "Modern living",
    },
    {
      src: luxuryExtra03.url,
      alt: "Warm bedroom suite with styled bedding prepared for short-term rental guests",
      label: "NIAGARA FALLS",
    },
    {
      src: luxuryBathSuite.url,
      alt: "High-end bathroom detail supporting premium property-readiness standards",
      label: "KITCHENS",
    },
    {
      src: luxuryExtra11.url,
      alt: "Vacant apartment interior with clean lines and listing-ready presentation",
      label: "Vacant apartments",
    },
    {
      src: luxuryExtra01.url,
      alt: "Industrial loft interior that feels suited to premium Niagara short-term rentals",
      label: "Lofts & cottages",
    },
  ];

  const REPRESENTATIVE_VISUAL_NOTE =
    "Representative readiness visuals. Actual property results depend on scope and condition.";


  return (
    <div className="min-h-screen">
      {/* Alert bar */}
      <div className="bg-gradient-gold text-primary-foreground text-xs sm:text-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
          <span className="font-medium">
            Coverage is confirmed before scheduling. Urgent:{" "}
            <a href={PHONE_TEL} onClick={() => track("alert_call")} className="underline underline-offset-2 font-semibold">
              {PHONE}
            </a>
          </span>
        </div>
      </div>

      {/* Sticky nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <a href="#top" className="flex items-center"><Logo /></a>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#intake" className="hover:text-foreground">Submit Request</a>
            <a href="#services" className="hover:text-foreground">Services</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
          </nav>
          <a
            href={ONBOARDING_URL}
            {...ext}
            onClick={() => track("cta_onboarding", { source: "nav" })}
            className="hidden sm:inline-flex min-h-[46px] items-center justify-center gap-1.5 rounded-xl bg-gradient-gold px-4 text-xs font-semibold text-primary-foreground shadow-gold border border-primary/30 transition hover:brightness-110 active:scale-[0.98] focus-gold"
          >
            Start On-Boarding
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      <main id="top">
        {/* HERO — split with photo */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 ntc-grid-bg opacity-30" />
          <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_top,hsl(43_65%_58%/0.18),transparent_60%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-14 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-center">
              <div className="lg:col-span-7 flex flex-col items-start gap-6">
                <SectionLabel>Niagara Region Property Readiness</SectionLabel>
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-[88px] leading-[0.98]">
                  <span className="sr-only">Niagara Region property turnover and short-term rental cleaning. </span>
                  Properties that are <span className="gold-text italic">ready</span> by the time guests arrive.
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground max-w-xl">
                  Niagara Turnover Co. handles emergency turnover coverage, short-term rental cleaning, listing prep, and recurring readiness across the Niagara Region — so revenue doesn't slip through coordination gaps.
                </p>
                <div className="grid gap-3 sm:grid-cols-5 w-full max-w-xl">
                  <a
                    href={ONBOARDING_URL}
                    {...ext}
                    onClick={() => track("hero_path_onboarding")}
                    className="group sm:col-span-3 relative overflow-hidden rounded-2xl bg-gradient-gold border border-primary/40 p-5 text-primary-foreground shadow-gold transition hover:brightness-110 hover:shadow-[0_20px_60px_-20px_hsl(43_70%_55%/0.55)] active:scale-[0.99] focus-gold cta-attention min-h-[110px]"
                  >
                    <div className="text-[10px] uppercase tracking-[0.18em] opacity-90">Managing properties?</div>
                    <div className="font-serif text-xl mt-1.5 leading-snug">Start Client On-Boarding</div>
                    <div className="text-xs opacity-90 mt-1.5 max-w-[260px]">Recurring coverage, multi-property setup, priority dispatch.</div>
                    <ArrowRight className="absolute top-5 right-5 h-5 w-5 group-hover:translate-x-0.5 transition" />
                  </a>
                  <a
                    href={SCHEDULING_URL}
                    {...ext}
                    onClick={() => track("hero_path_scheduling")}
                    className="group sm:col-span-2 relative overflow-hidden rounded-2xl border border-primary/40 bg-card/60 p-5 transition hover:border-primary hover:bg-primary/[0.06] active:scale-[0.99] focus-gold min-h-[110px]"
                  >
                    <div className="text-[10px] uppercase tracking-[0.18em] text-primary">Need service now?</div>
                    <div className="font-serif text-lg mt-1.5 leading-snug">Request Scheduling</div>
                    <div className="text-xs text-muted-foreground mt-1.5">Same-day, emergency, one-off turnover.</div>
                    <ArrowUpRight className="absolute top-5 right-5 h-4 w-4 text-primary group-hover:translate-x-0.5 transition" />
                  </a>
                </div>
                <div className="flex flex-wrap items-center gap-2 max-w-xl">
                  <span className="gold-pill">
                    <ShieldCheck className="h-3 w-3" />
                    Coverage confirmed first
                  </span>
                  <span className="gold-pill">
                    <Star className="h-3 w-3 fill-primary" />
                    ★★★★★ Verified Niagara reviews
                  </span>
                  <span className="gold-pill">
                    <Camera className="h-3 w-3" />
                    Photo proof available
                  </span>
                </div>

                {/* Trust strip */}
                <div className="mt-2 grid grid-cols-3 gap-px rounded-xl border border-primary/25 bg-primary/[0.04] overflow-hidden w-full max-w-xl">
                  {[
                    { k: "24h", v: "Priority review" },
                    { k: "7", v: "Service areas" },
                    { k: "+50%", v: "Rush under 24h" },
                  ].map((s) => (
                    <div key={s.v} className="bg-card/60 px-4 py-3">
                      <div className="font-serif text-2xl gold-text">{s.k}</div>
                      <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground mt-1">{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero photo composition */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-primary/20 shadow-elegant">
                  {HERO_IMAGES.map((img, i) => (
                    <img
                      key={img.src}
                      src={img.src}
                      alt={img.alt}
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                        i === heroIndex ? "opacity-100" : "opacity-0"
                      }`}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      // @ts-expect-error fetchpriority is valid HTML
                      fetchpriority={i === 0 ? "high" : "auto"}
                    />
                  ))}

                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/25 to-transparent" />

                  {/* Floating status chip */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-background/85 backdrop-blur border border-primary/40 px-3 py-1.5 text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                    <span className="uppercase tracking-[0.16em] text-primary font-medium">Guest-Ready</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-primary/25 bg-background/50 p-4 backdrop-blur">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.14em] text-primary">Luxury-ready interiors</div>
                        <div className="font-serif text-lg mt-1">Modern kitchens, clean bedrooms, vacant apartments, cottage-style spaces.</div>
                      </div>
                      <div className="hidden sm:block glass rounded-xl px-4 py-3 text-xs shrink-0">
                        <div className="text-muted-foreground uppercase tracking-[0.14em] text-[10px]">Turnover completed</div>
                        <div className="font-serif text-base mt-1">11:42 AM · NOTL</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block absolute -top-4 -left-4 h-20 w-20 rounded-full border border-primary/30" />
                <div className="hidden lg:block absolute -bottom-4 -right-4 h-12 w-12 rounded-full bg-gradient-gold opacity-40 blur-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* EMERGENCY — same-day priority block */}
        <section className="border-y border-primary/30 bg-gradient-to-b from-primary/[0.08] to-background">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12 grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-primary">
                <Zap className="h-3 w-3" /> Same-Day · Priority
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl mt-3">
                Need this handled <span className="gold-text">today?</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-xl">
                Same-day and under-24-hour requests are reviewed first. Coverage is confirmed in hours when slots are available — rush scheduling is prioritised.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3 lg:justify-end">
              <a
                href={SCHEDULING_URL}
                {...ext}
                onClick={() => track("emergency_same_day")}
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-gradient-gold px-5 text-sm font-semibold text-primary-foreground shadow-gold border border-primary/30 transition hover:brightness-110 active:scale-[0.98] focus-gold cta-attention"
              >
                Request Same-Day Coverage <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={PHONE_TEL}
                onClick={() => track("emergency_call")}
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border-2 border-primary/60 bg-primary/10 px-5 text-sm font-semibold focus-gold"
              >
                <Phone className="h-4 w-4" /> Call {PHONE}
              </a>
            </div>
          </div>
        </section>

        {/* RISK — zigzag list */}


        <section className="ntc-gold-halo ntc-fine-grid mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <div className="max-w-3xl">
            <SectionLabel>The Real Risk</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl mt-4">
              The cleaner is not the only risk. <span className="gold-text">The timeline is.</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl">
              Missed readiness creates refunds, bad reviews, delayed showings, owner complaints, and last-minute coordination problems. Each one is fixable — if you catch it before guests do.
            </p>
          </div>

          <div className="mt-10 divide-y divide-border/60 border-y border-border/60">
            {risks.map(([n, t, d], i) => (
              <div
                key={n}
                className={`grid gap-4 sm:gap-8 py-6 sm:py-7 sm:grid-cols-12 items-baseline group ${
                  i % 2 === 1 ? "sm:pl-12" : ""
                }`}
              >
                <div className="sm:col-span-1 numeral-outline text-4xl sm:text-5xl">{n}</div>
                <div className="sm:col-span-5">
                  <div className="font-serif text-xl sm:text-2xl group-hover:gold-text transition">{t}</div>
                </div>
                <div className="sm:col-span-6">
                  <p className="text-sm sm:text-base text-muted-foreground">{d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <p className="font-serif text-xl sm:text-2xl max-w-2xl">
              We route coverage <span className="gold-text">before any of this becomes your problem.</span>
            </p>
            <a
              href="#readiness-quiz"
              onClick={() => track("risk_to_quiz")}
              className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-gradient-gold px-5 text-sm font-semibold text-primary-foreground shadow-gold border border-primary/30 transition hover:brightness-110 active:scale-[0.98] focus-gold"
            >
              Find your path <ArrowRight className="h-4 w-4" />
            </a>
          </div>

        </section>

        {/* READINESS QUIZ — moved ABOVE intake so it drives the routing decision */}
        <section id="readiness-quiz" className="ntc-gold-halo mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionLabel>Property Readiness Score</SectionLabel>
              <h2 className="font-serif text-3xl sm:text-4xl mt-4">
                Four questions. <span className="gold-text">One clear path.</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-md">
                Answer below and we'll point you to the right coverage path before you submit a form.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Coverage confirmed first</span>
                <span className="inline-flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-primary fill-primary" /> Verified Niagara reviews</span>
              </div>
            </div>
            <div className="lg:col-span-7 premium-card p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
              <div className="relative space-y-5">
                {([
                  { key: "urgent", q: "Is there a guest check-in within 24 hours?", a: "Yes — urgent", b: "No" },
                  { key: "laundry", q: "Is laundry / linen reset needed?", a: "Yes", b: "No" },
                  { key: "vacant", q: "Is the property between guests right now?", a: "Yes", b: "No, guests still in" },
                  { key: "recurring", q: "How often do you need this?", a: "Monthly recurring", b: "Once" },
                ] as const).map(({ key, q, a, b }) => (
                  <div key={key}>
                    <div className="text-sm font-medium">{q}</div>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {[
                        { label: a, val: true },
                        { label: b, val: false },
                      ].map(({ label, val }) => {
                        const active = quiz[key] === val;
                        return (
                          <button
                            key={label}
                            type="button"
                            onClick={() => setQuiz((p) => ({ ...p, [key]: val }))}
                            className={`min-h-[46px] rounded-xl border px-3 text-sm font-medium transition active:scale-[0.98] focus-gold ${
                              active
                                ? "border-primary bg-gradient-gold text-primary-foreground shadow-gold"
                                : "border-border bg-background/60 text-foreground hover:border-primary/40 hover:bg-primary/[0.05]"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {quizResult && (
                  <div className="rounded-xl border border-primary/40 bg-gradient-gold-soft p-5 animate-fade-in">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-primary font-medium">Recommended path</div>
                    <div className="font-serif text-xl mt-1">
                      Your property needs: <span className="gold-text">{quizResult}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                      <a
                        href={quiz.recurring ? ONBOARDING_URL : SCHEDULING_URL}
                        {...ext}
                        onClick={() => track("quiz_to_form", { result: quizResult, recurring: quiz.recurring })}
                        className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-gradient-gold px-5 text-sm font-semibold text-primary-foreground shadow-gold border border-primary/30 transition hover:brightness-110 active:scale-[0.98] focus-gold"
                      >
                        {quiz.recurring ? "Start Client On-Boarding" : "Request Client Scheduling"} <ArrowRight className="h-4 w-4" />
                      </a>
                      <a
                        href="#intake"
                        className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border-2 border-primary/60 bg-primary/10 px-5 text-sm font-semibold focus-gold"
                      >
                        See both paths
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* INTAKE — two qualifying-question cards (replaces decision-table routing) */}
        <section id="intake" className="ntc-gold-halo mx-auto max-w-7xl px-4 py-16">
          <div className="max-w-3xl">
            <SectionLabel>Submit Request</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl mt-4">
              One question per path. <span className="gold-text">Pick the one that's true.</span>
            </h2>
            <p className="text-muted-foreground mt-3">
              No payment before coverage is confirmed. Final price depends on scope and timing.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {/* Card 1 — Scheduling (need service now) */}
            <a
              href={SCHEDULING_URL}
              {...ext}
              onClick={() => track("intake_card_scheduling")}
              className="group premium-card p-7 sm:p-8 relative overflow-hidden flex flex-col gap-5 hover:border-primary/60 transition"
            >
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
              <div className="relative flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-primary">
                  <Clock className="h-3 w-3" /> Same-day available
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-primary">Path A</span>
              </div>
              <div className="relative">
                <h3 className="font-serif text-2xl sm:text-3xl leading-tight">
                  Do you need a property cleaned in the <span className="gold-text">next 7 days?</span>
                </h3>
                <p className="text-sm text-muted-foreground mt-3">
                  Turnovers, backup coverage, resets, listing prep, same-day requests. One property, one date, one path.
                </p>
              </div>
              <div className="relative mt-auto flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-xl bg-gradient-gold px-5 py-3 text-sm font-semibold text-primary-foreground shadow-gold border border-primary/30">
                  Yes — Request Client Scheduling <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </a>

            {/* Card 2 — Onboarding (recurring / multi-property) */}
            <a
              href={ONBOARDING_URL}
              {...ext}
              onClick={() => track("intake_card_onboarding")}
              className="group premium-card p-7 sm:p-8 relative overflow-hidden flex flex-col gap-5 hover:border-primary/60 transition"
            >
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
              <div className="relative flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-primary">
                  <Building2 className="h-3 w-3" /> Operator path
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Path B</span>
              </div>
              <div className="relative">
                <h3 className="font-serif text-2xl sm:text-3xl leading-tight">
                  Are you setting up <span className="gold-text">recurring coverage</span> for one or more properties?
                </h3>
                <p className="text-sm text-muted-foreground mt-3">
                  New clients, property managers, realtors, investors. Priority dispatch and account setup.
                </p>
              </div>
              <div className="relative mt-auto flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-xl border-2 border-primary/60 bg-primary/10 px-5 py-3 text-sm font-semibold">
                  Yes — Client On-Boarding <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          </div>

          <div className="mt-6 rounded-xl border border-primary/30 bg-primary/[0.05] p-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-foreground/85">
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} /> No payment before coverage is confirmed</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} /> Final price depends on scope and timing</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} /> Same-day requests are reviewed first</span>
            <span className="inline-flex items-center gap-1.5 ml-auto">
              <Phone className="h-3.5 w-3.5 text-primary" />
              <span>Urgent? <a href={PHONE_TEL} className="font-semibold text-primary hover:underline">Call {PHONE}</a></span>
            </span>
          </div>
        </section>


        {/* CALCULATOR — paper surface */}
        <section className="section-paper">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
            <div className="grid gap-8 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <SectionLabel onPaper>Cost of Failure</SectionLabel>
                <h2 className="font-serif text-3xl sm:text-4xl mt-4 ink">
                  One unready property can cost <span className="text-[hsl(var(--gold-deep))]">more than the turnover.</span>
                </h2>
                <p className="ink-muted mt-3">
                  Estimate the downstream cost of a missed readiness window.
                </p>
                <div className="mt-6 h-px gold-rule max-w-xs" />
                <p className="text-xs uppercase tracking-[0.18em] mt-4 ink-muted">An honest tool — not a quote.</p>
              </div>

              <div className="paper-card p-6 sm:p-8 lg:col-span-3 shadow-elegant">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="text-xs uppercase tracking-wider ink-muted">Nightly rate ($)</label>
                    <Input
                      type="number" min={0} value={rate}
                      onChange={(e) => setRate(Number(e.target.value) || 0)}
                      className="h-12 mt-1.5 paper-input"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider ink-muted">Nights at risk</label>
                    <Input
                      type="number" min={0} value={nights}
                      onChange={(e) => setNights(Number(e.target.value) || 0)}
                      className="h-12 mt-1.5 paper-input"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider ink-muted">Bedrooms</label>
                    <select
                      value={bedrooms}
                      onChange={(e) => setBedrooms(Number(e.target.value) || 2)}
                      className="h-12 mt-1.5 paper-input w-full rounded-md border border-input bg-background px-3 text-sm"
                    >
                      <option value={1}>1 Bedroom</option>
                      <option value={2}>2 Bedroom</option>
                      <option value={3}>3 Bedroom</option>
                      <option value={4}>4 Bedroom</option>
                      <option value={5}>5+ Bedroom</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 space-y-2 text-sm">
                  {[
                    { k: "Cancellation loss", v: calc.cancellation, Icon: AlertOctagon },
                    { k: "Rebooking delay", v: calc.rebooking, Icon: Calculator },
                    { k: "Review / reputation risk (≈4 future nights)", v: calc.review, Icon: TrendingUp },
                    { k: "Coordination time", v: calc.coord, Icon: Clock },
                  ].map(({ k, v, Icon }) => (
                    <div key={k} className="flex justify-between items-center border-b hairline py-2.5">
                      <span className="ink-muted inline-flex items-center gap-2.5">
                        <Icon className="h-4 w-4 text-[hsl(var(--gold-deep))]" />
                        {k}
                      </span>
                      <span className="font-medium ink">${v.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl bg-gradient-gold border border-[hsl(var(--gold-deep))] p-4 flex items-center justify-between">
                  <span className="uppercase tracking-wider text-xs text-primary-foreground">Estimated risk</span>
                  <span className="font-serif text-3xl text-primary-foreground">
                    ${calc.total.toLocaleString()}
                  </span>
                </div>

                <div className="mt-5 rounded-xl border-2 border-[hsl(var(--gold-deep))] bg-[hsl(43_65%_58%/0.10)] p-4 space-y-2">
                  <p className="text-sm ink leading-snug">
                    NTC turnover for a {bedrooms}{bedrooms >= 5 ? "+" : ""}-bedroom property starts at <span className="font-semibold text-[hsl(var(--gold-deep))]">${calc.ntcPrice}</span> — cheaper than the <span className="font-semibold text-[hsl(var(--gold-deep))]">${calc.total.toLocaleString()}</span> risk above.
                  </p>
                  <p className="text-xs ink-muted">
                    You break even after roughly {Math.max(1, Math.ceil(calc.ntcPrice / Math.max(1, rate)))} protected night{Math.max(1, Math.ceil(calc.ntcPrice / Math.max(1, rate))) === 1 ? "" : "s"} of bookings.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-5">
                  <PrimaryCTA source="calculator" className="w-full sm:w-auto">Confirm Coverage</PrimaryCTA>
                  <SecondaryCTA source="calculator" onPaper className="w-full sm:w-auto">Client On-Boarding</SecondaryCTA>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] ink-muted">
                  <span className="inline-flex items-center gap-1"><Star className="h-3 w-3 text-[hsl(var(--gold-deep))] fill-[hsl(var(--gold-deep))]" /> ★★★★★ Verified Niagara reviews</span>
                  <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-[hsl(var(--gold-deep))]" /> Coverage confirmed first</span>
                  <span className="inline-flex items-center gap-1"><Camera className="h-3 w-3 text-[hsl(var(--gold-deep))]" /> Photo proof available</span>
                </div>
                <p className="text-xs ink-muted mt-3">This calculator is an estimate, not a quote.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES — bento (1 large + 2 small) */}
        <section id="services" className="ntc-fine-grid ntc-gold-halo mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <div className="max-w-3xl">
            <SectionLabel>Services</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl mt-4">
              One readiness system for the property problems that <span className="gold-text">actually cost money.</span>
            </h2>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
            <div className="premium-card lg:row-span-2 relative overflow-hidden flex flex-col min-h-[560px]">
              <img
                src={services[0].image}
                alt={services[0].alt}
                sizes="(min-width: 1024px) 34vw, 100vw"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/15" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
              <div className="relative p-7 flex h-full flex-col justify-end">
                <div className="icon-badge icon-badge-lg shadow-gold">
                  <AlertTriangle className="h-8 w-8" />
                </div>
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-primary mt-5">
                  <Zap className="h-3 w-3" /> Most requested
                </div>
                <h3 className="font-serif text-3xl mt-4">{services[0].title}</h3>
                <p className="text-muted-foreground mt-3 max-w-md">Backup cleaner failed. Guest checks in tonight. We route fast and confirm coverage before you commit.</p>
                <ul className="mt-6 space-y-3 max-w-md">
                  {services[0].points.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="relative mt-8 flex items-end justify-between">
                  <a href={SCHEDULING_URL} {...ext} onClick={() => track("service_emergency")}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
                    Get Emergency Coverage <ArrowRight className="h-4 w-4" />
                  </a>
                  <div className="font-serif text-5xl gold-text opacity-30 leading-none">24h</div>
                </div>
              </div>
            </div>

            {services.slice(1).map((s, idx) => {
              const isListing = idx === 0;
              const cta = isListing
                ? { label: "Request listing prep", href: `${SCHEDULING_URL}?utm_source=service_listing`, event: "service_listing_cta" }
                : { label: "Set up recurring coverage", href: `${ONBOARDING_URL}?utm_source=service_recurring`, event: "service_recurring_cta" };
              return (
                <div key={s.title} className="premium-card overflow-hidden flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.alt}
                      sizes="(min-width: 1024px) 22vw, 100vw"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-500 hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                    <div className="absolute left-4 top-4 icon-badge">
                      <s.icon className="h-7 w-7" />
                    </div>
                  </div>
                  <div className="p-6 flex flex-1 flex-col">
                    <h3 className="font-serif text-xl">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
                    <ul className="mt-4 space-y-2 text-sm flex-1">
                      {s.points.map((p) => (
                        <li key={p} className="flex gap-2">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" strokeWidth={3} />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={cta.href}
                      {...ext}
                      onClick={() => track(cta.event)}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                    >
                      {cta.label} <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* GALLERY TEASER — proof of work, after services */}
        <section className="section-paper">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <SectionLabel onPaper>Readiness Standard</SectionLabel>
                <h2 className="mt-4 font-serif text-3xl sm:text-4xl ink">
                  Luxury visuals that signal <span className="text-[hsl(var(--gold-deep))]">trust, readiness, and booking confidence.</span>
                </h2>
              </div>
              <div className="lg:col-span-5 lg:ml-auto">
                <p className="text-sm sm:text-base ink-muted max-w-xl">
                  Modern interiors, clean bedrooms, listing-ready kitchens, vacant apartments, lofts, and polished bathrooms — selected to support conversion without pulling attention away from the CTA path.
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[hsl(var(--gold-deep))]">
                  {REPRESENTATIVE_VISUAL_NOTE}
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
              {readinessVisuals.map((visual, idx) => (
                <div
                  key={visual.src}
                  className={`group relative overflow-hidden rounded-xl border hairline shadow-elegant ${idx === 0 ? "lg:col-span-5 lg:row-span-2 min-h-[420px]" : "lg:col-span-7 min-h-[200px]"}`}
                >
                  <img
                    src={visual.src}
                    alt={visual.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink))]/88 via-[hsl(var(--ink))]/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--paper))]/20 bg-[hsl(var(--ink))]/40 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[hsl(var(--paper))]">
                      <Camera className="h-3 w-3" /> {visual.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="/gallery"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 block paper-card group overflow-hidden shadow-elegant"
            >
              <div className="grid md:grid-cols-2 items-center">
                <div className="aspect-[4/3] md:aspect-auto md:h-full overflow-hidden relative">
                  <img
                    src={beforeAfterGallery[0].image}
                    alt={beforeAfterGallery[0].alt}
                    width={1080}
                    height={810}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[hsl(var(--paper))]/80 md:to-transparent" />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--ink))]/80 backdrop-blur px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[hsl(var(--paper))] opacity-0 group-hover:opacity-100 transition duration-300">
                    <Camera className="h-3 w-3" /> View proof
                  </div>
                </div>
                <div className="p-8 sm:p-10 flex flex-col items-start gap-4">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--gold-deep))]">5 real room resets</div>
                  <h3 className="font-serif text-2xl ink">View the full gallery</h3>
                  <p className="text-sm leading-relaxed ink-muted max-w-md">
                    Bedrooms, lounges, amenity corners, and detail refreshes — each one documented before and after turnover coverage.
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--gold-deep))] mt-1">
                    Open gallery
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[hsl(36_25%_80%)] bg-white/70 transition group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </span>
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* HOW IT WORKS — horizontal stepper */}
        <section className="ntc-gold-halo mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <div className="max-w-3xl">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl mt-4">
              From request to <span className="gold-text">guest-ready</span> in four clear steps.
            </h2>
          </div>

          <div className="mt-12 relative">
            {/* animated connector line */}
            <div className="hidden lg:block stepper-line" />
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { n: "01", t: "Submit the property request", d: "Tell us the property, the deadline, and the risk.", Icon: ClipboardList },
                { n: "02", t: "We confirm the right path", d: "Emergency, readiness, or recurring — routed in hours.", Icon: Route },
                { n: "03", t: "Price and availability are confirmed", d: "Scope and timing locked before anything is scheduled.", Icon: ShieldCheck },
                { n: "04", t: "The property gets handled", d: "Turnover completed, optional photo proof on request.", Icon: BadgeCheck },
              ].map(({ n, t, d, Icon }) => (
                <div key={n} className="relative">
                  <div className="relative z-10 mx-auto h-14 w-14 rounded-full bg-background border border-primary/40 flex items-center justify-center shadow-gold">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-center mt-5">
                    <div className="text-[10px] uppercase tracking-[0.2em] gold-text font-medium">Step {n}</div>
                    <div className="font-serif text-lg mt-1">{t}</div>
                    <p className="text-sm text-muted-foreground mt-2">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING — paper surface, table-forward */}
        <section id="pricing" className="section-paper">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
            <div className="max-w-3xl">
              <SectionLabel onPaper>Pricing</SectionLabel>
              <h2 className="font-serif text-3xl sm:text-4xl mt-4 ink">
                Simple starting points. <span className="text-[hsl(var(--gold-deep))]">Final price confirmed after scope.</span>
              </h2>
              <p className="ink-muted mt-3">
                NTC is built for properties where timing, reliability, and presentation matter. Pricing depends on size, condition, laundry, access, timing, and urgency.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3 mt-10">
              {/* Standard turnovers — clean table */}
              <div className="paper-card p-7 lg:col-span-2">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-2xl ink">Standard Turnovers</h3>
                  <span className="text-xs uppercase tracking-[0.18em] ink-muted">Starting at</span>
                </div>
                <div className="mt-5 divide-y hairline">
                  {pricing.map((p) => (
                    <div key={p.size} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3">
                      <span className="ink inline-flex items-center gap-2.5 min-w-[120px]">
                        <Check className="h-4 w-4 text-[hsl(var(--gold-deep))]" strokeWidth={3} />
                        {p.size}
                      </span>
                      <span className="font-serif text-xl text-[hsl(var(--gold-deep))] ml-auto sm:ml-0">{p.price}</span>
                      <a
                        href={SCHEDULING_URL}
                        {...ext}
                        onClick={() => track("pricing_row_check", { size: p.size })}
                        className="inline-flex min-h-[46px] items-center gap-1.5 rounded-lg border border-[hsl(var(--ink))] bg-[hsl(var(--ink))] px-3.5 text-xs font-semibold text-[hsl(var(--paper))] transition hover:bg-[hsl(0_0%_15%)] focus-gold w-full sm:w-auto justify-center"
                      >
                        Check availability <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  ))}
                </div>

                <div className="mt-6 h-px gold-rule" />

                <h4 className="font-serif text-lg mt-6 ink">Common Add-ons</h4>
                <div className="mt-3 grid sm:grid-cols-2 gap-x-8">
                  {addons.map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center py-2 text-sm border-b hairline">
                      <span className="ink-muted inline-flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-[hsl(var(--gold-deep))]/70" strokeWidth={3} />
                        {k}
                      </span>
                      <span className="font-medium ink">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Same-day callout */}
              <div className="rounded-[var(--radius)] overflow-hidden border-2 border-[hsl(var(--gold-deep))] bg-gradient-to-b from-[hsl(43_65%_58%/0.12)] to-transparent">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={luxuryExtra25.url}
                    alt="Listing-ready kitchen visual supporting premium emergency and pricing support"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--paper))] via-[hsl(var(--paper))]/20 to-transparent" />
                </div>
                <div className="p-7">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--ink))] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--paper))]">
                    <Zap className="h-3 w-3" /> Urgent · Fast Dispatch
                  </div>
                  <h3 className="font-serif text-2xl mt-4 ink">Same-Day / Emergency</h3>
                  <ul className="mt-5 space-y-4 text-sm">
                    <li className="flex gap-3">
                      <Clock className="h-4 w-4 text-[hsl(var(--gold-deep))] shrink-0 mt-0.5" />
                      <span className="ink">Less than 24 hours notice: <span className="font-semibold text-[hsl(var(--gold-deep))]">+50% rush fee</span></span>
                    </li>
                    <li className="flex gap-3">
                      <AlertTriangle className="h-4 w-4 text-[hsl(var(--gold-deep))] shrink-0 mt-0.5" />
                      <span className="ink">High-risk or same-day jobs may require full payment upfront</span>
                    </li>
                    <li className="flex gap-3">
                      <ShieldCheck className="h-4 w-4 text-[hsl(var(--gold-deep))] shrink-0 mt-0.5" />
                      <span className="ink">Coverage is confirmed before scheduling</span>
                    </li>
                  </ul>
                  <a href={PHONE_TEL} onClick={() => track("pricing_call")}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--ink))] hover:text-[hsl(var(--gold-deep))]">
                    <Phone className="h-4 w-4" /> Call {PHONE}
                  </a>
                </div>
              </div>
            </div>

            {/* Recurring — full-width band */}
            <div className="mt-6 paper-card overflow-hidden">
              <div className="grid gap-0 lg:grid-cols-12">
                <div className="p-7 lg:col-span-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-serif text-2xl ink">Recurring Coverage</h3>
                    <span className="text-xs uppercase tracking-[0.18em] ink-muted">For hosts & operators</span>
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {recurring.map((r) => (
                      <div key={r.name} className="rounded-xl border hairline bg-white/60 p-4">
                        <div className="text-xs uppercase tracking-[0.14em] ink-muted">{r.name}</div>
                        <div className="font-serif text-xl text-[hsl(var(--gold-deep))] mt-2">{r.price}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs ink-muted mt-5 max-w-3xl">
                    Monthly coverage plans are not cheap bundled turnovers. They are for recurring hosts and property operators who want priority scheduling, account setup, readiness tracking, and faster dispatch. Turnover pricing is still confirmed based on property size, scope, and frequency.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 mt-5">
                    <PrimaryCTA source="pricing">Request Client Scheduling</PrimaryCTA>
                    <SecondaryCTA source="pricing" onPaper>Set Up Your Property</SecondaryCTA>
                  </div>
                </div>
                <div className="relative min-h-[280px] lg:col-span-5">
                  <img
                    src={luxuryExtra13.url}
                    alt="Luxury loft imagery supporting recurring operator coverage"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[hsl(var(--ink))]/15 to-[hsl(var(--paper))]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHO THIS IS FOR — inline pill row */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <SectionLabel>Who This Is For</SectionLabel>
              <h2 className="font-serif text-3xl sm:text-4xl mt-4">
                Built for operators who treat readiness as <span className="gold-text">a system</span>, not a chore.
              </h2>
            </div>
            <p className="lg:col-span-5 text-sm text-muted-foreground">
              We are a premium local operator — not a bargain cleaner. If "cheapest available" is the brief, NTC isn't the right fit, and we'll tell you so.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-2 gap-y-3 border-t border-border/60 pt-8">
            {audience.map((a) => (
              <span key={a.label}
                className="gold-underline inline-flex min-h-[46px] items-center gap-2.5 px-4 py-3 rounded-full border border-border bg-card/50 text-sm hover:border-primary/40 hover:bg-primary/[0.06] active:scale-[0.97] active:bg-primary/10 transition cursor-default">
                <a.icon className="h-4 w-4 text-primary" />
                {a.label}
              </span>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS — asymmetric, with property photos */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <SectionLabel>Proof</SectionLabel>
              <h2 className="font-serif text-3xl sm:text-4xl mt-4">
                What clients say about <span className="gold-text">working with NTC.</span>
              </h2>
            </div>
            <a href="https://share.google/WBUHcz3lrMXVDrdqf" {...ext}
              onClick={() => track("google_reviews")}
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
              View Google Reviews <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {/* Featured */}
            <div className="lg:col-span-2 premium-card overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-5/12 relative">
                <img
                  src={testimonials[0].photo}
                  alt={`Property serviced by Niagara Turnover Co. — ${testimonials[0].name}`}
                  sizes="(min-width: 768px) 40vw, 100vw"
                  loading="lazy"
                  decoding="async"
                  className="h-56 md:h-full w-full object-cover"
                />
                <div className="absolute inset-0 md:bg-gradient-to-r md:from-transparent md:to-card/80" />
              </div>
              <div className="p-7 md:w-7/12 flex flex-col">
                <Quote className="h-8 w-8 text-primary opacity-60" />
                <p className="font-serif text-xl sm:text-2xl mt-4 leading-snug flex-1">
                  "{testimonials[0].quote}"
                </p>
                <div className="mt-5 h-px gold-rule" />
                <div className="mt-5 flex items-center gap-3 pt-3">
                  <Initials name={testimonials[0].name} />
                  <div>
                    <div className="font-semibold inline-flex items-center gap-1.5">
                      {testimonials[0].name}
                      <BadgeCheck className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{testimonials[0].meta}</div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Supporting two — stacked */}
            <div className="flex flex-col gap-5">
              {testimonials.slice(1).map((t) => (
                <div key={t.name} className="premium-card p-5 flex gap-4">
                  <img
                    src={t.photo}
                    alt={`Property serviced — ${t.name}`}
                    sizes="96px"
                    loading="lazy"
                    decoding="async"
                    className="h-24 w-24 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex flex-col">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-sm mt-2 leading-relaxed flex-1">"{t.quote}"</p>
                    <div className="mt-3 h-px gold-rule" />
                    <div className="mt-3 pt-1 flex items-center gap-2">
                      <Initials name={t.name} />
                      <div>
                        <div className="font-semibold text-sm inline-flex items-center gap-1">
                          {t.name}
                          <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <div className="text-[11px] text-muted-foreground">{t.meta}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ — two-column */}
        <section id="faq" className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <SectionLabel>FAQ</SectionLabel>
              <h2 className="font-serif text-3xl sm:text-4xl mt-4">
                Answers, <span className="gold-text">no fluff.</span>
              </h2>
              <p className="text-muted-foreground mt-3 text-sm">
                Still have questions? The fastest answer is a phone call — we keep that line clear.
              </p>
              <a href={PHONE_TEL} onClick={() => track("faq_call")}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
                <Phone className="h-4 w-4" /> Call {PHONE}
              </a>
            </div>

            <div className="lg:col-span-8">
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((f, i) => (
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
            </div>
          </div>
        </section>

        {/* OPERATOR MODE — for multi-property clients */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <div className="premium-card relative overflow-hidden">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <div className="absolute inset-x-8 bottom-6 h-px gold-rule opacity-60" />
            <div className="relative grid gap-0 lg:grid-cols-12 lg:items-stretch">
              <div className="p-8 sm:p-12 lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-primary">
                  <Building2 className="h-3 w-3" /> Operator Mode
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl mt-4">
                  For operators managing <span className="gold-text">more than one property.</span>
                </h2>
                <p className="text-muted-foreground mt-4 max-w-xl">
                  Recurring coverage is not discounted cleaning. It is priority scheduling, readiness tracking, repeatable standards, and faster dispatch across active properties.
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {REPRESENTATIVE_VISUAL_NOTE}
                </p>
                <ul className="mt-5 grid sm:grid-cols-2 gap-2.5 max-w-xl text-sm">
                  {[
                    "Priority dispatch across portfolio",
                    "Readiness tracking per property",
                    "Repeatable, documented standards",
                    "Single point of coordination",
                  ].map((p) => (
                    <li key={p} className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-col sm:flex-row gap-3 max-w-xl">
                  <a
                    href={ONBOARDING_URL}
                    {...ext}
                    onClick={() => track("operator_onboarding")}
                    className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-xl bg-gradient-gold px-6 text-sm font-semibold text-primary-foreground shadow-gold border border-primary/30 transition hover:brightness-110 active:scale-[0.98] focus-gold"
                  >
                    Start Client On-Boarding <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href={PHONE_TEL}
                    onClick={() => track("operator_call")}
                    className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border-2 border-primary/60 bg-primary/10 px-6 text-sm font-semibold focus-gold"
                  >
                    <Phone className="h-4 w-4" /> Talk to coverage lead
                  </a>
                </div>
              </div>
              <div className="relative min-h-[320px] lg:col-span-5">
                <img
                  src={luxuryExtra16.url}
                  alt="Luxury industrial loft environment supporting multi-property operator coverage"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/15 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA — full-bleed luxury image */}
        <section className="relative overflow-hidden">
          <img
            src={luxuryTropicalKitchen.url}
            alt="Luxury kitchen and dining environment supporting final client conversion call to action"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-background/35" />
          <div className="relative mx-auto max-w-5xl px-4 py-20 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/70 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-primary backdrop-blur">
              <ShieldCheck className="h-3 w-3" /> Coverage confirmed before scheduling
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl mt-6 max-w-3xl mx-auto leading-[1.05]">
              Don't wait until the property becomes the problem.
            </h2>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
              Submit the request. We'll route the right coverage path and confirm before anything is scheduled.
            </p>
            <div className="mt-6 flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-xs text-foreground/85">
              <span className="inline-flex items-center gap-1.5"><Star className="h-3.5 w-3.5 fill-primary text-primary" /> ★★★★★ Verified Niagara reviews</span>
              <span className="inline-flex items-center gap-1.5"><Camera className="h-3.5 w-3.5 text-primary" /> Photo proof available</span>
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Coverage confirmed first</span>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a href={SCHEDULING_URL} {...ext} onClick={() => track("final_scheduling")}
                className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-xl bg-gradient-gold px-7 text-sm font-semibold text-primary-foreground shadow-gold border border-primary/30 hover:brightness-110 transition active:scale-[0.98]">
                Request Client Scheduling <ArrowRight className="h-4 w-4" />
              </a>
              <a href={PHONE_TEL} onClick={() => track("final_call")}
                className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-xl border-2 border-primary/60 bg-background/40 px-7 text-sm font-semibold hover:bg-primary/10 transition">
                <Phone className="h-4 w-4" /> Call {PHONE}
              </a>
            </div>
          </div>
        </section>

        {/* SHERKSTON PARTNER — paper surface with photo */}
        <section className="section-paper">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border hairline shadow-elegant">
                <img
                  src={partnerSherkston}
                  alt="Private cottage at Sherkston Shores resort on Lake Erie"
                  width={1280} height={800} loading="lazy" decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <SectionLabel onPaper>Partner</SectionLabel>
                <h2 className="font-serif text-3xl sm:text-4xl mt-4 ink">
                  Private Rental Cottages at <span className="text-[hsl(var(--gold-deep))]">Sherkston Shores Resort</span>
                </h2>
                <p className="text-sm ink-muted mt-3 max-w-lg">
                  For guests looking for privately owned cottage rentals at Sherkston Shores Resort, Sherkston Private Rentals offers a free cottage showcase service to help renters connect with available private rentals.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <a href="https://sherkstonprivaterentals.com/home-1/" {...ext} onClick={() => track("sherkston_cottages")}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[hsl(var(--ink))] px-5 text-sm font-semibold text-[hsl(var(--paper))] hover:bg-[hsl(0_0%_15%)]">
                    Find a Cottage <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href="https://sherkstonprivaterentals.com/" {...ext} onClick={() => track("sherkston_home")}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[hsl(var(--ink))] px-5 text-sm font-semibold ink hover:bg-[hsl(var(--ink))] hover:text-[hsl(var(--paper))]">
                    Visit Home Page
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-border/60 pb-28 md:pb-12">
          <div className="mx-auto max-w-7xl px-4 py-12 grid gap-8 md:grid-cols-3">
            <div>
              <Logo />
              <p className="text-sm text-muted-foreground mt-4 max-w-sm">
                Premium property turnover & readiness for the Niagara Region.
              </p>
              <p className="text-xs text-muted-foreground/80 mt-3 flex items-center gap-1.5">
                <ShieldCheck className="h-3 w-3 text-primary" /> Local operator · Coverage confirmed before scheduling
              </p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-primary">Contact</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a href={PHONE_TEL} className="flex items-center gap-2 hover:text-primary"><Phone className="h-4 w-4" /> {PHONE}</a></li>
                <li><a href={PHONE_SMS} className="flex items-center gap-2 hover:text-primary"><MessageSquare className="h-4 w-4" /> Text {PHONE}</a></li>
                <li><a href="mailto:niagaraturnoverco@gmail.com" className="flex items-center gap-2 hover:text-primary"><Mail className="h-4 w-4" /> niagaraturnoverco@gmail.com</a></li>
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-primary">Coverage Areas</div>
              <p className="text-sm text-muted-foreground mt-3">
                Niagara Falls · St. Catharines · NOTL · Welland · Thorold · Port Colborne · Fort Erie
              </p>
              <div className="mt-4 rounded-xl overflow-hidden border border-border/60 shadow-sm">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src="https://www.google.com/maps?q=Niagara+Turnover+Co/@43.276421,-79.5773256,10z&output=embed"
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Niagara Turnover Co. service area map"
                  />
                </div>
              </div>
              <a
                href="https://www.google.com/maps?q=Niagara+Turnover+Co/@43.276421,-79.5773256,10z"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                onClick={() => track("open_in_google_maps")}
              >
                <MapPin className="h-3.5 w-3.5" /> Open in Google Maps
              </a>
            </div>
          </div>
          <div className="border-t border-border/60">
            <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-muted-foreground text-center">
              © {new Date().getFullYear()} Niagara Turnover Co. All rights reserved.
            </div>
          </div>
        </footer>
      </main>

      {/* STICKY MOBILE BAR */}
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden safe-bottom border-t border-border/80 bg-background/95 backdrop-blur">
        <div className="grid grid-cols-5 gap-2 p-2.5">
          <a
            href={PHONE_TEL}
            onClick={() => track("mobile_bar_call")}
            className="col-span-3 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-gold px-4 text-sm font-semibold text-primary-foreground shadow-gold border border-primary/30 focus-gold cta-attention"
          >
            <Phone className="h-4 w-4" /> Call Now
          </a>
          <a
            href={SCHEDULING_URL}
            {...ext}
            onClick={() => track("mobile_bar_quote")}
            className="col-span-2 inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl border-2 border-primary/60 bg-primary/10 px-2 text-sm font-semibold focus-gold leading-tight"
          >
            Get a Quote <ArrowRight className="h-3.5 w-3.5" />
          </a>

        </div>
      </div>
    </div>
  );
};

export default Index;
