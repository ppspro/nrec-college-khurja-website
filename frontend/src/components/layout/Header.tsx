'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, Mail, Bell, ArrowRight, User, LogIn, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string; desc?: string; icon?: string }[];
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    children: [
      { label: 'About College', href: '/about', desc: 'Our legacy and profile' },
      { label: 'History', href: '/history', desc: 'Over 120 years since 1901' },
      { label: 'Vision & Mission', href: '/vision-mission', desc: 'Guiding educational principles' },
      { label: 'Recognition & Affiliation', href: '/recognition-affiliation', desc: 'CCS University approvals' },
    ],
  },
  {
    label: 'Administration',
    children: [
      { label: 'Principal', href: '/principal-message', desc: 'Message from leadership' },
      { label: 'Management', href: '/management', desc: 'Governing management team' },
      { label: 'Governing Body', href: '/governing-body', desc: 'Supreme advisory body' },
      { label: 'Proctorial Board', href: '/proctorial-board', desc: 'Campus code of conduct' },
      { label: 'Controller of Examination', href: '/examination', desc: 'Evaluations & schedules' },
      { label: 'College Committees', href: '/college-committee', desc: 'Academic committees & cells' },
      { label: 'NAAC Coordinator', href: '/naac', desc: 'Quality control coordinator' },
      { label: 'Administrative Staff', href: '/administrative-staff', desc: 'Support registry team' },
    ],
  },
  {
    label: 'Academics',
    children: [
      { label: 'Faculty', href: '/faculty', desc: 'Our teaching members list' },
      { label: 'Programme Offered', href: '/courses', desc: 'UG, PG & Professional degrees' },
      { label: 'Departments', href: '/departments', desc: 'Arts, Science & Commerce' },
      { label: 'Syllabus', href: '/syllabus', desc: 'NEP syllabus downloads' },
      { label: 'Academic Calendar', href: '/academic-calendar', desc: 'Semester milestones schedule' },
      { label: 'Research', href: '/research', desc: 'Scholarly publications' },
      { label: 'Program Outcomes', href: '/program-outcomes', desc: 'Objectives & outcomes' },
    ],
  },
  {
    label: 'IQAC',
    children: [
      { label: 'About IQAC', href: '/iqac', desc: 'Internal Quality Assurance Cell' },
      { label: 'Members', href: '/iqac/members', desc: 'Quality team list' },
      { label: 'AQAR', href: '/iqac/aqar', desc: 'NAAC quality reports' },
      { label: 'Action Taken Reports', href: '/iqac/action-taken-report', desc: 'Continuous improvements ATR' },
      { label: 'Feedback', href: '/feedback', desc: 'Stakeholder evaluations' },
    ],
  },
  {
    label: 'Infrastructure',
    children: [
      { label: 'Library', href: '/library', desc: 'Resource collection & services' },
      { label: 'Computer Lab', href: '/facilities/computer-lab', desc: 'Computing lab center' },
      { label: 'Hostel', href: '/facilities/hostel', desc: 'Boys & girls lodging' },
      { label: 'Canteen', href: '/facilities/canteen', desc: 'Cafeteria & meals plans' },
      { label: 'Sports', href: '/sports', desc: 'Gym & matches' },
      { label: 'NCC', href: '/ncc', desc: 'Army and Air divisions' },
      { label: 'NSS', href: '/nss', desc: 'Voluntary community service' },
      { label: 'Rangers & Rovers', href: '/rangers-rovers', desc: 'Scouts unit' },
    ],
  },
  {
    label: 'Students Section',
    children: [
      { label: 'Admission Rules', href: '/admission-rules', desc: 'Candidate rules & conducts' },
      { label: 'Admission Process', href: '/admission-process', desc: 'Step-by-step registration roadmap' },
      { label: 'Fee Structure', href: '/fee-structure', desc: 'Subsidized fees catalog' },
      { label: 'Seats', href: '/seats', desc: 'Approved seat allocations matrix' },
      { label: 'Scholarship', href: '/scholarship', desc: 'State & central grants' },
      { label: 'Student Feedback', href: '/student-feedback', desc: 'Evaluation surveys' },
      { label: 'Student Grievance', href: '/student-grievance', desc: 'Grievance cell forms' },
      { label: 'Anti Ragging', href: '/anti-ragging', desc: 'Disciplinary rules & cells' },
      { label: 'Placements', href: '/placements', desc: 'Recruiter statistics' },
    ],
  },
  {
    label: 'Media',
    children: [
      { label: 'News', href: '/news', desc: 'Press releases' },
      { label: 'Events', href: '/events', desc: 'College calendars' },
      { label: 'Gallery', href: '/gallery', desc: 'Visual captures' },
      { label: 'Notices', href: '/notices', desc: 'Announcements board' },
      { label: 'Downloads', href: '/downloads', desc: 'Registry forms library' },
      { label: 'Tenders', href: '/tenders', desc: 'Procurement quotes' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [navItemsState, setNavItemsState] = useState<NavItem[]>(navItems);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isTransparent = isHome && !scrolled;
  const headerRef = useRef<HTMLElement>(null);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Fetch Dynamic Menu
    api.get('/menus/main')
      .then(res => {
        if (res.data?.menu?.items?.length) {
          // Map backend items to frontend format
          const mappedItems = res.data.menu.items.map((item: any) => ({
            label: item.label,
            href: item.url,
            children: item.children?.length ? item.children.map((child: any) => ({
              label: child.label,
              href: child.url,
              desc: child.target === '_blank' ? 'External Link' : undefined
            })) : undefined
          }));
          setNavItemsState(mappedItems);
        }
      })
      .catch(err => console.error('Failed to load menu', err));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
      setMobileExpanded(null);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 180);
  };

  const isActive = (item: NavItem) => {
    if (item.href === '/' && pathname === '/') return true;
    if (item.href && item.href !== '/' && pathname.startsWith(item.href)) return true;
    if (item.children) return item.children.some(c => pathname.startsWith(c.href));
    return false;
  };

  return (
    <>
      <div className={`z-50 ${isHome ? 'absolute top-0 left-0 right-0 w-full' : 'relative'}`}>
        {/* Skip to content */}
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>

      {/* Top Bar */}
      <div className="bg-[#0A0A0A] text-white text-xs py-2.5 hidden md:block border-b border-white/5 relative z-10">
        <div className="container-nrec flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="tel:+915738200001" className="flex items-center gap-2 text-gray-400 hover:text-[#B8860B] transition-colors">
              <Phone size={11} />
              <span>+91-5738-200001</span>
            </a>
            <a href="mailto:info@nreccollege.ac.in" className="flex items-center gap-2 text-gray-400 hover:text-[#B8860B] transition-colors">
              <Mail size={11} />
              <span>info@nreccollege.ac.in</span>
            </a>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-gray-500 text-[11px]">Affiliated to CCS University, Meerut</span>
            <span className="w-px h-3 bg-gray-700" />
            <Link href="/admin/login" className="text-gray-400 hover:text-[#B8860B] transition-colors text-[11px] font-medium">
              Admin Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        ref={headerRef}
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'fixed top-0 bg-white/97 backdrop-blur-xl shadow-md border-b border-black/[0.04]'
            : (isHome ? 'relative bg-transparent border-b border-transparent' : 'relative bg-white border-b border-gray-100/80')
        }`}
      >
        <div className="container-nrec">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0 group gap-3.5">
              <img 
                src="/images/logo.png" 
                alt="NREC College Logo" 
                style={{ height: '56px', width: 'auto', objectFit: 'contain', maxHeight: '100%' }}
              />
              <div className="hidden sm:flex flex-col justify-center">
                <span className={`text-[17.5px] font-black tracking-tight leading-none ${isTransparent ? 'text-white' : 'text-[#111111]'}`}>
                  NREC College
                </span>
                <span className={`text-[10px] font-bold tracking-[0.2em] uppercase mt-1.5 ${isTransparent ? 'text-white/80' : 'text-[#8B0E2A]'}`}>
                  Est. 1901 | Khurja, U.P.
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main navigation">
              {navItemsState.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && handleDropdownEnter(item.label)}
                  onMouseLeave={handleDropdownLeave}
                >
                  {item.href && !item.children ? (
                    item.label === 'Contact' ? (
                      <Link
                        href={item.href}
                        className={`flex items-center px-5 py-2 text-[13px] font-bold uppercase tracking-wider transition-all duration-300 rounded-full border ${
                          isActive(item)
                            ? 'bg-[#8B0E2A] !text-white border-[#8B0E2A] shadow-md'
                            : (isTransparent 
                                ? 'border-white/40 !text-white bg-white/5 hover:bg-white hover:!text-black hover:border-white hover:scale-105' 
                                : 'border-[#8B0E2A] text-[#8B0E2A] hover:bg-[#8B0E2A] hover:!text-white hover:scale-105')
                        }`}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center px-4 py-2.5 text-[13.5px] font-bold tracking-wide transition-all duration-200 rounded-lg ${
                          isActive(item) 
                            ? 'bg-[#8B0E2A] !text-white shadow-sm' 
                            : (isTransparent ? '!text-white hover:bg-white/10 hover:!text-white' : 'text-[#374151] hover:bg-gray-100 hover:text-[#8B0E2A]')
                        }`}
                      >
                        {item.label}
                      </Link>
                    )
                  ) : (
                    <button
                      className={`flex items-center gap-1.5 px-4 py-2.5 text-[13.5px] font-bold tracking-wide transition-all duration-200 rounded-lg ${
                        isActive(item) 
                          ? 'bg-[#8B0E2A] !text-white shadow-sm' 
                          : (isTransparent ? '!text-white hover:bg-white/10 hover:!text-white' : 'text-[#374151] hover:bg-gray-100 hover:text-[#8B0E2A]')
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                      />
                    </button>
                  )}

                  {/* Premium Dropdown */}
                  {item.children && activeDropdown === item.label && (
                    <div
                      className="absolute top-full left-0 bg-white z-50 animate-dropdown"
                      style={{
                        borderRadius: '18px',
                        marginTop: '8px',
                        minWidth: '280px',
                        boxShadow: '0 24px 64px rgba(0,0,0,0.10), 0 8px 24px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.05)',
                        padding: '10px',
                      }}
                      onMouseEnter={() => handleDropdownEnter(item.label)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      {/* Top accent */}
                      <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-[#8B0E2A] to-[#B8860B] rounded-b-full" />

                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-start gap-4 px-5 py-4 rounded-[12px] hover:bg-[#F9F7F4] transition-colors duration-150 group/item"
                        >
                          <div className="mt-0.5 w-8 h-8 rounded-lg bg-[#8B0E2A]/[0.07] flex items-center justify-center shrink-0 group-hover/item:bg-[#8B0E2A] transition-colors duration-200">
                            <ArrowRight size={14} className="text-[#8B0E2A] group-hover/item:!text-white transition-colors duration-200" />
                          </div>
                          <div className="flex-1">
                            <div className="text-[14px] font-bold text-[#0F0F0F] group-hover/item:text-[#8B0E2A] transition-colors leading-tight">
                              {child.label}
                            </div>
                            {child.desc && (
                              <div className="text-[12px] text-[#6B7280] mt-1.5 leading-relaxed">{child.desc}</div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <Link
                href="/notices"
                className={`flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 relative border group ${
                  isTransparent 
                    ? 'bg-white/10 border-white/20 hover:bg-white/25 hover:scale-105' 
                    : 'text-gray-700 bg-gray-50 border-gray-100/50 hover:bg-gray-100 hover:text-[#8B0E2A] hover:scale-105 shadow-sm'
                }`}
                title="Notice Board"
                style={isTransparent ? { color: 'white' } : undefined}
              >
                <Bell size={20} className="transition-transform duration-200 group-hover:rotate-12" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full ring-2 bg-red-500 animate-pulse ring-white" />
              </Link>
              <Link
                href="/admissions"
                className="btn btn-primary btn-sm rounded-full flex text-xs px-4 py-2.5 font-bold md:text-sm md:px-5 md:py-2.5 shadow-md hover:scale-105 active:scale-95 transition-transform duration-200"
                style={{ minHeight: '44px' }}
              >
                Apply Now
              </Link>

              {/* Mobile menu button */}
              <button
                className={`lg:hidden flex items-center justify-center w-11 h-11 rounded-xl transition-colors border ${
                  isTransparent 
                    ? 'text-white bg-white/10 border-white/20 hover:bg-white/25' 
                    : 'text-[#374151] bg-gray-50 border-gray-100 hover:bg-gray-100'
                }`}
                onClick={() => setIsOpen(true)}
                aria-label="Open mobile menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>

      </header>
      </div>

      {/* Premium Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white shadow-2xl flex flex-col lg:hidden border-l border-gray-100"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <div className="flex items-center">
                  <img 
                    src="/images/logo.png" 
                    alt="NREC College Logo" 
                    style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
                  />
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 rounded-full hover:bg-gray-100 text-[#374151] transition-colors"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                {navItemsState.map((item) => (
                  <div key={item.label} className="border-b border-gray-50 last:border-0 pb-1 mb-1">
                    {item.href && !item.children ? (
                      <Link
                        href={item.href}
                        className={`flex items-center w-full min-h-[48px] px-4 rounded-xl text-[15px] font-semibold transition-colors ${
                          isActive(item) ? 'text-[#8B0E2A] bg-[rgba(139,14,42,0.05)]' : 'text-[#374151] hover:bg-[#F9F7F4]'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <>
                        <button
                          onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                          className={`flex items-center justify-between w-full min-h-[48px] px-4 rounded-xl text-[15px] font-semibold transition-colors ${
                            mobileExpanded === item.label || isActive(item) ? 'text-[#8B0E2A] bg-[rgba(139,14,42,0.03)]' : 'text-[#374151] hover:bg-[#F9F7F4]'
                          }`}
                        >
                          {item.label}
                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-300 ${mobileExpanded === item.label ? 'rotate-180 text-[#8B0E2A]' : ''}`}
                          />
                        </button>
                        
                        {/* Accordion Submenu */}
                        <AnimatePresence>
                          {mobileExpanded === item.label && item.children && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="ml-5 mt-2 space-y-1 border-l-2 border-[#8B0E2A]/15 pl-4 mb-3">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className="flex flex-col justify-center min-h-[48px] px-3 rounded-lg text-[14px] text-[#6B7280] hover:text-[#8B0E2A] hover:bg-[#F9F7F4] transition-colors font-medium"
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>
                ))}

                {/* Secondary Links inside Mobile Menu */}
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <h4 className="px-4 text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-2">Quick Links</h4>
                  <Link href="/admin/login" className="flex items-center gap-3 w-full min-h-[48px] px-4 rounded-xl text-[14px] font-medium text-gray-600 hover:text-[#8B0E2A] hover:bg-gray-50">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <LogIn size={14} className="text-gray-500" />
                    </div>
                    Faculty / Admin Login
                  </Link>
                </div>
              </div>

              {/* Sticky Bottom Actions */}
              <div className="p-5 bg-gray-50 border-t border-gray-200 grid grid-cols-2 gap-3">
                <Link href="/contact" className="btn btn-white w-full justify-center rounded-xl shadow-sm border border-gray-200" style={{ height: '48px', minHeight: '48px' }}>
                  Contact Us
                </Link>
                <Link href="/admissions" className="btn btn-primary w-full justify-center rounded-xl shadow-md" style={{ height: '48px', minHeight: '48px' }}>
                  Apply Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
