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
    url: "https://rumia.co.ke",
    problem: "Finding and booking verified hostels near campus was a difficult and disconnected process.",
    solution: "A live hostel discovery platform equipped with a personalized concierge matching feature.",
    features: ["Verified hostel listings", "Concierge 'Find Me a Hostel' feature", "Direct booking system"],
    approach: "Built as a running production product, prioritizing real-world usage and scaling over academic requirements.",
  },
  {
    slug: "campus-laundry",
    index: "02",
    name: "Campus Laundry",
    tagline: "Booking and auth system for an on-campus laundry service",
    description:
      "Production-style FastAPI + PostgreSQL backend handling bookings, user auth, and order tracking end to end.",
    stack: ["fastapi", "postgresql", "react"],
    status: "shipped",
    live: false,
    url: "",
    problem: "Campus laundry services lacked an organized system to handle bookings and manage orders.",
    solution: "A robust, production-style backend system to seamlessly manage bookings, authentication, and end-to-end order tracking.",
    features: ["User authentication", "Booking management", "Order tracking"],
    approach: "Developed using FastAPI for high performance and PostgreSQL for reliable data storage.",
  },
  {
    slug: "cinex",
    index: "03",
    name: "CineX",
    tagline: "Movie discovery app built on the TMDB API",
    description:
      "Full React movie browser with search, favorites, and detail pages, backed by the TMDB API.",
    stack: ["react", "tmdb api"],
    status: "shipped",
    live: false,
    url: "",
    problem: "Users needed a centralized, efficient way to discover and browse movies.",
    solution: "A comprehensive movie browser that integrates directly with the TMDB API to fetch extensive movie data.",
    features: ["Movie search", "Favorites list", "Detailed movie pages"],
    approach: "Built as a full React single-page application to ensure fast, responsive client-side interactions.",
  },
];
