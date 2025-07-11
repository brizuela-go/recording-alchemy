"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [loading, setLoading] = useState(false);
  const [loadingRedirect, setLoadingRedirect] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      router.push("/courses");
    } else {
      setLoadingRedirect(false);
    }
  }, [router]);

  const [isEmailValid, setIsEmailValid] = useState(false);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  }, [email]);

  const sendCode = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        // Check if this is a real success (authorized user) or generic message (unauthorized user)
        if (data.message === "Verification code sent successfully") {
          // Authorized user - proceed to code step
          setStep("code");
          toast.success("Code sent to your email");
        } else {
          // Unauthorized user - show generic message but don't proceed to code step
          toast.success(
            data.message ||
              "If the user with this email has already purchased a course, it will be reflected accordingly."
          );
        }
      } else {
        toast.error(data.error || "Failed to send code");
      }
    } catch (error) {
      console.error("Error sending code:", error);
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  const verifyCode = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", data.user.name || "");
        toast.success("Welcome!");
        router.push("/courses");
      } else {
        const error = await res.json();
        toast.error(error.error || "Invalid code");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  if (loadingRedirect) return null;

  return (
    <div className="min-h-screen bg-black flex items-center flex-col gap-10 justify-center p-4">
      <Image
        src="/images/logo.png"
        alt="Recording Alchemy"
        width={329}
        height={80}
        className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[329px] h-auto"
        priority
      />
      <div className="bg-neutral-900 p-8 rounded-lg border border-neutral-800 w-full max-w-md">
        <h1 className="font-cinzel text-2xl font-bold text-white mb-6 text-center">
          Access Your Courses
        </h1>

        <p className="text-gray-400 text-sm mb-4 text-center">
          To access the courses, you must have purchased a Recording Alchemy
          plan.
        </p>

        {step === "email" ? (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              sendCode();
            }}
          >
            <input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-black border border-gray-600 rounded text-white focus-within:ring-2 focus:ring-[#ECC578] focus-within:ring-opacity-50 transition"
            />
            <button
              type="submit"
              disabled={loading || !isEmailValid}
              className="w-full py-3 rounded-sm px-4 md:p-3 bg-gradient-to-r from-[#FBDDA3] via-[#E3B887] text-sm to-[#A87740] font-poppins font-semibold text-black uppercase transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]  disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100  "
            >
              {loading ? "Sending..." : "Send Code"}
            </button>
          </form>
        ) : (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              verifyCode();
            }}
          >
            <p className="text-gray-400 text-sm">
              Enter the 6-digit code sent to {email}
            </p>
            <input
              type="text"
              placeholder="123456"
              value={code}
              onChange={(e) =>
                setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              className="w-full p-3 bg-black border border-gray-600 rounded text-white text-center text-xl tracking-widest"
            />
            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full py-3 rounded-sm px-4 md:p-3 bg-gradient-to-r from-[#FBDDA3] via-[#E3B887] text-sm to-[#A87740] font-poppins font-semibold text-black uppercase transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed hover:scale-100"
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>
            <button
              type="button"
              onClick={() => setStep("email")}
              className="w-full py-2 tracking-wide text-gray-400 hover:text-white cursor-pointer uppercase px-4 font-poppins text-sm bg-neutral-800/30 rounded-sm transition-colors duration-300 hover:bg-neutral-800"
            >
              Go Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
