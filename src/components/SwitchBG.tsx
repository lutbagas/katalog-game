"use client";

import { useState } from "react";

export function SwitchBG({ children }: { children: React.ReactNode }) {
  const [alt, setAlt] = useState(false);

  return (
    <>
      <div className="fixed right-4 top-4 z-50">
        <button
          onClick={() => setAlt(!alt)}
          className="rounded-xl border border-white/20 bg-black/40 px-4 py-2 text-sm text-white backdrop-blur hover:bg-black/60"
        >
          {alt ? "Default BG" : "Alt BG"}
        </button>
      </div>

      <main
        className={`min-h-screen transition-all duration-500 ${
          alt
            ? "bg-gradient-to-br from-amber-100 via-yellow-200 to-orange-200 text-amber-900"
            : "bg-gradient-to-br from-[#223159] via-[#312965] to-[#20697a] text-white"
        }`}
      >
        {children}
      </main>
    </>
  );
}
