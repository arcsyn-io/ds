import { tokens as generatedTokens } from "@arcsyn/tokens/react-native";
import { createContext, useContext, type ReactNode } from "react";

export type ArcSynThemeName = "light" | "dark";

export interface ArcSynColors {
  background: string;
  foreground: string;
  surface: string;
  surfaceRaised: string;
  surfaceSunken: string;
  muted: string;
  mutedForeground: string;
  primary: string;
  primaryForeground: string;
  primaryHover: string;
  accent: string;
  accentForeground: string;
  border: string;
  borderStrong: string;
  focusRing: string;
  success: string;
  warning: string;
  danger: string;
}

export interface ArcSynNativeTokens {
  spacing: Record<string, number>;
  radius: Record<string, number>;
  fontSize: Record<string, number>;
  duration: Record<string, number>;
  fontFamily: {
    sans: string;
    sansMedium: string;
    sansSemibold: string;
    mono: string;
    monoMedium: string;
  };
  themes: Record<ArcSynThemeName, { color: ArcSynColors }>;
}

export const tokens = generatedTokens as unknown as ArcSynNativeTokens;

interface ArcSynThemeContextValue {
  name: ArcSynThemeName;
  colors: ArcSynColors;
}

const defaultTheme: ArcSynThemeContextValue = {
  name: "dark",
  colors: tokens.themes.dark.color,
};

const ArcSynThemeContext = createContext<ArcSynThemeContextValue>(defaultTheme);

export interface ArcSynProviderProps {
  children: ReactNode;
  theme?: ArcSynThemeName;
}

export function ArcSynProvider({ children, theme = "dark" }: ArcSynProviderProps) {
  return <ArcSynThemeContext.Provider value={{ name: theme, colors: tokens.themes[theme].color }}>{children}</ArcSynThemeContext.Provider>;
}

export function useArcSynTheme() {
  return useContext(ArcSynThemeContext);
}
