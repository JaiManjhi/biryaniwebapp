import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';

/* ═══════════════════════════════════════════════════════
   Root Layout — DUM.
   
   Sets up Google Fonts, SEO metadata, viewport config,
   ThemeProvider for Veg/Non-Veg switching, and
   AuthProvider for authentication state.
   ═══════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: {
    default: 'DUM. — The Art of Slow-Cooked Biryani',
    template: '%s | DUM.',
  },
  description:
    'Experience the art of authentic slow-cooked dum biryani. Every grain tells a story. Order online or reserve your table today.',
  keywords: [
    'biryani',
    'dum biryani',
    'restaurant',
    'indian food',
    'hyderabadi biryani',
    'chicken biryani',
    'mutton biryani',
    'veg biryani',
    'order online',
    'reserve table',
  ],
  authors: [{ name: 'DUM.' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'DUM.',
    title: 'DUM. — The Art of Slow-Cooked Biryani',
    description:
      'Experience the art of authentic slow-cooked dum biryani. Every grain tells a story.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DUM.',
    description:
      'Experience the art of authentic slow-cooked dum biryani. Every grain tells a story.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-cuisine="nonveg" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


