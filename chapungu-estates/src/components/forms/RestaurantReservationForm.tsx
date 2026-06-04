"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(9, "Valid phone number required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  partySize: z.string().min(1, "Party size is required"),
  occasion: z.string().optional(),
  specialNeeds: z.string().max(500).optional(),
});

type FormData = z.infer<typeof schema>;

const timeSlots = [
  "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00",
];

export function RestaurantReservationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Failed to submit reservation");
      }
      setSubmitted(true);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="bg-forest-50 border border-forest-200 p-8 text-center">
        <CheckCircle className="w-12 h-12 text-forest-600 mx-auto mb-4" aria-hidden="true" />
        <h3 className="font-display text-2xl text-charcoal mb-2">Reservation Received!</h3>
        <p className="font-body text-sm text-earth-600 mb-4">
          Thank you for your booking request. We&apos;ll confirm your reservation via 
          email and WhatsApp within 2 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="btn-outline-gold text-sm py-2.5"
        >
          Make Another Reservation
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-earth-100 p-8 space-y-6"
      noValidate
      aria-label="Table reservation form"
    >
      <h3 className="font-display text-2xl text-charcoal">Book a Table</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <div className="md:col-span-2">
          <label htmlFor="res-name" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">
            Full Name *
          </label>
          <input
            id="res-name"
            type="text"
            autoComplete="name"
            {...register("name")}
            className="input-luxury"
            placeholder="Your full name"
            aria-describedby={errors.name ? "res-name-error" : undefined}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p id="res-name-error" className="mt-1 text-xs text-red-600 font-body" role="alert">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="res-email" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">
            Email *
          </label>
          <input
            id="res-email"
            type="email"
            autoComplete="email"
            {...register("email")}
            className="input-luxury"
            placeholder="you@example.com"
            aria-describedby={errors.email ? "res-email-error" : undefined}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p id="res-email-error" className="mt-1 text-xs text-red-600 font-body" role="alert">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="res-phone" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">
            Phone Number *
          </label>
          <input
            id="res-phone"
            type="tel"
            autoComplete="tel"
            {...register("phone")}
            className="input-luxury"
            placeholder="+263 71 234 5678"
            aria-describedby={errors.phone ? "res-phone-error" : undefined}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <p id="res-phone-error" className="mt-1 text-xs text-red-600 font-body" role="alert">{errors.phone.message}</p>}
        </div>

        {/* Date */}
        <div>
          <label htmlFor="res-date" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">
            Date *
          </label>
          <input
            id="res-date"
            type="date"
            min={today}
            {...register("date")}
            className="input-luxury"
            aria-describedby={errors.date ? "res-date-error" : undefined}
            aria-invalid={!!errors.date}
          />
          {errors.date && <p id="res-date-error" className="mt-1 text-xs text-red-600 font-body" role="alert">{errors.date.message}</p>}
        </div>

        {/* Time */}
        <div>
          <label htmlFor="res-time" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">
            Preferred Time *
          </label>
          <select
            id="res-time"
            {...register("time")}
            className="input-luxury"
            aria-describedby={errors.time ? "res-time-error" : undefined}
            aria-invalid={!!errors.time}
          >
            <option value="">Select a time</option>
            <optgroup label="Breakfast">
              {timeSlots.slice(0, 7).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </optgroup>
            <optgroup label="Lunch">
              {timeSlots.slice(7, 14).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </optgroup>
            <optgroup label="Dinner">
              {timeSlots.slice(14).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </optgroup>
          </select>
          {errors.time && <p id="res-time-error" className="mt-1 text-xs text-red-600 font-body" role="alert">{errors.time.message}</p>}
        </div>

        {/* Party Size */}
        <div>
          <label htmlFor="res-size" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">
            Party Size *
          </label>
          <select
            id="res-size"
            {...register("partySize")}
            className="input-luxury"
          >
            <option value="">Number of guests</option>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
            ))}
          </select>
          {errors.partySize && <p className="mt-1 text-xs text-red-600 font-body" role="alert">{errors.partySize.message}</p>}
        </div>

        {/* Occasion */}
        <div>
          <label htmlFor="res-occasion" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">
            Occasion
          </label>
          <select id="res-occasion" {...register("occasion")} className="input-luxury">
            <option value="">Select (optional)</option>
            <option>Birthday</option>
            <option>Anniversary</option>
            <option>Business Lunch</option>
            <option>Romantic Dinner</option>
            <option>Family Gathering</option>
            <option>Other</option>
          </select>
        </div>

        {/* Special Requests */}
        <div className="md:col-span-2">
          <label htmlFor="res-special" className="font-body text-xs font-semibold tracking-wide text-earth-700 uppercase mb-2 block">
            Special Requirements
          </label>
          <textarea
            id="res-special"
            {...register("specialNeeds")}
            className="input-luxury h-24 resize-none"
            placeholder="Dietary requirements, accessibility needs, special setup..."
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 p-4 text-red-700 font-body text-sm" role="alert">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-gold justify-center py-4"
        aria-label="Submit reservation request"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            Submitting...
          </>
        ) : (
          "Confirm Reservation"
        )}
      </button>

      <p className="font-body text-xs text-earth-400 text-center">
        We&apos;ll confirm your booking within 2 hours via email and WhatsApp.
      </p>
    </form>
  );
}
