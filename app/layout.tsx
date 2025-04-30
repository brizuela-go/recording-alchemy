import type { Metadata } from "next";
import { Cinzel, Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

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
  title: "Recording Alchemy by Jamin Van Dillen",
  description:
    "Unlock Your Voice, Transform Your Sound. I've helped artists break through their creative blocks, record their first songs, and finally hear their music the way they've always imagined it.",
  openGraph: {
    title: "Recording Alchemy by Jamin Van Dillen",
    description:
      "Unlock Your Voice, Transform Your Sound. I've helped artists break through their creative blocks, record their first songs, and finally hear their music the way they've always imagined it.",
    url: "https://www.recordingalchemy.com/",
    images: ["https://www.recordingalchemy.com/og.png"],
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
        <Toaster
          toastOptions={{
            style: {
              backgroundColor: "#000",
              color: "#E3B887",
              fontFamily: "Helvetica",
              fontSize: "1.1rem",
              borderColor: "#E3B887",
            },
          }}
          position="top-center"
        />
        {children}
      </body>
    </html>
  );
}
