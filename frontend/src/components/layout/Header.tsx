'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, Mail, Bell, ArrowRight, User, LogIn, Search, HelpCircle } from 'lucide-react';
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
    label: 'Students',
    children: [
      { label: 'Admission Rules', href: '/admission-rules' },
      { label: 'Admission Process', href: '/admission-process' },
      { label: 'Fee Structure', href: '/fee-structure' },
      { label: 'Seats', href: '/seats' },
      { label: 'Scholarship', href: '/scholarship' },
      { label: 'Student Feedback', href: '/student-feedback' },
      { label: 'Student Grievance', href: '/student-grievance' },
      { label: 'Anti Ragging', href: '/anti-ragging' },
      { label: 'Placements', href: '/placements' },
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
          const items = res.data.menu.items;
          const hasRichStructure = items.some((item: any) => item.children && item.children.length > 0);
          
          if (hasRichStructure) {
            const mappedItems = items.map((item: any) => ({
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
      <div className={`z-50 ${isHome ? 'absolute top-0 left-0 right-0 w-full' : 'relative bg-white'}`}>
        
        {/* Top Bar (Height: 32px) */}
        <div className="bg-[#0A0A0A] text-white text-[11px] h-8 flex items-center hidden lg:block border-b border-white/5 relative z-20">
          <div className="container-nrec flex items-center justify-between h-full">
            <div className="flex items-center gap-6">
              <a href="tel:+915738200001" className="flex items-center gap-1.5 text-gray-300 hover:text-[#B8860B] transition-colors">
                <Phone size={10} />
                <span>+91-5738-200001</span>
              </a>
              <a href="mailto:info@nreccollege.ac.in" className="flex items-center gap-1.5 text-gray-300 hover:text-[#B8860B] transition-colors">
                <Mail size={10} />
                <span>info@nreccollege.ac.in</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 font-light">Affiliated to CCS University, Meerut</span>
              <span className="w-px h-3 bg-gray-700" />
              <Link href="/admin/login" className="text-gray-300 hover:text-[#B8860B] transition-colors font-medium">
                Admin Login
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navbar (Maximum Height: 80px) */}
        <header
          ref={headerRef}
          className={`w-full transition-all duration-300 relative z-30 ${
            scrolled
              ? 'fixed top-0 left-0 right-0 bg-white shadow-md border-b border-black/[0.04]'
              : (isHome ? 'bg-transparent' : 'bg-white border-b border-gray-100')
          }`}
          style={{ height: '80px', maxHeight: '80px' }}
        >
          <div className="container-nrec h-full grid items-center" style={{ gridTemplateColumns: '260px minmax(0,1fr) 260px' }}>
            
            {/* Left Logo block (Width: 260px) */}
            <div className="w-[260px] flex items-center shrink-0">
              <Link href="/" className="flex items-center gap-3">
                <img 
                  src="/images/logo.png" 
                  alt="NREC Logo" 
                  style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
                />
                <div className="flex flex-col justify-center">
                  <span className={`text-[16px] font-black tracking-tight leading-none ${isTransparent ? 'text-white' : 'text-[#111111]'}`}>
                    NREC College
                  </span>
                  <span className={`text-[9px] font-bold tracking-[0.15em] uppercase mt-1 ${isTransparent ? 'text-white/80' : 'text-[#8B0E2A]'}`}>
                    Est. 1901 | Khurja
                  </span>
                </div>
              </Link>
            </div>

            {/* Center Navigation Menu — always centred, never wraps */}
            <nav className="hidden lg:flex items-center justify-center px-2 overflow-hidden" aria-label="Main navigation">
              <div className="flex items-center flex-nowrap" style={{ gap: 'clamp(2px, 0.8vw, 10px)' }}>
                {navItemsState.map((item) => (
                  <div
                    key={item.label}
                    className="static" // Static so absolute mega dropdown covers full header width
                    onMouseEnter={() => item.children && handleDropdownEnter(item.label)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    {item.href && !item.children ? (
                      <Link
                        href={item.href}
                        className={`px-2.5 py-2 text-[12px] font-extrabold uppercase tracking-wide transition-all duration-200 rounded-lg whitespace-nowrap ${
                          isActive(item)
                            ? 'bg-[#8B0E2A] text-white shadow-sm'
                            : (isTransparent ? 'text-white hover:bg-white/10' : 'text-[#374151] hover:bg-gray-50 hover:text-[#8B0E2A]')
                        }`}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        className={`flex items-center gap-1 px-2.5 py-2 text-[12px] font-extrabold uppercase tracking-wide transition-all duration-200 rounded-lg whitespace-nowrap ${
                          isActive(item)
                            ? 'bg-[#8B0E2A] text-white shadow-sm'
                            : (isTransparent ? 'text-white hover:bg-white/10' : 'text-[#374151] hover:bg-gray-50 hover:text-[#8B0E2A]')
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          size={11}
                          className={`transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                        />
                      </button>
                    )}

                    {/* Mega Dropdown Panel: Full Width (left: 0, right: 0, width: 100%) */}
                    {item.children && activeDropdown === item.label && (
                      <div
                        className="absolute top-full left-0 right-0 w-full bg-white z-50 border-t border-gray-100 shadow-[0_24px_48px_rgba(0,0,0,0.10)] animate-dropdown"
                        onMouseEnter={() => handleDropdownEnter(item.label)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        {/* Gold Border Top */}
                        <div className="h-[3px] bg-gradient-to-r from-[#8B0E2A] to-[#B8860B]" />
                        
                        <div className="container-nrec py-5" style={{ maxHeight: '420px', overflowY: 'auto' }}>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="flex items-center gap-2.5 px-2 py-2.5 rounded-xl hover:bg-[#F8F5F0] transition-all group/item"
                              >
                                <div className="w-6 h-6 rounded-lg bg-[#8B0E2A]/5 flex items-center justify-center shrink-0 group-hover/item:bg-[#8B0E2A] transition-all">
                                  <ArrowRight size={11} className="text-[#8B0E2A] group-hover/item:text-white transition-colors" />
                                </div>
                                <span className="text-[12.5px] font-semibold text-[#374151] group-hover/item:text-[#8B0E2A] transition-colors leading-tight whitespace-nowrap">
                                  {child.label}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                ))}
              </div>
            </nav>

            {/* Right: Apply Button — fixed width matches logo column */}
            <div className="hidden lg:flex items-center justify-end gap-3">
              <Link 
                href="/admissions" 
                className={`inline-flex items-center shrink-0 text-[12px] font-extrabold uppercase tracking-wider py-2 px-5 rounded-full transition-all duration-300 shadow-md ${
                  isTransparent 
                    ? 'bg-white text-[#111111] hover:bg-[#F8F5F0]' 
                    : 'bg-[#8B0E2A] text-white hover:bg-[#6D0B20]'
                }`}
              >
                Apply Now
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors border ${
                  isTransparent 
                    ? 'text-white bg-white/10 border-white/20 hover:bg-white/25' 
                    : 'text-[#374151] bg-gray-50 border-gray-100 hover:bg-gray-100'
                }`}
                onClick={() => setIsOpen(true)}
                aria-label="Open mobile menu"
              >
                <Menu size={20} />
              </button>
            </div>

          </div>
        </header>

      </div>

      {/* Mobile Drawer (Accordion System) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-xs bg-white shadow-2xl flex flex-col lg:hidden border-l border-gray-100"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <img 
                  src="/images/logo.png" 
                  alt="NREC Logo" 
                  style={{ height: '36px', width: 'auto' }}
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 text-[#374151]"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                {navItemsState.map((item) => (
                  <div key={item.label} className="border-b border-gray-50 last:border-0 pb-1 mb-1">
                    {item.href && !item.children ? (
                      <Link
                        href={item.href}
                        className={`flex items-center w-full min-h-[44px] px-3 rounded-xl text-[14px] font-semibold transition-colors ${
                          isActive(item) ? 'text-[#8B0E2A] bg-[rgba(139,14,42,0.05)]' : 'text-[#374151]'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <>
                        <button
                          onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                          className="flex items-center justify-between w-full min-h-[44px] px-3 rounded-xl text-[14px] font-semibold text-[#374151]"
                        >
                          {item.label}
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${mobileExpanded === item.label ? 'rotate-180 text-[#8B0E2A]' : ''}`}
                          />
                        </button>
                        
                        <AnimatePresence>
                          {mobileExpanded === item.label && item.children && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="ml-4 border-l border-gray-200 pl-3 space-y-1 my-2">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className="flex items-center h-10 px-3 rounded-lg text-[13px] text-gray-500 hover:text-[#8B0E2A]"
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
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-200 grid grid-cols-2 gap-2">
                <Link href="/contact" className="btn btn-white w-full justify-center rounded-xl py-2 text-xs border">
                  Contact
                </Link>
                <Link href="/admissions" className="btn btn-primary w-full justify-center rounded-xl py-2 text-xs">
                  Apply
                </Link>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
