import type { Metadata } from "next";
import { Cinzel, Inter, Poppins } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Recording Alchemy - Jamin Dillen",
  description:
    "Unlock Your Voice, Transform Your Sound. I've helped artists break through their creative blocks, record their first songs, and finally hear their music the way they've always imagined it.",
  openGraph: {
    title: "Recording Alchemy - Jamin Dillen",
    description:
      "Unlock Your Voice, Transform Your Sound. I've helped artists break through their creative blocks, record their first songs, and finally hear their music the way they've always imagined it.",
    url: "https://recordingalchemy.com",
    images: [
      {
        url: "https://recordingalchemy.com/og.png",
        width: 1200,
        height: 630,
        alt: "Recording Alchemy - Jamin Dillen",
      },
    ],
    siteName: "Recording Alchemy",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cinzel.variable} ${poppins.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
