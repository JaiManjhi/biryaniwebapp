'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingBag, Flame, X, Weight, Users, Clock, Info } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart } from '@/contexts/CartContext';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import type { PlateSize } from '@/types/order';
import styles from './FeaturedMenu.module.css';

/* ═══════════════════════════════════════════════════════
   Featured Menu — Category tabs + menu cards + detail modal
   
   Hover: lift, image zoom, shadow, CTA reveal.
   Filters by veg/nonveg based on theme.
   Click: opens a detail modal with half/full plate selector,
          weight, pieces, and rich descriptions.
   ═══════════════════════════════════════════════════════ */

interface PlateInfo {
  price: number;
  discountPrice?: number;
  weight: string;       // e.g. "500g"
  pieces?: string;       // e.g. "3-4 pcs" (for non-veg/paneer)
  serves: string;        // e.g. "1 person"
}

interface MenuItemData {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  rating: number;
  reviews: number;
  spice: number;
  veg: boolean;
  category: string;
  prepTime: string;
  image: string;
  ingredients: string[];
  full: PlateInfo;
  half: PlateInfo;
}

const categories = ['All', 'Chicken', 'Mutton', 'Paneer', 'Veg', 'Egg', 'Family Pack'];

const menuItems: MenuItemData[] = [
  {
    id: '1',
    name: 'Hyderabadi Chicken Biryani',
    description: 'Classic dum-cooked chicken biryani with saffron rice, fried onions, and raita.',
    longDescription: 'Our signature Hyderabadi Chicken Biryani is a time-honored recipe passed down through generations. Premium chicken marinated in yogurt and 24 aromatic spices, layered with aged basmati rice infused with saffron, and slow-cooked under a sealed pot (dum). Topped with crispy fried onions and served with cooling raita and mirchi ka salan.',
    rating: 4.9, reviews: 256, spice: 3, veg: false, category: 'Chicken', prepTime: '45 min',
    image: '/images/food/hero-biryani.png',
    ingredients: ['Chicken', 'Basmati Rice', 'Saffron', 'Yogurt', 'Fried Onions', 'Mint', 'Ghee'],
    full: { price: 349, weight: '750g', pieces: '4-5 pcs', serves: '1-2 persons' },
    half: { price: 199, weight: '400g', pieces: '2-3 pcs', serves: '1 person' },
  },
  {
    id: '2',
    name: 'Lucknowi Mutton Biryani',
    description: 'Tender mutton pieces slow-cooked with aromatic spices and aged basmati.',
    longDescription: 'The Lucknowi style Mutton Biryani features fork-tender goat meat marinated overnight in a blend of kewra water, ittar, and star anise. Cooked in the traditional "pukki" method where rice and meat are cooked separately then layered, sealed with dough, and slow-cooked on dum for an hour. Rich, fragrant, and melt-in-your-mouth delicious.',
    rating: 4.8, reviews: 189, spice: 4, veg: false, category: 'Mutton', prepTime: '60 min',
    image: '/images/food/mutton-biryani.png',
    ingredients: ['Mutton', 'Basmati Rice', 'Kewra Water', 'Star Anise', 'Bay Leaf', 'Cashews', 'Ghee'],
    full: { price: 449, discountPrice: 399, weight: '800g', pieces: '5-6 pcs', serves: '1-2 persons' },
    half: { price: 249, discountPrice: 219, weight: '450g', pieces: '3 pcs', serves: '1 person' },
  },
  {
    id: '3',
    name: 'Paneer Tikka Biryani',
    description: 'Marinated paneer cubes layered with fragrant rice and fresh herbs.',
    longDescription: 'Succulent paneer tikka cubes marinated in tandoori spices and chargrilled to perfection, then layered with aromatic basmati rice, fresh mint, coriander, and fried onions. Slow-cooked under dum to let the smoky paneer flavors permeate every grain. A vegetarian biryani that rivals its non-veg counterparts.',
    rating: 4.7, reviews: 142, spice: 2, veg: true, category: 'Paneer', prepTime: '40 min',
    image: '/images/food/paneer-biryani.png',
    ingredients: ['Paneer', 'Basmati Rice', 'Bell Peppers', 'Yogurt', 'Tandoori Spices', 'Mint', 'Saffron'],
    full: { price: 299, weight: '700g', pieces: '8-10 cubes', serves: '1-2 persons' },
    half: { price: 179, weight: '380g', pieces: '4-5 cubes', serves: '1 person' },
  },
  {
    id: '4',
    name: 'Veg Dum Biryani',
    description: 'Seasonal vegetables and saffron rice sealed and slow-cooked to perfection.',
    longDescription: 'A symphony of seasonal vegetables — carrots, beans, peas, potatoes, and cauliflower — marinated in yogurt and biryani masala, layered with fragrant basmati rice, saffron milk, and fried onions. Sealed with wheat dough and slow-cooked on dum for 30 minutes. Light, aromatic, and bursting with garden-fresh flavors.',
    rating: 4.6, reviews: 98, spice: 2, veg: true, category: 'Veg', prepTime: '35 min',
    image: '/images/food/veg-biryani.png',
    ingredients: ['Mixed Vegetables', 'Basmati Rice', 'Saffron', 'Yogurt', 'Cashews', 'Raisins', 'Ghee'],
    full: { price: 249, weight: '650g', serves: '1-2 persons' },
    half: { price: 149, weight: '350g', serves: '1 person' },
  },
  {
    id: '5',
    name: 'Egg Biryani',
    description: 'Boiled eggs nestled in layers of spiced rice with caramelized onions.',
    longDescription: 'Farm-fresh eggs, hard-boiled and coated in a spiced masala, nestled between layers of fragrant basmati rice with caramelized onions, mint, and whole spices. A comforting, protein-rich biryani that\'s both simple and deeply satisfying. Served with tangy onion raita.',
    rating: 4.5, reviews: 76, spice: 3, veg: false, category: 'Egg', prepTime: '35 min',
    image: '/images/food/egg-biryani.png',
    ingredients: ['Eggs', 'Basmati Rice', 'Onions', 'Mint', 'Green Chilies', 'Biryani Masala', 'Ghee'],
    full: { price: 279, weight: '650g', pieces: '4 eggs', serves: '1-2 persons' },
    half: { price: 159, weight: '350g', pieces: '2 eggs', serves: '1 person' },
  },
  {
    id: '6',
    name: 'Family Feast Biryani',
    description: 'Serves 4-5. Choice of chicken or mutton with sides, raita, and dessert.',
    longDescription: 'The ultimate biryani feast for the family! A generous pot of our signature dum biryani packed with premium chicken or mutton, served with mirchi ka salan, cooling raita, a fresh garden salad, and our special gulab jamun dessert. Perfect for celebrations, gatherings, and weekend family dinners.',
    rating: 4.9, reviews: 312, spice: 3, veg: false, category: 'Family Pack', prepTime: '60 min',
    image: '/images/food/family-feast.png',
    ingredients: ['Chicken/Mutton', 'Basmati Rice', 'Saffron', 'All Spices', 'Raita', 'Salan', 'Gulab Jamun'],
    full: { price: 1199, discountPrice: 999, weight: '2.5kg', pieces: '15-18 pcs', serves: '4-5 persons' },
    half: { price: 699, discountPrice: 599, weight: '1.3kg', pieces: '8-10 pcs', serves: '2-3 persons' },
  },
  {
    id: '7',
    name: 'Chicken 65 Biryani',
    description: 'Spicy chicken 65 pieces layered with mint-flavored basmati rice.',
    longDescription: 'A fiery fusion of two South Indian favorites! Crispy, deep-fried Chicken 65 tossed in curry leaves and red chilies, layered with mint-flavored basmati rice, and sealed under dum. The result: a biryani with an incredible crunch-meets-tenderness texture and an addictive spice kick.',
    rating: 4.7, reviews: 167, spice: 5, veg: false, category: 'Chicken', prepTime: '50 min',
    image: '/images/food/hero-biryani.png',
    ingredients: ['Chicken', 'Basmati Rice', 'Curry Leaves', 'Red Chilies', 'Yogurt', 'Ginger-Garlic', 'Corn Flour'],
    full: { price: 379, weight: '750g', pieces: '6-8 pcs', serves: '1-2 persons' },
    half: { price: 219, weight: '400g', pieces: '3-4 pcs', serves: '1 person' },
  },
  {
    id: '8',
    name: 'Mushroom Biryani',
    description: 'Fresh button mushrooms and baby corn with aromatic basmati rice.',
    longDescription: 'A vegetarian delight featuring fresh button mushrooms and baby corn sautéed in a blend of biryani spices, layered with fluffy basmati rice, fried onions, and fresh herbs. The earthy umami of mushrooms makes this biryani deeply savory and satisfying. Served with mint chutney.',
    rating: 4.5, reviews: 64, spice: 2, veg: true, category: 'Veg', prepTime: '35 min',
    image: '/images/food/veg-biryani.png',
    ingredients: ['Mushrooms', 'Baby Corn', 'Basmati Rice', 'Fried Onions', 'Mint', 'Coriander', 'Ghee'],
    full: { price: 269, weight: '650g', serves: '1-2 persons' },
    half: { price: 159, weight: '350g', serves: '1 person' },
  },
];

