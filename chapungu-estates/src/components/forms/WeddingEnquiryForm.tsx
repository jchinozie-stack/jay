"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Full name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(9, "Phone number required"),
  partnerName: z.string().min(2, "Partner's name required"),
  eventDate: z.string().min(1, "Event date required"),
  guestCount: z.string().min(1, "Guest count required"),
  package: z.string().min(1, "Please select a package"),
  budget: z.string().optional(),
  message: z.string().min(10, "Please tell us more about your vision"),
});

type FormData = z.infer<typeof schema>;

export function WeddingEnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = new Date().toISOString().split("T")[0];

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "WEDDING" }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
      reset();
    } catch {
      setError("Something went wrong. Please call us directly or try again.");
    }
  };

  if (submitted) {
    return (
      <div className="bg-forest-50 border border-forest-200 p-10 text-center">
        <CheckCircle className="w-14 h-14 text-forest-600 mx-auto mb-4" />
        <h3 className="font-display text-3xl text-charcoal mb-2">Enquiry Received!</h3>
        <p className="font-body text-earth-600 text-sm leading-relaxed mb-6">
          Thank you for choosing Chapungu Estates for your special day. Our wedding 
          coordinator Grace will contact you within 24 hours to discuss your vision.
        </p>
        <button onClick={() => setSubmitted(false)} className="btn-outline-gold">
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-earth-100 p-8 space-y-5"
      noValidate
      aria-label="Wedding enquiry form"
    >
      <h3 className="font-display text-2xl text-charcoal">Wedding Enquiry</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="w-name" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">Your Name *</label>
          <input id="w-name" type="text" {...register("name")} className="input-luxury" placeholder="Your full name" aria-invalid={!!errors.name} />
          {errors.name && <p className="mt-1 text-xs text-red-600 font-body" role="alert">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="w-partner" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">Partner's Name *</label>
          <input id="w-partner" type="text" {...register("partnerName")} className="input-luxury" placeholder="Partner's full name" aria-invalid={!!errors.partnerName} />
          {errors.partnerName && <p className="mt-1 text-xs text-red-600 font-body" role="alert">{errors.partnerName.message}</p>}
        </div>
        <div>
          <label htmlFor="w-email" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">Email *</label>
          <input id="w-email" type="email" {...register("email")} className="input-luxury" placeholder="you@example.com" aria-invalid={!!errors.email} />
          {errors.email && <p className="mt-1 text-xs text-red-600 font-body" role="alert">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="w-phone" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">Phone *</label>
          <input id="w-phone" type="tel" {...register("phone")} className="input-luxury" placeholder="+263 71 234 5678" aria-invalid={!!errors.phone} />
          {errors.phone && <p className="mt-1 text-xs text-red-600 font-body" role="alert">{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="w-date" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">Wedding Date *</label>
          <input id="w-date" type="date" min={today} {...register("eventDate")} className="input-luxury" aria-invalid={!!errors.eventDate} />
          {errors.eventDate && <p className="mt-1 text-xs text-red-600 font-body" role="alert">{errors.eventDate.message}</p>}
        </div>
        <div>
          <label htmlFor="w-guests" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">Estimated Guests *</label>
          <select id="w-guests" {...register("guestCount")} className="input-luxury" aria-invalid={!!errors.guestCount}>
            <option value="">Select range</option>
            <option>1–50</option>
            <option>51–100</option>
            <option>101–150</option>
            <option>151–200</option>
            <option>201–300</option>
          </select>
          {errors.guestCount && <p className="mt-1 text-xs text-red-600 font-body" role="alert">{errors.guestCount.message}</p>}
        </div>
        <div>
          <label htmlFor="w-pkg" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">Package Interest *</label>
          <select id="w-pkg" {...register("package")} className="input-luxury" aria-invalid={!!errors.package}>
            <option value="">Select a package</option>
            <option>Intimate Affair (up to 50)</option>
            <option>Garden Celebration (up to 150)</option>
            <option>Grand Estate (up to 300)</option>
            <option>Custom Package</option>
          </select>
          {errors.package && <p className="mt-1 text-xs text-red-600 font-body" role="alert">{errors.package.message}</p>}
        </div>
        <div>
          <label htmlFor="w-budget" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">Budget Range</label>
          <select id="w-budget" {...register("budget")} className="input-luxury">
            <option value="">Prefer not to say</option>
            <option>Under $5,000</option>
            <option>$5,000 – $10,000</option>
            <option>$10,000 – $20,000</option>
            <option>$20,000+</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="w-msg" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">Tell Us Your Vision *</label>
          <textarea
            id="w-msg"
            {...register("message")}
            rows={4}
            className="input-luxury resize-none"
            placeholder="Share your dream wedding — style, theme, special requirements, or anything that matters to you..."
            aria-invalid={!!errors.message}
          />
          {errors.message && <p className="mt-1 text-xs text-red-600 font-body" role="alert">{errors.message.message}</p>}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 p-4 text-red-700 font-body text-sm" role="alert">{error}</div>
      )}

      <button type="submit" disabled={isSubmitting} className="w-full btn-gold justify-center py-4">
        {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" />Sending...</> : "Send Wedding Enquiry"}
      </button>
      <p className="font-body text-xs text-earth-400 text-center">
        Our wedding coordinator will respond within 24 hours.
      </p>
    </form>
  );
}
