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
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Building2,
  Home,
  Briefcase,
  Star,
  Mail,
  MessageSquare,
} from "lucide-react";

const SCHEDULING_URL =
  "https://airtable.com/app3bo82kH3gBbh7D/pagam8AZIIRd6Xqew/form";
const ONBOARDING_URL =
  "https://airtable.com/app3bo82kH3gBbh7D/pagfETpx8mh312gUE/form";
const PHONE = "(289) 257-7725";
const PHONE_TEL = "tel:+12892577725";
const PHONE_SMS = "sms:+12892577725";

// analytics-ready event hook
const track = (event: string, payload?: Record<string, unknown>) => {
  // @ts-expect-error dataLayer is optional
  if (typeof window !== "undefined" && window.dataLayer) {
    // @ts-expect-error dataLayer is optional
    window.dataLayer.push({ event, ...payload });
  }
};

const ext = {
  target: "_blank" as const,
  rel: "noopener noreferrer" as const,
};


const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <div className="relative h-10 w-10 shrink-0">
      <div className="absolute inset-0 rounded-lg bg-gradient-gold shadow-gold" />
      <div className="absolute inset-[1px] rounded-[7px] bg-background flex items-center justify-center">
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

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-primary">
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
    className={`inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-gradient-gold px-6 text-sm font-semibold text-primary-foreground shadow-gold transition hover:brightness-110 active:scale-[0.98] ${className}`}
  >
    {children}
    <ArrowRight className="h-4 w-4" />
  </a>
);

const SecondaryCTA = ({
  children,
  source,
  className = "",
}: {
  children: React.ReactNode;
  source: string;
  className?: string;
}) => (
  <a
    href={ONBOARDING_URL}
    {...ext}
    onClick={() => track("cta_onboarding", { source })}
    className={`inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary/5 px-6 text-sm font-semibold text-foreground transition hover:bg-primary/10 active:scale-[0.98] ${className}`}
  >
    {children}
  </a>
);

