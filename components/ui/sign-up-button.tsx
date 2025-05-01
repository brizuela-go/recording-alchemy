import Link, { LinkProps } from "next/link";
import React, { forwardRef } from "react";

interface SignUpButtonProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large";
  target?: string;
  rel?: string;
}

const SignUpButton = forwardRef<HTMLAnchorElement, SignUpButtonProps>(
  (
    { href, children, className = "", size = "medium", target, rel, ...props },
    ref
  ) => {
    const sizeClasses = {
      small: "w-32 h-7 text-sm",
      medium: "w-48 h-16 text-lg",
      large:
        "lg:w-56 lg:h-20 lg:text-[22px] sm:w-56 sm:h-16 sm:text-lg w-56 h-12 text-base",
    };

    return (
      <Link
        href={href}
        ref={ref}
        scroll
        target={target}
        rel={rel}
        {...props}
        className={`
          flex justify-center items-center
          ${sizeClasses[size]}
          px-8 py-5 gap-2.5 
          font-semibold text-[#111111]
          rounded-[4px] shadow-[0px_4px_0px_#A87C28]
          transition-all duration-300
          hover:opacity-95 hover:scale-105 
          active:translate-y-1 active:shadow-[0px_2px_0px_#A87C28]
          focus:outline-none focus:ring-2 focus:ring-[#A87C28] focus:ring-opacity-50
          ${className}
        `}
        style={{
          background:
            "linear-gradient(90.11deg, #ECC578 0.1%, #FFE8A0 25.98%, #FDDEA1 71.59%, #E0B35A 95.11%)",
        }}
      >
        {children}
      </Link>
    );
  }
);

SignUpButton.displayName = "SignUpButton";

export default SignUpButton;
