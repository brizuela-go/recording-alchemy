"use client";

import Image from "next/image";
import SignUpButton from "./ui/sign-up-button";

// Feature item type for better organization
type FeatureItemProps = {
  iconSrc: string;
  alt: string;
  text: string;
  highlight: string;
};

// Feature item component for consistency
const FeatureItem = ({ iconSrc, alt, text, highlight }: FeatureItemProps) => (
  <div className="flex items-center gap-5 md:gap-8 lg:gap-10 py-3 md:py-4 w-full group transition-transform duration-300 hover:translate-x-2">
    <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 lg:w-[41px] lg:h-[41px] relative">
      <Image
        src={iconSrc}
        alt={alt}
        fill
        className="object-contain transition-transform duration-300 group-hover:scale-110"
      />
    </div>
    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight">
      {text.split(highlight).flatMap((part, i, arr) =>
        i < arr.length - 1
          ? [
              part,
              <span key={i} className="text-gradient">
                {highlight}
              </span>,
            ]
          : part
      )}
    </p>
  </div>
);

export default function FeaturesSection() {
  // Feature items data for easier management
  const features = [
    {
      iconSrc: "/images/feature-icon-1.svg",
      alt: "Ableton Live icon",
      text: "How to use Ableton Live like a pro",
      highlight: "like a pro",
    },
    {
      iconSrc: "/images/feature-icon-1.svg",
      alt: "Editing icon",
      text: "Editing, pitch correction, and vocal comping for industry-standard results",
      highlight: "industry-standard",
    },
    {
      iconSrc: "/images/feature-icon-1.svg",
      alt: "Song structure icon",
      text: "Song structure & songwriting techniques to elevate your music",
      highlight: "structure & songwriting techniques",
    },
    {
      iconSrc: "/images/feature-icon-1.svg",
      alt: "Distribution icon",
      text: "How to distribute your music on streaming platforms",
      highlight: "distribute your music",
    },
    {
      iconSrc: "/images/feature-icon-1.svg",
      alt: "Royalty icon",
      text: "Royalty insights & music business strategies",
      highlight: "business strategies",
    },
    {
      iconSrc: "/images/feature-icon-1.svg",
      alt: "Film & TV icon",
      text: "How to pitch your songs for film & TV placements",
      highlight: "pitch your songs",
    },
    {
      iconSrc: "/images/feature-icon-1.svg",
      alt: "Mindset icon",
      text: "Mindset & confidence-building techniques to help you own your sound",
      highlight: "building techniques",
    },
  ] as FeatureItemProps[];

  return (
    <section
      className="relative flex flex-col min-h-screen w-full px-5 sm:px-8 md:px-12 lg:px-16 lg:pt-32 pt-16 pb-[227px] items-start justify-start bg-black text-white font-sans"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/features-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content Container */}
      <div className="relative z-10 flex flex-col w-full max-w-7xl mx-auto items-center font-normal">
        {/* Section Title - Text Gradient */}
        <h3 className="w-full text-center text-xl sm:text-2xl md:text-2xl leading-tight capitalize font-sans text-gradient">
          What You&apos;ll Learn
        </h3>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold leading-tight lg:leading-[77px] text-center uppercase mt-6 sm:mt-8 md:mt-10 lg:mt-[58px] font-[Cinzel] max-w-5xl">
          Everything You Need to Record Like a Pro
        </h2>

        {/* Features List - With Animation on Scroll */}
        <div className="flex flex-col mt-8 sm:mt-10 md:mt-12 lg:mt-[58px] w-full max-w-5xl space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-[29px]">
          {features.map((feature: FeatureItemProps, index: number) => (
            <FeatureItem
              key={index}
              iconSrc={feature.iconSrc}
              alt={feature.alt}
              text={feature.text}
              highlight={feature.highlight}
            />
          ))}
        </div>

        {/* Sign Up Button */}
        <div className="mt-10 sm:mt-12 md:mt-14 lg:mt-[58px] flex justify-center transform transition-transform duration-500 hover:scale-105">
          <SignUpButton href="#courses" size="large">
            Sign Up Today
          </SignUpButton>
        </div>
      </div>
    </section>
  );
}
