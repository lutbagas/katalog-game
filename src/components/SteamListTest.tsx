"use client";
import { useEffect, useState } from "react";

export default function SteamListTest() {
  const [games, setGames] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/steam-app-list")
      .then((res) => res.json())
      .then((data) => {
        setGames(data.applist.apps.slice(0, 10));
      })
      .catch((e) => setError(String(e)));
  }, []);

  return (
    <div>
      <h2 className="font-bold">Daftar Game (Proxy API)</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      <ul>
        {games.map((game) => (
          <li key={game.appid}>{game.name} (AppID: {game.appid})</li>
        ))}
      </ul>
    </div>
  );
}
