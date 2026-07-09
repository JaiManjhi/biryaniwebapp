'use client';

import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Star, LogOut, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/shared/Button';
import styles from './profile.module.css';

/* ═══════════════════════════════════════════════════════
   Profile Page — User account overview
   ═══════════════════════════════════════════════════════ */

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className={styles.loadingPage}>
        <span style={{ fontSize: '3rem' }}>🍛</span>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    router.push('/login');
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className={styles.page}>
      <div className={styles.bgGlow} />

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link href="/" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Avatar */}
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            {user.fullName.charAt(0).toUpperCase()}
          </div>
          <h1 className={styles.name}>{user.fullName}</h1>
          <span className={styles.memberSince}>
            Member since {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
        </div>

        {/* Details */}
        <div className={styles.details}>
          <div className={styles.detailRow}>
            <Mail size={16} className={styles.detailIcon} />
            <span>{user.email}</span>
          </div>
          <div className={styles.detailRow}>
            <Phone size={16} className={styles.detailIcon} />
            <span>{user.phone}</span>
          </div>
          <div className={styles.detailRow}>
            <User size={16} className={styles.detailIcon} />
            <span style={{ textTransform: 'capitalize' }}>{user.role}</span>
          </div>
          <div className={styles.detailRow}>
            <Star size={16} className={styles.detailIcon} />
            <span>{user.loyaltyPoints || 0} loyalty points</span>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actionGroup}>
          <Link href="/admin">
            <Button variant="primary" size="lg" fullWidth>
              Go to Dashboard
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="lg"
            fullWidth
            leftIcon={<LogOut size={16} />}
            onClick={handleLogout}
          >
            Sign Out
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
