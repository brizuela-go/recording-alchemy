"use client";

import React, { useState } from "react";
import GoldGradientText from "./ui/gold-gradient-text";
import FeatureItem from "./ui/feature-item";
import DurationTab from "./ui/duration-tab";
import SignUpButton from "./ui/sign-up-button";

interface PricingOption {
  duration: string;
  price: string;
  url: string;
}

export default function CoursePricingSection() {
  const [selectedGroupOption, setSelectedGroupOption] = useState<number>(0);

  const groupPricingOptions: PricingOption[] = [
    {
      duration: "3 months",
      price: "$750",
      url: "https://beatsalchemy.thrivecart.com/3-months-recording-alchemy-course/",
    },
    {
      duration: "6 months",
      price: "$1250",
      url: "https://beatsalchemy.thrivecart.com/6-months-recording-alchemy-course/",
    },
    {
      duration: "One year",
      price: "$2000",
      url: "https://beatsalchemy.thrivecart.com/1-year-recording-alchemy-course/",
    },
  ];

  const oneOnOnePricingUrl =
    "https://beatsalchemy.thrivecart.com/1-on-1-coaching/";
  const studioExperienceUrl =
    "https://beatsalchemy.thrivecart.com/in-studio-experience/";

  return (
    <section
      id="courses"
      className="flex flex-col items-center justify-start py-20 "
    >
      <div className="px-4 md:px-8 flex flex-col items-center justify-start">
        <div className="w-full max-w-4xl text-center">
          <h3 className="text-xl sm:text-2xl font-normal capitalize font-sans text-gradient">
            Course Options
          </h3>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight lg:leading-[77px] uppercase mt-4 sm:mt-5 md:mt-7 font-cinzel text-white max-w-5xl mx-auto">
            Find the Right Course for Your Journey
          </h2>
        </div>

        {/* Group Coaching */}
        <div className="flex mt-16 md:mt-20 lg:mt-24 flex-col lg:flex-row items-center gap-x-16 gap-y-10">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/67de9199e8a195c04117167cdd34ff094c201561?placeholderIfAbsent=true"
            alt="Group Coaching"
            className="w-full max-w-lg aspect-[0.87] object-contain"
          />
          <div className="w-full max-w-xl">
            <div className="min-h-[312px] w-full">
              <GoldGradientText className="text-3xl md:text-4xl lg:text-5xl">
                Group Coaching
              </GoldGradientText>
              <div className="mt-6 md:mt-8 w-full text-[#C9C9C9] text-xl md:text-2xl space-y-6">
                <FeatureItem
                  iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/8e1299bd82d059f27972168958073fad8b9b7711?placeholderIfAbsent=true"
                  text="Weekly Zoom calls, live demos, and Q&A sessions"
                />
                <FeatureItem
                  iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/09bddf14be79508a61cac353d380dba2ad07ffe5?placeholderIfAbsent=true"
                  text="Access to a private Discord community for feedback and collaboration"
                />
                <FeatureItem
                  iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/7dc93c3a475bf251fe2272eead8036b719133e9b?placeholderIfAbsent=true"
                  text="Starts at $750 for 3 months"
                />
              </div>
            </div>

            <div className="mt-10 md:mt-12 lg:mt-16 w-full flex flex-col">
              <div className="flex w-full items-center gap-2 md:gap-4 flex-wrap">
                {groupPricingOptions.map((option, index) => (
                  <DurationTab
                    key={index}
                    duration={option.duration}
                    isActive={selectedGroupOption === index}
                    onClick={() => setSelectedGroupOption(index)}
                  />
                ))}
              </div>

              <div className="flex mt-10 md:mt-14 lg:mt-16 items-center gap-6 md:gap-10 lg:gap-16 flex-wrap">
                <GoldGradientText className="text-4xl md:text-5xl lg:text-6xl">
                  {groupPricingOptions[selectedGroupOption].price}
                </GoldGradientText>
                <SignUpButton
                  className="w-full md:w-auto"
                  href={groupPricingOptions[selectedGroupOption].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sign Up Today
                </SignUpButton>
              </div>
            </div>
          </div>
        </div>

        {/* 1-on-1 Coaching */}
        <div className="flex mt-16 md:mt-20 lg:mt-24 flex-col lg:flex-row items-center gap-x-16 gap-y-10">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c1753f4771bf7deea8b27dae94d1eb10839f660?placeholderIfAbsent=true"
            alt="1-on-1 Coaching"
            className="w-full max-w-lg aspect-[0.87] object-contain"
          />
          <div className="w-full max-w-xl">
            <div className="min-h-[312px] w-full">
              <GoldGradientText className="text-3xl md:text-4xl lg:text-5xl">
                1-on-1 Coaching
              </GoldGradientText>
              <div className="mt-6 md:mt-8 w-full text-[#C9C9C9] text-xl md:text-2xl space-y-4">
                <FeatureItem
                  iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/f06a0aa7090744a9c6664fc55e3ff819811529a0?placeholderIfAbsent=true"
                  text="Everything in the group course"
                />
                <FeatureItem
                  iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/4c435b6e5595ac576e3947dc3f88fb5799e9af24?placeholderIfAbsent=true"
                  text="Personalized training tailored to your needs"
                />
                <FeatureItem
                  iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/4eba2aca5c4f3bdb94ced3f0870b42fe5b45db3c?placeholderIfAbsent=true"
                  text="Direct feedback on your music"
                />
                <FeatureItem
                  iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/06a9a3931a027314702e77d6b54ebcdf26fa2ab5?placeholderIfAbsent=true"
                  text="$1000/month"
                />
              </div>
            </div>

            <div className="mt-10 md:mt-12 lg:mt-16 w-full">
              <div className="flex items-center gap-6 md:gap-10 lg:gap-16 flex-wrap">
                <GoldGradientText className="text-4xl md:text-5xl lg:text-6xl">
                  $1000
                </GoldGradientText>
                <SignUpButton
                  className="w-full md:w-auto"
                  href={oneOnOnePricingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sign Up Today
                </SignUpButton>
              </div>
            </div>
          </div>
        </div>

        {/* In-Studio Experience */}
        <div className="flex mt-16 md:mt-20 lg:mt-24 flex-col lg:flex-row items-center gap-x-16 gap-y-10">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ab779a3acbf74d97fc5080ab746237b12910c265?placeholderIfAbsent=true"
            alt="In-Studio Experience"
            className="w-full max-w-lg aspect-[0.87] object-contain"
          />
          <div className="w-full max-w-xl">
            <div className="min-h-[312px] w-full">
              <GoldGradientText className="text-3xl md:text-4xl lg:text-5xl">
                In-Studio Experience
              </GoldGradientText>
              <div className="mt-6 md:mt-8 w-full text-[#C9C9C9] text-xl md:text-2xl space-y-4">
                <FeatureItem
                  iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/c96ec0e000cdf993d31220385992d29558079f2b?placeholderIfAbsent=true"
                  text="Fly out for a 2-day session"
                />
                <FeatureItem
                  iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/3c50d653a23249e1324ef43e91c80cf25ab00540?placeholderIfAbsent=true"
                  text="Record a fully produced, mixed, and mastered song with me"
                />
                <FeatureItem
                  iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/aa4ab290408f6596dc0880b02a8ee378a1acd403?placeholderIfAbsent=true"
                  text="Starts at $2500"
                />
              </div>
            </div>

            <div className="mt-10 md:mt-12 lg:mt-16 w-full">
              <div className="flex items-center gap-6 md:gap-10 lg:gap-16 flex-wrap">
                <GoldGradientText className="text-4xl md:text-5xl lg:text-6xl">
                  $2500
                </GoldGradientText>
                <SignUpButton
                  className="w-full md:w-auto"
                  href={studioExperienceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sign Up Today
                </SignUpButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d006244475fa05eac96c31acb394c84819a925a?placeholderIfAbsent=true"
        alt="Divider"
        className="w-full object-contain mt-16 md:mt-20 lg:mt-24"
      />
    </section>
  );
}
