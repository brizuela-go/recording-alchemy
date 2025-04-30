import { syncSubscriberWithMailerLite } from "@/lib/mailerlite";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const groupId = process.env.MAILER_LITE_PDF_GROUP_ID || "";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email } = body;

    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "127.0.0.1";

    if (!name || !email) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    await syncSubscriberWithMailerLite(email, name, groupId, ip);

    return NextResponse.json(
      { message: "Form submitted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
