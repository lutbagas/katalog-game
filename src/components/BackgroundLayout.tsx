"use client";

import { useTheme } from "@/app/ThemeContext_temp/ThemeContext";


export function BackgroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { alt, setAlt } = useTheme();


  return (
    <>
      {/* tombol switch global */}
      

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
