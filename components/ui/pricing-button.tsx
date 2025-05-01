"use client";

import React from "react";
import Link from "next/link";

interface PricingButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  url?: string;
}

export default function PricingButton({
  children,
  className = "",
  onClick,
  url,
}: PricingButtonProps) {
  const buttonClasses = `min-w-60 px-8 py-6 rounded bg-gradient-to-r from-[#ECC578] via-[#FFE8A0] to-[#E0B35A] text-black font-medium text-base shadow-[0px_4px_0px_rgba(168,124,40,1)] hover:shadow-[0px_2px_0px_rgba(168,124,40,1)] hover:translate-y-0.5 transition-all duration-200 ${className}`;

  if (url) {
    return (
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
      >
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
}
