import { fetchGames } from "@/lib/rawg-api";

type favoriteOptions = {
    pageSize?: number;
}

export async function fetchFavoriteGames({ pageSize = 8 }: favoriteOptions = {}) {
    return fetchGames({ pageSize, ordering: '-rating'})
}