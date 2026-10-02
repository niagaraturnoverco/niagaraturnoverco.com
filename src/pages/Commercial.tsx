import { Link } from "react-router-dom";
import { Building2, Stethoscope, Warehouse, GraduationCap, HardHat, Sparkles, ArrowRight } from "lucide-react";
import Seo from "@/components/Seo";
import QuoteForm from "@/components/QuoteForm";
import SiteImage from "@/components/SiteImage";
import { CallLink, CoiCta, CommercialResults, HowWeOperate, TrustStrip, scrollToQuote } from "@/components/CommercialBlocks";
import heroOffice from "@/assets/hero-office.jpg";

const services = [
  { icon: Building2, title: "Office & Janitorial", desc: "Nightly or scheduled janitorial for offices and professional suites.", to: "/office-cleaning" },
  { icon: Stethoscope, title: "Medical, Dental & Clinic", desc: "Protocol-driven cleaning for treatment rooms, waiting areas and washrooms.", to: "/medical-office-cleaning" },
  { icon: Warehouse, title: "Property Common Areas", desc: "Lobbies, corridors, elevators, stairwells, amenity rooms and garbage rooms.", to: "/property-common-area-cleaning" },
  { icon: GraduationCap, title: "Student Housing Move-Out", desc: "Full unit resets on tight turnover windows between tenancies.", to: "/property-managers" },
  { icon: HardHat, title: "Post-Construction", desc: "Rough, final and touch-up cleans so the space hands over ready.", to: "/post-construction-cleaning" },
  { icon: Sparkles, title: "Floor Care", desc: "Strip and wax, burnishing, carpet extraction and hard-surface restoration.", to: "/office-cleaning" },
];

export default function Commercial() {
  return (
    <div>
      <Seo title="Commercial Cleaning Niagara | Offices, Clinics, Common Areas | NTC" description="Commercial, janitorial and facility cleaning across the Niagara Region. Insured, WSIB-cleared, monthly inspection reports, 30-day cancellation." path="/commercial" />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:py-20 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-primary">
            <Building2 className="h-3 w-3" /> Commercial &amp; Facilities
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl mt-5 leading-[1.05]">
            Commercial cleaning across Niagara — <span className="gold-text italic">inspected, reported, never missed.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Janitorial, facility and post-construction cleaning for offices, clinics, property common areas and student housing across Niagara Falls, St. Catharines, Welland, Thorold, NOTL, Port Colborne and Fort Erie.
          </p>
          <SiteImage
            src={heroOffice}
            alt="Bright, professionally maintained office ready for the workday"
            className="mt-7 aspect-[16/10] rounded-xl border border-primary/20 shadow-elegant lg:hidden"
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
          />
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a href="#quote" onClick={scrollToQuote} className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-gradient-gold px-6 text-sm font-semibold text-primary-foreground shadow-gold border border-primary/30">
              Get a Walkthrough Quote <ArrowRight className="h-4 w-4" />
            </a>
            <CallLink />
          </div>
          <div className="mt-6"><TrustStrip /></div>
        </div>
        <div className="space-y-5 lg:col-span-5">
          <SiteImage
            src={heroOffice}
            alt="Bright, professionally maintained office ready for the workday"
            className="hidden aspect-[4/3] rounded-xl border border-primary/20 shadow-elegant lg:block"
            sizes="(min-width: 1024px) 40vw, 100vw"
            loading="eager"
            fetchPriority="high"
          />
          <QuoteForm />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
        <h2 className="font-serif text-3xl sm:text-4xl">What we clean</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link key={s.title} to={s.to} className="premium-card p-6 hover:border-primary/60 transition">
              <s.icon className="h-5 w-5 text-primary" />
              <h3 className="font-serif text-xl mt-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <HowWeOperate />
      <CommercialResults />
      <section className="mx-auto max-w-7xl px-4 pb-16"><CoiCta /></section>
    </div>
  );
}
