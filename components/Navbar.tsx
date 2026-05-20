"use client";
import Link from "next/link";
import { useState } from "react";
import CartButton from "./CartButton";

const WA      = "5500000000000";
const WA_LINK = `https://wa.me/${WA}?text=Olá! Vim pelo site e quero saber sobre os produtos.`;

const NAV_LINKS: [string, string][] = [
  ["Início",   "/"],
  ["Produtos", "/produtos"],
];

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(244,246,255,.94)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,0,0,.07)",
      }} className="nav-wrap">
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img src="/logo.png" alt="Ramon Acessórios" style={{ height: 52, width: "auto", objectFit: "contain" }} />
        </Link>

        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {NAV_LINKS.map(([label, href]) => (
            <Link key={label} href={href}
              style={{ fontSize: 13, fontWeight: 500, color: "var(--t2)", textDecoration: "none", transition: "color .15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--t2)")}
            >{label}</Link>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <CartButton />
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="btn-primary hide-mobile" style={{ fontSize: 13, padding: "10px 20px" }}>
            💬 WhatsApp
          </a>
          <button className="show-mobile" onClick={() => setMobileMenu(v => !v)}
            style={{ background: "none", border: "1px solid rgba(255,255,255,.12)", borderRadius: 8, padding: "8px 12px", cursor: "pointer", color: "#fff", fontSize: 18, fontFamily: "inherit" }}>
            {mobileMenu ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {mobileMenu && (
        <div style={{
          position: "fixed", top: 68, left: 0, right: 0, zIndex: 99,
          background: "rgba(244,246,255,.98)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,0,0,.07)",
          padding: "24px 24px 32px", display: "flex", flexDirection: "column",
        }}>
          {NAV_LINKS.map(([label, href]) => (
            <Link key={label} href={href} onClick={() => setMobileMenu(false)}
              style={{ fontSize: 16, fontWeight: 600, color: "var(--t2)", textDecoration: "none", padding: "16px 0", borderBottom: "1px solid rgba(0,0,0,.06)" }}>
              {label}
            </Link>
          ))}
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="btn-wa" onClick={() => setMobileMenu(false)}
            style={{ marginTop: 20, justifyContent: "center" }}>
            💬 Chamar no WhatsApp
          </a>
        </div>
      )}
    </>
  );
}
