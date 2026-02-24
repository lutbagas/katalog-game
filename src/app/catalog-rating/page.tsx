import Link from "next/link";
import { fetchGames } from "@/lib/rawg-api";
import { GameCard } from "@/components/GameCard";
import { HomeButton } from "@/components/HomeButton";
import { FetchOpts } from "@/types/game.types";
import { CatalogSearchParams } from '@/types/game.types'



export default async function CatalogPage({
  searchParams,
}: {
  searchParams: CatalogSearchParams;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page || 1) || 1;
  const searchQuery = (params.query || "").trim();
  

  const games = await fetchGames({
    pageSize:12,
    page:currentPage,
    ordering: searchQuery ? undefined : "-rating",
    search: searchQuery || undefined,
  });
  const buildUrl = (targetPage: number) => {
    const queryParams = new URLSearchParams();
    if (searchQuery) queryParams.set("query", searchQuery);
    queryParams.set("Page", String(targetPage));
    return `catalog?${queryParams.toString()}`;
  };
  return(
    <main className="min-h-screen text-neutral-100">
      <HomeButton/>
      <div className="mx-auto max-w-7xl px-6 py-8 space-y-6">
        <header className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">
              {searchQuery ? `Result for ${searchQuery}`: "Catalog Game (Highest Rating)"}
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              {searchQuery ? "Searching From RAWG" : "Sort by Highest Rating"}
            </p>
          </div>
          <form action="/catalog-rating" className="hidden md:block">
          <div className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-transparent px-30 py-2 ring-1 ring-sky-300">
            <input 
            name="query"
            defaultValue={searchQuery}
            placeholder="Search..."
            className="bg-transparent outline-none text-sm" 
          />
          <button className="rounded-lg bg-neutral-800 px-3 py-1.5 text-sm hover:bg-neutral-700">
            Cari
          </button>
            </div>
          </form>
        </header>
        {games.length === 0? (
          <div className="rounded-2xl border border-neutral-8000">
            <p className="text-neutral-300">Tidak ada hasil</p>
          </div>
        ): (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {games.map((game: any) => (
            <GameCard key={game.id} game={game} />
          ))}
          </div>
        )}
      </div>
    </main>
  )
}