export interface ClientProofRate {
  payment: string;
  rate: string;
}

export interface ClientProofSavings {
  amount: number;
  prefix: string;
  label: string;
}

export interface ClientProofTestimonial {
  quote: string;
  name: string;
  role: string;
}

export interface ClientProofCta {
  label: string;
  href: string;
}

export interface ClientProof {
  headline: string;
  before: ClientProofRate;
  after: ClientProofRate;
  savings: ClientProofSavings;
  testimonial: ClientProofTestimonial;
  cta: ClientProofCta;
}
