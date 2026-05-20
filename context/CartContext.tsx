"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  variant?: string;
}

interface CartCtx {
  items: CartItem[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  addItem: (p: Product, variant?: string) => void;
  removeItem: (id: string, variant?: string) => void;
  updateQty: (id: string, qty: number, variant?: string) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx | null>(null);

function key(id: string, variant?: string) { return variant ? `${id}::${variant}` : id; }

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open,  setOpen]  = useState(false);

  useEffect(() => {
    try { const s = localStorage.getItem("ramon_cart"); if (s) setItems(JSON.parse(s)); } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem("ramon_cart", JSON.stringify(items));
  }, [items]);

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  const addItem = useCallback((p: Product, variant?: string) => {
    setItems(prev => {
      const k = key(p.id, variant);
      const idx = prev.findIndex(i => key(i.product.id, i.variant) === k);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [...prev, { product: p, quantity: 1, variant }];
    });
    setOpen(true);
  }, []);

  const removeItem = useCallback((id: string, variant?: string) => {
    setItems(prev => prev.filter(i => key(i.product.id, i.variant) !== key(id, variant)));
  }, []);

  const updateQty = useCallback((id: string, qty: number, variant?: string) => {
    if (qty <= 0) { removeItem(id, variant); return; }
    setItems(prev => prev.map(i => key(i.product.id, i.variant) === key(id, variant) ? { ...i, quantity: qty } : i));
  }, [removeItem]);

  const clear = useCallback(() => setItems([]), []);

  return (
    <Ctx.Provider value={{ items, count, total, open, setOpen, addItem, removeItem, updateQty, clear }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart fora do CartProvider");
  return ctx;
}