function SpiceLevel({ level }: { level: number }) {
  return (
    <div className={styles.spice} aria-label={`Spice level ${level} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Flame key={i} size={12} className={i < level ? styles.spiceActive : styles.spiceInactive} />
      ))}
    </div>
  );
}

/* ── Detail Modal ── */
function DetailModal({ item, onClose }: { item: MenuItemData; onClose: () => void }) {
  const [selectedPlate, setSelectedPlate] = useState<PlateSize>('full');
  const { addItem } = useCart();

  const plate = selectedPlate === 'full' ? item.full : item.half;
  const effectivePrice = plate.discountPrice || plate.price;

  const handleAdd = () => {
    addItem({
      menuItemId: item.id,
      name: item.name,
      image: item.image,
      price: effectivePrice,
      veg: item.veg,
      plateSize: selectedPlate,
    });
    onClose();
  };

  return (
    <>
      <motion.div
        className={styles.modalBackdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {/* Close Button */}
        <button className={styles.modalClose} onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {/* Image */}
        <div className={styles.modalImage}>
          <Image src={item.image} alt={item.name} width={600} height={400} className={styles.modalImg} />
          {item.veg && <span className={styles.vegBadge}>VEG</span>}
          {plate.discountPrice && (
            <span className={styles.discountBadge}>
              {Math.round(((plate.price - plate.discountPrice) / plate.price) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Content */}
        <div className={styles.modalContent}>
          {/* Header */}
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>{item.name}</h3>
            <div className={styles.modalMeta}>
              <div className={styles.rating}>
                <Star size={14} className={styles.ratingIcon} />
                <span>{item.rating}</span>
                <span className={styles.reviewCount}>({item.reviews} reviews)</span>
              </div>
              <SpiceLevel level={item.spice} />
              <span className={styles.modalPrepTime}>
                <Clock size={13} />
                {item.prepTime}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className={styles.modalDesc}>{item.longDescription}</p>

          {/* Ingredients */}
          <div className={styles.ingredientsList}>
            {item.ingredients.map((ing) => (
              <span key={ing} className={styles.ingredientTag}>{ing}</span>
            ))}
          </div>

          {/* ── Plate Size Selector ── */}
          <div className={styles.plateSelectorSection}>
            <h4 className={styles.plateSelectorTitle}>Choose Your Portion</h4>
            <div className={styles.plateOptions}>
              {/* Half Plate */}
              <button
                className={`${styles.plateOption} ${selectedPlate === 'half' ? styles.plateOptionActive : ''}`}
                onClick={() => setSelectedPlate('half')}
              >
                <div className={styles.plateLabel}>
                  <span className={styles.plateName}>½ Half Plate</span>
                  <span className={styles.platePrice}>
                    ₹{item.half.discountPrice || item.half.price}
                    {item.half.discountPrice && (
                      <span className={styles.plateOriginal}>₹{item.half.price}</span>
                    )}
                  </span>
                </div>
                <div className={styles.plateDetails}>
                  <span><Weight size={13} /> {item.half.weight}</span>
                  {item.half.pieces && <span>🍗 {item.half.pieces}</span>}
                  <span><Users size={13} /> {item.half.serves}</span>
                </div>
              </button>

              {/* Full Plate */}
              <button
                className={`${styles.plateOption} ${selectedPlate === 'full' ? styles.plateOptionActive : ''}`}
                onClick={() => setSelectedPlate('full')}
              >
                <div className={styles.plateBestValue}>BEST VALUE</div>
                <div className={styles.plateLabel}>
                  <span className={styles.plateName}>Full Plate</span>
                  <span className={styles.platePrice}>
                    ₹{item.full.discountPrice || item.full.price}
                    {item.full.discountPrice && (
                      <span className={styles.plateOriginal}>₹{item.full.price}</span>
                    )}
                  </span>
                </div>
                <div className={styles.plateDetails}>
                  <span><Weight size={13} /> {item.full.weight}</span>
                  {item.full.pieces && <span>🍗 {item.full.pieces}</span>}
                  <span><Users size={13} /> {item.full.serves}</span>
                </div>
              </button>
            </div>
          </div>

          {/* Free delivery offer */}
          <div className={styles.offerBanner}>
            🚚 <strong>FREE delivery</strong> on orders above ₹599!
          </div>

          {/* Add to Cart */}
          <button className={styles.modalAddBtn} onClick={handleAdd}>
            <ShoppingBag size={18} />
            Add {selectedPlate === 'half' ? 'Half' : 'Full'} Plate — ₹{effectivePrice}
          </button>
        </div>
      </motion.div>
    </>
  );
}

/* ── Main Component ── */
export default function FeaturedMenu() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<MenuItemData | null>(null);
  const { isVeg } = useTheme();
  const { addItem } = useCart();

  const handleQuickAdd = (item: MenuItemData) => {
    addItem({
      menuItemId: item.id,
      name: item.name,
      image: item.image,
      price: item.full.discountPrice || item.full.price,
      veg: item.veg,
      plateSize: 'full',
    });
  };

  const filtered = menuItems.filter((item) => {
    const categoryMatch = activeCategory === 'All' || item.category === activeCategory;
    const vegMatch = isVeg ? item.veg : true;
    return categoryMatch && vegMatch;
  });

  return (
    <section id="menu" className={`section ${styles.section}`} aria-labelledby="menu-heading">
      <div className="container">
        <ScrollReveal preset="fadeUp" className={styles.header}>
          <span className="label-uppercase">Our Menu</span>
          <h2 id="menu-heading" className="heading-2">
            Featured <span className="text-gradient">Biryanis</span>
          </h2>
          <p className={styles.subtitle}>
            Each biryani is a masterpiece, crafted with passion and served with pride.
          </p>
          <div className="section-divider" />
        </ScrollReveal>

        {/* Offer Banner */}
        <ScrollReveal preset="fadeUp" delay={0.05}>
          <div className={styles.offerStrip}>
            <span>🚚</span>
            <span><strong>FREE Delivery</strong> on all orders above ₹599</span>
            <span className={styles.offerDot}>•</span>
            <span>🎉 <strong>Half plates</strong> now available!</span>
          </div>
        </ScrollReveal>

        {/* Category Tabs */}
        <ScrollReveal preset="fadeUp" delay={0.1}>
          <div className={styles.tabs} role="tablist" aria-label="Menu categories">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                className={`${styles.tab} ${activeCategory === cat ? styles.tabActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Menu Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + (isVeg ? '-veg' : '')}
            className={styles.grid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.length > 0 ? (
              filtered.map((item, i) => (
                <motion.article
                  key={item.id}
                  className={styles.card}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  whileHover={{ y: -6 }}
                >
                  {/* Image */}
                  <div className={styles.cardImage}>
                    <Image src={item.image} alt={item.name} width={400} height={300} className={styles.cardImg} />
                    {item.veg && <span className={styles.vegBadge}>VEG</span>}
                    {item.full.discountPrice && (
                      <span className={styles.discountBadge}>
                        {Math.round(((item.full.price - item.full.discountPrice) / item.full.price) * 100)}% OFF
                      </span>
                    )}
                    <div className={styles.cardOverlay}>
                      <button
                        className={styles.addBtn}
                        aria-label={`Quick add ${item.name} to cart`}
                        onClick={() => handleQuickAdd(item)}
                      >
                        <ShoppingBag size={16} />
                        Quick Add
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={styles.cardContent}>
                    <div className={styles.cardMeta}>
                      <div className={styles.rating}>
                        <Star size={14} className={styles.ratingIcon} />
                        <span>{item.rating}</span>
                        <span className={styles.reviewCount}>({item.reviews})</span>
                      </div>
                      <SpiceLevel level={item.spice} />
                    </div>
                    <h3 className={styles.cardName}>{item.name}</h3>
                    <p className={styles.cardDesc}>{item.description}</p>

                    {/* Price Row: Half + Full */}
                    <div className={styles.cardPriceRow}>
                      <div className={styles.cardPriceHalf}>
                        <span className={styles.cardPriceLabel}>Half</span>
                        <span className={styles.cardPriceValue}>₹{item.half.discountPrice || item.half.price}</span>
                      </div>
                      <div className={styles.cardPriceDivider} />
                      <div className={styles.cardPriceFull}>
                        <span className={styles.cardPriceLabel}>Full</span>
                        <span className={styles.cardPriceValue}>
                          ₹{item.full.discountPrice || item.full.price}
                          {item.full.discountPrice && (
                            <span className={styles.priceOriginal}> ₹{item.full.price}</span>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Details / Customize button */}
                    <button
                      className={styles.detailsBtn}
                      onClick={() => setSelectedItem(item)}
                    >
                      <Info size={14} />
                      View Details & Customize
                    </button>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className={styles.empty}>
                <span className={styles.emptyIcon}>🍽️</span>
                <p>No items in this category for your current preference.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <DetailModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
