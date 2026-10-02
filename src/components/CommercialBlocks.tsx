import { CheckCircle2, ClipboardList, FileText, Leaf, ShieldCheck, Users, Phone, FileCheck } from "lucide-react";
import { PHONE, PHONE_TEL } from "@/lib/leads";

export const OPERATE = [
  { icon: Users, title: "One NTC point of contact", desc: "One NTC point of contact for your account." },
  { icon: ClipboardList, title: "Monthly inspection", desc: "A written inspection report delivered within five business days." },
  { icon: FileText, title: "Posted daily washroom logs", desc: "Signed logs kept on site so your staff can see the last service." },
  { icon: ShieldCheck, title: "Missed-clean policy", desc: "If a scheduled clean can't happen, we notify you the same day and reschedule within 24 hours." },
  { icon: Leaf, title: "Green-certified products", desc: "Safety Data Sheets kept on site for every product we use." },
  { icon: CheckCircle2, title: "Month-to-month terms", desc: "30-day cancellation, no lock-in, one itemized monthly invoice." },
];

export function HowWeOperate() {
  return (
    <section className="section-paper">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
        <h2 className="font-serif text-3xl sm:text-4xl ink">How we operate</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OPERATE.map((o) => (
            <div key={o.title} className="paper-card p-6">
              <o.icon className="h-5 w-5 text-[hsl(var(--gold-deep))]" />
              <h3 className="font-serif text-lg mt-3 ink">{o.title}</h3>
              <p className="text-sm ink-muted mt-2">{o.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustStrip() {
  const items = ["Insured", "WSIB-cleared", "Monthly inspection reports", "30-day cancellation, no lock-in"];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-xl border border-primary/25 bg-primary/[0.04] overflow-hidden w-full">
      {items.map((t) => (
        <div key={t} className="bg-card/60 px-3 py-3 flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
          <span className="text-[11px] sm:text-xs font-medium leading-snug">{t}</span>
        </div>
      ))}
    </div>
  );
}

export function CoiCta() {
  return (
    <a
      href="mailto:niagaraturnoverco@gmail.com?subject=Request%3A%20Certificate%20of%20insurance%20%2B%20WSIB%20clearance"
      className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border-2 border-primary/50 bg-primary/10 px-5 text-sm font-semibold"
    >
      <FileCheck className="h-4 w-4" /> Request certificate of insurance + WSIB clearance
    </a>
  );
}

/** Placeholder slots — replace with real, verified results only. */
export const COMMERCIAL_RESULTS: { client: string; size: string; frequency: string; result: string }[] = [];

export function CommercialResults() {
  const slots = COMMERCIAL_RESULTS.length
    ? COMMERCIAL_RESULTS
    : [1, 2, 3].map(() => ({ client: "[Client type]", size: "[Building size]", frequency: "[Frequency]", result: "[One-line result]" }));
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <h2 className="font-serif text-3xl sm:text-4xl">Commercial results</h2>
      {!COMMERCIAL_RESULTS.length && (
        <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">Placeholder — real client results coming soon</p>
      )}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {slots.map((r, i) => (
          <div key={i} className="premium-card p-6">
            <div className="text-xs uppercase tracking-[0.16em] text-primary">{r.client}</div>
            <div className="mt-2 text-sm text-muted-foreground">{r.size} · {r.frequency}</div>
            <p className="mt-3 font-serif text-lg">{r.result}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CallLink({ className = "" }: { className?: string }) {
  return (
    <a href={PHONE_TEL} className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border-2 border-primary/60 bg-primary/10 px-6 text-sm font-semibold ${className}`}>
      <Phone className="h-4 w-4" /> {PHONE}
    </a>
  );
}

export const scrollToQuote = (e?: React.MouseEvent) => {
  const el = document.getElementById("quote");
  if (el) {
    e?.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
