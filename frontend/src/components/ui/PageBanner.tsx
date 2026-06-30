import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
}

export default function PageBanner({ title, subtitle, breadcrumbs }: PageBannerProps) {
  return (
    <div className="relative overflow-hidden bg-[#111111] py-20">
      {/* Premium Institutional Watermark */}
      <div className="absolute -right-20 -top-24 opacity-[0.03] pointer-events-none select-none">
        <span className="font-heading font-bold text-[28rem] leading-none text-white">N</span>
      </div>
      
      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(198,160,77,0.4) 1px, transparent 0)`,
          backgroundSize: '48px 48px',
        }}
      />
      
      {/* Gradient Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#990A25] via-[#C6A04D] to-[#990A25]" />
      
      <div className="relative container-nrec">
        <nav className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.15em] uppercase mb-5" aria-label="Breadcrumb">
          <Link href="/" className="text-[#888888] hover:text-[#C6A04D] transition-colors">Home</Link>
          {breadcrumbs.map((b, idx) => (
            <React.Fragment key={idx}>
              <span className="text-[#555555]">/</span>
              {b.href ? (
                <Link href={b.href} className="text-[#888888] hover:text-[#C6A04D] transition-colors">{b.label}</Link>
              ) : (
                <span className="text-white select-none">{b.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
        
        <h1 className="font-heading text-white font-bold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight select-none mb-4">
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-[#AAAAAA] max-w-2xl text-base md:text-lg leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
