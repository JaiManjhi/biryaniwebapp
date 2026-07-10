'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Mail, FileText } from 'lucide-react';
import styles from '../legal.module.css';

/* ═══════════════════════════════════════════════════════
   Terms of Service — DUM. Biryani
   ═══════════════════════════════════════════════════════ */

const sections = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    content: [
      'By accessing or using the DUM. website, mobile application, or any of our services — including online ordering, table reservations, and newsletter subscriptions — you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.',
      'If you do not agree to these terms, please refrain from using our services. We reserve the right to modify these terms at any time, and your continued use of our services constitutes acceptance of any changes.',
    ],
  },
  {
    id: 'eligibility',
    title: 'Eligibility',
    content: [
      'To use our services, you must be at least 18 years of age or have the consent of a parent or legal guardian. By placing an order or making a reservation, you represent and warrant that you meet this requirement.',
      'You agree to provide accurate, current, and complete information during registration and ordering, and to update such information to keep it accurate and complete.',
    ],
  },
  {
    id: 'account',
    title: 'User Accounts',
    content: [
      'When you create an account on our platform, you are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.',
    ],
    list: [
      'You must not share your account credentials with any third party',
      'You must notify us immediately of any unauthorized use of your account',
      'We reserve the right to suspend or terminate accounts that violate these terms',
      'You are responsible for all orders placed through your account, whether authorized by you or not',
    ],
    highlight:
      'DUM. will never ask for your password via email, phone, or any other communication channel. If you receive such a request, please report it to us immediately.',
  },
  {
    id: 'orders-payments',
    title: 'Orders & Payments',
    content: [
      'All orders placed through our website or application are subject to availability and confirmation. We reserve the right to refuse or cancel any order for reasons including but not limited to product availability, pricing errors, or suspected fraudulent activity.',
    ],
    list: [
      'Prices are listed in Indian Rupees (INR) and include applicable taxes unless stated otherwise',
      'Payment must be completed at the time of placing the order',
      'We accept major credit cards, debit cards, UPI, net banking, and select digital wallets',
      'Delivery charges, if applicable, will be displayed before you confirm your order',
      'We are not responsible for any additional fees charged by your bank or payment provider',
    ],
  },
  {
    id: 'delivery',
    title: 'Delivery & Pickup',
    content: [
      'We strive to deliver your orders within the estimated timeframe displayed at checkout. However, delivery times are estimates and may vary due to factors beyond our control, including weather conditions, traffic, or high order volumes.',
    ],
    list: [
      'You must provide an accurate and complete delivery address',
      'Someone must be available to receive the order at the delivery address',
      'We are not liable for delays caused by incorrect addresses or unavailability at the delivery location',
      'For dine-in reservations, we hold tables for 15 minutes past the reserved time; after that, the reservation may be released',
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    content: [
      'All content on the DUM. website — including but not limited to text, graphics, logos, images, recipes, menu descriptions, photographs, videos, and software — is the property of DUM. or its content suppliers and is protected by intellectual property laws.',
    ],
    list: [
      'You may not reproduce, distribute, or create derivative works from our content without prior written consent',
      'The DUM. name, logo, and all related brand elements are registered trademarks',
      'User-submitted content (reviews, photos) may be used by DUM. for promotional purposes with attribution',
    ],
  },
  {
    id: 'prohibited-conduct',
    title: 'Prohibited Conduct',
    content: [
      'When using our services, you agree not to engage in any of the following activities:',
    ],
    list: [
      'Using the service for any unlawful purpose or in violation of these terms',
      'Attempting to gain unauthorized access to our systems or other user accounts',
      'Interfering with or disrupting the integrity or performance of our services',
      'Submitting false or misleading information, including fake reviews or fraudulent orders',
      'Harvesting or collecting user data without consent',
      'Using automated scripts, bots, or crawlers to access our services',
    ],
  },
  {
    id: 'limitation-liability',
    title: 'Limitation of Liability',
    content: [
      'To the maximum extent permitted by applicable law, DUM. and its owners, directors, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.',
      'Our total liability for any claim arising from these terms or our services shall not exceed the total amount paid by you to DUM. in the twelve (12) months preceding the event giving rise to the claim.',
    ],
  },
  {
    id: 'governing-law',
    title: 'Governing Law & Disputes',
    content: [
      'These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes arising from or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana.',
      'We encourage you to contact us directly to resolve any issues before initiating formal legal proceedings. Most concerns can be resolved quickly and amicably through our customer support team.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to These Terms',
    content: [
      'We reserve the right to update or modify these Terms of Service at any time. When we make material changes, we will update the "Last Updated" date and may notify you via email or a prominent notice on our website.',
      'Your continued use of our services after any changes indicates your acceptance of the updated terms. We recommend reviewing these terms periodically.',
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function TermsOfServicePage() {
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
            <span className={styles.heroIcon}>📜</span>
            <p className={styles.heroLabel}>Legal</p>
            <h1 className={styles.heroTitle}>Terms of Service</h1>
            <p className={styles.heroSubtitle}>
              Please read these terms carefully before using our services.
              By accessing DUM., you agree to be bound by these terms.
            </p>
            <div className={styles.lastUpdated}>
              <FileText size={14} />
              Last updated: July 1, 2026
            </div>

            {/* Navigation between legal pages */}
            <div className={styles.legalNav}>
              <Link href="/legal/privacy-policy" className={styles.legalNavLink}>
                Privacy Policy
              </Link>
              <Link href="/legal/terms-of-service" className={`${styles.legalNavLink} ${styles.legalNavLinkActive}`}>
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
            <h3>Questions About Our Terms?</h3>
            <p>
              Our team is happy to clarify any part of these terms. Don&apos;t
              hesitate to reach out.
            </p>
            <a href="mailto:legal@dum.com" className={styles.contactEmail}>
              <Mail size={16} />
              legal@dum.com
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
