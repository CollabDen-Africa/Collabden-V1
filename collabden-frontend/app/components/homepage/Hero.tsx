"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

const Hero = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                {/* Top Blue Glow */}
                <div className="absolute top-[-25%] left-1/2 -translate-x-1/2 w-[120%] h-[100%] bg-[radial-gradient(circle_at_center,_var(--primary-blue)_0%,_transparent_70%)] opacity-40 blur-[120px] pointer-events-none" />

                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                >
                    <source src="hero_video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* Dark Overlay for contrast */}
                <div className="absolute inset-0 bg-black/60 z-10" />
            </div>

            {/* Hero Content */}
            <div className="relative z-20 container mx-auto px-6 text-center text-white">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold max-w-5xl mx-auto leading-tight md:leading-tight mb-8">
                    Where Africa&apos;s Music Professionals Collaborate, Get Paid, And Grow
                </h1>

                <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
                    Stop juggling tools. Seamlessly share files, communicate, manage projects, and get paid all in one place.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Button variant="white" size="lg">
                        Learn how it works
                    </Button>
                    <Button
                        variant="primary"
                        size="lg"
                        icon={ArrowRight}
                    >
                        Join the Waitlist
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
