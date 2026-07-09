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

  const fallbackDepartments = [
    { _id: '1', name: 'Department of Computer Science', slug: 'computer-science', shortName: 'CS', description: 'Offering cutting edge UG & PG qualifications in computational systems, programming, and software engineering.', headOfDepartment: 'Dr. S.K. Gupta' },
    { _id: '2', name: 'Department of Botany', slug: 'botany', shortName: 'BOT', description: 'Advanced research in plant physiology, biodiversity, biotechnology, and botanical sciences.', headOfDepartment: 'Dr. A.K. Sharma' },
    { _id: '3', name: 'Department of Chemistry', slug: 'chemistry', shortName: 'CHEM', description: 'Exploring organic, inorganic, and physical chemistry under state-of-the-art analytical labs.', headOfDepartment: 'Dr. R.P. Singh' },
    { _id: '4', name: 'Department of Physics', slug: 'physics', shortName: 'PHY', description: 'Researching quantum mechanics, electromagnetism, and optical physics with laboratory work.', headOfDepartment: 'Dr. M.K. Jain' },
    { _id: '5', name: 'Department of Mathematics', slug: 'mathematics', shortName: 'MATH', description: 'Fostering mathematical analysis, logical deduction, and advanced statistics methodologies.', headOfDepartment: 'Dr. S.S. Tyagi' },
    { _id: '6', name: 'Department of commerce', slug: 'commerce', shortName: 'COM', description: 'Covering accounting, trade economics, business administration, and financial markets.', headOfDepartment: 'Dr. V.P. Gupta' }
  ];

  const visibleDepartments = departments.length > 0 ? departments : fallbackDepartments;

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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {visibleDepartments.map((dept: any, index: number) => (
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
