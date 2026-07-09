'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/shared/Button';
import styles from '../auth.module.css';

/* ═══════════════════════════════════════════════════════
   Register Page — Premium signup experience
   ═══════════════════════════════════════════════════════ */

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await register(form);

    if (result.success) {
      router.push('/');
    } else {
      setError(result.message);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.bgGlow} />

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link href="/" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className={styles.header}>
          <span className={styles.logoIcon}>🍛</span>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Join the biryani family</p>
        </div>

        {error && (
          <motion.div
            className={styles.alert}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.field}>
            <label htmlFor="reg-name" className={styles.label}><User size={14} /> Full Name</label>
            <input id="reg-name" type="text" className={styles.input} placeholder="John Doe" value={form.fullName} onChange={(e) => handleChange('fullName', e.target.value)} required autoComplete="name" />
          </div>

          <div className={styles.field}>
            <label htmlFor="reg-email" className={styles.label}><Mail size={14} /> Email</label>
            <input id="reg-email" type="email" className={styles.input} placeholder="you@example.com" value={form.email} onChange={(e) => handleChange('email', e.target.value)} required autoComplete="email" />
          </div>

          <div className={styles.field}>
            <label htmlFor="reg-phone" className={styles.label}><Phone size={14} /> Phone</label>
            <input id="reg-phone" type="tel" className={styles.input} placeholder="9876543210" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} required autoComplete="tel" />
          </div>

          <div className={styles.field}>
            <label htmlFor="reg-password" className={styles.label}><Lock size={14} /> Password</label>
            <div className={styles.inputGroup}>
              <input id="reg-password" type={showPassword ? 'text' : 'password'} className={styles.input} placeholder="Minimum 6 characters" value={form.password} onChange={(e) => handleChange('password', e.target.value)} required minLength={6} autoComplete="new-password" />
              <button type="button" className={styles.togglePassword} onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isLoading}>
            Create Account
          </Button>
        </form>

        <p className={styles.switchText}>
          Already have an account?{' '}
          <Link href="/login" className={styles.switchLink}>Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
