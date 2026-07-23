import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "@/lib/config";
import { rateLimit, getClientKey } from "@/lib/rateLimit";

// This route runs ON THE SERVER. Your API key never reaches the browser.
const apiKey = process.env.ANTHROPIC_API_KEY;
const anthropic = apiKey ? new Anthropic({ apiKey }) : null;

// Limits — generous for a real conversation, tight enough to stop abuse.
// Anthropic API calls cost money per request, so this route is the main
// cost/abuse surface on the whole site.
const MAX_MESSAGES = 40; // ~20 back-and-forth turns, well beyond a real chat
const MAX_MESSAGE_LENGTH = 4000; // characters per message
const RATE_LIMIT = 20; // requests
const RATE_WINDOW_MS = 60 * 1000; // per minute, per client

export async function POST(request) {
  try {
    if (!apiKey) {
      console.error("ANTHROPIC_API_KEY is not set.");
      return Response.json(
        { error: "Chat is not configured. Please try again later." },
        { status: 503 }
      );
    }

    // Rate limit by client IP to stop hammering (accidental or deliberate).
    const clientKey = getClientKey(request);
    const { allowed } = rateLimit(`chat:${clientKey}`, RATE_LIMIT, RATE_WINDOW_MS);
    if (!allowed) {
      return Response.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Invalid messages" }, { status: 400 });
    }
    if (messages.length > MAX_MESSAGES) {
      return Response.json(
        { error: "Conversation is too long. Please start a new chat." },
        { status: 400 }
      );
    }
    for (const m of messages) {
      if (
        !m ||
        (m.role !== "user" && m.role !== "assistant") ||
        typeof m.content !== "string" ||
        m.content.length === 0 ||
        m.content.length > MAX_MESSAGE_LENGTH
      ) {
        return Response.json({ error: "Invalid message format" }, { status: 400 });
      }
    }

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages,
    });

    const reply = response.content
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("");

    return Response.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
