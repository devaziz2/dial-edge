"use client";

import { useTheme } from "./ThemeLayout";

export default function Home() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-6 bg-theme">
      {/* Card */}
      <div className="bg-card rounded-lg px-6 py-8 shadow-xl ring-1 ring-gray-300 dark:ring-gray-700">
        <h3 className="text-theme text-lg font-semibold">Card Title</h3>
        <p className="text-muted mt-2">
          This card switches colors in light and dark mode using CSS variables.
        </p>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="btn px-5 py-2 rounded-lg font-medium shadow-md hover:opacity-90 transition"
      >
        Toggle {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
}
