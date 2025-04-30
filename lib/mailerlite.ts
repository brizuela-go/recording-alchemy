// For ECMAScript (ESM)
import MailerLite from "@mailerlite/mailerlite-nodejs";

const mailerlite = new MailerLite({
  api_key: process.env.MAILER_LITE_API_TOKEN || "",
});

export async function syncSubscriberWithMailerLite(
  email: string,
  name: string,
  groupId: string,
  ip: string
) {
  try {
    const params = {
      email: email,
      fields: {
        name: name || email.split("@")[0],
      },
      ip_address: ip,
      groups: [groupId],
      status: "active" as const,
      subscribed_at: new Date()
        .toISOString()
        .replace("T", " ")
        .substring(0, 19),
    };

    const response = await mailerlite.subscribers.createOrUpdate(params);
    console.log("MailerLite subscription successful:", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("MailerLite subscription error:", error);
  }
}
