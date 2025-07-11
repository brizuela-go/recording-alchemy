// lib/sanity/richText.tsx - Rich text renderer for descriptions

import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import type { TypedObject } from "@portabletext/types";

interface RichTextProps {
  content: TypedObject | TypedObject[]; // Use correct type for PortableText value
  className?: string;
}

interface ComponentProps {
  children?: React.ReactNode;
}

const components: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }: ComponentProps) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    h1: ({ children }: ComponentProps) => (
      <h1 className="text-3xl font-bold mb-4 font-cinzel">{children}</h1>
    ),
    h2: ({ children }: ComponentProps) => (
      <h2 className="text-2xl font-bold mb-3 font-cinzel">{children}</h2>
    ),
    h3: ({ children }: ComponentProps) => (
      <h3 className="text-xl font-bold mb-2 font-cinzel">{children}</h3>
    ),
    blockquote: ({ children }: ComponentProps) => (
      <blockquote className="border-l-4 border-[#ECC578] pl-4 italic mb-4 text-neutral-300">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: ComponentProps) => (
      <ul className="mb-4 ml-6 list-disc space-y-1 marker:text-[#ECC578]">
        {children}
      </ul>
    ),
    number: ({ children }: ComponentProps) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1 marker:text-[#ECC578]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: ComponentProps) => (
      <li className="leading-relaxed">{children}</li>
    ),
    number: ({ children }: ComponentProps) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: ComponentProps) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }: ComponentProps) => (
      <em className="italic">{children}</em>
    ),
    underline: ({ children }: ComponentProps) => (
      <span className="underline">{children}</span>
    ),
  },
};

export function RichText({ content, className = "" }: RichTextProps) {
  if (!content) return null;

  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      <PortableText value={content} components={components} />
    </div>
  );
}
