'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

type CommunityUser = {
    id: string;
    email: string;
    username: string;
    createdAt: string;
}

export function CommunityPageClient() {
    const [users, setUsers] = useState<CommunityUser[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await fetch("/api/community");

                if (!response.ok) {
                    throw new Error("Gagal mengambil user");
                }

                const data : CommunityUser[] = await response.json();
                setUsers(data)
            } catch(error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        getUsers();
    }, [])

    if (loading) {
        return <p> Loading Community</p>
    }
    

    return (
        <main className="bg-transparent p-20">
            <p className="text-4xl mb-10 font-extralight">Explore Community</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 rounded-4xl">
            {users.map((user) => {
                const joinedDate = new Date(user.createdAt);
                return (
                <div key={user.id} className="bg-gradient-to-b from-white/60 via-white/60 to-[#3e7bdd] px-10 py-10 rounded-xl text-black shadow-lg shadow-white/30 border-white/20 border-2">
                    <div className=" text-md text-center">
                        <h1 className="">
                            {new Date(user.createdAt).toLocaleDateString("id-ID")}
                        </h1>
                        <h2 className={`${user.username ? 'text-blue-400' : 'text-red-400'} `}>{user.username || user.email}</h2>
                    </div>
                    <div className="text-center">
                    <Link href={`/community/${user.id}`}>
                        <button className="p-3 bg-white/20 hover:bg-emerald-300/50 cursor-pointer mt-25 font-light">Detail Profile</button>
                    </Link>
                    </div>
                </div>
                )
                })}
            </div>
        </main>
    )
}