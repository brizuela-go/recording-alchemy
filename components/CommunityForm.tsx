"use client";

import React, { useState } from "react";
import { cn } from "../lib/utils";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

const companyLogos = [
  {
    src: "/images/companies/izotope.png",
    alt: "Izotope",
    href: "https://www.izotope.com/",
  },
  {
    src: "/images/companies/ableton.png",
    alt: "Ableton",
    href: "https://www.ableton.com/",
  },
  {
    src: "/images/companies/waves.png",
    alt: "Waves",
    href: "https://www.waves.com/",
  },
];

export default function CommunityForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Social media URLs - kept empty as placeholders
  const instagramUrl = "https://instagram.com/jaminvandillen_";
  const youtubeUrl = "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !agreed) return;

    setIsSubmitting(true);

    toast.promise(
      new Promise<string>(async (resolve, reject) => {
        try {
          // Replace this with your actual POST request
          const response = await fetch("/api/mailerlite/community", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, agreed }),
          });

          if (!response.ok) {
            throw new Error("Failed to submit");
          }

          // Reset form on success
          setName("");
          setEmail("");
          setAgreed(false);
          resolve("Welcome to the community! Check your email");
        } catch (error) {
          console.error("Error submitting form:", error);
          reject("Submission failed. Please try again.");
        } finally {
          setIsSubmitting(false);
        }
      }),
      {
        loading: "Submitting...",
        success: (message: string) => message,
        error: (err) => err,
      }
    );
  };

  return (
    <section className="w-full bg-black py-12 md:py-16  lg:py-20">
      <div className="flex justify-center items-center pb-48 max-sm:px-10 -mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-48 gap-y-14">
          {companyLogos.map((logo, index) => (
            <Link
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center group "
              key={index}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={150}
                height={150}
                className={`object-contain
                  group-hover:brightness-50  transition duration-200 ease-in-out
                  ${
                    logo.alt === "Waves"
                      ? "h-28 w-28"
                      : logo.alt === "Ableton"
                      ? "h-64 w-64"
                      : ""
                  }`}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex justify-between items-start w-full px-4 sm:px-6 lg:px-8 flex-col md:flex-row gap-12 md:gap-8 lg:gap-16">
        {/* Left section - Form */}
        <div className="flex flex-col w-full md:w-1/2">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col mb-6 md:mb-8">
              <div className="border border-white p-4 md:p-6 mb-6 md:mb-8 transition-all duration-300 hover:border-[#E3B887] focus-within:border-[#FBDDA3]">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="font-poppins text-xl md:text-2xl text-white capitalize w-full bg-transparent outline-none placeholder:text-white/80 transition-colors duration-300"
                  required
                />
              </div>

              <div className="border border-white p-4 md:p-6 mb-6 md:mb-8 transition-all duration-300 hover:border-[#E3B887] focus-within:border-[#FBDDA3]">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="font-poppins text-xl md:text-2xl text-white w-full bg-transparent outline-none placeholder:text-white/80 transition-colors duration-300"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !agreed}
                className={cn(
                  "w-full py-5 md:py-6 px-8 md:px-12 bg-gradient-to-r from-[#FBDDA3] via-[#E3B887] to-[#A87740] font-poppins text-lg md:text-xl font-semibold text-black uppercase mb-6 md:mb-8 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer",
                  (!agreed || isSubmitting) &&
                    "opacity-70 cursor-not-allowed hover:scale-100"
                )}
              >
                {isSubmitting ? "Submitting..." : "Join Our Community"}
              </button>

              <div className="flex items-start gap-3">
                <div className="relative flex items-start">
                  <input
                    type="checkbox"
                    id="consent-checkbox"
                    checked={agreed}
                    onChange={() => setAgreed(!agreed)}
                    className="sr-only" // Hidden but still accessible
                    aria-checked={agreed}
                  />
                  <label
                    htmlFor="consent-checkbox"
                    className="flex items-center cursor-pointer"
                  >
                    <span
                      className={cn(
                        "w-8 sm:w-6 md:w-8 lg:w-6 h-5 mr-3 rounded border border-[#767676] transition-all duration-300 flex items-center justify-center",
                        agreed ? "bg-[#bc9160]" : "bg-white"
                      )}
                    >
                      {agreed && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          viewBox="0 0 20 20"
                          fill="white"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="font-poppins text-sm text-white leading-relaxed ml-2">
                      By checking this box, I agree to receive future
                      promotional and marketing emails...
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Right section - Connect with me */}
        <div className="flex flex-col items-start w-full md:w-1/2">
          <div className="flex flex-col xl:flex-row items-center xl:items-end gap-0 sm:gap-2 w-full mb-10 md:mb-12 lg:mb-16">
            <span className="font-inter text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-wider uppercase bg-gradient-to-r from-[#A87740] via-[#FFF3C2] to-[#A87740] bg-clip-text text-transparent">
              CONNECT
            </span>
            <span className="font-inter text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-wider uppercase bg-gradient-to-r from-[#A87740] via-[#FFF3C2] to-[#A87740] bg-clip-text text-transparent">
              WITH ME
            </span>
          </div>

          <div className="flex flex-col max-xl:justify-center max-xl:items-center max-xl:-ml-4 gap-y-10 md:gap-12 lg:gap-16 w-full">
            {/* Instagram */}
            <a
              href={instagramUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center relative group cursor-pointer"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0 rounded-full overflow-hidden p-0.5  transition-transform duration-300 group-hover:scale-105">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 61 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    d="M30.441 58.9246C46.4862 58.9246 59.4934 45.9174 59.4934 29.8722C59.4934 13.827 46.4862 0.819824 30.441 0.819824C14.3959 0.819824 1.38867 13.827 1.38867 29.8722C1.38867 45.9174 14.3959 58.9246 30.441 58.9246Z"
                    stroke="white"
                    strokeWidth="1.1005"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M43.2168 24.7394C43.156 23.3429 42.9334 22.3814 42.6095 21.5413C42.2756 20.6811 41.8201 19.9423 41.0915 19.2137C40.3628 18.485 39.624 18.0295 38.7637 17.6955C37.9238 17.3717 36.9725 17.1491 35.5657 17.0883L35.5382 17.0871C34.1529 17.0274 33.6902 17.0073 30.1411 17.0073C26.5919 17.0073 26.1292 17.0274 24.744 17.0871L24.7165 17.0883C23.3198 17.1491 22.3584 17.3717 21.5184 17.6955C20.6479 18.0295 19.9193 18.485 19.1906 19.2137C18.4619 19.9423 18.0066 20.6811 17.6726 21.5413C17.3487 22.3814 17.126 23.3327 17.0654 24.7394L17.0642 24.767C17.0043 26.1522 16.9844 26.615 16.9844 30.164C16.9844 33.7366 16.9945 34.1819 17.0654 35.5887C17.126 36.9853 17.3487 37.9467 17.6726 38.7868C18.0066 39.647 18.4619 40.3858 19.1906 41.1144C19.9193 41.8432 20.6581 42.2986 21.5184 42.6326C22.3584 42.9565 23.3097 43.1791 24.7165 43.2398L24.744 43.241C26.1291 43.3008 26.5918 43.3207 30.1411 43.3207C33.7136 43.3207 34.1589 43.3107 35.5657 43.2398C36.9623 43.1791 37.9238 42.9565 38.7637 42.6326C39.6341 42.2986 40.3628 41.8432 41.0915 41.1144C41.8201 40.3858 42.2756 39.647 42.6095 38.7868C42.9334 37.9467 43.156 36.9954 43.2168 35.5887L43.218 35.5611C43.2777 34.176 43.2978 33.7131 43.2978 30.164C43.2978 26.5916 43.2876 26.1462 43.2168 24.7394ZM40.8485 35.4774C40.7879 36.7627 40.5753 37.461 40.3932 37.9164C40.1503 38.5337 39.8669 38.9689 39.4115 39.4345C38.956 39.9 38.5108 40.1834 37.9035 40.4162C37.4379 40.5983 36.7396 40.8108 35.4644 40.8716L35.4101 40.874C34.0664 40.9329 33.6167 40.9526 30.1512 40.9526C26.6394 40.9526 26.2244 40.9424 24.8378 40.8716C23.5525 40.8108 22.8542 40.5983 22.3988 40.4162C21.7815 40.1732 21.3463 39.8899 20.8808 39.4345C20.4253 38.9689 20.1318 38.5337 19.8991 37.9164C19.7169 37.4509 19.5044 36.7525 19.4436 35.4774L19.4412 35.4229C19.3823 34.0794 19.3626 33.6295 19.3626 30.164C19.3626 26.6522 19.3728 26.2373 19.4436 24.8508C19.5044 23.5655 19.7169 22.8671 19.8991 22.4118C20.142 21.7943 20.4253 21.3592 20.8808 20.9037C21.3463 20.4383 21.7815 20.1549 22.3988 19.922C22.8643 19.7399 23.5627 19.5274 24.8378 19.4667L24.8923 19.4643C26.236 19.4054 26.6857 19.3857 30.1512 19.3857C33.663 19.3857 34.078 19.3958 35.4644 19.4667C36.7497 19.5274 37.4481 19.7399 37.9035 19.922C38.5209 20.165 38.956 20.4484 39.4115 20.9037C39.8769 21.3693 40.1604 21.8045 40.3932 22.4118C40.5753 22.8773 40.7879 23.5756 40.8485 24.8508L40.8509 24.905C40.9098 26.2488 40.9295 26.6984 40.9295 30.164C40.9295 33.6758 40.9194 34.0908 40.8485 35.4774ZM30.1326 23.4122C26.398 23.4122 23.3721 26.4383 23.3721 30.1727C23.3721 33.9073 26.398 36.9332 30.1326 36.9332C33.867 36.9332 36.8931 33.9073 36.8931 30.1727C36.8931 26.4383 33.867 23.4122 30.1326 23.4122ZM30.1326 34.555C27.7137 34.555 25.7503 32.5916 25.7503 30.1727C25.7503 27.754 27.7137 25.7906 30.1326 25.7906C32.5513 25.7906 34.5147 27.754 34.5147 30.1727C34.5147 32.5916 32.5513 34.555 30.1326 34.555ZM35.58 23.1427C35.58 22.2722 36.2884 21.5639 37.1588 21.5639C38.0292 21.5639 38.7376 22.2722 38.7376 23.1427C38.7376 24.013 38.0292 24.7215 37.1588 24.7215C36.2884 24.7215 35.58 24.013 35.58 23.1427Z"
                    fill="url(#paint0_linear_instagram)"
                  ></path>
                  <defs>
                    <linearGradient
                      id="paint0_linear_instagram"
                      x1="40.665"
                      y1="20.3913"
                      x2="20.9655"
                      y2="38.8061"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#A87740"></stop>
                      <stop offset="0.25" stopColor="#E3B887"></stop>
                      <stop offset="0.5" stopColor="#FBDDA3"></stop>
                      <stop offset="0.75" stopColor="#E3B887"></stop>
                      <stop offset="1" stopColor="#A87740"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="ml-4 sm:ml-6">
                <span className="font-poppins text-lg sm:text-xl md:text-2xl text-white block">
                  Follow me on
                </span>
                <span className="font-poppins text-xl sm:text-2xl md:text-3xl font-medium bg-gradient-to-r from-[#A87740] via-[#FFF3C2] to-[#A87740] bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105 inline-block">
                  Instagram
                </span>
              </div>
            </a>

            {/* YouTube */}
            <a
              href={youtubeUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center relative group cursor-pointer"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0 rounded-full overflow-hidden p-0.5  transition-transform duration-300 group-hover:scale-105">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 61 61"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    d="M30.441 59.5535C46.4862 59.5535 59.4934 46.5463 59.4934 30.5011C59.4934 14.4559 46.4862 1.44873 30.441 1.44873C14.3959 1.44873 1.38867 14.4559 1.38867 30.5011C1.38867 46.5463 14.3959 59.5535 30.441 59.5535Z"
                    stroke="white"
                    strokeWidth="1.1005"
                  ></path>
                  <path
                    d="M44.6805 23.1079C44.3373 21.7882 43.3256 20.7398 42.0337 20.3873C39.703 19.7456 30.3531 19.7456 30.3531 19.7456C30.3531 19.7456 21.0032 19.7456 18.6725 20.3873C17.3897 20.7398 16.369 21.7792 16.0256 23.1079C15.4023 25.503 15.4023 30.5102 15.4023 30.5102C15.4023 30.5102 15.4023 35.5174 16.0256 37.9125C16.369 39.2321 17.3807 40.2805 18.6725 40.6331C21.0032 41.2747 30.3531 41.2747 30.3531 41.2747C30.3531 41.2747 39.703 41.2747 42.0337 40.6331C43.3165 40.2805 44.3373 39.2411 44.6805 37.9125C45.3039 35.5174 45.3039 30.5102 45.3039 30.5102C45.3039 30.5102 45.3039 25.503 44.6805 23.1079ZM27.2997 35.0564V25.973L35.1139 30.5192L27.2997 35.0654V35.0564Z"
                    fill="url(#paint0_linear_youtube)"
                  ></path>
                  <defs>
                    <linearGradient
                      id="paint0_linear_youtube"
                      x1="42.5813"
                      y1="19.4491"
                      x2="17.7412"
                      y2="37.8617"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#A87740"></stop>
                      <stop offset="0.25" stopColor="#E3B887"></stop>
                      <stop offset="0.5" stopColor="#FBDDA3"></stop>
                      <stop offset="0.75" stopColor="#E3B887"></stop>
                      <stop offset="1" stopColor="#A87740"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="ml-4 sm:ml-6">
                <span className="font-poppins text-lg sm:text-xl md:text-2xl text-white block">
                  Follow me on
                </span>
                <span className="font-poppins text-xl sm:text-2xl md:text-3xl font-medium bg-gradient-to-r from-[#A87740] via-[#FFF3C2] to-[#A87740] bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105 inline-block">
                  YouTube
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
