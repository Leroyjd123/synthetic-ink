import { GoogleGenAI } from "@google/genai";
import { PoemConfig } from '../types';
import { DEFAULT_CONFIG } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePoem = async (config: PoemConfig): Promise<string> => {
  const theme = config.theme.trim() || DEFAULT_CONFIG.theme;
  const tone = config.tone.trim() || DEFAULT_CONFIG.tone;
  const style = config.style.trim() || DEFAULT_CONFIG.style;
  const length = config.length.trim() || DEFAULT_CONFIG.length;

  const prompt = `
Write a poem that strictly adheres to the following constraints.

THEME:
"${theme}"
The poem must clearly and consistently explore this theme. Do not introduce unrelated imagery or concepts.

TONE:
${tone}
Maintain this emotional tone throughout the poem. Avoid tonal shifts unless they reinforce the chosen tone.

STYLE:
${style}
Write in a manner consistent with this poetic style, including its typical voice, imagery, and structure.

LENGTH:
${length}
Keep the poem concise and proportional to this length.

FORMAL CONSTRAINTS:
- No title
- No explanations or commentary
- Output only the poem text

The poem should feel deliberate, cohesive, and emotionally focused.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }, // Disable thinking for simple creative tasks to improve latency
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No poem generated.");
    }
    return text.trim();
  } catch (error) {
    console.error("Error generating poem:", error);
    throw new Error("Failed to generate poem. Please try again.");
  }
};