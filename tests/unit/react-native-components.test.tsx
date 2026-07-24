import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "../../packages/react-native/src/components/button";
import { ArcSynProvider } from "../../packages/react-native/src/theme";

describe("contratos dos componentes React Native", () => {
  it("mantém alvo de toque padrão e estado acessível de carregamento", () => {
    render(
      <ArcSynProvider theme="dark">
        <Button loading>Sincronizar</Button>
      </ArcSynProvider>,
    );

    const button = screen.getByRole("button", { name: "Sincronizar" });
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(getComputedStyle(button).minHeight).toBe("44px");
  });
});
