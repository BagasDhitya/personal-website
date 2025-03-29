import { Metadata } from "next";
import clsx from "clsx";
import BlogCard from "@/components/BlogCard";
import SearchFilter from "@/components/SearchFilter";
import CategoriesSidebar from "@/components/CategoriesSidebar";
import { Blog } from "@/utils/types";
import { Suspense } from "react";
import { ApiService } from "@/helpers/api.service";
import { styles } from "@/styles/listBlog";

export const metadata: Metadata = {
    title: "Blog List - Explore Latest Articles",
    description: "Discover the latest articles and insights from our blog. Stay informed with our curated content on various topics.",
};


export default async function BlogList({ searchParams = {} }: { searchParams?: { [key: string]: string } }) {
    const search = searchParams.search || "";
    const category = searchParams.category || "";

    const apiService = new ApiService();
    const blogs = await apiService.fetchBlogs(10, search, category);
    const categories = Array.from(new Set(blogs.map((b) => b.category)));

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.gridLayout)}>
                <div className={clsx(styles.sidebar)}>
                    <CategoriesSidebar categories={categories} selectedCategory={category} />
                </div>
                <div className={clsx(styles.content)}>
                    <SearchFilter search={search} />
                    <Suspense fallback={<p>Loading blogs...</p>}>
                        <div className={clsx(styles.blogGrid)}>
                            {blogs.length ? (
                                blogs.map((blog: Blog, key: number) => <BlogCard key={key} {...blog} />)
                            ) : (
                                <p className={clsx(styles.noArticles)}>No articles found.</p>
                            )}
                        </div>
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
