"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface AlumniStory {
    name: string;
    story: string;
}

interface AlumniSwiperProps {
    alumniStories: AlumniStory[];
}

export default function AlumniSwiper({ alumniStories }: AlumniSwiperProps) {
    return (
        <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            className="w-full max-w-3xl mx-auto"
        >
            {alumniStories.map((alumni, index) => (
                <SwiperSlide key={index} className="flex justify-center">
                    <div className="p-6 bg-white rounded-lg shadow-md text-center w-full">
                        <h3 className="text-xl font-semibold">{alumni.name}</h3>
                        <p className="mt-2 text-gray-600">{alumni.story}</p>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
