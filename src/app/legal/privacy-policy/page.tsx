'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Mail, Shield } from 'lucide-react';
import styles from '../legal.module.css';

/* ═══════════════════════════════════════════════════════
   Privacy Policy — DUM. Biryani
   ═══════════════════════════════════════════════════════ */

const sections = [
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    content: [
      'When you visit our website, place an order, make a reservation, or subscribe to our newsletter, we may collect the following personal information:',
    ],
    list: [
      'Full name and contact details (email address, phone number)',
      'Delivery address and billing information',
      'Payment details (processed securely via third-party payment gateways — we do not store card numbers)',
      'Order history and dining preferences',
      'Device information, IP address, and browser type (collected automatically)',
      'Cookies and similar tracking technologies for site functionality and analytics',
    ],
  },
  {
    id: 'how-we-use',
    title: 'How We Use Your Information',
    content: [
      'We use the information we collect to provide you with the best possible dining experience. Your data helps us:',
    ],
    list: [
      'Process and fulfill your food orders and table reservations',
      'Send order confirmations, delivery updates, and receipts',
      'Personalize your experience based on your preferences and past orders',
      'Send promotional emails, special offers, and event invitations (only with your consent)',
      'Improve our website, menu offerings, and customer service',
      'Detect and prevent fraudulent transactions',
      'Comply with legal obligations and resolve disputes',
    ],
  },
  {
    id: 'data-sharing',
    title: 'Data Sharing & Third Parties',
    content: [
      'We value your privacy and do not sell your personal information to third parties. However, we may share your data in the following limited circumstances:',
    ],
    list: [
      'Delivery partners — to fulfill your food delivery orders',
      'Payment processors — to securely handle transactions (e.g., Razorpay, Stripe)',
      'Analytics services — to understand site usage and improve our services (e.g., Google Analytics)',
      'Legal authorities — when required by law or to protect our rights',
    ],
    highlight:
      'All third-party partners are contractually obligated to protect your data and use it only for the purposes we specify.',
  },
  {
    id: 'cookies',
    title: 'Cookies & Tracking',
    content: [
      'Our website uses cookies and similar technologies to enhance your browsing experience. Cookies help us remember your preferences, keep you logged in, and understand how you interact with our site.',
      'You can manage your cookie preferences through your browser settings. Please note that disabling certain cookies may affect the functionality of our website, such as the ability to add items to your cart or complete a reservation.',
    ],
  },
  {
    id: 'data-security',
    title: 'Data Security',
    content: [
      'We implement industry-standard security measures to protect your personal information, including SSL/TLS encryption for all data in transit, secure server infrastructure, and regular security audits.',
      'While we strive to use commercially acceptable means to protect your data, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security but are committed to protecting your information to the best of our ability.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    content: [
      'You have the right to access, update, or request deletion of your personal information at any time. Specifically, you may:',
    ],
    list: [
      'Access the personal data we hold about you',
      'Request correction of any inaccurate information',
      'Request deletion of your account and associated data',
      'Opt out of marketing communications at any time',
      'Request a copy of your data in a portable format',
    ],
    highlight:
      'To exercise any of these rights, please contact us at privacy@dum.com. We will respond to your request within 30 days.',
  },
  {
    id: 'childrens-privacy',
    title: 'Children\'s Privacy',
    content: [
      'Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately and we will take steps to delete the data.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    content: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices or for legal and regulatory reasons. When we make significant changes, we will notify you by updating the "Last Updated" date at the top of this page and, where appropriate, provide additional notice via email.',
      'We encourage you to review this policy periodically to stay informed about how we are protecting your information.',
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

export default function PrivacyPolicyPage() {
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
            <span className={styles.heroIcon}>🔒</span>
            <p className={styles.heroLabel}>Legal</p>
            <h1 className={styles.heroTitle}>Privacy Policy</h1>
            <p className={styles.heroSubtitle}>
              Your privacy matters to us. This policy explains how DUM. collects,
              uses, and protects your personal information.
            </p>
            <div className={styles.lastUpdated}>
              <Shield size={14} />
              Last updated: July 1, 2026
            </div>

            {/* Navigation between legal pages */}
            <div className={styles.legalNav}>
              <Link href="/legal/privacy-policy" className={`${styles.legalNavLink} ${styles.legalNavLinkActive}`}>
                Privacy Policy
              </Link>
              <Link href="/legal/terms-of-service" className={styles.legalNavLink}>
                Terms of Service
              </Link>
              <Link href="/legal/refund-policy" className={styles.legalNavLink}>
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
            <h3>Questions About Your Privacy?</h3>
            <p>
              We&apos;re here to help. Reach out to our privacy team for any
              concerns or requests.
            </p>
            <a href="mailto:privacy@dum.com" className={styles.contactEmail}>
              <Mail size={16} />
              privacy@dum.com
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
