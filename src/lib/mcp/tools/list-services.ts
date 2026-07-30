import { defineTool } from "@lovable.dev/mcp-js";

const SERVICES = [
  {
    id: "str-turnover",
    name: "Short-term rental turnover",
    summary:
      "Between-guest reset for Airbnb/VRBO units: full clean, linen change, staging to listing photos, restock and damage reporting.",
  },
  {
    id: "listing-prep",
    name: "Listing preparation",
    summary:
      "Deep reset before photography or relisting: detail clean, declutter, surface polish and photo-ready staging.",
  },
  {
    id: "recurring-coverage",
    name: "Recurring coverage",
    summary:
      "Scheduled turnover coverage for operators with repeating bookings, including backup crew for same-day gaps.",
  },
  {
    id: "move-out",
    name: "Move-out / vacancy cleans",
    summary:
      "Vacant unit resets for property managers and landlords between tenancies.",
  },
  {
    id: "emergency",
    name: "Emergency / same-day turnover",
    summary:
      "Prioritised rush scheduling when a guest checks out late or a crew no-shows.",
  },
];

export default defineTool({
  name: "list_services",
  title: "List services",
  description:
    "List the property readiness and turnover services Niagara Turnover Co. offers, with a short summary of each.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(SERVICES, null, 2) }],
    structuredContent: { services: SERVICES },
  }),
});
