"use client";
const WA      = "554192660832";
const WA_LINK = `https://wa.me/${WA}?text=Olá! Vim pelo site e quero saber sobre os produtos.`;
const IG_LINK = "https://www.instagram.com/ramonacessoriosparacelular/";

export default function Footer() {
  return (
    <footer style={{ background: "#080810", borderTop: "1px solid rgba(255,255,255,.07)", padding: "48px 24px 36px", position: "relative", zIndex: 1 }}>
      <div className="footer-flex">
        <div>
          <img src="/logo.png" alt="Ramon Acessórios" style={{ height: 48, width: "auto", objectFit: "contain", marginBottom: 12 }} />
          <p style={{ fontSize: 12, color: "rgba(255,255,255,.4)", maxWidth: 280, lineHeight: 1.7 }}>
            Tecnologia, acessórios e bikes elétricas para o seu dia a dia.
          </p>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="btn-wa" style={{ fontSize: 13, padding: "11px 20px" }}>
            💬 WhatsApp
          </a>
          <a href={IG_LINK} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 13, color: "rgba(255,255,255,.55)", textDecoration: "none", fontWeight: 600, padding: "11px 18px", border: "1px solid rgba(255,255,255,.15)", borderRadius: 10, transition: "all .2s", display: "inline-flex", alignItems: "center", gap: 6 }}
            onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,.55)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.15)"; }}>
            📸 Instagram
          </a>
          <a href="/produtos"
            style={{ fontSize: 13, color: "rgba(255,255,255,.55)", textDecoration: "none", fontWeight: 600, padding: "11px 18px", border: "1px solid rgba(255,255,255,.15)", borderRadius: 10, transition: "all .2s", display: "inline-flex", alignItems: "center", gap: 6 }}
            onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,.55)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.15)"; }}>
            🛍️ Produtos
          </a>
        </div>

        <p style={{ fontSize: 12, color: "rgba(255,255,255,.3)" }}>
          © {new Date().getFullYear()} Ramon Acessórios. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
