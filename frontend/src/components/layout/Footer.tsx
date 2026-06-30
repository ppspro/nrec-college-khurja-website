'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  quickLinks: [
    { label: 'About College', href: '/about' },
    { label: 'Departments', href: '/departments' },
    { label: 'Courses Offered', href: '/courses' },
    { label: 'Faculty', href: '/faculty' },
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
    { label: 'UGC', href: 'https://ugc.gov.in', external: true },
    { label: 'NAAC', href: 'https://naac.gov.in', external: true },
    { label: 'NIRF', href: 'https://www.nirfindia.org', external: true },
    { label: 'CCS University', href: 'https://www.ccsuniversity.ac.in', external: true },
    { label: 'UP Higher Education', href: 'https://www.uphighereducation.gov.in', external: true },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0D0D0D] text-white">
      {/* Heritage strip */}
      <div className="h-0.5 bg-gradient-to-r from-[#990A25] via-[#C6A04D] to-[#990A25] opacity-80" />

      {/* Main footer */}
      <div className="container-nrec py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-[#990A25] flex items-center justify-center text-white font-bold text-xl font-heading shadow-lg">
                N
              </div>
              <div>
                <div className="font-heading font-bold text-white text-lg leading-tight">NREC College</div>
                <div className="text-[10px] text-gray-400 leading-tight tracking-wide">Est. 1901 | Khurja, U.P.</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Naththi Mal Ram Sahai Mal Edward Coronation Post Graduate College — a century of excellence in higher education in the heart of Uttar Pradesh.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin size={15} className="text-[#C6A04D] mt-0.5 flex-shrink-0" />
                <span>Khurja, Bulandshahr District, Uttar Pradesh — 203131</span>
              </div>
              <a href="tel:+915738200001" className="flex items-center gap-3 text-gray-400 hover:text-[#C6A04D] transition-colors">
                <Phone size={15} className="text-[#C6A04D] flex-shrink-0" />
                <span>+91-5738-200001</span>
              </a>
              <a href="mailto:info@nreccollege.ac.in" className="flex items-center gap-3 text-gray-400 hover:text-[#C6A04D] transition-colors">
                <Mail size={15} className="text-[#C6A04D] flex-shrink-0" />
                <span>info@nreccollege.ac.in</span>
              </a>
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-2 mt-6">
              {[
                { icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>, href: '#', label: 'Facebook' },
                { icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, href: '#', label: 'X (Twitter)' },
                { icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>, href: '#', label: 'Instagram' },
                { icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>, href: '#', label: 'YouTube' },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#990A25] hover:border-[#990A25] hover:text-white transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white text-base mb-5 pb-3 border-b border-white/10">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-[#C6A04D] transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#990A25] group-hover:bg-[#C6A04D] transition-colors flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Student Corner */}
          <div>
            <h4 className="font-heading font-semibold text-white text-base mb-5 pb-3 border-b border-white/10">
              Student Corner
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.studentCorner.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-[#C6A04D] transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#990A25] group-hover:bg-[#C6A04D] transition-colors flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="font-heading font-semibold text-white text-base mb-5 pb-3 border-b border-white/10">
              Important Links
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.importantLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 text-sm hover:text-[#C6A04D] transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C6A04D] flex-shrink-0" />
                    {link.label}
                    <ArrowUpRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Accreditation badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {['UGC', 'NAAC', 'NIRF'].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 border border-[#C6A04D]/40 text-[#C6A04D] text-xs font-semibold rounded-md"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="container-nrec py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
            <p>
              © {currentYear} NREC College, Khurja. All rights reserved.
            </p>
            <p>
              Naththi Mal Ram Sahai Mal Edward Coronation Post Graduate College
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
