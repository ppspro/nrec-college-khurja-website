// ═══════════════════════════════════════════════
// Default content fallbacks for the NREC website
// ═══════════════════════════════════════════════

/** Default images — used when API returns no image or image fails to load */
export const defaultImages = {
  hero: '/images/hero-campus.png',
  campus: '/images/campus-life.png',
  principal: '/images/principal.png',
  faculty: '/images/principal.png',
  department: '/images/campus-life.png',
  course: '/images/campus-life.png',
  gallery: '/images/campus-life.png',
  news: '/images/campus-life.png',
  event: '/images/campus-life.png',
  admission: '/images/hero-campus.png',
  avatar: '/images/principal.png',
  placeholder: '/images/campus-life.png',
} as const;

/** Safe text - returns fallback if value is empty/null/undefined */
export function safeText(value: string | null | undefined, fallback: string): string {
  if (!value || value.trim() === '') return fallback;
  return value;
}

/** Safe image - returns fallback path if value is empty/null/undefined */
export function safeImage(value: string | null | undefined, fallbackKey: keyof typeof defaultImages = 'placeholder'): string {
  if (!value || value.trim() === '') return defaultImages[fallbackKey];
  return value;
}

/** Format date to readable string */
export function formatDate(date: string, options?: Intl.DateTimeFormatOptions): string {
  try {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options,
    });
  } catch {
    return date;
  }
}

/** Format date for compact display (e.g., event cards) */
export function formatDateCompact(date: string): { day: string; month: string; year: string } {
  try {
    const d = new Date(date);
    return {
      day: d.getDate().toString().padStart(2, '0'),
      month: d.toLocaleDateString('en-IN', { month: 'short' }).toUpperCase(),
      year: d.getFullYear().toString(),
    };
  } catch {
    return { day: '--', month: '---', year: '----' };
  }
}

/** Truncate text to specified length */
export function truncate(text: string, maxLength: number = 120): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '…';
}

/** Get file icon based on extension */
export function getFileIcon(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf': return '📄';
    case 'doc':
    case 'docx': return '📝';
    case 'xls':
    case 'xlsx': return '📊';
    case 'ppt':
    case 'pptx': return '📎';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'webp': return '🖼️';
    case 'zip':
    case 'rar': return '📦';
    default: return '📄';
  }
}

/** Get file size in human readable format */
export function formatFileSize(sizeStr: string): string {
  const size = parseInt(sizeStr, 10);
  if (isNaN(size)) return sizeStr;
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}
