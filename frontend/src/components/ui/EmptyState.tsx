import React from 'react';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  icon = '📋',
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="py-16 text-center bg-white border border-[#E7E7E7] p-8" style={{ borderRadius: 'var(--radius-card)' }}>
      <div className="text-5xl mb-4 select-none opacity-50">{icon}</div>
      <h3 className="font-heading font-bold text-lg text-[#111111] mb-2">{title}</h3>
      <p className="text-sm text-[#666666] max-w-sm mx-auto mb-6 leading-relaxed">{description}</p>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
