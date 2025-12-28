'use client'

import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext<any>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [alt, setAlt] = useState(false);

  return (
    <ThemeContext.Provider value={{ alt, setAlt }}>
      {children}
    </ThemeContext.Provider>
  )

}

export function useTheme() {
  return useContext(ThemeContext)
}