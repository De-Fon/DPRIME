import type { Project } from "../lib/types";

export const projects: Project[] = [
  {
    slug: "rumia",
    index: "01",
    name: "Rumia",
    tagline: "Live hostel discovery platform for DeKUT students",
    description:
      "A running product, not a class assignment. Rumia helps students find and book verified hostels near campus, with a concierge 'Find Me a Hostel' feature for personalized matches.",
    stack: ["react", "node", "mongodb"],
    status: "shipped",
    live: true,
    url: "",
  },
  {
    slug: "edupesa",
    index: "02",
    name: "EduPesa",
    tagline: "M-Pesa crowdfunding platform for university students",
    description:
      "Mobile-first crowdfunding app that lets Kenyan students raise fees and support from their network, with M-Pesa payments built in through Safaricom's Daraja API.",
    stack: ["react", "fastapi", "daraja api"],
    status: "in progress",
    live: false,
    url: "",
  },
  {
    slug: "campus-laundry",
    index: "03",
    name: "Campus Laundry",
    tagline: "Booking and auth system for an on-campus laundry service",
    description:
      "Production-style FastAPI + PostgreSQL backend handling bookings, user auth, and order tracking end to end.",
    stack: ["fastapi", "postgresql", "react"],
    status: "shipped",
    live: false,
    url: "",
  },
  {
    slug: "cinex",
    index: "04",
    name: "CineX",
    tagline: "Movie discovery app built on the TMDB API",
    description:
      "Full React movie browser with search, favorites, and detail pages, backed by the TMDB API.",
    stack: ["react", "tmdb api"],
    status: "shipped",
    live: false,
    url: "",
  },
];
