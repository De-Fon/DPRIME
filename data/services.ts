import type { Service } from "../lib/types";

export const services: Service[] = [
  {
    index: "01",
    title: "Web applications",
    description:
      "Modern web applications built with React, Next.js and Tailwind for fast, accessible client experiences.",
    stack: ["react", "next.js", "tailwind"],
  },
  {
    index: "02",
    title: "Backend and APIs",
    description:
      "Robust backend systems and APIs using Python, FastAPI and PostgreSQL; integration work with Daraja (Safaricom) where needed.",
    stack: ["python", "fastapi", "postgresql"],
  },
  {
    index: "03",
    title: "Data and automation",
    description:
      "Data cleaning, analysis and automation pipelines using Pandas and NumPy to generate actionable reports.",
    stack: ["pandas", "numpy", "python"],
  },
  {
    index: "04",
    title: "Ongoing support",
    description:
      "We don't disappear after launch. Bug fixes, small feature additions, and maintenance for anything we ship.",
    stack: ["support", "maintenance"],
  },
];
