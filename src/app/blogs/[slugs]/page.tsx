import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ApiService } from "@/helpers/api.service";
import clsx from "clsx";

const LoadingModal = dynamic(() => import("@/components/LoadingModal"), { ssr: true });

interface ContentProps {
    params: { slugs: string };
}

export async function generateMetadata({ params }: ContentProps): Promise<Metadata> {
    const apiService = new ApiService();
    const blog = await apiService.fetchBlogBySlug(params.slugs);

    if (!blog) {
        return {
            title: "Blog Not Found",
            description: "The requested blog does not exist.",
        };
    }

    return {
        title: blog.title,
        description: blog.description,
    };
}

export default function BlogDetail({ params }: ContentProps) {
    const apiService = new ApiService();
    const { slugs } = params;

    const blogPromise = apiService.fetchBlogBySlug(slugs);

    return (
        <Suspense fallback={<LoadingModal promise={blogPromise} />}>
            <Content blogPromise={blogPromise} />
        </Suspense>
    );
}

async function Content({ blogPromise }: { blogPromise: Promise<{ title: string; image: string; description: string } | null> }) {
    const blog = await blogPromise;

    if (!blog) return notFound();

    return (
        <div className={clsx("max-w-4xl mx-auto px-6 py-20")}>
            <h1 className={clsx("text-4xl font-bold")}>{blog.title}</h1>
            <Image
                src={blog.image}
                alt={blog.title}
                width={800}
                height={500}
                className={clsx("rounded-lg my-6")}
            />
            <p className={clsx("text-lg text-gray-700")}>{blog.description}</p>
        </div>
    );
}
