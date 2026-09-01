import type { ClientProof } from "@/lib/types/client-proof";

export const clientProof: ClientProof = {
  headline: "This Is What the Right Broker Looks Like",
  before: {
    payment: "$2,400",
    rate: "7.2%",
  },
  after: {
    payment: "$2,100",
    rate: "6.1%",
  },
  savings: {
    amount: 300,
    prefix: "$",
    label: "saved every month",
  },
  testimonial: {
    quote: "Rebekah made refinancing effortless — and the savings speak for themselves.",
    name: "Elena R.",
    role: "Refinance Client",
  },
  cta: {
    label: "See If You Could Save Too",
    href: "#calculator",
  },
};
