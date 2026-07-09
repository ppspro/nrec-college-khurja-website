import { Mail, Phone } from 'lucide-react';
import { clsx } from 'clsx';
import SafeImage from './SafeImage';

interface FacultyCardProps {
  name: string;
  designation: string;
  department?: string;
  email?: string;
  phone?: string;
  image?: string;
  className?: string;
}

export default function FacultyCard({
  name,
  designation,
  department,
  email,
  phone,
  image,
  className = '',
}: FacultyCardProps) {
  return (
    <div className={clsx("bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] hover:border-gray-200 transition-all duration-300 group flex flex-col h-full", className)}>
      {/* Image Area */}
      <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden shrink-0">
        {image ? (
          <SafeImage
            src={image}
            alt={name}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <span className="font-heading font-bold text-6xl text-gray-200">
              {name.charAt(0)}
            </span>
          </div>
        )}
        
        {/* Gradient Overlay for bottom text readability if needed */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow bg-white z-10 -mt-2 relative rounded-t-2xl">
        {department && (
          <span className="text-[#8B0E2A] text-[11px] font-bold uppercase tracking-wider mb-2 block">
            {department}
          </span>
        )}
        
        <h3 className="font-heading font-bold text-[#111111] text-[20px] mb-1 leading-tight group-hover:text-[#8B0E2A] transition-colors truncate">
          {name}
        </h3>
        
        <p className="text-gray-500 text-[14px] font-medium mb-4 line-clamp-2">
          {designation}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-100 space-y-2.5">
          {email && (
            <div className="flex items-center gap-2.5 text-[13px] text-gray-500 hover:text-[#8B0E2A] transition-colors">
              <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                <Mail size={12} />
              </div>
              <a href={`mailto:${email}`} className="truncate">{email}</a>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-2.5 text-[13px] text-gray-500 hover:text-[#8B0E2A] transition-colors">
              <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                <Phone size={12} />
              </div>
              <a href={`tel:${phone}`} className="truncate">{phone}</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
