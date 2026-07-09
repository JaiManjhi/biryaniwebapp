'use client';

import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';

/* ═══════════════════════════════════════════════════════
   Legal Pages Layout — Shared wrapper for
   Privacy Policy, Terms of Service, Refund Policy.
   
   Includes the site Navbar + Footer so users can
   navigate back seamlessly.
   ═══════════════════════════════════════════════════════ */

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
