// app/page.tsx
import Link from "next/link";
import { Navbar } from "@/components/NavBar";
import { GameCard } from "@/components/GameCard";
import { fetchGames } from "@/lib/rawg-api";
import { Game } from "@/types/game.types";

export default async function HomePage() {
  const games = await fetchGames({ pageSize: 8, ordering: "-rating" });
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-[#223159] via-[#312965] to-[#20697a] text-white">
        <section className="mx-auto max-w-7xl px-6 pt-16 pb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Temukan Game Favorit-mu
          </h1>
          <p className="mt-3 text-white/85">
            Cari berdasarkan nama, genre, atau platform.
          </p>
          <form action="/catalog" className="mt-6">
            <div className="mx-auto flex max-w-xl items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-3">
              <input
                name="q"
                placeholder="Search Game..."
                className="w-full bg-transparent outline-none"
                autoComplete="off"
              />
              <button className="rounded-xl bg-white/15 px-4 py-2 text-sm hover:bg-white/35 cursor-pointer">
                Search
              </button>
            </div>
          </form>
          <div className="mt-5 flex items-center justify-center gap-3">
            <Link
              href="/catalog"
              className="rounded-xl bg-blue-600/60 px-5 py-2 font-semibold hover:bg-blue-500/95"
            >
              Buka Katalog
            </Link>
            <Link
              href="/favorites"
              className="rounded-xl border border-white/20 bg-black/10 px-5 py-2 hover:bg-white/30"
            >
              Lihat Favorit
            </Link>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-6 pb-16">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">🔥 Recommended Game</h2>
            <Link href="/catalog" className="text-sm text-white/85 hover:text-white">
              See All
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {games.map((g: Game) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
