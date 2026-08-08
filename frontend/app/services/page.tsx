import { ServicesPage } from "@/components/services/services-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Protonix Estate",
  description: "Explore Protonix Estate services — buying, selling, property management, investment advisory, and development consulting.",
};

export default function Services() {
  return <ServicesPage />;
}
