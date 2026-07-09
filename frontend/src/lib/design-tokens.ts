// ═══════════════════════════════════════════════
// NREC Design Tokens — centralized design values
// ═══════════════════════════════════════════════

export const colors = {
  primary: '#8B0E2A',
  primaryHover: '#6F0B22',
  primaryLight: 'rgba(139, 14, 42, 0.08)',
  primaryGlow: 'rgba(139, 14, 42, 0.25)',

  secondary: '#B8860B',
  secondaryHover: '#9A7009',
  secondaryLight: 'rgba(184, 134, 11, 0.10)',

  dark: '#111111',
  text: '#2E2E2E',
  muted: '#6B7280',
  border: '#E5E7EB',
  bg: '#FFFFFF',
  bgWarm: '#F8F5F0',
  bgCool: '#F3F4F6',
  bgDark: '#0A0A0A',
} as const;

export const fonts = {
  heading: "'Playfair Display', Georgia, 'Times New Roman', serif",
  body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
} as const;

export const shadows = {
  xs: '0 1px 2px rgba(0, 0, 0, 0.04)',
  sm: '0 2px 8px rgba(0, 0, 0, 0.05)',
  md: '0 8px 24px rgba(0, 0, 0, 0.07)',
  lg: '0 16px 48px rgba(0, 0, 0, 0.09)',
  xl: '0 24px 64px rgba(0, 0, 0, 0.12)',
  primary: '0 8px 32px rgba(139, 14, 42, 0.25)',
} as const;

export const radii = {
  sm: 8,
  btn: 12,
  card: 20,
  img: 16,
  input: 10,
  dropdown: 16,
  full: 9999,
} as const;

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1440,
} as const;

// Framer Motion animation presets
export const motion = {
  fadeInUp: {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
  slideLeft: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
  slideRight: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
  stagger: (delay: number = 0.1) => ({
    animate: { transition: { staggerChildren: delay } },
  }),
  item: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
} as const;
