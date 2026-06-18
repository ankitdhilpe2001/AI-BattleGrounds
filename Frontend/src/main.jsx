import { createRoot } from "react-dom/client";
import App from "./App/App.jsx";
import "./App/App.css";
import { ResponsesProvider } from "../src/features/chat/Response.context.jsx";

createRoot(document.getElementById("root")).render(
  <ResponsesProvider>
    <App />
  </ResponsesProvider>,
);
