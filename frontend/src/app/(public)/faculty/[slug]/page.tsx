'use client';

import { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import api, { uploadsUrl } from '@/lib/api';
import { Faculty } from '@/types';
import PageBanner from '@/components/ui/PageBanner';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SafeImage from '@/components/ui/SafeImage';
import { Mail, Phone, Clock, BookOpen, GraduationCap, Calendar, ChevronRight, User, Award, ArrowLeft } from 'lucide-react';

export default function FacultyProfilePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [member, setMember] = useState<Faculty | null>(null);
  const [related, setRelated] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/faculty/slug/${slug}`);
        if (res.data.success && res.data.faculty) {
          const f = res.data.faculty;
          setMember(f);
          
          // Fetch related faculty in same department
          const deptId = typeof f.department === 'object' && f.department !== null ? f.department._id : f.department;
          if (deptId) {
            const relRes = await api.get(`/faculty?department=${deptId}`);
            if (relRes.data.success) {
              const list = (relRes.data.faculty || []).filter((item: Faculty) => item._id !== f._id);
              setRelated(list.slice(0, 4));
            }
          }
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProfile();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F5F0] flex flex-col justify-center items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#8B0E2A] border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 font-medium text-sm">Loading Faculty Profile...</p>
      </div>
    );
  }

  if (!member) {
    return notFound();
  }

  const breadcrumbs = [
    { label: 'Faculty', href: '/faculty' },
    { label: member.name }
  ];

  const deptName = typeof member.department === 'object' && member.department !== null 
    ? member.department.name 
    : 'General / Other';

  // Construct Structured Data (Schema.org Person Profile)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': member.name,
    'jobTitle': member.designation,
    'worksFor': {
      '@type': 'EducationalOrganization',
      'name': 'NREC College Khurja',
      'sameAs': 'https://nreccollege.ac.in'
    },
    'description': member.biography,
    'email': member.email,
    'telephone': member.phone,
    'image': member.photo ? uploadsUrl(member.photo) : undefined,
    'knowsAbout': member.specialization,
    'education': member.qualification
  };

  return (
    <>
      {/* Insert JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageBanner
        title={member.name}
        subtitle={`${member.designation} — ${deptName}`}
        breadcrumbs={breadcrumbs}
      />

      <section className="bg-[#F8F5F0] py-12 sm:py-16">
        <div className="container-nrec">
          
          {/* Back Button */}
          <Link href="/faculty" className="inline-flex items-center gap-2 text-sm text-[#8B0E2A] hover:text-[#700B22] font-bold mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Faculty Directory
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Portrait and Key Contacts */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              
              <div className="bg-white border border-[#E7E7E7]/60 rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] text-center">
                
                {/* Photo */}
                <div className="relative w-40 h-40 rounded-full mx-auto overflow-hidden bg-gray-50 border-4 border-[#8B0E2A]/10 mb-5">
                  {member.photo ? (
                    <SafeImage
                      src={uploadsUrl(member.photo)}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#8B0E2A]/5">
                      <User size={48} className="text-[#8B0E2A]" />
                    </div>
                  )}
                </div>

                {/* Meta details */}
                <h3 className="font-heading font-black text-xl text-[#111111] mb-1">{member.name}</h3>
                <p className="text-xs text-[#8B0E2A] font-bold uppercase tracking-wider mb-2">{member.designation}</p>
                <span className="inline-block bg-gray-50 border border-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-6">
                  Faculty of {member.faculty}
                </span>

                {/* Contact strips */}
                <div className="space-y-3 text-left pt-6 border-t border-gray-100">
                  <div className="flex items-start gap-3 text-sm">
                    <Mail size={16} className="text-[#B8860B] shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="block text-[10px] uppercase font-bold text-gray-400">Email Address</span>
                      <a href={`mailto:${member.email}`} className="text-gray-700 hover:text-[#8B0E2A] transition-colors break-all text-xs font-semibold">{member.email}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-sm">
                    <Phone size={16} className="text-[#B8860B] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-gray-400">Phone Number</span>
                      <a href={`tel:${member.phone}`} className="text-gray-700 hover:text-[#8B0E2A] transition-colors text-xs font-semibold">{member.phone}</a>
                    </div>
                  </div>

                  {member.officeHours && (
                    <div className="flex items-start gap-3 text-sm">
                      <Clock size={16} className="text-[#B8860B] shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-gray-400">Office Hours</span>
                        <span className="text-gray-700 text-xs font-semibold">{member.officeHours}</span>
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* Right Column: Profile details */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Biography Section */}
              <div className="bg-white border border-[#E7E7E7]/60 rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.02)] space-y-5">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="text-[#8B0E2A]" size={20} />
                  <h4 className="font-heading font-black text-sm uppercase tracking-widest text-[#8B0E2A]">Biography & Profile</h4>
                </div>
                <div className="w-12 h-[2px] bg-[#B8860B] rounded" />
                <p className="text-gray-600 text-base leading-relaxed font-light whitespace-pre-line">
                  {member.biography}
                </p>
              </div>

              {/* Education & Experience Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Academic Qualifications */}
                <div className="bg-white border border-[#E7E7E7]/60 rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                  <h5 className="font-heading font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                    <Award size={16} className="text-[#B8860B]" /> Education
                  </h5>
                  <p className="text-gray-600 text-sm font-semibold leading-relaxed bg-gray-50 border border-gray-100 p-4 rounded-xl">
                    {member.qualification}
                  </p>
                </div>

                {/* Experience */}
                <div className="bg-white border border-[#E7E7E7]/60 rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                  <h5 className="font-heading font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                    <Calendar size={16} className="text-[#B8860B]" /> Professional Experience
                  </h5>
                  <p className="text-gray-600 text-sm font-semibold leading-relaxed bg-gray-50 border border-gray-100 p-4 rounded-xl">
                    {member.experience}
                  </p>
                </div>

              </div>

              {/* Specializations & Research */}
              {member.specialization && member.specialization.length > 0 && (
                <div className="bg-white border border-[#E7E7E7]/60 rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.02)] space-y-4">
                  <h5 className="font-heading font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                    <BookOpen size={18} className="text-[#8B0E2A]" /> Research Interests & Specializations
                  </h5>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {member.specialization.map((spec, i) => (
                      <span key={i} className="bg-[#8B0E2A]/5 hover:bg-[#8B0E2A]/10 transition-colors border border-[#8B0E2A]/10 text-[#8B0E2A] text-xs font-bold px-3 py-1.5 rounded-lg">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Publications */}
              {member.publications && member.publications.length > 0 && (
                <div className="bg-white border border-[#E7E7E7]/60 rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.02)] space-y-4">
                  <h5 className="font-heading font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                    <Award size={18} className="text-[#8B0E2A]" /> Selected Publications & Research Papers
                  </h5>
                  <ul className="space-y-4 pt-2">
                    {member.publications.map((pub, i) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed items-start">
                        <span className="w-5 h-5 rounded-full bg-[#B8860B]/10 hover:bg-[#B8860B]/20 text-[#B8860B] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                        <span>{pub}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Faculty */}
              {related.length > 0 && (
                <div className="space-y-6 pt-6">
                  <h5 className="font-heading font-bold text-lg text-gray-900">
                    Other Faculty from {deptName}
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {related.map((rel) => (
                      <Link key={rel._id} href={`/faculty/${rel.slug}`} className="flex items-center gap-4 bg-white border border-[#E7E7E7]/60 hover:border-[#8B0E2A]/20 hover:shadow-md transition-all p-4 rounded-2xl group">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-50 shrink-0">
                          {rel.photo ? (
                            <SafeImage src={uploadsUrl(rel.photo)} alt={rel.name} fill className="object-cover" />
                          ) : (
                            <div className="absolute inset-0 bg-[#8B0E2A]/5 flex items-center justify-center">
                              <User size={18} className="text-[#8B0E2A]" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h6 className="font-heading font-bold text-sm text-gray-900 group-hover:text-[#8B0E2A] transition-colors truncate">{rel.name}</h6>
                          <p className="text-xs text-gray-500 truncate">{rel.designation}</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-300 ml-auto shrink-0 group-hover:text-[#8B0E2A] transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </section>
    </>
  );
}
