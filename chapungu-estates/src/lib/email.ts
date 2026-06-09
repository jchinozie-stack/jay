import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = "Chapungu Estates <no-reply@chapunguestates.co.zw>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "info@chapunguestates.co.zw";

export async function sendBookingConfirmation(data: {
  guestName: string; guestEmail: string; reference: string; roomName: string;
  checkIn: string; checkOut: string; nights: number; guests: number; totalAmount: number;
}) {
  await resend.emails.send({ from: FROM, to: data.guestEmail, subject: `Booking Confirmed — ${data.reference} | Chapungu Estates`, html: `<p>Dear ${data.guestName}, your booking ${data.reference} for ${data.roomName} is confirmed. Check-in: ${data.checkIn}. Check-out: ${data.checkOut}. Total: $${data.totalAmount}.</p>` });
  await resend.emails.send({ from: FROM, to: ADMIN_EMAIL, subject: `New Booking — ${data.reference} — ${data.guestName}`, html: `<p>New booking: ${data.reference} | ${data.guestName} | ${data.roomName} | ${data.checkIn}–${data.checkOut} | $${data.totalAmount}</p>` });
}

export async function sendEnquiryConfirmation(data: { name: string; email: string; type: string; message: string; }) {
  await resend.emails.send({ from: FROM, to: data.email, subject: `Enquiry Received | Chapungu Estates`, html: `<p>Dear ${data.name}, thank you for your ${data.type.toLowerCase()} enquiry. We will respond within 24 hours.</p>` });
  await resend.emails.send({ from: FROM, to: ADMIN_EMAIL, subject: `New ${data.type} Enquiry — ${data.name}`, html: `<p>New enquiry from ${data.name} (${data.email})<br>Type: ${data.type}<br><br>${data.message}</p>` });
}

export async function sendReservationConfirmation(data: { name: string; email: string; date: string; time: string; guests: number; }) {
  await resend.emails.send({ from: FROM, to: data.email, subject: `Reservation Confirmed | Chapungu Estates Restaurant`, html: `<p>Dear ${data.name}, your reservation on ${data.date} at ${data.time} for ${data.guests} guests is confirmed.</p>` });
}

