import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

type AuthorizationDetails = {
  client?: { name?: string; client_id?: string; redirect_uri?: string } | null;
  scope?: string | null;
  redirect_url?: string | null;
  redirect_to?: string | null;
};

type OAuthNamespace = {
  getAuthorizationDetails: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  approveAuthorization: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  denyAuthorization: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
};

const oauth = (supabase.auth as unknown as { oauth: OAuthNamespace }).oauth;

const SCOPE_LABELS: Record<string, string> = {
  openid: "Confirm who you are",
  email: "Share your email address",
  profile: "Share your basic profile",
};

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Missing authorization_id in the request.");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const nextPath = window.location.pathname + window.location.search;
        window.location.href = `/auth?next=${encodeURIComponent(nextPath)}`;
        return;
      }
      if (!active) return;
      setAccount(sess.session.user.email ?? null);

      const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) {
        setError(error.message);
        return;
      }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const { data, error } = approve
      ? await oauth.approveAuthorization(authorizationId)
      : await oauth.denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  const clientName = details?.client?.name ?? "this application";
  const scopes = (details?.scope ?? "").split(/\s+/).filter(Boolean);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-5 py-12">
      <Helmet>
        <title>Authorize access | Niagara Turnover Co.</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {error ? (
        <div className="rounded-xl border border-border/70 bg-card p-6">
          <h1 className="font-serif text-2xl">Could not load this request</h1>
          <p className="mt-2 text-sm text-muted-foreground">{error}</p>
        </div>
      ) : !details ? (
        <p className="text-sm text-muted-foreground">Loading authorization request…</p>
      ) : (
        <div className="rounded-xl border border-border/70 bg-card p-6">
          <h1 className="font-serif text-2xl">
            Connect {clientName} to Niagara Readiness Hub
          </h1>
          {account && (
            <p className="mt-2 text-sm text-muted-foreground">Signed in as {account}</p>
          )}

          <p className="mt-4 text-sm">
            {clientName} will be able to call this app's enabled tools while you are
            signed in.
          </p>

          {details.client?.redirect_uri && (
            <p className="mt-3 break-all text-xs text-muted-foreground">
              Redirects to {details.client.redirect_uri}
            </p>
          )}

          {scopes.length > 0 && (
            <ul className="mt-4 space-y-1.5 text-sm">
              {scopes.map((scope) => (
                <li key={scope} className="text-muted-foreground">
                  • {SCOPE_LABELS[scope] ?? `Additional permission requested: ${scope}`}
                </li>
              ))}
            </ul>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            This does not bypass this app's permissions or backend policies.
          </p>

          <div className="mt-6 flex flex-col gap-2">
            <Button disabled={busy} onClick={() => decide(true)}>
              {busy ? "Please wait…" : "Approve"}
            </Button>
            <Button
              variant="outline"
              disabled={busy}
              onClick={() => decide(false)}
            >
              Cancel connection
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
