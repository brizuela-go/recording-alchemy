// app/api/auth/verify-otp/route.ts - Simple fix: validate allowed user here too
import { client } from "@/sanity/lib/client";
import { mutationClient } from "@/sanity/lib/mutationClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, code } = body;

    // Validate inputs
    if (
      !email ||
      !code ||
      typeof email !== "string" ||
      typeof code !== "string"
    ) {
      return NextResponse.json(
        { error: "Email and verification code are required" },
        { status: 400 }
      );
    }

    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      return NextResponse.json(
        { error: "Please enter a valid 6-digit code" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    // 🔒 SECURITY FIX: Double-check user is still in allowedUser list
    const allowedUser = await client.fetch(
      `*[_type == "allowedUser" && email == $email && active == true][0]`,
      { email: normalizedEmail }
    );

    if (!allowedUser) {
      console.log(
        `Verification attempt denied for unauthorized email: ${normalizedEmail}`
      );
      return NextResponse.json(
        {
          error:
            "Access denied. Please contact support if you believe this is an error.",
        },
        { status: 403 }
      );
    }

    // Find valid OTP
    const otpRecord = await client.fetch(
      `*[_type == "otpCode" && email == $email && code == $code && used == false][0]`,
      { email: normalizedEmail, code }
    );

    if (!otpRecord) {
      return NextResponse.json(
        { error: "Invalid verification code" },
        { status: 400 }
      );
    }

    // Check if expired
    if (new Date(otpRecord.expiresAt) < new Date()) {
      await mutationClient.patch(otpRecord._id).set({ used: true }).commit();
      return NextResponse.json(
        { error: "Verification code has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Check attempts (max 3)
    if (otpRecord.attempts >= 3) {
      await mutationClient.patch(otpRecord._id).set({ used: true }).commit();
      return NextResponse.json(
        { error: "Too many attempts. Please request a new code." },
        { status: 400 }
      );
    }

    // Mark OTP as used
    await mutationClient
      .patch(otpRecord._id)
      .set({
        used: true,
        usedAt: new Date().toISOString(),
      })
      .commit();

    // Update last login
    await mutationClient
      .patch(allowedUser._id)
      .set({
        lastLogin: new Date().toISOString(),
      })
      .commit();

    console.log(`Successful login: ${normalizedEmail}`);

    return NextResponse.json({
      success: true,
      message: "Verification successful",
      user: {
        email: normalizedEmail,
        name: allowedUser.name || "",
        id: allowedUser._id,
      },
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
