import { defineTool } from "@lovable.dev/mcp-js";

const CONTACT = {
  business: "Niagara Turnover Co.",
  phone: "(289) 257-7725",
  phoneE164: "+12892577725",
  website: "https://niagaraturnoverco.com",
  clientScheduling: "https://airtable.com/app3bo82kH3gBbh7D/pagam8AZIIRd6Xqew/form",
  clientOnboarding: "https://airtable.com/app3bo82kH3gBbh7D/pagfETpx8mh312gUE/form",
  region: "Niagara Region, Ontario, Canada",
};

export default defineTool({
  name: "get_booking_links",
  title: "Get booking and contact links",
  description:
    "Return Niagara Turnover Co.'s phone number and the Client Scheduling and Client On-Boarding form links to send a property owner or operator to.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(CONTACT, null, 2) }],
    structuredContent: CONTACT,
  }),
});
