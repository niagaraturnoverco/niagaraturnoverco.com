import { Link } from "react-router-dom";
import { ShieldCheck, Lock, FileText, Mail, ArrowLeft } from "lucide-react";

const sections = [
  {
    icon: ShieldCheck,
    title: "Our commitment",
    body:
      "Niagara Turnover Co. is a short-term rental cleaning and turnover service. We treat every property, guest record, and host detail as private information and only use it to deliver and improve our service.",
  },
  {
    icon: Lock,
    title: "How your information is protected",
    body:
      "Booking details, contact information, and property access notes are stored in trusted cloud services that use encryption in transit (TLS) and at rest. Access is limited to the team members who need it to schedule and complete turnovers.",
  },
  {
    icon: FileText,
    title: "Data we collect",
    body:
      "We collect only what we need to serve you: your name, email, phone, property address, and the scheduling details you provide. We do not sell your information. We retain records only as long as needed to deliver service and meet basic business and tax requirements.",
  },
  {
    icon: Mail,
    title: "Requests, questions, or incidents",
    body:
      "To request a copy of your data, request deletion, or report a security or privacy concern, email hello@niagaraturnoverco.com. We respond as quickly as possible, typically within a few business days.",
  },
];

const Trust = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <header className="mt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Trust &amp; Privacy
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">
            How we handle your data and properties
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            This page is maintained by Niagara Turnover Co. to answer common
            security and privacy questions about our turnover service. It is
            editable content owned by us and is not an independent certification.
          </p>
        </header>

        <div className="mt-12 space-y-8">
          {sections.map(({ icon: Icon, title, body }) => (
            <section
              key={title}
              className="rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>

        <p className="mt-12 text-xs text-muted-foreground">
          Shared responsibility: our hosting and backend providers operate the
          underlying infrastructure controls, while Niagara Turnover Co. is
          responsible for how we collect, use, and safeguard the information you
          share with us. Customers are responsible for the access details and
          permissions they grant us.
        </p>
      </div>
    </main>
  );
};

export default Trust;
