'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

type CommunityUser = {
    id: string;
    email: string;
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
            <p className="text-4xl mb-8">Explore Community</p>
            <div className="grid grid-cols-3 gap-5 rounded-4xl">
            {users.map((user) => {
                const joinedDate = new Date(user.createdAt);
                return (
                <div key={user.id} className="bg-sky-700/60 px-10 py-10 rounded-4xl">
                    <div className=" text-md text-center">
                        <h1 className="">
                            {new Date(user.createdAt).toLocaleDateString("id-ID")}
                        </h1>
                        <h2 className="">{user.email}</h2>
                    </div>
                    <div className="text-center">
                    <Link href={`/community/${user.id}`}>
                        <button className="p-3 bg-blue-700 cursor-pointer mt-10">Cek This Profile</button>
                    </Link>
                    </div>
                </div>
                )
                })}
            </div>
        </main>
    )
}