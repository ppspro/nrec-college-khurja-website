'use client';

import { useState, useEffect } from 'react';
import PageBanner from '@/components/ui/PageBanner';
import ScrollReveal from '@/components/ui/ScrollReveal';
import EmptyState from '@/components/ui/EmptyState';
import DepartmentCard from '@/components/ui/DepartmentCard';
import { API_URL as API } from '@/lib/api';

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
                  <DepartmentCard department={dept} index={index} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
