import { forwardRef, useState, type HTMLAttributes } from "react";
import { cx } from "../../utilities/cx.js";

export type ThemeSwitcherTheme = "light" | "dark" | "deep-dark" | "corporate-dark" | "catppuccin-mocha" | "catppuccin-latte";

export interface ThemeSwitcherOption {
  value: ThemeSwitcherTheme;
  label: string;
}

export interface ThemeSwitcherProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  value?: ThemeSwitcherTheme;
  defaultValue?: ThemeSwitcherTheme;
  onValueChange?: (value: ThemeSwitcherTheme) => void;
  options?: readonly ThemeSwitcherOption[];
  label?: string;
  disabled?: boolean;
}

const defaultOptions: readonly ThemeSwitcherOption[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "deep-dark", label: "Deep Dark" },
  { value: "corporate-dark", label: "Corporate Dark" },
  { value: "catppuccin-mocha", label: "Catppuccin Mocha" },
  { value: "catppuccin-latte", label: "Catppuccin Latte" },
];

export const ThemeSwitcher = forwardRef<HTMLDivElement, ThemeSwitcherProps>(function ThemeSwitcher(
  {
    value,
    defaultValue = "dark",
    onValueChange,
    options = defaultOptions,
    label = "Tema",
    disabled = false,
    className,
    ...props
  },
  ref,
) {
  const [localValue, setLocalValue] = useState(defaultValue);
  const currentValue = value ?? localValue;

  function select(nextValue: ThemeSwitcherTheme) {
    if (nextValue === currentValue) return;
    if (value === undefined) setLocalValue(nextValue);
    onValueChange?.(nextValue);
  }

  return (
    <div ref={ref} className={cx("arcsyn-theme-switcher", className)} {...props}>
      <select
        className="arcsyn-theme-switcher__select"
        value={currentValue}
        aria-label={label}
        disabled={disabled}
        onChange={(event) => select(event.currentTarget.value as ThemeSwitcherTheme)}
      >
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </div>
  );
});
