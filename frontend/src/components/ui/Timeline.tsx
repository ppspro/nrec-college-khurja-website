import React from 'react';

interface TimelineItem {
  year?: string;
  step?: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
  layout?: 'vertical' | 'steps';
}

export default function Timeline({ items, layout = 'vertical' }: TimelineProps) {
  if (!items?.length) {
    return null;
  }

  if (layout === 'steps') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
        {items.map((item, index) => (
          <div key={index} className="relative flex flex-col group animate-fade-in">
            {/* Step circle */}
            <div className="w-12 h-12 rounded-2xl bg-[#8B0E2A]/10 border border-[#8B0E2A]/20 flex items-center justify-center text-[#8B0E2A] font-heading font-bold text-lg mb-5 group-hover:bg-[#8B0E2A] group-hover:text-white transition-all duration-300 shadow-sm">
              {item.step || `0${index + 1}`}
            </div>
            
            {/* Step text */}
            <h4 className="font-heading font-bold text-lg text-[#111111] mb-2 group-hover:text-[#8B0E2A] transition-colors duration-200">
              {item.title}
            </h4>
            <p className="text-sm text-[#666666] leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative border-l-2 border-gray-100 pl-8 space-y-10 py-2">
      {items.map((item, index) => (
        <div key={index} className="relative group animate-fade-in">
          {/* Bullet mark */}
          <div className="absolute -left-[41px] top-1.5 w-[20px] h-[20px] rounded-full bg-white border-4 border-[#8B0E2A] shadow-sm group-hover:scale-125 transition-transform duration-300" />
          
          {/* Time node */}
          {item.year && (
            <span className="text-[12px] font-bold tracking-wider text-[#B8860B] uppercase block mb-1">
              {item.year}
            </span>
          )}
          <h4 className="font-heading font-black text-xl text-[#111111] mb-2 group-hover:text-[#8B0E2A] transition-colors duration-200">
            {item.title}
          </h4>
          <p className="text-[#666666] leading-relaxed font-light text-base max-w-3xl">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
