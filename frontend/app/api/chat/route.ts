import { parseAssistantReply } from "@/lib/chat/parse-assistant-reply";
import {
  matchPropertiesFromText,
  mergePropertyCards,
  resolvePropertiesByIds,
} from "@/lib/chat/match-properties";
import { buildChatSystemPrompt } from "@/lib/data/chat-knowledge";
import type { ChatMessage } from "@/lib/types/chat";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const MAX_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 2000;
const GROQ_BASE_URL = "https://api.groq.com/openai/v1";

function isValidMessages(value: unknown): value is ChatMessage[] {
  if (!Array.isArray(value)) return false;
  return value.every(
    (item) =>
      item &&
      typeof item === "object" &&
      (item.role === "user" || item.role === "assistant") &&
      typeof item.content === "string" &&
      item.content.trim().length > 0 &&
      item.content.length <= MAX_CONTENT_LENGTH
  );
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Chat is not configured. Please add GROQ_API_KEY to your environment." },
        { status: 503 }
      );
    }
    const body = await request.json();
    if (!isValidMessages(body.messages)) {
      return NextResponse.json({ error: "Invalid chat messages." }, { status: 400 });
    }
    const messages = body.messages.slice(-MAX_MESSAGES);
    const groq = new OpenAI({
      apiKey,
      baseURL: GROQ_BASE_URL,
    });
    const completion = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      temperature: 0.25,
      max_tokens: 800,
      messages: [
        { role: "system", content: buildChatSystemPrompt() },
        ...messages.map((message: ChatMessage) => ({
          role: message.role,
          content: message.content.trim(),
        })),
      ],
    });
    const rawReply = completion.choices[0]?.message?.content?.trim();
    if (!rawReply) {
      return NextResponse.json({ error: "No response from assistant." }, { status: 502 });
    }
    const parsed = parseAssistantReply(rawReply);
    const fromIds = resolvePropertiesByIds(parsed.propertyIds);
    const fromText = matchPropertiesFromText(parsed.message);
    const properties = mergePropertyCards(fromIds, fromText);
    return NextResponse.json({
      reply: parsed.message,
      properties,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Unable to reach the assistant right now. Please try again." },
      { status: 500 }
    );
  }
}
