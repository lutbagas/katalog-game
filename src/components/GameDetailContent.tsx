"use client";

import { Developer, Game, GameScreenshot, Genre, Publisher } from "@/types/game.types";
import { CardDetailLayout } from "./CardDetailLayout";
import { GameLibraryActions } from "./GameLibraryActions";
import { ScreenshotSlider } from "./ScreenshotSlider";

export function GameDetailContent({
  game,
  screenshots,
}: {
  game: Game;
  screenshots: GameScreenshot[];
}) {
  return (
    <CardDetailLayout>
      <div className="mb-6 w-full">
        <ScreenshotSlider
          screenshots={screenshots}
          fallbackImage={game.background_image}
          gameName={game.name}
        />
      </div>

      <h1 className="mb-3 text-center text-3xl font-bold text-indigo-300">
        {game.name}
      </h1>

      <GameLibraryActions game={game} />

      <p className="mb-4 text-center text-xs text-white">
        {game.description_raw
          ? game.description_raw
              .split(" ")
              .slice(0, 50)
              .map((word, index) => (
                <span key={index}>
                  {word} {(index + 1) % 8 === 0 && <br />}
                </span>
              ))
          : "No description available."}
      </p>

      <p className="mb-2 text-sm text-white">
        <span className="font-semibold">Developer:</span>{" "}
        {game.developers?.length > 0
          ? game.developers.map((dev: Developer) => dev.name).join(", ")
          : "-"}
      </p>
      <p className="mb-2 text-sm text-white">
        <span className="font-semibold">Publisher:</span>{" "}
        {game.publishers?.length > 0
          ? game.publishers.map((pub: Publisher) => pub.name).join(", ")
          : "-"}
      </p>
      <p className="mb-2 text-sm text-white">
        <span className="font-semibold">Genres:</span>{" "}
        {game.genres?.length > 0
          ? game.genres.map((genre: Genre) => genre.name).join(", ")
          : "-"}
      </p>
      <p className="mb-4 text-sm text-white">
        <span className="font-semibold">Release Date:</span>{" "}
        {game.released || "-"}
      </p>

      {game.website ? (
        <a
          href={game.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 rounded-lg bg-[#3D63DD] px-3 py-2 font-semibold text-white shadow transition hover:bg-[#7f7fd5]"
        >
          Visit Official Website
        </a>
      ) : (
        <p className="rounded-xl bg-blue-400 p-1.5 text-center font-bold">
          Tidak ada Website
        </p>
      )}
    </CardDetailLayout>
  );
}
