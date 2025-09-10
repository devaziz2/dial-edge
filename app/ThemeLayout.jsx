"use client";

import { createContext, useContext, useState } from "react";

// Create context
const ThemeContext = createContext();

// Provider
export default function ThemeLayout({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div data-theme={theme} className="min-h-screen">
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

// Hook to use theme anywhere
export function useTheme() {
  return useContext(ThemeContext);
}
