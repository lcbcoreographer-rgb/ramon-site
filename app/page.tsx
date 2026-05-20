"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import CartButton from "@/components/CartButton";
import ProductCard from "@/components/ProductCard";
import { getFeatured, formatBRL } from "@/data/products";

const BRANDS = [
  { icon: "🍎", name: "Apple"    },
  { icon: "📱", name: "Samsung"  },
  { icon: "🎧", name: "JBL"      },
  { icon: "📱", name: "Motorola" },
  { icon: "📱", name: "Xiaomi"   },
  { icon: "🎵", name: "Sony"     },
  { icon: "⚡", name: "Anker"    },
  { icon: "📱", name: "Google"   },
  { icon: "💻", name: "Lenovo"   },
  { icon: "🎮", name: "Razer"    },
];

// ── Constants ────────────────────────────────────────────────────────────────
const WA      = "5500000000000"; // TODO: substituir pelo número real
const WA_LINK = `https://wa.me/${WA}?text=Olá! Vim pelo site e quero saber sobre os produtos.`;
const IG_LINK = "https://instagram.com/ramon_acessorios"; // TODO: substituir

const HOME_CATEGORIES = [
  { icon: "📱", title: "Celulares",          desc: "iPhones, Samsung, Motorola e muito mais com garantia e procedência." },
  { icon: "🎧", title: "Fones de Ouvido",    desc: "Fones com fio, bluetooth e sem fio das melhores marcas do mercado." },
  { icon: "🛡️", title: "Películas",          desc: "Películas de vidro e privacidade com instalação na hora." },
  { icon: "💧", title: "Garrafinhas",        desc: "Garrafinhas térmicas e personalizadas para o dia a dia." },
  { icon: "⚡", title: "Bikes Elétricas",    desc: "Bikes elétricas modernas para mobilidade urbana inteligente." },
  { icon: "💻", title: "Tecnologia",         desc: "Carregadores, capinhas, cabos, adaptadores e acessórios em geral." },
];

const DIFERENCIAIS = [
  { icon: "⚡", title: "Atendimento rápido",          desc: "Respondemos no WhatsApp em minutos." },
  { icon: "✅", title: "Produtos selecionados",        desc: "Só trabalhamos com produtos de qualidade e procedência." },
  { icon: "🛡️", title: "Instalação de película",      desc: "Aplicamos na hora com garantia de bolhas zero." },
  { icon: "📦", title: "Variedade de acessórios",     desc: "Tudo para seu celular e estilo de vida em um só lugar." },
  { icon: "🔒", title: "Compra segura",               desc: "Transparência total na negociação, sem surpresas." },
  { icon: "💬", title: "Suporte completo",            desc: "Atendemos antes, durante e após a sua compra." },
];

