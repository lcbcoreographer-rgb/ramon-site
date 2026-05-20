import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const mp = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN ?? "",
});

export async function POST(req: NextRequest) {
  try {
    const { items, payer, shipping, freteOption } = await req.json();
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

    const preference = new Preference(mp);

    const mpItems = items.map((i: { name: string; price: number; quantity: number; image?: string }) => ({
      title:       i.name,
      unit_price:  Math.round(i.price * 100) / 100,
      quantity:    i.quantity,
      currency_id: "BRL",
      picture_url: i.image,
    }));

    // Add shipping as item if not free
    if (freteOption && freteOption.price > 0) {
      mpItems.push({
        title:       `Frete — ${freteOption.name}`,
        unit_price:  freteOption.price,
        quantity:    1,
        currency_id: "BRL",
      });
    }

    const result = await preference.create({
      body: {
        items: mpItems,
        payer: {
          name:    payer.name,
          email:   payer.email,
          phone:   { number: payer.phone },
          address: {
            zip_code:     shipping.cep,
            street_name:  shipping.street,
            street_number: shipping.number,
          },
        },
        back_urls: {
          success: `${base}/pedido/sucesso`,
          failure: `${base}/pedido/falha`,
          pending: `${base}/pedido/pendente`,
        },
        auto_return: "approved",
        external_reference: `ramon-${Date.now()}`,
        statement_descriptor: "RAMON ACESSORIOS",
        payment_methods: {
          installments: 12,
          default_installments: 1,
        },
      },
    });

    return NextResponse.json({ url: result.init_point, id: result.id });
  } catch (e) {
    console.error("[checkout]", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
