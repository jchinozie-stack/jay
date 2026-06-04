"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Calendar, Users, Search } from "lucide-react";

const schema = z.object({
  checkIn: z.string().min(1, "Required"),
  checkOut: z.string().min(1, "Required"),
  adults: z.string().min(1, "Required"),
});

type FormData = z.infer<typeof schema>;

export function QuickBookingWidget() {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { checkIn: today, checkOut: tomorrow, adults: "2" },
  });

  const onSubmit = (data: FormData) => {
    const params = new URLSearchParams({
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      adults: data.adults,
    });
    router.push(`/accommodation?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-4 gap-4"
      noValidate
      role="search"
      aria-label="Room availability search"
    >
      {/* Check-In */}
      <div>
        <label htmlFor="checkIn" className="flex items-center gap-1.5 font-body text-xs text-white/70 mb-2 font-medium tracking-wide">
          <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
          Check-In
        </label>
        <input
          id="checkIn"
          type="date"
          min={today}
          {...register("checkIn")}
          className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-400 focus:bg-white/20 transition-all placeholder-white/40"
          aria-describedby={errors.checkIn ? "checkIn-error" : undefined}
          aria-invalid={!!errors.checkIn}
        />
        {errors.checkIn && (
          <p id="checkIn-error" className="mt-1 text-xs text-red-300 font-body" role="alert">
            {errors.checkIn.message}
          </p>
        )}
      </div>

      {/* Check-Out */}
      <div>
        <label htmlFor="checkOut" className="flex items-center gap-1.5 font-body text-xs text-white/70 mb-2 font-medium tracking-wide">
          <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
          Check-Out
        </label>
        <input
          id="checkOut"
          type="date"
          min={tomorrow}
          {...register("checkOut")}
          className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-400 focus:bg-white/20 transition-all"
          aria-describedby={errors.checkOut ? "checkOut-error" : undefined}
          aria-invalid={!!errors.checkOut}
        />
        {errors.checkOut && (
          <p id="checkOut-error" className="mt-1 text-xs text-red-300 font-body" role="alert">
            {errors.checkOut.message}
          </p>
        )}
      </div>

      {/* Guests */}
      <div>
        <label htmlFor="adults" className="flex items-center gap-1.5 font-body text-xs text-white/70 mb-2 font-medium tracking-wide">
          <Users className="w-3.5 h-3.5" aria-hidden="true" />
          Guests
        </label>
        <select
          id="adults"
          {...register("adults")}
          className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-400 focus:bg-white/20 transition-all"
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n} className="bg-charcoal text-white">
              {n} {n === 1 ? "Guest" : "Guests"}
            </option>
          ))}
        </select>
      </div>

      {/* Search Button */}
      <div className="flex items-end">
        <button
          type="submit"
          className="w-full btn-gold justify-center py-3"
          aria-label="Search available rooms"
        >
          <Search className="w-4 h-4" aria-hidden="true" />
          Check Availability
        </button>
      </div>
    </form>
  );
}
