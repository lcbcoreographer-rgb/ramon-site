import { NextRequest, NextResponse } from "next/server";

// Tabela simplificada de frete por região (CEP prefix → estado)
// Para produção: integrar com Melhor Envio ou Correios API
const FRETE_TABLE: Record<string, { pac: number; sedex: number; days_pac: number; days_sedex: number }> = {
  default: { pac: 22, sedex: 35, days_pac: 8, days_sedex: 3 },
  SP:      { pac: 15, sedex: 25, days_pac: 5, days_sedex: 2 },
  RJ:      { pac: 17, sedex: 27, days_pac: 5, days_sedex: 2 },
  MG:      { pac: 18, sedex: 28, days_pac: 6, days_sedex: 2 },
  PR:      { pac: 16, sedex: 26, days_pac: 5, days_sedex: 2 },
  SC:      { pac: 18, sedex: 28, days_pac: 6, days_sedex: 2 },
  RS:      { pac: 19, sedex: 29, days_pac: 7, days_sedex: 3 },
  AM:      { pac: 32, sedex: 48, days_pac: 15, days_sedex: 5 },
  PA:      { pac: 30, sedex: 44, days_pac: 13, days_sedex: 5 },
};

const CEP_TO_STATE: [string, string][] = [
  ["01","SP"],["02","SP"],["03","SP"],["04","SP"],["05","SP"],["06","SP"],["07","SP"],["08","SP"],["09","SP"],
  ["10","SP"],["11","SP"],["12","SP"],["13","SP"],["14","SP"],["15","SP"],["16","SP"],["17","SP"],["18","SP"],["19","SP"],
  ["20","RJ"],["21","RJ"],["22","RJ"],["23","RJ"],["24","RJ"],["25","RJ"],["26","RJ"],["27","RJ"],["28","RJ"],
  ["30","MG"],["31","MG"],["32","MG"],["33","MG"],["34","MG"],["35","MG"],["36","MG"],["37","MG"],["38","MG"],["39","MG"],
  ["80","PR"],["81","PR"],["82","PR"],["83","PR"],["84","PR"],["85","PR"],["86","PR"],["87","PR"],
  ["88","SC"],["89","SC"],
  ["90","RS"],["91","RS"],["92","RS"],["93","RS"],["94","RS"],["95","RS"],["96","RS"],["97","RS"],["98","RS"],["99","RS"],
  ["69","AM"],["66","PA"],["67","PA"],["68","PA"],
];

function getState(cep: string): string {
  const prefix = cep.replace(/\D/g,"").slice(0,2);
  const found = CEP_TO_STATE.find(([p]) => p === prefix);
  return found ? found[1] : "default";
}

export async function POST(req: NextRequest) {
  try {
    const { cep, total } = await req.json();
    if (!cep) return NextResponse.json({ error: "CEP obrigatório" }, { status: 400 });

    // Lookup address via ViaCEP
    const digits = cep.replace(/\D/g,"");
    let address: { logradouro?: string; bairro?: string; localidade?: string; uf?: string; erro?: boolean } = {};
    try {
      const viacep = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      address = await viacep.json();
    } catch {}

    if (address.erro) return NextResponse.json({ error: "CEP não encontrado" }, { status: 404 });

    const state = address.uf || getState(digits);
    const rates = FRETE_TABLE[state] || FRETE_TABLE.default;
    const FREE_THRESHOLD = 299;
    const isFree = total >= FREE_THRESHOLD;

    return NextResponse.json({
      address,
      options: [
        {
          id: "pac",
          name: "PAC (Correios)",
          price: isFree ? 0 : rates.pac,
          days: rates.days_pac,
          free: isFree,
        },
        {
          id: "sedex",
          name: "SEDEX (Correios)",
          price: rates.sedex,
          days: rates.days_sedex,
          free: false,
        },
      ],
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
