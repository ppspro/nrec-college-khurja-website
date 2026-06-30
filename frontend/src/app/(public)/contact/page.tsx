import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | NREC College Khurja',
  description: 'Get in touch with NREC College, Khurja. Address, phone, email, and Google Maps.',
};

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getContact() {
  try {
    const res = await fetch(`${API}/contact`, { next: { revalidate: 600 } });
    return (await res.json()).contact;
  } catch { return null; }
}

export default async function ContactPage() {
  const contact = await getContact();

  return (
    <>
      <div className="page-banner">
        <div className="page-banner-accent" />
        <div className="relative container-nrec">
          <div className="flex items-center gap-2 mb-3 text-gray-400 text-sm">
            <Link href="/" className="hover:text-[#C6A04D]">Home</Link>
            <span>/</span>
            <span className="text-white">Contact</span>
          </div>
          <h1 className="font-heading text-white font-bold text-4xl md:text-5xl">Contact Us</h1>
          <p className="text-gray-300 mt-3">We&apos;d love to hear from you. Reach out to us anytime.</p>
        </div>
      </div>

      <section className="bg-light section-py">
        <div className="container-nrec">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="card p-6">
                <div className="w-10 h-10 rounded-xl bg-[#990A25]/8 flex items-center justify-center mb-4">
                  <MapPin size={20} className="text-[#990A25]" />
                </div>
                <h3 className="font-heading font-bold text-[#111111] mb-2">Address</h3>
                <p className="text-[#666666] text-sm leading-relaxed">
                  {contact?.address || 'NREC College, Khurja, Bulandshahr District, Uttar Pradesh — 203131'}
                </p>
              </div>

              <div className="card p-6">
                <div className="w-10 h-10 rounded-xl bg-[#C6A04D]/12 flex items-center justify-center mb-4">
                  <Phone size={20} className="text-[#C6A04D]" />
                </div>
                <h3 className="font-heading font-bold text-[#111111] mb-3">Phone</h3>
                <div className="space-y-2">
                  {(contact?.phones?.length ? contact.phones : ['+91-5738-200001']).map((p: string) => (
                    <a key={p} href={`tel:${p}`} className="block text-sm text-[#666666] hover:text-[#990A25] transition-colors">{p}</a>
                  ))}
                </div>
              </div>

              <div className="card p-6">
                <div className="w-10 h-10 rounded-xl bg-[#2563EB]/8 flex items-center justify-center mb-4">
                  <Mail size={20} className="text-[#2563EB]" />
                </div>
                <h3 className="font-heading font-bold text-[#111111] mb-3">Email</h3>
                <div className="space-y-2">
                  {(contact?.emails?.length ? contact.emails : ['info@nreccollege.ac.in']).map((e: string) => (
                    <a key={e} href={`mailto:${e}`} className="block text-sm text-[#666666] hover:text-[#990A25] transition-colors">{e}</a>
                  ))}
                </div>
              </div>

              <div className="card p-6">
                <div className="w-10 h-10 rounded-xl bg-[#059669]/8 flex items-center justify-center mb-4">
                  <Clock size={20} className="text-[#059669]" />
                </div>
                <h3 className="font-heading font-bold text-[#111111] mb-2">Office Hours</h3>
                <p className="text-sm text-[#666666]">{contact?.officeHours || 'Monday – Saturday: 9:00 AM – 5:00 PM'}</p>
              </div>
            </div>

            {/* Map */}
            <div className="lg:col-span-2">
              <div className="card overflow-hidden h-full" style={{ minHeight: '400px' }}>
                {contact?.googleMapEmbed ? (
                  <div
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{ __html: contact.googleMapEmbed }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#F9F9F9] p-8 text-center">
                    <MapPin size={48} className="text-[#E7E7E7] mb-4" />
                    <h3 className="font-heading font-bold text-[#111111] text-xl mb-2">NREC College, Khurja</h3>
                    <p className="text-[#666666] text-sm mb-6">Khurja, Bulandshahr District, Uttar Pradesh — 203131</p>
                    <a
                      href="https://maps.google.com/?q=NREC+College+Khurja"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
