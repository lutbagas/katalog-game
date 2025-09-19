import Link from "next/link";
import Image from "next/image";
import { Game } from "@/types/game.types";

function formatDate(dateString?: string) {
  if(!dateString) return "To Be Announced";
  return dateString.split("T")[0]
}

export function GameCard({game}: {game : Game}) {
  return (
  <div className="bg-gradient-to-br from-purple-700/60 via-violet-800/50 to-blue-800/60 p-4 rounded-xl">
    <div className="mb-3">
      <Image src={game.background_image || "/placeholder.jpg"} 
      alt="" width={500} height={500} loading="lazy"className={game.background_image? "rounded-lg object-cover": "rounded-lg bg-gray-800 p-1.5"}></Image>
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