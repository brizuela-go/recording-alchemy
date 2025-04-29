"use client";

import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export default function InfiniteTestimonials() {
  return (
    <section className="flex flex-col items-center justify-start py-20 overflow-x-hidden ">
      <div className="px-4 md:px-8 flex flex-col items-center justify-start">
        <div className="w-full max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight lg:leading-[77px] uppercase mt-4 sm:mt-5 md:mt-7 font-cinzel text-white max-w-5xl mx-auto">
            Sound better testimonials
          </h2>
        </div>
      </div>
      <div className="h-[40rem] rounded-md flex flex-col antialiased  items-center justify-center relative">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="normal"
        />
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote:
      "Jamin is killer. His tracks are always radio ready. It makes my job super easy. 5 huge stars.",
    title: "Andrew DeLong",
    name: "⭐⭐⭐⭐⭐",
  },
  {
    quote:
      "It was truly an amazing experience to be part of this project! The collaboration was inspiring, and I really enjoyed contributing to the music. Everything was well-organized, and the creative process flowed seamlessly. I’d love to work together again in the future!",
    title: "Zeff",
    name: "⭐⭐⭐⭐⭐",
  },
  {
    quote: "Always an incredible experience working with Jamin!",
    title: "Marcello",
    name: "⭐⭐⭐⭐⭐",
  },
  {
    quote:
      "So glad we “met” here on Soundbetter... every job has gone well and has also been fun! Jamin is somebody I’d absolutely recommend!!",
    title: "Philip Martin Taylor",
    name: "⭐⭐⭐⭐⭐",
  },
  {
    quote:
      "Jamin always surprises me with amazing productions and ideas! I really recommend him! God bless you, my friend! I am looking forward to working with you again!",
    title: "Ivan Berger",
    name: "⭐⭐⭐⭐⭐",
  },
];
