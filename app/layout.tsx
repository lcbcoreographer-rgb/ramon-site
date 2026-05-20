import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CartDrawer from "@/components/CartDrawer";
import Toast from "@/components/Toast";

export const metadata: Metadata = {
  title: "Ramon Acessórios — Celulares, Acessórios e Bikes Elétricas",
  description: "Na Ramon Acessórios você encontra celulares, acessórios, películas, fones, bikes elétricas e muito mais com atendimento rápido e personalizado.",
  icons: { icon: "/logo.png", apple: "/logo.png" },
};

const WA_LINK = "https://wa.me/554192660832?text=Olá! Vim pelo site e quero saber sobre os produtos.";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          <SmoothScrollProvider>
            {children}
            <CartDrawer />
            <Toast />
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="floating-wa" title="Falar no WhatsApp" aria-label="WhatsApp">
              💬
            </a>
          </SmoothScrollProvider>
        </CartProvider>
      </body>
    </html>
  );
}
