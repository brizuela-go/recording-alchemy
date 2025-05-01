import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div className="w-full relative px-5 sm:px-8 md:px-12 lg:px-16 pt-8 sm:pt-10 md:pt-12 lg:pt-16 ">
        <Navbar />
      </div>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Header */}
          <h1 className="font-cinzel text-8xl md:text-9xl font-bold mb-4 bg-gradient-to-r from-[#A87740] via-[#FBDDA3] to-[#A87740] bg-clip-text text-transparent">
            404
          </h1>

          <h2 className="font-cinzel text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Page Not Found
          </h2>

          <p className="text-lg md:text-xl text-[#C9C9C9] mb-10 max-w-2xl mx-auto">
            The recording session you&apos;re looking for seems to have been
            lost in the mix. Let&apos;s get you back to the main track.
          </p>

          {/* Decorative element - Sound wave */}
          <div className="w-full max-w-md mx-auto mb-10 py-4">
            <div className="flex items-center justify-center gap-1 h-16">
              {[...Array(24)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-[#A87740] to-[#FBDDA3] rounded-full animate-pulse"
                  style={{
                    height: `${Math.sin(i / 3) * 40 + 40}%`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Return Home Button */}
          <Link
            href="/"
            className="inline-block py-4 px-8 bg-gradient-to-r from-[#c79a66] via-[#eace96] to-[#A87740] text-black font-bold text-lg uppercase tracking-wider rounded transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            Back to Homepage
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
