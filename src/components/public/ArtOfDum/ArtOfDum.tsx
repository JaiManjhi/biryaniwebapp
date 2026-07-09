'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollReveal, StaggerItem } from '@/components/shared/ScrollReveal';
import { FlaskConical, Leaf, Layers, Flame, Utensils } from 'lucide-react';
import styles from './ArtOfDum.module.css';

/* ═══════════════════════════════════════════════════════
   Art of Dum — Cinematic process timeline
   
   A vertical timeline displaying:
   - Symmetrical card items where realistic images are beautifully integrated inside the cards.
   - Parallax scrolling background aroma steam clouds.
   ═══════════════════════════════════════════════════════ */

const steps = [
  {
    number: '01',
    icon: FlaskConical,
    title: 'Marination',
    description: 'Premium cuts marinated for 8 hours in a secret blend of yogurt, saffron, and 24 aromatic spices.',
    image: '/images/food/process-marination.png',
  },
  {
    number: '02',
    icon: Leaf,
    title: 'Fresh Ingredients',
    description: 'Hand-selected aged basmati rice, whole spices sourced daily, and farm-fresh herbs gathered each morning.',
    image: '/images/food/process-ingredients.png',
  },
  {
    number: '03',
    icon: Layers,
    title: 'Layering',
    description: 'Alternating layers of rice and marinated protein, each infused with saffron milk and rose water.',
    image: '/images/food/process-layering.png',
  },
  {
    number: '04',
    icon: Flame,
    title: 'Slow Cooking',
    description: 'Sealed with dough and slow-cooked on charcoal for 45 minutes. The Dum process locks in every flavor.',
    image: '/images/food/process-cooking.png',
  },
  {
    number: '05',
    icon: Utensils,
    title: 'Serving',
    description: 'The seal is broken tableside, releasing an aromatic cloud of steam. Garnished with fried onions and fresh mint.',
    image: '/images/food/process-serving.png',
  },
];

export default function ArtOfDum() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax translation for background aroma/steam elements moving up faster than scroll
  const steamY1 = useTransform(scrollYProgress, [0, 1], [100, -150]);
  const steamY2 = useTransform(scrollYProgress, [0, 1], [50, -250]);
  const steamY3 = useTransform(scrollYProgress, [0, 1], [150, -100]);

  return (
    <section id="art-of-dum" ref={sectionRef} className={`section ${styles.section}`} aria-labelledby="dum-heading">
      {/* Background Parallax Aroma/Steam Clouds */}
      <div className={styles.steamContainer} aria-hidden="true">
        <motion.div style={{ y: steamY1 }} className={`${styles.steamCloud} ${styles.steam1}`} />
        <motion.div style={{ y: steamY2 }} className={`${styles.steamCloud} ${styles.steam2}`} />
        <motion.div style={{ y: steamY3 }} className={`${styles.steamCloud} ${styles.steam3}`} />
      </div>

      <div className="container">
        <ScrollReveal preset="fadeUp" className={styles.header}>
          <span className="label-uppercase">The Process</span>
          <h2 id="dum-heading" className="heading-2">
            The Art of <span className="text-gradient">Dum</span>
          </h2>
          <p className={styles.subtitle}>
            Five meticulous steps that transform raw ingredients into an unforgettable experience.
          </p>
          <div className="section-divider" />
        </ScrollReveal>

        <ScrollReveal preset="fadeUp" delay={0.2} staggerChildren={0.15}>
          <div className={styles.timeline}>
            {/* Center vertical line */}
            <div className={styles.timelineLine} aria-hidden="true" />

            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isEven = index % 2 === 0;

              return (
                <StaggerItem key={step.number}>
                  <div className={`${styles.step} ${!isEven ? styles.stepReverse : ''}`}>
                    {/* Number node on center line */}
                    <div className={styles.node}>
                      <span className={styles.nodeNumber}>{step.number}</span>
                    </div>

                    {/* Symmetrical step card containing both image and text inside the card */}
                    <motion.div
                      className={styles.card}
                      whileHover={{ y: -5, borderColor: 'var(--clr-accent-primary)' }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Image header inside card */}
                      <div className={styles.cardImageWrapper}>
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 450px"
                          className={styles.cardImage}
                        />
                        <div className={styles.cardImageOverlay} />
                      </div>

                      {/* Content block inside card */}
                      <div className={styles.cardContent}>
                        <div className={styles.titleRow}>
                          <div className={styles.iconWrapper}>
                            <IconComponent className={styles.cardIcon} size={20} />
                          </div>
                          <h3 className={styles.cardTitle}>{step.title}</h3>
                        </div>
                        <p className={styles.cardDescription}>{step.description}</p>
                      </div>
                    </motion.div>

                    {/* Symmetrical placeholder on opposite side to maintain perfect timeline alignment */}
                    <div className={styles.placeholderColumn} aria-hidden="true" />
                  </div>
                </StaggerItem>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
