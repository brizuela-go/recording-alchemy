"use client";

import React from "react";

const video =
  "https://qs882kideu.ufs.sh/f/4Kr24oUHKyZImYD17O1IaZQrnYCH4L8k1DxcAjEGtRFqiJVw";

export default function TransformationalRecordingExperiences() {
  return (
    <section className="flex flex-col items-center justify-start py-20 ">
      <div className="px-4 md:px-8 flex flex-col items-center justify-start">
        <div className="w-full max-w-4xl text-center">
          <h3 className="text-xl sm:text-2xl font-normal capitalize font-sans text-gradient">
            Inside The Studio
          </h3>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight lg:leading-[77px] uppercase mt-4 sm:mt-5 md:mt-7 font-cinzel text-white max-w-5xl mx-auto">
            Transformational Recording Experiences
          </h2>
        </div>
        <div className="w-full max-w-6xl mt-16">
          <div>
            <video
              poster="/images/testimonials/Fernando Velazco.png"
              src={video}
              controls
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
