import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmation } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import { z } from "zod";

const orderSchema = z.object({
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(7),
  fulfillment: z.enum(["delivery", "collection"]),
  address: z.string().optional(),
  notes: z.string().optional(),
  items: z.array(z.object({
    name: z.string(),
    category: z.string(),
    price: z.number(),
    unit: z.string(),
    quantity: z.number().min(0.5),
  })).min(1),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const rateCheck = checkRateLimit(`order:${ip}`, 5, 60_000);
  if (!rateCheck.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await req.json();
    const data = orderSchema.parse(body);

    const totalAmount = data.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const orderRef = "CE-" + Math.random().toString(36).slice(2, 7).toUpperCase();

    const order = await prisma.order.create({
      data: {
        orderRef,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        address: data.fulfillment === "delivery" ? (data.address ?? "") : "Collection",
        notes: data.notes,
        totalAmount,
        status: "pending",
        items: {
          create: data.items.map((item) => ({
            quantity: item.quantity,
            unitPrice: item.price,
            total: item.price * item.quantity,
            product: {
              connectOrCreate: {
                where: { slug: item.name.toLowerCase().replace(/\s+/g, "-") },
                create: {
                  name: item.name,
                  slug: item.name.toLowerCase().replace(/\s+/g, "-"),
                  price: item.price,
                  unit: item.unit,
                  category: {
                    connectOrCreate: {
                      where: { slug: item.category.toLowerCase().replace(/\s+/g, "-") },
                      create: {
                        name: item.category,
                        slug: item.category.toLowerCase().replace(/\s+/g, "-"),
                      },
                    },
                  },
                },
              },
            },
          })),
        },
      },
    });

    sendOrderConfirmation({
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      orderRef,
      fulfillment: data.fulfillment,
      address: data.address,
      items: data.items,
      totalAmount,
      notes: data.notes,
    }).catch(console.error);

    return NextResponse.json({ orderRef }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: err.errors }, { status: 400 });
    }
    console.error("Order error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
