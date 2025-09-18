import Link from "next/link";
import Image from "next/image";
import { Game } from "@/types/game.types";

function formatDate(dateString?: string) {
  if(!dateString) return "To Be Announced";
  return dateString.split("T")[0]
}

export function GameCard({game}: {game : Game}) {
  return (
  <div className="bg-gradient-to-b from-sky-500/70 via-sky-600/70 to-blue-700/80 p-4 rounded-xl">
    <div>
      <Image src={game.background_image} alt="game.id" width={500} height={500} loading="lazy"></Image>
    </div>
    <div className="space-y-1 pb-4.5">
      <h3 className="text-center font-semibold">{game.name}</h3>
      <p className="text-center">Released: {game.released?? "To Be Announced"}</p>
      <p className="text-center">Ratings: {game.ratings[0]?.percent}</p>
      <p className="text-center">Last Updated: {formatDate(game.updated)}</p>
    </div>
    <div className="text-center">
      <Link href={`/game/${game.id}`} className="bg-sky-500/60 p-2.5 rounded-xl hover:bg-sky-400/90" >Detail</Link>
    </div>
  </div>
  )
}