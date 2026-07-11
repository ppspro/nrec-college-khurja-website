'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, Mail, Home, ArrowRight, Building2, Users, FileCheck2, GraduationCap, BookOpen, UserCircle, Globe, Shield, Activity, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string; desc?: string; icon?: React.ElementType }[];
}

// Fallback rich metadata to enhance CMS items
const getRichMetadata = (label: string, url: string) => {
  const l = label.toLowerCase();
  
  if (l.includes('about') || l.includes('history') || l.includes('vision')) return { desc: 'Institution overview & legacy', icon: Building2 };
  if (l.includes('principal') || l.includes('management') || l.includes('govern')) return { desc: 'Leadership & administration', icon: Users };
  if (l.includes('naac') || l.includes('iqac') || l.includes('quality') || l.includes('recognition')) return { desc: 'Quality assurance & accreditation', icon: FileCheck2 };
  
  if (l.includes('course') || l.includes('program') || l.includes('department') || l.includes('academic')) return { desc: 'Academic programs & faculty', icon: GraduationCap };
  if (l.includes('syllabus') || l.includes('calendar') || l.includes('research') || l.includes('exam')) return { desc: 'Academic resources & schedules', icon: BookOpen };
  
  if (l.includes('admission') || l.includes('fee') || l.includes('seat')) return { desc: 'Enrollment & fee details', icon: UserCircle };
  if (l.includes('scholarship') || l.includes('placement')) return { desc: 'Financial aid & career', icon: Globe };
  if (l.includes('ncc') || l.includes('nss') || l.includes('anti ragging') || l.includes('feedback')) return { desc: 'Student welfare & discipline', icon: Shield };
  if (l.includes('sports') || l.includes('library') || l.includes('hostel') || l.includes('canteen') || l.includes('facilit')) return { desc: 'Campus facilities', icon: Activity };
  
  if (l.includes('gallery') || l.includes('media') || l.includes('news') || l.includes('event') || l.includes('notice') || l.includes('download') || l.includes('tender')) return { desc: 'Campus life & updates', icon: ImageIcon };
  
  return { desc: 'Explore more details', icon: ArrowRight };
};

const defaultNavItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    children: [
      { label: 'About College', href: '/about', desc: 'Our legacy and profile' },
      { label: 'History', href: '/history', desc: 'Over 120 years since 1901' },
      { label: 'Vision Mission', href: '/vision-mission', desc: 'Guiding educational principles' },
      { label: 'Recognition Affiliation', href: '/recognition-affiliation', desc: 'CCS University approvals' },
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
      { label: 'Academics', href: '/academics', desc: 'Overview of academics' },
      { label: 'Departments', href: '/departments', desc: 'Arts, Science & Commerce' },
      { label: 'Courses', href: '/courses', desc: 'UG, PG & Professional degrees' },
      { label: 'Syllabus', href: '/syllabus', desc: 'NEP syllabus downloads' },
      { label: 'Research', href: '/research', desc: 'Scholarly publications' },
      { label: 'Program Outcomes', href: '/program-outcomes', desc: 'Objectives & outcomes' },
      { label: 'Examination', href: '/examination', desc: 'Exam schedules and rules' },
    ],
  },
  {
    label: 'IQAC',
    children: [
      { label: 'IQAC', href: '/iqac', desc: 'Internal Quality Assurance Cell' },
      { label: 'Members', href: '/iqac/members', desc: 'Quality team list' },
      { label: 'AQAR', href: '/iqac/aqar', desc: 'NAAC quality reports' },
      { label: 'Action Taken Report', href: '/iqac/action-taken-report', desc: 'Continuous improvements ATR' },
    ],
  },
  {
    label: 'Infrastructure',
    children: [
      { label: 'Library', href: '/library', desc: 'Resource collection & services' },
      { label: 'Facilities', href: '/facilities', desc: 'Campus facilities' },
      { label: 'Computer Lab', href: '/facilities/computer-lab', desc: 'Computing lab center' },
      { label: 'Hostel', href: '/facilities/hostel', desc: 'Boys & girls lodging' },
      { label: 'Canteen', href: '/facilities/canteen', desc: 'Cafeteria & meals plans' },
      { label: 'Sports', href: '/sports', desc: 'Gym & matches' },
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
      { label: 'Gallery', href: '/gallery', desc: 'Visual captures' },
      { label: 'News', href: '/news', desc: 'Press releases' },
      { label: 'Events', href: '/events', desc: 'College calendars' },
      { label: 'Notices', href: '/notices', desc: 'Announcements board' },
      { label: 'Downloads', href: '/downloads', desc: 'Registry forms library' },
      { label: 'Tenders', href: '/tenders', desc: 'Procurement quotes' },
    ],
  }
];

