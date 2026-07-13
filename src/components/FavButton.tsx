import { useState } from "react";
import { Game } from "@/types/game.types";

export function FavButton({ game }: { game: Game }) {
    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavorite = async () => {
        try {
            const res = await fetch('/api/favorites', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(game)
            });
            const text = await res.text();
            console.log('status:', res.status);
            console.log('text:', text);

            if (!res.ok) {
                console.log('error status:', res.status);
                console.log('error text:', text);
                alert(`gagal favorite. status: ${res.status}`);
                return;
            }
        
            setIsFavorite(true);
        } catch (error) {
            console.error(error)
        }

    }

    return(
        <div className="px-3 py-3 my-4 bg-blue-800 hover:bg-blue-600 duration-150 transition-colors">
            <button
                onClick={handleFavorite}
                disabled={isFavorite}
                className="text-white">{isFavorite ? 'Favorited': 'add to favorite'}</button>
        </div>
    )

}