"use client";

import React, { useState } from "react";
import GoldGradientText from "./ui/gold-gradient-text";
import FeatureItem from "./ui/feature-item";
import DurationTab from "./ui/duration-tab";
import SignUpButton from "./ui/sign-up-button";
import Image from "next/image";

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

  const groupCoachingItems = [
    "Pre-mixed & mastered Ableton vocal template with pro effects",
    "Weekly Zoom coaching calls",
    "Live demos of real recording techniques and workflows",
    "Q&A sessions to answer your questions in real time",
    "Pre-recorded lessons on recording, vocal tuning, emotion, and more",
    "Step-by-step guide to setting up your room for pro-quality vocals",
    "Training on how to distribute your music on all streaming platforms",
    "Cover art design tutorials to create visuals that match your sound",
    "Special guest interviews with artists, engineers, and music pros",
  ];

  const oneOnOneCoaching = [
    "Weekly 1-hour personalized Zoom coaching sessions",
    "Lifetime access to your recorded 1-on-1 sessions",
    "Tailored training and direct feedback on your music",
    "Help with songwriting, melody ideas, and arrangement",
    "Flexible rescheduling with 24–48 hour notice",
    "Email access to ask questions between sessions",
    "Feedback on songs or ideas anytime via email",
    "Accountability to keep you on track creatively and technically",
    "Occasional co-production opportunities with Jamin",
    "Built-in structure to help you finish and release your songs confidently",
  ];

  const vip = [
    "Fly in for a 2-day studio session with Jamin",
    "Produce, record, mix, and master 1 song (or as many as possible)",
    "Hands-on vocal coaching to bring out raw emotion and power",
    "Access to a safe, creative space to explore and experiment",
    "Leave with your final mastered song (or songs)",
    "Behind-the-scenes photos and videos captured during your session",
    "Lodging included (you cover travel and meals)",
    "A deep-dive experience to unlock your full recording potential",
  ];

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
            <Image
              width={1000}
              height={1000}
              priority
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/67de9199e8a195c04117167cdd34ff094c201561?placeholderIfAbsent=true"
              alt="Group Coaching"
              className="w-full max-w-lg aspect-[0.87] object-contain"
            />
          {/* Content scrolls normally */}
          <div className="w-full max-w-xl">
            <div className="min-h-[312px] w-full">
              <GoldGradientText className="text-3xl md:text-4xl lg:text-5xl">
                Group Coaching
              </GoldGradientText>
              <p className="font-sans my-6 text-[#C9C9C9] text-lg">
                What You Get:
              </p>

              <div className="mt-6 md:mt-8 w-full text-[#C9C9C9] text-xl md:text-2xl space-y-6">
                {groupCoachingItems.map((item) => (
                  <FeatureItem
                    key={item}
                    iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/8e1299bd82d059f27972168958073fad8b9b7711?placeholderIfAbsent=true"
                    text={item}
                  />
                ))}
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
          <Image
            width={1000}
            height={1000}
            priority
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c1753f4771bf7deea8b27dae94d1eb10839f660?placeholderIfAbsent=true"
            alt="1-on-1 Coaching"
            className="w-full max-w-lg aspect-[0.87] object-contain"
          />
          <div className="w-full max-w-xl">
            <div className="min-h-[312px] w-full">
              <GoldGradientText className="text-3xl md:text-4xl lg:text-5xl">
                1-on-1 Coaching
              </GoldGradientText>
              <p className="font-sans my-6 text-[#C9C9C9] text-lg">
                Includes everything in Group Coaching, plus:
              </p>
              <div className="mt-6 md:mt-8 w-full text-[#C9C9C9] text-xl md:text-2xl space-y-4">
                {oneOnOneCoaching.map((item) => (
                  <FeatureItem
                    key={item}
                    iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/f06a0aa7090744a9c6664fc55e3ff819811529a0?placeholderIfAbsent=true"
                    text={item}
                  />
                ))}
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
          <Image
            width={1000}
            height={1000}
            priority
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ab779a3acbf74d97fc5080ab746237b12910c265?placeholderIfAbsent=true"
            alt="In-Studio Experience"
            className="w-full max-w-lg aspect-[0.87] object-contain"
          />
          <div className="w-full max-w-xl">
            <div className="min-h-[312px] w-full">
              <GoldGradientText className="text-3xl md:text-4xl lg:text-5xl">
                In-Studio Experience
              </GoldGradientText>
              <p className="font-sans my-6 text-[#C9C9C9] text-lg">
                2-Day VIP Immersion:
              </p>
              <div className="mt-6 md:mt-8 w-full text-[#C9C9C9] text-xl md:text-2xl space-y-4">
                {vip.map((item) => (
                  <FeatureItem
                    key={item}
                    iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/f06a0aa7090744a9c6664fc55e3ff819811529a0?placeholderIfAbsent=true"
                    text={item}
                  />
                ))}
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

      <Image
        width={2000}
        height={2000}
        priority
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d006244475fa05eac96c31acb394c84819a925a?placeholderIfAbsent=true"
        alt="Divider"
        className="w-full object-contain mt-16 md:mt-20 lg:mt-24"
      />
    </section>
  );
}
