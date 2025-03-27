"use client";
import { useState } from "react";
import { blogs } from "@/data/blog";
import BlogCard from "@/components/BlogCard";
import SearchFilter from "@/components/SearchFilter";
import CategoriesSidebar from "@/components/CategoriesSidebar";

export default function BlogList() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const categories = Array.from(new Set(blogs.map((blog) => blog.category)));

    const filteredBlogs = blogs
        .filter((blog) => blog.title.toLowerCase().includes(search.toLowerCase()))
        .filter((blog) => (selectedCategory ? blog.category === selectedCategory : true))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                    <CategoriesSidebar
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </div>

                <div className="md:col-span-3">
                    <SearchFilter search={search} setSearch={setSearch} />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {filteredBlogs.map((blog) => (
                            <BlogCard key={blog.id} {...blog} />
                        ))}
                    </div>
                    {filteredBlogs.length === 0 && <p className="text-center mt-6">No articles found.</p>}
                </div>
            </div>
        </div>
    );
}
