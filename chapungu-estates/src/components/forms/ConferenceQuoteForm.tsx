"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  company: z.string().min(2, "Company name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(9, "Phone required"),
  eventDate: z.string().min(1, "Date required"),
  duration: z.string().min(1, "Duration required"),
  delegates: z.string().min(1, "Delegate count required"),
  room: z.string().min(1, "Please select a room"),
  layout: z.string().optional(),
  catering: z.string().optional(),
  accommodation: z.string().optional(),
  requirements: z.string().max(1000).optional(),
});

type FormData = z.infer<typeof schema>;

export function ConferenceQuoteForm() {
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
        body: JSON.stringify({ ...data, type: "CONFERENCE" }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
      reset();
    } catch {
      setError("Something went wrong. Please call us directly.");
    }
  };

  if (submitted) {
    return (
      <div className="bg-forest-50 border border-forest-200 p-10 text-center">
        <CheckCircle className="w-12 h-12 text-forest-600 mx-auto mb-4" />
        <h3 className="font-display text-2xl text-charcoal mb-2">Quote Request Received!</h3>
        <p className="font-body text-earth-600 text-sm mb-4">Our events team will prepare a tailored proposal and contact you within 24 hours.</p>
        <button onClick={() => setSubmitted(false)} className="btn-outline-gold">Submit Another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-earth-100 p-8 space-y-5" noValidate aria-label="Conference quote request form">
      <h3 className="font-display text-2xl text-charcoal">Request a Conference Quote</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-name" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">Contact Name *</label>
          <input id="cf-name" type="text" {...register("name")} className="input-luxury" placeholder="Your full name" />
          {errors.name && <p className="mt-1 text-xs text-red-600 font-body" role="alert">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="cf-company" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">Company / Organisation *</label>
          <input id="cf-company" type="text" {...register("company")} className="input-luxury" placeholder="Company name" />
          {errors.company && <p className="mt-1 text-xs text-red-600 font-body" role="alert">{errors.company.message}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">Email *</label>
          <input id="cf-email" type="email" {...register("email")} className="input-luxury" placeholder="you@company.com" />
          {errors.email && <p className="mt-1 text-xs text-red-600 font-body" role="alert">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="cf-phone" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">Phone *</label>
          <input id="cf-phone" type="tel" {...register("phone")} className="input-luxury" placeholder="+263 71 234 5678" />
          {errors.phone && <p className="mt-1 text-xs text-red-600 font-body" role="alert">{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="cf-date" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">Event Date *</label>
          <input id="cf-date" type="date" min={today} {...register("eventDate")} className="input-luxury" />
          {errors.eventDate && <p className="mt-1 text-xs text-red-600 font-body" role="alert">{errors.eventDate.message}</p>}
        </div>
        <div>
          <label htmlFor="cf-duration" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">Duration *</label>
          <select id="cf-duration" {...register("duration")} className="input-luxury">
            <option value="">Select duration</option>
            <option>Half Day (4 hours)</option>
            <option>Full Day (8 hours)</option>
            <option>2 Days</option>
            <option>3 Days</option>
            <option>4+ Days</option>
          </select>
          {errors.duration && <p className="mt-1 text-xs text-red-600 font-body" role="alert">{errors.duration.message}</p>}
        </div>
        <div>
          <label htmlFor="cf-delegates" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">Number of Delegates *</label>
          <select id="cf-delegates" {...register("delegates")} className="input-luxury">
            <option value="">Select range</option>
            <option>1–20</option>
            <option>21–50</option>
            <option>51–80</option>
            <option>81–150</option>
            <option>151–200</option>
          </select>
        </div>
        <div>
          <label htmlFor="cf-room" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">Preferred Venue *</label>
          <select id="cf-room" {...register("room")} className="input-luxury">
            <option value="">Select venue</option>
            <option>The Boardroom (up to 20)</option>
            <option>Savannah Suite (up to 80)</option>
            <option>The Great Hall (up to 200)</option>
            <option>Advise Best Option</option>
          </select>
          {errors.room && <p className="mt-1 text-xs text-red-600 font-body" role="alert">{errors.room.message}</p>}
        </div>
        <div>
          <label htmlFor="cf-layout" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">Preferred Layout</label>
          <select id="cf-layout" {...register("layout")} className="input-luxury">
            <option value="">Select (optional)</option>
            <option>Theatre Style</option>
            <option>Classroom Style</option>
            <option>Boardroom Style</option>
            <option>Banquet Style</option>
            <option>U-Shape</option>
          </select>
        </div>
        <div>
          <label htmlFor="cf-catering" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">Catering Requirements</label>
          <select id="cf-catering" {...register("catering")} className="input-luxury">
            <option value="">Select (optional)</option>
            <option>Tea & Coffee Only</option>
            <option>Tea/Coffee + Lunch</option>
            <option>Full Day Catering</option>
            <option>Gala Dinner</option>
            <option>No Catering</option>
          </select>
        </div>
        <div>
          <label htmlFor="cf-accom" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">Accommodation Needed?</label>
          <select id="cf-accom" {...register("accommodation")} className="input-luxury">
            <option value="">Select (optional)</option>
            <option>No Accommodation</option>
            <option>1 Night</option>
            <option>2 Nights</option>
            <option>3+ Nights</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="cf-req" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">Additional Requirements</label>
          <textarea id="cf-req" {...register("requirements")} rows={3} className="input-luxury resize-none" placeholder="Special requirements, dietary needs, team building activities, specific AV needs..." />
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 p-4 text-red-700 font-body text-sm" role="alert">{error}</div>}

      <button type="submit" disabled={isSubmitting} className="w-full btn-gold justify-center py-4">
        {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" />Sending...</> : "Request Conference Quote"}
      </button>
    </form>
  );
}
