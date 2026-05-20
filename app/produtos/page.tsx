"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, CATEGORIES, getByCategory } from "@/data/products";

export default function ProdutosPage() {
  const [activeCat, setActiveCat] = useState("todos");
  const [products, setProducts] = useState(PRODUCTS);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleCatChange = (catId: string) => {
    setLoading(true);
    setActiveCat(catId);
    setTimeout(() => setLoading(false), 300);
  };

  useEffect(() => {
    let list = getByCategory(activeCat);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      );
    }
    setProducts(list);
  }, [activeCat, search]);

  // Re-attach scroll reveal on product change
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
      }),
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );
    document.querySelectorAll(".reveal:not(.visible)").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [products]);

  // Cursor
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring || !window.matchMedia("(pointer: fine)").matches) return;
    let mx = 0, my = 0, rx = 0, ry = 0, vis = false;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (!vis) { dot.style.opacity = "1"; ring.style.opacity = "1"; vis = true; }
      dot.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`;
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
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
      <div className="scroll-progress-bar" />

      {/* Background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(255,255,255,.016) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="orb-a" style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "var(--blue)", filter: "blur(180px)", opacity: .04, top: -200, left: -100 }} />
        <div className="orb-b" style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "#0D4BC4", filter: "blur(150px)", opacity: .03, bottom: 200, right: -100 }} />
      </div>

      <Navbar />

      {/* Page header */}
      <section style={{ paddingTop: 110, paddingBottom: 32, position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div className="fade-up" style={{ marginBottom: 8 }}>
            <span className="badge"><span className="badge-dot" /> Catálogo completo</span>
          </div>
          <h1 className="fade-up d1" style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 900, lineHeight: 1.08, marginBottom: 12, letterSpacing: "-.04em" }}>
            Todos os produtos
          </h1>
          <p className="fade-up d2" style={{ fontSize: 15, color: "var(--t2)", lineHeight: 1.7, maxWidth: 520 }}>
            Celulares, fones, películas, acessórios, garrafinhas e bikes elétricas — tudo em um só lugar.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div style={{ position: "relative", zIndex: 1, padding: "0 0 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => handleCatChange(cat.id)}
              className={`cat-tab${activeCat === cat.id ? " active" : ""}`}>
              {cat.icon} {cat.label}
            </button>
          ))}
          <input
            type="text"
            placeholder="Buscar produto..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="form-input"
            style={{ marginLeft: "auto", width: 200, padding: "8px 14px", fontSize: 13 }}
          />
        </div>
      </div>

      {/* Product grid */}
      <section style={{ padding: "8px 0 80px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          {loading ? (
            <div className="grid-products">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton" style={{ height: 190 }} />
                  <div style={{ padding: "14px 16px 18px" }}>
                    <div className="skeleton" style={{ height: 10, width: "55%", marginBottom: 10 }} />
                    <div className="skeleton" style={{ height: 14, width: "90%", marginBottom: 6 }} />
                    <div className="skeleton" style={{ height: 12, width: "70%", marginBottom: 14 }} />
                    <div className="skeleton" style={{ height: 20, width: "50%", marginBottom: 14 }} />
                    <div className="skeleton" style={{ height: 38, borderRadius: 9 }} />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--t3)" }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>🔍</div>
              <p style={{ fontSize: 16, fontWeight: 600 }}>Nenhum produto encontrado</p>
              <p style={{ fontSize: 13, marginTop: 8 }}>Tente outra categoria ou termo de busca.</p>
            </div>
          ) : (
            <div ref={gridRef} className="grid-products">
              {products.map((p, i) => (
                <ProductCard key={`${p.id}-${activeCat}`} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
