import { useEffect } from "react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import QuoteForm from "@/components/QuoteForm";
import { CallLink, TrustStrip } from "@/components/CommercialBlocks";
import { trackLead } from "@/lib/leads";

export default function Walkthrough() {
  useEffect(() => { trackLead("walkthrough_page_view"); }, []);
  return (
    <div className="min-h-screen bg-background">
      <Seo title="Book a Free Cleaning Walkthrough | Niagara Turnover Co." description="Request a free 20-minute walkthrough for office and commercial cleaning anywhere in the Niagara Region." path="/walkthrough" />
      <div className="mx-auto max-w-xl px-4 py-10">
        <Link to="/" className="font-serif text-2xl">Niagara Turnover Co.</Link>
        <p className="mt-3 text-lg">Office &amp; commercial cleaning across Niagara — inspected, reported, never missed.</p>
        <div className="mt-5"><TrustStrip /></div>
        <div className="mt-6"><QuoteForm /></div>
        <div className="mt-6 text-center"><p className="text-sm text-muted-foreground mb-3">Prefer to talk?</p><CallLink /></div>
      </div>
    </div>
  );
}
