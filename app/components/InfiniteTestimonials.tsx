"use client";

import { JSX, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

import Autoplay from "embla-carousel-autoplay";

// Carousel component with Embla implementation
const TestimonialCarousel = (): JSX.Element => {
  // Embla carousel options
  const options = {
    loop: true,
    align: "start" as const,
    slidesToScroll: 1,
    dragFree: true,
  };

  // Initialize Embla Carousel with autoplay plugin
  const [emblaRef, emblaApi] = useEmblaCarousel(options as typeof options, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);

  // Ensure proper initialization and cleanup
  useEffect(() => {
    if (emblaApi) {
      return () => emblaApi.destroy();
    }
  }, [emblaApi]);

  return (
    <div className="w-full max-w-full">
      <div className="overflow-hidden w-full" ref={emblaRef}>
        <div className="flex">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex-none pl-4 relative w-[140%] sm:w-[90%] md:w-[70%] lg:w-[43%]"
            >
              <div className="h-auto w-full p-2">
                <Image
                  width={1400}
                  height={1400}
                  src={`/images/sound-better/${i + 1}.png`}
                  alt={`Sound Better testimonial image ${i + 1}`}
                  className="w-full h-auto rounded-lg shadow-lg"
                  priority={i < 3}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main component
export default function InfiniteTestimonials(): JSX.Element {
  return (
    <section className="flex flex-col items-center justify-start py-32 pb-52 overflow-hidden bg-black">
      <div className="w-full px-4 md:px-8 mb-20">
        <div className="w-full max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase font-cinzel text-white">
            Sound Better Testimonials
          </h2>
        </div>
      </div>

      <TestimonialCarousel />
    </section>
  );
}
