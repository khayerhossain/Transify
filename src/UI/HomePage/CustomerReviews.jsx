"use client";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import Container from "@/Components/Shared/Container/Container";

export default function CustomerReviews() {
  const swiperRef = useRef(null);

  const reviews = [
    {
      id: 1,
      name: "John Doe",
      date: "Aug 15, 2025",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      desc: "The delivery was super fast and safe. I got my parcel right on time!",
    },
    {
      id: 2,
      name: "Sarah Khan",
      date: "Aug 20, 2025",
      img: "https://randomuser.me/api/portraits/women/45.jpg",
      desc: "Amazing experience! The real-time tracking kept me updated throughout.",
    },
    {
      id: 3,
      name: "Michael Smith",
      date: "Aug 25, 2025",
      img: "https://randomuser.me/api/portraits/men/76.jpg",
      desc: "Best courier service I've used. Safe, reliable, and quick.",
    },
    {
      id: 4,
      name: "Emma Watson",
      date: "Aug 27, 2025",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
      desc: "Support team was very helpful. I’ll definitely use them again!",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Our Customers <span className="text-red-500">Say</span>
          </h2>
          <p className="text-gray-600 mt-4 mb-12">
            Hear from our happy customers who trusted us with their deliveries.
          </p>

          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Navigation]}
            centeredSlides
            slidesPerView={3}
            spaceBetween={30}
            loop
            className="py-6"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                {({ isActive }) => (
                  <div
                    className={`p-6 rounded-3xl shadow-xl transition-all duration-500 transform ${
                      isActive
                        ? "scale-105 opacity-100 bg-white border-2 border-gray-200 z-10"
                        : "scale-90 opacity-50 bg-gray-100 border border-gray-200 blur-sm"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <img
                        src={review.img}
                        alt={review.name}
                        className="w-20 h-20 rounded-full mb-4 border-2 border-red-500 shadow-sm"
                      />
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {review.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        {review.date}
                      </p>
                      <p className="text-gray-700 text-center">{review.desc}</p>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-6 mt-8">
            <button
              onClick={() => swiperRef.current.slidePrev()}
              className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-semibold shadow hover:bg-red-500 hover:text-white transition cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" /> Prev
            </button>
            <button
              onClick={() => swiperRef.current.slideNext()}
              className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-semibold shadow hover:bg-red-500 hover:text-white transition cursor-pointer"
            >
              Next <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
