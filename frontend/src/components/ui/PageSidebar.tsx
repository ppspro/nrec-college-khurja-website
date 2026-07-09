'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Mail, MapPin, GraduationCap, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarLink {
  label: string;
  href: string;
}

const groups: Record<string, { title: string; links: SidebarLink[] }> = {
  about: {
    title: 'About Us',
    links: [
      { label: 'About College', href: '/about' },
      { label: 'History', href: '/history' },
      { label: 'Vision & Mission', href: '/vision-mission' },
      { label: 'Recognition & Affiliation', href: '/recognition-affiliation' }
    ]
  },
  admin: {
    title: 'Administration',
    links: [
      { label: 'Principal Message', href: '/principal-message' },
      { label: 'Management', href: '/management' },
      { label: 'Governing Body', href: '/governing-body' },
      { label: 'College Committee', href: '/college-committee' },
      { label: 'NAAC', href: '/naac' },
      { label: 'Administrative Staff', href: '/administrative-staff' }
    ]
  },
  iqac: {
    title: 'IQAC Portal',
    links: [
      { label: 'IQAC Members', href: '/iqac/members' },
      { label: 'AQAR Reports', href: '/iqac/aqar' },
      { label: 'Action Taken Report', href: '/iqac/action-taken-report' }
    ]
  },
  facilities: {
    title: 'Campus Facilities',
    links: [
      { label: 'Computer Lab', href: '/facilities/computer-lab' },
      { label: 'College Hostel', href: '/facilities/hostel' },
      { label: 'Canteen', href: '/facilities/canteen' }
    ]
  }
};

export default function PageSidebar({ currentSlug }: { currentSlug: string }) {
  const pathname = usePathname();

  // Find the active group based on URL matches
  let activeGroupKey = 'about';
  if (pathname.includes('/iqac')) {
    activeGroupKey = 'iqac';
  } else if (pathname.includes('/facilities')) {
    activeGroupKey = 'facilities';
  } else if (
    pathname.includes('/principal-message') ||
    pathname.includes('/management') ||
    pathname.includes('/governing-body') ||
    pathname.includes('/college-committee') ||
    pathname.includes('/naac') ||
    pathname.includes('/administrative-staff')
  ) {
    activeGroupKey = 'admin';
  } else {
    // Check slug matches
    const key = Object.keys(groups).find(groupKey => 
      groups[groupKey].links.some(l => l.href === `/${currentSlug}`)
    );
    if (key) activeGroupKey = key;
  }

  const activeGroup = groups[activeGroupKey] || groups.about;

  return (
    <aside className="space-y-8 sticky top-28">
      {/* Navigation Links Group */}
      <div className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <h3 className="font-heading font-bold text-[#111111] text-xl mb-4 pb-3 border-b border-gray-100">
          {activeGroup.title}
        </h3>
        <nav className="space-y-1">
          {activeGroup.links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "flex items-center justify-between px-4 py-3 rounded-xl text-[14.5px] font-medium transition-all duration-200 group/link",
                  isActive
                    ? "bg-[#8B0E2A]/10 text-[#8B0E2A] font-bold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-[#8B0E2A]"
                )}
              >
                <span>{link.label}</span>
                <ChevronRight 
                  size={15} 
                  className={clsx(
                    "transition-transform duration-200",
                    isActive ? "text-[#8B0E2A] translate-x-0.5" : "text-gray-300 group-hover/link:translate-x-1"
                  )} 
                />
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Quick Contact Card */}
      <div className="bg-gradient-to-br from-[#8B0E2A] to-[#6A0B20] text-white rounded-[24px] p-7 shadow-lg relative overflow-hidden">
        <div className="absolute right-[-10px] top-[-10px] opacity-10 text-white pointer-events-none">
          <GraduationCap size={140} />
        </div>
        
        <h3 className="font-heading font-bold text-xl mb-2 relative z-10">Quick Contact</h3>
        <p className="text-white/80 text-[13.5px] mb-6 leading-relaxed relative z-10">
          Reach out to our administrative office for admission guidelines and general queries.
        </p>

        <div className="space-y-4 text-[13.5px] relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <Phone size={14} className="text-[#B8860B]" />
            </div>
            <span>+91 1234 567890</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <Mail size={14} className="text-[#B8860B]" />
            </div>
            <a href="mailto:info@nrec.ac.in" className="hover:underline">info@nrec.ac.in</a>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <MapPin size={14} className="text-[#B8860B]" />
            </div>
            <span className="leading-tight">NREC College, Khurja,<br />Bulandshahr, UP - 203131</span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <span className="text-[11px] uppercase tracking-wider text-[#B8860B] font-bold">
            Affiliated to CCS University
          </span>
        </div>
      </div>
    </aside>
  );
}
