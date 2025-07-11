// sanity/schemaTypes/userProgress.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "userProgress",
  title: "User Progress",
  type: "document",
  fields: [
    defineField({
      name: "userEmail",
      title: "User Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "chapterId",
      title: "Chapter ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "chapterTitle",
      title: "Chapter Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "courseId",
      title: "Course ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "courseTitle",
      title: "Course Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "completed",
      title: "Completed",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "watchTimeSeconds",
      title: "Watch Time (seconds)",
      type: "number",
      validation: (Rule) => Rule.min(0),
      initialValue: 0,
      description: "Set from chapter duration when completed",
    }),
    defineField({
      name: "completedAt",
      title: "Completed At",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      userEmail: "userEmail",
      courseTitle: "courseTitle",
      chapterTitle: "chapterTitle",
      completed: "completed",
    },
    prepare(selection) {
      const { userEmail, courseTitle, chapterTitle, completed } = selection;
      return {
        title: `${userEmail}`,
        subtitle: `${courseTitle} → ${chapterTitle} • ${
          completed ? "✓ Completed" : "Not Completed"
        }`,
      };
    },
  },
});
