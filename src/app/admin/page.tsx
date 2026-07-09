'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  ShoppingBag,
  Users,
  CalendarDays,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import Image from 'next/image';
import styles from './dashboard.module.css';

/* ═══════════════════════════════════════════════════════
   Admin Dashboard — KPI cards, recent orders,
   popular items, quick stats
   ═══════════════════════════════════════════════════════ */

interface DashboardData {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalReservations: number;
  pendingOrders: number;
  todayOrders: number;
  todayRevenue: number;
  recentOrders: Array<{
    _id: string;
    orderNumber: string;
    grandTotal: number;
    orderStatus: string;
    createdAt: string;
  }>;
  popularItems: Array<{
    name: string;
    reviewCount: number;
    rating: number;
    image: string;
  }>;
}

/* Demo data for when MongoDB is not connected */
const demoData: DashboardData = {
  totalOrders: 1247,
  totalRevenue: 487500,
  totalCustomers: 832,
  totalReservations: 156,
  pendingOrders: 12,
  todayOrders: 34,
  todayRevenue: 15680,
  recentOrders: [
    { _id: '1', orderNumber: 'STB-A1B2C-XY1', grandTotal: 698, orderStatus: 'preparing', createdAt: new Date().toISOString() },
    { _id: '2', orderNumber: 'STB-D3E4F-ZW2', grandTotal: 449, orderStatus: 'pending', createdAt: new Date(Date.now() - 600000).toISOString() },
    { _id: '3', orderNumber: 'STB-G5H6I-UV3', grandTotal: 1199, orderStatus: 'delivered', createdAt: new Date(Date.now() - 1800000).toISOString() },
    { _id: '4', orderNumber: 'STB-J7K8L-ST4', grandTotal: 349, orderStatus: 'completed', createdAt: new Date(Date.now() - 3600000).toISOString() },
    { _id: '5', orderNumber: 'STB-M9N0P-QR5', grandTotal: 798, orderStatus: 'ready', createdAt: new Date(Date.now() - 7200000).toISOString() },
  ],
  popularItems: [
    { name: 'Hyderabadi Chicken Biryani', reviewCount: 256, rating: 4.9, image: '/images/food/hero-biryani.png' },
    { name: 'Lucknowi Mutton Biryani', reviewCount: 189, rating: 4.8, image: '/images/food/mutton-biryani.png' },
    { name: 'Family Feast Biryani', reviewCount: 312, rating: 4.9, image: '/images/food/family-feast.png' },
    { name: 'Paneer Tikka Biryani', reviewCount: 142, rating: 4.7, image: '/images/food/paneer-biryani.png' },
    { name: 'Chicken 65 Biryani', reviewCount: 167, rating: 4.7, image: '/images/food/hero-biryani.png' },
  ],
};

const statusColors: Record<string, string> = {
  pending: '#f39c12',
  preparing: '#3498db',
  ready: '#9b59b6',
  delivered: '#2ecc71',
  completed: '#27ae60',
  cancelled: '#e74c3c',
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 60000);
  if (diff < 1) return 'Just now';
  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return date.toLocaleDateString();
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData>(demoData);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('biryani-token');
    if (!token) return;

    fetch('/api/v1/dashboard/stats', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((result) => {
        if (result.success && result.data) {
          setData(result.data);
          setIsLive(true);
        }
      })
      .catch(() => { /* Use demo data */ });
  }, []);

  const kpis = [
    { label: 'Total Revenue', value: formatCurrency(data.totalRevenue), icon: DollarSign, change: '+12.5%', positive: true, color: '#2ecc71' },
    { label: 'Total Orders', value: data.totalOrders.toLocaleString(), icon: ShoppingBag, change: '+8.2%', positive: true, color: '#3498db' },
    { label: 'Customers', value: data.totalCustomers.toLocaleString(), icon: Users, change: '+15.3%', positive: true, color: '#9b59b6' },
    { label: 'Reservations', value: data.totalReservations.toLocaleString(), icon: CalendarDays, change: '+5.1%', positive: true, color: '#f39c12' },
  ];

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>
            Welcome back! Here&apos;s your restaurant overview.
            {!isLive && <span className={styles.demoBadge}>Demo Data</span>}
          </p>
        </div>
        <div className={styles.headerStats}>
          <div className={styles.quickStat}>
            <TrendingUp size={16} className={styles.quickStatIcon} />
            <span>Today: {formatCurrency(data.todayRevenue)}</span>
          </div>
          <div className={styles.quickStat}>
            <Clock size={16} className={styles.quickStatIcon} />
            <span>{data.pendingOrders} pending</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              className={styles.kpiCard}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <div className={styles.kpiHeader}>
                <span className={styles.kpiLabel}>{kpi.label}</span>
                <div className={styles.kpiIcon} style={{ background: `${kpi.color}15`, color: kpi.color }}>
                  <Icon size={18} />
                </div>
              </div>
              <span className={styles.kpiValue}>{kpi.value}</span>
              <div className={styles.kpiChange}>
                {kpi.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                <span style={{ color: kpi.positive ? '#2ecc71' : '#e74c3c' }}>{kpi.change}</span>
                <span className={styles.kpiPeriod}>vs last month</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Grid: Recent Orders + Popular Items */}
      <div className={styles.bottomGrid}>
        {/* Recent Orders */}
        <motion.div
          className={styles.panel}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Recent Orders</h2>
            <span className={styles.panelBadge}>{data.todayOrders} today</span>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {data.recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td className={styles.orderNumber}>{order.orderNumber}</td>
                    <td>{formatCurrency(order.grandTotal)}</td>
                    <td>
                      <span
                        className={styles.statusBadge}
                        style={{
                          background: `${statusColors[order.orderStatus] || '#95a5a6'}15`,
                          color: statusColors[order.orderStatus] || '#95a5a6',
                        }}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className={styles.timeCell}>{formatTime(order.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Popular Items */}
        <motion.div
          className={styles.panel}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Popular Items</h2>
            <span className={styles.panelBadge}>Top 5</span>
          </div>
          <div className={styles.popularList}>
            {data.popularItems.map((item, i) => (
              <div key={item.name} className={styles.popularItem}>
                <span className={styles.popularRank}>#{i + 1}</span>
                <Image src={item.image} alt={item.name} width={40} height={40} className={styles.popularImg} />
                <div className={styles.popularInfo}>
                  <span className={styles.popularName}>{item.name}</span>
                  <span className={styles.popularMeta}>
                    ⭐ {item.rating} · {item.reviewCount} reviews
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
