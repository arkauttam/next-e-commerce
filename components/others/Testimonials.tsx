'use client';
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Marquee } from '../magicui/marquee';
import { TextShimmer } from '../motion-primitives/text-shimmer';
import { testinomials as rawTestimonials } from '@/data/testimonials/testimonialData'; // make sure the export name & file path match exactly

const ReviewCard = ({
  name,
  designation,
  content,
  image,
}: {
  name?: string;
  designation?: string;
  content?: string;
  image?: string;
}) => {
  // fallback to a local placeholder in /public/images/avatar-placeholder.png
  const imgSrc = image && typeof image === 'string' && image.length ? image : '/images/avatar-placeholder.png';

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
          src={imgSrc}
          alt={name ?? 'Reviewer'}
          width={48}
          height={48}
          className="rounded-full object-cover"
          // onError is available on next/image; you can log or use fallback there if needed
        />
        <div className="flex flex-col">
          <TextShimmer duration={1.5} className="text-sm font-semibold dark:text-white">
            {name ?? 'Anonymous'}
          </TextShimmer>
          <p className="text-xs text-gray-700 dark:text-white/40">{designation ?? ''}</p>
        </div>
      </div>
      <blockquote className="text-sm text-gray-700 dark:text-gray-300">
        <TextShimmer duration={2} spread={3}>
          {content ?? ''}
        </TextShimmer>
      </blockquote>
    </figure>
  );
};

export const TestimonialsSection = () => {
  const testimonials = Array.isArray(rawTestimonials) ? rawTestimonials : [];
  const half = Math.ceil(testimonials.length / 2);
  const firstRow = testimonials.slice(0, half);
  const secondRow = testimonials.slice(half);

  if (testimonials.length === 0) return null;

  return (
    <section className="relative py-16 w-full flex flex-col items-center justify-center overflow-hidden bg-gray-200 dark:bg-gray-800">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((item) => (
          <ReviewCard
            key={item.id ?? item.name ?? Math.random()}
            name={item.name}
            designation={item.designation}
            content={item.content}
            image={item.image}
          />
        ))}
      </Marquee>

      <Marquee reverse pauseOnHover className="[--duration:20s] mt-6">
        {secondRow.map((item) => (
          <ReviewCard
            key={item.id ?? item.name ?? Math.random()}
            name={item.name}
            designation={item.designation}
            content={item.content}
            image={item.image}
          />
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background" />
    </section>
  );
};
