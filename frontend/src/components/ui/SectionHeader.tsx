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
        <span className="section-label block">
          {label}
        </span>
      )}
      <h2 className="section-title relative pb-2 inline-block">
        {title}
        <div
          className={clsx(
            'divider-accent',
            align === 'center' && 'mx-auto',
            align === 'right' && 'ml-auto mr-0',
            align === 'left' && 'mr-auto ml-0'
          )}
        />
      </h2>
      {description && (
        <p className="section-desc mt-2">
          {description}
        </p>
      )}
    </div>
  );
}
