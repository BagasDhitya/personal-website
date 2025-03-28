"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchFilter({ search }: { search: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(search);
    const [searchTerm, setSearchTerm] = useState(search);

    const handleSearch = () => {
        if (query === searchTerm) return;

        const params = new URLSearchParams(searchParams);

        if (query.trim()) {
            params.set("search", query);
        } else {
            params.delete("search");
        }

        setSearchTerm(query);
        router.push(`?${params.toString()}`);
    };

    useEffect(() => {
        if (!query.trim()) {
            const params = new URLSearchParams(searchParams);
            params.delete("search");
            router.replace(`?${params.toString()}`);
        }
    }, [query, router, searchParams]);

    return (
        <div className="flex items-center gap-2">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="border p-2 w-full"
            />
            <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                Search
            </button>
        </div>
    );
}
