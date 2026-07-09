'use client';

import { motion, type Variants, type HTMLMotionProps } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { type ReactNode } from 'react';

/* ═══════════════════════════════════════════════════════
   ScrollReveal — Animation wrapper component
   
   Wraps children with Framer Motion animations triggered
   on scroll. Supports multiple animation presets and
   staggered children. Respects prefers-reduced-motion.
   ═══════════════════════════════════════════════════════ */

type AnimationPreset =
  | 'fadeUp'
  | 'fadeDown'
  | 'fadeLeft'
  | 'fadeRight'
  | 'scaleUp'
  | 'fade';

interface ScrollRevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  preset?: AnimationPreset;
  delay?: number;
  duration?: number;
  threshold?: number;
  staggerChildren?: number;
  className?: string;
}

const presets: Record<AnimationPreset, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export default function ScrollReveal({
  children,
  preset = 'fadeUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.15,
  staggerChildren = 0,
  className = '',
  ...motionProps
}: ScrollRevealProps) {
  const prefersReduced = useReducedMotion();
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold });

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const variants = presets[preset];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={{
        hidden: variants.hidden,
        visible: {
          ...variants.visible,
          transition: {
            duration,
            delay,
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: staggerChildren > 0 ? staggerChildren : undefined,
          },
        },
      }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

/* ── Stagger Item — use inside ScrollReveal with staggerChildren ── */
export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 25 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
