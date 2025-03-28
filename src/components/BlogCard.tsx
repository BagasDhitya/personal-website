import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
    id: number;
    slugs: string;
    title: string;
    description: string;
    image: string;
    date: String;
}

export default function BlogCard({ id, slugs, title, description, image }: BlogCardProps) {
    return (
        <div id={String(id)} className="bg-white rounded-lg shadow-md p-6">
            <Image src={image} alt={title} width={600} height={400} className="rounded-lg h-40" objectFit="cover" />
            <h3 className="text-xl font-semibold mt-4">{title}</h3>
            <p className="text-gray-600 mt-2">{description}</p>
            <Link href={`/blogs/${slugs}`} className="text-blue-600 font-semibold mt-4 block hover:underline">
                Read More →
            </Link>
        </div>
    );
}
