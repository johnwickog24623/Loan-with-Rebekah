import type { Metadata } from "next";
import { TeamPage } from "@/components/team/team-page";

export const metadata: Metadata = {
  title: "Our Team | Protonix Estate",
  description:
    "Meet the Protonix Estate advisors specializing in private acquisitions, investment strategy, and client counsel.",
};

export default function Team() {
  return <TeamPage />;
}
