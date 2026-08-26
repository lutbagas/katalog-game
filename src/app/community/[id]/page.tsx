// export default function CommuntiyDetailPage({params} : {params: { id: string }}) {
//     console.log(params.id)
//     return <h1>{params.id}</h1>
// }
'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";


type FavoriteGame = {
    id: number,
    name: string,
    released: string,
    background_image: string,
    userId: string;
}

type PlayedGame = {
    id: number,
    name: string,
    released: string,
    background_image: string,
    userId: string
}


type CommunityUserDetail = {
    id: string;
    email: string;
    createdAt: string;
    favorite: FavoriteGame[];
    played: PlayedGame[];

}


export default function CommunityPageDetail() {
    const params = useParams<{ id: string}>();
    const [user, setUser] = useState<CommunityUserDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getUserDetail() {
            try {
                const response = await fetch(`/api/community/${params.id}`);

                if (!response.ok) {
                    throw new Error("Gagal mengambil detail user");
                }
                const data: CommunityUserDetail = await response.json();
                setUser(data);
            } catch (error) {
                setError( error instanceof Error ? error.message : " Terjadi ksealahan");
            } finally {
                setLoading(false)
            }
        }
        if (params.id) {
            getUserDetail();
        }
    }, [params.id])

        if(loading) {
            return <p>Loading profile...</p>
        }
        if (error) {
            return <p>{error}</p>
        }
        if (!user) {
            return <p>User tidak ditemukan...</p>
        }
    return (
        <main className="min-h-screen px-10 py-10">
            <div className="mx-auto max-w-7xl">
                <h1 className="">{user.email}</h1>
            <section>
                <h2 className="mb-5 text-center text-3xl font-extralight">Favorite Games</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                    {user.favorite.map((game) => (
                        <article key={game.id}
                            className="overflow-hidden border border-white/10 bg-white/5">
                                <Image src={game.background_image} width={500} height={300} alt={game.name}
                                        className="object-cover transition-all hover:h-40 h-48 w-full"/>
                                <div className="p-4 text-center text-lg font-extralight">
                                    <h2 className="">{game.name}</h2>
                                    <p className="pt-1 text-sm">{game.released}</p>
                                </div>
                        </article>
                    ))}
                </div>
            </section>
            <section>
                <h2 className="mb-5 text-center text-3xl font-extralight">Played Games</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {user.played?.map((game) => (
                        <article key={game.id}
                            className="overflow-hidden border border-white/10 bg-white/5">
                                <Image src={game.background_image} width={500} height={300} alt={game.name}
                                        className="object-cover transition-all h-44 w-full"/>
                                <div className="p-4 text-md font-extralight">
                                    <h2 className="line-clamp-1 hover:line-clamp-2 duration-300 transition-all ease-in-out">{game.name}</h2>
                                    <p className="pt-1 text-sm">{game.released}</p>
                                </div>
                                <div className="flex mt-2 mb-2 justify-center">
                                    <Link href={`/game/${game.id}`}
                                        className="bg-sky-600/50 hover:bg-sky-600 p-3 rounded-2xl">Detail</Link>
                                </div>
                        </article>
                    ))}
                </div>
            </section>
            </div>
        </main>
    )
    }
    