'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Plus, Star, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import styles from '../management.module.css';

/* ═══════════════════════════════════════════════════════
   Admin Menu Management Page
   ═══════════════════════════════════════════════════════ */

const demoItems = [
  { _id: '1', name: 'Hyderabadi Chicken Biryani', category: 'Chicken', price: 349, rating: 4.9, reviewCount: 256, veg: false, available: true, featured: true, image: '/images/food/hero-biryani.png' },
  { _id: '2', name: 'Lucknowi Mutton Biryani', category: 'Mutton', price: 449, discountPrice: 399, rating: 4.8, reviewCount: 189, veg: false, available: true, featured: true, image: '/images/food/mutton-biryani.png' },
  { _id: '3', name: 'Paneer Tikka Biryani', category: 'Paneer', price: 299, rating: 4.7, reviewCount: 142, veg: true, available: true, featured: false, image: '/images/food/paneer-biryani.png' },
  { _id: '4', name: 'Veg Dum Biryani', category: 'Veg', price: 249, rating: 4.6, reviewCount: 98, veg: true, available: true, featured: false, image: '/images/food/veg-biryani.png' },
  { _id: '5', name: 'Egg Biryani', category: 'Egg', price: 279, rating: 4.5, reviewCount: 76, veg: false, available: false, featured: false, image: '/images/food/egg-biryani.png' },
  { _id: '6', name: 'Family Feast Biryani', category: 'Family Pack', price: 1199, discountPrice: 999, rating: 4.9, reviewCount: 312, veg: false, available: true, featured: true, image: '/images/food/family-feast.png' },
];

export default function MenuManagementPage() {
  const [search, setSearch] = useState('');
  const filtered = demoItems.filter((item) => !search || item.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Menu Items</h1>
          <p className={styles.pageSubtitle}>{demoItems.length} items in menu</p>
        </div>
        <Button variant="primary" leftIcon={<Plus size={16} />}>Add Item</Button>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={16} />
          <input type="text" placeholder="Search menu items..." value={search} onChange={(e) => setSearch(e.target.value)} className={styles.searchInput} />
        </div>
      </div>

      <motion.div className={styles.tableCard} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item._id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Image src={item.image} alt={item.name} width={36} height={36} style={{ borderRadius: '8px', objectFit: 'cover' }} />
                    <div>
                      <span className={styles.bold}>{item.name}</span>
                      {item.featured && <span className={styles.badge} style={{ marginLeft: 6, background: 'rgba(212,168,85,0.15)', color: '#d4a855', fontSize: '10px' }}>Featured</span>}
                    </div>
                  </div>
                </td>
                <td className={styles.muted}>{item.category}</td>
                <td>
                  <span className={styles.bold}>₹{item.discountPrice || item.price}</span>
                  {item.discountPrice && <span style={{ textDecoration: 'line-through', color: 'var(--clr-text-muted)', marginLeft: 4, fontSize: '12px' }}>₹{item.price}</span>}
                </td>
                <td><Star size={12} style={{ fill: '#f1c40f', color: '#f1c40f', verticalAlign: 'middle', marginRight: 2 }} />{item.rating} <span className={styles.muted}>({item.reviewCount})</span></td>
                <td><span className={styles.badge} style={{ background: item.veg ? 'rgba(46,204,113,0.15)' : 'rgba(192,57,43,0.15)', color: item.veg ? '#2ecc71' : '#c0392b' }}>{item.veg ? 'Veg' : 'Non-Veg'}</span></td>
                <td><span className={`${styles.badge} ${item.available ? styles.badgeSuccess : styles.badgeWarning}`}>{item.available ? 'Available' : 'Unavailable'}</span></td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn} title="Edit" aria-label={`Edit ${item.name}`}><Edit size={14} /></button>
                    <button className={`${styles.actionBtn} ${styles.actionDanger}`} title="Delete" aria-label={`Delete ${item.name}`}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
