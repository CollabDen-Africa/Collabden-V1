"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); 

  const isFormValid = useMemo(() => {
    return (
      name.trim().length >= 2 &&
      email.trim().length > 0 &&
      password.trim().length > 0 &&
      agreedToTerms
    );
  }, [name, email, password, agreedToTerms]);
  
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isFormValid) return;
  
      setLoading(true);
      setError(null);
  
      try {
        // The signup endpoint
        const result = await authService.signUp({ name, email, password });
  
        if (result.user) {
          // On success, redirect to the verify-email page
          router.push(`/auth/verify-email?email=${encodeURIComponent(email)}`);
        } else {
          setError(result.message || "Signup failed. Please try again.");
        }
      } catch (err) {
        setError("Network error.");
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl mb-4 font-bold text-gray-900 tracking-tight">
          Create an account
        </h1>
        <p className="text-gray-500 font-medium text-base">
          Start your journey with creators who get you.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {error && <p className="text-accent-red text-sm text-center font-medium">{error}</p>}
        
                {/* Name Field */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-text-main block">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-full border border-border-muted focus:border-primary-green focus:ring-4 focus:ring-(--primary-green)/10 transition-all outline-none text-text-main placeholder:text-text-muted font-medium bg-white"
                  />
                </div>
        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-text-main block">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abc@youremail.com"
            className="w-full px-4 py-3 rounded-full border border-border-muted focus:border-primary-green focus:ring-4 focus:ring-(--primary-green)/10 transition-all outline-none text-text-main placeholder:text-text-muted font-medium bg-white"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-text-main block">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="............"
              className="w-full px-4 py-3 rounded-full border border-border-muted focus:border-primary-green focus:ring-4 focus:ring-(--primary-green)/10 transition-all outline-none text-text-main placeholder:text-text-muted font-medium bg-white pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            At least 8 characters, include a number
          </p>
        </div>

        {/* Terms Checkbox */}
        <div
          className="flex items-start gap-3 cursor-pointer group select-none"
          onClick={() => setAgreedToTerms(!agreedToTerms)}
        >
          <div
            className={`mt-0.5 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 shrink-0 ${agreedToTerms
              ? "bg-primary-green border-primary-green shadow-circle-check"
              : "border-border-muted group-hover:border-primary-green"
              }`}
          >
            {agreedToTerms && (
              <div className="h-2 w-2 rounded-full bg-white transition-all scale-100" />
            )}
          </div>
          <span className="text-sm text-gray-500 leading-tight">
            I have read and agree to Collabden&apos;s{" "}
            <Link
              href="#"
              className="underline font-semibold decoration-primary-green/30 hover:decoration-primary-green transition-colors text-primary-green"
              onClick={(e) => e.stopPropagation()}
            >
              terms of use
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className="underline font-semibold decoration-primary-green/30 hover:decoration-primary-green transition-colors text-primary-green"
              onClick={(e) => e.stopPropagation()}
            >
              privacy policy
            </Link>
          </span>
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          disabled={!isFormValid || loading}
          className={`w-full py-4 text-white font-bold rounded-full transition-all cursor-pointer disabled:cursor-not-allowed 
            ${isFormValid
              ? "bg-primary-green shadow-btn-primary hover:shadow-btn-hover hover:-translate-y-1 hover:brightness-90 active:scale-[0.98]"
              : "bg-primary-green/60 shadow-none"
            }`}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center py-1">
          <div className="grow border-t border-border-light"></div>
          <span className="shrink mx-4 text-xs font-medium text-text-main uppercase tracking-widest">
            Or continue with
          </span>
          <div className="grow border-t border-border-light"></div>
        </div>

        {/* Social Logins */}
        <div className="flex items-center justify-center gap-6">
          <button
            type="button"
            className="w-12 h-12 flex items-center justify-center rounded-full border border-border-light bg-white hover:bg-gray-50 transition-all cursor-pointer"
          >
            <FaGoogle className="text-red-500" size={20} />
          </button>
        </div>

        {/* Footer Link */}
        <div className="text-center pt-1">
          <p className="text-base font-semibold text-text-main">
            Already have an account?{" "}
            <Link
              href={ROUTES.AUTH.LOGIN}
              className="text-bold hover:underline text-primary-green"
            >
              Log In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
