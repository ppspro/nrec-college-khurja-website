'use client';

import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function WelcomeSection() {
  const quickLinks = [
    { label: 'Apply Now', href: '/admissions', icon: '🎓', bg: 'rgba(153,10,37,0.08)' },
    { label: 'Notice Board', href: '/notices', icon: '📢', bg: 'rgba(198,160,77,0.10)' },
    { label: 'Courses', href: '/courses', icon: '📜', bg: 'rgba(37,99,235,0.08)' },
    { label: 'Faculty', href: '/faculty', icon: '👥', bg: 'rgba(5,150,105,0.08)' },
    { label: 'Campus', href: '/about#infrastructure', icon: '🏛️', bg: 'rgba(124,58,237,0.08)' },
    { label: 'Achievements', href: '/about#achievements', icon: '🏆', bg: 'rgba(220,38,38,0.08)' },
  ];

  return (
    <section className="bg-white section-py">
      <div className="container-nrec">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Text */}
          <div className="lg:col-span-6">
            <SectionTitle
              label="Welcome to NREC College"
              title="A Legacy of Learning, A Future of Promise"
            />
            <div className="space-y-4 text-[#666666] leading-relaxed mt-6">
              <p>
                Founded in <strong className="text-[#2E2E2E]">1901</strong>, Naththi Mal Ram Sahai Mal Edward Coronation Post Graduate College (NREC College), Khurja has been a beacon of higher education in Uttar Pradesh for over a century.
              </p>
              <p>
                Affiliated to <strong className="text-[#2E2E2E]">Chaudhary Charan Singh University, Meerut</strong>, we offer a wide range of undergraduate and postgraduate programmes across humanities, sciences, commerce, and professional disciplines.
              </p>
              <p>
                Our commitment to academic excellence, holistic development, and community service has produced thousands of alumni who are leaders across every sphere of national life.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/about">
                <Button variant="primary" size="lg">Discover Our Story</Button>
              </Link>
              <Link href="/courses">
                <Button variant="outline" size="lg">View Courses</Button>
              </Link>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {quickLinks.map(({ label, href, icon, bg }) => (
                <Link key={label} href={href}>
                  <Card className="p-6 flex flex-col items-center text-center gap-3 group h-full">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110"
                      style={{ background: bg }}
                    >
                      {icon}
                    </div>
                    <span className="text-sm font-semibold text-[#2E2E2E] group-hover:text-[#990A25] transition-colors">
                      {label}
                    </span>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Accreditation */}
            <div className="mt-6 p-5 rounded-2xl bg-[#F9F9F9] border border-[#E7E7E7] flex flex-wrap items-center gap-4">
              <span className="text-xs text-[#666666] font-semibold uppercase tracking-wider">Recognised By:</span>
              {['UGC', 'NAAC', 'NIRF', 'AISHE'].map((badge) => (
                <span key={badge} className="px-3 py-1.5 bg-white border border-[#E7E7E7] text-[#111111] text-xs font-bold rounded-lg shadow-sm">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
