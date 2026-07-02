// app/page/[page]/page.tsx
import { GameCard } from "@/components/GameCard";
import { Navbar } from "@/components/NavBar";
import Link from "next/link";
import { fetchGames } from "@/lib/rawg-api";

export default async function GameListPage({
  params,
}: {
  params: Promise<{ page: string; }>;
}) {
  const { page } = await params;
  const pageNum = parseInt(page, 10) || 1;
  const PAGE_SIZE = 12;

  const games = await fetchGames({ page: pageNum, pageSize: PAGE_SIZE, ordering: "-rating" });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-[#223159] via-[#2c2b4d] to-[#1d4053] text-white px-6 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
            Katalog Game - Halaman {pageNum}
          </h1>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {games.map((game: any) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        <div className="flex justify-center items-center gap-6 mt-10">
          {pageNum > 1 && (
            <Link
              href={`/page/${pageNum - 1}`}
              className="px-5 py-2 rounded-lg bg-blue-400 hover:bg-blue-600 text-white font-semibold"
            >
              Previous
            </Link>
          )}
          <span className="px-4 py-2 font-bold text-blue-800 bg-white/70 rounded-lg shadow">
            Page {pageNum}
          </span>
          <Link
            href={`/page/${pageNum + 1}`}
            className="px-5 py-2 rounded-lg bg-[#6ec1e4] hover:bg-[#4baad3] text-white font-semibold"
          >
            Next
          </Link>
        </div>

        <div className="text-center mt-6">
          <Link
            className="text-blue-200 underline hover:text-white"
            href={`/`}
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </main>
    </>
  );
}
