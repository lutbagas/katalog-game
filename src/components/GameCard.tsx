import Link from "next/link";
import Image from "next/image";
import { Game } from "@/types/game.types";

export function GameCard({game}: {game : Game}) {
  return (
  <div className="bg-gradient-to-br from-sky-600 via-sky-700 to-sky-800 p-4 rounded-xl">
    <div>
      <Image src={game.background_image} alt="game.id" width={500} height={500} loading="lazy"></Image>
    </div>
    <div>
    <h3 className="text-center">{game.name}</h3>
    <p className="text-center">{game.released?? "Coming Soon"}</p>
    <p className="text-center">{game.ratings[0]?.percent}</p>
    <p className="text-center">{game.updated}</p>
    </div>
    <div>
      <Link href={`/game/${game.id}`}>Detail</Link>
    </div>
  </div>
  )
}