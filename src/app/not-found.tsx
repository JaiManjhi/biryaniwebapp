'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { Home } from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   404 Page — Not Found
   ═══════════════════════════════════════════════════════ */

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--clr-bg-primary)',
        padding: 'var(--space-xl)',
        textAlign: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-lg)',
        }}
      >
        <span style={{ fontSize: '5rem' }}>🍛</span>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--fs-4xl)',
            fontWeight: 'var(--fw-bold)',
            color: 'var(--clr-text-primary)',
          }}
        >
          404
        </h1>
        <p
          style={{
            fontSize: 'var(--fs-lg)',
            color: 'var(--clr-text-secondary)',
            maxWidth: '400px',
          }}
        >
          Oops! This biryani hasn&apos;t been cooked yet. The page you&apos;re
          looking for doesn&apos;t exist.
        </p>
        <Link href="/">
          <Button variant="primary" size="lg" leftIcon={<Home size={18} />}>
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
