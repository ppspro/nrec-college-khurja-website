'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';
import { defaultImages } from '@/lib/defaults';

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackKey?: keyof typeof defaultImages;
  fallbackSrc?: string;
}

export default function SafeImage({
  fallbackKey = 'placeholder',
  fallbackSrc,
  src,
  alt,
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const fallback = fallbackSrc || defaultImages[fallbackKey];

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallback);
    }
  };

  return (
    <Image
      {...props}
      src={imgSrc || fallback}
      alt={alt}
      onError={handleError}
    />
  );
}
