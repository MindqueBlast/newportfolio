import type { Metadata } from "next";
import { Source_Sans_3, Syne } from "next/font/google";
import { GraphicsProvider } from "@/lib/use-graphics-mode";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Aaditya Sahu — Portfolio",
  description:
    "I build ambitious tools across computer vision, simulation, robotics, mathematics, and software.",
  authors: [{ name: "Aaditya Sahu" }],
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Aaditya Sahu — Portfolio",
    description:
      "Cinematic interactive portfolio — projects, journey, skills, and research by Aaditya Sahu.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <GraphicsProvider>{children}</GraphicsProvider>
      </body>
    </html>
  );
}
