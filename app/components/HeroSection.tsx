"use client";

import React from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import SignUpButton from "./ui/sign-up-button";
import DownloadForm from "./DownloadForm";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-stretch justify-between min-h-screen w-full relative px-5 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-10 md:py-12 lg:py-16 bg-black overflow-hidden">
      {/* Background Image with Next.js Image component */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero-bg.png"
          alt="Recording studio background"
          fill
          priority
          quality={20}
          sizes="100vw"
          className="object-cover lg:object-contain object-top"
          style={{ opacity: 0.47 }}
        />
        {/* Dark overlay for gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[82.52%] to-black to-100%"></div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content - Aligned with logo Y axis */}
      <div className="w-full flex flex-col items-start mx-auto z-10 pt-0 lg:pt-8 mt-52">
        {/* Hero Title */}
        <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight sm:leading-tight md:leading-tight lg:leading-[150%] tracking-tight lg:tracking-[-2.425px] uppercase text-white">
          <span>Unlock Your </span>
          <span className="text-gradient">Voice,</span>
          <br className="hidden sm:block" />
          <span> Transform Your </span>
          <br className="hidden sm:block" />
          <span>Sound</span>
        </h1>

        {/* Hero Description */}
        <p className="font-sans text-xl sm:text-2xl lg:text-[26px] leading-relaxed lg:leading-[146%] text-white w-full lg:w-[663px] mt-4 md:mt-6">
          I&apos;ve helped artists break through their creative blocks, record
          their first songs, and finally hear their music the way they&apos;ve
          always imagined it.
        </p>

        {/* CTA Button */}
        <div className="mt-6 lg:mt-8">
          <SignUpButton href="#courses" size="large">
            Sign Up Today
          </SignUpButton>
        </div>

        {/* Arrow SVG - Only visible on larger screens */}
        <div className="relative w-full hidden sm:block">
          <svg
            width="243"
            height="249"
            viewBox="0 0 243 249"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-1/2 md:left-[346px] top-[30px] md:top-[85px] transform -translate-x-1/2 md:translate-x-0"
          >
            <path
              d="M216.358 69.8229C226.036 82.1317 223.871 97.3036 217.981 108.666C211.483 121.286 200.143 131.494 185.945 138.551C157.31 152.964 120.655 153.989 85.4698 151.18C63.5664 149.44 41.6726 145.943 19.8995 141.048C17.876 140.591 16.5872 138.216 17.0585 136.879C17.6337 135.162 19.8095 134.681 21.8331 135.139C40.2601 139.237 58.7838 142.217 77.4041 144.08C94.4071 145.724 111.403 146.63 128.057 145.719C160.315 143.72 191.767 133.756 207.317 111.049C214.641 100.384 219.332 84.7914 209.328 72.1436C208.181 70.5875 209.131 68.6506 210.821 68.0305C213.021 67.2704 215.212 68.2668 216.358 69.8229Z"
              fill="url(#paint0_linear_10024_1023)"
            />
            <path
              d="M58.2412 188.033C45.7393 173.458 33.2374 158.884 20.7355 144.309C18.1425 141.31 14.1126 137.612 16.2641 134.17C17.272 132.408 19.477 131.647 21.8734 131.145C24.2698 130.643 26.5863 130.241 29.1184 129.819C38.7599 127.991 48.4571 126.344 58.0986 124.516C69.0341 122.567 79.8338 120.539 90.7692 118.59C92.7901 118.308 95.017 119.767 95.5187 121.387C96.0762 123.187 94.7411 124.608 92.7203 124.89C74.9711 128.124 57.2219 131.358 39.6884 134.572C35.1912 135.456 30.6382 136.159 26.1409 137.043C25.6296 137.183 24.4472 137.664 23.7445 137.545C23.1775 137.505 23.8003 137.725 23.6888 137.365C23.0829 136.125 23.9286 137.065 23.9286 137.065C24.0643 137.145 25.213 138.704 25.3487 138.784C26.1944 139.724 26.9045 140.583 27.7502 141.523C33.4547 148.121 39.0792 154.818 44.9194 161.495C51.4697 169.033 57.94 176.67 64.4902 184.207C65.8545 185.746 65.9807 187.587 64.3185 188.668C62.3849 189.59 59.4699 189.492 58.2412 188.033Z"
              fill="url(#paint1_linear_10024_1023)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_10024_1023"
                x1="77.759"
                y1="175.309"
                x2="159.454"
                y2="35.8933"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#ECC578" />
                <stop offset="0.259373" stopColor="#FFE8A0" />
                <stop offset="0.716346" stopColor="#FDDEA1" />
                <stop offset="0.951923" stopColor="#E0B35A" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_10024_1023"
                x1="32.0747"
                y1="172.803"
                x2="71.2042"
                y2="106.042"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#ECC578" />
                <stop offset="0.259373" stopColor="#FFE8A0" />
                <stop offset="0.716346" stopColor="#FDDEA1" />
                <stop offset="0.951923" stopColor="#E0B35A" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Download Form - Larger and Bottom Section */}
      <div className="w-full mt-auto py-20 z-10">
        <DownloadForm />
      </div>
    </section>
  );
}
