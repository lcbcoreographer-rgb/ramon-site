export interface Variant { name: string; options: string[] }

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  details: string;
  price: number;
  priceFrom?: number;
  emoji: string;
  imageBg: string;
  image?: string;        // real image path when available
  stock: number;
  freeShipping: boolean;
  maxInstallments: number;
  featured: boolean;
  variants?: Variant[];
  tags: string[];
}

export const CATEGORIES = [
  { id: "todos",        label: "Todos",            icon: "🛍️" },
  { id: "celulares",    label: "Celulares",         icon: "📱" },
  { id: "fones",        label: "Fones de Ouvido",   icon: "🎧" },
  { id: "peliculas",    label: "Películas",          icon: "🛡️" },
  { id: "acessorios",   label: "Acessórios",         icon: "🔌" },
  { id: "garrafinhas",  label: "Garrafinhas",        icon: "💧" },
  { id: "bikes",        label: "Bikes Elétricas",    icon: "⚡" },
];

export const PRODUCTS: Product[] = [
  // ── CELULARES ───────────────────────────────────────
  {
    id: "iphone-15-pro", slug: "iphone-15-pro",
    name: "iPhone 15 Pro", brand: "Apple", category: "celulares",
    description: "Chip A17 Pro, câmera 48MP com zoom óptico 3x, carcaça de titânio.",
    details: "Tela Super Retina XDR 6,1\". Chip A17 Pro. Câmera principal 48MP. Zoom óptico 3x. Dynamic Island. USB-C. iOS 17.",
    price: 7999, priceFrom: 8499,
    emoji: "📱", imageBg: "linear-gradient(135deg,#030814 0%,#0D2A5E 100%)",
    stock: 5, freeShipping: true, maxInstallments: 12, featured: true,
    variants: [
      { name: "Cor", options: ["Titânio Natural","Titânio Azul","Titânio Branco","Titânio Preto"] },
      { name: "Armazenamento", options: ["128GB","256GB","512GB","1TB"] },
    ],
    tags: ["iphone","apple","celular","smartphone","premium"],
  },
  {
    id: "iphone-14", slug: "iphone-14",
    name: "iPhone 14", brand: "Apple", category: "celulares",
    description: "Chip A15 Bionic, câmera 12MP, Modo Ação para vídeos estabilizados.",
    details: "Tela Super Retina XDR 6,1\". Chip A15 Bionic. Câmera 12MP. Modo Emergência via Satélite. iOS 16.",
    price: 4999, priceFrom: 5499,
    emoji: "📱", imageBg: "linear-gradient(135deg,#030A1A 0%,#0A1F45 100%)",
    stock: 8, freeShipping: true, maxInstallments: 12, featured: true,
    variants: [
      { name: "Cor", options: ["Meia-Noite","Estelar","Azul","Roxo","Vermelho"] },
      { name: "Armazenamento", options: ["128GB","256GB","512GB"] },
    ],
    tags: ["iphone","apple","celular","smartphone"],
  },
  {
    id: "iphone-13", slug: "iphone-13",
    name: "iPhone 13", brand: "Apple", category: "celulares",
    description: "Chip A15 Bionic, câmera dupla 12MP com Modo Cinema.",
    details: "Tela Super Retina XDR 6,1\". Chip A15 Bionic. Câmera dupla 12MP. Modo Noturno. iOS 15.",
    price: 3799,
    emoji: "📱", imageBg: "linear-gradient(135deg,#040C20 0%,#091830 100%)",
    stock: 12, freeShipping: true, maxInstallments: 12, featured: false,
    variants: [
      { name: "Cor", options: ["Meia-Noite","Estelar","Azul","Rosa","Verde","Vermelho"] },
      { name: "Armazenamento", options: ["128GB","256GB","512GB"] },
    ],
    tags: ["iphone","apple","celular","smartphone"],
  },
  {
    id: "samsung-s24-ultra", slug: "samsung-s24-ultra",
    name: "Samsung Galaxy S24 Ultra", brand: "Samsung", category: "celulares",
    description: "S Pen incluso, câmera 200MP, zoom óptico 10x, Snapdragon 8 Gen 3.",
    details: "Tela Dynamic AMOLED 6,8\" 120Hz. Snapdragon 8 Gen 3. Câmera 200MP. Zoom óptico 10x. S Pen. 5G.",
    price: 7499, priceFrom: 7999,
    emoji: "📱", imageBg: "linear-gradient(135deg,#050D1C 0%,#0B2040 100%)",
    stock: 4, freeShipping: true, maxInstallments: 12, featured: true,
    variants: [
      { name: "Cor", options: ["Titanium Black","Titanium Gray","Titanium Violet","Titanium Yellow"] },
      { name: "Armazenamento", options: ["256GB","512GB","1TB"] },
    ],
    tags: ["samsung","galaxy","celular","smartphone","s24"],
  },
  {
    id: "samsung-a55", slug: "samsung-a55",
    name: "Samsung Galaxy A55", brand: "Samsung", category: "celulares",
    description: "Tela AMOLED 120Hz, câmera 50MP com OIS, bateria 5.000mAh.",
    details: "Tela Super AMOLED 6,6\" 120Hz. Exynos 1480. Câmera 50MP. Bateria 5.000mAh. 5G.",
    price: 2099,
    emoji: "📱", imageBg: "linear-gradient(135deg,#050B18 0%,#0A1B35 100%)",
    stock: 10, freeShipping: true, maxInstallments: 6, featured: false,
    variants: [
      { name: "Cor", options: ["Azul Glacial","Preto","Lilás","Amarelo"] },
      { name: "Armazenamento", options: ["128GB","256GB"] },
    ],
    tags: ["samsung","galaxy","celular","custo-beneficio"],
  },
  {
    id: "motorola-edge-50", slug: "motorola-edge-50",
    name: "Motorola Edge 50 Pro", brand: "Motorola", category: "celulares",
    description: "Display pOLED 144Hz, câmera 50MP com OIS, carregamento 125W.",
    details: "Tela pOLED 6,7\" 144Hz. Snapdragon 7s Gen 2. Câmera 50MP + OIS. Carregamento 125W. Bateria 4.500mAh.",
    price: 2499,
    emoji: "📱", imageBg: "linear-gradient(135deg,#04081A 0%,#091430 100%)",
    stock: 7, freeShipping: true, maxInstallments: 6, featured: false,
    variants: [
      { name: "Cor", options: ["Preto Lenhoso","Rosa Peônia","Lavanda"] },
    ],
    tags: ["motorola","celular","custo-beneficio"],
  },

  // ── FONES ───────────────────────────────────────────
  {
    id: "jbl-tune-510bt", slug: "jbl-tune-510bt",
    name: "JBL Tune 510BT", brand: "JBL", category: "fones",
    description: "Fone over-ear bluetooth, 40h de bateria, Pure Bass, dobr ável.",
    details: "Bluetooth 5.0. Bateria até 40h. Pure Bass Sound. Dobrável. Microfone integrado.",
    price: 229,
    emoji: "🎧", imageBg: "linear-gradient(135deg,#030A18 0%,#081A38 100%)",
    stock: 20, freeShipping: false, maxInstallments: 3, featured: true,
    variants: [{ name: "Cor", options: ["Preto","Branco","Azul"] }],
    tags: ["fone","jbl","bluetooth","wireless"],
  },
  {
    id: "airpods-3", slug: "airpods-3",
    name: "AirPods (3ª Geração)", brand: "Apple", category: "fones",
    description: "Áudio espacial personalizado, resistente ao suor e água IPX4.",
    details: "Áudio espacial personalizado com rastreamento dinâmico da cabeça. Chip H1. Resistência IPX4. Compatível com MagSafe.",
    price: 1199, priceFrom: 1299,
    emoji: "🎧", imageBg: "linear-gradient(135deg,#040C1E 0%,#0C2248 100%)",
    stock: 6, freeShipping: true, maxInstallments: 6, featured: true,
    tags: ["airpods","apple","fone","tws","sem-fio"],
  },
  {
    id: "fone-tws-basico", slug: "fone-tws-basico",
    name: "Fone TWS Intra-Auricular", brand: "Ramon", category: "fones",
    description: "Bluetooth 5.3, touch control, caixa de carregamento 300mAh.",
    details: "Bluetooth 5.3. Controle por toque. Bateria 4h + caixa 300mAh. Resistente a respingos IPX4.",
    price: 89,
    emoji: "🎧", imageBg: "linear-gradient(135deg,#030811 0%,#071525 100%)",
    stock: 30, freeShipping: false, maxInstallments: 2, featured: false,
    variants: [{ name: "Cor", options: ["Preto","Branco","Azul"] }],
    tags: ["fone","tws","bluetooth","básico"],
  },

  // ── PELÍCULAS ───────────────────────────────────────
  {
    id: "pelicula-iphone-15", slug: "pelicula-iphone-15",
    name: "Película 3D iPhone 15 Pro", brand: "Ramon", category: "peliculas",
    description: "Vidro temperado 9H, cobertura total, cola UV anti-bolhas. Kit com 2 unidades.",
    details: "Dureza 9H. Cobertura total 3D. Cola UV. Anti-impressão digital. Kit 2 películas + kit de limpeza. Instalamos na hora.",
    price: 39.90,
    emoji: "🛡️", imageBg: "linear-gradient(135deg,#040814 0%,#0A1830 100%)",
    stock: 50, freeShipping: false, maxInstallments: 1, featured: true,
    tags: ["pelicula","iphone","15","vidro","proteção"],
  },
  {
    id: "pelicula-samsung-s24", slug: "pelicula-samsung-s24",
    name: "Película 3D Samsung S24", brand: "Ramon", category: "peliculas",
    description: "Vidro temperado 9H, cobertura total da tela curva.",
    details: "Dureza 9H. Compatível com tela curva. Anti-choque. Kit 2 películas + kit de limpeza.",
    price: 34.90,
    emoji: "🛡️", imageBg: "linear-gradient(135deg,#030710 0%,#081424 100%)",
    stock: 50, freeShipping: false, maxInstallments: 1, featured: false,
    tags: ["pelicula","samsung","s24","vidro","proteção"],
  },
  {
    id: "pelicula-privacidade", slug: "pelicula-privacidade",
    name: "Película Privacidade iPhone", brand: "Ramon", category: "peliculas",
    description: "Antiespião, só visível de frente, vidro temperado 9H.",
    details: "Privacidade 180°. Dureza 9H. Anti-reflexo. Anti-impressão digital. Compatível iPhone 13/14/15.",
    price: 49.90,
    emoji: "🔒", imageBg: "linear-gradient(135deg,#050A18 0%,#0D1E40 100%)",
    stock: 35, freeShipping: false, maxInstallments: 1, featured: false,
    tags: ["pelicula","privacidade","antiespião","iphone"],
  },

  // ── ACESSÓRIOS ──────────────────────────────────────
  {
    id: "capa-iphone-15-magsafe", slug: "capa-iphone-15-magsafe",
    name: "Capa MagSafe iPhone 15", brand: "Ramon", category: "acessorios",
    description: "Silicone premium com anel MagSafe integrado, proteção militar.",
    details: "Compatível com MagSafe. Silicone premium. Proteção MIL-STD-810G. Bordas elevadas para câmera e tela.",
    price: 79,
    emoji: "📱", imageBg: "linear-gradient(135deg,#040A1C 0%,#091C3C 100%)",
    stock: 25, freeShipping: false, maxInstallments: 2, featured: false,
    variants: [{ name: "Cor", options: ["Preto","Transparente","Azul","Vermelho","Verde"] }],
    tags: ["capa","iphone","15","magsafe","silicone"],
  },
  {
    id: "carregador-65w", slug: "carregador-65w",
    name: "Carregador Turbo 65W GaN", brand: "Ramon", category: "acessorios",
    description: "Carregamento rápido 65W, tecnologia GaN, 2 portas USB-C + 1 USB-A.",
    details: "Potência 65W. Tecnologia GaN III. 2x USB-C + 1x USB-A. Compatível com iPhone, Samsung, notebooks.",
    price: 129, priceFrom: 159,
    emoji: "⚡", imageBg: "linear-gradient(135deg,#030810 0%,#071624 100%)",
    stock: 18, freeShipping: false, maxInstallments: 3, featured: true,
    tags: ["carregador","turbo","65w","gan","usb-c"],
  },
  {
    id: "cabo-usb-c-2m", slug: "cabo-usb-c-2m",
    name: "Cabo USB-C 2m 100W", brand: "Ramon", category: "acessorios",
    description: "Suporte a 100W de carga, trança reforçada, compatível com todos os dispositivos USB-C.",
    details: "Comprimento 2m. Suporte 100W PD. Trança de nylon. USB-C para USB-C. Dados 480Mbps.",
    price: 39.90,
    emoji: "🔌", imageBg: "linear-gradient(135deg,#03070E 0%,#060F1C 100%)",
    stock: 40, freeShipping: false, maxInstallments: 1, featured: false,
    variants: [{ name: "Cor", options: ["Preto","Branco","Azul"] }],
    tags: ["cabo","usb-c","carregamento","dados"],
  },
  {
    id: "suporte-veicular", slug: "suporte-veicular",
    name: "Suporte Veicular Magnético", brand: "Ramon", category: "acessorios",
    description: "Fixação no painel ou saída de ar, ímã forte, 360°, compatível com todos os celulares.",
    details: "Fixação por ímã N52. Rotação 360°. Fixação no painel ou saída de ar. Universal.",
    price: 59.90,
    emoji: "🚗", imageBg: "linear-gradient(135deg,#040912 0%,#081526 100%)",
    stock: 22, freeShipping: false, maxInstallments: 2, featured: false,
    tags: ["suporte","veicular","magnético","carro"],
  },

  // ── GARRAFINHAS ─────────────────────────────────────
  {
    id: "garrafa-termica-500ml", slug: "garrafa-termica-500ml",
    name: "Garrafa Térmica 500ml", brand: "Ramon", category: "garrafinhas",
    description: "Inox 304, mantém 12h quente / 24h frio, tampa hermética anti-vazamento.",
    details: "Capacidade 500ml. Aço inox 304. Quente 12h / Frio 24h. Tampa hermética. Livre de BPA.",
    price: 89,
    emoji: "💧", imageBg: "linear-gradient(135deg,#030C1A 0%,#082040 100%)",
    stock: 15, freeShipping: false, maxInstallments: 2, featured: true,
    variants: [{ name: "Cor", options: ["Preto","Azul","Prata","Branco","Verde"] }],
    tags: ["garrafa","térmica","inox","500ml"],
  },
  {
    id: "garrafa-1l", slug: "garrafa-1l",
    name: "Garrafa Térmica 1 Litro", brand: "Ramon", category: "garrafinhas",
    description: "Grande capacidade, alça ergonômica, ideal para academia e trilhas.",
    details: "Capacidade 1L. Aço inox 304. Quente 18h / Frio 36h. Alça ergonômica. Tampa com canudo.",
    price: 139,
    emoji: "💧", imageBg: "linear-gradient(135deg,#040E20 0%,#0A2448 100%)",
    stock: 10, freeShipping: false, maxInstallments: 3, featured: false,
    variants: [{ name: "Cor", options: ["Preto","Azul Marinho","Cinza","Verde Militar"] }],
    tags: ["garrafa","térmica","1l","academia","grande"],
  },

  // ── BIKES ELÉTRICAS ─────────────────────────────────
  {
    id: "bike-eletrica-urban", slug: "bike-eletrica-urban",
    name: "Bike Elétrica Urban 350W", brand: "Ramon", category: "bikes",
    description: "Motor 350W, autonomia 60km, freios a disco, suspensão dianteira.",
    details: "Motor 350W brushless. Bateria 36V 10Ah (removível). Autonomia até 60km. Freios a disco mecânico. Suspensão dianteira. Velocidade máx. 25km/h. Peso 22kg. Pneus 26\".",
    price: 3499, priceFrom: 3999,
    emoji: "⚡", imageBg: "linear-gradient(135deg,#020810 0%,#061020 100%)",
    stock: 3, freeShipping: true, maxInstallments: 12, featured: true,
    variants: [{ name: "Cor", options: ["Preto","Azul","Cinza"] }],
    tags: ["bike","elétrica","urban","350w","mobilidade"],
  },
  {
    id: "bike-eletrica-dobravel", slug: "bike-eletrica-dobravel",
    name: "Bike Elétrica Dobrável", brand: "Ramon", category: "bikes",
    description: "Dobrável em 15s, motor 250W, leve 18kg, ideal para cidade.",
    details: "Motor 250W. Dobrável em 15 segundos. Bateria 36V 7,5Ah. Autonomia 40km. Peso 18kg. Pneus 20\". Velocidade máx. 25km/h.",
    price: 2899,
    emoji: "⚡", imageBg: "linear-gradient(135deg,#030912 0%,#081826 100%)",
    stock: 2, freeShipping: true, maxInstallments: 12, featured: false,
    variants: [{ name: "Cor", options: ["Preto","Cinza"] }],
    tags: ["bike","elétrica","dobrável","250w","compacta"],
  },
];

// ── Helpers ──────────────────────────────────────────
export function getInstallmentText(price: number, max: number): string {
  if (max <= 1) return "";
  const v = price / max;
  return `${max}x de R$${v.toFixed(2).replace(".", ",")}`;
}

export function getPixPrice(price: number): number {
  return price * 0.95;
}

export function getDiscountPct(price: number, from?: number): number | null {
  if (!from || from <= price) return null;
  return Math.round(((from - price) / from) * 100);
}

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

export function getFeatured(): Product[] {
  return PRODUCTS.filter(p => p.featured);
}

export function getByCategory(cat: string): Product[] {
  if (cat === "todos") return PRODUCTS;
  return PRODUCTS.filter(p => p.category === cat);
}
