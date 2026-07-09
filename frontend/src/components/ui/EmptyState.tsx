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
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-20 h-20 rounded-2xl bg-[#F3F4F6] flex items-center justify-center mb-6">
        {icon || <Inbox size={32} className="text-[#6B7280]" />}
      </div>
      <h3 className="font-heading font-bold text-xl text-[#111111] mb-2">{title}</h3>
      <p className="text-[#6B7280] text-sm max-w-md leading-relaxed">{description}</p>
      {action && <div className="mt-6">{action}</div>}
      {!action && actionLabel && actionHref && (
        <Link href={actionHref} className="btn btn-primary btn-md mt-6">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
