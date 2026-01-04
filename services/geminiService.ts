import { GoogleGenAI } from "@google/genai";
import { PoemConfig } from '../types';
import { DEFAULT_CONFIG } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePoem = async (config: PoemConfig): Promise<string> => {
  const theme = config.theme.trim() || DEFAULT_CONFIG.theme;
  const tone = config.tone.trim() || DEFAULT_CONFIG.tone;
  const style = config.style.trim() || DEFAULT_CONFIG.style;
  const length = config.length.trim() || DEFAULT_CONFIG.length;

  const prompt = `Write a poem about "${theme}".
    Tone: ${tone}.
    Style: ${style}.
    Length: ${length}.
    Constraint: Keep the poem under 10 lines maximum. Do not include a title. Just the poem text.`;

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
