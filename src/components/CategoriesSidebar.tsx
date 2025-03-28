"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CategoriesProps } from "@/utils/types";

export default function CategoriesSidebar({ categories, selectedCategory }: CategoriesProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const setCategory = (category: string) => {
        const params = new URLSearchParams(searchParams);
        if (category) {
            params.set("category", category);
        } else {
            params.delete("category");
        }
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-semibold mb-3">Categories</h3>
            <ul>
                <li>
                    <button
                        onClick={() => setCategory("")}
                        className={`block w-full text-left p-2 rounded ${!selectedCategory ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                    >
                        All Categories
                    </button>
                </li>
                {categories.map((category) => (
                    <li key={category}>
                        <button
                            onClick={() => setCategory(category)}
                            className={`block w-full text-left p-2 rounded ${selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-200"
                                }`}
                        >
                            {category}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
