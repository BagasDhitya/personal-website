"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { blogs } from "@/data/blog";

export default function BlogDetail() {
    const params = useParams();
    const { slugs } = params;

    const blog = blogs.find((post) => post.slugs === slugs);

    if (!blog) return <div className="text-center py-20 text-2xl">Blog not found.</div>;

    return (
        <div className="max-w-4xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold">{blog.title}</h1>
            <Image src={blog.image} alt={blog.title} width={800} height={500} className="rounded-lg my-6" />
            <p className="text-lg text-gray-700">{blog.description}</p>
        </div>
    );
}
