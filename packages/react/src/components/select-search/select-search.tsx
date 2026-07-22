import { Combobox } from "@base-ui/react/combobox";
import { useState, type ComponentPropsWithoutRef } from "react";
import { cx } from "../../utilities/cx.js";

export interface SelectSearchOption {
  label: string;
  value: string;
  disabled?: boolean;
  group?: string;
}

export interface SelectSearchProps extends Omit<ComponentPropsWithoutRef<"input">, "defaultValue" | "onChange" | "value"> {
  options: SelectSearchOption[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  searchPlaceholder?: string;
  emptyMessage?: string;
}

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
}

export function SelectSearch({
  options,
  value,
  defaultValue,
  onValueChange,
  searchPlaceholder = "Buscar opção",
  emptyMessage = "Nenhuma opção encontrada.",
  className,
  disabled,
  ...inputProps
}: SelectSearchProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = normalize(query);
  const visibleOptions = options.filter((option) => normalize(option.label).includes(normalizedQuery));

  return (
    <Combobox.Root
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      onInputValueChange={(nextValue) => setQuery(nextValue)}
      onValueChange={(nextValue) => onValueChange?.(nextValue)}
    >
      <div className="arcsyn-select-search">
        <Combobox.Input
          className={cx("arcsyn-select-search__input", className)}
          placeholder={searchPlaceholder}
          {...inputProps}
        />
        <Combobox.Clear className="arcsyn-select-search__clear" aria-label="Limpar seleção">×</Combobox.Clear>
        <Combobox.Trigger className="arcsyn-select-search__trigger" aria-label="Mostrar opções">
          <Combobox.Icon className="arcsyn-select-search__icon">⌄</Combobox.Icon>
        </Combobox.Trigger>
      </div>
      <Combobox.Portal>
        <Combobox.Backdrop className="arcsyn-select-search__backdrop" />
        <Combobox.Positioner className="arcsyn-select-search__positioner" sideOffset={4}>
          <Combobox.Popup className="arcsyn-select-search__popup">
            <Combobox.List className="arcsyn-select-search__list">
              {visibleOptions.map((option, index) => (
                <Combobox.Item key={option.value} value={option.value} disabled={option.disabled} index={index} className="arcsyn-select-search__item">
                  <span>{option.label}</span>
                  <Combobox.ItemIndicator aria-hidden="true">✓</Combobox.ItemIndicator>
                </Combobox.Item>
              ))}
            </Combobox.List>
            {visibleOptions.length === 0 ? <Combobox.Empty className="arcsyn-select-search__empty">{emptyMessage}</Combobox.Empty> : null}
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
}
