import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Map } from 'lucide-react';
import PageBanner from '@/components/ui/PageBanner';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { API_URL as API } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Contact Us | NREC College Khurja',
  description: 'Get in touch with NREC College, Khurja. Address, phone, email, and Google Maps.',
};

async function getContact() {
  try {
    const res = await fetch(`${API}/contact`, { next: { revalidate: 600 } });
    if (!res.ok) return null;
    return (await res.json()).contact;
  } catch { return null; }
}

export default async function ContactPage() {
  const contact = await getContact();
  const breadcrumbs = [{ label: 'Contact' }];

  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out to us anytime."
        breadcrumbs={breadcrumbs}
      />

      <section className="bg-[#F8F5F0] section-py relative overflow-hidden">
        {/* Decorative Background Map Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#111111 2px, transparent 2px)', backgroundSize: '32px 32px' }} />

        <div className="container-nrec relative z-10">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Contact Info */}
            <div className="xl:col-span-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-6">
              
              <ScrollReveal direction="up" delay={0.1}>
                <div className="card p-8 bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-transform h-full">
                  <div className="w-14 h-14 rounded-2xl bg-[#8B0E2A]/10 flex items-center justify-center mb-6">
                    <MapPin size={24} className="text-[#8B0E2A]" />
                  </div>
                  <h3 className="font-heading font-bold text-[#111111] text-xl mb-3">Address</h3>
                  <p className="text-gray-500 text-[15px] leading-relaxed">
                    {contact?.address || 'NREC College, Khurja, Bulandshahr District, Uttar Pradesh — 203131'}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.2}>
                <div className="card p-8 bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-transform h-full">
                  <div className="w-14 h-14 rounded-2xl bg-[#B8860B]/10 flex items-center justify-center mb-6">
                    <Phone size={24} className="text-[#B8860B]" />
                  </div>
                  <h3 className="font-heading font-bold text-[#111111] text-xl mb-4">Phone</h3>
                  <div className="space-y-3">
                    {(contact?.phones?.length ? contact.phones : ['+91-5738-200001']).map((p: string) => (
                      <a key={p} href={`tel:${p}`} className="flex items-center gap-2 text-[15px] text-gray-500 hover:text-[#8B0E2A] transition-colors font-medium">
                        {p}
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <div className="card p-8 bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-transform h-full">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                    <Mail size={24} className="text-blue-600" />
                  </div>
                  <h3 className="font-heading font-bold text-[#111111] text-xl mb-4">Email</h3>
                  <div className="space-y-3">
                    {(contact?.emails?.length ? contact.emails : ['info@nreccollege.ac.in']).map((e: string) => (
                      <a key={e} href={`mailto:${e}`} className="flex items-center gap-2 text-[15px] text-gray-500 hover:text-[#8B0E2A] transition-colors font-medium">
                        {e}
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.4}>
                <div className="card p-8 bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-transform h-full">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6">
                    <Clock size={24} className="text-emerald-600" />
                  </div>
                  <h3 className="font-heading font-bold text-[#111111] text-xl mb-3">Office Hours</h3>
                  <p className="text-[15px] text-gray-500 font-medium">
                    {contact?.officeHours || 'Monday – Saturday: 9:00 AM – 5:00 PM'}
                  </p>
                </div>
              </ScrollReveal>

            </div>

            {/* Map */}
            <div className="xl:col-span-7">
              <ScrollReveal direction="left" className="h-full">
                <div className="card overflow-hidden h-full min-h-[500px] p-0 border border-gray-200 shadow-xl rounded-[24px] bg-white relative isolate">
                  {contact?.googleMapEmbed ? (
                    <div
                      className="w-full h-full absolute inset-0 [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
                      dangerouslySetInnerHTML={{ __html: contact.googleMapEmbed }}
                    />
                  ) : (
                    <div className="w-full h-full absolute inset-0">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3521.8497332306283!2d77.8488052150289!3d27.279611382971212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39744c8b67119ff3%3A0xe0bbf6ea6ddabfb!2sN.R.E.C.+College%2C+Khurja!5e0!3m2!1sen!2sin!4v1580000000000!5m2!1sen!2sin"
                        className="w-full h-full border-0 absolute inset-0 rounded-[24px]"
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}
