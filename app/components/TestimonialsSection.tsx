"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Testimonial type definition
type Testimonial = {
  quote: string;
  author: string;
  avatarSrc: string;
};

export default function TestimonialsSection() {
  // Testimonials data
  const testimonials: Testimonial[] = [
    {
      quote:
        "My music has elevated to a crazy level. I feel like now, with this training, my songs can stand next to the artists I look up to.",
      author: "Andre Snowden",
      avatarSrc: "/images/testimonials/Andre.png",
    },
    {
      quote:
        "Jamin is a genius... I was mesmerized by his speed and sensitivity. I'm 42 years old, and you can imagine how many years I've been dreaming for this. And this guy made it a reality in just one night!",
      author: "Fernando Velazco",
      avatarSrc: "/images/testimonials/Fer.png",
    },
    {
      quote:
        "He gave me templates I can now use for the rest of my recording career! They’ve saved me hours of work and helped me stay focused on creating music.",
      author: "Numinous The Bard",
      avatarSrc: "/images/testimonials/Numinous.png",
    },
    {
      quote:
        "This program saved me time, energy, and money—now I can create pro-level demos from my living room.",
      author: "Davey Harris",
      avatarSrc: "/images/testimonials/Dave.png",
    },
  ];

  // Embla carousel setup with autoplay plugin
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      className="relative flex flex-col min-h-screen px-5 sm:px-8 md:px-12 lg:px-20 pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-28 md:pb-40 lg:pb-56 items-stretch"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/testimonial-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content Container */}
      <div className="relative z-10 w-full mx-auto">
        {/* Section Title - Text Gradient */}
        <h3 className="text-xl sm:text-2xl font-normal capitalize font-sans text-gradient">
          What You&apos;ll Learn
        </h3>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold leading-tight lg:leading-[77px] uppercase mt-4 sm:mt-5 md:mt-7 font-cinzel text-white max-w-5xl">
          Everything You Need to Record Like a Pro
        </h2>
      </div>

      {/* Embla Carousel */}
      <div className="relative z-10 mt-8 sm:mt-10 md:mt-12 w-full overflow-hidden">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="embla__slide flex-shrink-0 min-w-0 pl-4 sm:pl-5 md:pl-6 lg:pl-8 w-full sm:w-[85%] md:w-[42%] lg:w-[42.66%]"
              >
                <div className="relative group">
                  <div className="p-[1px] rounded-sm">
                    <div
                      className="rounded-sm"
                      style={{
                        backgroundImage: 'url("/images/test-frame.png")',
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      {/* Testimonial Content */}
                      <div className="flex flex-col items-center p-8 pb-20 lg:px-8 z-10 h-[500px] md:h-[550px] justify-between">
                        <div className="border-[1px] border-[#BC8431] lg:p-16 p-8 flex flex-col flex-grow justify-between bg-[#151515ef]">
                          <div className="flex justify-center items-center min-h-56">
                            <p className="text-[#C9C9C9] text-base sm:text-lg md:text-xl font-normal leading-relaxed md:leading-[29px] mt-6 text-center mb-5 md:mb-7  overflow-hidden ">
                              {testimonial.quote}
                            </p>
                          </div>

                          <h4 className="font-cinzel text-xl md:text-2xl font-bold leading-tight md:leading-[42px] uppercase mt-auto text-gradient text-center">
                            {testimonial.author}
                          </h4>
                        </div>

                        <div className="relative w-20 h-20 md:w-[95px] md:h-[83px] -mt-12 max-sm:-mt-6 mb-[-44px] z-10">
                          <Image
                            src={testimonial.avatarSrc}
                            alt={testimonial.author}
                            width={95}
                            height={83}
                            className="object-contain object-center opacity-80"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Navigation Dots */}
      <div className="relative z-10 flex items-center justify-center mt-16 flex-wrap">
        <div className="flex items-center justify-center gap-1">
          {/* Left Arrow */}
          <button
            onClick={() => scrollTo(selectedIndex - 1)}
            className="mx-4 transition ease-in-out duration-300 hover:opacity-50 cursor-pointer"
          >
            <Image
              src="/images/carousel-arrow-left.svg"
              alt="Previous"
              width={120}
              height={120}
              className="object-contain"
            />
          </button>

          {/* Dots with separators */}
          <div className="flex items-center gap-x-4">
            {scrollSnaps.map((_, index) => (
              <React.Fragment key={index}>
                <button
                  onClick={() => scrollTo(index)}
                  className={`w-[23px] h-[22px] flex items-center justify-center transition-all duration-300 ${
                    selectedIndex === index
                      ? "opacity-100 scale-110"
                      : "opacity-50 hover:opacity-75"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full ${
                      selectedIndex === index ? "bg-white" : "bg-white/50"
                    }`}
                  ></span>
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scrollTo(selectedIndex + 1)}
            className="mx-4 transition ease-in-out duration-300 hover:opacity-50 cursor-pointer"
          >
            <Image
              src="/images/carousel-arrow-left.svg"
              alt="Next"
              width={120}
              height={120}
              className="object-contain rotate-180"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
