import { useState } from "react";
import { Game } from "@/types/game.types";

export function PlayedButton({ game }: { game: Game }) {
    const [isPlayed, setIsPlayed] = useState(false);

    const handlePlayed = async () => {
        try {
            const res = await fetch('/api/played', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(game)
            })
            const text = await res.text();
            console.log('status:', res.status);
            console.log('text:', text);

            if (!res.ok) {
                console.log('error status:', res.status);
                console.log('error text:', text);
                alert(`gagal played, status: ${res.status}`);
                return;
            }
            setIsPlayed(true)
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <div className="bg-emerald-600/30 p-4 cursor-pointer hover:bg-emerald-600/90 transition-colors duration-200">
            <button
                onClick={handlePlayed}
                disabled={isPlayed}
                className="text-white cursor-pointer">{isPlayed ? 'Played' : 'add to played'} </button>
        </div>
    )
}