'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Logo } from '@/components/shared/Logo';
import styles from './Navbar.module.css';

/* ═══════════════════════════════════════════════════════
   Navbar — Sticky glassmorphic navigation
   
   Features:
   - Transparent on top, glass on scroll
   - Veg/Non-Veg toggle switch
   - Mobile hamburger menu
   - Smooth scroll to sections
   ═══════════════════════════════════════════════════════ */

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Our Story', href: '#story' },
  { label: 'Menu', href: '#menu' },
  { label: 'Specials', href: '#specials' },
  { label: 'Reserve', href: '#reservation' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { cuisine, toggleCuisine, isVeg } = useTheme();
  const { isAuthenticated, user } = useAuth();
  const { openCart, itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const handleNavClick = useCallback((href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <motion.header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className={styles.nav} aria-label="Main navigation">
        {/* Logo */}
        <a
          href="#hero"
          className={styles.logo}
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
          aria-label="DUM. - Home"
          style={{ gap: '10px' }}
        >
          <Logo width={36} height={36} variant="gold" />
          <span className={styles.logoText}>
            DUM<span className={styles.logoAccent}>.</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <ul className={styles.links} role="menubar">
          {navLinks.map((link) => (
            <li key={link.href} role="none">
              <a
                href={link.href}
                className={styles.link}
                role="menuitem"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className={styles.actions}>
          {/* Veg/Non-Veg Toggle */}
          <button
            className={styles.cuisineToggle}
            onClick={toggleCuisine}
            aria-label={`Switch to ${isVeg ? 'Non-Veg' : 'Veg'} mode`}
            title={`Currently: ${cuisine === 'veg' ? 'Veg' : 'Non-Veg'}`}
          >
            <span className={`${styles.toggleTrack} ${isVeg ? styles.toggleVeg : ''}`}>
              <motion.span
                className={styles.toggleThumb}
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </span>
            <span className={styles.toggleLabel}>
              {isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
            </span>
          </button>

          {/* Cart */}
          <button className={styles.iconBtn} aria-label="Shopping cart" onClick={openCart} style={{ position: 'relative' }}>
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className={styles.cartBadge}>{itemCount > 9 ? '9+' : itemCount}</span>
            )}
          </button>

          {/* Profile / Login */}
          {isAuthenticated ? (
            <Link href="/profile" className={styles.iconBtn} aria-label="Your profile" title={user?.fullName}>
              <span className={styles.userInitial}>{user?.fullName?.charAt(0) || 'U'}</span>
            </Link>
          ) : (
            <Link href="/login" className={styles.iconBtn} aria-label="Sign in">
              <User size={20} />
            </Link>
          )}

          {/* Mobile Hamburger */}
          <button
            className={`${styles.hamburger} ${styles.mobileOnly}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-menu"
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="menu"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className={styles.mobileLink}
                role="menuitem"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
