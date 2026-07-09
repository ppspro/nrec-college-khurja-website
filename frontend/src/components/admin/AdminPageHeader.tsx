'use client';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  helpSection?: string; // anchor ID in Admin_User_Manual.html
  children?: React.ReactNode; // action buttons (e.g., "Add New")
}

/**
 * AdminPageHeader — standardised header for every admin module page.
 * Shows title, description, a contextual Help button, and action slots.
 */
export default function AdminPageHeader({
  title,
  description,
  helpSection,
  children,
}: AdminPageHeaderProps) {
  const helpUrl = helpSection
    ? `/Admin_User_Manual.html#${helpSection}`
    : `/Admin_User_Manual.html`;

  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
      {/* Left: Title + description */}
      <div>
        <h1 className="text-2xl font-bold text-[#8B0E2A] font-heading">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-gray-600 max-w-xl">{description}</p>
        )}
      </div>

      {/* Right: Help + Action buttons */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <a
          href={helpUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Open help documentation for this page"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-[#8B0E2A] hover:bg-red-50 border border-gray-200 hover:border-[#8B0E2A]/30 transition-all"
        >
          <HelpCircle size={16} />
          Help
        </a>
        {children}
      </div>
    </div>
  );
}
