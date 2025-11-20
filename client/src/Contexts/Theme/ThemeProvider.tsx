import { prettifyError } from "zod";
import { type ReactNode, useState, useEffect } from "react";
import { ThemeContext, type ThemeOptionsType, ThemeOptionsValidator } from "./ThemeContext";
export default function ThemeProvider({ children }: { children: ReactNode }) {

  const getDefaultTheme: () => ThemeOptionsType = () => {
    const { success, data } = ThemeOptionsValidator.safeParse(localStorage.getItem("theme"));
    return success ? data : "dark";
  }
  
  const [theme, setTheme] = useState<ThemeOptionsType>(getDefaultTheme);
  
  useEffect(() => document.documentElement.setAttribute('data-theme', theme), [theme]);

  const applyTheme = (theme: ThemeOptionsType) => {
    const { success, data, error } = ThemeOptionsValidator.safeParse(theme);
    if (!success) return console.log(prettifyError(error));
    localStorage.setItem("theme", data);
    document.documentElement.setAttribute('data-theme', data);
    setTheme(data);
  };

  return (
    <ThemeContext.Provider value={{ theme, applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}