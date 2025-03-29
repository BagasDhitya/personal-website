import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ApiService } from "@/helpers/api.service";

export async function generateMetadata({ params }: { params: { slugs: string } }): Promise<Metadata> {
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

export default async function BlogDetail({ params }: { params: { slugs: string } }) {
    const apiService = new ApiService();
    const { slugs } = params;

    const blog = await apiService.fetchBlogBySlug(slugs);

    if (!blog) return notFound();

    return (
        <div className="max-w-4xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold">{blog.title}</h1>
            <Image src={blog.image} alt={blog.title} width={800} height={500} className="rounded-lg my-6" />
            <p className="text-lg text-gray-700">{blog.description}</p>
        </div>
    );
}
