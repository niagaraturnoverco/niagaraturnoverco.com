import { useRef, useState } from "react";
import { z } from "zod";
import { ArrowRight, ArrowLeft, CheckCircle2, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getUtm, trackLead, PHONE, PHONE_TEL } from "@/lib/leads";

const FACILITY = ["Office", "Medical/Dental", "Property common areas", "Post-construction", "Other"];
const SIZES = ["Under 2,000 sq ft", "2,000–5,000 sq ft", "5,000–10,000 sq ft", "10,000–25,000 sq ft", "25,000+ sq ft"];
const FREQ = ["1x per week", "2x per week", "3x per week", "5x per week", "One-time"];
const CITIES = ["St. Catharines", "Niagara Falls", "Welland", "Thorold", "Niagara-on-the-Lake", "Fort Erie", "Port Colborne", "Other / multiple"];
const TIMES = ["Weekday morning", "Weekday afternoon", "Weekday evening", "Any time"];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().max(150),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a phone number").max(30),
  time: z.string().max(50),
  notes: z.string().trim().max(1000),
});

const chip = (active: boolean) =>
  `min-h-[44px] rounded-xl border px-3 py-2 text-sm text-left transition ${
    active ? "border-primary bg-primary/10 font-semibold" : "border-border bg-card hover:border-primary/50"
  }`;
const field = "w-full min-h-[44px] rounded-xl border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40";

export default function QuoteForm({ id = "quote", defaultCity, defaultFacility }: { id?: string; defaultCity?: string; defaultFacility?: string }) {
  const [step, setStep] = useState(1);
  const [facility, setFacility] = useState(defaultFacility ?? "");
  const [size, setSize] = useState("");
  const [freq, setFreq] = useState("");
  const [city, setCity] = useState(defaultCity ?? "");
  const [c, setC] = useState({ name: "", company: "", email: "", phone: "", time: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const started = useRef(false);

  const pickFacility = (f: string) => {
    setFacility(f);
    if (!started.current) {
      started.current = true;
      trackLead("quote_step1_start");
    }
  };

  const toStep3 = () => {
    trackLead("quote_step2_complete");
    setStep(3);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(c);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setBusy(true);
    const d = parsed.data;
    const { error } = await supabase.from("walkthrough_requests").insert({
      facility_type: facility,
      square_footage: size,
      frequency: freq,
      city,
      locations: city,
      company: d.company || null,
      contact_name: d.name,
      contact_email: d.email,
      contact_phone: d.phone,
      preferred_time: d.time || null,
      notes: d.notes || null,
      source_page: window.location.pathname,
      ...getUtm(),
    });
    setBusy(false);
    if (error) {
      setErrors({ form: "Something went wrong. Please call us instead." });
      return;
    }
    trackLead("quote_submit");
    setDone(true);
  };

  return (
    <div id={id} className="premium-card p-6 sm:p-8 scroll-mt-24">
      {done ? (
        <div className="text-center py-6">
          <CheckCircle2 className="h-10 w-10 text-primary mx-auto" />
          <h3 className="font-serif text-2xl mt-4">Request received</h3>
          <p className="text-muted-foreground mt-2">We'll call you within 2 business hours to book your walkthrough.</p>
          <a href={PHONE_TEL} className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-gradient-gold px-6 text-sm font-semibold text-primary-foreground shadow-gold">
            <Phone className="h-4 w-4" /> Call now {PHONE}
          </a>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl">Get a Walkthrough Quote</h3>
            <span className="text-xs text-muted-foreground">Step {step} of 3</span>
          </div>
          <div className="mt-3 h-1 w-full rounded bg-muted overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: `${(step / 3) * 100}%` }} />
          </div>

          {step === 1 && (
            <div className="mt-6">
              <p className="text-sm font-medium">What type of facility?</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {FACILITY.map((f) => (
                  <button type="button" key={f} className={chip(facility === f)} onClick={() => pickFacility(f)}>{f}</button>
                ))}
              </div>
              <button type="button" disabled={!facility} onClick={() => setStep(2)}
                className="mt-6 w-full inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-gold text-sm font-semibold text-primary-foreground shadow-gold disabled:opacity-50">
                Next <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-sm font-medium">Approximate size</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {SIZES.map((s) => <button type="button" key={s} className={chip(size === s)} onClick={() => setSize(s)}>{s}</button>)}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Cleaning frequency</p>
                <div className="mt-2 grid gap-2 grid-cols-2 sm:grid-cols-3">
                  {FREQ.map((s) => <button type="button" key={s} className={chip(freq === s)} onClick={() => setFreq(s)}>{s}</button>)}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor={`${id}-city`}>City</label>
                <select id={`${id}-city`} className={`${field} mt-2`} value={city} onChange={(e) => setCity(e.target.value)}>
                  <option value="">Select a city</option>
                  {CITIES.map((x) => <option key={x}>{x}</option>)}
                </select>
              </div>
              <p className="rounded-xl border border-primary/25 bg-primary/[0.05] p-3 text-sm">
                Exact pricing is confirmed at a free 20-minute walkthrough — no obligation.
              </p>
              <div className="flex gap-2">
                <button type="button" onClick={() => setStep(1)} className="inline-flex min-h-[48px] items-center gap-1 rounded-xl border border-border px-4 text-sm"><ArrowLeft className="h-4 w-4" /> Back</button>
                <button type="button" disabled={!size || !freq || !city} onClick={toStep3}
                  className="flex-1 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-gold text-sm font-semibold text-primary-foreground shadow-gold disabled:opacity-50">
                  Next <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={submit} className="mt-6 grid gap-3 sm:grid-cols-2">
              {([
                ["name", "Your name", "text"],
                ["company", "Company", "text"],
                ["email", "Email", "email"],
                ["phone", "Phone", "tel"],
              ] as const).map(([k, label, type]) => (
                <div key={k}>
                  <label className="text-xs font-medium" htmlFor={`${id}-${k}`}>{label}</label>
                  <input id={`${id}-${k}`} type={type} className={`${field} mt-1`} value={c[k]} onChange={(e) => setC({ ...c, [k]: e.target.value })} />
                  {errors[k] && <p className="text-xs text-destructive mt-1">{errors[k]}</p>}
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="text-xs font-medium" htmlFor={`${id}-time`}>Best time for walkthrough</label>
                <select id={`${id}-time`} className={`${field} mt-1`} value={c.time} onChange={(e) => setC({ ...c, time: e.target.value })}>
                  <option value="">Select</option>
                  {TIMES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium" htmlFor={`${id}-notes`}>Notes (optional)</label>
                <textarea id={`${id}-notes`} rows={3} className={`${field} mt-1`} value={c.notes} onChange={(e) => setC({ ...c, notes: e.target.value })} />
              </div>
              {errors.form && <p className="sm:col-span-2 text-sm text-destructive">{errors.form}</p>}
              <div className="sm:col-span-2 flex gap-2">
                <button type="button" onClick={() => setStep(2)} className="inline-flex min-h-[48px] items-center gap-1 rounded-xl border border-border px-4 text-sm"><ArrowLeft className="h-4 w-4" /> Back</button>
                <button type="submit" disabled={busy}
                  className="flex-1 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-gold text-sm font-semibold text-primary-foreground shadow-gold disabled:opacity-60">
                  {busy ? "Sending…" : "Request my walkthrough"} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
}
