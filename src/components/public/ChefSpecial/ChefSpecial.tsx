'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { Button } from '@/components/shared/Button';
import { ShoppingBag, Clock, Award } from 'lucide-react';
import styles from './ChefSpecial.module.css';

/* ═══════════════════════════════════════════════════════
   Chef's Special — Spotlight section
   
   Large image, chef quote, limited edition dish,
   golden border, parallax background.
   ═══════════════════════════════════════════════════════ */

export default function ChefSpecial() {
  return (
    <section id="specials" className={`section ${styles.section}`} aria-labelledby="chef-heading">
      <div className={styles.parallaxBg} aria-hidden="true" />
      <div className={`container ${styles.container}`}>
        {/* Image Side */}
        <ScrollReveal preset="fadeLeft" className={styles.imageCol}>
          <div className={styles.imageFrame}>
            <div className={styles.imagePlaceholder}>
              <Image
                src="/images/food/chef-special.png"
                alt="Royal Nawabi Biryani — Chef's Special"
                width={500}
                height={500}
                className={styles.chefImage}
              />
            </div>
            <div className={styles.goldenBorder} aria-hidden="true" />
            <div className={styles.limitedBadge}>
              <Award size={14} />
              Limited Edition
            </div>
          </div>
        </ScrollReveal>

        {/* Content Side */}
        <ScrollReveal preset="fadeRight" delay={0.2} className={styles.content}>
          <span className="label-uppercase">Chef&apos;s Special</span>
          <h2 id="chef-heading" className={`heading-3 ${styles.heading}`}>
            Royal Nawabi
            <span className="text-gradient"> Biryani</span>
          </h2>
          <div className={styles.divider} />

          <blockquote className={styles.quote}>
            <p>&ldquo;This biryani is my tribute to the Nawabs — each layer is a poem, each bite a verse of culinary heritage.&rdquo;</p>
            <cite className={styles.citeName}>— Chef Ahmad Hassan</cite>
          </blockquote>

          <p className={styles.description}>
            A masterpiece of slow-cooked lamb, saffron-infused aged basmati,
            edible gold leaf, and a secret blend of 32 spices. Available only
            on weekends, limited to 50 servings per day.
          </p>

          <div className={styles.details}>
            <div className={styles.detail}>
              <Clock size={16} />
              <span>90 min prep</span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailPrice}>₹899</span>
              <span className={styles.detailOriginal}>₹1,199</span>
            </div>
          </div>

          <Button variant="primary" size="lg" leftIcon={<ShoppingBag size={18} />}>
            Order Chef&apos;s Special
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
