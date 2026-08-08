interface ParsedChatReply {
  message: string;
  propertyIds: string[];
}

function extractJsonObject(raw: string): string | null {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) return fenced[1].trim();
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start >= 0 && end > start) return raw.slice(start, end + 1);
  return null;
}

export function parseAssistantReply(raw: string): ParsedChatReply {
  const candidate = extractJsonObject(raw.trim());
  if (!candidate) {
    return { message: raw.trim(), propertyIds: [] };
  }
  try {
    const parsed = JSON.parse(candidate) as {
      message?: unknown;
      propertyIds?: unknown;
    };
    const message =
      typeof parsed.message === "string" && parsed.message.trim()
        ? parsed.message.trim()
        : raw.trim();
    const propertyIds = Array.isArray(parsed.propertyIds)
      ? parsed.propertyIds.filter((id): id is string => typeof id === "string")
      : [];
    return { message, propertyIds };
  } catch {
    return { message: raw.trim(), propertyIds: [] };
  }
}
