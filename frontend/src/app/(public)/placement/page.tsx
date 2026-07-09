'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PlacementAlias() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/placements');
  }, [router]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#8B0E2A] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
