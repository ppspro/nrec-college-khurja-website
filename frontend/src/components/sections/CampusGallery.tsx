'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';
import { GalleryImage, GalleryAlbum } from '@/types';
import { uploadsUrl } from '@/lib/api';

interface CampusGalleryProps {
  images: GalleryImage[];
  albums: GalleryAlbum[];
}

export default function CampusGallery({ images, albums }: CampusGalleryProps) {
  const displayImages = images.slice(0, 6);
  // If no real images, show gradient placeholders
  const showPlaceholders = displayImages.length === 0;

  const placeholders = [
    { size: 'row-span-2', label: 'Main Building', color: 'from-[#990A25] to-[#7A081E]' },
    { size: '', label: 'Library', color: 'from-[#111] to-[#333]' },
    { size: '', label: 'Science Lab', color: 'from-[#C6A04D] to-[#9a7a28]' },
    { size: '', label: 'Auditorium', color: 'from-[#2563EB] to-[#1d4ed8]' },
    { size: '', label: 'Sports Ground', color: 'from-[#059669] to-[#047857]' },
    { size: '', label: 'Campus Life', color: 'from-[#7C3AED] to-[#6d28d9]' },
  ];

  return (
    <section className="bg-light section-py">
      <div className="container-nrec">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <span className="section-label">Campus Life</span>
            <h2 className="section-title">Photo Gallery</h2>
            <div className="divider-accent" />
          </div>
          <Link href="/gallery" className="btn btn-outline flex-shrink-0 self-start md:self-auto">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:h-[480px]">
          {showPlaceholders ? (
            <>
              {/* Large featured */}
              <div className="col-span-2 row-span-2 relative overflow-hidden group cursor-pointer" style={{ borderRadius: 'var(--radius-img)' }}>
                <Image src="/images/campus-life.png" alt="Main Building" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="text-white font-semibold text-lg drop-shadow-md">Campus Life</span>
                </div>
              </div>
              {/* Second featured placeholder */}
              <div className="relative overflow-hidden group cursor-pointer" style={{ borderRadius: 'var(--radius-img)' }}>
                <Image src="/images/hero-campus.png" alt="Library" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white font-semibold text-sm drop-shadow-md">Historic Library</span>
                </div>
              </div>
              {/* Remaining smaller images */}
              {placeholders.slice(2).map((p, i) => (
                <div key={i} className="relative overflow-hidden group cursor-pointer" style={{ borderRadius: 'var(--radius-img)' }}>
                  <div className={`w-full h-full bg-gradient-to-br ${p.color} flex items-center justify-center`}>
                    <span className="font-heading text-white text-2xl font-bold opacity-20">{p.label[0]}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-semibold text-xs">{p.label}</span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            displayImages.map((img, i) => (
              <div
                key={img._id}
                className={`relative overflow-hidden group cursor-pointer ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
                style={{ borderRadius: 'var(--radius-img)' }}
              >
                <Image
                  src={uploadsUrl(img.thumbnail || img.image)}
                  alt={img.title || 'Campus'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {img.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <Play size={18} className="text-[#990A25] ml-0.5" />
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))
          )}
        </div>

        {/* Album quick links */}
        {albums.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {albums.slice(0, 5).map((album) => (
              <Link
                key={album._id}
                href={`/gallery/${album.slug}`}
                className="px-4 py-2 rounded-full border border-[#E7E7E7] text-sm text-[#666666] hover:border-[#990A25] hover:text-[#990A25] transition-colors"
              >
                {album.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
