import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const BASE = 89;
const PER_BEDROOM = 32;
const PER_BATHROOM = 28;
const RUSH_MULTIPLIER = 1.35;
const LINEN_FEE = 25;

export default defineTool({
  name: "estimate_turnover",
  title: "Estimate a turnover",
  description:
    "Produce an indicative turnover price range for a Niagara property based on bedrooms, bathrooms, rush scheduling and linen service. Indicative only — final pricing depends on scope and condition.",
  inputSchema: {
    bedrooms: z.number().int().describe("Number of bedrooms (0 for studio)."),
    bathrooms: z.number().describe("Number of bathrooms, halves allowed."),
    rush: z.boolean().optional().describe("Same-day or emergency scheduling."),
    linen: z.boolean().optional().describe("Include linen supply and laundering."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ bedrooms, bathrooms, rush, linen }) => {
    const beds = Math.max(0, Math.min(12, Math.round(bedrooms)));
    const baths = Math.max(0, Math.min(12, bathrooms));
    let low = BASE + beds * PER_BEDROOM + baths * PER_BATHROOM;
    if (linen) low += LINEN_FEE;
    if (rush) low *= RUSH_MULTIPLIER;
    const high = low * 1.25;
    const result = {
      currency: "CAD",
      low: Math.round(low),
      high: Math.round(high),
      bedrooms: beds,
      bathrooms: baths,
      rush: Boolean(rush),
      linen: Boolean(linen),
      disclaimer:
        "Indicative range only. Final pricing depends on property scope, condition and access.",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
