'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ScrollReveal, StaggerItem } from '@/components/shared/ScrollReveal';
import styles from './Ingredients.module.css';

/* ═══════════════════════════════════════════════════════
   Ingredient Showcase — Premium background image cards
   
   Each card has a realistic photo as background with
   a gradient overlay for text readability. Hover reveals
   more of the image by lightening the overlay.
   ═══════════════════════════════════════════════════════ */

const ingredients = [
  {
    name: 'Basmati Rice',
    description: 'Aged 2-year premium basmati, each grain elongating to perfection.',
    image: '/images/food/basmati-rice.png',
  },
  {
    name: 'Saffron',
    description: 'Hand-picked Kashmiri saffron threads, worth more than gold by weight.',
    image: '/images/food/saffron.png',
  },
  {
    name: 'Fresh Herbs',
    description: 'Mint and coriander harvested at dawn for peak flavor and aroma.',
    image: '/images/food/fresh-herbs.png',
  },
  {
    name: 'Whole Spices',
    description: 'Cardamom, cinnamon, star anise, bay leaves — toasted and freshly ground.',
    image: '/images/food/whole-spices.png',
  },
  {
    name: 'Premium Chicken',
    description: 'Free-range, antibiotic-free chicken, marinated for 8 hours minimum.',
    image: '/images/food/premium-chicken.png',
  },
  {
    name: 'Paneer',
    description: 'Handmade cottage cheese, soft and creamy, sourced from local dairies.',
    image: '/images/food/paneer.png',
  },
];

export default function Ingredients() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="ingredients-heading">
      <div className="container">
        <ScrollReveal preset="fadeUp" className={styles.header}>
          <span className="label-uppercase">What Goes In</span>
          <h2 id="ingredients-heading" className="heading-2">
            Only the <span className="text-gradient">Finest</span> Ingredients
          </h2>
          <p className={styles.subtitle}>
            We believe extraordinary biryani starts with extraordinary ingredients.
          </p>
          <div className="section-divider" />
        </ScrollReveal>

        {/* Ingredient cards with background images */}
        <ScrollReveal preset="fadeUp" delay={0.2} staggerChildren={0.1}>
          <div className={styles.grid}>
            {ingredients.map((item) => (
              <StaggerItem key={item.name}>
                <motion.article
                  className={styles.card}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                  }}
                >
                  {/* Background image */}
                  <div className={styles.cardBg}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={styles.cardBgImage}
                    />
                  </div>

                  {/* Dark gradient overlay */}
                  <div className={styles.cardOverlay} />

                  {/* Accent glow on hover */}
                  <div className={styles.cardGlow} aria-hidden="true" />

                  {/* Content on top */}
                  <div className={styles.cardContent}>
                    <h3 className={styles.name}>{item.name}</h3>
                    <p className={styles.description}>{item.description}</p>
                  </div>
                </motion.article>
              </StaggerItem>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
