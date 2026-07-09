'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, RefreshCw } from 'lucide-react';
import styles from '../management.module.css';

/* ═══════════════════════════════════════════════════════
   Admin Orders Page — Order management table
   ═══════════════════════════════════════════════════════ */

const statusColors: Record<string, string> = {
  pending: '#f39c12', preparing: '#3498db', ready: '#9b59b6',
  delivered: '#2ecc71', completed: '#27ae60', cancelled: '#e74c3c',
};

const demoOrders = [
  { _id: '1', orderNumber: 'STB-A1B2C-XY1', customerName: 'Priya Sharma', grandTotal: 698, orderStatus: 'preparing', paymentStatus: 'paid', deliveryType: 'dine-in', createdAt: new Date().toISOString() },
  { _id: '2', orderNumber: 'STB-D3E4F-ZW2', customerName: 'Rahul Patel', grandTotal: 449, orderStatus: 'pending', paymentStatus: 'pending', deliveryType: 'delivery', createdAt: new Date(Date.now() - 600000).toISOString() },
  { _id: '3', orderNumber: 'STB-G5H6I-UV3', customerName: 'Ananya Reddy', grandTotal: 1199, orderStatus: 'delivered', paymentStatus: 'paid', deliveryType: 'takeaway', createdAt: new Date(Date.now() - 1800000).toISOString() },
  { _id: '4', orderNumber: 'STB-J7K8L-ST4', customerName: 'Mohammed Ali', grandTotal: 349, orderStatus: 'completed', paymentStatus: 'paid', deliveryType: 'dine-in', createdAt: new Date(Date.now() - 3600000).toISOString() },
  { _id: '5', orderNumber: 'STB-M9N0P-QR5', customerName: 'Sneha Gupta', grandTotal: 798, orderStatus: 'ready', paymentStatus: 'paid', deliveryType: 'delivery', createdAt: new Date(Date.now() - 7200000).toISOString() },
  { _id: '6', orderNumber: 'STB-Q1R2S-TU6', customerName: 'Vikram Singh', grandTotal: 549, orderStatus: 'cancelled', paymentStatus: 'refunded', deliveryType: 'takeaway', createdAt: new Date(Date.now() - 14400000).toISOString() },
];

export default function OrdersPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = demoOrders.filter((o) => {
    const matchFilter = filter === 'all' || o.orderStatus === filter;
    const matchSearch = !search || o.orderNumber.toLowerCase().includes(search.toLowerCase()) || o.customerName.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Orders</h1>
          <p className={styles.pageSubtitle}>Manage and track all orders</p>
        </div>
        <button className={styles.refreshBtn}><RefreshCw size={16} /> Refresh</button>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={16} />
          <input type="text" placeholder="Search orders..." value={search} onChange={(e) => setSearch(e.target.value)} className={styles.searchInput} />
        </div>
        <div className={styles.filters}>
          <Filter size={16} className={styles.filterIcon} />
          {['all', 'pending', 'preparing', 'ready', 'delivered', 'completed', 'cancelled'].map((s) => (
            <button key={s} className={`${styles.filterBtn} ${filter === s ? styles.filterActive : ''}`} onClick={() => setFilter(s)}>{s}</button>
          ))}
        </div>
      </div>

      <motion.div className={styles.tableCard} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Type</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order._id}>
                <td className={styles.mono}>{order.orderNumber}</td>
                <td>{order.customerName}</td>
                <td className={styles.bold}>₹{order.grandTotal}</td>
                <td><span className={styles.badge} style={{ background: `${statusColors[order.orderStatus]}15`, color: statusColors[order.orderStatus] }}>{order.orderStatus}</span></td>
                <td><span className={`${styles.badge} ${order.paymentStatus === 'paid' ? styles.badgeSuccess : styles.badgeWarning}`}>{order.paymentStatus}</span></td>
                <td className={styles.muted}>{order.deliveryType}</td>
                <td className={styles.muted}>{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className={styles.empty}>No orders found.</p>}
      </motion.div>
    </div>
  );
}
