import { notFound } from "next/navigation";
import { Navbar } from "@/components/NavBar";
import { GameDetailContent } from "@/components/GameDetailContent";

const API_KEY = "c5de1b8d28e14cc4955584ae024cb873";

export default async function GameDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const res = await fetch(
    `https://api.rawg.io/api/games/${id}?key=${API_KEY}`,
    { cache: "no-store" }
  );
  if (!res.ok) return notFound();

  const game = await res.json();
  if (!game || !game.name) return notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen  p-6">
        <GameDetailContent game={game} />
      </main>
    </>
  );
}
