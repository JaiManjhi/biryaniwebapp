'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { Logo } from '@/components/shared/Logo';
import styles from './Footer.module.css';

/* ═══════════════════════════════════════════════════════
   Footer — Logo, quick links, contact, newsletter,
   copyright. Minimal animation.
   ═══════════════════════════════════════════════════════ */

const quickLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Our Story', href: '#story' },
  { label: 'Menu', href: '#menu' },
  { label: 'Specials', href: '#specials' },
  { label: 'Reserve', href: '#reservation' },
  { label: 'Contact', href: '#contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/legal/privacy-policy' },
  { label: 'Terms of Service', href: '/legal/terms-of-service' },
  { label: 'Refund Policy', href: '/legal/refund-policy' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.container}`}>
        {/* Logo + About */}
        <div className={styles.col}>
          <a href="#hero" className={styles.logo} onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }} style={{ gap: '10px' }}>
            <Logo width={36} height={36} variant="gold" />
            <span className={styles.logoText}>
              DUM<span className={styles.logoAccent}>.</span>
            </span>
          </a>
          <p className={styles.about}>
            Experience the art of authentic dum biryani. Slow-cooked perfection
            layered with tradition since 2009.
          </p>
        </div>

        {/* Quick Links */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Quick Links</h3>
          <ul className={styles.links}>
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={styles.link}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Legal</h3>
          <ul className={styles.links}>
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={styles.link}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Newsletter</h3>
          <p className={styles.newsletterText}>
            Get exclusive offers and updates delivered to your inbox.
          </p>
          <form className={styles.newsletter} onSubmit={handleSubscribe}>
            <input
              type="email"
              className={styles.newsletterInput}
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email for newsletter"
              required
            />
            <Button type="submit" variant="primary" size="sm">
              {subscribed ? '✓' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className="container">
          <p className={styles.copyright}>
            © {new Date().getFullYear()} DUM. Made with{' '}
            <Heart size={14} className={styles.heart} /> and premium spices.
          </p>
        </div>
      </div>
    </footer>
  );
}
