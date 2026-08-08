import type { Service } from "@/lib/types/service";

export interface ServiceItem extends Service {
  icon: string;
}

export const services: ServiceItem[] = [
  {
    id: "1",
    icon: "buy-sell",
    title: "Buy & Sell",
    description: "Expert guidance through every stage of acquiring or listing premium residential and commercial properties.",
  },
  {
    id: "2",
    icon: "management",
    title: "Property Management",
    description: "Full-service management for landlords and investors, from tenant placement to maintenance coordination.",
  },
  {
    id: "3",
    icon: "investment",
    title: "Investment Advisory",
    description: "Data-driven portfolio strategies for investors seeking long-term growth in high-value markets.",
  },
  {
    id: "4",
    icon: "development",
    title: "Development Consulting",
    description: "End-to-end support for developers, from site selection and feasibility to market positioning.",
  },
];
