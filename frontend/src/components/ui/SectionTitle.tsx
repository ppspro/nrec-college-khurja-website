import ScrollReveal from './ScrollReveal';

interface SectionTitleProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

export default function SectionTitle({
  label,
  title,
  description,
  align = 'left',
  dark = false,
  className = '',
}: SectionTitleProps) {
  const alignCenter = align === 'center';

  return (
    <ScrollReveal className={`${alignCenter ? 'text-center' : ''} ${className}`}>
      {label && (
        <span className={`section-label ${dark ? 'text-[#B8860B]' : ''}`}>
          {label}
        </span>
      )}
      <h2 className={`section-title ${dark ? 'text-white' : ''}`}>
        {title}
      </h2>
      <div className={`divider-accent ${alignCenter ? 'mx-auto' : ''}`} />
      {description && (
        <p className={`section-desc mt-3 ${alignCenter ? 'mx-auto' : ''} ${dark ? 'text-gray-400' : ''}`}>
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}
