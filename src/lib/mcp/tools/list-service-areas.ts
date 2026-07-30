import { defineTool } from "@lovable.dev/mcp-js";

const AREAS = [
  { slug: "niagara-falls", name: "Niagara Falls", url: "/service-area/niagara-falls" },
  { slug: "st-catharines", name: "St. Catharines", url: "/service-area/st-catharines" },
  {
    slug: "niagara-on-the-lake",
    name: "Niagara-on-the-Lake",
    url: "/service-area/niagara-on-the-lake",
  },
  { slug: "welland", name: "Welland", url: "/service-area/welland" },
  { slug: "thorold", name: "Thorold", url: "/service-area/thorold" },
  { slug: "port-colborne", name: "Port Colborne", url: "/service-area/port-colborne" },
  { slug: "fort-erie", name: "Fort Erie", url: "/service-area/fort-erie" },
];

export default defineTool({
  name: "list_service_areas",
  title: "List service areas",
  description:
    "List the Niagara Region cities Niagara Turnover Co. covers, with the slug and landing page path for each.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(AREAS, null, 2) }],
    structuredContent: { areas: AREAS },
  }),
});
