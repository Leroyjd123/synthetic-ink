<div align="center">
  <img width="1200" height="475" alt="Synthetic Ink Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Synthetic Ink

> "Written by a machine. Felt by you."

Synthetic Ink is an elegant, AI-powered poetry generator that transforms your parameters into unique verses using Google's Gemini AI. Built with React and designed with a focus on aesthetics and user experience.

## ✨ Features

-   **AI-Powered Generation**: Utilizes Google's Gemini-2 Flash model for creative and context-aware poetry.
-   **Secure Backend Proxy**: API keys are securely managed on a local Express server, never exposed to the client.
-   **Customizable**: Tailored generation based on Theme, Tone, Style, and Length.
-   **History & Savings**: Automatically tracks your history and allows you to save your favorite pieces to local storage.
-   **Dark Mode**: A beautiful, meticulously crafted dark theme for late-night inspiration.
-   **Responsive Design**: A fluid interface that works seamlessly across desktop and mobile devices.

## 🛠️ Tech Stack

-   **Frontend**: React 18, Vite, TypeScript, Tailwind CSS
-   **Backend**: Node.js, Express, Google GenAI SDK
-   **Persistence**: LocalStorage

## 🚀 Getting Started

Follow these steps to run Synthetic Ink locally.

### Prerequisites

-   Node.js (v18 or higher recommended)
-   A Google Gemini API Key

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/your-username/synthetic-ink.git
    cd synthetic-ink
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables**

    Create a `.env.local` file in the root directory and add your Gemini API key:

    ```env
    GEMINI_API_KEY=your_actual_api_key_here
    ```

4.  **Run the application**

    ```bash
    npm run dev
    ```

    This command uses `concurrently` to start both the **Backend Server** (port 3001) and the **Frontend Client** (port 3000).

    Open http://localhost:3000 to view it in the browser.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
