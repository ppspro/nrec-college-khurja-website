'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, Mail, Search, Bell } from 'lucide-react';

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string; desc?: string }[];
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    children: [
      { label: 'About NREC College', href: '/about', desc: 'History, vision & mission' },
      { label: "Principal's Message", href: '/about#principal', desc: 'A word from our principal' },
      { label: 'Administration', href: '/about#administration', desc: 'Administrative team' },
      { label: 'Infrastructure', href: '/about#infrastructure', desc: 'Campus facilities' },
    ],
  },
  {
    label: 'Academics',
    children: [
      { label: 'Departments', href: '/departments', desc: 'All academic departments' },
      { label: 'Courses Offered', href: '/courses', desc: 'UG, PG & diploma programs' },
      { label: 'Faculty', href: '/faculty', desc: 'Our distinguished faculty' },
      { label: 'Curriculum', href: '/curriculum', desc: 'Syllabus & curriculum PDF' },
    ],
  },
  {
    label: 'Admissions',
    children: [
      { label: 'Admission Process', href: '/admissions', desc: 'How to apply' },
      { label: 'Eligibility Criteria', href: '/admissions#eligibility', desc: 'Course-wise eligibility' },
      { label: 'Fee Structure', href: '/admissions#fees', desc: 'Tuition & other fees' },
      { label: 'Scholarships', href: '/admissions#scholarships', desc: 'Available scholarships' },
    ],
  },
  {
    label: 'Student Life',
    children: [
      { label: 'Notice Board', href: '/notices', desc: 'Important announcements' },
      { label: 'Events', href: '/events', desc: 'College events & programs' },
      { label: 'Gallery', href: '/gallery', desc: 'Photos & videos' },
      { label: 'Downloads', href: '/downloads', desc: 'Forms & documents' },
    ],
  },
  {
    label: 'Media',
    children: [
      { label: 'News', href: '/news', desc: 'College news & updates' },
      { label: 'Gallery', href: '/gallery', desc: 'Campus life in pictures' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
      setMobileExpanded(null);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const isActive = (item: NavItem) => {
    if (item.href === '/' && pathname === '/') return true;
    if (item.href && item.href !== '/' && pathname.startsWith(item.href)) return true;
    if (item.children) return item.children.some(c => pathname.startsWith(c.href));
    return false;
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#111111] text-white text-xs py-2 hidden md:block">
        <div className="container-nrec flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:+915738200001" className="flex items-center gap-1.5 hover:text-[#C6A04D] transition-colors">
              <Phone size={12} />
              <span>+91-5738-200001</span>
            </a>
            <a href="mailto:info@nreccollege.ac.in" className="flex items-center gap-1.5 hover:text-[#C6A04D] transition-colors">
              <Mail size={12} />
              <span>info@nreccollege.ac.in</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Affiliated to CCS University, Meerut</span>
            <span className="w-px h-3 bg-gray-600" />
            <Link href="/admin/login" className="hover:text-[#C6A04D] transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-sm border-b border-black/5'
            : 'bg-white border-b border-[#E7E7E7]'
        }`}
      >
        <div className="container-nrec">
          <div className="flex items-center justify-between h-18 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-[#990A25] flex items-center justify-center text-white font-bold text-lg font-heading shadow-md">
                N
              </div>
              <div>
                <div className="font-heading font-bold text-[#111111] text-lg leading-tight">NREC College</div>
                <div className="text-[10px] text-[#666666] leading-tight tracking-wide">Est. 1901 | Khurja, U.P.</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && handleDropdownEnter(item.label)}
                  onMouseLeave={handleDropdownLeave}
                >
                  {item.href && !item.children ? (
                    <Link
                      href={item.href}
                      className={`relative flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors duration-300 group ${
                        isActive(item) ? 'text-[#990A25]' : 'text-[#2E2E2E] hover:text-[#990A25]'
                      }`}
                    >
                      {item.label}
                      <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-[#990A25] transition-transform duration-300 origin-left ${isActive(item) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                    </Link>
                  ) : (
                    <button
                      className={`relative flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors duration-300 group ${
                        isActive(item) ? 'text-[#990A25]' : 'text-[#2E2E2E] hover:text-[#990A25]'
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                      />
                      <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-[#990A25] transition-transform duration-300 origin-left ${isActive(item) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                    </button>
                  )}

                  {/* Dropdown */}
                  {item.children && activeDropdown === item.label && (
                    <div
                      className="absolute top-full left-0 w-64 bg-white/95 backdrop-blur-md shadow-md border border-black/5 overflow-hidden z-50 animate-fade-in"
                      style={{ borderRadius: 'var(--radius-dropdown)', marginTop: '0.5rem' }}
                      onMouseEnter={() => handleDropdownEnter(item.label)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <div className="h-0.5 bg-gradient-to-r from-[#990A25] to-[#C6A04D]" />
                      <div className="p-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex flex-col px-4 py-3 rounded-[10px] hover:bg-black/5 transition-colors group"
                          >
                            <span className="text-[15px] font-semibold text-[#111111] group-hover:text-[#990A25] transition-colors">
                              {child.label}
                            </span>
                            {child.desc && (
                              <span className="text-xs text-[#666666] mt-0.5">{child.desc}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <Link
                href="/notices"
                className="hidden md:flex items-center gap-1.5 text-[#666666] hover:text-[#990A25] p-2 rounded-lg hover:bg-[#F9F9F9] transition-colors relative"
                title="Notice Board"
              >
                <Bell size={18} />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#990A25] rounded-full" />
              </Link>
              <Link
                href="/admissions"
                className="hidden md:flex btn btn-primary"
              >
                Apply Now
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-[#F9F9F9] text-[#111111] transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="lg:hidden border-t border-[#E7E7E7] bg-white max-h-[80vh] overflow-y-auto">
            <div className="container-nrec py-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.href && !item.children ? (
                    <Link
                      href={item.href}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive(item) ? 'text-[#990A25] bg-[rgba(153,10,37,0.05)]' : 'text-[#2E2E2E] hover:bg-[#F9F9F9]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-[#2E2E2E] hover:bg-[#F9F9F9] transition-colors"
                      >
                        {item.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {mobileExpanded === item.label && item.children && (
                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-[#E7E7E7] pl-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-3 py-2.5 rounded-lg text-sm text-[#666666] hover:text-[#990A25] hover:bg-[#F9F9F9] transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
              <div className="pt-3 pb-2 border-t border-[#E7E7E7] mt-3">
                <Link href="/admissions" className="btn btn-primary w-full justify-center">
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
