import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../../packages/react/src/components/button/button";
import { Field } from "../../packages/react/src/components/field/field";
import { Input } from "../../packages/react/src/components/input/input";
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
});
