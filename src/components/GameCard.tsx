import Link from "next/link";
import Image from "next/image";
import { Game } from "@/types/game.types";

export function GameCard(
  {game} : {game: Game}
) {
  return(
  <div className="bg-gradient-to-br from-sky-400 via-blue-500 to-sky-600 p-4 space-y-3">
    <div>
      <Image src={game.background_image} alt="" width={500} height={500}></Image>
    </div>
    <div className="text-center space-y-1.5">
      <h3>{game.name}</h3>
      <p>{game.released ?? "Masih belum tersedia"}</p>
      <p>{game.genres[0]?.name}</p>
      <p></p>
    <Link href={`/game/${game.id}`} className="bg-cyan-600 p-2 rounded-xl w-full cursor-pointer">Detail</Link>
    </div>
  </div>  
  )
}