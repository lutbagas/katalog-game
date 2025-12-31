import { fetchGames } from "@/lib/rawg-api";

type FavoriteOptions = {
  pageSize?: number;
};

export async function fetchFavoriteGames({ pageSize = 8 }: FavoriteOptions = {}) {
  return fetchGames({ pageSize, ordering: "-rating" });
}