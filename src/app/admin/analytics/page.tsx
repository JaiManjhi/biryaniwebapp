'use client';

import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, ShoppingBag, Users, Calendar } from 'lucide-react';
import styles from './analytics.module.css';

/* ═══════════════════════════════════════════════════════
   Admin Analytics Page — Charts built with CSS
   (no external charting library needed)
   ═══════════════════════════════════════════════════════ */

const revenueData = [
  { month: 'Jan', value: 32000, orders: 89 },
  { month: 'Feb', value: 38000, orders: 104 },
  { month: 'Mar', value: 45000, orders: 127 },
  { month: 'Apr', value: 41000, orders: 115 },
  { month: 'May', value: 52000, orders: 142 },
  { month: 'Jun', value: 48000, orders: 131 },
  { month: 'Jul', value: 61000, orders: 168 },
];

const categoryBreakdown = [
  { name: 'Chicken', percentage: 38, color: '#e74c3c', orders: 475 },
  { name: 'Mutton', percentage: 22, color: '#8e44ad', orders: 275 },
  { name: 'Paneer', percentage: 18, color: '#2ecc71', orders: 225 },
  { name: 'Veg', percentage: 12, color: '#27ae60', orders: 150 },
  { name: 'Egg', percentage: 6, color: '#f39c12', orders: 75 },
  { name: 'Family', percentage: 4, color: '#3498db', orders: 50 },
];

const peakHours = [
  { hour: '11AM', percentage: 15 }, { hour: '12PM', percentage: 45 },
  { hour: '1PM', percentage: 75 }, { hour: '2PM', percentage: 55 },
  { hour: '3PM', percentage: 20 }, { hour: '4PM', percentage: 10 },
  { hour: '5PM', percentage: 15 }, { hour: '6PM', percentage: 35 },
  { hour: '7PM', percentage: 85 }, { hour: '8PM', percentage: 95 },
  { hour: '9PM', percentage: 70 }, { hour: '10PM', percentage: 40 },
];

const maxRevenue = Math.max(...revenueData.map((d) => d.value));

function formatCurrency(n: number) {
  return `₹${(n / 1000).toFixed(0)}K`;
}

export default function AnalyticsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Analytics</h1>
          <p className={styles.pageSubtitle}>Revenue trends, category performance, and insights</p>
        </div>
        <div className={styles.periodSelector}>
          <button className={styles.periodActive}>7 Days</button>
          <button className={styles.periodBtn}>30 Days</button>
          <button className={styles.periodBtn}>6 Months</button>
          <button className={styles.periodBtn}>1 Year</button>
        </div>
      </div>

      {/* Summary cards */}
      <div className={styles.summaryGrid}>
        {[
          { label: 'Avg Order Value', value: '₹385', icon: DollarSign, change: '+4.2%' },
          { label: 'Order Frequency', value: '23/day', icon: ShoppingBag, change: '+8.1%' },
          { label: 'Repeat Rate', value: '67%', icon: Users, change: '+2.3%' },
          { label: 'Busiest Day', value: 'Saturday', icon: Calendar, change: '' },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} className={styles.summaryCard} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Icon size={18} className={styles.summaryIcon} />
              <span className={styles.summaryValue}>{s.value}</span>
              <span className={styles.summaryLabel}>{s.label}</span>
              {s.change && <span className={styles.summaryChange}><TrendingUp size={12} /> {s.change}</span>}
            </motion.div>
          );
        })}
      </div>

      <div className={styles.chartsGrid}>
        {/* Revenue Bar Chart */}
        <motion.div className={styles.chartCard} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className={styles.chartTitle}>Revenue Trend</h2>
          <div className={styles.barChart}>
            {revenueData.map((d, i) => (
              <div key={d.month} className={styles.barCol}>
                <span className={styles.barValue}>{formatCurrency(d.value)}</span>
                <motion.div
                  className={styles.bar}
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.value / maxRevenue) * 100}%` }}
                  transition={{ delay: 0.4 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
                <span className={styles.barLabel}>{d.month}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div className={styles.chartCard} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className={styles.chartTitle}>Category Breakdown</h2>
          <div className={styles.categoryList}>
            {categoryBreakdown.map((cat, i) => (
              <motion.div key={cat.name} className={styles.categoryItem} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.05 }}>
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryDot} style={{ background: cat.color }} />
                  <span className={styles.categoryName}>{cat.name}</span>
                  <span className={styles.categoryOrders}>{cat.orders} orders</span>
                  <span className={styles.categoryPercent}>{cat.percentage}%</span>
                </div>
                <div className={styles.categoryBarTrack}>
                  <motion.div
                    className={styles.categoryBarFill}
                    style={{ background: cat.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percentage}%` }}
                    transition={{ delay: 0.6 + i * 0.05, duration: 0.6 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Peak Hours */}
      <motion.div className={styles.chartCard} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <h2 className={styles.chartTitle}>Peak Hours</h2>
        <div className={styles.heatmap}>
          {peakHours.map((h, i) => (
            <motion.div key={h.hour} className={styles.heatmapCol} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.03 }}>
              <div className={styles.heatmapBar} style={{ height: `${h.percentage}%`, opacity: 0.3 + (h.percentage / 100) * 0.7, background: `hsl(${30 + (h.percentage / 100) * 20}, 80%, 50%)` }} />
              <span className={styles.heatmapLabel}>{h.hour}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
