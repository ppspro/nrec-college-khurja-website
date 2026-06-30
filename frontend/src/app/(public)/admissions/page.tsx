import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, ArrowRight, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admissions | NREC College Khurja',
  description: 'Apply for admission to NREC College, Khurja. Find eligibility criteria, fee structure, and application process.',
};

const steps = [
  { step: '01', title: 'Check Eligibility', desc: 'Review the minimum eligibility criteria for your desired programme.' },
  { step: '02', title: 'Get Prospectus', desc: 'Download or collect the college prospectus and application form.' },
  { step: '03', title: 'Fill Application', desc: 'Complete the application form with accurate personal and academic details.' },
  { step: '04', title: 'Submit Documents', desc: 'Submit certified copies of mark sheets, certificates, and photos.' },
  { step: '05', title: 'Merit List', desc: 'Merit list will be displayed on the college notice board and website.' },
  { step: '06', title: 'Fee Payment', desc: 'Complete admission by paying the prescribed fee within the stipulated time.' },
];

export default function AdmissionsPage() {
  return (
    <>
      <div className="page-banner">
        <div className="page-banner-accent" />
        <div className="relative container-nrec">
          <div className="flex items-center gap-2 mb-3 text-gray-400 text-sm">
            <Link href="/" className="hover:text-[#C6A04D]">Home</Link>
            <span>/</span>
            <span className="text-white">Admissions</span>
          </div>
          <h1 className="font-heading text-white font-bold text-4xl md:text-5xl">Admissions</h1>
          <p className="text-gray-300 mt-3">Session 2024-25 Admissions are Open. Join NREC College today.</p>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-[#C6A04D]">
        <div className="container-nrec py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white font-semibold text-lg">🎓 Admissions Open for 2024-25 Session</div>
          <div className="flex gap-3">
            <Link href="/downloads?category=Admission+Forms" className="btn bg-white text-[#9a7a28] border-white text-sm px-5 py-2.5">
              <FileText size={14} />Download Form
            </Link>
            <Link href="/contact" className="btn text-white text-sm px-5 py-2.5" style={{ border: '2px solid rgba(255,255,255,0.5)' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <section className="bg-white section-py">
        <div className="container-nrec">
          {/* Admission Process */}
          <div className="text-center mb-14">
            <span className="section-label">How to Apply</span>
            <h2 className="section-title">Admission Process</h2>
            <div className="divider-accent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {steps.map((s) => (
              <div key={s.step} className="card p-6 group card-hover-primary">
                <div className="font-heading font-bold text-6xl text-[#E7E7E7] mb-3 leading-none group-hover:text-[#990A25]/20 transition-colors">
                  {s.step}
                </div>
                <h3 className="font-heading font-bold text-[#111111] text-lg mb-2 group-hover:text-[#990A25] transition-colors">{s.title}</h3>
                <p className="text-[#666666] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Eligibility */}
          <div id="eligibility" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="card p-8">
              <h3 className="font-heading font-bold text-[#111111] text-xl mb-5">UG Eligibility</h3>
              <ul className="space-y-3">
                {['Passed 10+2 or equivalent from a recognized board', 'Minimum 45% marks (40% for reserved categories)', 'Valid character certificate from last institution attended', 'Medical fitness certificate'].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle size={15} className="text-[#059669] mt-0.5 flex-shrink-0" />
                    <span className="text-[#666666] text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-8">
              <h3 className="font-heading font-bold text-[#111111] text-xl mb-5">PG Eligibility</h3>
              <ul className="space-y-3">
                {['Passed Bachelor&apos;s degree in relevant subject', 'Minimum 50% marks (45% for reserved categories)', 'Affiliated to a recognized university', 'Valid migration certificate if from another university'].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle size={15} className="text-[#059669] mt-0.5 flex-shrink-0" />
                    <span className="text-[#666666] text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Documents Required */}
          <div id="eligibility" className="bg-[#F9F9F9] rounded-3xl p-8 mb-16">
            <h3 className="font-heading font-bold text-[#111111] text-xl mb-6">Documents Required</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {['High School Marksheet & Certificate', 'Intermediate Marksheet & Certificate', 'Bachelor\'s Degree (for PG)', 'Transfer Certificate', 'Character Certificate', 'Aadhar Card / ID Proof', 'Passport Size Photographs (4)', 'Income Certificate (if applicable)', 'Caste Certificate (if applicable)'].map((doc) => (
                <div key={doc} className="flex items-center gap-2.5 text-sm text-[#2E2E2E]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#990A25] flex-shrink-0" />
                  {doc}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link href="/courses" className="btn btn-primary text-base px-10 py-4">
              Explore All Courses <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
