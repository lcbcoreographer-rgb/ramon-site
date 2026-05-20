"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function FalhaContent() {
  const params    = useSearchParams();
  const ref       = params.get("external_reference");

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 24px", textAlign: "center",
      background: "var(--bg)",
    }}>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "rgba(239,83,80,.6)", filter: "blur(200px)", opacity: .05, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 500 }}>
        <div style={{
          width: 100, height: 100, borderRadius: "50%",
          background: "rgba(239,83,80,.1)", border: "1px solid rgba(239,83,80,.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 48, margin: "0 auto 28px",
          boxShadow: "0 0 60px rgba(239,83,80,.1)",
        }}>
          ❌
        </div>

        <div style={{ marginBottom: 16, display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(239,83,80,.08)", border: "1px solid rgba(239,83,80,.2)", borderRadius: 99, padding: "6px 16px", fontSize: 11, fontWeight: 800, color: "#ef5350", textTransform: "uppercase", letterSpacing: ".07em" }}>
          Pagamento não aprovado
        </div>

        <h1 style={{ fontSize: "clamp(26px,5vw,44px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 16, letterSpacing: "-.04em" }}>
          Ocorreu um problema
        </h1>

        <p style={{ fontSize: 16, color: "var(--t2)", lineHeight: 1.75, marginBottom: 8 }}>
          Seu pagamento não foi processado. Verifique os dados do cartão ou tente outro método de pagamento.
        </p>

        {ref && (
          <p style={{ fontSize: 12, color: "var(--t3)", marginBottom: 32 }}>
            Referência: <span style={{ color: "var(--t2)", fontWeight: 700 }}>{ref}</span>
          </p>
        )}

        <div style={{ marginBottom: 32, padding: "16px 20px", background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 12, fontSize: 13, color: "var(--t2)", lineHeight: 1.7, textAlign: "left" }}>
          <strong style={{ color: "#fff", display: "block", marginBottom: 8 }}>Possíveis causas:</strong>
          <ul style={{ paddingLeft: 18, display: "flex", flexDirection: "column", gap: 4 }}>
            <li>Dados do cartão incorretos</li>
            <li>Saldo ou limite insuficiente</li>
            <li>Cartão bloqueado pelo banco</li>
            <li>Transação recusada pelo emissor</li>
          </ul>
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/checkout" className="btn-primary">Tentar novamente</Link>
          <Link href="/produtos" className="btn-ghost">Ver produtos</Link>
        </div>
      </div>
    </div>
  );
}

export default function FalhaPage() {
  return (
    <Suspense fallback={null}>
      <FalhaContent />
    </Suspense>
  );
}
