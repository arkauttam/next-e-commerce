'use client';
import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export type TextShimmerProps = {
  children: string;
  as?: React.ElementType;
  className?: string;
  duration?: number;
  spread?: number;
};

function TextShimmerComponent({
  children,
  as: Component = 'span',
  className,
  duration = 2,
  spread = 20,
}: TextShimmerProps) {
  const MotionComponent = motion(Component as keyof JSX.IntrinsicElements);

  const gradientWidth = useMemo(() => `${spread * children.length}px`, [children, spread]);

  return (
    <MotionComponent
      className={cn(
        'relative inline-block text-transparent bg-clip-text',
        'bg-gradient-to-r from-gray-400 via-white to-gray-400',
        className
      )}
      initial={{ backgroundPosition: `-${gradientWidth} 0` }}
      animate={{ backgroundPosition: `${gradientWidth} 0` }}
      transition={{ repeat: Infinity, duration, ease: 'linear' }}
      style={{
        backgroundSize: `${gradientWidth} 100%`,
      }}
    >
      {children}
    </MotionComponent>
  );
}

export const TextShimmer = React.memo(TextShimmerComponent);
