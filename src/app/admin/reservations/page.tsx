'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, CalendarDays, Check, X as XIcon } from 'lucide-react';
import styles from '../management.module.css';

/* ═══════════════════════════════════════════════════════
   Admin Reservations Page
   ═══════════════════════════════════════════════════════ */

const statusColors: Record<string, string> = {
  pending: '#f39c12', confirmed: '#3498db', completed: '#2ecc71', cancelled: '#e74c3c',
};

const demoReservations = [
  { _id: '1', customerName: 'Priya Sharma', email: 'priya@email.com', phone: '9876543210', date: '2026-07-08', time: '19:00', guestCount: 4, status: 'pending', specialRequest: 'Window seat preferred' },
  { _id: '2', customerName: 'Rahul Patel', email: 'rahul@email.com', phone: '9876543211', date: '2026-07-08', time: '20:00', guestCount: 2, status: 'confirmed', specialRequest: '' },
  { _id: '3', customerName: 'Ananya Reddy', email: 'ananya@email.com', phone: '9876543212', date: '2026-07-09', time: '13:00', guestCount: 6, status: 'pending', specialRequest: 'Birthday celebration, please arrange cake' },
  { _id: '4', customerName: 'Mohammed Ali', email: 'ali@email.com', phone: '9876543213', date: '2026-07-07', time: '19:30', guestCount: 3, status: 'completed', specialRequest: '' },
  { _id: '5', customerName: 'Sneha Gupta', email: 'sneha@email.com', phone: '9876543214', date: '2026-07-10', time: '20:30', guestCount: 8, status: 'cancelled', specialRequest: 'Cancelled due to travel' },
];

export default function ReservationsPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = demoReservations.filter((r) => {
    const matchFilter = filter === 'all' || r.status === filter;
    const matchSearch = !search || r.customerName.toLowerCase().includes(search.toLowerCase()) || r.email.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Reservations</h1>
          <p className={styles.pageSubtitle}>Manage table bookings</p>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={16} />
          <input type="text" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className={styles.searchInput} />
        </div>
        <div className={styles.filters}>
          <Filter size={16} className={styles.filterIcon} />
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((s) => (
            <button key={s} className={`${styles.filterBtn} ${filter === s ? styles.filterActive : ''}`} onClick={() => setFilter(s)}>{s}</button>
          ))}
        </div>
      </div>

      <motion.div className={styles.tableCard} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Guest</th>
              <th>Contact</th>
              <th>Date & Time</th>
              <th>Guests</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((res) => (
              <tr key={res._id}>
                <td className={styles.bold}>{res.customerName}</td>
                <td className={styles.muted}>{res.phone}</td>
                <td><CalendarDays size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />{res.date} {res.time}</td>
                <td>{res.guestCount}</td>
                <td><span className={styles.badge} style={{ background: `${statusColors[res.status]}15`, color: statusColors[res.status] }}>{res.status}</span></td>
                <td className={styles.muted} style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{res.specialRequest || '—'}</td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn} title="Confirm" aria-label="Confirm reservation"><Check size={14} /></button>
                    <button className={`${styles.actionBtn} ${styles.actionDanger}`} title="Cancel" aria-label="Cancel reservation"><XIcon size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className={styles.empty}>No reservations found.</p>}
      </motion.div>
    </div>
  );
}
