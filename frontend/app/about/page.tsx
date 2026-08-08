import { AboutPage } from "@/components/about/about-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Protonix Estate",
  description: "Learn about Protonix Estate — our mission, values, team, and commitment to buyers, sellers, and investors.",
};

export default function About() {
  return <AboutPage />;
}
