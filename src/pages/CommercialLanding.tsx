import { useLocation, Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Seo, { breadcrumbJsonLd, faqJsonLd } from "@/components/Seo";
import QuoteForm from "@/components/QuoteForm";
import { CallLink, CoiCta, HowWeOperate, TrustStrip, scrollToQuote } from "@/components/CommercialBlocks";
import { COMMERCIAL_PAGES, findCommercialPage } from "@/data/commercialPages";
import NotFound from "./NotFound";

const CITY_LINKS = COMMERCIAL_PAGES.filter((p) => p.city);

export default function CommercialLanding() {
  const { pathname } = useLocation();
  const page = findCommercialPage(pathname.replace(/\/$/, "") || "/");
  if (!page) return <NotFound />;

  const crumbs = [{ name: "Home", path: "/" }];
  if (page.city) crumbs.push({ name: "Office Cleaning", path: "/office-cleaning" });
  crumbs.push({ name: page.h1, path: page.path });

  return (
    <div>
      <Seo title={page.title} description={page.description} path={page.path} jsonLd={[faqJsonLd(page.faqs), breadcrumbJsonLd(crumbs)]} />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-primary">{page.eyebrow}</div>
          <h1 className="font-serif text-4xl sm:text-5xl mt-5 leading-[1.05]">{page.h1}</h1>
          <div className="mt-6 space-y-4 text-muted-foreground">
            {page.intro.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a href="#quote" onClick={scrollToQuote} className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-gradient-gold px-6 text-sm font-semibold text-primary-foreground shadow-gold border border-primary/30">
              Get a Walkthrough Quote <ArrowRight className="h-4 w-4" />
            </a>
            <CallLink />
          </div>
          <div className="mt-6"><TrustStrip /></div>
        </div>
        <div className="lg:col-span-5">
          <QuoteForm defaultCity={page.city} defaultFacility={page.facility} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="font-serif text-3xl sm:text-4xl">What's included</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {page.included.map((g) => (
            <div key={g.heading} className="premium-card p-6">
              <h3 className="font-serif text-xl">{g.heading}</h3>
              <ul className="mt-4 space-y-2">
                {g.items.map((it) => (
                  <li key={it} className="flex gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <HowWeOperate />

      <section className="mx-auto max-w-3xl px-4 py-14">
        <h2 className="font-serif text-3xl sm:text-4xl">Frequently asked questions</h2>
        <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
          {page.faqs.map((f) => (
            <details key={f.q} className="p-5 group">
              <summary className="cursor-pointer font-medium list-none flex justify-between gap-4">{f.q}<span className="text-primary group-open:rotate-45 transition">+</span></summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3"><CoiCta /><CallLink /></div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="font-serif text-2xl">Office cleaning by city</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {CITY_LINKS.map((c) => (
            <Link key={c.path} to={c.path} className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary">{c.city}</Link>
          ))}
          <Link to="/medical-office-cleaning" className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary">Medical &amp; dental</Link>
          <Link to="/property-common-area-cleaning" className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary">Common areas</Link>
          <Link to="/post-construction-cleaning" className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary">Post-construction</Link>
          <Link to="/property-managers" className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary">Property managers</Link>
        </div>
      </section>
    </div>
  );
}
