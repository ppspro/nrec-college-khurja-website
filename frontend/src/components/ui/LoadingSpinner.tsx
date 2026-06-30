import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-8 h-8 border-4 border-[#990A25]/20 border-t-[#990A25] rounded-full animate-spin" />
    </div>
  );
}
