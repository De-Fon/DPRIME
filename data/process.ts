import type { ProcessStep } from "../lib/types";

export const process: ProcessStep[] = [
  {
    index: "01",
    stage: "Scope",
    description:
      "We align on goals, deliverables, timeline and success metrics before writing a single line of code.",
  },
  {
    index: "02",
    stage: "Build",
    description:
      "Design and implement the product with iterative checkpoints, regular demos, and automated testing.",
  },
  {
    index: "03",
    stage: "Ship",
    description:
      "We deploy the product to the chosen hosting environment, validate the live experience, and hand over documentation.",
  },
  {
    index: "04",
    stage: "Support",
    description:
      "Post-launch maintenance: bug fixes, small enhancements, monitoring and optional retainer-based support.",
  },
];
