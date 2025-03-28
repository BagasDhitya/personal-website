import Image from "next/image";
import Link from "next/link";

import { ApiService } from "@/helpers/api.service";
import { Blog, Alumni } from "@/utils/types";

import AnimatedSection from "@/components/AnimatedSection";
import AlumniSwiper from "@/components/AlumniSwiper";
import BlogCard from "@/components/BlogCard";

export default async function Home() {
  const apiService = new ApiService()
  const [blogs, alumniStories]: [Blog[], Alumni[]] = await Promise.all([
    apiService.fetchBlogs(3),
    apiService.fetchAlumniStories(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 font-sans text-gray-900 space-y-20">
      <AnimatedSection className="flex flex-col items-center text-center py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg">
        <h1 className="text-5xl font-extrabold">Bagas Dhitya Taufiqqi</h1>
        <h2 className="text-2xl mt-2">Full-Stack Web Developer</h2>
        <Image
          src="/avatar.jpg"
          alt="Profile"
          width={160}
          height={160}
          className="mt-6 rounded-full border-4 border-white shadow-md"
        />
        <p className="mt-4 max-w-lg text-lg">
          Building scalable and high-performance web solutions for your business needs.
        </p>
        <button className="mt-6 px-8 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-gray-100">
          View Portfolio
        </button>
      </AnimatedSection>

      <AnimatedSection className="py-20 text-center">
        <h2 className="text-4xl font-bold">Latest Blog Posts</h2>
        <p className="text-lg mt-2 text-gray-600">Stay updated with the latest insights and tutorials.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
          {blogs.length ? (
            blogs.map((blog: Blog, key: number) => <BlogCard key={key} {...blog} />)
          ) : (
            <p className="text-center mt-6">No articles found.</p>
          )}
        </div>
        <div className="mt-20">
          <Link className="cursor-pointer px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700" href="/blogs">
            View All Blogs
          </Link>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20 bg-gray-100 text-center rounded-lg shadow-md">
        <h2 className="text-4xl font-bold">Alumni Success Stories</h2>
        <div className="mt-6">
          <AlumniSwiper alumniStories={alumniStories} />
        </div>
      </AnimatedSection>
    </div>
  );
}
