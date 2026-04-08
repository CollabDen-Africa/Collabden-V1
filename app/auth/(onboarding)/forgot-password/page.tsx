"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HiOutlineArrowLeft } from "react-icons/hi";
import { HugeiconsIcon } from '@hugeicons/react';
import { SquareUnlock02Icon } from '@hugeicons/core-free-icons';
import { authService } from '@/app/services/authServices';
import Button from '@/app/components/ui/Button';

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // The forgot-password endpoint
            const result = await authService.forgotPassword(email);

            if (result.message === "Password reset email sent") {
                // Redirect to the verify-reset page with the email in the URL
                // This allows the next page to display "Check your mail at th***@..."
                router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
            } else {
                setError(result.message || "Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("Network error.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[517px] flex flex-col items-center animate-in fade-in zoom-in-95 duration-500 font-raleway">
            
            <div className="w-full flex flex-col gap-[48px]">

                {/* Top Section */}
                <div className="flex flex-col items-center gap-[32px] w-full">
                    
                    {/* Key Icon */}
                    <div className="w-[124px] h-[124px] bg-white/50 border border-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
                        <HugeiconsIcon 
                            icon={SquareUnlock02Icon} 
                            className="w-[60px] h-[60px] text-white" 
                            strokeWidth={0.5} 
                        />
                    </div>

                    {/* Title Row */}
                    <div className="flex flex-row items-center gap-[32px] w-full md:pr-[40px] justify-center">
                        <Link 
                            href="/auth/login" 
                            className="w-[40px] h-[40px] border-[1.5px] border-white rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors shrink-0"
                        >
                            <HiOutlineArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-[32px] leading-[40px] font-semibold text-white">
                            Forgot password?
                        </h1>
                    </div>

                    {/* Subtitle */}
                    <p className="text-[18px] leading-[21px] font-normal text-white text-center px-2">
                        Enter your email and we'll send you a link <br /> to reset your password
                    </p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[48px]">
                    
                    {/* Input Group */}
                    <div className="flex flex-col gap-[8px] w-full relative">
                        <label htmlFor="email" className="text-[18px] leading-[22px] font-semibold text-white pl-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            placeholder="Johndoe@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full h-[52px] px-[16px] bg-transparent border rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white focus:bg-white/10 transition-all text-[16px] font-medium ${
                                error ? 'border-accent-red' : 'border-white'
                            }`}
                        />
                        {error && (
                            <p className="absolute -bottom-6 left-2 text-accent-red text-xs font-medium">
                                {error}
                            </p>
                        )}
                    </div>

                    {/* Action Button */}
                    <Button 
                        variant="primary" 
                        type="submit"
                        loading={loading}
                        className="w-full py-4 rounded-[24px] text-[18px] font-semibold shadow-lg"
                    >
                        Continue
                    </Button>
                </form>

            </div>
        </div>
    );
}