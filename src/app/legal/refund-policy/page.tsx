'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Mail, RotateCcw } from 'lucide-react';
import styles from '../legal.module.css';

/* ═══════════════════════════════════════════════════════
   Refund Policy — DUM. Biryani
   ═══════════════════════════════════════════════════════ */

const sections = [
  {
    id: 'overview',
    title: 'Refund Policy Overview',
    content: [
      'At DUM., we take immense pride in the quality of our food and the satisfaction of every customer. We understand that occasionally things may not go as planned, and we are committed to resolving any issues promptly and fairly.',
      'This Refund Policy outlines the circumstances under which refunds, replacements, or credits may be issued for orders placed through our website or application.',
    ],
  },
  {
    id: 'eligibility',
    title: 'Refund Eligibility',
    content: [
      'You may be eligible for a refund or replacement in the following situations:',
    ],
    list: [
      'Wrong item delivered — you received a different dish than what you ordered',
      'Missing items — one or more items from your order were not delivered',
      'Quality issues — the food arrived in a condition that is significantly below our standard (e.g., spoiled, stale, or contaminated)',
      'Order not delivered — your order was confirmed but never arrived',
      'Duplicate charges — you were charged more than once for the same order',
    ],
    highlight:
      'Refund requests must be raised within 2 hours of delivery. Please include photos of the issue when submitting your request for faster resolution.',
  },
  {
    id: 'non-refundable',
    title: 'Non-Refundable Situations',
    content: [
      'To maintain fairness, the following situations are generally not eligible for refunds:',
    ],
    list: [
      'Change of mind after the order has been prepared or dispatched',
      'Incorrect delivery address provided by the customer',
      'Customer was unavailable to receive the delivery (after reasonable attempts)',
      'Taste preference differences that do not constitute a quality issue',
      'Orders placed with special instructions that were correctly followed but not to the customer\'s liking',
      'Minor variations in food presentation compared to website images',
    ],
  },
  {
    id: 'process',
    title: 'How to Request a Refund',
    content: [
      'We have made the refund process as simple as possible. Follow these steps to request a refund:',
    ],
    list: [
      'Contact us via email at refunds@dum.com or through our website\'s contact form within 2 hours of delivery',
      'Provide your order number, the issue you experienced, and clear photos if applicable',
      'Our team will review your request and respond within 24 hours',
      'If approved, the refund will be processed within 5–7 business days to your original payment method',
    ],
  },
  {
    id: 'refund-methods',
    title: 'Refund Methods & Timeline',
    content: [
      'Depending on the nature of the issue, we may offer one of the following resolutions:',
    ],
    list: [
      'Full refund — credited back to your original payment method within 5–7 business days',
      'Partial refund — for partially incorrect or incomplete orders',
      'Replacement order — we will re-prepare and deliver the correct items at no additional cost',
      'Store credit — added to your DUM. account for future orders (valid for 90 days)',
    ],
    highlight:
      'The refund method will depend on the nature and severity of the issue. Our customer support team will work with you to find the best resolution.',
  },
  {
    id: 'cancellations',
    title: 'Order Cancellations',
    content: [
      'We understand that plans can change. Here is our cancellation policy:',
    ],
    list: [
      'Orders can be cancelled free of charge within 2 minutes of placement',
      'If the order has already been accepted by the kitchen, a cancellation fee of up to 50% may apply',
      'Orders that are already being prepared or out for delivery cannot be cancelled',
      'For table reservations, cancellations must be made at least 2 hours before the reserved time',
    ],
  },
  {
    id: 'dine-in',
    title: 'Dine-In Policy',
    content: [
      'For dine-in experiences, our team is committed to ensuring your satisfaction on the spot. If you encounter any issue with your food during your visit:',
    ],
    list: [
      'Please inform your server immediately — we will replace the dish without charge',
      'If the issue cannot be resolved during your visit, please speak to the restaurant manager',
      'Complaints raised after leaving the restaurant will be evaluated on a case-by-case basis',
    ],
  },
  {
    id: 'contact',
    title: 'Contact Us for Refunds',
    content: [
      'Our dedicated customer support team is available to assist you with any refund-related queries. We aim to resolve all issues within 24 hours of receiving your request.',
      'For the fastest resolution, please have your order number and any relevant photos ready when you contact us. You can reach our refund team at refunds@dum.com or call us during business hours.',
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function RefundPolicyPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <div className="container" style={{ position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.heroIcon}>💰</span>
            <p className={styles.heroLabel}>Legal</p>
            <h1 className={styles.heroTitle}>Refund Policy</h1>
            <p className={styles.heroSubtitle}>
              Your satisfaction is our priority. Learn about our fair and
              transparent refund process.
            </p>
            <div className={styles.lastUpdated}>
              <RotateCcw size={14} />
              Last updated: July 1, 2026
            </div>

            {/* Navigation between legal pages */}
            <div className={styles.legalNav}>
              <Link href="/legal/privacy-policy" className={styles.legalNavLink}>
                Privacy Policy
              </Link>
              <Link href="/legal/terms-of-service" className={styles.legalNavLink}>
                Terms of Service
              </Link>
              <Link href="/legal/refund-policy" className={`${styles.legalNavLink} ${styles.legalNavLinkActive}`}>
                Refund Policy
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Content ─── */}
      <section className={styles.content}>
        <div className={styles.wrapper}>
          {/* Back link */}
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          {/* Table of Contents */}
          <motion.div
            className={styles.toc}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className={styles.tocTitle}>Table of Contents</h2>
            <ol className={styles.tocList}>
              {sections.map((section) => (
                <li key={section.id} className={styles.tocItem}>
                  <a href={`#${section.id}`} className={styles.tocLink}>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </motion.div>

          {/* Sections */}
          {sections.map((section, i) => (
            <motion.div
              key={section.id}
              id={section.id}
              className={styles.section}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
            >
              <p className={styles.sectionNumber}>
                Section {String(i + 1).padStart(2, '0')}
              </p>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              {section.content.map((text, j) => (
                <p key={j} className={styles.sectionText}>
                  {text}
                </p>
              ))}
              {section.list && (
                <ul className={styles.list}>
                  {section.list.map((item, j) => (
                    <li key={j} className={styles.listItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {section.highlight && (
                <div className={styles.highlight}>
                  <p>
                    <strong>Important:</strong> {section.highlight}
                  </p>
                </div>
              )}
            </motion.div>
          ))}

          {/* Contact Banner */}
          <motion.div
            className={styles.contactBanner}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3>Need a Refund?</h3>
            <p>
              Our support team is ready to help resolve your issue quickly and
              fairly.
            </p>
            <a href="mailto:refunds@dum.com" className={styles.contactEmail}>
              <Mail size={16} />
              refunds@dum.com
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
