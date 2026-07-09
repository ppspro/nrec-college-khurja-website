import React from 'react';

export async function generateStaticParams() {
  return [
    { subslug: 'computer-lab' },
    { subslug: 'hostel' },
    { subslug: 'canteen' }
  ];
}

export default function FacilitiesSubLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
