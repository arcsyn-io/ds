import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DocsApp } from "./docs-app";
import "./styles.css";
import "./theme-brand.css";
import "@arcsyn/tokens/themes/corporate-dark.css";
import "@arcsyn/tokens/themes/catppuccin-mocha.css";
import "@arcsyn/tokens/themes/catppuccin-latte.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DocsApp />
  </StrictMode>,
);
