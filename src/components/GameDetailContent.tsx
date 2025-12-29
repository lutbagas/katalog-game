"use client";
import { Game } from "@/types/game.types";
import  Image  from "next/image";
import { Developer } from "@/types/game.types";
import { Publisher } from "@/types/game.types";
import { Genre } from "@/types/game.types"

export function GameDetailContent({ game }: { game: Game }) {
  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-bl from-blue-900 to-cyan-700 via-sky-800 rounded-2xl shadow-lg p-8 mt-8 flex flex-col items-center">
      <Image
        src={game.background_image}
        alt=""
        width={500}
        height={500}
        quality={80}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB..."
        className="w-full h-56 object-cover rounded-xl mb-6 shadow"
      />
      <h1 className="text-3xl font-bold text-indigo-400 mb-2 text-center">
        {game.name}
      </h1>

      {/* ✅ perbaikan bagian description */}
      <p className="text-white mb-4 text-center text-xs">
        {game.description_raw
          ? game.description_raw.split(" ").slice(0, 50).join(" ") + "..."
            : "No description available."}
      </p>

      <p className="text-sm text-white mb-2">
        <span className="font-semibold">Developer:</span>{" "}
        {game.developers?.length > 0
          ? game.developers.map((dev: Developer) => dev.name).join(", ")
          : "-"}
      </p>
      <p className="text-sm text-white mb-2">
        <span className="font-semibold">Publisher:</span>{" "}
        {game.publishers?.length > 0
          ? game.publishers.map((pub: Publisher) => pub.name).join(", ")
          : "-"}
      </p>
      <p className="text-sm text-white mb-2">
        <span className="font-semibold">Genres:</span>{" "}
        {game.genres?.length > 0
          ? game.genres.map((genre: Genre) => genre.name).join(", ")
          : "-"}
      </p>
      <p className="text-sm text-white mb-4">
        <span className="font-semibold">Release Date:</span>{" "}
        {game.released || "-"}
      </p>

      {game.website ? (
        <a
          href={game.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 px-3 py-2 bg-[#3D63DD] text-white rounded-lg font-semibold shadow hover:bg-[#7f7fd5] transition"
        >
          Visit Official Website
        </a>
      ): (
        <p className="text-center bg-blue-400 p-1.5 rounded-xl font-bold">Tidak ada Website</p>
      )}
    </div>
  );
}

