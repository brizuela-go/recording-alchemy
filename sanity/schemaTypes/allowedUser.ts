// sanity/schemaTypes/allowedUser.ts - Simple allowedUser schema
import { defineField, defineType } from "sanity";

export default defineType({
  name: "allowedUser",
  title: "Allowed Users",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
      description: "Whether this user can access the platform",
    }),
    defineField({
      name: "addedAt",
      title: "Added At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "lastLogin",
      title: "Last Login",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      active: "active",
    },
    prepare(selection) {
      const { title, subtitle, active } = selection;
      return {
        title: title,
        subtitle: `${subtitle} ${active ? "✓ Active" : "✗ Inactive"}`,
      };
    },
  },
});
