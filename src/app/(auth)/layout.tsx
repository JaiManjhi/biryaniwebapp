import type { Metadata } from 'next';

/* ═══════════════════════════════════════════════════════
   Auth Layout — Shared layout for login/register pages
   ═══════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: 'Authentication',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
