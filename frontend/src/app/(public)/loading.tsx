import { SkeletonText, SkeletonGrid } from '@/components/ui/SkeletonLoader';

export default function Loading() {
  return (
    <div className="animate-fade-in">
      {/* Hero Skeleton */}
      <div className="relative w-full h-[60vh] md:h-[80vh] bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="skeleton w-16 h-16 rounded-2xl mb-6 bg-white/10" />
          <div className="skeleton w-3/4 max-w-2xl h-12 md:h-16 rounded-xl mb-6 bg-white/10" />
          <div className="skeleton w-5/6 max-w-3xl h-6 rounded-lg mb-4 bg-white/10" />
          <div className="skeleton w-2/3 max-w-xl h-6 rounded-lg mb-10 bg-white/10" />
          <div className="flex gap-4">
            <div className="skeleton w-40 h-12 rounded-full bg-white/10" />
            <div className="skeleton w-40 h-12 rounded-full bg-white/10" />
          </div>
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="relative z-20 -mt-16 container-nrec mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-[20px] p-8 shadow-sm border border-gray-100">
              <div className="skeleton w-14 h-14 rounded-2xl mb-6" />
              <div className="skeleton w-24 h-8 rounded-lg mb-2" />
              <div className="skeleton w-32 h-5 rounded mb-4" />
              <SkeletonText lines={2} />
            </div>
          ))}
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container-nrec py-10 mb-20">
        <div className="flex flex-col items-center mb-12">
          <div className="skeleton w-32 h-4 rounded mb-4" />
          <div className="skeleton w-64 md:w-96 h-10 rounded-xl mb-6" />
          <div className="skeleton w-16 h-1 rounded-full" />
        </div>
        
        <SkeletonGrid count={3} columns={3} />
      </div>
    </div>
  );
}
