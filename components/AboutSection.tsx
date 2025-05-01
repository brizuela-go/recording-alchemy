"use client";

import Image from "next/image";
import SignUpButton from "./ui/sign-up-button";

export default function AboutSection() {
  return (
    <section className="flex flex-col relative min-h-screen lg:min-h-[96rem] pt-16 sm:pt-24 md:pt-40 lg:pt-72 overflow-hidden rounded-[300px_0_0_0] sm:rounded-[150px_0_0_0]">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/about-bg.png"
          alt="Background texture"
          fill
          className="object-cover object-center brightness-105"
          priority
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col relative min-h-[78rem] w-full px-5 sm:px-8 md:px-12 lg:px-16 pb-20 md:pb-36 lg:pb-52">
        <div className="relative z-10 flex flex-col items-stretch justify-start w-full mt-20 mb-28  sm:mt-20 md:mt-20 sm:mb-10 lg:-mt-16 lg:-mb-10">
          {/* Section Header */}
          <div className="self-center w-full max-w-3xl text-center max-md:mt-10 mb-10">
            <h3 className="text-2xl sm:text-3xl font-normal text-[#B18B45] font-sans">
              About Me
            </h3>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold text-black uppercase mt-4 lg:mt-7 font-[Cinzel]">
              Why Recording Alchemy?
            </h2>
          </div>

          {/* Two Column Layout */}
          <div className="flex flex-col lg:flex-row justify-between items-start w-full mt-8 lg:mt-12 gap-8 lg:gap-16 text-black font-normal">
            {/* Image Column - Made smaller */}
            <div className="w-full lg:w-1/2 lg:flex-shrink-0">
              <Image
                src="/images/founder.png"
                alt="Jamin, founder of Recording Alchemy"
                width={600}
                height={715}
                className="w-full h-auto object-contain mx-auto"
              />
            </div>

            {/* Text Column - Less centered, more natural alignment */}
            <div className="w-full lg:w-1/2 mt-8 xl:mt-36">
              <div className="w-full text-2xl sm:text-3xl ">
                <p>
                  I&apos;m Jamin, the founder of Recording Alchemy. With 20
                  years in the music industry, I&apos;ve worked alongside
                  Grammy-winning producers, engineered for major artists, and
                  developed a streamlined system that makes professional-quality
                  music accessible to everyone.
                </p>
                <p className="mt-6">
                  I&apos;ve helped artists break through their creative blocks,
                  record their first songs, and finally hear their music the way
                  they&apos;ve always imagined it.
                </p>

                <div className="mt-10 lg:mt-8 max-lg:flex max-lg:justify-center max-lg:items-center ">
                  <SignUpButton href="#courses" size="large">
                    Sign Up Today
                  </SignUpButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
