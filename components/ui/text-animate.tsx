"use client";
import { motion } from "framer-motion";
import React from "react";

interface TextAnimateProps {
  text: string;
  className?: string;
}

export function TextAnimate({ text, className }: TextAnimateProps) {
  const letters = Array.from(text);

  return (
    <motion.div
      className={`flex flex-wrap text-2xl font-bold ${className}`}
      initial="hidden"
      whileInView="visible"   // 👀 animate only when in view
      viewport={{ once: false, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,   // smaller delay → smoother flow
            ease: "easeOut",         // smoother easing
          },
        },
      }}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 25 },   // start lower & invisible
            visible: { opacity: 1, y: 0 },   // fade + slide in
          }}
          transition={{
            duration: 0.6,            // smoother transition
            ease: "easeOut",          // natural easing
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
