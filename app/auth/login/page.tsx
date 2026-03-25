"use client";

import { useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaApple } from "react-icons/fa";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="space-y-8">
      <div className="text-center lg:text-left space-y-3">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Welcome Back!</h1>
        <p className="text-gray-500 font-medium">Continue collaborating with creators who get you</p>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 block">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@example.com"
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#73BF44] focus:ring-4 focus:ring-[#73BF44]/10 transition-all outline-none text-gray-900 placeholder:text-gray-400 font-medium bg-white"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2 relative">
          <label className="text-sm font-semibold text-gray-700 block">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="............"
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#73BF44] focus:ring-4 focus:ring-[#73BF44]/10 transition-all outline-none text-gray-900 placeholder:text-gray-400 font-medium bg-white pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
          <div className="flex justify-start">
            <Link
              href={ROUTES.AUTH.FORGOT_PASSWORD}
              className="text-xs font-semibold text-[#73BF44] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {/* Sign Up Button (Implement as per image) */}
        <button
          className="w-full py-4 bg-[#73BF44]/40 text-white font-bold rounded-full hover:bg-[#73BF44]/60 transition-all shadow-lg shadow-[#73BF44]/10"
        >
          Sign Up
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center py-2">
          <div className="grow border-t border-gray-100"></div>
          <span className="shrink mx-4 text-xs font-medium text-gray-400 uppercase tracking-widest">
            Or continue with
          </span>
          <div className="grow border-t border-gray-100"></div>
        </div>

        {/* Social Logins */}
        <div className="flex items-center justify-center gap-6">
          <button className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-100 bg-white text-black hover:bg-gray-50 transition-all shadow-sm">
            <FaApple size={24} />
          </button>
          <button className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-100 bg-white hover:bg-gray-50 transition-all shadow-sm">
            <FaGoogle className="text-red-500" size={20} />
          </button>
          <button className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-100 bg-white text-blue-600 hover:bg-gray-50 transition-all shadow-sm">
            <FaFacebook size={22} />
          </button>
        </div>

        {/* Footer Link */}
        <div className="text-center pt-2">
          <p className="text-sm font-semibold text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href={ROUTES.AUTH.SIGNUP} className="text-[#73BF44] hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
