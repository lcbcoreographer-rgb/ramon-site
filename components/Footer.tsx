"use client";
const WA      = "5500000000000";
const WA_LINK = `https://wa.me/${WA}?text=Olá! Vim pelo site e quero saber sobre os produtos.`;
const IG_LINK = "https://instagram.com/ramon_acessorios";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(0,0,0,.07)", padding: "40px 24px", position: "relative", zIndex: 1, background: "var(--bg2)" }}>
      <div className="footer-flex">
        <div>
          <img src="/logo.png" alt="Ramon Acessórios" style={{ height: 48, width: "auto", objectFit: "contain", marginBottom: 10 }} />
          <p style={{ fontSize: 12, color: "var(--t3)", maxWidth: 280, lineHeight: 1.6 }}>
            Tecnologia, acessórios e bikes elétricas para o seu dia a dia.
          </p>
        </div>
        <div style={{ display: "flex", gap: 28, flexWrap: "wrap", alignItems: "center" }}>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 13, color: "var(--t2)", textDecoration: "none", fontWeight: 600, transition: "color .15s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#25D366")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--t2)")}>
            💬 WhatsApp
          </a>
          <a href={IG_LINK} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 13, color: "var(--t2)", textDecoration: "none", fontWeight: 600, transition: "color .15s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--blue-lt)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--t2)")}>
            📸 Instagram
          </a>
          <a href="/checkout"
            style={{ fontSize: 13, color: "var(--t2)", textDecoration: "none", fontWeight: 600, transition: "color .15s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--blue-lt)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--t2)")}>
            🛒 Checkout
          </a>
        </div>
        <p style={{ fontSize: 12, color: "var(--t3)" }}>
          © {new Date().getFullYear()} Ramon Acessórios. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
