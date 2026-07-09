'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Maximize2, ArrowRight } from 'lucide-react';
import { uploadsUrl } from '@/lib/api';
import { safeImage } from '@/lib/defaults';
import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SafeImage from '@/components/ui/SafeImage';
import type { GalleryImage, GalleryAlbum } from '@/types';

interface CampusGalleryProps {
  images?: GalleryImage[];
  albums?: GalleryAlbum[];
}

const fallbackImages = [
  { id: '1', url: '/screenshots/1671872113WhatsApp%20Image%202022-12-17%20at%205.49.06%20PM.jpeg', caption: 'Campus Gallery 1' },
  { id: '2', url: '/screenshots/16700442351.%20(6).jpg', caption: 'Campus Gallery 2' },
  { id: '3', url: '/screenshots/16700442351.%20(6).jpg', caption: 'Campus Gallery 3' },
  { id: '4', url: '/screenshots/1670044469DSC_0563.jpg', caption: 'Campus Gallery 4' },
  { id: '5', url: '/screenshots/16700441271.%20(12).jpg', caption: 'Campus Gallery 5' },
];

export default function CampusGallery({ images, albums }: CampusGalleryProps) {
  // Take up to 6 featured images
  let allImages = (images || []).slice(0, 6).map(img => ({
    url: img.image,
    caption: img.title || img.description || 'Campus Life',
    id: img._id,
    fallback: undefined,
    color: undefined
  }));

  if (!allImages || allImages.length === 0) {
    allImages = fallbackImages as any;
  }

  return (
    <section className="bg-[#0A0A0A] section-py relative overflow-hidden bg-white">
      {/* Background override to white as per screenshot */}
      <div className="absolute inset-0 bg-[#F9F9F9] pointer-events-none" />

      <div className="container-nrec relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <SectionTitle
            label="CAMPUS LIFE"
            title="Photo Gallery"
            dark={false}
            className="mb-0"
          />
          <ScrollReveal direction="left">
            <Link 
              href="/gallery" 
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-[14px] font-bold text-[#8B0E2A] border border-[#8B0E2A] rounded-full hover:bg-[#8B0E2A] hover:text-white transition-colors"
            >
              View All
              <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>

        {/* Staggered Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 lg:gap-4">
          
          {/* Main Large Image */}
          <div className="col-span-2 row-span-2">
            <ScrollReveal direction="up" className="h-full">
              <div className="group relative w-full h-[300px] md:h-full rounded-2xl overflow-hidden bg-gray-200 shadow-md">
                <SafeImage
                  fallbackKey="campus"
                  src={allImages[0]?.url || ''}
                  alt={allImages[0]?.caption || ''}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg">{allImages[0]?.caption}</h3>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Grid of smaller images */}
          {allImages.slice(1, 5).map((image, index) => (
            <div key={image.id} className="col-span-1 md:col-span-1 lg:col-span-1">
              <ScrollReveal direction="up" delay={0.1 * (index + 1)} className="h-full">
                <div className={`group relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md ${(image as any).color || 'bg-gray-200'}`}>
                  {!(image as any).fallback ? (
                    <SafeImage
                      fallbackKey="campus"
                      src={image.url || ''}
                      alt={image.caption || ''}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-black text-white/40">{(image as any).fallback}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </ScrollReveal>
            </div>
          ))}

          {/* 6th item (purple box) */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <ScrollReveal direction="up" delay={0.5} className="h-full">
              <div className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-purple-600 shadow-md flex items-center justify-center">
                <span className="text-4xl font-black text-white/40">C</span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
