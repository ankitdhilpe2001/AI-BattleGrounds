import { useContext } from "react";
import { ResponsesContext } from "../responses.context";
import { sendMessage } from "../services/chat.api";

const useResponse = () => {
  const context = useContext(ResponsesContext);

  if (!context) {
    throw new Error("useResponse must be used within a ResponsesProvider");
  }

  const { loading, setLoading, error, setError, battleState, setBattleState } = context;

  const handleSendMessage = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const res = await sendMessage({ query });
      // be tolerant to different response shapes: prefer `data` if present
      const nextState = res?.data ?? res;
      setBattleState(nextState);
      return nextState;

    } catch (err) {
      const message = err.response?.data?.message || err.message || "Something went wrong";
      setError(message);
      throw err;

    } finally {
      setLoading(false);
    }
  };

  return { handleSendMessage, loading, error, battleState };
};

export default useResponse;
