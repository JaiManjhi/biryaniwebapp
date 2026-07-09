'use client';

import Image from 'next/image';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import styles from './BrandStory.module.css';

/* ═══════════════════════════════════════════════════════
   Brand Story — Trust-building section
   
   Two-column layout:
   - Left: Story text
   - Right: Real heritage photography image with caption
   ═══════════════════════════════════════════════════════ */

export default function BrandStory() {
  return (
    <section id="story" className={`section ${styles.story}`} aria-labelledby="story-heading">
      <div className={`container ${styles.container}`}>
        {/* Left — Story */}
        <ScrollReveal preset="fadeLeft" className={styles.textCol}>
          <span className="label-uppercase">Our Story</span>
          <h2 id="story-heading" className={`heading-3 ${styles.heading}`}>
            A Legacy of Flavor,
            <span className="text-gold"> Generations in the Making</span>
          </h2>
          <div className={styles.divider} aria-hidden="true" />
          <p className={styles.paragraph}>
            What began as a humble family recipe passed down through three generations
            has become a culinary landmark. Our founder, inspired by the royal kitchens
            of Hyderabad, perfected the art of Dum — slow-cooking biryani in sealed
            vessels over charcoal, allowing every grain of aged basmati to absorb
            the essence of saffron, whole spices, and tender meats.
          </p>
          <p className={styles.paragraph}>
            Today, we honour that tradition with the same unwavering commitment to
            quality. Every biryani is crafted from scratch daily, using hand-selected
            ingredients and time-tested techniques that cannot be rushed or replicated
            by machines.
          </p>
          <div className={styles.signature}>
            <span className={styles.signatureName}>— The Biryani Family</span>
            <span className={styles.signatureYear}>Est. 2009</span>
          </div>
        </ScrollReveal>

        {/* Right — Image */}
        <ScrollReveal preset="fadeRight" delay={0.2} className={styles.imageCol}>
          <div className={styles.imageFrame}>
            <div className={styles.imageInner}>
              <Image
                src="/images/food/crafting-chef.png"
                alt="Chef preparing authentic Dum Biryani with steam and spices"
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                className={styles.heritageImage}
              />
              <div className={styles.textOverlay}>
                <span className={styles.imageCaption}>Crafting perfection since 2009</span>
              </div>
            </div>
            <div className={styles.frameAccent} aria-hidden="true" />
            <div className={styles.frameDots} aria-hidden="true" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
