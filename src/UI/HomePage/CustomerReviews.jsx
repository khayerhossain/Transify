"use client";
import { useState } from "react";
import Container from "../../Components/Shared/Container/Container";

export default function CustomerReviews() {
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      role: "Sales Manager, Slack",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      title: "It was a great experience!",
      rating: 5,
      desc: "The delivery was super fast and safe. I got my parcel right on time! Their system was smooth, and I didn’t face any hassle. Honestly, this is one of the best courier services I’ve ever used because it combines speed, reliability, and excellent support all in one.",
    },
    {
      id: 2,
      name: "Sarah Khan",
      role: "Head of Sales, Asana",
      img: "https://randomuser.me/api/portraits/women/45.jpg",
      title: "Loved the service!",
      rating: 4,
      desc: "Amazing experience! The real-time tracking kept me updated throughout the process, and the delivery arrived earlier than expected. It gave me complete peace of mind knowing exactly where my parcel was at every step. Definitely a trustworthy service worth using again.",
    },
    {
      id: 3,
      name: "Michael Smith",
      role: "Sales Team Lead, Sketch",
      img: "https://randomuser.me/api/portraits/men/76.jpg",
      title: "Highly recommended!",
      rating: 5,
      desc: "Safe, reliable, and quick deliveries every time. I’ve tried many services before, but none of them offered this level of professionalism and care. From pick-up to drop-off, everything was handled flawlessly. I’ll definitely recommend them to my colleagues and friends.",
    },
  ];

  const [activeReview, setActiveReview] = useState(reviews[0]);

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          Testimonials
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left side - user list */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                onClick={() => setActiveReview(review)}
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition ${
                  activeReview.id === review.id
                    ? "bg-white shadow-lg border border-gray-200"
                    : "hover:bg-gray-100"
                }`}
              >
                <img
                  src={review.img}
                  alt={review.name}
                  className="w-14 h-14 rounded-full border-2 border-red-500 shadow-sm"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {review.name}
                  </h3>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - review detail */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              {activeReview.title}
            </h3>
            <div className="flex mb-6">
              {Array.from({ length: activeReview.rating }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-2xl">
                  ★
                </span>
              ))}
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              {activeReview.desc}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
