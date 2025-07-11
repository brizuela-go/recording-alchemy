// lib/email.ts - Simple email with Loops
import { LoopsClient } from "loops";

const loops = new LoopsClient(process.env.LOOPS_API_KEY!);

export async function sendOTP(email: string, code: string) {
  try {
    await loops.sendTransactionalEmail({
      transactionalId: "cmcf5r9a6026o050i80era1kv",
      email,
      dataVariables: {
        otp_code: code,
        user_email: email,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}

export async function sendCompletionNotification(
  email: string,
  chapterTitle: string,
  courseTitle: string
) {
  try {
    await loops.sendTransactionalEmail({
      transactionalId: "clp0987654321", // Replace with your actual Loops template ID
      email,
      dataVariables: {
        chapter_title: chapterTitle,
        course_title: courseTitle,
        user_email: email,
        dashboard_url: `${
          process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
        }/courses`,
        support_email: "jamin@recordingalchemy.com",
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Completion notification error:", error);
    return { success: false, error: error };
  }
}

export async function sendWelcomeEmail(email: string, userName: string = "") {
  try {
    const firstName = userName ? userName.split(" ")[0] : "there";

    await loops.sendTransactionalEmail({
      transactionalId: "TODO", // Replace with your actual Loops template ID
      email,
      dataVariables: {
        user_name: firstName,
        user_email: email,
        courses_url: `${
          process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
        }/courses`,
        support_email: "jamin@recordingalchemy.com",
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Welcome email error:", error);
    return { success: false, error: error };
  }
}
