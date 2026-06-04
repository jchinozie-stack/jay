import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEnquiryConfirmation } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import { z } from "zod";

const enquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  type: z.enum(["WEDDING", "CONFERENCE", "EVENT", "RESTAURANT", "GENERAL"]),
  message: z.string().min(10),
  // Wedding-specific
  weddingDate: z.string().optional(),
  guestCount: z.number().optional(),
  budget: z.string().optional(),
  // Conference-specific
  eventDate: z.string().optional(),
  duration: z.string().optional(),
  requirements: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const rateCheck = checkRateLimit(`enquiry:${ip}`, 5, 60_000);
  if (!rateCheck.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await req.json();
    const data = enquirySchema.parse(body);

    const enquiry = await prisma.enquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        type: data.type,
        message: data.message,
        metadata: JSON.stringify({
          weddingDate: data.weddingDate,
          guestCount: data.guestCount,
          budget: data.budget,
          eventDate: data.eventDate,
          duration: data.duration,
          requirements: data.requirements,
        }),
        status: "NEW",
      },
    });

    sendEnquiryConfirmation({
      name: data.name,
      email: data.email,
      type: data.type,
      message: data.message,
    }).catch(console.error);

    return NextResponse.json({ enquiry }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: err.errors }, { status: 400 });
    }
    console.error("Enquiry error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
