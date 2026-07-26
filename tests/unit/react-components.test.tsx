import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../../packages/react/src/components/button/button";
import { Field } from "../../packages/react/src/components/field/field";
import { Input } from "../../packages/react/src/components/input/input";
import { Command } from "../../packages/react/src/components/command/command";
import { Slider } from "../../packages/react/src/components/slider/slider";
import { cx } from "../../packages/react/src/utilities/cx";

describe("contratos dos componentes React", () => {
  it("combina classes públicas sem adicionar valores vazios", () => {
    expect(cx("arcsyn-button", undefined, false, "custom")).toBe("arcsyn-button custom");
  });

  it("expõe variante, tamanho e comportamento de clique do Button", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button variant="danger" size="lg" onClick={onClick}>
        Remover
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Remover" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-variant", "danger");
    expect(button).toHaveAttribute("data-size", "lg");
    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("desabilita o Button e anuncia carregamento", () => {
    render(<Button loading>Salvar</Button>);
    const button = screen.getByRole("button", { name: "Salvar" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("data-loading", "true");
  });

  it("associa label, descrição e erro ao Input sem violações Axe", async () => {
    const { container } = render(
      <Field.Root>
        <Field.Label htmlFor="project">Projeto</Field.Label>
        <Input id="project" aria-describedby="project-description project-error" invalid />
        <Field.Description id="project-description">Nome visível para a equipe.</Field.Description>
        <Field.Error id="project-error">Campo obrigatório.</Field.Error>
      </Field.Root>,
    );

    expect(screen.getByLabelText("Projeto")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Campo obrigatório.");
    expect((await axe(container)).violations).toEqual([]);
  });

  it("filtra e executa comandos pelo teclado", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(
      <Command.Root>
        <Command.Input />
        <Command.List>
          <Command.Empty>Nenhum comando encontrado.</Command.Empty>
          <Command.Group heading="Navegação">
            <Command.Item value="dashboard" keywords={["visão geral"]} onSelect={onSelect}>
              Dashboard
            </Command.Item>
            <Command.Item value="settings" onSelect={onSelect}>
              Configurações
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Root>,
    );

    const input = screen.getByRole("combobox", { name: "Buscar comandos" });
    await user.type(input, "visao");
    expect(screen.getByRole("option", { name: "Dashboard" })).toBeVisible();
    expect(screen.queryByRole("option", { name: "Configurações" })).toBeNull();
    await user.keyboard("{ArrowDown}{Enter}");
    expect(onSelect).toHaveBeenCalledWith("dashboard");
  });

  it("expõe a estrutura acessível do Command sem violações Axe", async () => {
    const { container } = render(
      <Command.Root>
        <Command.Input />
        <Command.List>
          <Command.Item value="projects">Projetos</Command.Item>
        </Command.List>
      </Command.Root>,
    );
    expect((await axe(container)).violations).toEqual([]);
  });

  it("altera o Slider pelo teclado e respeita step", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Slider.Root defaultValue={40} step={5} onValueChange={onValueChange}>
        <Slider.Label>Volume</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Indicator />
          </Slider.Track>
          <Slider.Thumb />
        </Slider.Control>
      </Slider.Root>,
    );
    const slider = screen.getByRole("slider", { name: "Volume" });
    slider.focus();
    await user.keyboard("{ArrowRight}");
    expect(onValueChange).toHaveBeenLastCalledWith(45, expect.anything());
  });

  it("nomeia os thumbs de intervalo e expõe somente leitura", async () => {
    const { container } = render(
      <Slider.Root defaultValue={[20, 80]} readOnly>
        <Slider.Label>Faixa permitida</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Indicator />
          </Slider.Track>
          <Slider.Thumb index={0} label="Mínimo" />
          <Slider.Thumb index={1} label="Máximo" />
        </Slider.Control>
      </Slider.Root>,
    );
    expect(screen.getByRole("slider", { name: "Mínimo" })).toHaveAttribute("aria-readonly", "true");
    expect(screen.getByRole("slider", { name: "Máximo" })).toHaveAttribute("aria-valuenow", "80");
    expect((await axe(container)).violations).toEqual([]);
  });
});
