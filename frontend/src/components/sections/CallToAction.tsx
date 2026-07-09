'use client';

import CTASection from '@/components/ui/CTASection';

interface CallToActionProps {
  callToAction?: any;
}

const fallbackCTA = {
  title: 'Begin Your Academic Journey at NREC College',
  subtitle: 'Applications are open for the 2024–25 session. Join a community of learners, thinkers, and achievers.',
  stats: [
    { label: 'Established', value: '1901' },
    { label: 'Affiliation', value: 'CCS University' },
    { label: 'Accreditation', value: 'NAAC' },
  ]
};

export default function CallToAction({ callToAction }: CallToActionProps) {
  const data = callToAction || fallbackCTA;

  return (
    <CTASection 
      title={data.title}
      subtitle={data.subtitle}
      stats={data.stats}
      primaryAction={{ label: 'Apply for Admission', href: '/admissions' }}
      secondaryAction={{ label: 'Explore Courses', href: '/courses' }}
    />
  );
}