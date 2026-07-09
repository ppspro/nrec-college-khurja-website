'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import PageBanner from '@/components/ui/PageBanner';
import ScrollReveal from '@/components/ui/ScrollReveal';
import EmptyState from '@/components/ui/EmptyState';
import SafeImage from '@/components/ui/SafeImage';
import { uploadsUrl, API_URL as API } from '@/lib/api';
import { truncate } from '@/lib/defaults';

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API}/departments`);
        if (res.ok) {
          const data = await res.json();
          setDepartments(data.departments || []);
        }
      } catch {
        setDepartments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const breadcrumbs = [{ label: 'Departments' }];

  return (
    <>
      <PageBanner
        title="Academic Departments"
        subtitle="Discover our diverse range of faculties and departments."
        breadcrumbs={breadcrumbs}
      />

      <section className="bg-[#F8F5F0] section-py relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#8B0E2A 1px, transparent 1px), linear-gradient(90deg, #8B0E2A 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="container-nrec relative">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-[380px] rounded-[24px]" />)}
            </div>
          ) : departments.length === 0 ? (
            <EmptyState 
              title="No Departments Found" 
              description="We are currently updating our department information." 
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {departments.map((dept: any, index: number) => (
                <ScrollReveal
                  key={dept._id}
                  direction="up"
                  delay={0.05 * index}
                  className="h-full group"
                >
                  <Link href={`/departments/${dept.slug}`} className="block h-full">
                    <div className="card h-full p-0 overflow-hidden relative isolate bg-white shadow-lg hover:shadow-2xl transition-all duration-300">
                      
                      {/* Top Image Area */}
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <SafeImage
                          fallbackKey="department"
                          src={uploadsUrl(dept.image)}
                          alt={dept.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        {/* Overlay Content */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                            <BookOpen size={24} />
                          </div>
                          {dept.shortName && (
                            <span className="text-white font-bold text-lg opacity-80 uppercase tracking-widest font-heading">
                              {dept.shortName}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 flex flex-col flex-grow">
                        <h3 className="font-heading font-bold text-[#111111] text-2xl mb-3 group-hover:text-[#8B0E2A] transition-colors leading-tight">
                          {dept.name}
                        </h3>
                        
                        <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow font-light">
                          {truncate(dept.description || '', 140)}
                        </p>
                        
                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                            {dept.headOfDepartment ? `HOD: ${dept.headOfDepartment}` : 'Explore Department'}
                          </div>
                          <div className="w-8 h-8 rounded-full bg-[#F8F5F0] flex items-center justify-center text-[#8B0E2A] group-hover:bg-[#8B0E2A] group-hover:text-white transition-all duration-300">
                            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
