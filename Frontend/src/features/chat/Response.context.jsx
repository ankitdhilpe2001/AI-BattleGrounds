import { ResponsesContext } from "./responses.context";
import { useState } from "react";

export const ResponsesProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [battleState, setBattleState] = useState({
        messages: [],

        solution_1: {
            message: "",
            score: 0,
            model: "cohere",
        },

        solution_2: {
            message: "",
            score: 0,
            model: "mistral",
        },

        judge_recommendation: {
            winner: "",
            solution_1_score: 0,
            solution_2_score: 0,
            reasoning: "",
        },

        final_output: {
            message: "",
            winner_model: "",
            score: 0,
        },
    });

    return (
        <ResponsesContext.Provider
            value={{
                loading,
                setLoading,
                error,
                setError,
                battleState,
                setBattleState,
            }}
        >
            {children}
        </ResponsesContext.Provider>
    );
};
