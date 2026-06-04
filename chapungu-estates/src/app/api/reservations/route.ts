import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendReservationConfirmation } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import { formatDate } from "@/lib/utils";
import { z } from "zod";

const reservationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  date: z.string(),
  time: z.string(),
  guests: z.number().min(1).max(50),
  occasion: z.string().optional(),
  dietaryRequirements: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const rateCheck = checkRateLimit(`reservation:${ip}`, 5, 60_000);
  if (!rateCheck.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await req.json();
    const data = reservationSchema.parse(body);

    const reservation = await prisma.reservation.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        date: new Date(data.date),
        time: data.time,
        partySize: data.guests,
        occasion: data.occasion,
        specialNeeds: data.dietaryRequirements,
        status: "pending",
      },
    });

    sendReservationConfirmation({
      name: data.name,
      email: data.email,
      date: formatDate(new Date(data.date)),
      time: data.time,
      guests: data.guests,
    }).catch(console.error);

    return NextResponse.json({ reservation }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: err.errors }, { status: 400 });
    }
    console.error("Reservation error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
