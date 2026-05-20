"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatBRL } from "@/data/products";

export default function CartDrawer() {
  const { items, total, count, open, setOpen, removeItem, updateQty } = useCart();

  return (
    <>
      {/* Overlay */}
      {open && (
        <div onClick={() => setOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.6)", zIndex: 200, backdropFilter: "blur(4px)" }} />
      )}

      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 201,
        width: "min(420px, 100vw)",
        background: "#0A0A14",
        borderLeft: "1px solid rgba(26,110,255,.15)",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform .35s cubic-bezier(.16,1,.3,1)",
        display: "flex", flexDirection: "column",
      }}>
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 800, fontSize: 16 }}>Carrinho {count > 0 && <span style={{ color: "var(--blue-lt)", marginLeft: 4 }}>({count})</span>}</span>
          <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "var(--t2)", cursor: "pointer", fontSize: 22 }}>✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--t3)" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div>
              <p style={{ fontSize: 14 }}>Seu carrinho está vazio</p>
            </div>
          ) : items.map(item => (
            <div key={`${item.product.id}-${item.variant}`} style={{ display: "flex", gap: 12, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, padding: 12 }}>
              {/* Image */}
              <div style={{ width: 64, height: 64, borderRadius: 8, background: item.product.imageBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 28 }}>
                {item.product.image ? <img src={item.product.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} /> : item.product.emoji}
              </div>
              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.product.name}</p>
                {item.variant && <p style={{ fontSize: 11, color: "var(--t2)", marginBottom: 4 }}>{item.variant}</p>}
                <p style={{ fontSize: 13, fontWeight: 800, color: "var(--blue-lt)" }}>{formatBRL(item.product.price * item.quantity)}</p>
              </div>
              {/* Qty + Remove */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between" }}>
                <button onClick={() => removeItem(item.product.id, item.variant)} style={{ background: "none", border: "none", color: "var(--t3)", cursor: "pointer", fontSize: 14 }}>✕</button>
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.05)", borderRadius: 8, padding: "4px 8px" }}>
                  <button onClick={() => updateQty(item.product.id, item.quantity - 1, item.variant)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 16, lineHeight: 1 }}>−</button>
                  <span style={{ fontSize: 13, fontWeight: 700, minWidth: 16, textAlign: "center" }}>{item.quantity}</span>
                  <button onClick={() => updateQty(item.product.id, item.quantity + 1, item.variant)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 16, lineHeight: 1 }}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: "20px 24px", borderTop: "1px solid rgba(255,255,255,.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ color: "var(--t2)", fontSize: 14 }}>Subtotal</span>
              <span style={{ fontWeight: 900, fontSize: 18 }}>{formatBRL(total)}</span>
            </div>
            <Link href="/checkout" onClick={() => setOpen(false)} className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "15px", borderRadius: 10, textDecoration: "none", display: "flex" }}>
              Finalizar compra →
            </Link>
            <button onClick={() => setOpen(false)} style={{ width: "100%", marginTop: 10, background: "none", border: "none", color: "var(--t2)", cursor: "pointer", fontSize: 13, padding: "8px 0" }}>
              Continuar comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}