// Add icons to default items
defaultNavItems.forEach(item => {
  if (item.children) {
    item.children.forEach(child => {
      const meta = getRichMetadata(child.label, child.href || '');
      child.icon = meta.icon;
    });
  }
});

export default function Header() {
  const [navItemsState, setNavItemsState] = useState<NavItem[]>(defaultNavItems);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLHeadElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    api.get('/menus/main')
      .then(res => {
        if (res.data?.menu?.items?.length) {
          const items = res.data.menu.items;
          const hasRichStructure = items.some((item: any) => item.children && item.children.length > 0);
          
          if (hasRichStructure) {
            let mappedItems = items.map((item: any) => ({
              label: item.label,
              href: item.url,
              children: item.children?.length ? item.children.map((child: any) => {
                const meta = getRichMetadata(child.label, child.url);
                return {
                  label: child.label,
                  href: child.url,
                  desc: child.target === '_blank' ? 'External Link' : meta.desc,
                  icon: meta.icon
                };
              }) : undefined
            }));
            
            mappedItems = mappedItems.filter((i: any) => i.label.toLowerCase() !== 'contact');
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
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
      <header className="sticky top-0 z-50 bg-white shadow-md w-full border-b-[4px] border-[#C99700]">
        
        {/* 1. TOP INFORMATION BAR (Height: 32px, Background: #050505) */}
        <div className="bg-[#050505] text-white text-[12px] h-[32px] flex items-center hidden xl:block relative z-20 font-medium border-b border-white/5">
          <div className="w-full max-w-[1440px] mx-auto px-6 flex items-center justify-between h-full">
            <div className="flex items-center gap-6">
              <a href="tel:+915738200001" className="flex items-center gap-1.5 text-white/95 hover:text-[#C99700] transition-colors focus:outline-none rounded">
                <span>☎ +91-5738-200001</span>
              </a>
              <a href="mailto:info@nreccollege.ac.in" className="flex items-center gap-1.5 text-white/95 hover:text-[#C99700] transition-colors focus:outline-none rounded">
                <span>✉ info@nreccollege.ac.in</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white/80">NAAC Accredited</span>
              <span className="text-white/30">|</span>
              <span className="text-white/80">Affiliated to CCS University, Meerut</span>
              <span className="text-white/30">|</span>
              <Link href="/admin/login" className="text-white/95 hover:text-[#C99700] transition-colors font-semibold">
                Admin Login
              </Link>
            </div>
          </div>
        </div>

        {/* 2. MAIN NAVBAR REDESIGN (Height: 90px, Background: #ffffff) */}
        <div className="w-full bg-white relative z-30">
          <div 
            className="w-full max-w-[1600px] mx-auto px-6 h-[90px] grid items-center grid-cols-[1fr_auto] xl:grid-cols-[240px_minmax(0,1fr)_220px] 2xl:grid-cols-[280px_minmax(0,1fr)_250px]"
          >
            
            {/* Left: Logo block */}
            <div className="flex items-center gap-3 xl:w-[240px] 2xl:w-[280px] overflow-hidden shrink-0">
              <Link href="/" className="flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-[#9b0035] focus-visible:ring-offset-2 focus:outline-none rounded-lg">
                <img 
                  src="/images/logo.png" 
                  alt="NREC Logo" 
                  className="h-[55px] w-[55px] xl:h-[64px] xl:w-[64px] object-contain shrink-0"
                />
                <div className="flex flex-col justify-center">
                  <span className="text-lg xl:text-[18px] 2xl:text-xl font-bold tracking-tight leading-none text-[#111827] whitespace-nowrap">
                    NREC College
                  </span>
                  <span className="text-[10px] xl:text-[11px] 2xl:text-xs tracking-wide uppercase mt-1 text-[#8B0E2A] whitespace-nowrap">
                    EST. 1901 | KHURJA
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Navigation Menu */}
            <nav className="hidden xl:flex min-w-0 items-center justify-center overflow-visible h-full" aria-label="Main navigation">
              <div className="flex items-center flex-nowrap gap-2 xl:gap-3 2xl:gap-5 h-full">
                {navItemsState.map((item) => {
                  const active = isActive(item);
                  
                  return (
                    <div
                      key={item.label}
                      className="relative inline-flex items-center h-11"
                      onMouseEnter={() => item.children && handleDropdownEnter(item.label)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      {item.href && !item.children ? (
                        <Link
                          href={item.href}
                          className={`inline-flex items-center justify-center h-10 px-2 xl:px-3 2xl:px-4 text-[13px] 2xl:text-sm font-semibold whitespace-nowrap rounded-xl transition-all duration-200 leading-none focus-visible:ring-2 focus-visible:ring-[#9b0035] focus-visible:ring-offset-2 focus:outline-none ${
                            active
                              ? 'bg-[#9b0035] text-white shadow-[0_8px_18px_rgba(155,0,53,0.25)]'
                              : 'bg-transparent text-[#111827] hover:bg-[rgba(155,0,53,0.08)] hover:text-[#9b0035]'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          aria-expanded={activeDropdown === item.label}
                          className={`inline-flex items-center justify-center h-10 px-2 xl:px-3 2xl:px-4 text-[13px] 2xl:text-sm font-semibold whitespace-nowrap rounded-xl transition-all duration-200 leading-none focus-visible:ring-2 focus-visible:ring-[#9b0035] focus-visible:ring-offset-2 focus:outline-none ${
                            active || activeDropdown === item.label
                              ? 'bg-[#9b0035] text-white shadow-[0_8px_18px_rgba(155,0,53,0.25)]'
                              : 'bg-transparent text-[#111827] hover:bg-[rgba(155,0,53,0.08)] hover:text-[#9b0035]'
                          }`}
                        >
                          {item.label}
                          <ChevronDown
                            size={13}
                            className={`transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                          />
                        </button>
                      )}

                      {/* 3. MEGA MENU */}
                      <AnimatePresence>
                        {item.children && activeDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 right-0 w-full bg-white z-[999] border-t-[4px] border-[#C99700] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]"
                            onMouseEnter={() => handleDropdownEnter(item.label)}
                            onMouseLeave={handleDropdownLeave}
                          >
                            <div className="w-full max-w-[1440px] mx-auto py-8 px-12 overflow-y-auto" style={{ maxHeight: '70vh' }}>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-10">
                                {item.children.map((child: any) => {
                                  const Icon = child.icon || ArrowRight;
                                  return (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      className="flex items-start gap-3 p-4 h-auto rounded-xl hover:bg-[#F8F5F0] transition-all group/item border border-transparent hover:border-[#C99700]/20 focus-visible:ring-2 focus-visible:ring-[#9b0035] focus-visible:ring-offset-2 focus:outline-none"
                                    >
                                      <div className="w-11 h-11 rounded-lg bg-[#8B0E2A]/5 flex items-center justify-center shrink-0 group-hover/item:bg-[#8B0E2A] transition-all mt-0.5">
                                        <Icon size={18} className="text-[#8B0E2A] group-hover/item:text-white transition-colors" />
                                      </div>
                                      <div>
                                        <div className="text-[13.5px] font-bold text-[#111827] group-hover/item:text-[#8B0E2A] transition-colors leading-snug mb-0.5">
                                          {child.label}
                                        </div>
                                        {child.desc && (
                                          <div className="text-[11.5px] text-[#6B7280] leading-normal font-light">
                                            {child.desc}
                                          </div>
                                        )}
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </nav>

            {/* Right: Actions */}
            <div className="hidden xl:flex justify-end items-center gap-3 min-w-0">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center shrink-0 text-[13px] font-bold uppercase tracking-wide h-11 px-5 rounded-full transition-all duration-300 border-2 border-[#8B0E2A] bg-white text-[#8B0E2A] hover:bg-[#8B0E2A] hover:text-white focus-visible:ring-2 focus-visible:ring-[#9b0035] focus-visible:ring-offset-2 focus:outline-none"
              >
                Contact
              </Link>
              <Link 
                href="/admissions" 
                className="inline-flex items-center justify-center shrink-0 text-[13px] font-bold uppercase tracking-wide h-12 px-6 rounded-full transition-all duration-300 shadow-md bg-[#8B0E2A] text-white hover:bg-[#6D0B20] hover:-translate-y-0.5 transform focus-visible:ring-2 focus-visible:ring-[#9b0035] focus-visible:ring-offset-2 focus:outline-none"
              >
                <span className="xl:inline 2xl:hidden">Apply</span>
                <span className="hidden 2xl:inline">Apply Now</span>
              </Link>
            </div>

            {/* Mobile menu hamburger (Hidden on xl) */}
            <div className="flex xl:hidden items-center justify-end gap-2 h-full">
              <button
                className="flex items-center justify-center w-11 h-11 rounded-xl transition-colors border text-[#374151] bg-gray-50 border-gray-100 hover:bg-gray-100"
                onClick={() => setIsOpen(true)}
                aria-label="Open mobile menu"
                aria-expanded={isOpen}
              >
                <Menu size={24} />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* 5. MOBILE Drawer Collapsible Accordion */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm xl:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-sm bg-white shadow-2xl flex flex-col xl:hidden"
            >
              {/* Mobile Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0 bg-white">
                <img 
                  src="/images/logo.png" 
                  alt="NREC Logo" 
                  style={{ height: '40px', width: 'auto' }}
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
                  aria-label="Close mobile menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Drawer Content */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="space-y-1">
                  {navItemsState.map((item) => (
                    <div key={item.label} className="border-b border-gray-100 last:border-0 pb-2 mb-2">
                      {item.href && !item.children ? (
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center w-full min-h-[48px] px-4 rounded-xl text-[15px] font-semibold transition-colors ${
                            isActive(item) ? 'text-[#8B0E2A] bg-[#8B0E2A]/5' : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <>
                          <button
                            onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                            className="flex items-center justify-between w-full min-h-[48px] px-4 rounded-xl text-[15px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                            aria-expanded={mobileExpanded === item.label}
                          >
                            {item.label}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${mobileExpanded === item.label ? 'bg-[#8B0E2A]/10 text-[#8B0E2A]' : 'bg-transparent text-gray-400'}`}>
                              <ChevronDown
                                size={18}
                                className={`transition-transform duration-300 ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
                              />
                            </div>
                          </button>
                          
                          <AnimatePresence>
                            {mobileExpanded === item.label && item.children && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="mx-4 mt-1 mb-3 bg-gray-50 rounded-xl p-2 space-y-1">
                                  {item.children.map((child: any) => {
                                    const Icon = child.icon || ArrowRight;
                                    return (
                                      <Link
                                        key={child.href}
                                        href={child.href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 min-h-[44px] px-3 rounded-lg text-[13.5px] font-medium text-gray-600 hover:text-[#8B0E2A] hover:bg-white transition-colors"
                                      >
                                        <Icon size={15} className="text-gray-400" />
                                        {child.label}
                                      </Link>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Drawer Footer */}
              <div className="p-6 bg-gray-50 border-t border-gray-200 shrink-0 space-y-3">
                <Link 
                  href="/contact" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full min-h-[48px] rounded-xl text-[14px] font-bold uppercase tracking-wide border-2 border-[#8B0E2A] text-[#8B0E2A] hover:bg-[#8B0E2A] hover:text-white transition-colors"
                >
                  Contact
                </Link>
                <Link 
                  href="/admissions" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full min-h-[48px] rounded-xl text-[14px] font-bold uppercase tracking-wide bg-[#8B0E2A] text-white hover:bg-[#6D0B20] transition-colors shadow-md"
                >
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
