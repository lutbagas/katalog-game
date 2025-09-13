"use client";

import { useEffect, useState } from "react";
import { LoginForm } from "@/components/LoginForm"; // sesuaikan path

export default function LoginPage() {
  const [bg, setBg] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGame() {
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&page_size=10`
        );
        const data = await res.json();
        const games = data.results;
        const randomGame = games[Math.floor(Math.random() * games.length)];
        setBg(randomGame.background_image);
      } catch (err) {
        console.error("Gagal ambil gambar game:", err);
      }
    }
    fetchGame();
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900 relative"
      style={{
        backgroundImage: bg ? `url(${bg})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlay biar form lebih jelas */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
