import { Inbox } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  icon,
  title = 'No data available',
  description = 'There is nothing to display at the moment. Please check back later.',
  actionLabel,
  actionHref,
  action,
}: EmptyStateProps) {
  return (
    <div className="card max-w-lg mx-auto bg-[#FAF9F5]/80 border border-gray-100 shadow-sm flex flex-col items-center justify-center py-12 px-8 text-center rounded-2xl">
      <div className="w-16 h-16 rounded-xl bg-[#8B0E2A]/5 text-[#8B0E2A] flex items-center justify-center mb-6 shadow-sm">
        {icon || <Inbox size={28} className="text-[#8B0E2A]" />}
      </div>
      <h3 className="font-heading font-bold text-lg text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-[14px] max-w-sm leading-relaxed">{description}</p>
      {action && <div className="mt-6">{action}</div>}
      {!action && actionLabel && actionHref && (
        <Link href={actionHref} className="btn btn-primary btn-md mt-6 rounded-full">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