// ── Tilt handlers ────────────────────────────────────────────────────────────
function tilt(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  el.style.transition = "border-color .2s, box-shadow .2s";
  const r = el.getBoundingClientRect();
  const x = ((e.clientX - r.left) / r.width  - 0.5) * 16;
  const y = ((e.clientY - r.top)  / r.height - 0.5) * -16;
  el.style.transform   = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-5px)`;
  el.style.borderColor = "rgba(26,110,255,.5)";
  el.style.boxShadow   = "0 20px 60px rgba(26,110,255,.12)";
}
function resetTilt(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  el.style.transition  = "transform .5s cubic-bezier(.16,1,.3,1), border-color .3s, box-shadow .3s";
  el.style.transform   = "";
  el.style.borderColor = "";
  el.style.boxShadow   = "";
}

// ── Component ────────────────────────────────────────────────────────────────
export default function Page() {
  const [mobileMenu, setMobileMenu] = useState(false);

  // Cursor
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── Scroll reveal ─────────────────────────────────
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.07, rootMargin: "0px 0px -48px 0px" }
    );
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));

    // ── Scroll progress + hero parallax ───────────────
    const onScroll = () => {
      const sy = window.scrollY;
      if (window.innerWidth >= 768) {
        const hero = document.querySelector<HTMLElement>(".hero-section");
        if (hero) {
          const p = Math.min(sy / 480, 1);
          hero.style.transform = `translateY(${sy * 0.2}px)`;
          hero.style.opacity   = `${1 - p * 0.7}`;
        }
      }
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const bar  = document.querySelector<HTMLElement>(".scroll-progress-bar");
      if (bar) bar.style.transform = `scaleX(${docH > 0 ? sy / docH : 0})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Animated counters ──────────────────────────────
    const timer = setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".counter-num").forEach(el => {
        const target = Number(el.dataset.target);
        const dur = 1800;
        const t0 = Date.now();
        const tick = () => {
          const p = Math.min((Date.now() - t0) / dur, 1);
          el.textContent = String(Math.floor((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, 700);

    // ── Custom cursor ──────────────────────────────────
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (dot && ring && window.matchMedia("(pointer: fine)").matches) {
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
    }

    // ── Magnetic buttons ──────────────────────────────
    if (window.matchMedia("(pointer: fine)").matches) {
      document.querySelectorAll<HTMLElement>(".btn-primary, .btn-ghost, .btn-wa").forEach(el => {
        el.addEventListener("mousemove", (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width  / 2);
          const dy = e.clientY - (r.top  + r.height / 2);
          el.style.transition = "transform .1s ease";
          el.style.transform  = `translate(${dx * 0.28}px, ${dy * 0.28}px)`;
        });
        el.addEventListener("mouseleave", () => {
          el.style.transition = "transform .5s cubic-bezier(.16,1,.3,1)";
          el.style.transform  = "";
        });
      });
    }

    return () => { obs.disconnect(); window.removeEventListener("scroll", onScroll); clearTimeout(timer); };
  }, []);

  return (
    <>
      {/* Cursor */}
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />

      {/* Scroll progress */}
      <div className="scroll-progress-bar" />

      {/* Background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,.016) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="orb-a" style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "var(--blue)", filter: "blur(150px)", opacity: .07, top: -200, left: -150 }} />
        <div className="orb-b" style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "#0D4BC4", filter: "blur(130px)", opacity: .06, bottom: -100, right: -100 }} />
      </div>

      {/* ── NAV ─────────────────────────────────────────── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(5,5,8,.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,.05)" }} className="nav-wrap">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src="/logo.png" alt="Ramon Acessórios" style={{ height: 36, width: "auto", objectFit: "contain" }} />
        </div>
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {[["Produtos","#produtos"],["Categorias","#categorias"],["Diferenciais","#diferenciais"],["Sobre","#sobre"]].map(([l, h]) => (
            <a key={l} href={h} style={{ fontSize: 13, fontWeight: 500, color: "var(--t2)", textDecoration: "none", transition: "color .15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--t2)")}>{l}</a>
          ))}
        </div>
        <CartButton style={{ marginRight: 4 }} />
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary hide-mobile" style={{ fontSize: 13, padding: "10px 20px" }}>💬 WhatsApp</a>
        <button className="show-mobile" onClick={() => setMobileMenu(!mobileMenu)}
          style={{ background: "none", border: "1px solid rgba(255,255,255,.12)", borderRadius: 8, padding: "8px 12px", cursor: "pointer", color: "#fff", fontSize: 18 }}>
          {mobileMenu ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenu && (
        <div style={{ position: "fixed", top: 68, left: 0, right: 0, zIndex: 99, background: "rgba(5,5,8,.97)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,.06)", padding: "24px 24px 32px", display: "flex", flexDirection: "column", gap: 0 }}>
          {[["Produtos","#produtos"],["Categorias","#categorias"],["Diferenciais","#diferenciais"],["Sobre","#sobre"]].map(([l, h]) => (
            <a key={l} href={h} onClick={() => setMobileMenu(false)}
              style={{ fontSize: 16, fontWeight: 600, color: "var(--t2)", textDecoration: "none", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,.05)" }}>{l}</a>
          ))}
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-wa" onClick={() => setMobileMenu(false)} style={{ marginTop: 20, justifyContent: "center" }}>
            💬 Chamar no WhatsApp
          </a>
        </div>
      )}

      {/* ── HERO ────────────────────────────────────────── */}
      <section style={{ paddingTop: 100, paddingBottom: 80, position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div className="hero-section hero-grid">

            {/* Left: text */}
            <div>
              <div className="badge fade-up" style={{ marginBottom: 24 }}>
                <span className="badge-dot" /> Celulares · Acessórios · Bikes Elétricas
              </div>
              <h1 className="fade-up d1" style={{ fontSize: "clamp(36px, 5.5vw, 66px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 22 }}>
                A melhor loja<br />de <span className="blue-text">tecnologia</span><br />da região
              </h1>
              <p className="fade-up d2" style={{ fontSize: 17, color: "var(--t2)", lineHeight: 1.75, marginBottom: 36, maxWidth: 460 }}>
                Celulares, acessórios, películas, fones e bikes elétricas com atendimento rápido e personalizado.
              </p>
              <div className="fade-up d3" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-wa">💬 WhatsApp</a>
                <Link href="/produtos" className="btn-ghost">Ver catálogo →</Link>
              </div>

              {/* Inline animated stats */}
              <div className="fade-up d4" style={{ display: "flex", gap: 36, marginTop: 44, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,.06)", flexWrap: "wrap" }}>
                {[
                  { target: 500,  suffix: "+", label: "clientes"  },
                  { target: 1000, suffix: "+", label: "produtos"  },
                  { target: 5,    suffix: "★", label: "avaliação" },
                ].map(s => (
                  <div key={s.label}>
                    <div style={{ fontSize: 26, fontWeight: 900, color: "var(--blue-lt)", lineHeight: 1, letterSpacing: "-.04em" }}>
                      <span className="counter-num" data-target={s.target}>0</span>{s.suffix}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--t3)", marginTop: 5, fontWeight: 600 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: phone mockup */}
            <div className="fade-up d2 hide-mobile" style={{ position: "relative", display: "flex", justifyContent: "center" }}>
              {/* Outer glow */}
              <div style={{ position: "absolute", inset: -80, background: "radial-gradient(circle, rgba(26,110,255,.18) 0%, transparent 70%)", pointerEvents: "none" }} />

              {/* Phone frame */}
              <div style={{
                width: 260, height: 520, borderRadius: 42,
                border: "1.5px solid rgba(26,110,255,.22)",
                background: "linear-gradient(160deg, rgba(10,18,48,.92) 0%, rgba(4,6,16,.97) 100%)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 0 0 1px rgba(255,255,255,.04), 0 40px 80px rgba(0,0,0,.7), 0 0 80px rgba(26,110,255,.1)",
                display: "flex", flexDirection: "column",
                padding: "58px 18px 32px", gap: 10, overflow: "hidden", position: "relative",
              }}>
                {/* Notch */}
                <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 70, height: 22, background: "rgba(255,255,255,.07)", borderRadius: 99 }} />
                {/* Status */}
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 9, fontWeight: 800, color: "var(--blue-lt)", letterSpacing: ".08em" }}>RAMON</span>
                  <span style={{ fontSize: 9, color: "var(--t3)" }}>🔋 98%</span>
                </div>
                {/* Search bar */}
                <div style={{ background: "rgba(255,255,255,.06)", borderRadius: 9, padding: "7px 11px", fontSize: 10, color: "var(--t3)", border: "1px solid rgba(255,255,255,.04)", marginBottom: 6 }}>
                  🔍 Buscar produto...
                </div>
                {/* Product cards inside */}
                {getFeatured().slice(0, 4).map((p, i) => (
                  <div key={p.id} style={{
                    background: "rgba(255,255,255,.045)",
                    borderRadius: 10, padding: "9px 11px",
                    display: "flex", gap: 9, alignItems: "center",
                    border: "1px solid rgba(255,255,255,.05)",
                    animation: `${i % 2 === 0 ? "float-a" : "float-b"} ${3 + i * 0.6}s ease-in-out infinite`,
                  }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: p.imageBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                      {p.emoji}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                      <div style={{ fontSize: 10, color: "var(--blue-lt)", fontWeight: 800, marginTop: 1 }}>{formatBRL(p.price)}</div>
                    </div>
                    <div style={{ fontSize: 10, background: "rgba(26,110,255,.15)", color: "var(--blue-lt)", borderRadius: 6, padding: "3px 7px", fontWeight: 800, flexShrink: 0 }}>+</div>
                  </div>
                ))}
                {/* Inner glow */}
                <div style={{ position: "absolute", bottom: -30, left: "50%", transform: "translateX(-50%)", width: 180, height: 180, background: "var(--blue)", filter: "blur(60px)", opacity: .07, pointerEvents: "none" }} />
              </div>

              {/* Floating trust badges */}
              <div style={{ position: "absolute", top: 70, right: -20, background: "rgba(76,175,80,.1)", border: "1px solid rgba(76,175,80,.25)", borderRadius: 10, padding: "8px 12px", fontSize: 11, fontWeight: 700, color: "#4CAF50", backdropFilter: "blur(12px)", animation: "float-a 4s ease-in-out infinite", zIndex: 2, whiteSpace: "nowrap" }}>
                ✓ Frete grátis
              </div>
              <div style={{ position: "absolute", bottom: 140, left: -28, background: "rgba(26,110,255,.1)", border: "1px solid rgba(26,110,255,.25)", borderRadius: 10, padding: "8px 12px", fontSize: 11, fontWeight: 700, color: "var(--blue-lt)", backdropFilter: "blur(12px)", animation: "float-b 5s ease-in-out infinite", zIndex: 2, whiteSpace: "nowrap" }}>
                🔒 Compra segura
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BRAND TICKER ────────────────────────────────── */}
      <div style={{ background: "rgba(255,255,255,.012)", borderTop: "1px solid rgba(255,255,255,.04)", borderBottom: "1px solid rgba(255,255,255,.04)", padding: "18px 0", position: "relative", zIndex: 1 }}>
        <div className="brand-ticker-wrap">
          <div className="brand-ticker-track">
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <div key={i} className="brand-item">
                <span style={{ fontSize: 16 }}>{b.icon}</span>
                <span>{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CATEGORIES ──────────────────────────────────── */}
      <section id="categorias" style={{ padding: "80px 0", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 20 }}>Categorias</div>
            <h2 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>
              Tudo que você precisa<br /><span className="blue-text">em tecnologia</span>
            </h2>
            <p style={{ fontSize: 16, color: "var(--t2)", maxWidth: 500, margin: "0 auto" }}>
              Do celular ao acessório, da película à bike elétrica — a Ramon tem o que você procura.
            </p>
          </div>
          <div className="grid-3">
            {HOME_CATEGORIES.map((c, i) => (
              <Link key={i} href="/produtos"
                className={`glass-card reveal reveal-d${(i % 3) + 1}`}
                style={{ padding: 28, textDecoration: "none", display: "block", cursor: "pointer" }}
                onMouseMove={tilt} onMouseLeave={resetTilt}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{c.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 8, color: "#fff" }}>{c.title}</h3>
                <p style={{ fontSize: 13, color: "var(--t2)", lineHeight: 1.65, marginBottom: 16 }}>{c.desc}</p>
                <span style={{ fontSize: 12, color: "var(--blue-lt)", fontWeight: 700 }}>Ver produtos →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider" style={{ margin: "0 48px" }} />

      {/* ── FEATURED PRODUCTS ───────────────────────────── */}
      <section id="produtos" style={{ padding: "80px 0", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 20 }}>Destaques</div>
            <h2 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>
              Produtos em<br /><span className="blue-text">destaque</span>
            </h2>
            <p style={{ fontSize: 16, color: "var(--t2)", maxWidth: 480, margin: "0 auto" }}>
              Os produtos mais procurados da Ramon — compre online com segurança e receba em casa.
            </p>
          </div>
          <div className="grid-products">
            {getFeatured().slice(0, 6).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/produtos" className="btn-ghost" style={{ fontSize: 14 }}>
              Ver catálogo completo →
            </Link>
          </div>
        </div>
      </section>

      {/* ── DIFERENCIAIS ────────────────────────────────── */}
      <section id="diferenciais" style={{ padding: "80px 0", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 20 }}>Por que a Ramon?</div>
            <h2 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>
              Somos diferentes.<br /><span className="blue-text">Isso é um fato.</span>
            </h2>
          </div>
          <div className="grid-3">
            {DIFERENCIAIS.map((d, i) => (
              <div key={i} className={`glass-card reveal reveal-d${(i % 3) + 1}`} style={{ padding: "24px 28px" }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{d.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 8 }}>{d.title}</h3>
                <p style={{ fontSize: 13, color: "var(--t2)", lineHeight: 1.65 }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOBRE ───────────────────────────────────────── */}
      <section id="sobre" style={{ padding: "80px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div>
              <div className="badge" style={{ marginBottom: 20 }}>Sobre a Ramon</div>
              <h2 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 900, lineHeight: 1.15, marginBottom: 16 }}>
                Sua loja de<br /><span className="blue-text">tecnologia de confiança</span>
              </h2>
              <p style={{ fontSize: 14, color: "var(--t2)", lineHeight: 1.8, marginBottom: 28 }}>
                A Ramon Acessórios para Celulares é uma loja focada em tecnologia, praticidade e atendimento de qualidade. Trabalhamos com acessórios, celulares, películas, fones e bikes elétricas para facilitar o dia a dia dos nossos clientes.
              </p>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">Falar com a Ramon →</a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { num: "01", t: "Qualidade garantida",    d: "Trabalhamos apenas com produtos de procedência e qualidade comprovada." },
                { num: "02", t: "Atendimento humano",     d: "Equipe real, pronta para tirar suas dúvidas com atenção." },
                { num: "03", t: "Variedade completa",     d: "Do celular ao acessório, temos tudo em um único lugar." },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(26,110,255,.08)", border: "1px solid rgba(26,110,255,.2)", fontSize: 10, fontWeight: 900, color: "var(--blue-lt)" }}>{item.num}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{item.t}</div>
                    <p style={{ fontSize: 12, color: "var(--t2)", lineHeight: 1.6 }}>{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA WHATSAPP ────────────────────────────────── */}
      <section style={{ padding: "80px 24px 100px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div className="reveal cta-box" style={{ background: "rgba(26,110,255,.05)", border: "1px solid rgba(26,110,255,.2)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center top, rgba(26,110,255,.1) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div className="badge" style={{ marginBottom: 24 }}>Fale com a gente</div>
            <h2 style={{ fontSize: "clamp(24px,5vw,44px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>
              Quer saber se temos<br /><span className="blue-text">o produto que você procura?</span>
            </h2>
            <p style={{ fontSize: 16, color: "var(--t2)", lineHeight: 1.7, marginBottom: 36 }}>
              Fale agora com a equipe da Ramon e consulte preços, modelos disponíveis e promoções da semana.
            </p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-wa" style={{ fontSize: 16, padding: "18px 40px" }}>
              💬 Falar com a Ramon no WhatsApp
            </a>
            <p style={{ marginTop: 20, fontSize: 12, color: "var(--t3)" }}>Respondemos em poucos minutos · Sem compromisso</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,.05)", padding: "40px 24px", position: "relative", zIndex: 1 }}>
        <div className="footer-flex">
          <div>
            <img src="/logo.png" alt="Ramon Acessórios" style={{ height: 32, width: "auto", objectFit: "contain", marginBottom: 10 }} />
            <p style={{ fontSize: 12, color: "var(--t3)", maxWidth: 280, lineHeight: 1.6 }}>Tecnologia, acessórios e bikes elétricas para o seu dia a dia.</p>
          </div>
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap", alignItems: "center" }}>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 13, color: "var(--t2)", textDecoration: "none", fontWeight: 600, transition: "color .15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#25D366")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--t2)")}>💬 WhatsApp</a>
            <a href={IG_LINK} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 13, color: "var(--t2)", textDecoration: "none", fontWeight: 600, transition: "color .15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--blue-lt)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--t2)")}>📸 Instagram</a>
          </div>
          <p style={{ fontSize: 12, color: "var(--t3)" }}>© {new Date().getFullYear()} Ramon Acessórios. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}
