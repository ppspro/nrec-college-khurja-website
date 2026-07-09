export default function LoadingSpinner({
  size = 'md',
  fullPage = false,
}: {
  size?: 'sm' | 'md' | 'lg';
  fullPage?: boolean;
}) {
  const sizeMap = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };

  const spinner = (
    <svg
      className={`animate-spin ${sizeMap[size]}`}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-20"
        cx="12"
        cy="12"
        r="10"
        stroke="#8B0E2A"
        strokeWidth="3"
      />
      <path
        className="opacity-80"
        fill="#8B0E2A"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );

  if (fullPage) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        {spinner}
      </div>
    );
  }

  return spinner;
}
