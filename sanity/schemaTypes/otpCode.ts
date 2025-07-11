// sanity/schemaTypes/otpCode.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "otpCode",
  title: "OTP Code",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "code",
      title: "Code",
      type: "string",
      validation: (Rule) => Rule.required().length(6),
    }),
    defineField({
      name: "used",
      title: "Used",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "attempts",
      title: "Verification Attempts",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: "expiresAt",
      title: "Expires At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      email: "email",
      code: "code",
      used: "used",
      expiresAt: "expiresAt",
    },
    prepare(selection) {
      const { email, code, used, expiresAt } = selection;
      const isExpired = new Date(expiresAt) < new Date();
      const status = used ? "Used" : isExpired ? "Expired" : "Active";

      return {
        title: `${email} - ${code}`,
        subtitle: `Status: ${status}`,
      };
    },
  },
});
