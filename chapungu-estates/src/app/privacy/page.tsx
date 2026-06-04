import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Chapungu Estates collects, uses, and protects your personal information.",
  robots: { index: false },
};

const sections = [
  {
    title: "Information We Collect",
    content: `We collect information you provide directly to us when you make a booking, submit an enquiry, make a restaurant reservation, or contact us. This includes your name, email address, phone number, postal address, payment information, and any preferences or special requests you communicate to us.

We also automatically collect certain information when you visit our website, including your IP address, browser type, pages visited, and the date and time of your visit.`,
  },
  {
    title: "How We Use Your Information",
    content: `We use the information we collect to process your reservations and bookings, communicate with you about your bookings and enquiries, send you confirmation emails and pre-arrival information, provide customer support, improve our services and website, comply with legal obligations, and — where you have consented — send you marketing communications about our offers and events.`,
  },
  {
    title: "Information Sharing",
    content: `We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with trusted service providers who assist us in operating our website and conducting our business (such as payment processors and email service providers), subject to confidentiality agreements. We may also disclose information when required by law.`,
  },
  {
    title: "Data Security",
    content: `We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. Our website uses SSL encryption for all data transmitted between your browser and our servers. Payment information is processed by our payment processor and we do not store complete card details on our systems.`,
  },
  {
    title: "Cookies",
    content: `Our website uses cookies to enhance your browsing experience, analyse website traffic, and provide personalised content. You can control cookie settings through your browser preferences. Disabling cookies may affect the functionality of some parts of our website.`,
  },
  {
    title: "Your Rights",
    content: `You have the right to access, correct, or delete your personal information held by us. You may also object to or restrict certain processing of your data, and withdraw consent where processing is based on consent. To exercise these rights, please contact us using the details below.`,
  },
  {
    title: "Data Retention",
    content: `We retain your personal information for as long as necessary to fulfil the purposes for which it was collected, including for legal, accounting, or reporting requirements. Booking records are typically retained for 7 years in accordance with financial record-keeping requirements.`,
  },
  {
    title: "Contact Us",
    content: `If you have any questions about this Privacy Policy or our data practices, please contact us at: info@chapunguestates.co.zw or by post to Chapungu Estates, Off Harare–Bulawayo Road, Norton, Zimbabwe.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-stone-950">
        <div className="container-site text-white text-center">
          <h1 className="font-display text-4xl md:text-6xl font-light mb-4">Privacy Policy</h1>
          <p className="text-stone-400">Last updated: January 2025</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-site max-w-3xl">
          <p className="text-stone-600 leading-relaxed mb-12 text-lg">
            At Chapungu Estates, we are committed to protecting your privacy and ensuring that your personal information is handled with care and respect. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
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
        </div>
      </section>
    </>
  );
}
