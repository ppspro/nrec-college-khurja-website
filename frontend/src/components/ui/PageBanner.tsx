import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  children?: React.ReactNode;
}

export default function PageBanner({ title, subtitle, breadcrumbs, children }: PageBannerProps) {
  return (
    <div className="page-banner">
      <div className="page-banner-accent" />
      <div className="relative container-nrec z-10">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 mb-4 text-sm" aria-label="Breadcrumb">
            <Link
              href="/"
              className="text-gray-400 hover:text-[#B8860B] transition-colors"
            >
              Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="flex items-center gap-1.5">
                <ChevronRight size={14} className="text-gray-600" />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-gray-400 hover:text-[#B8860B] transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {children}

        {/* Title */}
        <h1 className="font-heading text-white font-bold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mt-2">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-gray-300 mt-3 text-lg max-w-2xl leading-relaxed font-light">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
