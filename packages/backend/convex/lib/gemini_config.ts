import { GoogleGenAI } from '@google/genai';

function getGemini() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('GEMINI_API_KEY is not set');

  return new GoogleGenAI({ apiKey: key });
}

export async function generateText(prompt: string, model = 'gemini-2.5-flash') {
  const ai = getGemini();

  const response = await ai.models.generateContent({
    model,
    contents: [prompt],
  });

  return response.text;
}
