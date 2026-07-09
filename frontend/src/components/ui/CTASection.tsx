import Link from 'next/link';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { clsx } from 'clsx';

export interface CTAStat {
  label: string;
  value: string | number;
}

interface CTASectionProps {
  title: string;
  subtitle: string;
  stats?: CTAStat[];
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  className?: string;
}

export default function CTASection({
  title,
  subtitle,
  stats = [],
  primaryAction = { label: 'Apply for Admission', href: '/admissions' },
  secondaryAction = { label: 'Explore Courses', href: '/courses' },
  className = '',
}: CTASectionProps) {
  return (
    <div className={clsx("relative overflow-hidden w-full", className)} style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #9B1030 0%, #7A081E 40%, #0F0F0F 100%)' }} />
      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle at 1.5px 1.5px, rgba(255,255,255,0.8) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />
      {/* Radial glow center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,14,42,0.3)_0%,transparent_70%)]" />
      {/* Bottom gold accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#B8860B] via-[#D4A520] to-[#B8860B]" />

      <div className="relative container-nrec">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 border border-white/20 mb-8 shadow-lg backdrop-blur-sm">
            <GraduationCap size={30} className="text-[#D4A520]" />
          </div>

          {/* Heading */}
          <h2 className="font-heading text-white font-bold mb-5 leading-[1.1]" style={{ fontSize: 'clamp(1.875rem, 4.5vw, 3rem)' }}>
            {title}
          </h2>

          {/* Subtext */}
          <p className="text-red-200/90 text-[17px] mb-10 leading-relaxed max-w-[540px] mx-auto font-light">
            {subtitle}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            {primaryAction && (
              <Link
                href={primaryAction.href}
                className="btn btn-white btn-lg rounded-full shadow-xl w-full sm:w-auto flex justify-center"
                style={{ paddingInline: '36px' }}
              >
                {primaryAction.label}
                <ArrowRight size={18} />
              </Link>
            )}
            {secondaryAction && (
              <Link
                href={secondaryAction.href}
                className="btn btn-lg rounded-full w-full sm:w-auto flex justify-center"
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid rgba(255,255,255,0.35)',
                  paddingInline: '36px',
                }}
              >
                {secondaryAction.label}
              </Link>
            )}
          </div>

          {/* Stats Row */}
          {stats.length > 0 && (
            <>
              {/* Divider */}
              <div className="border-t border-white/10 mb-10" />
              <div className="flex flex-wrap items-center justify-center gap-0">
                {stats.map((item, idx) => (
                  <div key={item.label} className="flex items-center">
                    <div className="text-center px-8 py-2">
                      <div className="font-heading text-white font-bold text-[2rem] md:text-[2.25rem] leading-tight drop-shadow-sm">{item.value}</div>
                      <div className="text-[#D4A520]/80 font-medium text-[11.5px] mt-1.5 uppercase tracking-[0.12em]">{item.label}</div>
                    </div>
                    {idx < stats.length - 1 && (
                      <div className="w-px h-12 bg-white/15 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
