'use client';

import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { ScrollReveal, StaggerItem } from '@/components/shared/ScrollReveal';
import styles from './Contact.module.css';

/* ═══════════════════════════════════════════════════════
   Contact — Location, details, and map
   ═══════════════════════════════════════════════════════ */

const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block' }}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const contactInfo = [
  { icon: <MapPin size={20} />, label: 'Address', value: '42 Biryani Street, Food Lane,\nHyderabad, Telangana 500001' },
  { icon: <Phone size={20} />, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: <Mail size={20} />, label: 'Email', value: 'hello@sellingtastybiryani.com', href: 'mailto:hello@sellingtastybiryani.com' },
  { icon: <Clock size={20} />, label: 'Hours', value: 'Mon – Sun: 11:00 AM – 11:00 PM' },
];

const socialLinks = [
  { name: 'Instagram', icon: <InstagramIcon size={20} />, href: 'https://www.instagram.com/iblame_jayyx?igsh=YWFmZW1wM2ExOW82' },
  { name: 'X', icon: <XIcon size={20} />, href: 'https://x.com' },
  { name: 'LinkedIn', icon: <LinkedinIcon size={20} />, href: 'https://www.linkedin.com/in/jai-manjhi-081636372/' },
];

export default function Contact() {
  return (
    <section id="contact" className={`section ${styles.section}`} aria-labelledby="contact-heading">
      <div className={`container ${styles.container}`}>
        {/* Info */}
        <ScrollReveal preset="fadeLeft" className={styles.info}>
          <span className="label-uppercase">Get in Touch</span>
          <h2 id="contact-heading" className="heading-2">
            Visit <span className="text-gradient">Us</span>
          </h2>
          <div className="section-divider" style={{ marginInline: 0 }} />

          <ScrollReveal preset="fadeUp" staggerChildren={0.1}>
            <div className={styles.details}>
              {contactInfo.map((item) => (
                <StaggerItem key={item.label}>
                  <div className={styles.detailItem}>
                    <div className={styles.detailIcon}>{item.icon}</div>
                    <div>
                      <span className={styles.detailLabel}>{item.label}</span>
                      {item.href ? (
                        <a href={item.href} className={styles.detailValue}>{item.value}</a>
                      ) : (
                        <span className={styles.detailValue}>{item.value}</span>
                      )}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </ScrollReveal>

          {/* Socials */}
          <div className={styles.socials}>
            <span className={styles.socialLabel}>Follow Us</span>
            <div className={styles.socialLinks}>
              {socialLinks.map((link) => (
                <a key={link.name} href={link.href} className={styles.socialLink} aria-label={link.name} title={link.name}>
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Map */}
        <ScrollReveal preset="fadeRight" delay={0.2} className={styles.mapCol}>
          <div className={styles.mapWrapper}>
            <div className={styles.mapPlaceholder}>
              <MapPin size={48} className={styles.mapIcon} />
              <span className={styles.mapText}>Interactive Map</span>
              <span className={styles.mapSubtext}>Google Maps integration ready</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
