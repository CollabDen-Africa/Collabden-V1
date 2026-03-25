"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ROUTES } from "@/constants/routes";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white overflow-hidden">
      {/* Left Side: Form Content */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center items-center px-8 sm:px-16 lg:px-24 py-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {children}
        </motion.div>
      </div>

      {/* Right Side: Image/Branding Section */}
      <div className="hidden lg:flex lg:w-[55%] relative p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full h-full bg-black rounded-[60px] overflow-hidden border-[3px] border-[#73BF44] shadow-2xl flex items-center justify-center p-8"
          style={{
            // Organic curved shape as seen in the image
            clipPath: "polygon(10% 0%, 100% 0%, 100% 100%, 5% 100%, 0% 80%, 3% 50%, 0% 20%)",
          }}
        >
          {/* Top Navigation in Image Section */}
          <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-10">
            <Link
              href={ROUTES.HOME}
              className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium flex items-center gap-2 hover:bg-white/20 transition-all border border-white/20"
            >
              <span>Back to website</span>
              <div className="w-5 h-5 bg-[#73BF44] rounded-full flex items-center justify-center text-[10px]">
                ↗
              </div>
            </Link>

            <div className="flex items-center">
              <Image
                src="/collabden-logo.png"
                alt="Collabden"
                width={120}
                height={30}
                className="brightness-0 invert opacity-90"
              />
            </div>
          </div>

          {/* Background Decorative Element (Subtle Glow) */}
          <div className="absolute inset-0 bg-linear-to-br from-[#204F99]/20 to-transparent pointer-events-none" />

          {/* Main Visual Asset */}
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/cyberpunk-headphone.jpg"
              alt="Collabden Headphones"
              fill
              className="object-contain p-12 transition-transform duration-700 hover:scale-105"
              priority
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
