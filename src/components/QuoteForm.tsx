import { ArrowRight, Phone } from "lucide-react";
import { AIRTABLE_URL, trackLead, PHONE, PHONE_TEL } from "@/lib/leads";

export default function QuoteForm({ id = "quote" }: { id?: string; defaultCity?: string; defaultFacility?: string }) {
  return (
    <div id={id} className="premium-card p-6 sm:p-8 scroll-mt-24 text-center">
      <h3 className="font-serif text-2xl">Get a Walkthrough Quote</h3>
      <p className="mt-3 text-muted-foreground">
        Tell us about your space in our quick form — we'll call you within 2 business hours to book a free
        20-minute walkthrough. Exact pricing is confirmed on site, no obligation.
      </p>
      <a
        href={AIRTABLE_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackLead("quote_airtable_click")}
        className="mt-6 inline-flex w-full min-h-[52px] items-center justify-center gap-2 rounded-xl bg-gradient-gold px-6 text-sm font-semibold text-primary-foreground shadow-gold"
      >
        Get a Walkthrough Quote <ArrowRight className="h-4 w-4" />
      </a>
      <p className="mt-5 text-sm text-muted-foreground">Prefer to talk?</p>
      <a
        href={PHONE_TEL}
        className="mt-2 inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-border px-6 text-sm font-semibold"
      >
        <Phone className="h-4 w-4" /> Call or text {PHONE}
      </a>
    </div>
  );
}
