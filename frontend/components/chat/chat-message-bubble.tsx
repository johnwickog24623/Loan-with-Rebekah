import { ChatPropertyCardView } from "@/components/chat/chat-property-card";
import type { ChatPropertyCard } from "@/lib/types/chat";

interface ChatMessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  properties?: ChatPropertyCard[];
}

export function ChatMessageBubble({ role, content, properties }: ChatMessageBubbleProps) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[90%] space-y-2 ${isUser ? "" : "w-full"}`}>
        <div
          className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? "bg-accent text-ink"
              : "border border-[color:var(--color-line)] bg-surface text-text"
          }`}
        >
          {content}
        </div>
        {!isUser && properties && properties.length > 0 && (
          <div className="grid gap-2">
            {properties.map((property) => (
              <ChatPropertyCardView key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
