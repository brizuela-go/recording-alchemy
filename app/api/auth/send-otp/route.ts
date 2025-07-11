// app/api/auth/send-otp/route.ts - Simple fix: just validate allowed users
import { sendOTP } from "@/lib/mail";
import { client } from "@/sanity/lib/client";
import { mutationClient } from "@/sanity/lib/mutationClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Valid email address is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    // 🔒 SECURITY FIX: Check if user is in allowedUser list BEFORE sending OTP
    const allowedUser = await client.fetch(
      `*[_type == "allowedUser" && email == $email && active == true][0]`,
      { email: normalizedEmail }
    );

    if (!allowedUser) {
      console.log(
        `OTP request denied for unauthorized email: ${normalizedEmail}`
      );
      // Return success message to prevent email enumeration
      return NextResponse.json({
        message:
          "If the user with this email has already purchased a course, it will be reflected accordingly.",
      });
    }

    // Check for recent OTP requests (rate limiting)
    const recentOTP = await client.fetch(
      `*[_type == "otpCode" && email == $email && _createdAt > $timeLimit][0]`,
      {
        email: normalizedEmail,
        timeLimit: new Date(Date.now() - 60 * 1000).toISOString(), // 1 minute ago
      }
    );

    if (recentOTP) {
      return NextResponse.json(
        { error: "Please wait before requesting another code" },
        { status: 429 }
      );
    }

    // Clean up old unused OTPs for this email
    const oldOTPs = await client.fetch(
      `*[_type == "otpCode" && email == $email && (used == true || expiresAt < now())]`,
      { email: normalizedEmail }
    );

    for (const otp of oldOTPs) {
      await mutationClient.delete(otp._id);
    }

    // Generate secure 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store in Sanity
    await mutationClient.create({
      _type: "otpCode",
      email: normalizedEmail,
      code,
      expiresAt: expiresAt.toISOString(),
      used: false,
      attempts: 0,
    });

    // Send email
    const emailResult = await sendOTP(normalizedEmail, code);

    if (!emailResult.success) {
      console.error("Email send failed:", emailResult.error);
      return NextResponse.json(
        { error: "Failed to send verification code. Please try again." },
        { status: 500 }
      );
    }

    console.log(`OTP sent successfully to authorized user: ${normalizedEmail}`);

    return NextResponse.json({
      message: "Verification code sent successfully",
      email: normalizedEmail,
    });
  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
