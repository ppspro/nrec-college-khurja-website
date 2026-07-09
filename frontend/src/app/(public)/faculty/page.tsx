'use client';

import { useState, useEffect } from 'react';
import { Mail, Briefcase, GraduationCap } from 'lucide-react';
import api, { uploadsUrl } from '@/lib/api';
import { Faculty } from '@/types';
import PageBanner from '@/components/ui/PageBanner';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SafeImage from '@/components/ui/SafeImage';
import EmptyState from '@/components/ui/EmptyState';
import { truncate } from '@/lib/defaults';

export default function FacultyPage() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/faculty');
        setFaculty(res.data.faculty || []);
      } catch { setFaculty([]); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const breadcrumbs = [{ label: 'Faculty' }];

  return (
    <>
      <PageBanner
        title="Our Faculty"
        subtitle="Meet the distinguished educators and researchers shaping the future at NREC."
        breadcrumbs={breadcrumbs}
      />

      <section className="bg-[#F8F5F0] section-py relative">
        <div className="container-nrec relative">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton h-80 rounded-[20px]" />)}
            </div>
          ) : faculty.length === 0 ? (
            <EmptyState title="No faculty members found" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {faculty.map((member, idx) => {
                const dept = typeof member.department === 'object' && member.department !== null ? member.department.name : 'General';
                return (
                  <ScrollReveal key={member._id} direction="up" delay={0.05 * (idx % 4)} className="h-full">
                    <div className="card p-0 overflow-hidden h-full flex flex-col group bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300">
                      
                      {/* Photo Area */}
                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                        <SafeImage
                          fallbackKey="faculty"
                          src={uploadsUrl(member.photo)}
                          alt={member.name}
                          fill
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                          {member.email && (
                            <a href={`mailto:${member.email}`} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#8B0E2A] transition-colors border border-white/30">
                              <Mail size={18} />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 text-center flex flex-col flex-grow relative">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-[#B8860B] border border-gray-100 group-hover:bg-[#B8860B] group-hover:text-white transition-colors duration-300">
                          <GraduationCap size={20} />
                        </div>
                        
                        <h3 className="font-heading font-bold text-lg text-[#111111] mt-4 mb-1 group-hover:text-[#8B0E2A] transition-colors">
                          {member.name}
                        </h3>
                        
                        <p className="text-[#8B0E2A] text-sm font-semibold mb-3">
                          {member.designation}
                        </p>
                        
                        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 mb-4 bg-gray-50 py-1.5 px-3 rounded-full mx-auto font-medium">
                          <Briefcase size={14} className="text-gray-400" />
                          {dept}
                        </div>
                        
                        {member.qualification && (
                          <p className="text-sm text-gray-500 font-light mt-auto">
                            {truncate(member.qualification, 60)}
                          </p>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
