"use client";

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { authService } from '@/app/services/authServices';
import Button from '@/app/components/ui/Button';

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const emailVerification = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setErrorMessage("Invalid or missing verification link.");
        setStatus('error');
        return;
      }

      try {
        const result = await authService.verifyEmail(token);

        if (result.message === "Email verified successfully") {
          setStatus('success');
        } else {
          setErrorMessage(result.message || "Link may be expired or already used.");
          setStatus('error');
        }
      } catch (err) {
        setErrorMessage("Network error. Please ensure the backend is running.");
        setStatus('error');
      }
    };

    emailVerification();
  }, [searchParams]);

  return (
    <div className="w-full max-w-[517px] flex flex-col items-center animate-in fade-in zoom-in-95 duration-500 font-raleway">
      
      {/* VERIFYING STATE */}
      {status === 'verifying' && (
        <div className="flex flex-col items-center py-10">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4" />
          <h2 className="text-xl font-semibold text-white">Finalizing account...</h2>
        </div>
      )}

      {/* SUCCESS STATE */}
      {status === 'success' && (
        <>
          <div className="w-[124px] h-[124px] mb-8 bg-white/80 border border-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
            <HiCheckCircle className="w-[100px] h-[100px] text-primary-green" />
          </div>

          <h1 className="text-2xl md:text-[32px] leading-[40px] font-semibold text-white text-center mb-8">
            Welcome to CollabDen
          </h1>

          <p className="text-[16px] md:text-[18px] leading-[1.4] md:leading-[21px] font-normal text-white text-center mb-16">
            You’re all set! Let’s get your profile ready so you can start collaborating.
          </p>

          <Link href="/intro/step-1" className="w-full">
            <Button 
              variant="primary" 
              className="w-full py-[16px] rounded-[24px] text-[18px] shadow-lg"
            >
              Set up profile
            </Button>
          </Link>
        </>
      )}

      {/* ERROR STATE */}
      {status === 'error' && (
        <>
          <div className="w-[124px] h-[124px] mb-8 bg-white/20 border border-white/40 rounded-full flex items-center justify-center shrink-0 shadow-lg">
            <HiXCircle className="w-[100px] h-[100px] text-white" />
          </div>

          <h1 className="text-2xl md:text-[32px] leading-[40px] font-semibold text-white text-center mb-8">
            Verification Failed. Please verify your email again
          </h1>

          <p className="text-[16px] md:text-[18px] leading-[1.4] md:leading-[21px] font-normal text-white text-center mb-16">
            {errorMessage}
          </p>

          <Link href="/verifyemail" className="w-full">
            <Button 
              variant="secondary" 
              className="w-full py-[16px] rounded-[24px] text-[18px] border-white/30"
            >
              Resend Link
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  );
}