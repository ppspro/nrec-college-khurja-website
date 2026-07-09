export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`card p-6 ${className}`}>
      <div className="skeleton w-full h-48 rounded-xl mb-4" />
      <div className="skeleton w-3/4 h-5 rounded mb-3" />
      <div className="skeleton w-full h-4 rounded mb-2" />
      <div className="skeleton w-2/3 h-4 rounded" />
    </div>
  );
}

export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-4 rounded"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  );
}

export function SkeletonImage({ className = '' }: { className?: string }) {
  return <div className={`skeleton w-full aspect-video rounded-xl ${className}`} />;
}

export function SkeletonAvatar({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <div
      className={`skeleton rounded-full ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

export function SkeletonGrid({ count = 6, columns = 3 }: { count?: number; columns?: number }) {
  return (
    <div
      className="grid gap-6"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
