import { HumanMessage } from "@langchain/core/messages";
import {
  StateSchema,
  MessagesValue,
  type GraphNode,
  StateGraph,
  ReducedValue,
  START,
  END,
} from "@langchain/langgraph";
import { geminiModel, mistralModel, cohereModel } from "./models.service.js";
import { createAgent, providerStrategy } from "langchain";
import * as z from "zod";

// ===================== STATE DEFINITION =====================
const State = new StateSchema({
  messages: MessagesValue,

  solution_1: new ReducedValue(
    z
      .object({
        message: z.string(),
        score: z.number(),
        model: z.string(),
      })
      .default({ message: "", score: 0, model: "cohere" }),
    {
      reducer: (current, next) => next,
    },
  ),

  solution_2: new ReducedValue(
    z
      .object({
        message: z.string(),
        score: z.number(),
        model: z.string(),
      })
      .default({ message: "", score: 0, model: "mistral" }),
    {
      reducer: (current, next) => next,
    },
  ),

  judge_recommendation: new ReducedValue(
    z
      .object({
        winner: z.string(),
        solution_1_score: z.number(),
        solution_2_score: z.number(),
        reasoning: z.string(),
      })
      .default({
        winner: "",
        solution_1_score: 0,
        solution_2_score: 0,
        reasoning: "",
      }),
    {
      reducer: (current, next) => next,
    },
  ),

  final_output: new ReducedValue(
    z
      .object({
        message: z.string(),
        winner_model: z.string(),
        score: z.number(),
      })
      .default({
        message: "",
        winner_model: "",
        score: 0,
      }),
    {
      reducer: (current, next) => next,
    },
  ),
});

// ===================== NODE DEFINITIONS =====================

/**
 * SolutionNode: Calls two different models (Gemini and Mistral)
 * Each model returns a solution with a score
 */
const solutionNode: GraphNode<typeof State> = async (state) => {
  console.log("🔄 Executing Solution Node...");

  const lastMessage = state.messages[state.messages.length - 1];

  if (!lastMessage) {
    throw new Error("No messages available to generate a solution.");
  }

  const userMessage =
    typeof lastMessage.content === "string"
      ? lastMessage.content
      : JSON.stringify(lastMessage.content);

  try {
    // Call Model 1 and Model 2 in Parallel (cohere)
    const [solution1Response, solution2Response] = await Promise.all([
      cohereModel.invoke([new HumanMessage(userMessage)]),
      mistralModel.invoke([new HumanMessage(userMessage)]),
    ]);

    //keep in Mind the schema of solution in state
    const solution_1 = {
      message: getText(solution1Response),
      score: extractScore(solution1Response),
      model: "cohere",
    };

    const solution_2 = {
      message: getText(solution2Response),
      score: extractScore(solution2Response),
      model: "mistral",
    };

    console.log("✅ Solution 1 (Cohere):", solution_1);
    console.log("✅ Solution 2 (Mistral):", solution_2);

    return {
      solution_1,
      solution_2,
    };
  } catch (error) {
    console.error("❌ Error in solution node:", error);
    throw error;
  }
};

/**
 * JudgeNode: Evaluates both solutions and determines the winner
 * Uses gemini model as the judge to compare both solutions
 */
const judgeNode: GraphNode<typeof State> = async (state) => {
  console.log("⚖️ Executing Judge Node...");

  const { solution_1, solution_2 } = state;

  try {
    // Schema that Gemini MUST follow
    const JudgeSchema = z.object({
      winner: z.enum(["solution_1", "solution_2"]),
      solution_1_score: z.number().min(0).max(10),
      solution_2_score: z.number().min(0).max(10),
      reasoning: z.string(),
    });

    // Create judge agent
    const judgeAgent = createAgent({
      model: geminiModel,

      responseFormat: providerStrategy(JudgeSchema),

      systemPrompt: `You are an expert evaluator.Compare two AI responses.
    Evaluate:
    1. Accuracy
    2. Completeness
    3. Clarity
    4. Correctness
    Give both responses a score from 0-10.
    Return the winner.`,
    });

    const result = await judgeAgent.invoke({
      messages: [
        new HumanMessage(`Compare these two responses.

Response 1 (${solution_1.model}):

${solution_1.message}


Response 2 (${solution_2.model}):

${solution_2.message}
`),
      ],
    });

    /**
     * Because we used providerStrategy()
     * LangChain already validated the response
     * against JudgeSchema.
     */
    const judgment = result.structuredResponse;

    const judge_recommendation = {
      winner: judgment.winner,
      solution_1_score: judgment.solution_1_score,
      solution_2_score: judgment.solution_2_score,
      reasoning: judgment.reasoning,
    };

    console.log("✅ Judge Decision:");
    console.log(judge_recommendation);

    return {
      judge_recommendation,
    };
  } catch (error) {
    console.error("❌ Error in judge node:", error);
    throw error;
  }
};

/**
 * OutputNode: Determines the winner and prepares the final response
 * Forwards the winning solution to the user
 */
const outputNode: GraphNode<typeof State> = async (state) => {
  console.log("🎯 Executing Output Node...");

  const { solution_1, solution_2, judge_recommendation } = state;

  try {
    // Determine the winner based on judge's recommendation
    const winner =
      judge_recommendation.winner === "solution_1" ? solution_1 : solution_2;

    const final_output = {
      message: winner.message,
      winner_model: winner.model,
      score:
        judge_recommendation.winner === "solution_1"
          ? judge_recommendation.solution_1_score
          : judge_recommendation.solution_2_score,
    };

    console.log("🏆 Winner:", final_output.winner_model);
    console.log("📝 Final Message:", final_output.message);

    return {
      final_output,
    };
  } catch (error) {
    console.error("❌ Error in output node:", error);
    throw error;
  }
};

// ===================== HELPER FUNCTIONS =====================

/**
 * Extract score from model response
 * Adjust this based on your actual model response format
 */
function extractScore(response: any): number {
  try {
    // If the response contains a score field
    if (response.score) return response.score;

    // Otherwise, return a default quality score
    const message = response.content || String(response);
    // Simple heuristic: longer, more detailed responses get higher scores
    return Math.min(10, Math.round((message.length / 100) * 10));
  } catch {
    return 5; // Default mid-range score
  }
}

function getText(response: any): string {
  if (typeof response.content === "string") {
    return response.content;
  }

  return response.content.map((part: any) => part.text ?? "").join("\n");
}

// ===================== GRAPH CONSTRUCTION =====================

const graph = new StateGraph(State)
  // Add all nodes
  .addNode("solution", solutionNode)
  .addNode("judge", judgeNode)
  .addNode("output", outputNode)

  // Define edges (flow)
  .addEdge(START, "solution") // Start → Solution Node
  .addEdge("solution", "judge") // Solution Node → Judge Node
  .addEdge("judge", "output") // Judge Node → Output Node
  .addEdge("output", END) // Output Node → End

  .compile();

// ===================== MAIN EXPORT =====================


export default async function processUserMessage(userMessage: string) {
  console.log("\n🚀 Starting Graph Execution...");
  console.log("📥 User Message:", userMessage);

  try {
    // Use object format instead of HumanMessage class
    const result = await graph.invoke({
      messages: [
        { content: userMessage, type: "user" } // or role: "user"
      ],
    });

    console.log("\n✅ Graph Execution Complete!");
    console.log("📤 Final Output:", result.final_output);

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("❌ Graph execution failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Optional: Export individual nodes for testing
export { solutionNode, judgeNode, outputNode };
