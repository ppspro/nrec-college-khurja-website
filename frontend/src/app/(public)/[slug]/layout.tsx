import { API_URL } from '@/lib/api';

export async function generateStaticParams() {
  const defaultSlugs = [
    'about', 'history', 'vision-mission', 'principal-message', 'management',
    'governing-body', 'iqac', 'naac', 'college-committee', 'recognition-affiliation',
    'proctorial-board', 'administrative-staff', 'rangers-rovers', 'seats', 'student-feedback', 'feedback',
    'admissions', 'admission-process', 'eligibility', 'fee-structure', 'prospectus', 'merit-list', 'admission-rules',
    'academic-calendar', 'syllabus', 'research', 'results', 'scholarship', 'placements', 'anti-ragging',
    'academics', 'program-outcomes', 'examination', 'student-life', 'student-grievance', 'tenders',
    'alumni', 'rti', 'career', 'mandatory-disclosure', 'privacy-policy',
    'library', 'facilities', 'sports', 'ncc', 'nss', 'home'
  ];

  try {
    const res = await fetch(`${API_URL}/pages`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (data?.pages?.length > 0) {
        const dbSlugs = data.pages.map((p: any) => p.key);
        const uniqueSlugs = Array.from(new Set([...defaultSlugs, ...dbSlugs]));
        return uniqueSlugs.map((slug: string) => ({ slug }));
      }
    }
  } catch (error) {
    console.error("Failed to fetch pages for static params:", error);
  }
  // Fallback to all default pages
  return defaultSlugs.map((slug: string) => ({ slug }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
