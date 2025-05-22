import { Metadata } from "next";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Free Masterclass",
  description:
    "Take a look behind the curtain of the Recording Alchemy process. This free masterclass will show you how to record, mix, and master your own music with confidence.",
};

const video =
  "https://qs882kideu.ufs.sh/f/4Kr24oUHKyZInuitMYOEO3u2yHzoKwB5lckbj0PsIATZqF6i";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div className=" w-full relative px-5 sm:px-8 md:px-12 lg:px-16 pt-8 sm:pt-10 md:pt-12 lg:pt-16 ">
        <Navbar />
      </div>

      <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 -mt-10">
        {/* Page Header */}
        <div className="mb-6 md:mb-10 text-center">
          <h1 className="font-cinzel text-4xl md:text-5xl lg:text-6xl font-bold uppercase mb-4 bg-gradient-to-r from-[#A87740] via-[#FBDDA3] to-[#A87740] bg-clip-text text-transparent">
            Free Masterclass
          </h1>
          <div className=" flex justify-center items-center z-10 ">
            <Image
              src={"/images/waves.svg"}
              alt="waves"
              width={140}
              height={100}
              className="flex justify-center items-center opacity-80 "
            />
          </div>
        </div>

        {/* Services */}
        <section>
          <div className="flex flex-col justify-center items-center  z-10">
            <video
              poster="/images/Recording Alchemy.png"
              src={video}
              controls
              className="w-full"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
