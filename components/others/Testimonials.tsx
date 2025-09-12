'use client';
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Marquee } from '../magicui/marquee';
import { TextShimmer } from '../motion-primitives/text-shimmer';
import { testinomials } from '@/data/testimonials/testimonialData';

const firstRow = testinomials.slice(0, Math.ceil(testinomials.length / 2));
const secondRow = testinomials.slice(Math.ceil(testinomials.length / 2));

const ReviewCard = ({
  name,
  designation,
  content,
  image,
}: {
  name: string;
  designation: string;
  content: string;
  image: string;
}) => {
  return (
    <figure
      className={cn(
        'relative h-full w-72 cursor-pointer overflow-hidden rounded-xl border p-4',
        'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
      )}
    >
      <div className="flex items-center gap-3 mb-2">
        <Image
          src={image}
          alt={name}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        <div className="flex flex-col">
          <TextShimmer duration={1.5} className="text-sm font-semibold dark:text-white">
            {name}
          </TextShimmer>
          <p className="text-xs text-gray-700 dark:text-white/40">{designation}</p>
        </div>
      </div>
      <blockquote className="text-sm text-gray-700 dark:text-gray-300">
        <TextShimmer duration={2} spread={3}>
          {content}
        </TextShimmer>
      </blockquote>
    </figure>
  );
};

export const TestimonialsSection = () => {
  return (
    <section className="relative py-16 w-full flex flex-col items-center justify-center overflow-hidden bg-gray-200 dark:bg-gray-800">
      {/* First row */}
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((item) => (
          <ReviewCard
            key={item.id}
            name={item.name}
            designation={item.designation}
            content={item.content}
            image={item.image}
          />
        ))}
      </Marquee>

      {/* Second row */}
      <Marquee reverse pauseOnHover className="[--duration:20s] mt-6">
        {secondRow.map((item) => (
          <ReviewCard
            key={item.id}
            name={item.name}
            designation={item.designation}
            content={item.content}
            image={item.image}
          />
        ))}
      </Marquee>

      {/* Gradient fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background" />
    </section>
  );
};
