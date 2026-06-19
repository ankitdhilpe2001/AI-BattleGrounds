import "dotenv/config";
import express from "express";
import useGraph from "./services/ai.graph.js";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200
}));



app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello world server is running" });
});

app.post("/user-message", async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required", received: req.body });
    }

    const result = await useGraph(query);

    return res.status(200).json({
      message: "Graph executed successfully",
      data: result
    });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({
      error: "Graph execution failed",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

export default app;
