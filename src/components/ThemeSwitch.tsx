// components/ThemeSwitch.tsx
"use client";

import { useThemeMode } from "@/app/theme-provider/theme-provider";

export function ThemeSwitch() {
  const { theme, toggleTheme } = useThemeMode();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded border"
      type="button"
    >
      {theme === "default" ? "🌈 Mode 2" : "🔵 Mode Default"}
    </button>
  );
}
