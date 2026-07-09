'use client';

import Link from 'next/link';
import { ArrowLeft, Home, Compass, GraduationCap } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Layered Gradient Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,14,42,0.15)_0%,transparent_60%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B0E2A] via-[#B8860B] to-[#8B0E2A]" />

      <div className="max-w-md w-full text-center relative z-10">
        {/* Brand Icon */}
        <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 shadow-2xl backdrop-blur-md flex items-center justify-center text-[#B8860B] font-heading font-bold text-3xl mx-auto mb-10">
          N
        </div>

        {/* 404 Heading */}
        <h1 className="font-heading text-white font-bold text-7xl md:text-8xl tracking-tight mb-4 select-none bg-gradient-to-r from-[#8B0E2A] to-[#B8860B] bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="font-heading font-bold text-white text-2xl mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-400 font-light leading-relaxed mb-10">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="btn btn-primary w-full justify-center rounded-full flex items-center gap-2"
            style={{ height: '48px' }}
          >
            <Home size={16} />
            Go to Homepage
          </Link>
          
          <Link
            href="/courses"
            className="btn text-white border border-white/20 hover:bg-white/10 w-full justify-center rounded-full flex items-center gap-2 backdrop-blur-sm"
            style={{ height: '48px' }}
          >
            <Compass size={16} />
            Explore Courses
          </Link>
        </div>

        {/* Footer Notice */}
        <p className="text-gray-600 text-xs mt-12">
          Est. 1901 • NREC College, Khurja
        </p>
      </div>
    </div>
  );
}
