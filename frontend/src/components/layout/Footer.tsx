'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowUpRight, ArrowRight, GraduationCap } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '@/lib/api';

const defaultFooterLinks = {
  quickLinks: [
    { label: 'About College', href: '/about' },
    { label: 'Departments', href: '/departments' },
    { label: 'Courses Offered', href: '/courses' },
    { label: 'Faculty', href: '/faculty' },
    { label: 'Placements', href: '/placements' },
    { label: 'Admissions', href: '/admissions' },
    { label: 'Contact Us', href: '/contact' },
  ],
  studentCorner: [
    { label: 'Notice Board', href: '/notices' },
    { label: 'Events', href: '/events' },
    { label: 'Curriculum', href: '/curriculum' },
    { label: 'Downloads', href: '/downloads' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'News & Updates', href: '/news' },
  ],
  importantLinks: [
    { label: 'UGC', href: 'https://ugc.gov.in' },
    { label: 'NAAC', href: 'https://naac.gov.in' },
    { label: 'NIRF', href: 'https://www.nirfindia.org' },
    { label: 'CCS University', href: 'https://www.ccsuniversity.ac.in' },
    { label: 'UP Higher Education', href: 'https://www.uphighereducation.gov.in' },
  ],
};

const accreditations = [
  { label: 'UGC Recognized', abbr: 'UGC' },
  { label: 'NAAC Accredited', abbr: 'NAAC' },
  { label: 'NIRF Ranked', abbr: 'NIRF' },
];

function FooterColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h4 className="font-body font-bold text-white text-[12px] tracking-[0.2em] uppercase mb-4">
        {children}
      </h4>
      <div className="w-12 h-[2px] bg-gradient-to-r from-[#8B0E2A] to-[#B8860B] rounded-full" />
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [footerLinks, setFooterLinks] = useState(defaultFooterLinks);

  useEffect(() => {
    api.get('/menus/footer')
      .then(res => {
        if (res.data?.menu?.items) {
          const fetchedLinks = { quickLinks: [] as any[], studentCorner: [] as any[], importantLinks: [] as any[] };
          res.data.menu.items.forEach((item: any) => {
            if (item.label.toLowerCase().includes('quick')) {
              fetchedLinks.quickLinks = item.children || [];
            } else if (item.label.toLowerCase().includes('student')) {
              fetchedLinks.studentCorner = item.children || [];
            } else if (item.label.toLowerCase().includes('important')) {
              fetchedLinks.importantLinks = item.children || [];
            }
          });
          
          if (fetchedLinks.quickLinks.length || fetchedLinks.studentCorner.length || fetchedLinks.importantLinks.length) {
            // map them to match expected structure { label, href }
            const mapLinks = (arr: any[]) => arr.map(a => ({ label: a.label, href: a.url }));
            setFooterLinks({
              quickLinks: fetchedLinks.quickLinks.length ? mapLinks(fetchedLinks.quickLinks) : defaultFooterLinks.quickLinks,
              studentCorner: fetchedLinks.studentCorner.length ? mapLinks(fetchedLinks.studentCorner) : defaultFooterLinks.studentCorner,
              importantLinks: fetchedLinks.importantLinks.length ? mapLinks(fetchedLinks.importantLinks) : defaultFooterLinks.importantLinks,
            });
          }
        }
      })
      .catch(err => console.error('Failed to load footer menu', err));
  }, []);

  return (
    <footer className="bg-[#0A0A0A] text-white relative overflow-hidden" role="contentinfo">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-[radial-gradient(circle_at_top_right,rgba(139,14,42,0.08)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-[radial-gradient(circle_at_bottom_left,rgba(184,134,11,0.04)_0%,transparent_65%)] pointer-events-none" />

      {/* Top accent bar */}
      <div className="h-[3px] bg-gradient-to-r from-[#8B0E2A] via-[#B8860B] to-[#8B0E2A]" />

      {/* Main footer content */}
      <div className="container-nrec relative z-10" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-16 lg:gap-y-0 xl:gap-x-12">

          {/* ── Brand Column ── */}
          <div className="lg:col-span-4 xl:col-span-4">
            {/* Logo */}
            <Link href="/" className="inline-block mb-10 group w-fit">
              <img src="/images/footer.png" alt="NREC College Logo" className="h-[60px] md:h-[72px] w-auto" />
            </Link>

            {/* Description */}
            <p className="text-gray-400 text-[15px] leading-[1.8] mb-10 max-w-[340px]">
              Naththi Mal Ram Sahai Mal Edward Coronation Post Graduate College — a century of academic excellence serving Uttar Pradesh.
            </p>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover:bg-[#8B0E2A] group-hover:border-[#8B0E2A] transition-all duration-300">
                  <MapPin size={15} className="text-[#B8860B] group-hover:text-white transition-colors" />
                </div>
                <span className="text-gray-400 text-[14px] leading-relaxed pt-1">
                  Khurja, Bulandshahr District,<br />Uttar Pradesh — 203131
                </span>
              </div>
              <a href="tel:+915738200001" className="flex items-center gap-4 group">
                <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover:bg-[#8B0E2A] group-hover:border-[#8B0E2A] transition-all duration-300">
                  <Phone size={15} className="text-[#B8860B] group-hover:text-white transition-colors" />
                </div>
                <span className="text-gray-300 text-[14px] group-hover:text-white transition-colors font-medium">+91-5738-200001</span>
              </a>
              <a href="mailto:info@nreccollege.ac.in" className="flex items-center gap-4 group">
                <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover:bg-[#8B0E2A] group-hover:border-[#8B0E2A] transition-all duration-300">
                  <Mail size={15} className="text-[#B8860B] group-hover:text-white transition-colors" />
                </div>
                <span className="text-gray-300 text-[14px] group-hover:text-white transition-colors font-medium">info@nreccollege.ac.in</span>
              </a>
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className="lg:col-span-2">
            <FooterColumnHeading>Quick Links</FooterColumnHeading>
            <ul className="space-y-5">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-[14.5px] hover:text-white transition-colors flex items-center gap-3 group"
                  >
                    <ArrowRight size={13} className="text-[#8B0E2A] group-hover:text-[#B8860B] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Student Corner ── */}
          <div className="lg:col-span-2">
            <FooterColumnHeading>Student Corner</FooterColumnHeading>
            <ul className="space-y-5">
              {footerLinks.studentCorner.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-[14.5px] hover:text-white transition-colors flex items-center gap-3 group"
                  >
                    <ArrowRight size={13} className="text-[#8B0E2A] group-hover:text-[#B8860B] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* â”€â”€ Newsletter & Stay Connected â”€â”€ */}
          <div className="lg:col-span-4">
            <FooterColumnHeading>Stay Connected</FooterColumnHeading>

            <p className="text-gray-400 text-[14.5px] leading-[1.75] mb-6 max-w-[320px]">
              Subscribe to our newsletter for the latest updates, events, and announcements from NREC College.
            </p>

            {/* Newsletter Input */}
            <div className="flex rounded-xl overflow-hidden shadow-lg mb-10" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
              <input
                type="email"
                placeholder="Your email address"
                className="bg-white text-[#111111] text-[14px] px-5 py-3.5 w-full focus:outline-none placeholder:text-gray-400 min-h-[48px]"
                aria-label="Email for newsletter"
              />
              <button className="bg-[#8B0E2A] hover:bg-[#6F0B22] text-white px-5 py-3.5 transition-colors font-semibold text-[13px] flex-shrink-0 whitespace-nowrap min-h-[48px]">
                Subscribe
              </button>
            </div>

            {/* External Links */}
            <div className="mb-8">
              <p className="text-gray-500 text-[11px] font-bold tracking-[0.15em] uppercase mb-4">Important Links</p>
              <div className="flex flex-wrap gap-x-5 gap-y-3">
                {footerLinks.importantLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 text-[13.5px] font-medium hover:text-[#B8860B] transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight size={11} className="text-gray-600 group-hover:text-[#B8860B] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200" />
                  </a>
                ))}
              </div>
            </div>

            {/* Accreditation Badges */}
            <div className="flex flex-wrap gap-2.5">
              {accreditations.map((badge) => (
                <div
                  key={badge.abbr}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                >
                  <GraduationCap size={13} className="text-[#B8860B]" />
                  <span className="text-white text-[11.5px] font-semibold tracking-wider uppercase">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="container-nrec py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-[13px]">
              Â© {currentYear} NREC College, Khurja. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-gray-500">
              <Link href="/about" className="hover:text-gray-300 transition-colors">About</Link>
              <span className="w-1 h-1 rounded-full bg-gray-700" />
              <Link href="/contact" className="hover:text-gray-300 transition-colors">Contact</Link>
              <span className="w-1 h-1 rounded-full bg-gray-700" />
              <Link href="/admissions" className="hover:text-gray-300 transition-colors">Admissions</Link>
              <span className="w-1 h-1 rounded-full bg-gray-700" />
              <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
              <span className="w-1 h-1 rounded-full bg-gray-700" />
              <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
