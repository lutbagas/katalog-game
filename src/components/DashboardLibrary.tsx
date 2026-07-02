"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { IconType } from "react-icons";
import { MdCheckCircle, MdFavorite, MdPlaylistAdd } from "react-icons/md";

type LibraryStatus = "played" | "wishlist" | "favorite";

type StoredGame = {
  id: number;
  name: string;
  released?: string;
  background_image?: string;
  rating?: number;
  genres?: { name: string; slug?: string }[];
  statuses?: Record<LibraryStatus, boolean>;
  updatedAt?: string;
};

const STORAGE_KEY = "katalog-game-library";

const sections: {
  key: LibraryStatus;
  title: string;
  empty: string;
  icon: IconType;
}[] = [
  {
    key: "played",
    title: "Played",
    empty: "Belum ada game yang ditandai played.",
    icon: MdCheckCircle,
  },
  {
    key: "wishlist",
    title: "Wishlist",
    empty: "Belum ada game di wishlist.",
    icon: MdPlaylistAdd,
  },
  {
    key: "favorite",
    title: "Favorite",
    empty: "Belum ada game favorite.",
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

export function DashboardLibrary() {
  const [items, setItems] = useState<StoredGame[]>([]);

  useEffect(() => {
    const refreshLibrary = () => setItems(readLibrary());

    refreshLibrary();
    window.addEventListener("storage", refreshLibrary);
    window.addEventListener("game-library-updated", refreshLibrary);

    return () => {
      window.removeEventListener("storage", refreshLibrary);
      window.removeEventListener("game-library-updated", refreshLibrary);
    };
  }, []);

  const groupedItems = useMemo(
    () =>
      sections.map((section) => ({
        ...section,
        games: items.filter((item) => item.statuses?.[section.key]),
      })),
    [items]
  );

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-200">
            My Library
          </p>
          <h2 className="mt-2 text-2xl font-bold">Game kamu</h2>
        </div>
        <p className="text-sm text-white/65">
          Data ini tersimpan di browser yang sedang kamu pakai.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {groupedItems.map((section) => {
          const Icon = section.icon;

          return (
            <div
              key={section.key}
              className="rounded-xl border border-white/10 bg-slate-950/45 p-4"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Icon className="text-xl text-cyan-200" aria-hidden="true" />
                  <h3 className="font-semibold">{section.title}</h3>
                </div>
                <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">
                  {section.games.length}
                </span>
              </div>

              {section.games.length === 0 ? (
                <p className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/55">
                  {section.empty}
                </p>
              ) : (
                <div className="space-y-3">
                  {section.games.map((game) => (
                    <Link
                      key={`${section.key}-${game.id}`}
                      href={`/game/${game.id}`}
                      className="group flex gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition hover:border-cyan-200/40 hover:bg-white/10"
                    >
                      <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-900">
                        <img
                          src={game.background_image || "/placeholder.jpg"}
                          alt={game.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="truncate text-sm font-semibold">
                          {game.name}
                        </h4>
                        <p className="mt-1 truncate text-xs text-white/55">
                          {game.genres?.map((genre) => genre.name).slice(0, 2).join(", ") || "-"}
                        </p>
                        <p className="mt-1 text-xs text-white/45">
                          {game.released || "Release TBA"}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
