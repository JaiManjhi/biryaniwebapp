'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/shared/Logo';
import styles from './LoadingScreen.module.css';

/* ═══════════════════════════════════════════════════════
   Loading Screen — Cinematic intro experience
   
   Duration: 2.5 seconds
   Sequence: Steam rises → Logo fades in → Text reveals
   letter-by-letter → Fades into hero
   ═══════════════════════════════════════════════════════ */

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const tagline = 'EVERY GRAIN TELLS A STORY';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 600);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          aria-live="polite"
          role="status"
        >
          {/* Steam particles */}
          <div className={styles.steamContainer} aria-hidden="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className={styles.steam}
                initial={{ opacity: 0, y: 0, scaleX: 1 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  y: [0, -80, -150],
                  scaleX: [1, 1.4, 0.6],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.18,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>

          {/* Logo */}
          <motion.div
            className={styles.logo}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Logo width={90} height={90} variant="gold" />
            <h1 className={styles.logoText}>
              DUM<span className={styles.logoAccent}>.</span>
            </h1>
          </motion.div>

          {/* Letter-by-letter tagline */}
          <div className={styles.tagline} aria-label={tagline}>
            {tagline.split('').map((char, i) => (
              <motion.span
                key={i}
                className={styles.letter}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.8 + i * 0.04,
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                aria-hidden="true"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>

          {/* Progress bar */}
          <motion.div
            className={styles.progressTrack}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className={styles.progressBar}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
