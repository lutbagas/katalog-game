import Link from "next/link";
import Image from "next/image";
import { Game } from "@/types/game.types";

export function GameCard(
  {game} : {game: Game}
) {
  return(
  <div className="bg-sky-700 p-4 space-y-3">
    <div>
      <Image src={game.background_image} alt="" width={500} height={500}></Image>
    </div>
    <div className="text-center space-y-1.5">
      <h3>{game.name}</h3>
      <p>{game.released ?? "Masih belum tersedia"}</p>
      <p>{game.genres[0]?.name}</p>
      <p></p>
    <Link href={`/game/${game.id}`} className="bg-sky-400 p-2">Detail</Link>
    </div>
  </div>  
  )
}