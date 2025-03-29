"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Alumni } from "@/utils/types";

interface AlumniSwiperProps {
    alumniStories: Alumni[];
}

export default function AlumniSwiper({ alumniStories }: AlumniSwiperProps) {
    return (
        <div className="flex justify-center w-full py-10">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={30}
                slidesPerView={1}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation
                className="w-full max-w-4xl"
            >
                {alumniStories.map((alumni: Alumni) => (
                    <SwiperSlide key={alumni.id} className="flex justify-center items-center">
                        <div className="p-12 bg-white rounded-2xl shadow-xl border border-gray-200 text-center w-full max-w-2xl mx-auto">
                            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-300 shadow-md">
                                <Image
                                    src={alumni.imageUrl}
                                    alt={alumni.name}
                                    width={128}
                                    height={128}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-2xl font-bold mt-6 text-gray-900">{alumni.name}</h3>
                            <p className="text-gray-600 text-lg mt-1">{alumni.className}</p>
                            <p className="text-blue-600 font-medium text-lg">{alumni.company}</p>
                            <p className="mt-4 text-gray-700 text-lg leading-relaxed px-4">{alumni.story}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
