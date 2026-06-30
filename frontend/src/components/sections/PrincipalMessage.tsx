'use client';

import Image from 'next/image';
import { Quote } from 'lucide-react';

export default function PrincipalMessage() {
  return (
    <section className="bg-light section-py relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#990A25]/5 skew-x-12 translate-x-20" />
      <div className="container-nrec relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Photo */}
            <div className="md:col-span-5 flex flex-col items-center md:items-start relative">
              <div className="relative w-full max-w-sm mx-auto">
                <div className="w-full aspect-[4/5] rounded-[var(--radius-img)] overflow-hidden shadow-lg border border-[#E7E7E7] bg-white relative">
                  <Image 
                    src="/images/principal.png" 
                    alt="Prof. Rajendra Singh" 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                {/* Name card */}
                <div className="absolute -bottom-6 right-4 bg-white rounded-xl px-6 py-4 shadow-xl border border-[#E7E7E7] z-20 transition-transform hover:-translate-y-1">
                  <div className="font-heading font-bold text-[#111111] text-lg">Prof. Rajendra Singh</div>
                  <div className="text-xs text-[#990A25] font-medium">Principal, NREC College</div>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="md:col-span-7 pt-12 md:pt-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-[#C6A04D]" />
                <span className="section-label !mb-0">Principal&apos;s Message</span>
              </div>
              <h2 className="section-title mb-4">
                A Word From<br />Our Principal
              </h2>
              <div className="divider-accent mb-6" />

              {/* Quote icon */}
              <div className="relative mt-8">
                <Quote className="text-[#990A25]/10 absolute -top-4 -left-4 w-16 h-16" />
                <div className="text-body leading-relaxed space-y-5 pl-8 text-[#444]">
                  <p>
                    Welcome to NREC College — an institution that stands as a proud symbol of academic heritage and intellectual aspiration. For over 120 years, we have been committed to nurturing not just scholars, but complete human beings.
                  </p>
                  <p>
                    Our students are at the heart of everything we do. We believe that quality education, combined with strong values and a spirit of inquiry, prepares young minds to meet the challenges of a rapidly changing world.
                  </p>
                  <p className="font-medium text-[#2E2E2E]">
                    I invite you to join our community and be part of a tradition that has shaped the lives of thousands across generations.
                  </p>
                </div>
              </div>

              {/* Signature block */}
              <div className="mt-10 flex items-center gap-5">
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#990A25] to-[#C6A04D]" />
                <div>
                  <div className="font-heading font-bold text-[#111111] text-xl">Prof. Rajendra Singh</div>
                  <div className="text-sm text-[#666666] font-medium tracking-wide">M.A., Ph.D. | Principal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
