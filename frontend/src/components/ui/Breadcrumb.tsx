import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-gray-400 text-sm font-medium" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-[#C6A04D] transition-colors">Home</Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <span>/</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-[#C6A04D] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-white select-none">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
