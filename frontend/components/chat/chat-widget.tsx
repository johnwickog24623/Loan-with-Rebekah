"use client";

import { ChatPanel } from "@/components/chat/chat-panel";
import {
  CHAT_WELCOME_MESSAGE,
  type ChatApiResponse,
  type ChatMessage,
} from "@/lib/types/chat";
import { useState } from "react";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: CHAT_WELCOME_MESSAGE },
  ]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = input.trim();
    if (!content || isLoading) return;
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content: messageContent }) => ({
            role,
            content: messageContent,
          })),
        }),
      });
      const data = (await response.json()) as ChatApiResponse & { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.reply,
          properties: data.properties ?? [],
        },
      ]);
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : "Unable to send message.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      {open && (
        <ChatPanel
          messages={messages}
          input={input}
          isLoading={isLoading}
          error={error}
          onInputChange={setInput}
          onSubmit={handleSubmit}
          onClose={() => setOpen(false)}
        />
      )}
      <div className="flex items-center gap-3">
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="cursor-pointer rounded-full border border-[color:var(--color-line)] bg-surface/90 px-4 py-2 text-left shadow-[0_12px_32px_rgba(26,26,28,0.1)] backdrop-blur-md transition-transform hover:scale-[1.02]"
            aria-label="Open chat assistant"
          >
            <p className="text-sm font-semibold text-text">Chat with us</p>
            <p className="text-[11px] text-muted">We&apos;re here to help</p>
          </button>
        )}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-[color:var(--color-line)] bg-accent text-ink shadow-[0_12px_40px_rgba(26,26,28,0.16)] transition-transform hover:scale-105 hover:bg-jet"
          aria-label={open ? "Close chat assistant" : "Open chat assistant"}
          aria-expanded={open}
        >
          {open ? (
            <span className="text-xl leading-none">&#10005;</span>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
              <path
                d="M4 6.5A2.5 2.5 0 016.5 4h11A2.5 2.5 0 0120 6.5v7A2.5 2.5 0 0117.5 16H10l-4.2 3.2A.8.8 0 014 18.6V6.5z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinejoin="round"
              />
              <path
                d="M8 9h8M8 12h5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
