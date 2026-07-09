import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  hoverEffect?: boolean;
  gradient?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function Card({
  hover = false,
  hoverEffect,
  gradient = false,
  padding = 'none',
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        'card',
        (hover || hoverEffect) && 'card-hover',
        gradient && 'card-gradient-top',
        paddingMap[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
