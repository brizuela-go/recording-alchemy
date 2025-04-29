"use client";

import React from "react";

interface FeatureItemProps {
  text: string;
  iconSrc: string;
}

export default function FeatureItem({ text, iconSrc }: FeatureItemProps) {
  return (
    <div className="flex w-full items-center gap-4">
      <img
        src={iconSrc}
        alt=""
        className="w-5 h-4 object-contain flex-shrink-0"
      />
      <div className="flex-1 text-[#C9C9C9] leading-relaxed">{text}</div>
    </div>
  );
}
