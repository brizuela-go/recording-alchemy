"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

// Video testimonial type definition
type VideoTestimonial = {
  name: string;
  title: string;
  videoThumbnail: string;
  videoUrl: string;
};

// Custom play button component with golden gradient
const PlayButton = () => (
  <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
    <div className="relative w-[66px] h-[66px]">
      {/* Outer circle with gradient */}
      <div
        className="absolute inset-0 rounded-full opacity-50"
        style={{
          background:
            "linear-gradient(256.53deg, #FBDDA3 -15.93%, #E3B887 14.87%, #FBDDA3 45.68%, #E3B887 76.49%, #A87740 107.29%)",
        }}
      ></div>

      {/* Inner circle with gradient */}
      <div
        className="absolute inset-[8%] rounded-full"
        style={{
          background:
            "linear-gradient(256.53deg, #FBDDA3 -15.93%, #E3B887 14.87%, #FBDDA3 45.68%, #E3B887 76.49%, #A87740 107.29%)",
          filter: "drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.45))",
        }}
      >
        {/* Play triangle */}
        <div className="absolute left-[36%] right-[23%] top-[25%] bottom-[23%] bg-white clip-triangle"></div>
      </div>
    </div>
  </div>
);

export default function RealStoriesVideos() {
  // Video testimonials data
  const videoTestimonials: VideoTestimonial[] = [
    {
      name: "ANDRE SNOWDEN",
      title: `R&B Singer`,
      videoThumbnail: "/images/testimonials/Andre-Snowden.png",
      videoUrl:
        "https://qs882kideu.ufs.sh/f/4Kr24oUHKyZInUadm4TOEO3u2yHzoKwB5lckbj0PsIATZqF6",
    },
    {
      name: "NUMINOUS THE BARD",
      title: "Rapper",
      videoThumbnail: "/images/testimonials/Numinous-The-Bard.png",
      videoUrl:
        "https://qs882kideu.ufs.sh/f/4Kr24oUHKyZIsOr9IObMAEN48Y3Uiy6lF1m2pRjLq7wrZfua",
    },
    {
      name: "DAVEY HARRIS",
      title: "Singer",
      videoThumbnail: "/images/testimonials/Dave-Mutner.png",
      videoUrl:
        "https://qs882kideu.ufs.sh/f/4Kr24oUHKyZIKuVZ23pgWyNFgZvhnSX7qrmDUlVTGbzEjsJ1",
    },
    {
      name: "ANDRE SNOWDEN",
      title: `R&B Singer`,
      videoThumbnail: "/images/testimonials/Andre-Snowden.png",
      videoUrl:
        "https://qs882kideu.ufs.sh/f/4Kr24oUHKyZInUadm4TOEO3u2yHzoKwB5lckbj0PsIATZqF6",
    },
    {
      name: "NUMINOUS THE BARD",
      title: "Rapper",
      videoThumbnail: "/images/testimonials/Numinous-The-Bard.png",
      videoUrl:
        "https://qs882kideu.ufs.sh/f/4Kr24oUHKyZIsOr9IObMAEN48Y3Uiy6lF1m2pRjLq7wrZfua",
    },
    {
      name: "DAVEY HARRIS",
      title: "Singer",
      videoThumbnail: "/images/testimonials/Dave-Mutner.png",
      videoUrl:
        "https://qs882kideu.ufs.sh/f/4Kr24oUHKyZIKuVZ23pgWyNFgZvhnSX7qrmDUlVTGbzEjsJ1",
    },
  ];

  // Video player modal state
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Simplified carousel configuration
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index, true);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Initialize carousel
  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);

    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Handle video play
  const handlePlayVideo = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    document.body.style.overflow = "hidden";
  };

  // Close video modal
  const closeVideoModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setSelectedVideo(null);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedVideo) {
        closeVideoModal();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [selectedVideo]);

  return (
    <section
      className="relative flex flex-col min-h-screen px-5 sm:px-8 md:px-12 lg:px-20 pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-28 md:pb-40 lg:pb-56 items-stretch"
      style={{
        backgroundColor: "#000",
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/videos-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Section Header */}
      <div className="relative z-10 w-full mx-auto text-center">
        <h3 className="text-xl sm:text-2xl font-normal capitalize font-sans text-gradient">
          Real Stories
        </h3>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold leading-tight lg:leading-[77px] uppercase mt-4 sm:mt-5 md:mt-7 font-cinzel text-white max-w-5xl mx-auto">
          Course Success Testimonials
        </h2>
      </div>

      {/* Carousel Container */}
      <div className="relative mt-14 sm:mt-16 md:mt-20 lg:mt-24 z-10 testimonial-carousel-container overflow-x-hidden">
        <div className="embla overflow-visible" ref={emblaRef}>
          <div className="embla__container flex py-10">
            {videoTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="embla__slide flex-[0_0_85%] md:flex-[0_0_33.333%] min-w-0 px-4 relative"
              >
                {/* Slide container */}
                <div
                  className="testimonial-slide flex flex-col items-center"
                  style={{
                    opacity: selectedIndex === index ? 1 : 0.7,
                    transform:
                      selectedIndex === index ? "scale(1)" : "scale(0.9)",
                    transition: "all 0.3s ease-out",
                  }}
                >
                  {/* Video thumbnail container */}
                  <div
                    className="video-thumbnail-container relative w-full aspect-video rounded-sm overflow-hidden group cursor-pointer transition-transform duration-300"
                    onClick={() => handlePlayVideo(testimonial.videoUrl)}
                    style={{
                      backgroundImage: `url(${testimonial.videoThumbnail})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      transform:
                        selectedIndex === index ? "scale(1.24)" : "scale(1)",
                    }}
                  >
                    {/* Play Button */}
                    <PlayButton />
                  </div>

                  {/* Name and Title */}
                  <div className="text-center mt-16 w-full">
                    <h4 className="font-inter text-2xl md:text-[34px] font-normal uppercase text-white">
                      {testimonial.name}
                    </h4>
                    <p className="font-poppins text-base md:text-lg text-white opacity-50 mt-2 max-w-xs mx-auto">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="relative z-10 flex items-center justify-center mt-16 flex-wrap">
        <div className="flex items-center justify-center gap-6">
          {/* Left Arrow */}
          <button
            onClick={() => {
              if (emblaApi) emblaApi.scrollPrev();
            }}
            className="mx-4 transition ease-in-out duration-300 hover:opacity-50 cursor-pointer"
            aria-label="Previous Slide"
          >
            <Image
              src="/images/carousel-arrow-left.svg"
              alt="Previous"
              width={120}
              height={120}
              className="object-contain"
            />
          </button>

          {/* Dot Indicators */}
          <div className="flex items-center gap-x-4">
            {[0, 1, 2].map((dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => scrollTo(dotIndex)}
                className={`w-5 h-5 rounded-full transition-all duration-300 ${
                  selectedIndex % 3 === dotIndex
                    ? "bg-white"
                    : "bg-white/50 opacity-50 hover:opacity-80"
                }`}
                aria-label={`Go to slide ${dotIndex + 1}`}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => {
              if (emblaApi) emblaApi.scrollNext();
            }}
            className="mx-4 transition ease-in-out duration-300 hover:opacity-50 cursor-pointer"
            aria-label="Next Slide"
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

      {/* Video Modal */}
      {selectedVideo && (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeVideoModal}
          tabIndex={-1}
        >
          <div
            className="relative w-full max-w-5xl bg-black rounded-md overflow-hidden shadow-[0_0_30px_rgba(236,199,119,0.3)] animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video w-full relative">
              {/* Video player */}
              <video
                ref={videoRef}
                src={selectedVideo}
                className="w-full h-full"
                controls
                autoPlay
                playsInline
                onError={() => {
                  console.error("Video playback error");
                  alert("Sorry, there was an error playing this video.");
                  closeVideoModal();
                }}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Close button */}
            <button
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-[#BC8431] text-white font-bold transition-all duration-300 hover:scale-110 hover:bg-[#ECC578] focus:outline-none focus:ring-2 focus:ring-[#ECC578] cursor-pointer"
              onClick={closeVideoModal}
              aria-label="Close video"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx global>{`
        .clip-triangle {
          clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        /* Critical fixes for embla carousel */
        .embla {
          overflow: visible !important;
        }

        .embla__viewport {
          overflow: visible !important;
        }

        .embla__container {
          overflow: visible !important;
        }

        /* Style for thumbnail containers */
        .video-thumbnail-container {
          transition: transform 0.3s ease-out;
          will-change: transform;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          z-index: 1;
        }

        /* Ensure all slides remain visible */
        .testimonial-carousel-container {
          perspective: 1000px;
        }

        .testimonial-slide {
          will-change: transform, opacity;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
}
