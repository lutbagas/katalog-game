import Link from "next/link";
import Image from "next/image";
import { Game } from "@/types/game.types";

export function GameCard({game}: {game : Game}) {
  return (
  <div className="bg-gradient-to-b from-sky-600 via-sky-700 to-blue-800 p-4 rounded-xl">
    <div>
      <Image src={game.background_image} alt="game.id" width={500} height={500} loading="lazy"></Image>
    </div>
    <div>
    <h3 className="text-center">{game.name}</h3>
    <p className="text-center">{game.released?? "To Be Announced"}</p>
    <p className="text-center">{game.ratings[0]?.percent}</p>
    <p className="text-center">Last Updated: {game.updated}</p>
    </div>
    <div className="text-center">
      <Link href={`/game/${game.id}`}>Detail</Link>
    </div>
  </div>
  )
}