import { useCallback, useState } from 'react';

const THEME_KEY = 'theme';

/** Dark / light theme persisted in localStorage, toggled from the floating nav. */
export function useTheme() {
  const [light, setLight] = useState(() => document.documentElement.classList.contains('light-mode'));

  const toggle = useCallback(() => {
    setLight((previous) => {
      const next = !previous;
      document.documentElement.classList.toggle('light-mode', next);
      localStorage.setItem(THEME_KEY, next ? 'light' : 'dark');
      return next;
    });
  }, []);

  return { light, toggle };
}
