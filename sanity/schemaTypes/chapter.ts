// sanity/schemaTypes/chapter.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "chapter",
  title: "Chapter",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Chapter Title",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Chapter Description",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "videoType",
      title: "Video Type",
      type: "string",
      options: {
        list: [
          { title: "Upload Video File", value: "upload" },
          { title: "External URL", value: "url" },
          { title: "YouTube (Unlisted/Private)", value: "youtube" },
        ],
      },
      initialValue: "upload",
    }),
    defineField({
      name: "videoFile",
      title: "Video File",
      type: "mux.video",
      hidden: ({ parent }) => parent?.videoType !== "upload",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      hidden: ({ parent }) => parent?.videoType !== "url",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as any;
          if (parent?.videoType === "url" && !value) {
            return "Video URL is required when using external URL";
          }
          return true;
        }),
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      description:
        "Use unlisted or private YouTube videos for security. Supports youtube.com/watch?v= and youtu.be/ formats",
      hidden: ({ parent }) => parent?.videoType !== "youtube",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as any;
          if (parent?.videoType === "youtube" && !value) {
            return "YouTube URL is required when using YouTube";
          }

          // Validate YouTube URL format
          if (value && parent?.videoType === "youtube") {
            const youtubeRegex =
              /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/;
            if (!youtubeRegex.test(value)) {
              return "Please enter a valid YouTube URL (youtube.com/watch?v= or youtu.be/)";
            }
          }

          return true;
        }),
    }),
    defineField({
      name: "thumbnail",
      title: "Chapter Thumbnail",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),
    defineField({
      name: "duration",
      title: "Duration (minutes)",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(300), // 1 minute to 5 hours
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: "isFree",
      title: "Free Preview",
      type: "boolean",
      initialValue: false,
      description: "Allow non-enrolled users to watch this chapter",
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "order",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      duration: "duration",
      order: "order",
      media: "thumbnail",
      isFree: "isFree",
      videoType: "videoType",
    },
    prepare(selection) {
      const { title, duration, order, isFree, videoType } = selection;
      const videoTypeLabel =
        videoType === "youtube" ? "📺" : videoType === "upload" ? "📁" : "🔗";
      return {
        title: `${order}. ${title}`,
        subtitle: `${duration} min ${videoTypeLabel} ${
          isFree ? "• Free Preview" : ""
        }`,
        media: selection.media,
      };
    },
  },
});
