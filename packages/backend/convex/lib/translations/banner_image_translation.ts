import { Language } from '@workspace/types';
import { generateText } from '../gemini_config';
import z from 'zod';

export const bannerTranslationSchema = z.object({
  title: z.string().min(1),
  altText: z.string().optional(),
  audience: z.string().min(1),
});

export type BannerTranslationResult = z.infer<typeof bannerTranslationSchema>;

export async function translateBannerImagePrompt(
  title: string,
  audience: string,
  targetLang: Language,
  altText?: string,
): Promise<BannerTranslationResult | undefined> {
  const prompt = `
Translate the following banner into ${targetLang} and return ONLY valid JSON:

Output format:
{
  "title": string,
  "altText"?: string,
  "audience"?: string
}

Input:
Title: "${title}"
Audience: "${audience}"
AltText: "${altText ?? ''}"
`;

  const text = await generateText(prompt);

  if (!text) {
    console.error('Failed to translate banner image');
    return undefined;
  }

  try {
    const cleaned = text
      .trim()
      .replace(/^```(?:json)?/i, '')
      .replace(/```$/, '')
      .trim();
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('No JSON object found');
    const parsed = JSON.parse(match[0]);

    const validated = bannerTranslationSchema.parse(parsed);
    return validated;
  } catch (err) {
    console.error('Raw Gemini response:', text);
    if (err instanceof Error) {
      console.error('Validation / parse error:', err.message);
    }
    throw new Error('Gemini returned invalid or malformed JSON');
  }
}
