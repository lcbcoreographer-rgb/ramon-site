"use client";
import { useCart } from "@/context/CartContext";

interface Props {
  style?: React.CSSProperties;
  dark?: boolean;
}

export default function CartButton({ style, dark }: Props) {
  const { count, setOpen } = useCart();

  const bg     = dark ? "rgba(255,255,255,.08)"  : "rgba(26,110,255,.07)";
  const border = dark ? "rgba(255,255,255,.18)"  : "rgba(26,110,255,.18)";
  const bgHov  = dark ? "rgba(255,255,255,.15)"  : "rgba(26,110,255,.12)";
  const bdHov  = dark ? "rgba(255,255,255,.35)"  : "rgba(26,110,255,.35)";

  return (
    <button
      onClick={() => setOpen(true)}
      aria-label="Abrir carrinho"
      style={{
        position: "relative",
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 10,
        padding: "9px 14px",
        cursor: "pointer",
        color: dark ? "#fff" : "var(--text)",
        fontSize: 18,
        display: "flex",
        alignItems: "center",
        transition: "background .2s, border-color .2s",
        fontFamily: "inherit",
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = bgHov;
        e.currentTarget.style.borderColor = bdHov;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = bg;
        e.currentTarget.style.borderColor = border;
      }}
    >
      🛒
      {count > 0 && (
        <span style={{
          position: "absolute", top: -6, right: -6,
          background: "var(--blue)", color: "#fff",
          fontSize: 10, fontWeight: 800,
          width: 18, height: 18, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          lineHeight: 1, boxShadow: "0 0 10px rgba(26,110,255,.5)",
        }}>
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}
