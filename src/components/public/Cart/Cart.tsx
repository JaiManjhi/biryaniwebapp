'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight, Minus, Plus, Truck } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import styles from './Cart.module.css';

/* ═══════════════════════════════════════════════════════
   Cart Drawer — Premium slide-in shopping cart panel
   
   Features:
   - Glassmorphic backdrop
   - Plate size labels (Full / Half)
   - Quantity +/- controls
   - Item removal with animation
   - Subtotal, tax, total breakdown
   - Free delivery on orders ≥ ₹599
   - Checkout CTA
   ═══════════════════════════════════════════════════════ */

const TAX_RATE = 0.05; // 5% GST
const DELIVERY_FEE = 49;
const FREE_DELIVERY_MIN = 599;

export default function Cart() {
  const { items, itemCount, subtotal, isOpen, closeCart, updateQuantity, removeItem, clearCart } = useCart();

  const tax = Math.round(subtotal * TAX_RATE);
  const delivery = subtotal >= FREE_DELIVERY_MIN ? 0 : DELIVERY_FEE;
  const total = subtotal + tax + delivery;
  const amountToFreeDelivery = FREE_DELIVERY_MIN - subtotal;

  const handleBrowseMenu = () => {
    closeCart();
    const el = document.querySelector('#menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            className={styles.drawer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            role="dialog"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerLeft}>
                <h2 className={styles.title}>Your Cart</h2>
                {itemCount > 0 && (
                  <span className={styles.badge}>{itemCount}</span>
                )}
              </div>
              <button
                className={styles.closeBtn}
                onClick={closeCart}
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            {items.length === 0 ? (
              /* Empty State */
              <div className={styles.empty}>
                <div className={styles.emptyIcon}>
                  <ShoppingBag size={32} />
                </div>
                <h3 className={styles.emptyTitle}>Your cart is empty</h3>
                <p className={styles.emptyDesc}>
                  Explore our menu and add some delicious biryanis to get started.
                </p>
                <button className={styles.browseBtn} onClick={handleBrowseMenu}>
                  Browse Menu
                  <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <>
                {/* Free delivery progress */}
                {delivery > 0 && (
                  <div className={styles.deliveryBanner}>
                    <Truck size={14} />
                    <span>Add ₹{amountToFreeDelivery} more for <strong>FREE delivery!</strong></span>
                    <div className={styles.deliveryProgress}>
                      <div
                        className={styles.deliveryProgressBar}
                        style={{ width: `${Math.min((subtotal / FREE_DELIVERY_MIN) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
                {delivery === 0 && (
                  <div className={styles.deliveryBannerFree}>
                    <Truck size={14} />
                    <span>🎉 You have <strong>FREE delivery!</strong></span>
                  </div>
                )}

                {/* Items List */}
                <div className={styles.itemsList}>
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={`${item.menuItemId}__${item.plateSize}`}
                        className={styles.item}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0, padding: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        {/* Image */}
                        <div className={styles.itemImage}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={72}
                            height={72}
                            className={styles.itemImg}
                          />
                          <span
                            className={`${styles.vegDot} ${item.veg ? styles.vegDotVeg : styles.vegDotNonVeg}`}
                          />
                        </div>

                        {/* Details */}
                        <div className={styles.itemDetails}>
                          <span className={styles.itemName}>{item.name}</span>
                          <span className={styles.plateSizeLabel}>
                            {item.plateSize === 'half' ? '½ Half Plate' : 'Full Plate'}
                          </span>
                          <span className={styles.itemPrice}>
                            ₹{item.price * item.quantity}
                            {item.quantity > 1 && (
                              <span style={{ color: 'var(--clr-text-tertiary)', fontWeight: 400, fontSize: 'var(--fs-xs)' }}>
                                {' '}(₹{item.price} × {item.quantity})
                              </span>
                            )}
                          </span>

                          {/* Quantity Controls */}
                          <div className={styles.itemActions}>
                            <div className={styles.quantityControl}>
                              <button
                                className={styles.qtyBtn}
                                onClick={() => updateQuantity(item.menuItemId, item.plateSize, item.quantity - 1)}
                                aria-label={`Decrease ${item.name} quantity`}
                              >
                                <Minus size={14} />
                              </button>
                              <span className={styles.qtyValue}>{item.quantity}</span>
                              <button
                                className={styles.qtyBtn}
                                onClick={() => updateQuantity(item.menuItemId, item.plateSize, item.quantity + 1)}
                                aria-label={`Increase ${item.name} quantity`}
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <button
                              className={styles.removeBtn}
                              onClick={() => removeItem(item.menuItemId, item.plateSize)}
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Footer / Summary */}
                <div className={styles.footer}>
                  <div className={styles.summary}>
                    <div className={styles.summaryRow}>
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span>GST (5%)</span>
                      <span>₹{tax}</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span>Delivery</span>
                      <span style={delivery === 0 ? { color: 'var(--clr-success)', fontWeight: 600 } : undefined}>
                        {delivery === 0 ? 'FREE' : `₹${delivery}`}
                      </span>
                    </div>
                    {delivery > 0 && (
                      <div className={styles.summaryRow} style={{ fontSize: 'var(--fs-xs)', color: 'var(--clr-text-muted)' }}>
                        <span>Free delivery on orders above ₹{FREE_DELIVERY_MIN}</span>
                      </div>
                    )}
                    <div className={styles.summaryRowTotal}>
                      <span className={styles.totalLabel}>Total</span>
                      <span className={styles.totalAmount}>₹{total}</span>
                    </div>
                  </div>

                  <div className={styles.footerActions}>
                    <button className={styles.clearBtn} onClick={clearCart}>
                      Clear All
                    </button>
                    <button className={styles.checkoutBtn}>
                      Checkout
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
