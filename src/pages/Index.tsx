import { useMemo, useState } from "react";
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

import heroTurnover from "@/assets/hero-turnover.jpg";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import partnerSherkston from "@/assets/partner-sherkston.jpg";
import beforeAfterBedroomBlue from "@/assets/before-after-bedroom-blue.png.asset.json";
import beforeAfterBedroomRose from "@/assets/before-after-bedroom-rose.png.asset.json";
import beforeAfterPiano from "@/assets/before-after-piano.png.asset.json";
import beforeAfterLounge from "@/assets/before-after-lounge.png.asset.json";
import beforeAfterHallway from "@/assets/before-after-hallway.png.asset.json";


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
    ["03", "Vendor follow-up becomes your job", "Time you should spend on revenue gets spent chasing cleaners."],
  ];

  const services = [
    {
      icon: AlertTriangle,
      title: "Emergency Turnover Coverage",
      desc: "Backup cleaner failed. Guest checks in tonight. We route fast.",
      points: ["Same-day & last-minute requests", "Backup cleaner coverage", "Rush dispatch under 24h"],
      featured: true,
    },
    {
      icon: Sparkles,
      title: "Property Readiness / Listing Prep",
      desc: "Camera-ready, showing-ready, guest-ready.",
      points: ["Listing prep for realtors", "Move-in / move-out resets", "Heavy reset & deep clean"],
    },
    {
      icon: ShieldCheck,
      title: "Recurring Turnover Support",
      desc: "Ongoing readiness for hosts, managers, and operators.",
      points: ["Priority scheduling", "Account & property setup", "Readiness tracking"],
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

  const testimonials = [
    {
      name: "Peter Kistemaker",
      quote: "Very responsive, friendly, and professional. Exactly what you want from a turnover partner.",
      meta: "Verified Google Review · Niagara Region",
      photo: property1,
    },
    {
      name: "Gabriella Guo",
      quote: "Friendly, professional, and flexible. The cleaning was done to a high standard — their attention to detail gave me real confidence.",
      meta: "Verified Google Review · Airbnb Host",
      photo: property2,
    },
    {
      name: "Niagara Client",
      quote: "Everything consistently guest-ready. Communication was clear and responsive.",
      meta: "Host / property support",
      photo: property3,
    },
  ];

  const faqs = [
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
            href={SCHEDULING_URL}
            {...ext}
            onClick={() => track("cta_scheduling", { source: "nav" })}
            className="hidden sm:inline-flex min-h-[46px] items-center justify-center gap-1.5 rounded-xl bg-gradient-gold px-4 text-xs font-semibold text-primary-foreground shadow-gold border border-primary/30 transition hover:brightness-110 active:scale-[0.98] focus-gold"
          >
            Request Scheduling
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
                    href={SCHEDULING_URL}
                    {...ext}
                    onClick={() => track("hero_path_scheduling")}
                    className="group sm:col-span-3 relative overflow-hidden rounded-2xl bg-gradient-gold border border-primary/40 p-5 text-primary-foreground shadow-gold transition hover:brightness-110 hover:shadow-[0_20px_60px_-20px_hsl(43_70%_55%/0.55)] active:scale-[0.99] focus-gold cta-attention min-h-[110px]"
                  >
                    <div className="text-[10px] uppercase tracking-[0.18em] opacity-90">Need service now?</div>
                    <div className="font-serif text-xl mt-1.5 leading-snug">Request Client Scheduling</div>
                    <div className="text-xs opacity-90 mt-1.5 max-w-[260px]">Turnovers, emergency coverage, resets, same-day requests.</div>
                    <ArrowRight className="absolute top-5 right-5 h-5 w-5 group-hover:translate-x-0.5 transition" />
                  </a>
                  <a
                    href={ONBOARDING_URL}
                    {...ext}
                    onClick={() => track("hero_path_onboarding")}
                    className="group sm:col-span-2 relative overflow-hidden rounded-2xl border border-primary/40 bg-card/60 p-5 transition hover:border-primary hover:bg-primary/[0.06] active:scale-[0.99] focus-gold min-h-[110px]"
                  >
                    <div className="text-[10px] uppercase tracking-[0.18em] text-primary">Managing properties?</div>
                    <div className="font-serif text-lg mt-1.5 leading-snug">Client On-Boarding</div>
                    <div className="text-xs text-muted-foreground mt-1.5">Recurring or multi-property setup.</div>
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
                  <img
                    src={heroTurnover}
                    alt="Freshly turned-over short-term rental bedroom in the Niagara Region with crisp linens and warm morning light"
                    width={1080}
                    height={1350}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/0 to-background/0" />

                  {/* Floating status chip */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-background/85 backdrop-blur border border-primary/40 px-3 py-1.5 text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                    <span className="uppercase tracking-[0.16em] text-primary font-medium">Guest-Ready</span>
                  </div>

                  {/* Floating timestamp card */}
                  <div className="absolute bottom-4 right-4 glass rounded-xl px-4 py-3 text-xs">
                    <div className="text-muted-foreground uppercase tracking-[0.14em] text-[10px]">Turnover completed</div>
                    <div className="font-serif text-base mt-1">11:42 AM · NOTL</div>
                  </div>
                </div>

                {/* Decorative gold mark */}
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
                Same-day and under-24-hour requests are reviewed first. Coverage is confirmed before scheduling. Rush fee applies under 24 hours.
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
        </section>

        {/* INTAKE */}
        <section id="intake" className="ntc-gold-halo mx-auto max-w-7xl px-4 py-12">
          <div className="grid gap-8 lg:grid-cols-2 items-start">
            <div>
              <SectionLabel>Submit Request</SectionLabel>
              <h2 className="font-serif text-3xl sm:text-4xl mt-4">
                Submit the request. We route it to the right coverage path.
              </h2>
              <p className="text-muted-foreground mt-3">
                Tell us who you are, what property is at risk, and when it needs to be ready.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  ["01", "Identify", "Who you are, the property, the deadline."],
                  ["02", "Route", "We assign the right coverage and dispatch."],
                  ["03", "Confirm", "Scope, price, timing confirmed before scheduling."],
                ].map(([n, t, d]) => (
                  <div key={n} className="flex gap-4 rounded-xl border border-border bg-card p-4">
                    <div className="font-serif text-2xl gold-text w-10">{n}</div>
                    <div>
                      <div className="font-semibold">{t}</div>
                      <div className="text-sm text-muted-foreground">{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="premium-card p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
              <div className="flex items-center justify-between gap-3">
                <Logo />
                <div className="flex flex-col items-end gap-1.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-1 text-[10px] uppercase tracking-wider text-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                    Active intake
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Niagara Region
                  </span>
                </div>
              </div>

              {/* Which form? decision card */}
              <div className="mt-6 rounded-xl border border-border bg-secondary/30 p-4">
                <div className="text-[10px] uppercase tracking-[0.18em] text-primary font-medium">Which form should I use?</div>
                <ul className="mt-3 space-y-2 text-xs">
                  {[
                    ["Turnover, reset, move-out, or same-day clean", "Client Scheduling"],
                    ["Recurring properties or new account setup", "Client On-Boarding"],
                    ["Realtor / investor / PM exploring support", "Client On-Boarding"],
                    ["Urgent property issue right now", "Scheduling + Call"],
                  ].map(([sit, form]) => (
                    <li key={sit} className="flex justify-between gap-3 border-b border-border/60 pb-1.5 last:border-0 last:pb-0">
                      <span className="text-muted-foreground">{sit}</span>
                      <span className="font-medium text-foreground shrink-0">{form}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 space-y-3">
                <a href={SCHEDULING_URL} {...ext} onClick={() => track("intake_scheduling")}
                  className="group block rounded-xl border border-primary/40 bg-gradient-gold-soft p-5 transition hover:border-primary relative overflow-hidden">
                  <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary">
                    <Clock className="h-3 w-3" /> Same-day available
                  </div>
                  <div className="flex items-center justify-between gap-3 mt-5">
                    <div>
                      <div className="text-xs uppercase tracking-[0.16em] text-primary">Primary · Need service now</div>
                      <div className="font-serif text-xl mt-1">Request Client Scheduling</div>
                      <div className="text-sm text-muted-foreground mt-1">Turnovers, backup coverage, resets, listing prep, same-day requests.</div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 group-hover:translate-x-1 transition" />
                  </div>
                </a>

                <a href={ONBOARDING_URL} {...ext} onClick={() => track("intake_onboarding")}
                  className="group block rounded-xl border border-border bg-secondary/50 p-5 transition hover:border-primary/40">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Secondary · Managing properties</div>
                      <div className="font-serif text-xl mt-1">Client On-Boarding</div>
                      <div className="text-sm text-muted-foreground mt-1">New clients, new properties, recurring accounts, operators, managers.</div>
                    </div>
                    <ArrowRight className="h-5 w-5 shrink-0 group-hover:translate-x-1 transition" />
                  </div>
                </a>
              </div>

              {/* Before you submit trust box */}
              <div className="mt-4 rounded-xl border border-primary/30 bg-primary/[0.05] p-4">
                <div className="text-[10px] uppercase tracking-[0.18em] text-primary font-medium flex items-center gap-1.5">
                  <ShieldCheck className="h-3 w-3" /> Before you submit
                </div>
                <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                  {[
                    "No payment before coverage is confirmed",
                    "Final price depends on scope and timing",
                    "Same-day requests are reviewed first",
                    "We confirm next steps before scheduling",
                  ].map((t) => (
                    <li key={t} className="flex gap-2">
                      <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" strokeWidth={3} />
                      <span className="text-foreground/85">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>


        {/* READINESS QUIZ — guide the user to the right path */}
        <section className="ntc-gold-halo mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionLabel>Property Readiness Score</SectionLabel>
              <h2 className="font-serif text-3xl sm:text-4xl mt-4">
                Four questions. <span className="gold-text">One clear path.</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-md">
                Answer below and we'll point you to the right coverage path before you submit.
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
                  { key: "vacant", q: "Is the property currently…", a: "Vacant", b: "Occupied" },
                  { key: "recurring", q: "Is this a one-time or recurring property?", a: "Recurring", b: "One-time" },
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
                    <a
                      href={SCHEDULING_URL}
                      {...ext}
                      onClick={() => track("quiz_to_scheduling", { result: quizResult })}
                      className="mt-4 inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-gradient-gold px-5 text-sm font-semibold text-primary-foreground shadow-gold border border-primary/30 transition hover:brightness-110 active:scale-[0.98] focus-gold"
                    >
                      Submit Client Scheduling <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                )}
              </div>
            </div>
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
                <div className="grid gap-4 sm:grid-cols-2">
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
                </div>

                <div className="mt-6 space-y-2 text-sm">
                  {[
                    { k: "Cancellation loss", v: calc.cancellation, Icon: AlertOctagon },
                    { k: "Rebooking delay", v: calc.rebooking, Icon: Calculator },
                    { k: "Review / reputation risk", v: calc.review, Icon: TrendingUp },
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

                <div className="mt-5 rounded-xl border-2 border-[hsl(var(--gold-deep))] bg-[hsl(43_65%_58%/0.10)] p-4">
                  <p className="text-sm ink leading-snug">
                    If one missed turnover can cost <span className="font-semibold text-[hsl(var(--gold-deep))]">${calc.total.toLocaleString()}</span>, confirming coverage early is the cheaper move.
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
            {/* Featured */}
            <div className="premium-card p-7 lg:row-span-2 relative overflow-hidden flex flex-col">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
              <div className="relative">
                <div className="icon-badge icon-badge-lg shadow-gold">
                  <AlertTriangle className="h-8 w-8" />
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-primary mt-5">
                  <Zap className="h-3 w-3" /> Most requested
                </div>
                <h3 className="font-serif text-3xl mt-4">Emergency Turnover Coverage</h3>
                <p className="text-muted-foreground mt-3">Backup cleaner failed. Guest checks in tonight. We route fast and confirm coverage before you commit.</p>
                <ul className="mt-6 space-y-3">
                  {services[0].points.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative mt-8 flex items-end justify-between">
                <a href={SCHEDULING_URL} {...ext} onClick={() => track("service_emergency")}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
                  Get Emergency Coverage <ArrowRight className="h-4 w-4" />
                </a>
                <div className="font-serif text-5xl gold-text opacity-30 leading-none">24h</div>
              </div>
            </div>

            {/* Supporting cards */}
            {services.slice(1).map((s) => (
              <div key={s.title} className="premium-card p-6 flex flex-col">
                <div className="icon-badge">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="font-serif text-xl mt-5">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
                <ul className="mt-4 space-y-2 text-sm flex-1">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" strokeWidth={3} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* GALLERY TEASER — proof of work, after services */}
        <section className="section-paper">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <SectionLabel onPaper>Before & After</SectionLabel>
                <h2 className="mt-4 font-serif text-3xl sm:text-4xl ink">
                  The impact should be <span className="text-[hsl(var(--gold-deep))]">obvious in seconds.</span>
                </h2>
              </div>
              <p className="lg:col-span-5 text-sm sm:text-base ink-muted max-w-xl lg:ml-auto">
                See real room resets that show the difference between unfinished and guest-ready.
              </p>
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
              <div className="rounded-[var(--radius)] border-2 border-[hsl(var(--gold-deep))] bg-gradient-to-b from-[hsl(43_65%_58%/0.12)] to-transparent p-7">
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

            {/* Recurring — full-width band */}
            <div className="mt-6 paper-card p-7">
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
            <a href="https://maps.app.goo.gl/TQEue1ed1Q6jfzN26" {...ext}
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
                  width={1024} height={768} loading="lazy"
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
                    width={1024} height={768} loading="lazy"
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
          <div className="premium-card p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <div className="absolute inset-x-8 bottom-6 h-px gold-rule opacity-60" />
            <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-primary">
                  <Building2 className="h-3 w-3" /> Operator Mode
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl mt-4">
                  For operators managing <span className="gold-text">more than one property.</span>
                </h2>
                <p className="text-muted-foreground mt-4 max-w-xl">
                  Recurring coverage is not discounted cleaning. It is priority scheduling, readiness tracking, repeatable standards, and faster dispatch across active properties.
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
              </div>
              <div className="lg:col-span-5 flex flex-col gap-3">
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
          </div>
        </section>

        {/* FINAL CTA — full-bleed gold band */}
        <section className="gold-band relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(hsl(var(--ink))_1px,transparent_1px)] [background-size:18px_18px]" />
          <div className="relative mx-auto max-w-5xl px-4 py-20 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--ink))] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--paper))]">
              <ShieldCheck className="h-3 w-3" /> Coverage confirmed before scheduling
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl mt-6 max-w-3xl mx-auto leading-[1.05] ink">
              Don't wait until the property becomes the problem.
            </h2>
            <p className="mt-5 text-base sm:text-lg ink max-w-xl mx-auto opacity-80">
              Submit the request. We'll route the right coverage path and confirm before anything is scheduled.
            </p>
            <div className="mt-6 flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-xs ink opacity-80">
              <span className="inline-flex items-center gap-1.5"><Star className="h-3.5 w-3.5 fill-[hsl(var(--ink))]" /> ★★★★★ Verified Niagara reviews</span>
              <span className="inline-flex items-center gap-1.5"><Camera className="h-3.5 w-3.5" /> Photo proof available</span>
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Coverage confirmed first</span>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a href={SCHEDULING_URL} {...ext} onClick={() => track("final_scheduling")}
                className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-xl bg-[hsl(var(--ink))] px-7 text-sm font-semibold text-[hsl(var(--paper))] hover:bg-[hsl(0_0%_15%)] transition active:scale-[0.98]">
                Request Client Scheduling <ArrowRight className="h-4 w-4" />
              </a>
              <a href={PHONE_TEL} onClick={() => track("final_call")}
                className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-xl border-2 border-[hsl(var(--ink))] px-7 text-sm font-semibold ink hover:bg-[hsl(var(--ink))] hover:text-[hsl(var(--paper))] transition">
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
                  width={1280} height={800} loading="lazy"
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
            onClick={() => track("mobile_bar_schedule")}
            className="col-span-2 inline-flex min-h-[48px] flex-col items-center justify-center gap-0 rounded-xl border-2 border-primary/60 bg-primary/10 px-2 text-sm font-semibold focus-gold leading-tight"
          >
            <span className="inline-flex items-center gap-1">Urgent <ArrowRight className="h-3.5 w-3.5" /></span>
            <span className="text-[10px] font-normal opacity-75">Schedule</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
