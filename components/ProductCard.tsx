"use client";
import Link from "next/link";
import { Product, formatBRL, getDiscountPct, getInstallmentText, getPixPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface Props { product: Product; index?: number }

export default function ProductCard({ product: p, index = 0 }: Props) {
  const { addItem } = useCart();
  const discount = getDiscountPct(p.price, p.priceFrom);
  const pix      = getPixPrice(p.price);
  const install  = getInstallmentText(p.price, p.maxInstallments);

  function tilt(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    el.style.transition = "border-color .15s, box-shadow .15s";
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 14;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * -14;
    el.style.transform   = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
    el.style.borderColor = "rgba(26,110,255,.45)";
    el.style.boxShadow   = "0 16px 48px rgba(26,110,255,.12)";
  }
  function resetTilt(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    el.style.transition  = "all .45s cubic-bezier(.16,1,.3,1)";
    el.style.transform   = "";
    el.style.borderColor = "";
    el.style.boxShadow   = "";
  }

  return (
    <div
      className={`glass-card product-card reveal reveal-d${(index % 3) + 1}`}
      onMouseMove={tilt} onMouseLeave={resetTilt}
    >
      {/* Image */}
      <Link href={`/produto/${p.slug}`} style={{ display: "block", textDecoration: "none" }}>
        <div style={{ position: "relative", background: p.imageBg, height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {p.image ? (
            <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{ fontSize: 64 }}>{p.emoji}</span>
          )}
          {discount && (
            <span style={{ position: "absolute", top: 10, left: 10, background: "#e53935", color: "#fff", fontSize: 11, fontWeight: 800, borderRadius: 6, padding: "3px 8px" }}>
              -{discount}%
            </span>
          )}
          {p.freeShipping && (
            <span style={{ position: "absolute", top: 10, right: 10, background: "rgba(26,110,255,.85)", color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 6, padding: "3px 8px" }}>
              Frete grátis
            </span>
          )}
          {p.stock <= 3 && p.stock > 0 && (
            <span style={{ position: "absolute", bottom: 10, left: 10, background: "rgba(255,152,0,.9)", color: "#000", fontSize: 10, fontWeight: 700, borderRadius: 6, padding: "3px 8px" }}>
              Últimas unidades
            </span>
          )}
          {p.stock === 0 && (
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>Esgotado</span>
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div style={{ padding: "16px 16px 18px" }}>
        <Link href={`/produto/${p.slug}`} style={{ textDecoration: "none" }}>
          <p style={{ fontSize: 11, color: "var(--blue-lt)", fontWeight: 700, marginBottom: 4, letterSpacing: ".04em", textTransform: "uppercase" }}>{p.brand}</p>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.3, marginBottom: 10, minHeight: 36 }}>{p.name}</h3>
        </Link>

        {/* PIX price */}
        <div style={{ marginBottom: 2 }}>
          <span style={{ fontSize: 11, color: "var(--t3)" }}>No Pix </span>
          <span style={{ fontSize: 16, fontWeight: 900, color: "var(--blue-lt)" }}>{formatBRL(pix)}</span>
        </div>
        {p.priceFrom && (
          <div style={{ fontSize: 11, color: "var(--t3)", textDecoration: "line-through", marginBottom: 2 }}>{formatBRL(p.priceFrom)}</div>
        )}
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{formatBRL(p.price)}</div>
        {install && <div style={{ fontSize: 11, color: "var(--t2)" }}>{install} no cartão</div>}

        {/* CTA */}
        <button
          onClick={() => p.stock > 0 && addItem(p)}
          disabled={p.stock === 0}
          className="btn-primary"
          style={{ width: "100%", justifyContent: "center", marginTop: 14, fontSize: 13, padding: "11px 16px", borderRadius: 9, opacity: p.stock === 0 ? 0.4 : 1 }}
        >
          {p.stock === 0 ? "Esgotado" : "Adicionar ao carrinho"}
        </button>
      </div>
    </div>
  );
}
