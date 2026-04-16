import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "./globals.css";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "FMM - Fund Me Mommy",
  description:
    "Your mommy didn't approve your idea, but we will. Get useful insights into noteworthy tech projects and founders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${merriweather.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-merriweather overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}