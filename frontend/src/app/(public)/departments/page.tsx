import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import PageBanner from '@/components/ui/PageBanner';

export const metadata: Metadata = {
  title: 'Departments | NREC College Khurja',
  description: 'Explore all academic departments at NREC College including Arts, Science, Commerce, Education, and more.',
};

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getDepartments() {
  try {
    const res = await fetch(`${API}/departments`, { next: { revalidate: 300 } });
    const data = await res.json();
    return data.departments || [];
  } catch {
    return [];
  }
}

export default async function DepartmentsPage() {
  const departments = await getDepartments();

  const breadcrumbs = [{ label: 'Departments' }];

  return (
    <>
      <PageBanner
        title="Academic Departments"
        subtitle="Discover our diverse range of faculties and departments."
        breadcrumbs={breadcrumbs}
      />

      <section className="bg-white section-py relative">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        
        <div className="container-nrec relative">
          {departments.length === 0 ? (
            <div className="text-center py-20 text-[#666666]">Departments coming soon.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {departments.map((dept: any, idx: number) => (
                <Link
                  key={dept._id}
                  href={`/departments/${dept.slug}`}
                  className="group flex flex-col h-full bg-white border border-[#E7E7E7] rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 relative"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#990A25] to-[#C6A04D] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                  
                  <div className="p-8 flex flex-col h-full relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-[#990A25]/5 flex items-center justify-center mb-6 group-hover:bg-[#990A25] group-hover:text-white text-[#990A25] transition-colors duration-300">
                      <BookOpen size={26} />
                    </div>
                    
                    <h3 className="font-heading font-bold text-[#111111] text-xl mb-3 group-hover:text-[#990A25] transition-colors">
                      {dept.name}
                    </h3>
                    
                    <p className="text-[#666666] text-sm leading-relaxed mb-6 flex-1 font-light">
                      {dept.description || 'Dedicated to academic excellence and holistic development.'}
                    </p>
                    
                    <div className="pt-5 border-t border-[#E7E7E7]/60 flex items-center justify-between">
                      <div className="text-xs font-semibold text-[#111111] uppercase tracking-wider">
                        {dept.headOfDepartment ? `HoD: ${dept.headOfDepartment}` : 'View Details'}
                      </div>
                      <div className="w-8 h-8 rounded-full border border-[#E7E7E7] flex items-center justify-center text-[#990A25] group-hover:bg-[#990A25] group-hover:border-[#990A25] group-hover:text-white transition-all duration-300">
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Subtle watermark in card background */}
                  <div className="absolute -right-6 -bottom-6 opacity-[0.03] text-9xl font-heading font-bold pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
