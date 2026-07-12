import { z } from "zod";
import { Store, useSelector } from "@tanstack/react-store";

export const ThemeOptionsValidator = z.enum([
  "light",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "retro",
  "valentine",
  "garden",
  "lofi",
  "pastel",
  "fantasy",
  "cmyk",
  "autumn",
  "acid",
  "lemonade",
  "winter",
  "nord",
  "silk",
  "caramellatte",
  "dark",
  "synthwave",
  "halloween",
  "forest",
  "aqua",
  "black",
  "luxury",
  "dracula",
  "business",
  "night",
  "coffee",
  "dim",
  "sunset",
]);

export type ThemeOptionsType = z.infer<typeof ThemeOptionsValidator>;

// Runs once outside React to get initial state and prevent theme flashing
const getDefaultTheme = (): ThemeOptionsType => {
  if (typeof window === "undefined") return "dark";
  const { success, data } = ThemeOptionsValidator.safeParse(
    localStorage.getItem("theme"),
  );
  const theme = success ? data : "dark";
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
};

export const themeStore = new Store({
  theme: getDefaultTheme(),
});

export const themeActions = {
  applyTheme: (theme: ThemeOptionsType) => {
    const { success, data, error } = ThemeOptionsValidator.safeParse(theme);
    if (!success) {
      console.error(error);
      return;
    }
    localStorage.setItem("theme", data);
    document.documentElement.setAttribute("data-theme", data);
    themeStore.setState((state) => ({ ...state, theme: data }));
  },
};

// Drop-in replacement hook for your components
export const useTheme = () => {
  const theme = useSelector(themeStore, (state) => state.theme);
  return { theme, applyTheme: themeActions.applyTheme };
};
