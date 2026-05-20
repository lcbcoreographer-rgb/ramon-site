"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SucessoContent() {
  const params = useSearchParams();
  const paymentId  = params.get("payment_id");
  const ref        = params.get("external_reference");

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 24px", textAlign: "center",
      background: "var(--bg)",
    }}>
      {/* Glowing orb */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "rgba(76,175,80,.6)", filter: "blur(200px)", opacity: .07, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 500 }}>
        {/* Icon */}
        <div style={{
          width: 100, height: 100, borderRadius: "50%",
          background: "rgba(76,175,80,.12)", border: "1px solid rgba(76,175,80,.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 48, margin: "0 auto 28px",
          boxShadow: "0 0 60px rgba(76,175,80,.15)",
        }}>
          ✅
        </div>

        <div style={{ marginBottom: 16, display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(76,175,80,.08)", border: "1px solid rgba(76,175,80,.2)", borderRadius: 99, padding: "6px 16px", fontSize: 11, fontWeight: 800, color: "#4CAF50", textTransform: "uppercase", letterSpacing: ".07em" }}>
          Pagamento aprovado
        </div>

        <h1 style={{ fontSize: "clamp(26px,5vw,44px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 16, letterSpacing: "-.04em" }}>
          Pedido confirmado!
        </h1>

        <p style={{ fontSize: 16, color: "var(--t2)", lineHeight: 1.75, marginBottom: 8 }}>
          Seu pagamento foi aprovado com sucesso. Entraremos em contato pelo WhatsApp para confirmar a entrega.
        </p>

        {ref && (
          <p style={{ fontSize: 12, color: "var(--t3)", marginBottom: 8 }}>
            Referência do pedido: <span style={{ color: "var(--t2)", fontWeight: 700 }}>{ref}</span>
          </p>
        )}
        {paymentId && (
          <p style={{ fontSize: 12, color: "var(--t3)", marginBottom: 32 }}>
            ID do pagamento: <span style={{ color: "var(--t2)", fontWeight: 700 }}>{paymentId}</span>
          </p>
        )}

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 32 }}>
          <Link href="/produtos" className="btn-primary">Continuar comprando</Link>
          <Link href="/" className="btn-ghost">Voltar ao início</Link>
        </div>
      </div>
    </div>
  );
}

export default function SucessoPage() {
  return (
    <Suspense fallback={null}>
      <SucessoContent />
    </Suspense>
  );
}
