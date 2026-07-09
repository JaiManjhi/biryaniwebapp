'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  UtensilsCrossed,
  CalendarDays,
  ShoppingBag,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import styles from './Sidebar.module.css';

/* ═══════════════════════════════════════════════════════
   Admin Sidebar — Fixed navigation
   
   Collapsible on mobile, active link highlighting,
   user info at bottom, glassmorphic design.
   ═══════════════════════════════════════════════════════ */

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Menu Items', href: '/admin/menu', icon: UtensilsCrossed },
  { label: 'Reservations', href: '/admin/reservations', icon: CalendarDays },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        className={styles.mobileToggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        {/* Brand */}
        <Link href="/" className={styles.brand}>
          <span className={styles.brandIcon}>🍛</span>
          <span className={styles.brandText}>
            STB<span className={styles.brandAccent}> Admin</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                    {active && (
                      <motion.div
                        className={styles.activeIndicator}
                        layoutId="sidebar-active"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <ChevronRight size={14} className={styles.navArrow} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User info + Logout */}
        <div className={styles.footer}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              {user?.fullName?.charAt(0) || 'A'}
            </div>
            <div className={styles.userDetails}>
              <span className={styles.userName}>{user?.fullName || 'Admin'}</span>
              <span className={styles.userRole}>Administrator</span>
            </div>
          </div>
          <button
            className={styles.logoutBtn}
            onClick={logout}
            aria-label="Sign out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>
    </>
  );
}
