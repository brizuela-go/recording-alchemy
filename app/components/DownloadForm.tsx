"use client";

import React, { useState } from "react";
import { cn } from "../../lib/utils";

export default function DownloadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid =
    name.trim() !== "" && email.trim() !== "" && email.includes("@");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    try {
      // Handle PDF download logic here
      console.log({ name, email });
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Logic for successful download would go here
      alert("Your PDF has been sent to your email!");

      // Reset form after successful submission
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto transform transition-transform duration-500 hover:scale-[1.01]"
    >
      <div className="flex flex-col items-center w-full p-6 sm:p-8 md:p-10 lg:p-[50px] border-[4px] sm:border-[4.447px] border-[#BC8431] bg-[#210B06] rounded-sm">
        {/* Form Header */}
        <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-[18.377px] w-full max-w-6xl">
          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-bold leading-tight tracking-tight md:tracking-[-1.43px] uppercase text-white text-center">
            <span className="text-gradient"> Unlock </span> Your Pro Vocal Sound
            &amp; Instantly Elevate Your Recordings
          </h2>

          <p className="font-sans text-lg sm:text-xl md:text-2xl lg:text-[24px] leading-relaxed md:leading-[146%] text-white text-center mt-1 md:mt-2">
            Download My Pro Vocal Chain Starter Kit (Free PDF)
          </p>

          <p className="font-sans text-sm sm:text-base md:text-lg lg:text-[18px] leading-relaxed md:leading-[146%] text-white text-center w-full max-w-5xl mt-1 md:mt-2">
            Get the exact Ableton vocal chain I use to help artists sound
            radio-ready — all in one easy-to-follow PDF. Whether you&apos;re
            just starting out or looking to refine your sound, this guide will
            give you the tools to make your vocals shine like the pros.
          </p>
        </div>

        {/* Form Inputs - Larger size */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-5 sm:gap-6 lg:gap-[35px] w-full mt-8 md:mt-10 lg:mt-12">
          {/* Name Input */}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input w-full lg:w-[432px] h-[65px] md:h-[75px] lg:h-[79px] p-3 sm:p-5 md:p-[20px] text-white font-poppins text-lg sm:text-xl md:text-2xl font-light capitalize border border-white bg-transparent flex-1 focus:outline-none focus:ring-1 focus:ring-[#BC8431] transition-all duration-300"
          />

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input w-full lg:w-[432px] h-[65px] md:h-[75px] lg:h-[79px] p-3 sm:p-5 md:p-[20px] text-white font-poppins text-lg sm:text-xl md:text-2xl font-light capitalize border border-white bg-transparent flex-1 focus:outline-none focus:ring-1 focus:ring-[#BC8431] transition-all duration-300"
          />

          {/* Download Button - Larger */}
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={cn(
              "download-button h-[65px] md:h-[75px] lg:h-[79px] w-full lg:w-auto px-6 sm:px-10 md:px-12 lg:px-[120px] py-4 md:py-[24px] bg-download-gradient font-poppins text-lg sm:text-xl md:text-[21px] font-semibold text-black uppercase cursor-pointer transition-all duration-300 hover:shadow-lg hover:opacity-95 active:translate-y-0.5",
              (!isFormValid || isSubmitting) &&
                "opacity-70 cursor-not-allowed hover:opacity-70 active:translate-y-0"
            )}
          >
            {isSubmitting ? "Sending..." : "Download PDF"}
          </button>
        </div>
      </div>
    </form>
  );
}
