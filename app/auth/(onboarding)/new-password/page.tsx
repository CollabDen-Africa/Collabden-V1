"use client";

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { HugeiconsIcon } from '@hugeicons/react';
import { SquareUnlock02Icon } from '@hugeicons/core-free-icons';
import { authService } from '@/app/services/authServices';
import Button from '@/app/components/ui/Button';

function NewPasswordContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Frontend Validation
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        // To extract the token from URL (sent in the reset email)
        const token = searchParams.get('token');
        if (!token) {
            setError("Missing or invalid reset token. Please request a new link.");
            return;
        }

        setLoading(true);
        try {
            // Call backend endpoint
            const result = await authService.resetPassword(token, password);

            if (result.message === "Password reset successful") {
                // Redirect to success state
                router.push('/auth/password-updated');
            } else {
                setError(result.message || "Failed to reset password.");
            }
        } catch (err) {
            setError("Network error. Please ensure the backend is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[517px] flex flex-col items-center animate-in fade-in zoom-in-95 duration-500 font-raleway">
            
            <div className="w-full flex flex-col gap-[40px]">

                {/* Top Section */}
                <div className="flex flex-col gap-[24px] w-full">
                    
                    {/* Headers */}
                    <div className="flex flex-col items-center gap-[32px] w-full">
                        <div className="w-[124px] h-[124px] bg-white/60 border border-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
                            <HugeiconsIcon icon={SquareUnlock02Icon} className="w-[60px] h-[60px] text-white" strokeWidth={0.5} />
                        </div>

                        <h1 className="text-[32px] leading-[40px] font-semibold text-white text-center">
                            Create a new password
                        </h1>

                        <p className="text-[18px] leading-[21px] font-normal text-white text-center px-2 mb-[8px]">
                            Choose a new password to secure your account <br /> and get back to work
                        </p>
                    </div>

                    {/* Form Inputs */}
                    <form id="new-password-form" onSubmit={handleSubmit} className="w-full flex flex-col gap-[16px]">
                        
                        {/* New Password Group */}
                        <div className="flex flex-col w-full relative">
                            <div className="flex flex-col gap-[8px] w-full">
                                <label htmlFor="password" className="text-[18px] leading-[22px] font-semibold text-white pl-4">
                                    New Password
                                </label>
                                <div className="relative w-full">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        placeholder="Enter new password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`w-full h-[52px] pl-[20px] pr-[50px] bg-transparent border rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white focus:bg-white/10 transition-all text-[16px] font-medium ${error ? 'border-accent-red' : 'border-white'}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-[20px] top-1/2 -translate-y-1/2 text-white/50 hover:text-white/90 transition-colors"
                                    >
                                        {showPassword ? <HiOutlineEyeOff className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                            <p className="text-[14px] leading-[18px] font-normal text-white/90 pl-4 mt-[12px] mb-[8px]">
                                At least 8 characters, include a number
                            </p>
                        </div>

                        {/* Confirm Password Group */}
                        <div className="flex flex-col gap-[8px] w-full">
                            <label htmlFor="confirmPassword" className="text-[18px] leading-[22px] font-semibold text-white pl-4">
                                Confirm Password
                            </label>
                            <div className="relative w-full">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    placeholder="Re-enter new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={`w-full h-[52px] pl-[20px] pr-[50px] bg-transparent border rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white focus:bg-white/10 transition-all text-[16px] font-medium ${error ? 'border-accent-red' : 'border-white'}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-[20px] top-1/2 -translate-y-1/2 text-white/50 hover:text-white/90 transition-colors"
                                >
                                    {showConfirmPassword ? <HiOutlineEyeOff className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="text-accent-red text-center font-medium text-sm mt-2 animate-in fade-in slide-in-from-top-1">
                                {error}
                            </p>
                        )}
                    </form>
                </div>

                {/* Primary Button */}
                <Button 
                    variant="primary"
                    type="submit"
                    form="new-password-form"
                    loading={loading}
                    className="w-full py-4 rounded-[24px] text-[18px] font-semibold shadow-lg"
                >
                    Update Password
                </Button>

            </div>
        </div>
    );
}

export default function NewPasswordPage() {
    return (
        <Suspense fallback={<div className="text-white">Loading...</div>}>
            <NewPasswordContent />
        </Suspense>
    );
}