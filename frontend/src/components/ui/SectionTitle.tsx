import React from 'react';

interface SectionTitleProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  light?: boolean;
}

export default function SectionTitle({
  label,
  title,
  subtitle,
  align = 'left',
  className = '',
  light = false,
}: SectionTitleProps) {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div className={`flex flex-col ${alignmentClasses[align]} ${className}`}>
      {label && (
        <span className="section-label mb-2">
          {label}
        </span>
      )}
      <h2 className={`section-title ${light ? 'text-white' : 'text-[#111111]'} font-heading font-bold mb-3`}>
        {title}
      </h2>
      <div className={`divider-accent ${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''}`} />
      {subtitle && (
        <p className={`section-desc mt-2 ${light ? 'text-gray-300' : 'text-[#666666]'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
