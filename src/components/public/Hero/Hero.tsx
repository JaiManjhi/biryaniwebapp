'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown, ShoppingBag, CalendarDays } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import styles from './Hero.module.css';

/* ═══════════════════════════════════════════════════════
   Hero Section — Full-screen realistic background
   ═══════════════════════════════════════════════════════ */

export default function Hero() {
  return (
    <section 
      id="hero" 
      className={styles.hero} 
      aria-label="Hero"
    >
      {/* Background Image of realistic biryani with automatic CSS zoom */}
      <div className={styles.heroBgImageWrapper}>
        <Image
          src="/images/food/hero-bg-biryani.png"
          alt="Premium authentic slow-cooked dum biryani feast"
          fill
          priority
          className={styles.heroBgImage}
        />
        <div className={styles.heroOverlay} />
      </div>

      <div className={styles.container}>
        {/* Content Overlay */}
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className={styles.tagline}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            ✦ EVERY GRAIN TELLS A STORY ✦
          </motion.span>

          <motion.h1
            className={styles.headline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            DUM<span className={styles.headlineAccent}>.</span>
          </motion.h1>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Slow-cooked perfection layered with tradition. Every grain
            tells a story of patience, premium spices, and
            generations of culinary mastery.
          </motion.p>

          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Button
              variant="primary"
              size="lg"
              leftIcon={<ShoppingBag size={18} />}
              onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Order Now
            </Button>
            <Button
              variant="secondary"
              size="lg"
              leftIcon={<CalendarDays size={18} />}
              onClick={() => document.querySelector('#reservation')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Reserve Table
            </Button>
          </motion.div>

          <motion.div
            className={styles.stats}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <div className={styles.stat}>
              <span className={styles.statNumber}>15+</span>
              <span className={styles.statLabel}>Years of Legacy</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNumber}>50K+</span>
              <span className={styles.statLabel}>Happy Customers</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNumber}>4.9</span>
              <span className={styles.statLabel}>★ Rating</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#story"
        className={styles.scrollIndicator}
        aria-label="Scroll to next section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={(e) => {
          e.preventDefault();
          document.querySelector('#story')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className={styles.scrollText}>Discover</span>
        <ChevronDown size={20} className={styles.scrollArrow} />
      </motion.a>
    </section>
  );
}
