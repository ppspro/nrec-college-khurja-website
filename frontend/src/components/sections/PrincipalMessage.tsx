'use client';

import { Quote } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface PrincipalMessageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message?: any;
}

const fallbackMessage = {
  quote: '"Education is not merely the transfer of information but the transformation of character."',
  paragraphs: [
    'Welcome to NREC College — an institution that stands as a symbol of academic heritage, intellectual aspiration, and unwavering commitment to quality education.',
    'Since its establishment in 1901, this college has nurtured thousands of students who have gone on to distinguish themselves in every walk of life — from public service to research, from entrepreneurship to the arts.',
    'We strive to create an environment where curiosity is celebrated, excellence is pursued, and every student discovers their true potential. I extend a warm welcome to all prospective students and invite them to become part of our proud community.',
  ],
  name: 'Prof. K.D. Sharma',
  designation: 'Principal',
  image: '/screenshots/1671872069WhatsApp%20Image%202022-12-17%20at%205.49.18%20PM.jpeg'
};

export default function PrincipalMessage({ message }: PrincipalMessageProps) {
  const data = message || fallbackMessage;

  return (
    <section id="principal" className="bg-[#F8F5F0] section-py relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#8B0E2A 2px, transparent 2px)', backgroundSize: '32px 32px' }} />
      
      <div className="container-nrec relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Image */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal direction="right">
              <div className="aspect-[4/5] rounded-[24px] overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,0.1)] relative z-10 border-8 border-white">
                <SafeImage
                  fallbackKey="principal"
                  src={data.image}
                  alt={data.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              
              {/* Decorative Frame */}
              <div className="absolute -bottom-6 -left-6 w-full h-full border-[3px] border-[#B8860B] rounded-[24px] -z-10" />
            </ScrollReveal>
          </div>
          
          {/* Right Column: Content */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="left">
              <div className="mb-8">
                <Quote className="text-[#8B0E2A]/10 w-24 h-24 absolute -top-10 -left-6 -z-10 transform -rotate-12" />
                <span className="section-label text-[#8B0E2A]">Message from the Principal</span>
                <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-[2.75rem] text-[#111111] mb-8 leading-[1.15] tracking-tight">
                  {data.quote}
                </h2>
              </div>
              
              <div className="text-gray-600 space-y-6 text-lg font-light leading-relaxed mb-10">
                {data.paragraphs.map((p: string, idx: number) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
              
              <div className="flex items-center gap-6 pt-6 border-t border-gray-200">
                <div className="w-16 h-[2px] bg-[#B8860B]" />
                <div>
                  <div className="text-2xl font-heading font-bold text-[#111111]">{data.name}</div>
                  <div className="text-[#8B0E2A] font-semibold text-sm tracking-[0.15em] uppercase mt-1">{data.designation}</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
          
        </div>
      </div>
    </section>
  );
}
