'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/shared/Button';
import styles from '../auth.module.css';

/* ═══════════════════════════════════════════════════════
   Login Page — Premium auth experience
   ═══════════════════════════════════════════════════════ */

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login({ email, password });

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
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Sign in to your account</p>
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
            <label htmlFor="login-email" className={styles.label}>
              <Mail size={14} /> Email
            </label>
            <input
              id="login-email"
              type="email"
              className={styles.input}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="login-password" className={styles.label}>
              <Lock size={14} /> Password
            </label>
            <div className={styles.inputGroup}>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className={styles.input}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </form>

        <p className={styles.switchText}>
          Don&apos;t have an account?{' '}
          <Link href="/register" className={styles.switchLink}>
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
