import { GoogleGenAI, Chat } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// This function creates a new chat session with the specified model.
export function createChat(): Chat {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
  });
}
