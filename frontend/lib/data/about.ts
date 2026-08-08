import type {
  AboutCtaContent,
  AboutHeroContent,
  AboutMarket,
  AboutMission,
  AboutValue,
  TeamMember,
} from "@/lib/types/about";

export const aboutHero: AboutHeroContent = {
  eyebrow: "About Protonix Estate",
  title: "Private brokerage for significant properties",
  description:
    "We advise buyers, sellers, and investors who expect discretion, market clarity, and estates that match their ambition.",
  image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
  imageAlt: "Luxury modern estate exterior at dusk",
  primaryCta: { label: "Book a private consultation", href: "/contact" },
  secondaryCta: { label: "View featured residences", href: "/#featured-properties" },
};

export const aboutMission: AboutMission = {
  eyebrow: "Our Firm",
  title: "Where legacy meets location",
  lead:
    "Protonix Estate is a premier advisory built for clients who move with purpose—acquiring, selling, and investing in properties that define a life or a portfolio.",
  body:
    "We combine deep local knowledge with transparent counsel and off-market access. Every recommendation is grounded in market intelligence and a personal understanding of how you want to live, hold, or grow.",
  image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80",
  imageAlt: "Modern luxury residence exterior at dusk",
};

export const aboutValues: AboutValue[] = [
  {
    id: "1",
    title: "Integrity First",
    description:
      "Honest valuations, clear communication, and no hidden fees at every stage of your journey.",
  },
  {
    id: "2",
    title: "Client-Centered",
    description:
      "Your goals drive our strategy. Every recommendation is tailored to your timeline and ambitions.",
  },
  {
    id: "3",
    title: "Market Intelligence",
    description:
      "Data-backed insights and off-market access give our clients a decisive edge in competitive markets.",
  },
  {
    id: "4",
    title: "Long-Term Partnership",
    description:
      "We stay with you beyond closing—for management, resale, portfolio growth, and advisory.",
  },
];

export const aboutTeam: TeamMember[] = [
  {
    id: "1",
    name: "Ahmad Hassan",
    role: "Founder & Lead Advisor",
    bio: "15+ years guiding buyers, sellers, and investors through premium residential and commercial markets.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=1000&fit=crop&crop=faces",
    email: "ahmad@protonixestate.com",
  },
  {
    id: "2",
    name: "Sarah Khan",
    role: "Senior Property Consultant",
    bio: "Specializes in luxury residential acquisitions and neighborhood market analysis across top cities.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop&crop=faces",
    email: "sarah@protonixestate.com",
  },
  {
    id: "3",
    name: "Omar Farooq",
    role: "Investment Strategist",
    bio: "Builds data-driven portfolios for investors seeking long-term growth and stable returns.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=1000&fit=crop&crop=faces",
    email: "omar@protonixestate.com",
  },
];

export const aboutMarkets: AboutMarket[] = [
  { id: "1", name: "Dubai Marina", focus: "Waterfront residences" },
  { id: "2", name: "Palm Jumeirah", focus: "Private villas" },
  { id: "3", name: "Downtown", focus: "Iconic apartments" },
  { id: "4", name: "Emirates Hills", focus: "Gated estates" },
  { id: "5", name: "Business Bay", focus: "Investment holdings" },
  { id: "6", name: "Arabian Ranches", focus: "Family communities" },
];

export const aboutCta: AboutCtaContent = {
  eyebrow: "Private Advisory",
  title: "Book a private consultation",
  description:
    "Share your timeline and priorities. We will prepare a discreet strategy for acquisition, sale, or portfolio growth.",
  buttonLabel: "Start a conversation",
  href: "/contact",
};
