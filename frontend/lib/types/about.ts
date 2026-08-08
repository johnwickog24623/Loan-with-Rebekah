export interface AboutValue {
  id: string;
  title: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  email?: string;
}

export interface AboutMarket {
  id: string;
  name: string;
  focus: string;
}

export interface AboutMission {
  eyebrow: string;
  title: string;
  lead: string;
  body: string;
  image: string;
  imageAlt: string;
}

export interface AboutHeroContent {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface AboutCtaContent {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
}
