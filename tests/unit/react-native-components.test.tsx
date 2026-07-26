import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../../packages/react-native/src/components/button";
import { Command } from "../../packages/react-native/src/components/command";
import { Slider } from "../../packages/react-native/src/components/slider";
import { ArcSynProvider } from "../../packages/react-native/src/theme";

vi.mock("../../packages/react-native/src/icons/index", () => ({ SearchIcon: () => null }));

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

  it("filtra comandos e mantém alvos de toque nativos", () => {
    const { rerender } = render(
      <ArcSynProvider theme="dark">
        <Command.Root value="">
          <Command.Input />
          <Command.List>
            <Command.Item value="dashboard">Dashboard</Command.Item>
            <Command.Item value="settings">Configurações</Command.Item>
          </Command.List>
        </Command.Root>
      </ArcSynProvider>,
    );
    expect(screen.getByRole("menuitem", { name: "Dashboard" })).toBeInTheDocument();

    rerender(
      <ArcSynProvider theme="dark">
        <Command.Root value="config">
          <Command.Input />
          <Command.List>
            <Command.Item value="dashboard">Dashboard</Command.Item>
            <Command.Item value="settings">Configurações</Command.Item>
          </Command.List>
        </Command.Root>
      </ArcSynProvider>,
    );
    const item = screen.getByRole("menuitem", { name: "Configurações" });
    expect(item).toBeInTheDocument();
    expect(getComputedStyle(item).minHeight).toBe("44px");
  });

  it("mantém valor e alvo acessível no Slider nativo", () => {
    render(
      <ArcSynProvider theme="dark">
        <Slider.Root defaultValue={35}>
          <Slider.Label>Volume</Slider.Label>
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
            </Slider.Track>
            <Slider.Thumb label="Volume" />
          </Slider.Control>
          <Slider.Value />
        </Slider.Root>
      </ArcSynProvider>,
    );
    const slider = screen.getByRole("slider", { name: "Volume" });
    expect(screen.getByText("35")).toBeInTheDocument();
    expect(getComputedStyle(slider).height).toBe("44px");
  });
});
