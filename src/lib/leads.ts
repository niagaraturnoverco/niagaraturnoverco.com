import { supabase } from "@/integrations/supabase/client";

export const PHONE = "(437) 993-4584";
export const PHONE_TEL = "tel:+14379934584";
export const SITE = "https://niagaraturnoverco.com";
export const GBP_URL = "https://share.google/WBUHcz3lrMXVDrdqf";
export const AIRTABLE_URL = "https://airtable.com/app3bo82kH3gBbh7D/pagfETpx8mh312gUE/form";

const UTM_KEY = "ntc_utm";

export function getUtm() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const fresh = {
    utm_source: p.get("utm_source") || undefined,
    utm_medium: p.get("utm_medium") || undefined,
    utm_campaign: p.get("utm_campaign") || undefined,
  };
  if (fresh.utm_source || fresh.utm_medium || fresh.utm_campaign) {
    sessionStorage.setItem(UTM_KEY, JSON.stringify(fresh));
    return fresh;
  }
  try {
    return JSON.parse(sessionStorage.getItem(UTM_KEY) || "{}");
  } catch {
    return {};
  }
}

export async function trackLead(event: string) {
  try {
    await supabase.from("lead_events").insert({
      event,
      page: window.location.pathname,
      ...getUtm(),
    });
  } catch {
    /* tracking must never break the page */
  }
}

/** Global tel: click tracking — install once. */
export function installTelTracking() {
  if (typeof document === "undefined") return;
  getUtm();
  document.addEventListener("click", (e) => {
    const a = (e.target as HTMLElement)?.closest?.("a[href^='tel:']");
    if (a) trackLead("tel_click");
  });
}
