import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { truncate } from '@/lib/defaults';
import type { Department } from '@/types';
import { clsx } from 'clsx';

interface DepartmentCardProps {
  department: Department;
  index?: number;
  className?: string;
}

const colorMap = [
  { text: 'text-[#8B0E2A]', bg: 'bg-[#8B0E2A]/10' },
  { text: 'text-[#B8860B]', bg: 'bg-[#B8860B]/10' },
  { text: 'text-blue-600', bg: 'bg-blue-50' },
  { text: 'text-emerald-600', bg: 'bg-emerald-50' },
  { text: 'text-purple-600', bg: 'bg-purple-50' },
  { text: 'text-rose-500', bg: 'bg-rose-50' },
];

export default function DepartmentCard({ department, index = 0, className = '' }: DepartmentCardProps) {
  const color = colorMap[index % colorMap.length];

  return (
    <div className={clsx("h-full flex flex-col group", className)}>
      <Link href={`/departments/${department.slug}`} className="block h-full">
        <div className="bg-white border border-gray-100/80 rounded-[20px] p-7 h-full flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] hover:border-gray-200 transition-all duration-300">
          <div className={`w-13 h-13 rounded-xl flex items-center justify-center mb-5 ${color.bg} ${color.text} group-hover:scale-110 transition-transform duration-300`}>
            <BookOpen size={22} strokeWidth={2} />
          </div>
          
          <h3 className="font-heading font-bold text-[#111111] text-[18px] mb-2.5 leading-tight group-hover:text-[#8B0E2A] transition-colors line-clamp-2">
            {department.name}
          </h3>
          
          <p className="text-gray-500 text-[13.5px] leading-relaxed font-light mt-auto">
            {truncate(department.description || '', 70)}
          </p>

          <div className="flex items-center gap-1 text-[#8B0E2A] font-bold text-[13px] mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Explore
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </div>
  );
}
