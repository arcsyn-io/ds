import type { Preview } from "@storybook/react-vite";
import "../src/styles.css";
import "../src/theme-brand.css";
import "@arcsyn-io/tokens/themes/corporate-dark.css";
import "@arcsyn-io/tokens/themes/catppuccin-mocha.css";
import "@arcsyn-io/tokens/themes/catppuccin-latte.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
  globalTypes: {
    theme: {
      description: "Tema visual ArcSyn",
      defaultValue: "dark",
      toolbar: {
        icon: "paintbrush",
        items: ["light", "dark", "deep-dark", "corporate-dark", "catppuccin-mocha", "catppuccin-latte"],
      },
    },
  },
  decorators: [
    (Story, context) => (
      <div data-arcsyn-theme={context.globals.theme} style={{ minHeight: "4rem", padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
