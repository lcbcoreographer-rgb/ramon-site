"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import { formatBRL } from "@/data/products";

interface FreteAddress {
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
}

interface FreteOption {
  id: string;
  name: string;
  price: number;
  days: number;
  free: boolean;
}

export default function CheckoutPage() {
  const { items, total, clear } = useCart();

  const [name,       setName]       = useState("");
  const [email,      setEmail]      = useState("");
  const [phone,      setPhone]      = useState("");
  const [cep,        setCep]        = useState("");
  const [address,    setAddress]    = useState<FreteAddress | null>(null);
  const [number,     setNumber]     = useState("");
  const [complement, setComplement] = useState("");
  const [freteOpts,  setFreteOpts]  = useState<FreteOption[]>([]);
  const [frete,      setFrete]      = useState<FreteOption | null>(null);
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError,   setCepError]   = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState("");

  const orderTotal = total + (frete?.price || 0);

  const handleCepChange = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 8);
    const fmt = digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
    setCep(fmt);
    if (digits.length === 8) lookupCep(digits);
  };

  const lookupCep = async (digits: string) => {
    setCepLoading(true);
    setCepError("");
    setAddress(null);
    setFreteOpts([]);
    setFrete(null);
    try {
      const res = await fetch("/api/frete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cep: digits, total }),
      });
      const data = await res.json();
      if (data.error) {
        setCepError("CEP não encontrado. Verifique e tente novamente.");
      } else {
        setAddress(data.address);
        setFreteOpts(data.options);
        setFrete(data.options[0]);
      }
    } catch {
      setCepError("Erro ao consultar CEP. Tente novamente.");
    }
    setCepLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !frete) {
      setError("Por favor preencha o CEP e selecione a opção de frete.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const mpItems = items.map(i => ({
        name: i.product.name + (i.variant ? ` (${i.variant})` : ""),
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.image,
      }));
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: mpItems,
          payer: { name, email, phone },
          shipping: {
            cep: cep.replace(/\D/g, ""),
            street: address.logradouro || "",
            number,
            complement,
            city: address.localidade,
            state: address.uf,
          },
          freteOption: frete,
        }),
      });
      const data = await res.json();
      if (data.url) {
        clear();
        window.location.href = data.url;
      } else {
        setError(data.error || "Erro ao processar pagamento. Tente novamente.");
      }
    } catch {
      setError("Erro de conexão. Tente novamente.");
    }
    setSubmitting(false);
  };

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, textAlign: "center", padding: "0 24px", paddingTop: 68 }}>
          <div style={{ fontSize: 60 }}>🛒</div>
          <h1 style={{ fontSize: 26, fontWeight: 900 }}>Seu carrinho está vazio</h1>
          <p style={{ color: "var(--t2)", fontSize: 14 }}>Adicione produtos antes de finalizar a compra.</p>
          <Link href="/produtos" className="btn-primary" style={{ marginTop: 8 }}>Ver produtos</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(255,255,255,.016) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="orb-a" style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "var(--blue)", filter: "blur(130px)", opacity: .05, top: -150, left: -100 }} />
      </div>

      <Navbar />

      <div style={{ paddingTop: 88, minHeight: "100vh", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "32px 24px 80px" }}>

          {/* Page title */}
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontSize: "clamp(22px,4vw,32px)", fontWeight: 900, letterSpacing: "-.04em" }}>Finalizar compra</h1>
            <p style={{ fontSize: 13, color: "var(--t2)", marginTop: 6 }}>Preencha seus dados e pague com segurança pelo Mercado Pago</p>
          </div>

          <div className="checkout-layout">
            {/* ── FORM ── */}
            <form onSubmit={handleSubmit}>

              {/* Dados pessoais */}
              <div className="form-card">
                <h2 className="form-card-title">👤 Dados pessoais</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div className="form-field" style={{ gridColumn: "1 / -1" }}>
                    <label className="form-label">Nome completo *</label>
                    <input required value={name} onChange={e => setName(e.target.value)}
                      className="form-input" placeholder="João da Silva" />
                  </div>
                  <div className="form-field">
                    <label className="form-label">E-mail *</label>
                    <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
                      className="form-input" placeholder="joao@email.com" />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Telefone / WhatsApp *</label>
                    <input required value={phone} onChange={e => setPhone(e.target.value)}
                      className="form-input" placeholder="(11) 99999-9999" />
                  </div>
                </div>
              </div>

              {/* Endereço */}
              <div className="form-card">
                <h2 className="form-card-title">📍 Endereço de entrega</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div className="form-field">
                    <label className="form-label">CEP *</label>
                    <div style={{ position: "relative" }}>
                      <input required value={cep} onChange={e => handleCepChange(e.target.value)}
                        className="form-input" placeholder="00000-000" maxLength={9} />
                      {cepLoading && (
                        <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: "var(--t3)" }}>
                          Buscando...
                        </span>
                      )}
                    </div>
                    {cepError && <span style={{ fontSize: 11, color: "#ef5350" }}>{cepError}</span>}
                  </div>

                  {address && (
                    <>
                      <div className="form-field">
                        <label className="form-label">Logradouro</label>
                        <input value={address.logradouro || ""} readOnly className="form-input" style={{ opacity: .7 }} />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Número *</label>
                        <input required value={number} onChange={e => setNumber(e.target.value)}
                          className="form-input" placeholder="123" />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Complemento</label>
                        <input value={complement} onChange={e => setComplement(e.target.value)}
                          className="form-input" placeholder="Apto, bloco... (opcional)" />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Bairro</label>
                        <input value={address.bairro || ""} readOnly className="form-input" style={{ opacity: .7 }} />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Cidade / UF</label>
                        <input value={`${address.localidade || ""} / ${address.uf || ""}`} readOnly className="form-input" style={{ opacity: .7 }} />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Frete */}
              {freteOpts.length > 0 && (
                <div className="form-card">
                  <h2 className="form-card-title">🚚 Opção de entrega</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {freteOpts.map(opt => (
                      <div key={opt.id} onClick={() => setFrete(opt)}
                        className={`frete-option${frete?.id === opt.id ? " selected" : ""}`}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", border: frete?.id === opt.id ? "5px solid var(--blue-lt)" : "2px solid rgba(255,255,255,.2)", flexShrink: 0, transition: "border .15s" }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 700 }}>{opt.name}</div>
                          <div style={{ fontSize: 12, color: "var(--t2)", marginTop: 2 }}>
                            Prazo estimado: {opt.days} dias úteis
                          </div>
                        </div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: opt.free ? "#4CAF50" : "#fff" }}>
                          {opt.free ? "Grátis" : formatBRL(opt.price)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {error && (
                <div style={{ background: "rgba(239,83,80,.08)", border: "1px solid rgba(239,83,80,.3)", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#ef5350", marginBottom: 16 }}>
                  {error}
                </div>
              )}

              <button type="submit" disabled={submitting || !address || !frete}
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center", fontSize: 16, padding: "17px 24px", borderRadius: 12, opacity: (!address || !frete) ? 0.5 : 1 }}>
                {submitting ? "Processando..." : `🔒 Pagar ${formatBRL(orderTotal)} com Mercado Pago`}
              </button>
              <p style={{ textAlign: "center", fontSize: 11, color: "var(--t3)", marginTop: 12 }}>
                Você será redirecionado ao Mercado Pago para concluir o pagamento com segurança.
              </p>
            </form>

            {/* ── ORDER SUMMARY ── */}
            <div className="checkout-summary">
              <div className="form-card" style={{ position: "sticky", top: 88, marginBottom: 0 }}>
                <h2 className="form-card-title">🛒 Resumo do pedido</h2>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                  {items.map(item => (
                    <div key={`${item.product.id}-${item.variant}`} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{ width: 52, height: 52, borderRadius: 10, background: item.product.imageBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 24 }}>
                        {item.product.image
                          ? <img src={item.product.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10 }} />
                          : item.product.emoji
                        }
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.product.name}</p>
                        {item.variant && <p style={{ fontSize: 11, color: "var(--t2)", marginTop: 2 }}>{item.variant}</p>}
                        <p style={{ fontSize: 11, color: "var(--t3)", marginTop: 2 }}>Qtd: {item.quantity}</p>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{formatBRL(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="divider" style={{ marginBottom: 16 }} />

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                    <span style={{ color: "var(--t2)" }}>Subtotal</span>
                    <span>{formatBRL(total)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                    <span style={{ color: "var(--t2)" }}>Frete</span>
                    <span style={{ color: frete?.free ? "#4CAF50" : "#fff" }}>
                      {!frete ? "—" : frete.free ? "Grátis" : formatBRL(frete.price)}
                    </span>
                  </div>
                  <div className="divider" style={{ margin: "4px 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, fontWeight: 900 }}>
                    <span>Total</span>
                    <span style={{ color: "var(--blue-lt)" }}>{formatBRL(orderTotal)}</span>
                  </div>
                </div>

                {/* Trust badges */}
                <div style={{ marginTop: 20, padding: "14px", background: "rgba(76,175,80,.06)", border: "1px solid rgba(76,175,80,.15)", borderRadius: 10 }}>
                  <div style={{ fontSize: 12, color: "#4CAF50", fontWeight: 700, marginBottom: 6 }}>🔒 Compra 100% segura</div>
                  <p style={{ fontSize: 11, color: "var(--t3)", lineHeight: 1.6 }}>Seus dados são criptografados e protegidos pelo Mercado Pago.</p>
                </div>

                <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["💳 Cartão", "🏦 PIX", "📄 Boleto"].map(m => (
                    <span key={m} style={{ fontSize: 11, padding: "4px 10px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 6, color: "var(--t2)" }}>{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
