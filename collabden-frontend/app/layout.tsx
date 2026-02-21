import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import BackgroundPattern from "./components/background/BackgroundPattern";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CollabDen",
  description: "CollabDen Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} antialiased`}
        suppressHydrationWarning
      >
        <BackgroundPattern />
        <div className="content-wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}