export async function sendOrderConfirmation(data: {
  customerName: string; customerEmail: string; customerPhone: string; orderRef: string;
  fulfillment: "delivery" | "collection"; address?: string;
  items: { name: string; category: string; price: number; unit: string; quantity: number }[];
  totalAmount: number; notes?: string;
}) {
  const itemsHtml = data.items.map((i) => `<tr><td style="padding:8px 0;border-bottom:1px solid #e8d5b0;color:#5a4a3a;font-size:14px;">${i.name}</td><td style="padding:8px 0;border-bottom:1px solid #e8d5b0;text-align:center;">${i.quantity} ${i.unit}</td><td style="padding:8px 0;border-bottom:1px solid #e8d5b0;font-weight:600;text-align:right;">$${(i.price*i.quantity).toFixed(2)}</td></tr>`).join("");
  const itemsText = data.items.map((i) => `  • ${i.name} — ${i.quantity} ${i.unit} @ $${i.price.toFixed(2)} = $${(i.price*i.quantity).toFixed(2)}`).join("\n");

  await resend.emails.send({
    from: FROM,
    to: data.customerEmail,
    subject: `Order Received — ${data.orderRef} | Chapungu Estates`,
    html: `<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;"><div style="background:#1a1008;padding:32px;text-align:center;"><h1 style="color:#c8832a;margin:0;font-size:28px;letter-spacing:2px;">CHAPUNGU ESTATES</h1></div><div style="padding:40px 32px;background:#fdfaf5;"><h2>Dear ${data.customerName},</h2><p style="color:#5a4a3a;line-height:1.7;">Thank you for your order. We are preparing your items for <strong>${data.fulfillment === "delivery" ? "delivery" : "collection"}</strong>. Payment is due on ${data.fulfillment}.</p><div style="background:#f5ede0;border-left:3px solid #c8832a;padding:24px;margin:24px 0;"><p style="margin:0 0 4px;font-size:12px;letter-spacing:2px;color:#c8832a;text-transform:uppercase;">Order Reference</p><p style="margin:0 0 20px;font-size:22px;font-weight:bold;color:#1a1008;">${data.orderRef}</p><p style="margin:0 0 4px;font-size:12px;letter-spacing:2px;color:#c8832a;text-transform:uppercase;">Fulfilment</p><p style="margin:0 0 20px;font-size:15px;color:#1a1008;font-weight:600;">${data.fulfillment === "delivery" ? `Delivery to: ${data.address}` : "Collection from Chapungu Estates, Norton"}</p><table style="width:100%;border-collapse:collapse;"><thead><tr><th style="text-align:left;padding-bottom:8px;font-size:12px;color:#c8832a;text-transform:uppercase;">Item</th><th style="text-align:center;padding-bottom:8px;font-size:12px;color:#c8832a;text-transform:uppercase;">Qty</th><th style="text-align:right;padding-bottom:8px;font-size:12px;color:#c8832a;text-transform:uppercase;">Price</th></tr></thead><tbody>${itemsHtml}</tbody><tfoot><tr><td colspan="2" style="padding-top:12px;font-weight:700;">Total (pay on ${data.fulfillment})</td><td style="padding-top:12px;font-weight:700;color:#c8832a;font-size:20px;text-align:right;">$${data.totalAmount.toFixed(2)}</td></tr></tfoot></table>${data.notes ? `<p style="margin:16px 0 0;font-size:13px;color:#7a6a5a;"><strong>Notes:</strong> ${data.notes}</p>` : ""}</div><p style="color:#5a4a3a;font-size:14px;">We will contact you on <strong>${data.customerPhone}</strong>. Call <a href="tel:+263780114318" style="color:#c8832a;">+263 78 011 4318</a> for queries.</p><p style="color:#7a6a5a;margin-top:32px;">Warm regards,<br><strong>Chapungu Estates</strong></p></div><div style="background:#1a1008;padding:20px 32px;text-align:center;"><p style="color:#7a6a5a;font-size:12px;margin:0;">Plot 1201, RG Mugabe Highway, Norton, Zimbabwe</p></div></div>`,
  });

  await resend.emails.send({
    from: FROM,
    to: "order@chapunguestates.co.zw",
    subject: `New Order ${data.orderRef} — ${data.customerName} — $${data.totalAmount.toFixed(2)}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;"><div style="background:#1a1008;padding:20px;text-align:center;"><h2 style="color:#c8832a;margin:0;">New Order Received</h2></div><div style="padding:24px;background:#fdfaf5;border:1px solid #e8d5b0;"><table style="width:100%;border-collapse:collapse;margin-bottom:20px;"><tr><td style="padding:6px 0;color:#7a6a5a;width:140px;">Order Ref</td><td style="padding:6px 0;font-weight:700;font-size:18px;color:#c8832a;">${data.orderRef}</td></tr><tr><td style="padding:6px 0;color:#7a6a5a;">Customer</td><td style="padding:6px 0;font-weight:600;">${data.customerName}</td></tr><tr><td style="padding:6px 0;color:#7a6a5a;">Email</td><td style="padding:6px 0;"><a href="mailto:${data.customerEmail}">${data.customerEmail}</a></td></tr><tr><td style="padding:6px 0;color:#7a6a5a;">Phone</td><td style="padding:6px 0;"><a href="tel:${data.customerPhone}">${data.customerPhone}</a></td></tr><tr><td style="padding:6px 0;color:#7a6a5a;">Fulfilment</td><td style="padding:6px 0;font-weight:600;">${data.fulfillment === "delivery" ? `DELIVERY to: ${data.address}` : "COLLECTION"}</td></tr>${data.notes ? `<tr><td style="padding:6px 0;color:#7a6a5a;">Notes</td><td style="padding:6px 0;">${data.notes}</td></tr>` : ""}</table><h3 style="border-bottom:2px solid #c8832a;padding-bottom:8px;color:#1a1008;">Items</h3><pre style="font-family:Arial,sans-serif;font-size:14px;line-height:1.8;color:#3a2a1a;">${itemsText}</pre><div style="background:#c8832a;color:white;padding:16px;text-align:center;margin-top:20px;"><div style="font-size:13px;text-transform:uppercase;">Total Due on ${data.fulfillment}</div><div style="font-size:32px;font-weight:700;">$${data.totalAmount.toFixed(2)}</div></div></div></div>`,
  });
}
