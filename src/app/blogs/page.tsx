import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import clsx from "clsx";

import { Blog } from "@/utils/types";
import { ApiService } from "@/helpers/api.service";
import BlogCard from "@/components/BlogCard";
import SearchFilter from "@/components/SearchFilter";
import CategoriesSidebar from "@/components/CategoriesSidebar";
import { styles } from "@/styles/listBlog";

const LoadingModal = dynamic(() => import("@/components/LoadingModal"), { ssr: true });

interface ContentProps {
    blogsPromise: Promise<Blog[]>;
    selectedCategory: string;
    search: string;
}

export const metadata: Metadata = {
    title: "Blog List - Explore Latest Articles",
    description: "Discover the latest articles and insights from our blog. Stay informed with our curated content on various topics.",
};

export default function BlogList({ searchParams = {} }: { searchParams?: { [key: string]: string } }) {
    const search = searchParams.search || "";
    const category = searchParams.category || "";

    const apiService = new ApiService();
    const blogsPromise = apiService.fetchBlogs(10, search, category);

    return (
        <Suspense fallback={<LoadingModal promise={blogsPromise} />}>
            <Content blogsPromise={blogsPromise} selectedCategory={category} search={search} />
        </Suspense>
    );
}

async function Content({ blogsPromise, selectedCategory, search }: ContentProps) {
    const blogs = await blogsPromise;
    const categories = Array.from(new Set(blogs.map((b) => b.category)));

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.gridLayout)}>
                <div className={clsx(styles.sidebar)}>
                    <CategoriesSidebar categories={categories} selectedCategory={selectedCategory} />
                </div>
                <div className={clsx(styles.content)}>
                    <SearchFilter search={search} />
                    <div className={clsx(styles.blogGrid)}>
                        {blogs.length ? blogs.map((blog, key) => <BlogCard key={key} {...blog} />) : <p className={clsx(styles.noArticles)}>No articles found.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
