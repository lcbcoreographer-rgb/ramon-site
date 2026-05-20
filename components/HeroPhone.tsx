"use client";
import { useEffect, useState } from "react";

const MESSAGES = [
  { from: "client", text: "Olá! Vocês têm iPhone 15 Pro disponível? 📱",           delay: 400  },
  { from: "store",  text: "Oi! Temos sim 😊 Qual cor você prefere?",               delay: 1400 },
  { from: "client", text: "Titânio Natural, 256GB por favor!",                      delay: 2600 },
  { from: "store",  text: "Perfeito! Acabei de separar o seu 🎉",                   delay: 3800 },
  { from: "store",  text: "Entrega amanhã com frete grátis ✅",                     delay: 4800 },
  { from: "client", text: "Recebi! É o MELHOR iPhone que já tive. Atendimento incrível, obrigado!! ⭐⭐⭐⭐⭐", delay: 6200 },
];

export default function HeroPhone() {
  const [visible, setVisible] = useState<number[]>([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    MESSAGES.forEach((msg, i) => {
      if (msg.from === "store") {
        setTimeout(() => setTyping(true),  msg.delay - 700);
        setTimeout(() => setTyping(false), msg.delay - 100);
      }
      setTimeout(() => setVisible(prev => [...prev, i]), msg.delay);
    });
  }, []);

  return (
    <div style={{
      width: 270, height: 540,
      borderRadius: 44,
      background: "linear-gradient(170deg, #1A1A2E 0%, #0D0D1A 100%)",
      border: "1px solid rgba(255,255,255,.12)",
      boxShadow: "0 0 0 6px #0A0A14, 0 0 0 7px rgba(255,255,255,.06), 0 40px 80px rgba(0,0,0,.5), 0 0 60px rgba(26,110,255,.08)",
      display: "flex", flexDirection: "column", overflow: "hidden",
      position: "relative",
      animation: "phone-hero 6s ease-in-out infinite",
    }}>
      {/* Notch */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 100, height: 28, background: "#0A0A14", borderRadius: "0 0 18px 18px", zIndex: 10 }} />

      {/* WhatsApp header */}
      <div style={{ background: "linear-gradient(135deg, #075E54, #128C7E)", padding: "36px 14px 12px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden", border: "2px solid rgba(255,255,255,.3)" }}>
          <img src="/logo.png" alt="Ramon" style={{ width: "100%", height: "100%", objectFit: "contain", padding: 4 }} />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", lineHeight: 1 }}>Ramon Acessórios</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,.7)", marginTop: 2 }}>
            {typing ? "digitando..." : "online"}
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 14 }}>
          <span style={{ fontSize: 14, color: "rgba(255,255,255,.7)" }}>📞</span>
          <span style={{ fontSize: 14, color: "rgba(255,255,255,.7)" }}>⋮</span>
        </div>
      </div>

      {/* Chat area */}
      <div style={{
        flex: 1, overflowY: "hidden", padding: "12px 10px 8px",
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,.018) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        backgroundColor: "#0F1923",
        display: "flex", flexDirection: "column", gap: 6,
      }}>
        {MESSAGES.map((msg, i) => (
          visible.includes(i) ? (
            <div key={i} style={{
              display: "flex",
              justifyContent: msg.from === "client" ? "flex-end" : "flex-start",
              animation: "fade-up .3s ease both",
            }}>
              <div style={{
                maxWidth: "78%",
                background: msg.from === "client"
                  ? "#1a7a3c"
                  : "rgba(255,255,255,.11)",
                color: "#fff",
                fontSize: 10.5,
                lineHeight: 1.45,
                borderRadius: msg.from === "client" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                padding: "8px 10px",
                border: msg.from === "store" ? "1px solid rgba(255,255,255,.07)" : "none",
              }}>
                {msg.text}
                <span style={{ fontSize: 9, opacity: .6, display: "block", textAlign: "right", marginTop: 2 }}>
                  {msg.from === "client" ? "✓✓" : ""}{" "}agora
                </span>
              </div>
            </div>
          ) : null
        ))}

        {/* Typing indicator */}
        {typing && (
          <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 12px", background: "rgba(255,255,255,.07)", borderRadius: "14px 14px 14px 4px", width: "fit-content", border: "1px solid rgba(255,255,255,.07)" }}>
            {[0,1,2].map(j => (
              <div key={j} style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,.5)", animation: `blink 1s ease-in-out infinite ${j * 0.2}s` }} />
            ))}
          </div>
        )}
      </div>

      {/* Input bar */}
      <div style={{ background: "#1A1A2E", padding: "8px 10px", display: "flex", alignItems: "center", gap: 8, borderTop: "1px solid rgba(255,255,255,.06)", flexShrink: 0 }}>
        <div style={{ flex: 1, background: "rgba(255,255,255,.06)", borderRadius: 20, padding: "7px 12px", fontSize: 10, color: "rgba(255,255,255,.3)" }}>
          Mensagem...
        </div>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>
          🎤
        </div>
      </div>

      {/* Home bar */}
      <div style={{ background: "#0D0D1A", padding: "6px 0 10px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: 100, height: 4, borderRadius: 99, background: "rgba(255,255,255,.2)" }} />
      </div>
    </div>
  );
}
