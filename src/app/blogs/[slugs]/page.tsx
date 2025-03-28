"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Blog } from "@/utils/types";
import Image from "next/image";
import axios from "axios";

export default function BlogDetail() {
    const { slugs } = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBlogDetail() {
            try {
                const response = await axios.get(`/api/blogs?slug=${slugs}`);
                const data = response.data;
                setBlog(data.length > 0 ? data[0] : null);
            } catch (error) {
                console.error("Error fetching blog:", error);
                setBlog(null);
            } finally {
                setLoading(false);
            }
        }

        if (slugs) {
            fetchBlogDetail();
        }
    }, [slugs]);

    if (loading) return <div className="text-center py-20 text-2xl">Loading...</div>;
    if (!blog) return <div className="text-center py-20 text-2xl">Blog not found.</div>;

    return (
        <div className="max-w-4xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold">{blog.title}</h1>
            <Image src={blog.image} alt={blog.title} width={800} height={500} className="rounded-lg my-6" />
            <p className="text-lg text-gray-700">{blog.description}</p>
        </div>
    );
}
