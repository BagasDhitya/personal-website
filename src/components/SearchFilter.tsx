"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchFilter({ search }: { search: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(search);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        const params = new URLSearchParams(searchParams);
        if (e.target.value) {
            params.set("search", e.target.value);
        } else {
            params.delete("search");
        }
        router.push(`?${params.toString()}`);
    };

    return (
        <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search articles..."
            className="border p-2 w-full"
        />
    );
}
