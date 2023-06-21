import React, { useState } from 'react';
import useDarkSide from './DarkMode';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

export default function Switcher() {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(colorTheme === 'light' ? true : false);

  const toggleDarkMode = checked => {
    const newTheme = checked ? 'dark' : 'light';
    setTheme(newTheme);
    setDarkSide(checked);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <>
      <div>
        <DarkModeSwitch checked={darkSide} onChange={toggleDarkMode} size={32} />
      </div>
    </>
  );
}