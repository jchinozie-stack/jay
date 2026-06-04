import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for bookings and use of Chapungu Estates facilities.",
  robots: { index: false },
};

const sections = [
  {
    title: "Booking & Reservations",
    content: `All bookings are subject to availability. A booking is confirmed upon receipt of a deposit or full payment as specified at the time of reservation. By making a booking, you agree to these terms and conditions on behalf of all guests in your party.`,
  },
  {
    title: "Payment",
    content: `We accept payment via bank transfer, mobile money (EcoCash/OneMoney), and major credit/debit cards. Full payment is required at check-in unless alternative arrangements have been agreed in writing. Prices are quoted in USD and are inclusive of applicable taxes.`,
  },
  {
    title: "Cancellation Policy",
    content: `Cancellations made more than 7 days before check-in: full refund less a 10% administration fee.
Cancellations made 3–7 days before check-in: 50% refund.
Cancellations made less than 72 hours before check-in: no refund.
No-shows: no refund.

For event bookings (weddings, conferences), separate cancellation terms apply as specified in your event agreement.`,
  },
  {
    title: "Check-in & Check-out",
    content: `Standard check-in time is 14:00. Standard check-out time is 10:00. Early check-in and late check-out may be available upon request and may be subject to an additional charge. Guests must present a valid form of identification at check-in.`,
  },
  {
    title: "Conduct & Property",
    content: `Guests are expected to conduct themselves in a manner that is respectful of other guests, staff, and the property. Chapungu Estates reserves the right to ask any guest to vacate the premises if their conduct is deemed inappropriate, dangerous, or disruptive. Guests will be held liable for any damage caused to the property during their stay.`,
  },
  {
    title: "Liability",
    content: `Chapungu Estates shall not be liable for any loss, damage, injury, or inconvenience suffered by guests during their stay, except where caused by our negligence. We strongly recommend that all guests obtain comprehensive travel insurance before their stay. We are not responsible for the loss of valuables; guests are advised to use in-room safes.`,
  },
  {
    title: "Events & Functions",
    content: `All events hosted at Chapungu Estates are subject to a separate event agreement. The event agreement, together with these terms and conditions, forms the complete agreement between the parties. Any changes to event requirements must be agreed in writing.`,
  },
  {
    title: "Restaurant & Catering",
    content: `Restaurant reservations may be cancelled or modified up to 2 hours before the reservation time. For groups of 10 or more, 24 hours notice is required. Pre-ordered catering packages are non-refundable once preparation has commenced.`,
  },
  {
    title: "Governing Law",
    content: `These terms and conditions shall be governed by and construed in accordance with the laws of Zimbabwe. Any disputes arising shall be subject to the exclusive jurisdiction of the courts of Zimbabwe.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-stone-950">
        <div className="container-site text-white text-center">
          <h1 className="font-display text-4xl md:text-6xl font-light mb-4">Terms & Conditions</h1>
          <p className="text-stone-400">Last updated: January 2025</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-site max-w-3xl">
          <p className="text-stone-600 leading-relaxed mb-12 text-lg">
            Please read these terms and conditions carefully before making a booking or using the services of Chapungu Estates. By proceeding with a booking or visiting our premises, you agree to be bound by these terms.
          </p>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <div key={section.title}>
                <h2 className="font-display text-2xl mb-4 flex items-start gap-3">
                  <span className="text-gold text-lg font-normal mt-0.5">{i + 1}.</span>
                  {section.title}
                </h2>
                <p className="text-stone-600 leading-relaxed whitespace-pre-line">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 p-6 bg-stone-50 rounded-xl border border-stone-200">
            <p className="text-stone-600 text-sm">
              For any questions regarding these terms, please contact us at{" "}
              <a href="mailto:info@chapunguestates.co.zw" className="text-gold hover:underline">
                info@chapunguestates.co.zw
              </a>{" "}
              or call us at <a href="tel:+263772123456" className="text-gold hover:underline">+263 772 123 456</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
