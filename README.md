# ⚔️ AI-BattleGrounds

> Let the models fight. Only the best answer survives.

**AI-BattleGrounds** is an LLM battle arena where two AI models — **Mistral** and **Cohere** — go head-to-head on any query you throw at them. Each model generates a response and self-scores it, then **Gemini** steps in as the impartial judge to crown the winner.

---

## 🧠 How It Works

```
User Query
    │
    ├──► Mistral  ──► Response + Self Score (out of 10)
    │                            │
    └──► Cohere   ──► Response + Self Score (out of 10)
                                 │
                        Gemini (Judge) ◄──────────────┘
                                 │
                     Picks the Best Response
                     + Assigns Final Score
                                 │
                         🏆 Winner Declared
```

1. **You submit a query** via the frontend.
2. **Mistral and Cohere** independently generate their best responses and each assign a self-score out of 10.
3. **Gemini** acts as the judge — it reviews both responses and declares the winner based on quality, accuracy, and clarity.
4. **The result** shows you the winning model, both responses, and the final scores side by side.

---

## Live Link : (https://ai-battle-grounds.vercel.app/)

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **TypeScript** | Type-safe server-side logic |
| **Express.js** | REST API & routing |
| **LangGraph** | Orchestrating the multi-model battle pipeline |
| **Mistral AI** | Contestant model #1 |
| **Cohere** | Contestant model #2 |
| **Gemini** | Judge model |

### Frontend
| Technology | Purpose |
|---|---|
| **React.js** | UI framework |
| **Tailwind CSS** | Styling |
| **React Markdown** | Rendering formatted model responses |
| **Context API** | Global state management |


---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- API keys for **Mistral**, **Cohere**, and **Gemini**

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/AI-BattleGrounds.git
cd AI-BattleGrounds
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
MISTRAL_API_KEY=your_mistral_api_key
COHERE_API_KEY=your_cohere_api_key
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

The app will be running at `http://localhost:5173`

---

## 🔌 API Reference

### `POST /api/battle`

Triggers the AI battle pipeline.

**Request Body:**
```json
{
  "query": "Explain quantum entanglement in simple terms"
}
```

**Response:**
```json
{
  "mistral": {
    "response": "...",
    "selfScore": 8
  },
  "cohere": {
    "response": "...",
    "selfScore": 7
  },
  "judge": {
    "winner": "Mistral",
    "finalScore": 8.5,
    "reasoning": "Mistral's response was clearer and more structured..."
  }
}
```

---

## ✨ Features

- ⚡ **Real-time battle** — query two LLMs simultaneously via LangGraph
- 🤖 **Self-scoring** — each model evaluates its own response
- 🧑‍⚖️ **AI Judge** — Gemini provides an unbiased final verdict
- 📝 **Markdown rendering** — formatted model outputs via React Markdown
- 🌐 **Global state** — seamless data flow using Context API
- 🎨 **Clean UI** — responsive design with Tailwind CSS

---

## 🗺️ Roadmap

- [ ] Add more contestant models (GPT-4o, Claude, LLaMA)
- [ ] Battle history & leaderboard
- [ ] User accounts & saved battles
- [ ] Streaming responses in real-time
- [ ] Category-based battle modes (coding, reasoning, creativity)

---

## 🙌 Acknowledgements

- [LangGraph](https://www.langchain.com/langgraph) — for the multi-agent orchestration framework
- [Mistral AI](https://mistral.ai/)
- [Cohere](https://cohere.com/)
- [Google Gemini](https://deepmind.google/technologies/gemini/)
