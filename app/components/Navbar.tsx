"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SignUpButton from "./ui/sign-up-button";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Fixed navbar that appears when scrolling */}
      <nav
        className={`
          fixed top-0 left-0 w-full z-50 transition-all duration-300
          ${
            scrolled
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full pointer-events-none"
          }
          bg-black/80 backdrop-blur-md shadow-lg
          flex flex-row justify-between items-center px-5 sm:px-8 md:px-12 lg:px-16 py-4
        `}
      >
        {/* Logo in fixed navbar */}
        <div className="transition-transform duration-300 ">
          <Link href={"/"}>
            <Image
              src="/images/logo.png"
              alt="Recording Alchemy"
              width={329}
              height={80}
              className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[329px] h-auto"
              priority
            />
          </Link>
        </div>

        {/* Sign Up Button in fixed navbar - using built-in size props */}
        <SignUpButton href="#courses" size="small" className="sm:hidden">
          Sign Up
        </SignUpButton>

        <SignUpButton href="#courses" size="medium" className="hidden sm:flex">
          Sign Up Today
        </SignUpButton>
      </nav>

      {/* Original navbar that shows at the top of the page */}
      <nav className="flex flex-row justify-between items-center w-full pb-10 z-50">
        {/* Logo - Responsive sizing */}

        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Recording Alchemy"
            width={329}
            height={80}
            className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[329px] h-auto"
            priority
          />
        </Link>

        {/* Sign Up Button - using built-in size props */}
        <SignUpButton href="/#courses" size="small" className="sm:hidden">
          Sign Up
        </SignUpButton>

        <SignUpButton href="/#courses" size="medium" className="hidden sm:flex">
          Sign Up Today
        </SignUpButton>
      </nav>
    </>
  );
}
