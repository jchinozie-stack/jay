import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendBookingConfirmation } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import { generateBookingReference, calculateNights, formatDate } from "@/lib/utils";
import { z } from "zod";

const bookingSchema = z.object({
  guestName: z.string().min(2),
  guestEmail: z.string().email(),
  guestPhone: z.string().min(7),
  roomId: z.string(),
  checkIn: z.string(),
  checkOut: z.string(),
  adults: z.number().min(1).max(10),
  children: z.number().min(0).max(10).optional().default(0),
  specialRequests: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const rateCheck = checkRateLimit(`booking:${ip}`, 5, 60_000);
  if (!rateCheck.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await req.json();
    const data = bookingSchema.parse(body);

    const room = await prisma.room.findUnique({
      where: { id: data.roomId },
      include: { category: true },
    });

    if (!room || !room.isAvailable) {
      return NextResponse.json({ error: "Room not available" }, { status: 409 });
    }

    const checkIn = new Date(data.checkIn);
    const checkOut = new Date(data.checkOut);
    const nights = calculateNights(checkIn, checkOut);
    const pricePerNight = Number(room.pricePerNight);
    const totalAmount = nights * pricePerNight;
    const reference = generateBookingReference();

    const booking = await prisma.booking.create({
      data: {
        bookingRef: reference,
        guestName: data.guestName,
        guestEmail: data.guestEmail,
        guestPhone: data.guestPhone,
        roomId: data.roomId,
        checkIn,
        checkOut,
        adults: data.adults,
        children: data.children,
        totalNights: nights,
        pricePerNight: room.pricePerNight,
        totalAmount,
        specialRequests: data.specialRequests,
        status: "PENDING",
      },
    });

    sendBookingConfirmation({
      guestName: data.guestName,
      guestEmail: data.guestEmail,
      reference,
      roomName: room.name,
      checkIn: formatDate(checkIn),
      checkOut: formatDate(checkOut),
      nights,
      guests: data.adults + data.children,
      totalAmount,
    }).catch(console.error);

    return NextResponse.json({ booking, reference }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: err.errors }, { status: 400 });
    }
    console.error("Booking error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ error: "Reference required" }, { status: 400 });
  }

  const booking = await prisma.booking.findUnique({
    where: { bookingRef: reference },
    include: { room: { include: { category: true } } },
  });

  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  return NextResponse.json({ booking });
}
