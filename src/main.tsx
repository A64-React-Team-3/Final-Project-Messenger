import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./store/ThemeContext.tsx";
import { DyteAppProvider } from "./store/DyteAppProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      {/* <DyteAppProvider> */}
      <App />
      {/* </DyteAppProvider> */}
    </ThemeProvider>
  </StrictMode>
);
