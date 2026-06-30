import PageBanner from '@/components/ui/PageBanner';
import { Quote, Target, Eye } from 'lucide-react';
import Card from '@/components/ui/Card';

export const metadata = {
  title: 'About NREC College | History, Vision & Mission',
  description: 'Learn about NREC College Khurja — its rich history since 1901, vision, mission, and administrative leadership.',
};

export default function AboutPage() {
  const breadcrumbs = [{ label: 'About' }];

  return (
    <>
      <PageBanner
        title="About NREC College"
        subtitle="A century of academic excellence in the heart of Uttar Pradesh."
        breadcrumbs={breadcrumbs}
      />

      {/* History */}
      <section className="bg-white section-py">
        <div className="container-nrec">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label">Our Heritage</span>
              <h2 className="section-title">A Legacy Since 1901</h2>
              <div className="divider-accent" />
              <div className="space-y-4 text-[#666666] leading-relaxed mt-6">
                <p>
                  <strong className="text-[#111111]">Naththi Mal Ram Sahai Mal Edward Coronation Post Graduate College</strong>, popularly known as NREC College, was established in <strong className="text-[#990A25]">1901</strong> in Khurja, Bulandshahr district, Uttar Pradesh.
                </p>
                <p>
                  Founded with the noble vision of making quality higher education accessible to the people of western Uttar Pradesh, the institution has grown from a small college to a prestigious post-graduate institution over the course of more than a century.
                </p>
                <p>
                  The college is affiliated to <strong className="text-[#111111]">Chaudhary Charan Singh University (CCS University), Meerut</strong> and is recognized by the <strong className="text-[#111111]">University Grants Commission (UGC)</strong>. It holds NAAC accreditation and is registered in the NIRF framework.
                </p>
                <p>
                  Today, NREC College offers a broad spectrum of undergraduate and postgraduate programmes across Humanities, Science, Commerce, Education, and professional courses. With a dedicated faculty and modern infrastructure, it continues to uphold its founding ideals.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Year Established', value: '1901', sub: '123+ years of excellence' },
                { label: 'Affiliation', value: 'CCS University', sub: 'Meerut, Uttar Pradesh' },
                { label: 'Accreditation', value: 'NAAC', sub: 'National Assessment' },
                { label: 'Recognition', value: 'UGC', sub: 'University Grants Commission' },
              ].map((item) => (
                <Card key={item.label} className="p-5 text-center">
                  <div className="font-heading font-bold text-[#990A25] text-2xl mb-1">{item.value}</div>
                  <div className="font-semibold text-[#111111] text-sm mb-1">{item.label}</div>
                  <div className="text-xs text-[#666666]">{item.sub}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision" className="bg-[#111111] py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#990A25] rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C6A04D] rounded-full blur-[120px] opacity-10 pointer-events-none" />
        
        <div className="container-nrec relative">
          <div className="text-center mb-16">
            <span className="section-label text-[#C6A04D]">Our Purpose</span>
            <h2 className="section-title text-white">Vision & Mission</h2>
            <div className="divider-accent mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#990A25] to-[#7A081E] flex items-center justify-center shadow-lg">
                  <Eye size={24} className="text-white" />
                </div>
                <h3 className="font-heading font-bold text-white text-2xl">Our Vision</h3>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent mb-6" />
              <p className="text-gray-300 leading-relaxed text-lg font-light">
                To be a centre of excellence in higher education that empowers students with knowledge, skills, and values — preparing them to be responsible citizens, ethical leaders, and lifelong learners committed to the progress of society.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C6A04D] to-[#A8853A] flex items-center justify-center shadow-lg">
                  <Target size={24} className="text-white" />
                </div>
                <h3 className="font-heading font-bold text-white text-2xl">Our Mission</h3>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent mb-6" />
              <ul className="space-y-4 text-gray-300">
                {[
                  'Provide inclusive access to quality higher education',
                  'Foster academic excellence and research culture',
                  'Promote holistic development of students',
                  'Uphold ethical values and social responsibility',
                  'Strengthen community engagement and service',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C6A04D] mt-2.5 flex-shrink-0" />
                    <span className="text-base font-light leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section id="principal" className="bg-white section-py relative">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="container-nrec relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-[#E7E7E7] to-[#d5d5d5] relative shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center text-[#BBBBBB]">
                   <svg viewBox="0 0 100 120" className="w-32 h-32" fill="currentColor">
                    <circle cx="50" cy="35" r="22" />
                    <path d="M10 110 Q10 75 50 75 Q90 75 90 110" />
                  </svg>
                </div>
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-6 -right-6 w-3/4 h-3/4 border-2 border-[#C6A04D] rounded-2xl -z-10" />
            </div>
            
            <div className="lg:col-span-7">
              <Quote className="text-[#990A25]/10 w-20 h-20 mb-6 -ml-4" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#111111] mb-8 leading-tight">
                &quot;Education is not merely the transfer of information but the transformation of character.&quot;
              </h2>
              <div className="text-[#666666] leading-relaxed space-y-6 text-lg font-light">
                <p>Welcome to NREC College — an institution that stands as a symbol of academic heritage, intellectual aspiration, and unwavering commitment to quality education.</p>
                <p>Since its establishment in 1901, this college has nurtured thousands of students who have gone on to distinguish themselves in every walk of life — from public service to research, from entrepreneurship to the arts.</p>
                <p>We strive to create an environment where curiosity is celebrated, excellence is pursued, and every student discovers their true potential. I extend a warm welcome to all prospective students and invite them to become part of our proud community.</p>
              </div>
              
              <div className="mt-10 flex items-center gap-5">
                <div className="w-12 h-px bg-[#C6A04D]" />
                <div>
                  <div className="text-xl font-heading font-bold text-[#111111]">Prof. (Name)</div>
                  <div className="text-[#990A25] font-semibold text-sm tracking-widest uppercase mt-1">Principal</div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}
