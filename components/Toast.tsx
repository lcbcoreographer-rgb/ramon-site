"use client";
import { useState, useEffect } from "react";

interface ToastItem { id: number; msg: string; exit: boolean }

export default function Toast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const add = (e: Event) => {
      const { name } = (e as CustomEvent<{ name: string }>).detail;
      const id = Date.now();
      setToasts(prev => [...prev.slice(-2), { id, msg: name, exit: false }]);
      setTimeout(() => {
        setToasts(prev => prev.map(t => t.id === id ? { ...t, exit: true } : t));
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 350);
      }, 3200);
    };
    window.addEventListener("cart:added", add);
    return () => window.removeEventListener("cart:added", add);
  }, []);

  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast${t.exit ? " exit" : ""}`}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(26,110,255,.15)", border: "1px solid rgba(26,110,255,.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18 }}>
            🛒
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#fff", lineHeight: 1.3, marginBottom: 2 }}>{t.msg}</div>
            <div style={{ fontSize: 11, color: "var(--blue-lt)", fontWeight: 600 }}>Adicionado ao carrinho ✓</div>
          </div>
        </div>
      ))}
    </div>
  );
}
