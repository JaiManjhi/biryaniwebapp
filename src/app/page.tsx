'use client';

import { useState, useCallback } from 'react';
import { LoadingScreen } from '@/components/public/LoadingScreen';
import { Navbar } from '@/components/public/Navbar';
import { Hero } from '@/components/public/Hero';
import { BrandStory } from '@/components/public/BrandStory';
import { ArtOfDum } from '@/components/public/ArtOfDum';
import { Ingredients } from '@/components/public/Ingredients';
import { VegNonVeg } from '@/components/public/VegNonVeg';
import { FeaturedMenu } from '@/components/public/FeaturedMenu';
import { ChefSpecial } from '@/components/public/ChefSpecial';
import { Testimonials } from '@/components/public/Testimonials';
import { Reservation } from '@/components/public/Reservation';
import { Contact } from '@/components/public/Contact';
import { Footer } from '@/components/public/Footer';
import Cart from '@/components/public/Cart';

/* ═══════════════════════════════════════════════════════
   Home Page — One continuous cinematic journey
   
   Loading Screen → Hero → Brand Story → Art of Dum →
   Ingredients → Veg/NonVeg → Menu → Chef Special →
   Testimonials → Reservation → Contact → Footer
   ═══════════════════════════════════════════════════════ */

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        <Navbar />
        <Cart />
        <main id="main-content">
          <Hero />
          <BrandStory />
          <ArtOfDum />
          <Ingredients />
          <VegNonVeg />
          <FeaturedMenu />
          <ChefSpecial />
          <Testimonials />
          <Reservation />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
