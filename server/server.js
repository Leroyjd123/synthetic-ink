/**
 * Express Server for Synthetic Ink
 * Acts as a secure proxy for Google Gemini API calls.
 * 
 * Routes:
 * - POST /api/generate: Generates a poem based on user config.
 */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config({ path: './.env.local' });

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("ERROR: GEMINI_API_KEY is not set in .env.local");
    process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

app.post('/api/generate', async (req, res) => {
    try {
        const { theme, tone, style, length } = req.body;

        const prompt = `
Write a poem that strictly adheres to the following constraints.

THEME:
"${theme || 'any'}"
The poem must clearly and consistently explore this theme. Do not introduce unrelated imagery or concepts.

TONE:
${tone || 'neutral'}
Maintain this emotional tone throughout the poem. Avoid tonal shifts unless they reinforce the chosen tone.

STYLE:
${style || 'free verse'}
Write in a manner consistent with this poetic style, including its typical voice, imagery, and structure.

LENGTH:
${length || 'medium'}
Keep the poem concise and proportional to this length.

FORMAL CONSTRAINTS:
- No title
- No explanations or commentary
- Output only the poem text

The poem should feel deliberate, cohesive, and emotionally focused.
`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-exp', // Updated to latest flash model
            contents: prompt,
            config: {
                thinkingConfig: { thinkingBudget: 0 },
            }
        });

        const text = response.text;
        if (!text) {
            throw new Error("No poem generated.");
        }

        res.json({ text: text.trim() });
    } catch (error) {
        let status = 500;
        let message = "Failed to generate poem.";

        // Check for common Gemini/Google API error structures
        if (error.status) {
            status = error.status;
        } else if (error.response && error.response.status) {
            status = error.response.status;
        }

        if (error.message) {
            message = error.message;
        }

        // Handle specific 429 Quota Exceeded case
        if (status === 429) {
            message = "Quota exceeded. Please try again later.";
            console.warn(`[429] Quota exceeded: ${error.message}`);
        }
        // Handle 503 Service Unavailable
        else if (status === 503) {
            message = "Service overloaded. Please try again later.";
            console.warn(`[503] Service overloaded: ${error.message}`);
        } else {
            console.error("Error generating poem:", error);
        }

        res.status(status).json({ error: message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
