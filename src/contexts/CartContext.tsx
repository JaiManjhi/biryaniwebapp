'use client';

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react';
import type { CartItem } from '@/types/order';

/* ═══════════════════════════════════════════════════════
   Cart Context — Global cart state & drawer toggle
   
   Cart key = menuItemId + plateSize (so user can add
   both half & full plate of the same biryani)
   ═══════════════════════════════════════════════════════ */

function cartKey(item: { menuItemId: string; plateSize: string }) {
  return `${item.menuItemId}__${item.plateSize}`;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (menuItemId: string, plateSize: string) => void;
  updateQuantity: (menuItemId: string, plateSize: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const addItem = useCallback((newItem: Omit<CartItem, 'quantity'>) => {
    const key = cartKey(newItem);
    setItems((prev) => {
      const existing = prev.find((i) => cartKey(i) === key);
      if (existing) {
        return prev.map((i) =>
          cartKey(i) === key
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((menuItemId: string, plateSize: string) => {
    const key = `${menuItemId}__${plateSize}`;
    setItems((prev) => prev.filter((i) => cartKey(i) !== key));
  }, []);

  const updateQuantity = useCallback((menuItemId: string, plateSize: string, quantity: number) => {
    const key = `${menuItemId}__${plateSize}`;
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => cartKey(i) !== key));
    } else {
      setItems((prev) =>
        prev.map((i) =>
          cartKey(i) === key ? { ...i, quantity } : i
        )
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const { itemCount, subtotal } = useMemo(() => {
    const count = items.reduce((sum, i) => sum + i.quantity, 0);
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    return { itemCount: count, subtotal: total };
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [items, itemCount, subtotal, isOpen, openCart, closeCart, toggleCart, addItem, removeItem, updateQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
