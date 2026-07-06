import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "@/lib/config";

// This route runs ON THE SERVER. Your API key never reaches the browser.
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages)) {
      return Response.json({ error: "Invalid messages" }, { status: 400 });
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
