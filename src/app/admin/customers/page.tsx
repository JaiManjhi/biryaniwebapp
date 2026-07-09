'use client';

import { motion } from 'framer-motion';
import { Search, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import styles from '../management.module.css';

/* ═══════════════════════════════════════════════════════
   Admin Customers Page
   ═══════════════════════════════════════════════════════ */

const demoCustomers = [
  { _id: '1', fullName: 'Priya Sharma', email: 'priya@email.com', phone: '9876543210', loyaltyPoints: 450, orders: 12, joinDate: '2025-03-15' },
  { _id: '2', fullName: 'Rahul Patel', email: 'rahul@email.com', phone: '9876543211', loyaltyPoints: 820, orders: 24, joinDate: '2024-11-20' },
  { _id: '3', fullName: 'Ananya Reddy', email: 'ananya@email.com', phone: '9876543212', loyaltyPoints: 150, orders: 5, joinDate: '2026-01-10' },
  { _id: '4', fullName: 'Mohammed Ali', email: 'ali@email.com', phone: '9876543213', loyaltyPoints: 1200, orders: 38, joinDate: '2024-06-05' },
  { _id: '5', fullName: 'Sneha Gupta', email: 'sneha@email.com', phone: '9876543214', loyaltyPoints: 320, orders: 9, joinDate: '2025-08-22' },
];

export default function CustomersPage() {
  const [search, setSearch] = useState('');
  const filtered = demoCustomers.filter((c) => !search || c.fullName.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Customers</h1>
          <p className={styles.pageSubtitle}>{demoCustomers.length} registered customers</p>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={16} />
          <input type="text" placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)} className={styles.searchInput} />
        </div>
      </div>

      <motion.div className={styles.tableCard} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Contact</th>
              <th>Orders</th>
              <th>Loyalty Points</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c._id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--clr-accent-subtle)', color: 'var(--clr-accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>{c.fullName.charAt(0)}</div>
                    <span className={styles.bold}>{c.fullName}</span>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span className={styles.muted} style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Mail size={12} />{c.email}</span>
                    <span className={styles.muted} style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Phone size={12} />{c.phone}</span>
                  </div>
                </td>
                <td className={styles.bold}>{c.orders}</td>
                <td><span className={styles.badge} style={{ background: 'rgba(212,168,85,0.15)', color: '#d4a855' }}>⭐ {c.loyaltyPoints}</span></td>
                <td className={styles.muted}>{new Date(c.joinDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
