"use server";

import axios from "axios";
import BlogCard from "@/components/BlogCard";
import SearchFilter from "@/components/SearchFilter";
import CategoriesSidebar from "@/components/CategoriesSidebar";
import { Blog } from "@/utils/types";
import { Suspense } from "react";

async function fetchBlogs(search?: string, category?: string): Promise<Blog[]> {
    try {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (category) params.append("category", category);

        const response = await axios.get<Blog[]>(`/api/blogs?${params.toString()}`);
        return response.data;
    } catch {
        return [];
    }
}

export default async function BlogList({ searchParams = {} }: { searchParams?: { [key: string]: string } }) {
    const search = searchParams.search || "";
    const category = searchParams.category || "";
    const blogs = await fetchBlogs(search, category);
    const categories = Array.from(new Set(blogs.map((b) => b.category)));

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <CategoriesSidebar categories={categories} selectedCategory={category} />
                <div className="md:col-span-3">
                    <SearchFilter search={search} />
                    <Suspense fallback={<p>Loading blogs...</p>}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                            {blogs.length ? blogs.map((blog, key) => <BlogCard key={key} {...blog} />) : <p className="text-center mt-6">No articles found.</p>}
                        </div>
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

