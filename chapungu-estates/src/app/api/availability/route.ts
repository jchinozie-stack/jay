import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = parseInt(searchParams.get("guests") ?? "1");

  if (!checkIn || !checkOut) {
    return NextResponse.json({ error: "checkIn and checkOut required" }, { status: 400 });
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (checkInDate >= checkOutDate) {
    return NextResponse.json({ error: "checkOut must be after checkIn" }, { status: 400 });
  }

  const conflictingBookings = await prisma.booking.findMany({
    where: {
      status: { in: ["PENDING", "CONFIRMED", "CHECKED_IN"] },
      checkIn: { lt: checkOutDate },
      checkOut: { gt: checkInDate },
    },
    select: { roomId: true },
  });

  const bookedRoomIds = conflictingBookings.map((b: { roomId: string }) => b.roomId);

  const availableRooms = await prisma.room.findMany({
    where: {
      id: { notIn: bookedRoomIds },
      isAvailable: true,
      maxOccupancy: { gte: guests },
    },
    include: { category: true },
    orderBy: { pricePerNight: "asc" },
  });

  return NextResponse.json({ rooms: availableRooms, checkIn, checkOut, guests });
}
