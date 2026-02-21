"use client";

import React from 'react';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer
            className="relative bg-white/20 backdrop-blur-md overflow-hidden"
            style={{ clipPath: 'polygon(0 0, 75% 15%, 100% 0, 100% 100%, 0 100%)' }}
        >
            <div className="relative z-10 pt-28 pb-8 px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        {/* Company Info */}
                        <div className="space-y-8">
                            <div className="flex items-center">
                                <Image
                                    src="/collabden_logo.png"
                                    alt="CollabDen Logo"
                                    width={180}
                                    height={50}
                                    className="w-48 h-auto object-contain"
                                />
                            </div>
                            <p className="text-white/90 max-w-xs text-lg leading-snug">
                                All-in-one collaboration platform for music professionals
                            </p>
                            <div className="flex gap-3">
                                {/* Instagram */}
                                <div className="w-9 h-9 rounded-md bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white transition-transform hover:scale-110">
                                    <Image src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="IG" width={20} height={20} className="w-5 h-5 shadow-sm" />
                                </div>
                                {/* LinkedIn */}
                                <div className="w-9 h-9 rounded-md bg-[#0077B5] flex items-center justify-center transition-transform hover:scale-110">
                                    <Image src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" alt="LI" width={20} height={20} className="w-5 h-5 invert shadow-sm" />
                                </div>
                                {/* Facebook */}
                                <div className="w-9 h-9 rounded-md bg-[#1877F2] flex items-center justify-center transition-transform hover:scale-110">
                                    <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="FB" width={20} height={20} className="w-5 h-5 invert shadow-sm" />
                                </div>
                                {/* YouTube */}
                                <div className="w-9 h-9 rounded-md bg-[#FF0000] flex items-center justify-center transition-transform hover:scale-110">
                                    <Image src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" alt="YT" width={20} height={20} className="w-5 h-5 invert shadow-sm" />
                                </div>
                                {/* X */}
                                <div className="w-9 h-9 rounded-md bg-black flex items-center justify-center transition-transform hover:scale-110">
                                    <span className="text-white font-bold text-xl leading-none">𝕏</span>
                                </div>
                            </div>
                        </div>

                        {/* Explore */}
                        <div className="lg:pl-8">
                            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Explore</h3>
                            <ul className="space-y-4">
                                {["Home", "About", "Features", "How It Works", "Marketplace"].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-white/80 hover:text-white transition-colors text-lg">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Legal</h3>
                            <ul className="space-y-4">
                                {["Privacy Policy", "Terms Of Service"].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-white/80 hover:text-white transition-colors text-lg">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Contact</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                                    <Image src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" width={20} height={20} className="w-5 h-5 invert" />
                                </div>
                                <span className="text-white/90 text-lg font-medium">+234 816 2345 678</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 flex items-center justify-center transform hover:scale-110 transition-transform">
                                    <Image src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" width={28} height={28} className="w-7 h-auto" />
                                </div>
                                <span className="text-white/90 text-lg font-medium">Collabdenafrica@gmail.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-white/20">
                        <p className="text-white/80 font-medium text-lg">
                            ©2026 CollabDen. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
