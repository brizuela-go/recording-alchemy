"use client";

import React from "react";

interface FeatureItemProps {
  text: string;
  iconSrc?: string;
}

export default function FeatureItem({
  text,
  iconSrc = "https://cdn.builder.io/api/v1/image/assets/TEMP/8e1299bd82d059f27972168958073fad8b9b7711?placeholderIfAbsent=true",
}: FeatureItemProps) {
  return (
    <div className="flex w-full items-center gap-4">
      <img
        src={iconSrc}
        alt={"Note Logo"}
        className="w-5 h-4 object-contain flex-shrink-0"
      />
      <div className="flex-1 text-[#C9C9C9] leading-relaxed font-sans">
        {text}
      </div>
    </div>
  );
}
