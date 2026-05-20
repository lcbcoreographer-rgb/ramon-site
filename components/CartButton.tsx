"use client";
import { useCart } from "@/context/CartContext";

export default function CartButton({ style }: { style?: React.CSSProperties }) {
  const { count, setOpen } = useCart();
  return (
    <button
      onClick={() => setOpen(true)}
      aria-label="Abrir carrinho"
      style={{
        position: "relative",
        background: "rgba(26,110,255,.08)",
        border: "1px solid rgba(26,110,255,.2)",
        borderRadius: 10,
        padding: "9px 14px",
        cursor: "pointer",
        color: "#fff",
        fontSize: 18,
        display: "flex",
        alignItems: "center",
        transition: "background .2s, border-color .2s",
        fontFamily: "inherit",
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "rgba(26,110,255,.15)";
        e.currentTarget.style.borderColor = "rgba(26,110,255,.4)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "rgba(26,110,255,.08)";
        e.currentTarget.style.borderColor = "rgba(26,110,255,.2)";
      }}
    >
      🛒
      {count > 0 && (
        <span style={{
          position: "absolute",
          top: -6, right: -6,
          background: "var(--blue)",
          color: "#fff",
          fontSize: 10,
          fontWeight: 800,
          width: 18, height: 18,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 1,
          boxShadow: "0 0 10px rgba(26,110,255,.5)",
        }}>
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}
