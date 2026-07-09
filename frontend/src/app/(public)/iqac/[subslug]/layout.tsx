import React from 'react';

export async function generateStaticParams() {
  return [
    { subslug: 'members' },
    { subslug: 'aqar' },
    { subslug: 'action-taken-report' }
  ];
}

export default function IqacLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
