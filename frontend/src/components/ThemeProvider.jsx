import * as React from "react";

const initialState = {
  theme: "light",
  setTheme: () => null,
  toggleTheme: () => null,
};

const ThemeProviderContext = React.createContext(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "lumenid-theme",
  ...props
}) {
  const [theme, setTheme] = React.useState(() => {
    // Check system preference first, then localStorage, then default
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    try {
      return localStorage.getItem(storageKey) || defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  // Listen for system theme changes
  React.useEffect(() => {
    const mediaQueryDark = window.matchMedia('(prefers-color-scheme: dark)');
    const mediaQueryLight = window.matchMedia('(prefers-color-scheme: light)');

    const handleSystemChange = () => {
      if (!localStorage.getItem(storageKey)) {
        // Only change if no user preference saved
        setTheme(mediaQueryDark.matches ? 'dark' : 'light');
      }
    };

    mediaQueryDark.addListener(handleSystemChange);
    mediaQueryLight.addListener(handleSystemChange);

    return () => {
      mediaQueryDark.removeListener(handleSystemChange);
      mediaQueryLight.removeListener(handleSystemChange);
    };
  }, [storageKey]);

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme) => {
      try {
        localStorage.setItem(storageKey, theme);
        setTheme(theme);
      } catch {
        setTheme(theme);
      }
    },
    toggleTheme: () => {
      const newTheme = theme === "light" ? "dark" : "light";
      try {
        localStorage.setItem(storageKey, newTheme);
      } catch {
        // Fail silently
      }
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};