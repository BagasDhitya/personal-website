"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 font-sans text-gray-900 space-y-20">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="flex flex-col items-center text-center py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg"
      >
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
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" variants={sectionVariants} viewport={{ once: true }} className="py-20 text-center">
        <h2 className="text-4xl font-bold">About Me</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg leading-relaxed">
          I am a passionate web developer with experience in building scalable applications.
          I specialize in JavaScript, React, and backend development.
        </p>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" variants={sectionVariants} viewport={{ once: true }} className="py-20 bg-gray-100 text-center rounded-lg shadow-md">
        <h2 className="text-4xl font-bold">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 max-w-5xl mx-auto">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Front-End</h3>
            <p className="mt-2 text-gray-600">HTML, CSS, JavaScript, React, Angular</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Back-End</h3>
            <p className="mt-2 text-gray-600">Node.js, Express, Django, Ruby on Rails</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">DevOps & Tools</h3>
            <p className="mt-2 text-gray-600">Docker, Git, AWS, CI/CD</p>
          </div>
        </div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" variants={sectionVariants} viewport={{ once: true }} className="py-20 text-center">
        <h2 className="text-4xl font-bold">Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 max-w-5xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((project) => (
            <div key={project} className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Project {project}</h3>
              <p className="mt-2 text-gray-600">Description of project {project}.</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" variants={sectionVariants} viewport={{ once: true }} className="py-20 bg-gray-100 text-center rounded-lg shadow-md">
        <h2 className="text-4xl font-bold">Alumni Success Stories</h2>
        <Swiper
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="mt-6 max-w-3xl mx-auto"
        >
          {["Alumni 1", "Alumni 2", "Alumni 3"].map((alumni, index) => (
            <SwiperSlide key={index} className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{alumni}</h3>
              <p className="mt-2 text-gray-600">This is the success story of {alumni}.</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" variants={sectionVariants} viewport={{ once: true }} className="py-20 text-center bg-gray-200 rounded-lg shadow-md">
        <h2 className="text-4xl font-bold">Contact Me</h2>
        <p className="mt-4 text-lg">Feel free to reach out:</p>
        <div className="mt-6 space-y-2">
          <p className="text-lg">📧 Email: bagasdhityataufiqqi98@gmail.com</p>
          <p className="text-lg">🔗 LinkedIn: <a href="https://www.linkedin.com/in/bagasdhityataufiqqi/" className="text-blue-600 hover:underline">Bagas Dhitya Taufiqqi</a></p>
        </div>
      </motion.section>
    </div>
  );
}
