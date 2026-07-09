'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import styles from './Testimonials.module.css';

/* ═══════════════════════════════════════════════════════
   Testimonials — Auto-scrolling carousel
   
   Cards: customer photo, name, stars, review.
   Auto-scroll. Pause on hover.
   ═══════════════════════════════════════════════════════ */

const testimonials = [
  { id: 1, name: 'Priya Sharma', initials: 'PS', gradient: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)', rating: 5, review: 'The best biryani I have ever tasted. The saffron aroma, the tender chicken, the perfectly cooked rice — it transported me to Hyderabad. Absolutely phenomenal!' },
  { id: 2, name: 'Rahul Patel', initials: 'RP', gradient: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)', rating: 5, review: 'We ordered the Family Feast for a house party. Everyone was blown away. The biryani was restaurant-quality and the portions were incredibly generous.' },
  { id: 3, name: 'Ananya Reddy', initials: 'AR', gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', rating: 5, review: 'As a vegetarian, I\'m often disappointed by biryanis. Not here! The Paneer Tikka Biryani is a masterpiece — rich, aromatic, and absolutely satisfying.' },
  { id: 4, name: 'Mohammed Ali', initials: 'MA', gradient: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)', rating: 5, review: 'Being from Hyderabad, I\'m very particular about my biryani. This place does it right. The dum technique, the quality of meat, the balanced spices — perfection.' },
  { id: 5, name: 'Sneha Gupta', initials: 'SG', gradient: 'linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)', rating: 4, review: 'Fast delivery, beautiful packaging, and the biryani was still piping hot! The raita and salan were the perfect accompaniment. Will order again.' },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = testimonials.length;

  const next = useCallback(() => setCurrent((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + total) % total), [total]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  const testimonial = testimonials[current];

  return (
    <section className={`section ${styles.section}`} aria-labelledby="testimonials-heading">
      <div className="container">
        <ScrollReveal preset="fadeUp" className={styles.header}>
          <span className="label-uppercase">Testimonials</span>
          <h2 id="testimonials-heading" className="heading-2">
            What Our Guests <span className="text-gradient">Say</span>
          </h2>
          <div className="section-divider" />
        </ScrollReveal>

        <div
          className={styles.carousel}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
        >
          <button className={styles.navBtn} onClick={prev} aria-label="Previous testimonial">
            <ChevronLeft size={20} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={testimonial.id}
              className={styles.card}
              initial={{ opacity: 0, scale: 0.95, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              role="group"
              aria-roledescription="slide"
              aria-label={`Testimonial ${current + 1} of ${total}`}
            >
              <div className={styles.avatar} style={{ background: testimonial.gradient }}>
                <span className={styles.avatarInitials}>{testimonial.initials}</span>
              </div>
              <div className={styles.stars} aria-label={`${testimonial.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < testimonial.rating ? styles.starFilled : styles.starEmpty}
                  />
                ))}
              </div>
              <blockquote className={styles.review}>
                &ldquo;{testimonial.review}&rdquo;
              </blockquote>
              <cite className={styles.name}>{testimonial.name}</cite>
            </motion.div>
          </AnimatePresence>

          <button className={styles.navBtn} onClick={next} aria-label="Next testimonial">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className={styles.dots} role="tablist" aria-label="Testimonial slides">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              onClick={() => setCurrent(i)}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
