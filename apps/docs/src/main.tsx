import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DocsApp } from "./docs-app";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DocsApp />
  </StrictMode>,
);
