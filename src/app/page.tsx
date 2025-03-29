import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";

import { Alumni, Blog } from "@/utils/types";
import { ApiService } from "@/helpers/api.service";
import AnimatedSection from "@/components/AnimatedSection";
import AlumniSwiper from "@/components/AlumniSwiper";
import BlogCard from "@/components/BlogCard";
import { styles } from "@/styles/home";

const LoadingModal = dynamic(() => import("@/components/LoadingModal"), { ssr: true });

export default function Home() {
  const apiService = new ApiService();
  const data = Promise.all([apiService.fetchBlogs(3), apiService.fetchAlumniStories()]);

  return (
    <Suspense fallback={<LoadingModal promise={data} />}>
      <Content />
    </Suspense>
  );
}

async function Content() {
  const apiService = new ApiService();
  const [blogs, alumniStories]: [Blog[], Alumni[]] = await Promise.all([
    apiService.fetchBlogs(3),
    apiService.fetchAlumniStories(),
  ]);

  return (
    <div className={clsx(styles.container)}>
      <AnimatedSection className={clsx(styles.hero)}>
        <h1 className={clsx(styles.title)}>Bagas Dhitya Taufiqqi</h1>
        <h2 className={clsx(styles.subtitle)}>Full-Stack Web Developer</h2>
        <Image src="/avatar.jpg" alt="Profile" width={160} height={160} className={clsx(styles.avatar)} />
        <p className="mt-4 max-w-lg text-lg">Building scalable and high-performance web solutions.</p>
        <button className={clsx(styles.button)}>View Portfolio</button>
      </AnimatedSection>

      <AnimatedSection className={clsx(styles.section)}>
        <h2 className="text-4xl font-bold">About Me</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg leading-relaxed">
          I specialize in JavaScript, React, and backend development.
        </p>
      </AnimatedSection>

      <AnimatedSection className={clsx(styles.section, "bg-gray-100 rounded-lg shadow-md")}> 
        <h2 className="text-4xl font-bold">Skills</h2>
        <div className={clsx(styles.cardContainer)}>
          {["Front-End", "Back-End", "DevOps & Tools"].map((title, i) => (
            <div key={i} className={clsx(styles.card)}>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-gray-600">
                {["HTML, CSS, JS, React, Angular", "Node.js, Express, Django", "Docker, Git, AWS, CI/CD"][i]}
              </p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className={clsx(styles.section)}>
        <h2 className="text-4xl font-bold">Latest Blog Posts</h2>
        <p className="text-lg mt-2 text-gray-600">Stay updated with the latest insights.</p>
        <div className={clsx(styles.cardContainer)}>
          {blogs.length ? blogs.map((blog, i) => <BlogCard key={i} {...blog} />) : <p className="text-center mt-6">No articles found.</p>}
        </div>
        <div className="mt-20">
          <Link className={clsx("cursor-pointer px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700")} href="/blogs">
            View All Blogs
          </Link>
        </div>
      </AnimatedSection>

      <AnimatedSection className={clsx(styles.section, "bg-gray-100 rounded-lg shadow-md")}> 
        <h2 className="text-4xl font-bold">Alumni Success Stories</h2>
        <AlumniSwiper alumniStories={alumniStories} />
      </AnimatedSection>

      <AnimatedSection className={clsx(styles.contact)}>
        <h2 className="text-4xl font-bold">Contact Me</h2>
        <p className="mt-4 text-lg">Feel free to reach out:</p>
        <div className="mt-6 space-y-2">
          <p className="text-lg">📧 Email: bagasdhityataufiqqi98@gmail.com</p>
          <p className="text-lg">🔗 LinkedIn: <a href="https://www.linkedin.com/in/bagasdhityataufiqqi/" className="text-blue-600 hover:underline">Bagas Dhitya Taufiqqi</a></p>
        </div>
      </AnimatedSection>
    </div>
  );
}
