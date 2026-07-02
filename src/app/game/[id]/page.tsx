import { notFound } from "next/navigation";
import { Navbar } from "@/components/NavBar";
import { GameDetailContent } from "@/components/GameDetailContent";

const API_KEY = process.env.RAWG_KEY || process.env.NEXT_PUBLIC_RAWG_KEY || "c5de1b8d28e14cc4955584ae024cb873";

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [res, screenshotsRes] = await Promise.all([
    fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`, {
      cache: "no-store",
    }),
    fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`, {
      cache: "no-store",
    }),
  ]);

  if (!res.ok) return notFound();

  const game = await res.json();
  if (!game || !game.name) return notFound();

  const screenshotsData = screenshotsRes.ok ? await screenshotsRes.json() : null;
  const screenshots = screenshotsData?.results || [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen  p-6">
        <GameDetailContent game={game} screenshots={screenshots} />
      </main>
    </>
  );
}
