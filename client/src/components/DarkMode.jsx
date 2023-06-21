import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function useDarkSide() {
  const [theme, setTheme] = useState(localStorage.theme);
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
  
    localStorage.setItem('theme', theme);
  }, [theme]);

  return [colorTheme, setTheme];
}