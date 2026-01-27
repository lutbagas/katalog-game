'use client'

import Link from "next/link";
import Image from "next/image";
import { Game } from "@/types/game.types";
import { CardLayout } from "./CardLayout";

function formatDate(dateString?: string) {
  if(!dateString) return "To Be Announced";
  return dateString.split("T")[0]
}

export function GameCard({game}: {game : Game}) {
  
  return (
    
  <CardLayout>
    <div className="flex h-full flex-col">
      <div className="mb-3">
        <Image src={game.background_image || "/placeholder.jpg"} 
        alt="" width={500} height={500} loading="lazy" quality={50} className={game.background_image? "rounded-lg object-cover": "rounded-lg bg-gray-800 p-1.5"}></Image>
      </div>
      <div className="space-y-1 pb-4.5">
        <h3 className="text-center font-semibold">{game.name}</h3>
        <p className="text-center">Released: {game.released?? "To Be Announced"}</p>
        <p className="text-center">Ratings: {game.ratings[0]?.percent}</p>
        <p className="text-center">Last Updated: {formatDate(game.updated)}</p>
        <p className="text-center">Genre: {game.genres[0]?.name ?? game.genres[0]?.slug}</p>
      </div>
      <div className="text-center mt-auto mb-1">
        <Link href={`/game/${game.id}`} className="block w-full bg-emerald-500 p-2.5 rounded-lg hover:bg-sky-700/90 text-md pt-1 pb-1" >Detail</Link>
      </div>
    </div>
  </CardLayout>
  )
}