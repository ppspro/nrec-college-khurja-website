'use client';

import { useState, useEffect } from 'react';
import { Maximize2, Image as ImageIcon, Video, FolderOpen } from 'lucide-react';
import api, { uploadsUrl } from '@/lib/api';
import { GalleryImage, GalleryAlbum } from '@/types';
import PageBanner from '@/components/ui/PageBanner';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SafeImage from '@/components/ui/SafeImage';
import EmptyState from '@/components/ui/EmptyState';

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const [imagesRes, albumsRes] = await Promise.all([
          api.get('/gallery/images/all').catch(() => ({ data: { images: [] } })),
          api.get('/gallery').catch(() => ({ data: { albums: [] } }))
        ]);
        setImages(imagesRes.data?.images || []);
        setAlbums(albumsRes.data?.albums || []);
      } catch {
        setImages([]);
        setAlbums([]);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredImages = selectedAlbum === 'all' 
    ? images 
    : images.filter(img => img.album === selectedAlbum);

  const breadcrumbs = [{ label: 'Gallery' }];

  return (
    <>
      <PageBanner
        title="Campus Gallery"
        subtitle="Explore our vibrant campus life, academic facilities, sports events, and cultural milestones."
        breadcrumbs={breadcrumbs}
      />

      <section className="bg-[#F8F5F0] section-py relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#111111 2px, transparent 2px)', backgroundSize: '32px 32px' }} />

        <div className="container-nrec relative z-10">
          {/* Albums Filter */}
          {albums.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
              <button
                onClick={() => setSelectedAlbum('all')}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedAlbum === 'all'
                    ? 'bg-[#8B0E2A] text-white shadow-md'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                All Photos
              </button>
              {albums.map((album) => (
                <button
                  key={album._id}
                  onClick={() => setSelectedAlbum(album._id)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                    selectedAlbum === album._id
                      ? 'bg-[#8B0E2A] text-white shadow-md'
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FolderOpen size={14} />
                  {album.title}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="skeleton aspect-square rounded-[24px]" />
              ))}
            </div>
          ) : filteredImages.length === 0 ? (
            <EmptyState 
              icon={<ImageIcon size={32} className="text-gray-400" />} 
              title="Campus archive updating soon" 
              description="Visual archives and campus event galleries are currently being updated by the administration. Please check back later." 
            />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredImages.map((image, index) => (
                <ScrollReveal
                  key={image._id}
                  direction="up"
                  delay={0.05 * (index % 4)}
                  className="aspect-square relative group overflow-hidden rounded-[24px] bg-white border border-gray-100 shadow-sm"
                >
                  <div
                    className="absolute inset-0 cursor-pointer"
                    onClick={() => setActiveImage(uploadsUrl(image.image))}
                  >
                    <SafeImage
                      fallbackKey="gallery"
                      src={uploadsUrl(image.image)}
                      alt={image.title || 'Campus Gallery'}
                      fill
                      className="object-cover group-hover:scale-105 transition-all duration-700"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                        <Maximize2 size={16} />
                      </div>
                      <p className="text-white font-medium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100 text-sm line-clamp-2">
                        {image.title || image.description || 'Campus Life'}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 lg:p-12 animate-fade-in"
          onClick={() => setActiveImage(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImage(null);
            }}
          >
            <span className="text-2xl leading-none">&times;</span>
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeImage}
            alt="Gallery lightbox"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
