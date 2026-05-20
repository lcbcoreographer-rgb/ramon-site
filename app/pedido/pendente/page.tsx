"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function PendenteContent() {
  const params   = useSearchParams();
  const ref      = params.get("external_reference");
  const paymentId = params.get("payment_id");

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 24px", textAlign: "center",
      background: "var(--bg)",
    }}>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "rgba(255,152,0,.5)", filter: "blur(200px)", opacity: .06, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 500 }}>
        <div style={{
          width: 100, height: 100, borderRadius: "50%",
          background: "rgba(255,152,0,.1)", border: "1px solid rgba(255,152,0,.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 48, margin: "0 auto 28px",
          boxShadow: "0 0 60px rgba(255,152,0,.1)",
        }}>
          ⏳
        </div>

        <div style={{ marginBottom: 16, display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,152,0,.08)", border: "1px solid rgba(255,152,0,.2)", borderRadius: 99, padding: "6px 16px", fontSize: 11, fontWeight: 800, color: "#FF9800", textTransform: "uppercase", letterSpacing: ".07em" }}>
          Pagamento pendente
        </div>

        <h1 style={{ fontSize: "clamp(26px,5vw,44px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 16, letterSpacing: "-.04em" }}>
          Aguardando pagamento
        </h1>

        <p style={{ fontSize: 16, color: "var(--t2)", lineHeight: 1.75, marginBottom: 8 }}>
          Seu pedido foi criado e está aguardando a confirmação do pagamento. Isso pode levar alguns minutos.
        </p>

        <div style={{ marginBottom: 8, padding: "14px 18px", background: "rgba(255,152,0,.06)", border: "1px solid rgba(255,152,0,.15)", borderRadius: 12, fontSize: 13, color: "#FF9800", lineHeight: 1.6 }}>
          Se você pagou via boleto ou PIX, o pagamento pode demorar até <strong>1-2 dias úteis</strong> para ser confirmado.
        </div>

        {ref && (
          <p style={{ fontSize: 12, color: "var(--t3)", margin: "12px 0 4px" }}>
            Referência: <span style={{ color: "var(--t2)", fontWeight: 700 }}>{ref}</span>
          </p>
        )}
        {paymentId && (
          <p style={{ fontSize: 12, color: "var(--t3)", marginBottom: 32 }}>
            ID do pagamento: <span style={{ color: "var(--t2)", fontWeight: 700 }}>{paymentId}</span>
          </p>
        )}

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
          <Link href="/produtos" className="btn-primary">Continuar comprando</Link>
          <Link href="/" className="btn-ghost">Voltar ao início</Link>
        </div>
      </div>
    </div>
  );
}

export default function PendentePage() {
  return (
    <Suspense fallback={null}>
      <PendenteContent />
    </Suspense>
  );
}
