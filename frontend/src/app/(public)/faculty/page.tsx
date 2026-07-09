'use client';

import { useState, useEffect } from 'react';
import api, { uploadsUrl } from '@/lib/api';
import { Faculty } from '@/types';
import PageBanner from '@/components/ui/PageBanner';
import ScrollReveal from '@/components/ui/ScrollReveal';
import EmptyState from '@/components/ui/EmptyState';
import FacultyCard from '@/components/ui/FacultyCard';

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
                    <FacultyCard 
                      name={member.name}
                      designation={member.designation}
                      department={dept}
                      email={member.email}
                      phone={member.phone}
                      image={member.photo ? uploadsUrl(member.photo) : undefined}
                      className="h-full"
                    />
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
