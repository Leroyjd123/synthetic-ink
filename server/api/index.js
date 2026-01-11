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

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const app = express();
const port = 3001;
const VERSION = '1.2.0';

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight OPTIONS requests explicitly using middleware to avoid Express 5 path-to-regexp issues
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return res.status(200).end();
    }
    next();
});

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
console.log("GEMINI_API_KEY presence check:", apiKey ? "Present" : "Missing");

// Define AI instance only if key is present, or handle inside the route
let ai = null;
if (apiKey) {
    try {
        ai = new GoogleGenAI({ apiKey });
    } catch (e) {
        console.error("Failed to initialize GoogleGenAI:", e);
    }
}

app.get('/', (req, res) => {
    res.json({ status: 'Synthetic Ink API is healthy', version: VERSION });
});

app.post('/api/generate', async (req, res) => {
    console.log("Incoming request to /api/generate:", req.body);

    if (!ai) {
        return res.status(500).json({ error: "Gemini API key is missing or invalid on the server." });
    }

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
            model: 'gemini-2.0-flash-exp',
            contents: prompt
        });

        const text = response.text;
        if (!text) {
            throw new Error("No poem generated.");
        }

        res.json({ text: text.trim(), version: VERSION });
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
            console.error("Error generating poem (Full Error):", error);
        }

        res.status(status).json({ error: message });
    }
});

// Server is now dedicated API server

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

export default app;
