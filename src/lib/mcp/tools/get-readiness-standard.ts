import { defineTool } from "@lovable.dev/mcp-js";

const CHECKLIST = [
  "Kitchen: counters, appliances inside and out, sink polished, dishware verified and put away",
  "Bathrooms: descaled fixtures, mirrors streak-free, fresh towel set staged, consumables restocked",
  "Bedrooms: hotel-standard linen change, bed styled to listing photos, surfaces dusted",
  "Living areas: floors vacuumed and washed, cushions reset, remotes and cables tidied",
  "Staging: property reset to match the live listing photos before departure",
  "Reporting: damage, missing items and low stock photographed and reported same day",
];

export default defineTool({
  name: "get_readiness_standard",
  title: "Get the readiness standard",
  description:
    "Return the room-by-room readiness checklist Niagara Turnover Co. applies to every turnover, plus the reporting commitment.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: CHECKLIST.map((line) => `- ${line}`).join("\n") }],
    structuredContent: { checklist: CHECKLIST },
  }),
});
