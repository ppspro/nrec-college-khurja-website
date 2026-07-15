import { Mail, Phone, Clock, BookOpen, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';
import SafeImage from './SafeImage';
import Link from 'next/link';

interface FacultyCardProps {
  name: string;
  slug: string;
  designation: string;
  department?: string;
  facultyCategory?: string;
  email?: string;
  phone?: string;
  image?: string;
  specialization?: string[];
  officeHours?: string;
  className?: string;
}

export default function FacultyCard({
  name,
  slug,
  designation,
  department,
  facultyCategory,
  email,
  phone,
  image,
  specialization = [],
  officeHours,
  className = '',
}: FacultyCardProps) {
  return (
    <div className={clsx("bg-white border border-[#E7E7E7]/60 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_48px_rgba(139,14,42,0.08)] hover:border-[#8B0E2A]/20 transition-all duration-300 group flex flex-col h-full transform hover:-translate-y-1.5", className)}>
      {/* Image Area */}
      <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden shrink-0">
        {image ? (
          <SafeImage
            src={image}
            alt={name}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-[#8B0E2A]/5">
            <span className="font-heading font-black text-6xl text-gray-200 group-hover:text-[#8B0E2A]/10 transition-colors">
              {name.charAt(0)}
            </span>
          </div>
        )}
        
        {/* Category Badge overlay */}
        {facultyCategory && (
          <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-[#E7E7E7] text-[#8B0E2A] text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm z-20">
            Faculty of {facultyCategory}
          </span>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow bg-white relative rounded-t-2xl z-10">
        <div className="flex items-center gap-2 mb-1.5">
          {department && (
            <span className="text-[#8B0E2A] text-[10px] font-black uppercase tracking-wider">
              {department}
            </span>
          )}
          {department && <div className="w-1.5 h-1.5 rounded-full bg-[#B8860B]/60" />}
        </div>
        
        <h3 className="font-heading font-bold text-[#111111] text-[19px] mb-1 leading-tight group-hover:text-[#8B0E2A] transition-colors truncate">
          {name}
        </h3>
        
        <p className="text-gray-500 text-[13px] font-medium mb-3">
          {designation}
        </p>

        {/* Dynamic fields */}
        <div className="space-y-2 mb-4 pt-3 border-t border-[#E7E7E7]/50 text-xs text-gray-600">
          {specialization && specialization.length > 0 && (
            <div className="flex items-start gap-2">
              <BookOpen size={13} className="text-[#B8860B] shrink-0 mt-0.5" />
              <span className="line-clamp-1"><strong className="font-semibold text-gray-700">Research:</strong> {specialization.join(', ')}</span>
            </div>
          )}
          {officeHours && (
            <div className="flex items-start gap-2">
              <Clock size={13} className="text-[#B8860B] shrink-0 mt-0.5" />
              <span className="line-clamp-1"><strong className="font-semibold text-gray-700">Hours:</strong> {officeHours}</span>
            </div>
          )}
        </div>
        
        {/* Contact info and actions */}
        <div className="mt-auto pt-4 border-t border-[#E7E7E7]/60 space-y-2">
          {email && (
            <div className="flex items-center gap-2 text-[12px] text-gray-500 hover:text-[#8B0E2A] transition-colors">
              <Mail size={12} className="text-gray-400 shrink-0" />
              <a href={`mailto:${email}`} className="truncate">{email}</a>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-2 text-[12px] text-gray-500 hover:text-[#8B0E2A] transition-colors">
              <Phone size={12} className="text-gray-400 shrink-0" />
              <a href={`tel:${phone}`} className="truncate">{phone}</a>
            </div>
          )}

          <div className="pt-2">
            <Link
              href={`/faculty/${slug}`}
              className="flex items-center justify-center gap-1.5 w-full bg-[#8B0E2A] hover:bg-[#700B22] text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors shadow-sm shadow-[#8B0E2A]/10"
            >
              View Profile <ExternalLink size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
