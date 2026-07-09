import { notFound } from 'next/navigation';
import PageBanner from '@/components/ui/PageBanner';
import { API_URL } from '@/lib/api';
import React from 'react';
import CallToAction from '@/components/sections/CallToAction';
import HeritageTemplate from '@/components/templates/HeritageTemplate';
import PeopleTemplate from '@/components/templates/PeopleTemplate';
import AcademicTemplate from '@/components/templates/AcademicTemplate';
import CampusTemplate from '@/components/templates/CampusTemplate';
import StudentTemplate from '@/components/templates/StudentTemplate';
import DocumentTemplate from '@/components/templates/DocumentTemplate';
import GenericTemplate from '@/components/templates/GenericTemplate';

async function getPage(subslug: string) {
  try {
    const res = await fetch(`${API_URL}/pages/facilities-${subslug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.page;
  } catch (err) {
    return null;
  }
}

function resolveTemplate(slug: string) {
  const heritageSlugs = ['about', 'history', 'vision-mission', 'recognition-affiliation'];
  const peopleSlugs = ['principal-message', 'management', 'governing-body', 'college-committee', 'administrative-staff', 'proctorial-board'];
  const campusSubstrings = ['library', 'sports', 'hostel', 'ncc', 'nss', 'canteen', 'computer-lab', 'facilities'];
  const studentSubstrings = ['admission-process', 'scholarship', 'placements', 'anti-ragging', 'admission'];
  const docSubstrings = ['downloads', 'tenders', 'results', 'examination-downloads', 'download', 'examination'];

  if (heritageSlugs.includes(slug)) return HeritageTemplate;
  if (peopleSlugs.includes(slug)) return PeopleTemplate;
  if (campusSubstrings.some(s => slug.includes(s))) return CampusTemplate;
  if (studentSubstrings.some(s => slug.includes(s))) return StudentTemplate;
  if (docSubstrings.some(s => slug.includes(s))) return DocumentTemplate;
  if (slug === 'academics' || slug.includes('syllabus') || slug.includes('courses') || slug.includes('departments') || slug.includes('research')) return AcademicTemplate;
  
  return GenericTemplate;
}

export default async function FacilitiesSubPage({ params }: { params: Promise<{ subslug: string }> | { subslug: string } }) {
  const resolvedParams = await params;
  const subslug = resolvedParams.subslug;
  const page = await getPage(subslug);

  if (!page) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">404</h1>
        <p className="text-gray-600 mb-8 max-w-md">The facility page you are looking for does not exist or has been moved.</p>
        <a href="/" className="px-6 py-2.5 bg-[#8B0E2A] text-white font-bold rounded-lg hover:bg-[#700B22] transition-colors">Return Home</a>
      </div>
    );
  }

  const slug = `facilities-${subslug}`;
  const TemplateComponent = resolveTemplate(slug);

  return (
    <>
      <PageBanner
        title={page.bannerTitle || page.title}
        subtitle={page.bannerSubtitle}
        breadcrumbs={[{ label: 'Facilities', href: '/facilities' }, { label: page.title }]}
      />
      
      <div className="bg-[#F8F5F0] py-12 sm:py-16">
        <div className="container-nrec">
          {TemplateComponent === HeritageTemplate ? (
            <HeritageTemplate slug={slug} sections={page.sections || []} />
          ) : (
            <TemplateComponent slug={slug} sections={page.sections || []} />
          )}
        </div>
      </div>

      <CallToAction />
    </>
  );
}
