'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/admin/Sidebar/Sidebar';
import styles from './admin.module.css';

/* ═══════════════════════════════════════════════════════
   Admin Layout — Sidebar + content area
   
   Protected: redirects to /login if unauthenticated.
   ═══════════════════════════════════════════════════════ */

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className={styles.loadingScreen}>
        <span className={styles.loadingIcon}>🍛</span>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className={styles.layout}>
      <AdminSidebar />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
