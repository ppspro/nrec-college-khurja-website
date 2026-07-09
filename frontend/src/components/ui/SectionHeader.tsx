import React from 'react';
import { clsx } from 'clsx';

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export default function SectionHeader({
  label,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  return (
    <div
      className={clsx(
        'mb-12 animate-fade-in',
        align === 'center' && 'text-center flex flex-col items-center',
        align === 'right' && 'text-right flex flex-col items-end',
        className
      )}
    >
      {label && (
        <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#B8860B] mb-2.5 block">
          {label}
        </span>
      )}
      <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#111111] leading-tight tracking-tight relative pb-4">
        {title}
        <span
          className={clsx(
            'absolute bottom-0 h-[3px] bg-[#8B0E2A] rounded-full w-12',
            align === 'center' && 'left-1/2 -translate-x-1/2',
            align === 'right' && 'right-0',
            align === 'left' && 'left-0'
          )}
        />
      </h2>
      {description && (
        <p className="mt-4 text-[#666666] leading-relaxed max-w-2xl font-light text-base">
          {description}
        </p>
      )}
    </div>
  );
}
