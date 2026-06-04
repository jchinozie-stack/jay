import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = "Chapungu Estates <no-reply@chapunguestates.co.zw>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "info@chapunguestates.co.zw";

export async function sendBookingConfirmation(data: {
  guestName: string;
  guestEmail: string;
  reference: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalAmount: number;
}) {
  await resend.emails.send({
    from: FROM,
    to: data.guestEmail,
    subject: `Booking Confirmed — ${data.reference} | Chapungu Estates`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1008;">
        <div style="background: #1a1008; padding: 32px; text-align: center;">
          <h1 style="color: #c8832a; margin: 0; font-size: 28px; letter-spacing: 2px;">CHAPUNGU ESTATES</h1>
          <p style="color: #e8d5b0; margin: 8px 0 0; font-size: 13px; letter-spacing: 3px;">NORTON, ZIMBABWE</p>
        </div>
        <div style="padding: 40px 32px; background: #fdfaf5;">
          <h2 style="color: #1a1008; font-size: 22px;">Dear ${data.guestName},</h2>
          <p style="color: #5a4a3a; line-height: 1.7;">Your reservation has been confirmed. We look forward to welcoming you to Chapungu Estates.</p>
          <div style="background: #f5ede0; border-left: 3px solid #c8832a; padding: 24px; margin: 24px 0; border-radius: 0 8px 8px 0;">
            <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: 2px; color: #c8832a; text-transform: uppercase;">Booking Reference</p>
            <p style="margin: 0 0 20px; font-size: 20px; font-weight: bold; color: #1a1008;">${data.reference}</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 6px 0; color: #7a6a5a; font-size: 14px;">Accommodation</td><td style="padding: 6px 0; font-weight: 500;">${data.roomName}</td></tr>
              <tr><td style="padding: 6px 0; color: #7a6a5a; font-size: 14px;">Check-in</td><td style="padding: 6px 0; font-weight: 500;">${data.checkIn}</td></tr>
              <tr><td style="padding: 6px 0; color: #7a6a5a; font-size: 14px;">Check-out</td><td style="padding: 6px 0; font-weight: 500;">${data.checkOut}</td></tr>
              <tr><td style="padding: 6px 0; color: #7a6a5a; font-size: 14px;">Duration</td><td style="padding: 6px 0; font-weight: 500;">${data.nights} night${data.nights > 1 ? "s" : ""}</td></tr>
              <tr><td style="padding: 6px 0; color: #7a6a5a; font-size: 14px;">Guests</td><td style="padding: 6px 0; font-weight: 500;">${data.guests}</td></tr>
              <tr style="border-top: 1px solid #ddd;"><td style="padding: 12px 0 6px; color: #1a1008; font-weight: 600;">Total</td><td style="padding: 12px 0 6px; font-weight: 700; color: #c8832a; font-size: 18px;">$${data.totalAmount}</td></tr>
            </table>
          </div>
          <p style="color: #5a4a3a; line-height: 1.7; font-size: 14px;">Check-in is from 14:00. Check-out by 10:00. For early check-in or late check-out, please contact us in advance.</p>
          <p style="color: #5a4a3a; line-height: 1.7; font-size: 14px;">WhatsApp: <a href="https://wa.me/263772123456" style="color: #c8832a;">+263 772 123 456</a> | Email: <a href="mailto:info@chapunguestates.co.zw" style="color: #c8832a;">info@chapunguestes.co.zw</a></p>
          <p style="color: #7a6a5a; line-height: 1.7; margin-top: 32px;">Warm regards,<br><strong>The Chapungu Estates Team</strong></p>
        </div>
        <div style="background: #1a1008; padding: 20px 32px; text-align: center;">
          <p style="color: #7a6a5a; font-size: 12px; margin: 0;">Off the Harare–Bulawayo Road, Norton, Zimbabwe</p>
        </div>
      </div>
    `,
  });

  // Notify admin
  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New Booking — ${data.reference} — ${data.guestName}`,
    html: `<p>New booking received.<br>Reference: ${data.reference}<br>Guest: ${data.guestName} (${data.guestEmail})<br>Room: ${data.roomName}<br>Check-in: ${data.checkIn}<br>Check-out: ${data.checkOut}<br>Guests: ${data.guests}<br>Total: $${data.totalAmount}</p>`,
  });
}

export async function sendEnquiryConfirmation(data: {
  name: string;
  email: string;
  type: string;
  message: string;
}) {
  await resend.emails.send({
    from: FROM,
    to: data.email,
    subject: `Enquiry Received | Chapungu Estates`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1008; padding: 32px; text-align: center;">
          <h1 style="color: #c8832a; margin: 0; font-size: 28px; letter-spacing: 2px;">CHAPUNGU ESTATES</h1>
        </div>
        <div style="padding: 40px 32px; background: #fdfaf5;">
          <h2>Dear ${data.name},</h2>
          <p style="color: #5a4a3a; line-height: 1.7;">Thank you for your ${data.type.toLowerCase()} enquiry. Our team will get back to you within 24 hours.</p>
          <p style="color: #7a6a5a; margin-top: 32px;">Warm regards,<br><strong>The Chapungu Estates Team</strong></p>
        </div>
      </div>
    `,
  });

  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New ${data.type} Enquiry — ${data.name}`,
    html: `<p>New enquiry from ${data.name} (${data.email})<br>Type: ${data.type}<br><br>${data.message}</p>`,
  });
}

export async function sendReservationConfirmation(data: {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
}) {
  await resend.emails.send({
    from: FROM,
    to: data.email,
    subject: `Reservation Confirmed | Chapungu Estates Restaurant`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1008; padding: 32px; text-align: center;">
          <h1 style="color: #c8832a; margin: 0; font-size: 28px; letter-spacing: 2px;">CHAPUNGU ESTATES</h1>
        </div>
        <div style="padding: 40px 32px; background: #fdfaf5;">
          <h2>Dear ${data.name},</h2>
          <p style="color: #5a4a3a; line-height: 1.7;">Your restaurant reservation has been confirmed.</p>
          <div style="background: #f5ede0; padding: 20px; border-left: 3px solid #c8832a; margin: 20px 0;">
            <p style="margin: 0;"><strong>Date:</strong> ${data.date}</p>
            <p style="margin: 8px 0 0;"><strong>Time:</strong> ${data.time}</p>
            <p style="margin: 8px 0 0;"><strong>Guests:</strong> ${data.guests}</p>
          </div>
          <p style="color: #7a6a5a; margin-top: 32px;">Warm regards,<br><strong>The Chapungu Estates Team</strong></p>
        </div>
      </div>
    `,
  });
}
