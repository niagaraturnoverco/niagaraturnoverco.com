import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import Seo from "@/components/Seo";

const STATUSES = ["New", "Contacted", "Walkthrough booked", "Quoted", "Won", "Lost"];
type Lead = {
  id: string; created_at: string; status: string; contact_name: string; company: string | null;
  contact_email: string; contact_phone: string | null; facility_type: string; square_footage: string | null;
  frequency: string | null; city: string | null; preferred_time: string | null; notes: string | null;
  source_page: string | null; utm_source: string | null; utm_medium: string | null; utm_campaign: string | null;
};

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Record<string, Record<string, number>>>({});

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      const { data: role } = await supabase.from("user_roles").select("role").eq("user_id", u.user.id).eq("role", "admin").maybeSingle();
      setIsAdmin(!!role);
      if (!role) return;
      const { data } = await supabase.from("walkthrough_requests").select("*").order("created_at", { ascending: false });
      setLeads((data as Lead[]) ?? []);
      const { data: ev } = await supabase.from("lead_events").select("event,page").limit(5000);
      const s: Record<string, Record<string, number>> = {};
      (ev ?? []).forEach((e) => { const p = e.page || "?"; s[p] ??= {}; s[p][e.event] = (s[p][e.event] ?? 0) + 1; });
      setStats(s);
    })();
  }, [session]);

  const setStatus = async (id: string, status: string) => {
    setLeads((l) => l.map((x) => (x.id === id ? { ...x, status } : x)));
    await supabase.from("walkthrough_requests").update({ status }).eq("id", id);
  };

  const signIn = () => lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/admin` });

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <Seo title="Admin | Niagara Turnover Co." description="Admin" path="/admin" noindex />
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-3xl">Leads</h1>
          {session && <button onClick={() => supabase.auth.signOut()} className="text-sm underline">Sign out</button>}
        </div>
        {!ready ? null : !session ? (
          <button onClick={signIn} className="mt-6 min-h-[48px] rounded-xl bg-gradient-gold px-6 text-sm font-semibold text-primary-foreground">Sign in with Google</button>
        ) : isAdmin === false ? (
          <p className="mt-6 text-muted-foreground">This account doesn't have admin access.</p>
        ) : (
          <>
            <div className="mt-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted text-left"><tr>{["Date", "Status", "Contact", "Facility", "City", "Source / UTM", "Notes"].map((h) => <th key={h} className="p-3">{h}</th>)}</tr></thead>
                <tbody>
                  {leads.map((l) => (
                    <tr key={l.id} className="border-t border-border align-top">
                      <td className="p-3 whitespace-nowrap">{new Date(l.created_at).toLocaleString()}</td>
                      <td className="p-3"><select value={l.status} onChange={(e) => setStatus(l.id, e.target.value)} className="rounded border border-border bg-card p-1">{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></td>
                      <td className="p-3"><div className="font-medium">{l.contact_name}</div><div>{l.company}</div><div><a href={`mailto:${l.contact_email}`} className="underline">{l.contact_email}</a></div><div><a href={`tel:${l.contact_phone}`}>{l.contact_phone}</a></div></td>
                      <td className="p-3">{l.facility_type}<div className="text-muted-foreground">{l.square_footage} · {l.frequency}</div><div className="text-muted-foreground">{l.preferred_time}</div></td>
                      <td className="p-3">{l.city}</td>
                      <td className="p-3">{l.source_page}<div className="text-muted-foreground">{[l.utm_source, l.utm_medium, l.utm_campaign].filter(Boolean).join(" / ")}</div></td>
                      <td className="p-3 max-w-xs">{l.notes}</td>
                    </tr>
                  ))}
                  {!leads.length && <tr><td colSpan={7} className="p-6 text-center text-muted-foreground">No leads yet.</td></tr>}
                </tbody>
              </table>
            </div>
            <h2 className="font-serif text-2xl mt-10">Conversion by page</h2>
            <div className="mt-4 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted text-left"><tr>{["Page", "Form started", "Step 2 done", "Submitted", "Calls", "Walkthrough views"].map((h) => <th key={h} className="p-3">{h}</th>)}</tr></thead>
                <tbody>
                  {Object.entries(stats).map(([p, s]) => (
                    <tr key={p} className="border-t border-border">
                      <td className="p-3">{p}</td><td className="p-3">{s.quote_step1_start ?? 0}</td><td className="p-3">{s.quote_step2_complete ?? 0}</td>
                      <td className="p-3">{s.quote_submit ?? 0}</td><td className="p-3">{s.tel_click ?? 0}</td><td className="p-3">{s.walkthrough_page_view ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
