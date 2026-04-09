import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} });

// Module-level variable to persist choice without localStorage (sandbox restrictions)
let globalThemeChoice = null;

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (globalThemeChoice) return globalThemeChoice;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark'; // Default to dark if no matchMedia or prefers dark
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    globalThemeChoice = theme;
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
