import { PoemConfig } from '../types';
import { DEFAULT_CONFIG } from '../constants';

/**
 * Calls the local backend to generate a poem.
 * @param config User-defined configuration (theme, tone, style, length).
 * @returns The generated poem text.
 * @throws Error if the backend fails or returns an error.
 */
export const generatePoem = async (config: PoemConfig): Promise<string> => {
  const theme = config.theme.trim() || DEFAULT_CONFIG.theme;
  const tone = config.tone.trim() || DEFAULT_CONFIG.tone;
  const style = config.style.trim() || DEFAULT_CONFIG.style;
  const length = config.length.trim() || DEFAULT_CONFIG.length;

  try {
    const response = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ theme, tone, style, length }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate poem');
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Error generating poem:", error);
    throw new Error("Failed to generate poem. Please try again.");
  }
};