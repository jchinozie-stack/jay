"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Location",
    lines: ["Off Harare–Bulawayo Road", "Norton, Mashonaland West", "Zimbabwe"],
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+263 772 123 456", "+263 242 123 456"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["info@chapunguestates.co.zw", "reservations@chapunguestates.co.zw"],
  },
  {
    icon: Clock,
    title: "Office Hours",
    lines: ["Monday – Friday: 8:00 – 18:00", "Saturday: 8:00 – 16:00", "Sunday: 10:00 – 14:00"],
  },
];

const enquiryTypes = [
  "General Enquiry",
  "Accommodation Booking",
  "Restaurant Reservation",
  "Wedding Enquiry",
  "Conference / Meeting",
  "Event Planning",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "General Enquiry",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          type: "GENERAL",
          message: `[${form.type}] ${form.message}`,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", type: "General Enquiry", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-stone-950 overflow-hidden">
        <div className="grain-overlay" />
        <div className="container-site relative z-10 text-center text-white">
          <p className="section-label text-gold/80 mb-4">We're Here to Help</p>
          <h1 className="font-display text-5xl md:text-7xl font-light mb-6">Get in Touch</h1>
          <p className="text-stone-400 text-lg max-w-xl mx-auto">
            Whether you're planning a stay, an event, or simply have a question — our team is ready to assist.
          </p>
        </div>
      </section>

      {/* Main grid */}
      <section className="py-20 bg-white">
        <div className="container-site grid lg:grid-cols-5 gap-16">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <p className="section-label text-gold mb-3">Contact Details</p>
              <h2 className="font-display text-3xl">Find Us</h2>
            </div>

            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-800 mb-1">{item.title}</p>
                    {item.lines.map((line) => (
                      <p key={line} className="text-stone-500 text-sm">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/263772123456?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20Chapungu%20Estates"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl transition-colors font-medium"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </a>

            {/* Map */}
            <div className="rounded-xl overflow-hidden shadow-md aspect-video">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15175.489!2d30.700!3d-17.883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDUyJzU5LjkiUyAzMMKwNDInMDAuMCJF!5e0!3m2!1sen!2szw!4v1699999999999!5m2!1sen!2szw"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Chapungu Estates Location"
              />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <p className="section-label text-gold mb-3">Send a Message</p>
              <h2 className="font-display text-3xl">How Can We Help?</h2>
            </div>

            {status === "success" ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl">✓</span>
                </div>
                <h3 className="font-display text-2xl mb-2">Message Received</h3>
                <p className="text-stone-600">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-gold hover:underline text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input-luxury w-full"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="input-luxury w-full"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="input-luxury w-full"
                      placeholder="+263 7xx xxx xxx"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Enquiry Type</label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="input-luxury w-full"
                    >
                      {enquiryTypes.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Message *</label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="input-luxury w-full resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-600 text-sm bg-red-50 px-4 py-3 rounded-lg">
                    Something went wrong. Please try again or contact us via WhatsApp.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-gold w-full sm:w-auto px-10"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
