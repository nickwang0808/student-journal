import { createTheme, ThemeProvider } from "@mui/material";
import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

type themeMode = "light" | "dark";

interface CustomThemeContext {
  theme: themeMode;
  setTheme: React.Dispatch<React.SetStateAction<themeMode>>;
}

export const customThemeContext = createContext<CustomThemeContext>({
  theme: "light",
  setTheme: () => {},
});

const themePallete = {
  dark: createTheme({
    palette: {
      mode: "dark",
    },
  }),
  light: createTheme({
    palette: {
      mode: "light",
    },
  }),
};
export const CustomThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<themeMode>(getInitialTheme);
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  function getInitialTheme() {
    const savedTheme = localStorage.getItem("theme");

    return (savedTheme as themeMode) ?? "light";
  }

  return (
    <customThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={themePallete[theme]}>{children}</ThemeProvider>
    </customThemeContext.Provider>
  );
};
