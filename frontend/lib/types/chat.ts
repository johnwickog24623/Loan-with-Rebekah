export interface ChatPropertyCard {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: string;
  tag: string;
  image: string;
  beds: number;
  baths: number;
  sqft: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  properties?: ChatPropertyCard[];
}

export interface ChatApiResponse {
  reply: string;
  properties: ChatPropertyCard[];
}

export const CHAT_WELCOME_MESSAGE =
  "Hi! I am Rebekah's AI Assistant. Ask me about home purchase loans, refinancing, pre-approval eligibility, or booking a consultation.";
