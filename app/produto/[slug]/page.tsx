"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProductBySlug, PRODUCTS, formatBRL, getPixPrice, getInstallmentText, getDiscountPct } from "@/data/products";
import { useCart } from "@/context/CartContext";

function tilt(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = ((e.clientX - r.left) / r.width  - 0.5) * 14;
  const y = ((e.clientY - r.top)  / r.height - 0.5) * -14;
  el.style.transform   = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg)`;
}
function resetTilt(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  el.style.transition = "transform .5s cubic-bezier(.16,1,.3,1)";
  el.style.transform  = "";
}

export default function ProdutoPage() {
  const { slug } = useParams() as { slug: string };
  const product = getProductBySlug(slug);
  const { addItem } = useCart();

  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
      }),
      { threshold: 0.07 }
    );
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));

    const ring = ringRef.current;
    if (ring && window.matchMedia("(pointer: fine)").matches) {
      let mx = 0, my = 0, rx = 0, ry = 0, vis = false;
      const onMove = (e: MouseEvent) => {
        mx = e.clientX; my = e.clientY;
        if (!vis) { ring.style.opacity = "1"; vis = true; }
      };
      const expand = () => ring.classList.add("cursor-expand");
      const shrink = () => ring.classList.remove("cursor-expand");
      const raf = () => {
        rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
        ring.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
      document.addEventListener("mousemove", onMove);
      document.querySelectorAll("a, button").forEach(el => {
        el.addEventListener("mouseenter", expand);
        el.addEventListener("mouseleave", shrink);
      });
    }
    return () => obs.disconnect();
  }, []);

  if (!product) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: "0 24px", textAlign: "center", paddingTop: 68 }}>
          <div style={{ fontSize: 60 }}>😕</div>
          <h1 style={{ fontSize: 28, fontWeight: 900 }}>Produto não encontrado</h1>
          <p style={{ color: "var(--t2)", fontSize: 15 }}>O produto que você procura não existe ou foi removido.</p>
          <Link href="/produtos" className="btn-primary" style={{ marginTop: 8 }}>Ver todos os produtos</Link>
        </div>
        <Footer />
      </>
    );
  }

  const pix      = getPixPrice(product.price);
  const install  = getInstallmentText(product.price, product.maxInstallments);
  const discount = getDiscountPct(product.price, product.priceFrom);

  const variantStr = product.variants
    ?.map(v => `${v.name}: ${selectedVariants[v.name] || v.options[0]}`)
    .join(", ");

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem(product, variantStr || undefined);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div className="scroll-progress-bar" />

      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(255,255,255,.016) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="orb-a" style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "var(--blue)", filter: "blur(140px)", opacity: .06, top: -200, left: -100 }} />
      </div>

      <Navbar />

      {/* Breadcrumb */}
      <div style={{ paddingTop: 84, paddingBottom: 0, position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 24px", display: "flex", gap: 8, fontSize: 12, color: "var(--t3)", alignItems: "center" }}>
          <Link href="/" style={{ color: "var(--t3)", textDecoration: "none", transition: "color .15s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--t2)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--t3)")}>Início</Link>
          <span>/</span>
          <Link href="/produtos" style={{ color: "var(--t3)", textDecoration: "none", transition: "color .15s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--t2)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--t3)")}>Produtos</Link>
          <span>/</span>
          <span style={{ color: "var(--t2)" }}>{product.name}</span>
        </div>
      </div>

      {/* Product hero */}
      <section style={{ padding: "20px 0 80px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div className="product-detail-grid">
            {/* Image */}
            <div className="fade-up" onMouseMove={tilt} onMouseLeave={resetTilt}
              style={{
                background: product.imageBg, borderRadius: 20,
                aspectRatio: "1 / 1", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 120, border: "1px solid rgba(255,255,255,.07)",
                cursor: "default", transformStyle: "preserve-3d",
              }}>
              {product.image && product.floatAnim ? (
                <div className="float-phone-wrap" style={{ padding: "24px 0 32px" }}>
                  <img src={product.image} alt={product.name} className="float-phone-img" style={{ height: "78%" }} />
                  <div className="float-phone-shadow" style={{ bottom: 20 }} />
                </div>
              ) : product.image ? (
                <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 20 }} />
              ) : (
                <span style={{ filter: "drop-shadow(0 0 30px rgba(26,110,255,.3))" }}>{product.emoji}</span>
              )}
            </div>

            {/* Info */}
            <div className="fade-up d1">
              <p style={{ fontSize: 11, fontWeight: 800, color: "var(--blue-lt)", letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 8 }}>{product.brand}</p>
              <h1 style={{ fontSize: "clamp(22px,3.5vw,38px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 12, letterSpacing: "-.04em" }}>{product.name}</h1>
              <p style={{ fontSize: 14, color: "var(--t2)", lineHeight: 1.75, marginBottom: 24 }}>{product.description}</p>

              {/* Price card */}
              <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 14, padding: "20px 22px", marginBottom: 24 }}>
                {product.priceFrom && (
                  <div style={{ fontSize: 12, color: "var(--t3)", textDecoration: "line-through", marginBottom: 4 }}>{formatBRL(product.priceFrom)}</div>
                )}
                {discount && (
                  <span style={{ fontSize: 11, fontWeight: 800, background: "#e53935", color: "#fff", borderRadius: 6, padding: "2px 8px", marginBottom: 8, display: "inline-block" }}>
                    -{discount}% OFF
                  </span>
                )}
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", marginTop: 6 }}>
                  <div>
                    <span style={{ fontSize: 11, color: "var(--t3)" }}>No PIX </span>
                    <span style={{ fontSize: 26, fontWeight: 900, color: "var(--blue-lt)" }}>{formatBRL(pix)}</span>
                  </div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginTop: 6 }}>{formatBRL(product.price)}</div>
                {install && <div style={{ fontSize: 12, color: "var(--t2)", marginTop: 4 }}>{install} no cartão sem juros</div>}
              </div>

              {/* Variants */}
              {product.variants?.map(v => (
                <div key={v.name} style={{ marginBottom: 18 }}>
                  <p style={{ fontSize: 11, fontWeight: 800, color: "var(--t2)", marginBottom: 10, textTransform: "uppercase", letterSpacing: ".06em" }}>
                    {v.name}: <span style={{ color: "var(--blue-lt)" }}>{selectedVariants[v.name] || v.options[0]}</span>
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {v.options.map(opt => {
                      const isSelected = (selectedVariants[v.name] || v.options[0]) === opt;
                      return (
                        <button key={opt}
                          onClick={() => setSelectedVariants(prev => ({ ...prev, [v.name]: opt }))}
                          style={{
                            padding: "8px 16px", borderRadius: 8,
                            border: isSelected ? "1px solid var(--blue-lt)" : "1px solid rgba(255,255,255,.1)",
                            background: isSelected ? "rgba(26,110,255,.15)" : "rgba(255,255,255,.03)",
                            color: isSelected ? "var(--blue-lt)" : "var(--t2)",
                            fontSize: 12, fontWeight: 600, cursor: "pointer",
                            transition: "all .15s", fontFamily: "inherit",
                          }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Qty + Add to cart */}
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 24, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,.05)", borderRadius: 10, padding: "10px 18px", border: "1px solid rgba(255,255,255,.07)" }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))}
                    style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 20, lineHeight: 1, fontFamily: "inherit", padding: "0 4px" }}>−</button>
                  <span style={{ fontSize: 16, fontWeight: 700, minWidth: 24, textAlign: "center" }}>{qty}</span>
                  <button onClick={() => setQty(Math.min(product.stock, qty + 1))}
                    style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 20, lineHeight: 1, fontFamily: "inherit", padding: "0 4px" }}>+</button>
                </div>
                <button onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="btn-primary"
                  style={{ flex: 1, minWidth: 180, justifyContent: "center", fontSize: 15, padding: "14px 24px", borderRadius: 10, opacity: product.stock === 0 ? 0.4 : 1 }}>
                  {added ? "✓ Adicionado!" : product.stock === 0 ? "Esgotado" : "Adicionar ao carrinho"}
                </button>
              </div>

              {/* Badges */}
              <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
                {product.freeShipping && (
                  <span style={{ fontSize: 12, color: "var(--blue-lt)", fontWeight: 700 }}>🚚 Frete grátis</span>
                )}
                {product.stock > 0 && product.stock <= 5 && (
                  <span style={{ fontSize: 12, color: "#FF9800", fontWeight: 700 }}>⚠ Últimas {product.stock} unidades</span>
                )}
                {product.stock > 5 && (
                  <span style={{ fontSize: 12, color: "#4CAF50", fontWeight: 700 }}>✓ Em estoque</span>
                )}
              </div>

              {/* Stock progress bar */}
              {product.stock > 0 && product.stock <= 25 && (
                <div style={{ marginTop: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--t3)", marginBottom: 7 }}>
                    <span>Disponibilidade em estoque</span>
                    <span style={{ color: product.stock <= 5 ? "#FF9800" : "var(--t2)", fontWeight: 700 }}>
                      {product.stock <= 3 ? "Crítico" : product.stock <= 8 ? "Baixo" : "Normal"} · {product.stock} un.
                    </span>
                  </div>
                  <div className="stock-bar">
                    <div className="stock-bar-fill" style={{
                      width: `${Math.min((product.stock / 25) * 100, 100)}%`,
                      background: product.stock <= 3
                        ? "linear-gradient(90deg, #FF5722, #FF9800)"
                        : product.stock <= 8
                        ? "linear-gradient(90deg, #FF9800, #FFC107)"
                        : "linear-gradient(90deg, var(--blue), var(--blue-lt))",
                    }} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Specs */}
          <div className="divider" style={{ margin: "60px 0 40px" }} />
          <div style={{ maxWidth: 700 }}>
            <h2 className="reveal" style={{ fontSize: 20, fontWeight: 800, marginBottom: 16, letterSpacing: "-.03em" }}>Especificações técnicas</h2>
            <div className="reveal" style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 14, padding: "24px 28px" }}>
              <p style={{ fontSize: 14, color: "var(--t2)", lineHeight: 2 }}>{product.details}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section style={{ padding: "0 0 60px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
            <h2 className="reveal" style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.03em" }}>
              Avaliações dos clientes
            </h2>
            <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ display: "flex", gap: 3 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ color: "#FFC107", fontSize: 18 }}>★</span>
                ))}
              </div>
              <span style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>5.0</span>
              <span style={{ fontSize: 12, color: "var(--t3)" }}>(128 avaliações)</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }} className="review-grid">
            {[
              { name: "João S.", city: "São Paulo, SP", rating: 5, text: "Produto excelente! Chegou antes do prazo, embalagem perfeita. Super recomendo a loja — atendimento rápido e transparente.", date: "há 2 dias" },
              { name: "Maria L.", city: "Rio de Janeiro, RJ", rating: 5, text: "Fiquei impressionada com a qualidade e a velocidade da entrega. O produto é idêntico ao descrito. Voltarei a comprar!", date: "há 5 dias" },
              { name: "Carlos M.", city: "Belo Horizonte, MG", rating: 5, text: "Atendimento incrível do início ao fim. Me ajudaram a escolher o produto certo para minha necessidade. Parabéns!", date: "há 1 semana" },
            ].map((r, i) => (
              <div key={i} className={`review-card reveal reveal-d${i + 1}`}>
                <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <span key={j} style={{ color: "#FFC107", fontSize: 14 }}>★</span>
                  ))}
                </div>
                <p style={{ fontSize: 13, color: "var(--t2)", lineHeight: 1.7, marginBottom: 14 }}>&ldquo;{r.text}&rdquo;</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: "var(--t3)" }}>{r.city}</div>
                  </div>
                  <span style={{ fontSize: 11, color: "var(--t3)" }}>{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section style={{ padding: "0 0 80px", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
            <h2 className="reveal" style={{ fontSize: 20, fontWeight: 800, marginBottom: 24, letterSpacing: "-.03em" }}>Você também pode gostar</h2>
            <div className="grid-products">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
