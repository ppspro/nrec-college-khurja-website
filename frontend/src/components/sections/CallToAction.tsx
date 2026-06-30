'use client';

import Link from 'next/link';
import { ArrowRight, GraduationCap } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="relative overflow-hidden section-py">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #990A25 0%, #7A081E 50%, #111111 100%)' }} />
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(198,160,77,0.8) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Gold accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C6A04D] via-[#f0d080] to-[#C6A04D]" />

      <div className="relative container-nrec">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 border border-white/20 mb-6">
            <GraduationCap size={32} className="text-[#C6A04D]" />
          </div>
          <h2 className="font-heading text-white font-bold mb-4" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
            Begin Your Academic Journey at NREC College
          </h2>
          <p className="text-red-200 text-lg mb-8 leading-relaxed">
            Applications are open for the 2024-25 academic session. Join a community of learners, thinkers, and achievers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/admissions" className="btn btn-white text-base px-8 py-4">
              Apply for Admission <ArrowRight size={16} />
            </Link>
            <Link
              href="/courses"
              className="btn text-white text-base px-8 py-4"
              style={{ border: '2px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.08)' }}
            >
              Explore Courses
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
            {[
              { label: 'Established', value: '1901' },
              { label: 'Affiliation', value: 'CCS University' },
              { label: 'Accreditation', value: 'NAAC' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="font-heading text-[#C6A04D] font-bold text-xl">{item.value}</div>
                <div className="text-red-200 text-xs mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
