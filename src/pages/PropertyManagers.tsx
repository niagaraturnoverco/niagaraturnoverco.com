import { Building2, Receipt, ClipboardList, Zap, ArrowRight } from "lucide-react";
import Seo from "@/components/Seo";
import QuoteForm from "@/components/QuoteForm";
import SiteImage from "@/components/SiteImage";
import { CallLink, CoiCta, HowWeOperate, TrustStrip, scrollToQuote } from "@/components/CommercialBlocks";
import propertyImage from "@/assets/property-4.jpg";

const points = [
  { icon: Building2, title: "Multi-site coverage", desc: "One provider across your buildings in St. Catharines, Niagara Falls, Welland, Thorold, NOTL, Fort Erie and Port Colborne." },
  { icon: Receipt, title: "Consolidated monthly invoice", desc: "One itemized invoice, broken down by property and scope, so cost allocation is simple." },
  { icon: ClipboardList, title: "Inspection reporting", desc: "A written inspection report per building every month — ready to forward to owners or boards." },
  { icon: Zap, title: "Quick response to tenant complaints", desc: "Send a complaint to your NTC contact and we deal with it — no chasing individual cleaners." },
];

export default function PropertyManagers() {
  return (
    <div>
      <Seo title="Cleaning for Property Managers in Niagara | Multi-Site | NTC" description="Common area and commercial cleaning for Niagara property managers: multi-site coverage, one consolidated invoice, monthly inspection reports per building." path="/property-managers" />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-primary">Property Managers</div>
          <h1 className="font-serif text-4xl sm:text-5xl mt-5 leading-[1.05]">One cleaning partner for every building you manage</h1>
          <p className="mt-5 text-muted-foreground">Managing several buildings means juggling cleaners, invoices and tenant complaints. We take that off your desk with one point of contact, one invoice and a written report for each property every month.</p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a href="#quote" onClick={scrollToQuote} className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-gradient-gold px-6 text-sm font-semibold text-primary-foreground shadow-gold">Get a Walkthrough Quote <ArrowRight className="h-4 w-4" /></a>
            <CallLink />
          </div>
          <div className="mt-6"><TrustStrip /></div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {points.map((p) => (
              <div key={p.title} className="premium-card p-6">
                <p.icon className="h-5 w-5 text-primary" />
                <h2 className="font-serif text-xl mt-3">{p.title}</h2>
                <p className="text-sm text-muted-foreground mt-2">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6"><CoiCta /></div>
        </div>
        <div className="lg:col-span-5 space-y-5">
          <SiteImage
            src={propertyImage}
            alt="Premium multi-residential property maintained for owners and property managers"
            className="aspect-[16/10] rounded-xl border border-primary/20 shadow-elegant lg:aspect-[4/3]"
            sizes="(min-width: 1024px) 40vw, 100vw"
            loading="eager"
            fetchPriority="high"
          />
          <QuoteForm defaultFacility="Property common areas" />
        </div>
      </section>
      <HowWeOperate />
    </div>
  );
}
