import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useState } from 'react';
import * as apiClient from '../api-clients';
import { useMediaQuery } from '@uidotdev/usehooks';

type AppContext = {
  isLoggedIn: boolean;
  theme: string;
  toggleTheme: () => void;
  isSmallDevice: boolean;
};

const AppContext = createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isSmallDevice = useMediaQuery('only screen and (max-width : 640px)');
  const [theme, setTheme] = useState(() => {
    // Skontrolujeme `localStorage` pri načítaní stránky
    if (localStorage.theme) {
      return localStorage.theme;
    } else {
      // Ak v `localStorage` nie je nastavenie, zistíme preferencie systému
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
  });

  useEffect(() => {
    // Pridáme alebo odstránime triedu `dark` na základe aktuálnej témy
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Uložíme aktuálnu tému do `localStorage`
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Funkcia na prepínanie medzi svetlým a tmavým režimom
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const { error } = useQuery({
    queryKey: ['validateToken'],
    queryFn: apiClient.validateToken,
    retry: 0,
  });

  return (
    <AppContext.Provider
      value={{ isLoggedIn: !error, theme, toggleTheme, isSmallDevice }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
