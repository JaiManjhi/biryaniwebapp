'use client';

import { useState } from 'react';
import { Save, Bell, Shield, Palette } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import styles from '../management.module.css';

/* ═══════════════════════════════════════════════════════
   Admin Settings Page
   ═══════════════════════════════════════════════════════ */

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Settings</h1>
          <p className={styles.pageSubtitle}>Restaurant configuration</p>
        </div>
        <Button variant="primary" leftIcon={<Save size={16} />} onClick={handleSave}>
          {saved ? '✓ Saved!' : 'Save Changes'}
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
        {/* General */}
        <div className={styles.tableCard} style={{ padding: 'var(--space-xl)' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-md)', fontWeight: 'var(--fw-semibold)', color: 'var(--clr-text-primary)', marginBottom: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Palette size={18} /> General
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <label style={{ fontSize: 'var(--fs-sm)', color: 'var(--clr-text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              Restaurant Name
              <input type="text" defaultValue="Selling Tasty Biryani" className={styles.settingsInput} />
            </label>
            <label style={{ fontSize: 'var(--fs-sm)', color: 'var(--clr-text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              Tagline
              <input type="text" defaultValue="Slow-Cooked Perfection" className={styles.settingsInput} />
            </label>
            <label style={{ fontSize: 'var(--fs-sm)', color: 'var(--clr-text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              Contact Email
              <input type="email" defaultValue="hello@sellingtastybiryani.com" className={styles.settingsInput} />
            </label>
          </div>
        </div>

        {/* Notifications */}
        <div className={styles.tableCard} style={{ padding: 'var(--space-xl)' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-md)', fontWeight: 'var(--fw-semibold)', color: 'var(--clr-text-primary)', marginBottom: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={18} /> Notifications
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            {['New order alerts', 'Reservation notifications', 'Low stock warnings', 'Customer reviews'].map((item) => (
              <label key={item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'var(--fs-sm)', color: 'var(--clr-text-secondary)' }}>
                {item}
                <input type="checkbox" defaultChecked style={{ accentColor: 'var(--clr-accent-primary)' }} />
              </label>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className={styles.tableCard} style={{ padding: 'var(--space-xl)', gridColumn: '1 / -1' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-md)', fontWeight: 'var(--fw-semibold)', color: 'var(--clr-text-primary)', marginBottom: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={18} /> Security
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-md)' }}>
            <label style={{ fontSize: 'var(--fs-sm)', color: 'var(--clr-text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              Current Password
              <input type="password" placeholder="••••••••" className={styles.settingsInput} />
            </label>
            <label style={{ fontSize: 'var(--fs-sm)', color: 'var(--clr-text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              New Password
              <input type="password" placeholder="••••••••" className={styles.settingsInput} />
            </label>
            <label style={{ fontSize: 'var(--fs-sm)', color: 'var(--clr-text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              Confirm Password
              <input type="password" placeholder="••••••••" className={styles.settingsInput} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
