"use client";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { HiOutlineArrowLeft } from "react-icons/hi";
import { HugeiconsIcon } from '@hugeicons/react';
import { SquareUnlock02Icon } from '@hugeicons/core-free-icons';
import { authService } from '@/app/services/authServices';
import Button from '@/app/components/ui/Button';

function VerifyResetContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || "your email";
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleResend = async () => {
    setLoading(true);
    setStatus('idle');
    try {
      // The forgot-password endpoint
      const result = await authService.forgotPassword(email);
      
      if (result.message === "Password reset email sent") {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[517px] flex flex-col items-center animate-in fade-in zoom-in-95 duration-500 font-raleway">
      
      {/* Icon Wrapper */}
      <div className="w-[124px] h-[124px] mb-8 bg-white/50 border border-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
        <HugeiconsIcon 
          icon={SquareUnlock02Icon} 
          className="w-[60px] h-[60px] text-white" 
          strokeWidth={0.5} 
        />
      </div>

      {/* Title Row */}
      <div className="flex flex-row items-center gap-[32px] w-full md:pr-[40px] justify-center mb-8">
        <Link 
          href="/auth/forgot-password" 
          className="w-[40px] h-[40px] border-[1.5px] border-white rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors shrink-0"
        >
          <HiOutlineArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-[32px] leading-[40px] font-semibold text-white">
          Password Reset
        </h1>
      </div>

      {/* Dynamic Body Text */}
      <div className="flex flex-col gap-6 mb-16">
        <p className="text-[16px] md:text-[18px] leading-[1.4] md:leading-[21px] font-normal text-white text-center">
          We've sent a reset link to <span className="font-bold">{email}. </span>
          Open it to create a new password.
        </p>
        
        <p className="text-[16px] md:text-[18px] leading-[1.4] md:leading-[21px] font-normal text-white text-center">
          Didn't see the mail? Check your <span className="font-bold">spam</span> or <span className="font-bold">promotions</span> folder.
        </p>
      </div>

      {/* Action Button */}
      <Button 
        variant="primary" 
        onClick={handleResend}
        loading={loading}
        className="w-full py-4 rounded-[24px] text-[18px] font-semibold"
      >
        {status === 'success' ? 'Link Sent!' : 'Resend Link'}
      </Button>

      {/* Status Feedback */}
      {status === 'error' && (
        <p className="mt-4 text-accent-red font-medium text-sm">
          Failed to resend. Please try again later.
        </p>
      )}
      
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <VerifyResetContent />
    </Suspense>
  );
}