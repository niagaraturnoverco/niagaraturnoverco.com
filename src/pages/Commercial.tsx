import { useState } from "react";
import {
  Building2,
  Stethoscope,
  Warehouse,
  GraduationCap,
  HardHat,
  Sparkles,
  ShieldCheck,
  ClipboardList,
  Users,
  Leaf,
  FileText,
  CheckCircle2,
  ArrowRight,
  Phone,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const PHONE = "(289) 257-7725";
const PHONE_TEL = "tel:+12892577725";

const services = [
  { icon: Building2, title: "Office & Janitorial", desc: "Nightly or scheduled janitorial for offices and professional suites." },
  { icon: Stethoscope, title: "Medical, Dental & Clinic", desc: "Protocol-driven cleaning for treatment rooms, waiting areas and washrooms." },
  { icon: Warehouse, title: "Property Common Areas", desc: "Lobbies, corridors, elevators, stairwells, amenity rooms and garbage rooms." },
  { icon: GraduationCap, title: "Student Housing Move-Out", desc: "Full unit resets on tight turnover windows between tenancies." },
  { icon: HardHat, title: "Post-Construction", desc: "Rough, final and touch-up cleans so the space hands over ready." },
  { icon: Sparkles, title: "Floor Care", desc: "Strip and wax, burnishing, carpet extraction and hard-surface restoration." },
];

const operate = [
  { icon: Users, title: "Dedicated site supervisor", desc: "One named supervisor owns your building — not a rotating crew." },
  { icon: ClipboardList, title: "Monthly inspection", desc: "A written inspection report delivered within five business days." },
  { icon: FileText, title: "Posted daily washroom logs", desc: "Signed logs kept on site so your staff can see the last service." },
  { icon: ShieldCheck, title: "Backup staffing", desc: "Coverage is guaranteed — call-outs are replaced, not skipped." },
  { icon: Leaf, title: "Green-certified products", desc: "Safety Data Sheets kept on site for every product we use." },
  { icon: CheckCircle2, title: "Itemized monthly invoicing", desc: "One clear invoice, scope-by-scope, no surprise line items." },
];

export default function Commercial() {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    company: "",
    facility_type: "",
    square_footage: "",
    frequency: "",
    locations: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    notes: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from("walkthrough_requests").insert(form);
    setSubmitting(false);
    if (error) {
      toast({ title: "Something went wrong", description: "Please call us at " + PHONE, variant: "destructive" });
      return;
    }
    toast({ title: "Walkthrough request received", description: "We'll confirm a walkthrough time shortly." });
    setForm({ company: "", facility_type: "", square_footage: "", frequency: "", locations: "", contact_name: "", contact_email: "", contact_phone: "", notes: "" });
  };

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:py-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-primary">
          <Building2 className="h-3 w-3" /> Commercial &amp; Facilities
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl mt-5 max-w-3xl leading-[1.05]">
          Commercial cleaning across Niagara — <span className="gold-text italic">on schedule, inspected, reported.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          Janitorial, facility and post-construction cleaning for offices, clinics, property common areas and student housing across Niagara Falls, St. Catharines, Welland, Thorold, NOTL, Port Colborne and Fort Erie.
        </p>
        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <a
            href="#walkthrough"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-gradient-gold px-6 text-sm font-semibold text-primary-foreground shadow-gold border border-primary/30 hover:brightness-110 transition"
          >
            Book a Facility Walkthrough <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={PHONE_TEL}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border-2 border-primary/60 bg-primary/10 px-6 text-sm font-semibold"
          >
            <Phone className="h-4 w-4" /> {PHONE}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
        <h2 className="font-serif text-3xl sm:text-4xl">What we clean</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="premium-card p-6">
              <s.icon className="h-5 w-5 text-primary" />
              <h3 className="font-serif text-xl mt-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-paper">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:py-20">
          <h2 className="font-serif text-3xl sm:text-4xl ink">How we operate</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {operate.map((o) => (
              <div key={o.title} className="paper-card p-6">
                <o.icon className="h-5 w-5 text-[hsl(var(--gold-deep))]" />
                <h3 className="font-serif text-lg mt-3 ink">{o.title}</h3>
                <p className="text-sm ink-muted mt-2">{o.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--gold-deep))]/40 bg-[hsl(43_65%_58%/0.10)] px-4 py-3 text-sm ink">
            <ShieldCheck className="h-4 w-4 text-[hsl(var(--gold-deep))]" />
            Certificate of insurance and WSIB clearance available on request.
          </p>
        </div>
      </section>

      <section id="walkthrough" className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
        <h2 className="font-serif text-3xl sm:text-4xl">Book a Facility Walkthrough</h2>
        <p className="text-muted-foreground mt-3">
          Tell us about the facility and we'll confirm a walkthrough time. Scope and pricing are set on site.
        </p>
        <form onSubmit={submit} className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Company *</label>
            <Input required value={form.company} onChange={(e) => set("company", e.target.value)} className="h-12 mt-1.5" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Facility type *</label>
            <Input required placeholder="Office, clinic, condo, student housing…" value={form.facility_type} onChange={(e) => set("facility_type", e.target.value)} className="h-12 mt-1.5" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Approx. square footage</label>
            <Input value={form.square_footage} onChange={(e) => set("square_footage", e.target.value)} className="h-12 mt-1.5" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Frequency</label>
            <Input placeholder="Nightly, 3x weekly, weekly…" value={form.frequency} onChange={(e) => set("frequency", e.target.value)} className="h-12 mt-1.5" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Number of locations</label>
            <Input value={form.locations} onChange={(e) => set("locations", e.target.value)} className="h-12 mt-1.5" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Contact name *</label>
            <Input required value={form.contact_name} onChange={(e) => set("contact_name", e.target.value)} className="h-12 mt-1.5" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Email *</label>
            <Input required type="email" value={form.contact_email} onChange={(e) => set("contact_email", e.target.value)} className="h-12 mt-1.5" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Phone</label>
            <Input value={form.contact_phone} onChange={(e) => set("contact_phone", e.target.value)} className="h-12 mt-1.5" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Anything else</label>
            <Input value={form.notes} onChange={(e) => set("notes", e.target.value)} className="h-12 mt-1.5" />
          </div>
          <Button type="submit" disabled={submitting} className="sm:col-span-2 min-h-[52px] bg-gradient-gold text-primary-foreground border border-primary/30 shadow-gold hover:brightness-110">
            {submitting ? "Sending…" : "Book a Facility Walkthrough"}
          </Button>
        </form>
      </section>
    </div>
  );
}
