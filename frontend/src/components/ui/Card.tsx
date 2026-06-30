import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = '',
  hoverEffect = true,
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`card ${hoverEffect ? 'card-hover-primary' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