const Index = () => {

  const [rate, setRate] = useState<number>(220);
  const [nights, setNights] = useState<number>(2);

  const calc = useMemo(() => {
    const cancellation = rate * nights;
    const rebooking = rate * 2 * 0.5;
    const review = 600;
    const coord = 150;
    const total = cancellation + rebooking + review + coord;
    return { cancellation, rebooking, review, coord, total };
  }, [rate, nights]);

  const services = [
    {
      icon: AlertTriangle,
      title: "Emergency Turnover Coverage",
      desc: "Backup cleaner failed. Guest checks in tonight. We route fast.",
      points: [
        "Same-day & last-minute requests",
        "Backup cleaner coverage",
        "Rush dispatch under 24h",
      ],
    },
    {
      icon: Sparkles,
      title: "Property Readiness / Listing Prep",
      desc: "Get the property camera-ready, showing-ready, guest-ready.",
      points: [
        "Listing prep for realtors",
        "Move-in / move-out resets",
        "Heavy reset & deep clean",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Recurring Turnover Support",
      desc: "Ongoing readiness for hosts, managers, and operators.",
      points: [
        "Priority scheduling",
        "Account & property setup",
        "Readiness tracking",
      ],
    },
  ];

  const pricing = [
    { size: "1 Bedroom", price: "$199" },
    { size: "2 Bedroom", price: "$269" },
    { size: "3 Bedroom", price: "$329" },
    { size: "4 Bedroom", price: "$399" },
    { size: "5+ Bedroom", price: "$499+" },
  ];

  const addons = [
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
    { icon: ShieldCheck, label: "Not for bargain shopping" },
  ];

  const testimonials = [
    {
      name: "Peter Kistemaker",
      quote:
        "Very responsive, friendly, and professional. Exactly what you want from a turnover partner.",
      meta: "Verified Google Review · Niagara Region",
    },
    {
      name: "Gabriella Guo",
      quote:
        "Friendly, professional, and flexible. The cleaning was done to a high standard — their attention to detail gave me real confidence.",
      meta: "Verified Google Review · Airbnb Host",
    },
    {
      name: "Niagara Client",
      quote:
        "Everything consistently guest-ready. Communication was clear and responsive.",
      meta: "Host / property support",
    },
  ];

  const faqs = [
    {
      q: "How fast can you confirm availability?",
      a: "Urgent and same-day requests are reviewed within hours during operating windows. Standard requests are reviewed within 24 hours. Coverage is confirmed before scheduling.",
    },
    {
      q: "Do I pay before you confirm coverage?",
      a: "No. Scope, timing, price, and deposit / payment terms are confirmed first. High-risk or same-day jobs may require full payment upfront once coverage is confirmed.",
    },
    {
      q: "Are you only for Airbnb hosts?",
      a: "No. We work with STR hosts, property managers, realtors, investors, operators, and homeowners across the Niagara Region.",
    },
    {
      q: "Are you the cheapest option?",
      a: "No. NTC is built for properties where timing, reliability, and presentation matter. We are a premium local operator, not a bargain cleaner.",
    },
    {
      q: "Do you offer property management or co-hosting?",
      a: "We focus on turnover coverage and property readiness. For recurring operator relationships we offer priority dispatch and account setup through our Client On-Boarding path.",
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
            <a
              href={PHONE_TEL}
              onClick={() => track("alert_call")}
              className="underline underline-offset-2 font-semibold"
            >
              {PHONE}
            </a>
          </span>
        </div>
      </div>

      {/* Sticky nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <a href="#top" className="flex items-center">
            <Logo />
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#intake" className="hover:text-foreground">Submit Request</a>
            <a href="#services" className="hover:text-foreground">Services</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
          </nav>
          <PrimaryCTA source="nav" className="hidden sm:inline-flex !min-h-[42px] !px-4 text-xs">
            Schedule Service
          </PrimaryCTA>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 ntc-grid-bg opacity-40" />
          <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_top,hsl(43_65%_58%/0.18),transparent_60%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-14 sm:py-20">
            <div className="flex flex-col items-start gap-6 max-w-3xl">
              <SectionLabel>Niagara Property Readiness</SectionLabel>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
                When a property is not ready,{" "}
                <span className="gold-text">everything downstream</span> gets expensive.
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
                Niagara Turnover Co. handles emergency turnover coverage, listing prep, move-out resets, and recurring property readiness support for hosts, property managers, realtors, and operators.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <PrimaryCTA source="hero" className="w-full sm:w-auto">
                  Request Client Scheduling
                </PrimaryCTA>
                <SecondaryCTA source="hero" className="w-full sm:w-auto">
                  Client On-Boarding
                </SecondaryCTA>
              </div>
              <p className="text-xs text-muted-foreground max-w-xl">
                No payment before coverage is confirmed. Scope, timing, price, and deposit / payment terms are confirmed before scheduling.
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs uppercase tracking-[0.16em] text-muted-foreground pt-2">
                <span>Hosts</span><span className="opacity-40">/</span>
                <span>Property Managers</span><span className="opacity-40">/</span>
                <span>Realtors</span><span className="opacity-40">/</span>
                <span>Operators</span>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { k: "24h", v: "Priority review window" },
                { k: "7", v: "Niagara service areas" },
                { k: "+50%", v: "Rush fee under 24h notice" },
              ].map((s) => (
                <div key={s.v} className="premium-card p-5">
                  <div className="font-serif text-3xl gold-text">{s.k}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RISK CARD */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="premium-card p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
            <SectionLabel>The Real Risk</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl mt-4 max-w-2xl">
              The cleaner is not the only risk. <span className="gold-text">The timeline is.</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl">
              Missed readiness creates refunds, bad reviews, delayed showings, owner complaints, and last-minute coordination problems.
            </p>
            <div className="grid gap-3 sm:grid-cols-3 mt-8">
              {[
                "Guest checks in before the unit is ready",
                "Listing photos or showings happen too soon",
                "Vendor follow-up becomes your job",
              ].map((r) => (
                <div key={r} className="flex gap-3 rounded-xl border border-border bg-secondary/40 p-4">
                  <AlertTriangle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTAKE */}
        <section id="intake" className="mx-auto max-w-7xl px-4 py-12">
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

              <div className="mt-6 space-y-3">
                <a
                  href={SCHEDULING_URL}
                  {...ext}
                  onClick={() => track("intake_scheduling")}
                  className="group block rounded-xl border border-primary/40 bg-gradient-gold-soft p-5 transition hover:border-primary"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs uppercase tracking-[0.16em] text-primary">Primary</div>
                      <div className="font-serif text-xl mt-1">Client Scheduling</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Turnovers, backup coverage, resets, listing prep, same-day requests.
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 group-hover:translate-x-1 transition" />
                  </div>
                </a>

                <a
                  href={ONBOARDING_URL}
                  {...ext}
                  onClick={() => track("intake_onboarding")}
                  className="group block rounded-xl border border-border bg-secondary/50 p-5 transition hover:border-primary/40"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Secondary</div>
                      <div className="font-serif text-xl mt-1">Client On-Boarding</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        New clients, new properties, recurring accounts, operators, managers.
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 shrink-0 group-hover:translate-x-1 transition" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>


        {/* CALCULATOR */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <SectionLabel>Cost of Failure</SectionLabel>
              <h2 className="font-serif text-3xl sm:text-4xl mt-4">
                One unready property can cost <span className="gold-text">more than the turnover.</span>
              </h2>
              <p className="text-muted-foreground mt-3">
                Estimate the downstream cost of a missed readiness window.
              </p>
            </div>

            <div className="premium-card p-6 sm:p-8 lg:col-span-3">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Nightly rate ($)</label>
                  <Input
                    type="number"
                    min={0}
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value) || 0)}
                    className="h-12 mt-1.5 bg-input"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Nights at risk</label>
                  <Input
                    type="number"
                    min={0}
                    value={nights}
                    onChange={(e) => setNights(Number(e.target.value) || 0)}
                    className="h-12 mt-1.5 bg-input"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-2 text-sm">
                {[
                  ["Cancellation loss", calc.cancellation],
                  ["Rebooking delay", calc.rebooking],
                  ["Review / reputation risk", calc.review],
                  ["Coordination time", calc.coord],
                ].map(([k, v]) => (
                  <div key={k as string} className="flex justify-between border-b border-border/60 py-2">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium">${(v as number).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl bg-gradient-gold-soft border border-primary/30 p-4 flex items-center justify-between">
                <span className="uppercase tracking-wider text-xs text-primary">Estimated risk</span>
                <span className="font-serif text-3xl gold-text">
                  ${calc.total.toLocaleString()}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                <PrimaryCTA source="calculator" className="w-full sm:w-auto">
                  Request Client Scheduling
                </PrimaryCTA>
                <SecondaryCTA source="calculator" className="w-full sm:w-auto">
                  Client On-Boarding
                </SecondaryCTA>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                This calculator is an estimate, not a quote.
              </p>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="mx-auto max-w-7xl px-4 py-12">
          <div className="max-w-3xl">
            <SectionLabel>Services</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl mt-4">
              One readiness system for the property problems that <span className="gold-text">actually cost money.</span>
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="premium-card p-6 flex flex-col">
                <div className="h-11 w-11 rounded-lg bg-gradient-gold-soft border border-primary/30 flex items-center justify-center">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-serif text-xl mt-4">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
                <ul className="mt-4 space-y-2 text-sm flex-1">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <SectionLabel>How It Works</SectionLabel>
          <h2 className="font-serif text-3xl sm:text-4xl mt-4 max-w-2xl">
            From request to <span className="gold-text">guest-ready</span> in four clear steps.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Submit the property request"],
              ["02", "We confirm the right path"],
              ["03", "Price and availability are confirmed"],
              ["04", "The property gets handled"],
            ].map(([n, t]) => (
              <div key={n} className="premium-card p-6">
                <div className="font-serif text-4xl gold-text">{n}</div>
                <div className="mt-3 font-medium">{t}</div>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="mx-auto max-w-7xl px-4 py-12">
          <div className="max-w-3xl">
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl mt-4">
              Simple starting points. <span className="gold-text">Final price is confirmed after scope.</span>
            </h2>
            <p className="text-muted-foreground mt-3">
              NTC is built for properties where timing, reliability, and presentation matter. Pricing depends on size, condition, laundry, access, timing, and urgency.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3 mt-8">
            <div className="premium-card p-6">
              <h3 className="font-serif text-xl">Standard Turnovers</h3>
              <div className="mt-4 divide-y divide-border/60">
                {pricing.map((p) => (
                  <div key={p.size} className="flex justify-between py-3 text-sm">
                    <span>{p.size}</span>
                    <span className="font-semibold gold-text">{p.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="premium-card p-6">
              <h3 className="font-serif text-xl">Common Add-ons</h3>
              <div className="mt-4 divide-y divide-border/60">
                {addons.map(([k, v]) => (
                  <div key={k} className="flex justify-between py-3 text-sm">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="premium-card p-6">
              <h3 className="font-serif text-xl">Same-Day / Emergency</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex gap-2">
                  <AlertTriangle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  Less than 24 hours notice: <span className="font-semibold gold-text">+50% rush fee</span>
                </li>
                <li className="flex gap-2">
                  <AlertTriangle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  High-risk or same-day jobs may require full payment upfront
                </li>
                <li className="flex gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  Coverage is confirmed before scheduling
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 premium-card p-6 sm:p-8">
            <h3 className="font-serif text-xl">Recurring Coverage</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {recurring.map((r) => (
                <div key={r.name} className="rounded-xl border border-border bg-secondary/40 p-4">
                  <div className="text-sm text-muted-foreground">{r.name}</div>
                  <div className="font-serif text-xl gold-text mt-1">{r.price}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Monthly coverage plans are not cheap bundled turnovers. They are for recurring hosts and property operators who want priority scheduling, account setup, readiness tracking, and faster dispatch. Turnover pricing is still confirmed based on property size, scope, and frequency.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <PrimaryCTA source="pricing">Request Client Scheduling</PrimaryCTA>
              <SecondaryCTA source="pricing">Client On-Boarding</SecondaryCTA>
            </div>
          </div>
        </section>

        {/* WHO THIS IS FOR */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <SectionLabel>Who This Is For</SectionLabel>
          <h2 className="font-serif text-3xl sm:text-4xl mt-4 max-w-2xl">
            Built for operators who treat readiness as <span className="gold-text">a system</span>, not a chore.
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {audience.map((a) => (
              <div key={a.label} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                <div className="h-9 w-9 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <a.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium">{a.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <SectionLabel>Proof</SectionLabel>
          <h2 className="font-serif text-3xl sm:text-4xl mt-4">
            What clients say about <span className="gold-text">working with NTC.</span>
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="premium-card p-6 flex flex-col">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed flex-1">"{t.quote}"</p>
                <div className="mt-5 pt-4 border-t border-border/60">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{t.meta}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <a
              href="https://maps.app.goo.gl/TQEue1ed1Q6jfzN26"
              {...ext}
              onClick={() => track("google_reviews")}
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              View Google Reviews <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-4 py-12">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="font-serif text-3xl sm:text-4xl mt-4">
            Answers, <span className="gold-text">no fluff.</span>
          </h2>
          <Accordion type="single" collapsible className="mt-6">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-border premium-card !rounded-xl mb-3 px-5"
              >
                <AccordionTrigger className="text-left font-medium hover:no-underline py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* FINAL CTA */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="premium-card p-8 sm:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(43_65%_58%/0.15),transparent_60%)]" />
            <div className="relative">
              <h2 className="font-serif text-3xl sm:text-5xl max-w-3xl mx-auto">
                Do not wait until the property becomes <span className="gold-text">the problem.</span>
              </h2>
              <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
                <PrimaryCTA source="final">Client Scheduling</PrimaryCTA>
                <a
                  href={PHONE_TEL}
                  onClick={() => track("final_call")}
                  className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary/5 px-6 text-sm font-semibold hover:bg-primary/10"
                >
                  <Phone className="h-4 w-4" /> Call {PHONE}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SHERKSTON PARTNER */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="premium-card p-6 sm:p-10">
            <div className="grid gap-6 md:grid-cols-2 items-center">
              <div>
                <SectionLabel>Partner</SectionLabel>
                <h2 className="font-serif text-2xl sm:text-3xl mt-4">
                  Private Rental Cottages at <span className="gold-text">Sherkston Shores Resort</span>
                </h2>
                <p className="text-sm text-muted-foreground mt-3">
                  For guests looking for privately owned cottage rentals at Sherkston Shores Resort, Sherkston Private Rentals offers a free cottage showcase service to help renters connect with available private rentals.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
                <a
                  href="https://sherkstonprivaterentals.com/"
                  {...ext}
                  onClick={() => track("sherkston_home")}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary/5 px-5 text-sm font-semibold hover:bg-primary/10"
                >
                  Visit Home Page <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="https://sherkstonprivaterentals.com/home-1/"
                  {...ext}
                  onClick={() => track("sherkston_cottages")}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-gold px-5 text-sm font-semibold text-primary-foreground shadow-gold hover:brightness-110"
                >
                  Find a Cottage <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-border/60 mt-12 pb-28 md:pb-12">
          <div className="mx-auto max-w-7xl px-4 py-12 grid gap-8 md:grid-cols-3">
            <div>
              <Logo />
              <p className="text-sm text-muted-foreground mt-4 max-w-sm">
                Premium property turnover & readiness for the Niagara Region.
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
        <div className="grid grid-cols-2 gap-2 p-2.5">
          <a
            href={PHONE_TEL}
            onClick={() => track("mobile_bar_call")}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary/5 text-sm font-semibold"
          >
            <Phone className="h-4 w-4" /> Call
          </a>
          <a
            href={SCHEDULING_URL}
            {...ext}
            onClick={() => track("mobile_bar_schedule")}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-gold text-primary-foreground font-semibold shadow-gold"
          >
            <Calendar className="h-4 w-4" /> Schedule
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
