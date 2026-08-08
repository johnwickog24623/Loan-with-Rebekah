"use client";

import { ChatMessageBubble } from "@/components/chat/chat-message-bubble";
import type { ChatMessage } from "@/lib/types/chat";
import { useEffect, useRef } from "react";

interface ChatPanelProps {
  messages: ChatMessage[];
  input: string;
  isLoading: boolean;
  error: string | null;
  onInputChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

export function ChatPanel({
  messages,
  input,
  isLoading,
  error,
  onInputChange,
  onSubmit,
  onClose,
}: ChatPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollListRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);
  useEffect(() => {
    const panel = panelRef.current;
    const scrollList = scrollListRef.current;
    if (!panel || !scrollList) return;
    const handleScrollEvent = (e: Event) => {
      e.stopPropagation();
    };
    panel.addEventListener("wheel", handleScrollEvent, { passive: true });
    panel.addEventListener("touchmove", handleScrollEvent, { passive: true });
    scrollList.addEventListener("wheel", handleScrollEvent, { passive: true });
    scrollList.addEventListener("touchmove", handleScrollEvent, { passive: true });
    return () => {
      panel.removeEventListener("wheel", handleScrollEvent);
      panel.removeEventListener("touchmove", handleScrollEvent);
      scrollList.removeEventListener("wheel", handleScrollEvent);
      scrollList.removeEventListener("touchmove", handleScrollEvent);
    };
  }, []);
  return (
    <div
      ref={panelRef}
      className="flex h-[min(560px,70vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-surface/95 shadow-[0_24px_64px_rgba(26,26,28,0.14)] backdrop-blur-xl"
      data-lenis-prevent="true"
    >
      <div className="flex items-center justify-between border-b border-[color:var(--color-line)] px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-text">Loans With Rebekah Assistant</p>
          <p className="text-xs text-muted">Ask about loans, pre-approval, or booking</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[color:var(--color-line)] text-text transition-colors hover:bg-surface-raised"
          aria-label="Close chat"
        >
          &#10005;
        </button>
      </div>
      <div
        ref={scrollListRef}
        className="flex-1 space-y-3 overflow-y-auto overscroll-contain bg-ink/40 px-4 py-4"
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        data-lenis-prevent-touch="true"
      >
        {messages.map((message, index) => (
          <ChatMessageBubble
            key={`${message.role}-${index}`}
            role={message.role}
            content={message.content}
            properties={message.properties}
          />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-[color:var(--color-line)] bg-surface px-3.5 py-2.5 text-sm text-muted">
              Thinking...
            </div>
          </div>
        )}
        {error && (
          <p className="rounded-xl border border-red-300/50 bg-red-50 px-3 py-2 text-xs text-red-700">
            {error}
          </p>
        )}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={onSubmit} className="border-t border-[color:var(--color-line)] p-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(event) => onInputChange(event.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="min-w-0 flex-1 rounded-xl border border-[color:var(--color-line)] bg-surface px-3 py-2.5 text-sm text-text outline-none placeholder:text-muted focus:border-accent/40"
            aria-label="Chat message"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="cursor-pointer rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-jet disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
