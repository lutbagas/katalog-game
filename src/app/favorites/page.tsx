import Link from "next/link";
import { Navbar } from "@/components/NavBar";
import { GameCard } from "@/components/GameCard";
import { fetchFavoriteGames } from "@/lib/favorites";
import { Game } from "@/types/game.types";

export default async function FavoritesPage() {
  const favorites = await fetchFavoriteGames({ pageSize: 12 });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-[#223159] via-[#312965] to-[#20697a] text-white">
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Favorites</h1>
              <p className="mt-2 text-white/80">
                Koleksi game favorit yang direkomendasikan.
              </p>
            </div>
            <Link
              href="/catalog"
              className="rounded-xl border border-white/20 bg-black/10 px-5 py-2 hover:bg-white/30"
            >
              Jelajahi Katalog
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {favorites.map((game: Game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}