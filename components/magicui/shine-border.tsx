"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ShineBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  borderWidth?: number;
  duration?: number; // seconds
  shineColor?: string | string[]; // accept string or array
}

export const ShineBorder: React.FC<ShineBorderProps> = ({
  children,
  className,
  borderWidth = 2,
  duration = 6,
  shineColor = ["#A07CFE", "#FE8FB5", "#FFBE7B"],
  ...props
}) => {
  const colors = Array.isArray(shineColor) ? shineColor : [shineColor];
  const stops = [...colors, colors[0]]; // repeat first color for smooth loop
  const gradient = `conic-gradient(from 0deg at 50% 50%, ${stops.join(", ")})`;

  const overlayStyle: React.CSSProperties = {
    backgroundImage: gradient,
    backgroundSize: "200% 200%",
    borderRadius: "inherit",
    padding: `${borderWidth}px`,
    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    // @ts-ignore
    maskComposite: "exclude",
    ["--speed" as any]: `${duration}s`,
  };

  return (
    <div
      className={cn("relative overflow-hidden rounded-xl", className)}
      {...props}
    >
      {/* Animated border overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 will-change-transform animate-spin-gradient"
        style={overlayStyle}
      />

      {/* Content */}
      <div className="relative z-0">{children}</div>
    </div>
  );
};
