"use client";

import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import { MdCheckCircle, MdFavorite, MdPlaylistAdd } from "react-icons/md";
import type { Game } from "@/types/game.types";

type LibraryStatus = "played" | "wishlist" | "favorite";

type StoredGame = {
  id: number;
  name: string;
  released?: string;
  background_image?: string;
  rating?: number;
  genres: { name: string; slug?: string }[];
  statuses: Record<LibraryStatus, boolean>;
  updatedAt: string;
};

const STORAGE_KEY = "katalog-game-library";
const emptyStatuses: Record<LibraryStatus, boolean> = {
  played: false,
  wishlist: false,
  favorite: false,
};

const actions: {
  key: LibraryStatus;
  label: string;
  activeLabel: string;
  icon: IconType;
}[] = [
  {
    key: "played",
    label: "Played",
    activeLabel: "Played",
    icon: MdCheckCircle,
  },
  {
    key: "wishlist",
    label: "Wishlist",
    activeLabel: "Wishlisted",
    icon: MdPlaylistAdd,
  },
  {
    key: "favorite",
    label: "Favorite",
    activeLabel: "Favorited",
    icon: MdFavorite,
  },
];

function readLibrary() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [] as StoredGame[];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredGame[]) : [];
  } catch {
    return [];
  }
}

function writeLibrary(items: StoredGame[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("game-library-updated"));
}

function buildGameSnapshot(game: Game): StoredGame {
  return {
    id: game.id,
    name: game.name || "Untitled game",
    released: game.released,
    background_image: game.background_image,
    rating: game.rating,
    genres: game.genres || [],
    statuses: { ...emptyStatuses },
    updatedAt: new Date().toISOString(),
  };
}

function hasAnyStatus(statuses: Record<LibraryStatus, boolean>) {
  return Object.values(statuses).some(Boolean);
}

export function GameLibraryActions({ game }: { game: Game }) {
  const [statuses, setStatuses] =
    useState<Record<LibraryStatus, boolean>>(emptyStatuses);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const item = readLibrary().find((storedGame) => storedGame.id === game.id);
    setStatuses({ ...emptyStatuses, ...(item?.statuses || {}) });
  }, [game.id]);

  const toggleStatus = (status: LibraryStatus) => {
    const library = readLibrary();
    const existingIndex = library.findIndex(
      (storedGame) => storedGame.id === game.id
    );
    const existing =
      existingIndex >= 0 ? library[existingIndex] : buildGameSnapshot(game);
    const nextStatuses = {
      ...emptyStatuses,
      ...existing.statuses,
      [status]: !existing.statuses?.[status],
    };

    const nextItem: StoredGame = {
      ...existing,
      ...buildGameSnapshot(game),
      statuses: nextStatuses,
      updatedAt: new Date().toISOString(),
    };

    const nextLibrary = [...library];
    if (hasAnyStatus(nextStatuses)) {
      if (existingIndex >= 0) nextLibrary[existingIndex] = nextItem;
      else nextLibrary.unshift(nextItem);
    } else if (existingIndex >= 0) {
      nextLibrary.splice(existingIndex, 1);
    }

    writeLibrary(nextLibrary);
    setStatuses(nextStatuses);
    setMessage(
      nextStatuses[status]
        ? `Masuk ke ${actions.find((item) => item.key === status)?.label}.`
        : `Dihapus dari ${actions.find((item) => item.key === status)?.label}.`
    );
  };

  return (
    <section className="mb-6 w-full rounded-xl border border-white/15 bg-black/15 p-4">
      <div className="mb-3 flex flex-col gap-1 text-center sm:text-left">
        <h2 className="text-lg font-semibold text-white">Simpan ke Library</h2>
        <p className="text-sm text-white/70">
          Tandai game ini sebagai played, wishlist, atau favorite.
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;
          const active = statuses[action.key];

          return (
            <button
              key={action.key}
              type="button"
              aria-pressed={active}
              onClick={() => toggleStatus(action.key)}
              className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                active
                  ? "border-cyan-200 bg-cyan-300 text-slate-950"
                  : "border-white/15 bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <Icon className="text-lg" aria-hidden="true" />
              {active ? action.activeLabel : action.label}
            </button>
          );
        })}
      </div>

      {message && <p className="mt-3 text-sm text-cyan-100">{message}</p>}
    </section>
  );
}
