'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Department } from '@/types';
import { uploadsUrl } from '@/lib/api';

const DEPT_COLORS = ['#990A25', '#C6A04D', '#2563EB', '#059669', '#7C3AED', '#DC2626', '#0891B2', '#D97706'];

interface DepartmentsSectionProps {
  departments: Department[];
}

export default function DepartmentsSection({ departments }: DepartmentsSectionProps) {
  const displayed = departments.length > 0 ? departments.slice(0, 8) : [
    { _id: '1', name: 'Faculty of Arts', shortName: 'Arts', description: 'Humanities, languages, and social sciences', slug: 'arts' },
    { _id: '2', name: 'Faculty of Science', shortName: 'Science', description: 'Physics, chemistry, biology, mathematics', slug: 'science' },
    { _id: '3', name: 'Faculty of Commerce', shortName: 'Commerce', description: 'Business, accounting, and economics', slug: 'commerce' },
    { _id: '4', name: 'Dept. of Education', shortName: 'B.Ed', description: 'Teacher training and pedagogy', slug: 'education' },
    { _id: '5', name: 'Dept. of Computer Science', shortName: 'CS', description: 'Programming, networking and IT', slug: 'computer-science' },
    { _id: '6', name: 'Dept. of Home Science', shortName: 'Home Sc.', description: 'Nutrition, textile, and family studies', slug: 'home-science' },
  ];

  return (
    <section className="bg-white section-py">
      <div className="container-nrec">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <span className="section-label">Academic Faculties</span>
            <h2 className="section-title">Our Departments</h2>
            <div className="divider-accent" />
          </div>
          <Link href="/departments" className="btn btn-outline flex-shrink-0 self-start md:self-auto">
            All Departments <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayed.map((dept, idx) => (
            <Link
              key={dept._id}
              href={`/departments/${(dept as Department).slug}`}
              className="card card-hover-primary p-8 group flex flex-col h-full"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm border"
                style={{ background: `${DEPT_COLORS[idx % DEPT_COLORS.length]}10`, borderColor: `${DEPT_COLORS[idx % DEPT_COLORS.length]}20` }}
              >
                <BookOpen size={24} style={{ color: DEPT_COLORS[idx % DEPT_COLORS.length] }} />
              </div>

              {(dept as Department).image ? (
                <div className="w-full h-32 rounded-xl overflow-hidden mb-4">
                  <Image src={uploadsUrl((dept as Department).image)} alt={dept.name} width={300} height={128} className="object-cover w-full h-full" />
                </div>
              ) : null}

              <h3 className="font-heading font-bold text-[#111111] text-xl mb-3 group-hover:text-[#990A25] transition-colors leading-tight">
                {dept.name}
              </h3>
              <p className="text-[#666666] text-[15px] leading-relaxed mb-6">
                {(dept as Department).description || 'Dedicated to academic excellence and research.'}
              </p>
              <div className="mt-auto flex items-center gap-2 text-[#990A25] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Explore <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
