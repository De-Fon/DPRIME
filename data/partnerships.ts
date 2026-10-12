import type { Partnership } from "../lib/types";

export const partnerships: Partnership[] = [
  { fromSlug: "dprime", toSlug: "sample-tech-university", type: "academic partner", sample: true },
  { fromSlug: "dprime", toSlug: "sample-oss-collective", type: "knowledge partner", sample: true },
  { fromSlug: "sample-ai-club", toSlug: "sample-cloud-co", type: "sponsor", sample: true },
  { fromSlug: "sample-ai-club", toSlug: "dprime", type: "event partner", sample: true },
  { fromSlug: "sample-cloud-community", toSlug: "sample-cloud-co", type: "technology partner", sample: true },
  { fromSlug: "sample-women-in-tech", toSlug: "sample-innovation-fund", type: "sponsor", sample: true },
];
