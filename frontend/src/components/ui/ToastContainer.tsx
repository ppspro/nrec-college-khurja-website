import React from 'react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastContainerProps {
  toasts: Toast[];
  onClose: (id: string) => void;
}

export default function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((t) => {
        const bgColors = {
          success: 'bg-[#dcfce7] border-[#bbf7d0] text-[#15803d]',
          error: 'bg-red-50 border-red-200 text-red-700',
          info: 'bg-blue-50 border-blue-200 text-blue-700',
        };

        return (
          <div
            key={t.id}
            onClick={() => onClose(t.id)}
            className={`p-4 rounded-xl border shadow-lg flex items-center justify-between cursor-pointer transition-all duration-300 transform translate-y-0 animate-fade-in-up ${bgColors[t.type]}`}
          >
            <span className="text-sm font-medium">{t.message}</span>
            <span className="text-xs opacity-50 ml-3 hover:opacity-100">✕</span>
          </div>
        );
      })}
    </div>
  );
}
