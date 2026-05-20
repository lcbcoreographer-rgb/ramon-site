import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "Ramon Acessórios — Celulares, Acessórios e Bikes Elétricas",
  description: "Na Ramon Acessórios você encontra celulares, acessórios, películas, fones, bikes elétricas e muito mais com atendimento rápido e personalizado.",
  icons: { icon: "/logo.png", apple: "/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          <SmoothScrollProvider>
            {children}
            <CartDrawer />
          </SmoothScrollProvider>
        </CartProvider>
      </body>
    </html>
  );
}
