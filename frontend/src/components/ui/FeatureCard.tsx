import { clsx } from 'clsx';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  colorTheme?: 'primary' | 'secondary' | 'emerald' | 'blue' | 'purple';
  className?: string;
}

const themeMap = {
  primary: { text: 'text-[#8B0E2A]', bg: 'bg-[#8B0E2A]/10', hover: 'group-hover:bg-[#8B0E2A] group-hover:text-white' },
  secondary: { text: 'text-[#B8860B]', bg: 'bg-[#B8860B]/10', hover: 'group-hover:bg-[#B8860B] group-hover:text-white' },
  emerald: { text: 'text-emerald-600', bg: 'bg-emerald-50', hover: 'group-hover:bg-emerald-600 group-hover:text-white' },
  blue: { text: 'text-blue-600', bg: 'bg-blue-50', hover: 'group-hover:bg-blue-600 group-hover:text-white' },
  purple: { text: 'text-purple-600', bg: 'bg-purple-50', hover: 'group-hover:bg-purple-600 group-hover:text-white' },
};

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  colorTheme = 'primary',
  className = '',
}: FeatureCardProps) {
  const theme = themeMap[colorTheme] || themeMap.primary;

  return (
    <div className={clsx("bg-white border border-gray-100 rounded-2xl p-6 md:p-8 flex flex-col items-start shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:border-gray-200 transition-all duration-300 group", className)}>
      <div className={clsx("w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300", theme.bg, theme.text, theme.hover)}>
        <Icon size={24} strokeWidth={2} className="transition-transform duration-300 group-hover:scale-110" />
      </div>
      
      <h3 className="font-heading font-bold text-[#111111] text-[19px] mb-3 leading-tight group-hover:text-[#8B0E2A] transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-500 text-[14.5px] leading-relaxed font-light mb-0 flex-grow">
        {description}
      </p>
    </div>
  );
}
