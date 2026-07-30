import { auth, defineMcp } from "@lovable.dev/mcp-js";

import listServices from "./tools/list-services";
import listServiceAreas from "./tools/list-service-areas";
import estimateTurnover from "./tools/estimate-turnover";
import getBookingLinks from "./tools/get-booking-links";
import getReadinessStandard from "./tools/get-readiness-standard";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "niagara-readiness-hub",
  title: "Niagara Readiness Hub",
  version: "0.1.0",
  instructions:
    "Tools for Niagara Turnover Co., a short-term rental and property turnover service in the Niagara Region of Ontario. Use `list_services` and `get_readiness_standard` to explain what is covered, `list_service_areas` for coverage, `estimate_turnover` for an indicative price range, and `get_booking_links` to hand the caller the scheduling or on-boarding form.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    listServices,
    listServiceAreas,
    getReadinessStandard,
    estimateTurnover,
    getBookingLinks,
  ],
});
