'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import styles from './VegNonVeg.module.css';

/* ═══════════════════════════════════════════════════════
   Veg / Non-Veg Experience — Full-screen toggle
   
   User picks their preference. Entire site morphs:
   colors, particles, accent, menu recommendations.
   No reload — smooth CSS variable transition.
   ═══════════════════════════════════════════════════════ */

export default function VegNonVeg() {
  const { cuisine, setCuisine } = useTheme();

  return (
    <section className={`section ${styles.section}`} aria-labelledby="experience-heading">
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className="container">
        <ScrollReveal preset="fadeUp" className={styles.header}>
          <span className="label-uppercase">Choose Your Experience</span>
          <h2 id="experience-heading" className="heading-2">
            What&apos;s Your <span className="text-gradient">Flavour</span>?
          </h2>
          <p className={styles.subtitle}>
            Select your preference and watch the entire experience transform.
          </p>
        </ScrollReveal>

        <ScrollReveal preset="scaleUp" delay={0.2}>
          <div className={styles.choices}>
            {/* Veg */}
            <motion.button
              className={`${styles.choice} ${styles.choiceVeg} ${cuisine === 'veg' ? styles.active : ''}`}
              onClick={() => setCuisine('veg')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              aria-pressed={cuisine === 'veg'}
              aria-label="Switch to Vegetarian experience"
            >
              <div className={styles.choiceGlow} style={{ background: 'radial-gradient(circle, rgba(46,204,113,0.15) 0%, transparent 70%)' }} />
              <div className={styles.imageWrapper}>
                <Image
                  src="/images/food/veg-biryani.png"
                  alt="Vegetarian Paneer Biryani"
                  fill
                  sizes="(max-width: 768px) 100vw, 200px"
                  className={styles.choiceImage}
                  priority
                />
              </div>
              <span className={styles.choiceTitle}>
                <span className={styles.indicatorVeg}>🟢</span> Vegetarian
              </span>
              <span className={styles.choiceDesc}>Paneer, vegetables, aromatic herbs</span>
              {cuisine === 'veg' && (
                <motion.div
                  className={styles.activeBadge}
                  layoutId="cuisine-badge"
                  style={{ background: '#2ecc71' }}
                >
                  Active
                </motion.div>
              )}
            </motion.button>

            {/* Divider */}
            <div className={styles.divider}>
              <span className={styles.dividerText}>OR</span>
            </div>

            {/* Non-Veg */}
            <motion.button
              className={`${styles.choice} ${styles.choiceNonveg} ${cuisine === 'nonveg' ? styles.active : ''}`}
              onClick={() => setCuisine('nonveg')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              aria-pressed={cuisine === 'nonveg'}
              aria-label="Switch to Non-Vegetarian experience"
            >
              <div className={styles.choiceGlow} style={{ background: 'radial-gradient(circle, rgba(192,57,43,0.15) 0%, transparent 70%)' }} />
              <div className={styles.imageWrapper}>
                <Image
                  src="/images/food/mutton-biryani.png"
                  alt="Non-Vegetarian Mutton Biryani"
                  fill
                  sizes="(max-width: 768px) 100vw, 200px"
                  className={styles.choiceImage}
                  priority
                />
              </div>
              <span className={styles.choiceTitle}>
                <span className={styles.indicatorNonveg}>🔴</span> Non-Vegetarian
              </span>
              <span className={styles.choiceDesc}>Chicken, mutton, egg specialties</span>
              {cuisine === 'nonveg' && (
                <motion.div
                  className={styles.activeBadge}
                  layoutId="cuisine-badge"
                  style={{ background: '#c0392b' }}
                >
                  Active
                </motion.div>
              )}
            </motion.button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
