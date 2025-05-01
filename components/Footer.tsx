"use client";

import Image from "next/image";
import Link from "next/link";

const items = [
  {
    label: `© ${new Date().getFullYear()} Recording Alchemy. All rights reserved`,
    href: "",
  },
  {
    label: "Terms and Conditions",
    href: "/terms-and-conditions",
  },
];

export default function Footer() {
  return (
    <footer className="flex w-full justify-between items-center sm:flex-row flex-col px-20 py-16 border-t border-zinc-900 ">
      {/* Logo - Responsive sizing */}
      <div className="transition-transform duration-300 hover:scale-105">
        <Link href={"/"}>
          <Image
            src="/images/logo.png"
            alt="Recording Alchemy"
            width={329}
            height={80}
            className="w-[220px] h-auto"
            priority
          />
        </Link>
      </div>
      <div className="flex justify-center items-center gap-8 max-sm:mt-10 text-center  max-sm:flex-col">
        {items.map(({ href, label }) => {
          return (
            <Link
              key={label}
              className={`text-white cursor-auto ${
                href !== "" &&
                "hover:underline hover:transition duration-200 ease-in-out hover:text-gradient cursor-pointer"
              }`}
              href={href}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </footer>
  );
}
