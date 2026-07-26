import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../../packages/react-native/src/components/button";
import { Command } from "../../packages/react-native/src/components/command";
import { DatePicker } from "../../packages/react-native/src/components/date-picker";
import { Slider } from "../../packages/react-native/src/components/slider";
import { Time } from "../../packages/react-native/src/components/time";
import { ArcSynProvider } from "../../packages/react-native/src/theme";

vi.mock("../../packages/react-native/src/icons/index", () => ({
  CalendarIcon: () => null,
  ChevronLeftIcon: () => null,
  ChevronRightIcon: () => null,
  SearchIcon: () => null,
  XIcon: () => null,
}));

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

  it("abre o calendário nativo e expõe fechamento explícito", () => {
    render(
      <ArcSynProvider theme="dark">
        <DatePicker label="Data de implantação" defaultValue="2026-08-15" />
      </ArcSynProvider>,
    );

    const input = screen.getByLabelText("Data de implantação");
    expect(input).toHaveValue("15/08/2026");
    expect(getComputedStyle(input).minHeight).toBe("44px");
    fireEvent.click(screen.getByRole("button", { name: "Abrir calendário para Data de implantação" }));
    expect(screen.getByRole("button", { name: "Fechar" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "setembro" }));
    expect(screen.getByRole("button", { name: "terça-feira, 1 de setembro de 2026" })).toBeInTheDocument();
  });

  it("oferece hora e minuto opcionais no Date Picker nativo", () => {
    const onValueChange = vi.fn();
    render(
      <ArcSynProvider theme="dark">
        <DatePicker label="Início da implantação" defaultValue="2026-08-15T09:30" onValueChange={onValueChange} includeTime minuteStep={5} />
      </ArcSynProvider>,
    );

    expect(screen.getByLabelText("Início da implantação")).toHaveValue("15/08/2026, 09:30");
    fireEvent.click(screen.getByRole("button", { name: "Abrir calendário para Início da implantação" }));
    expect(screen.getByRole("button", { name: "Aplicar" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Aumentar segundo" })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Aumentar hora" }));
    expect(onValueChange).toHaveBeenLastCalledWith("2026-08-15T10:30");
    fireEvent.click(screen.getByRole("button", { name: "Aumentar minuto" }));
    expect(onValueChange).toHaveBeenLastCalledWith("2026-08-15T10:35");
  });

  it("altera hora, minuto e segundo no Time nativo", () => {
    const onValueChange = vi.fn();
    render(
      <ArcSynProvider theme="dark">
        <Time label="Horário da execução" defaultValue="09:30:00" onValueChange={onValueChange} minuteStep={5} secondStep={15} />
      </ArcSynProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Aumentar hora" }));
    expect(onValueChange).toHaveBeenLastCalledWith("10:30:00");
    fireEvent.click(screen.getByRole("button", { name: "Aumentar minuto" }));
    expect(onValueChange).toHaveBeenLastCalledWith("10:35:00");
    fireEvent.click(screen.getByRole("button", { name: "Aumentar segundo" }));
    expect(onValueChange).toHaveBeenLastCalledWith("10:35:15");
    expect(getComputedStyle(screen.getByRole("button", { name: "Aumentar segundo" })).height).toBe("44px");
  });
});
