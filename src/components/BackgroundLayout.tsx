"use client";

import { useTheme } from "@/app/ThemeContext/ThemeContext";


export function BackgroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { alt, setAlt } = useTheme();


  return (
    <>
      {/* tombol switch global */}
      <div className="fixed left-1 top-4 z-50 my-15">
        <button
          onClick={() => setAlt(!alt)}
          className="rounded-xl border border-white/20 bg-black/40 px-4 py-2 text-sm text-white backdrop-blur hover:bg-black/60"
        >
          {alt ? "Default BG" : "Alt BG"}
        </button>
      </div>

      {/* wrapper background */}
      <div
        className={`min-h-screen transition-all duration-500 ${
          alt
            ? "bg-gradient-to-br from-[#1b2746] via-[#282254] to-[#1a5866] text-white"
            : "bg-gradient-to-br from-[#223159] via-[#312965] to-[#20697a] text-white"
        }`}
      >
        {children}
      </div>
    </>
  );
}
