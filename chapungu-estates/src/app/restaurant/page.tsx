"use client";

import { useState } from "react";
import Image from "next/image";
import { Clock, Phone, MapPin, ShoppingCart, Plus, Minus, X, Store, CheckCircle } from "lucide-react";
import { RestaurantReservationForm } from "@/components/forms/RestaurantReservationForm";

const hours = [
  { day: "Breakfast", time: "7:00 AM – 10:30 AM" },
  { day: "Lunch", time: "12:00 PM – 3:00 PM" },
  { day: "Dinner", time: "6:00 PM – 10:00 PM" },
  { day: "Grill", time: "12:00 PM – 9:00 PM" },
];

const breakfastOptions = [
  { id: "breakfast-1", name: "Breakfast Option 1", category: "Breakfast", price: 5, unit: "meal", badge: null, includes: ["Chicken liver","2 eggs (boiled, scrambled or fried)","1 piece sausage","Fresh milk","Bread (toast optional)","Margarine","Tea / Coffee"] },
  { id: "breakfast-2", name: "Breakfast Option 2", category: "Breakfast", price: 7, unit: "meal", badge: null, includes: ["Chicken liver","2 eggs (boiled, scrambled or fried)","1 piece sausage","Fresh milk","Cereals (Cornflakes / Cerevita)","Bread (toast optional)","Tea / Coffee"] },
  { id: "breakfast-3", name: "Breakfast Option 3", category: "Breakfast", price: 10, unit: "meal", badge: "Best Value", includes: ["Chicken liver","2 eggs (boiled, scrambled or fried)","Sausage","Fresh milk","Cereals (Cornflakes / Cerevita)","Bread","Tea / Coffee","Juice","Fruits"] },
];

const grillItems = [
  { id: "full-chicken", name: "Full Chicken", category: "Grill", price: 7, unit: "each" },
  { id: "half-chicken", name: "Half Chicken", category: "Grill", price: 4, unit: "each" },
  { id: "quarter-chicken", name: "Quarter Chicken", category: "Grill", price: 2, unit: "each" },
  { id: "beef-steak", name: "Beef Steak", category: "Grill", price: 6, unit: "kg" },
  { id: "beef-sausage", name: "Beef Sausage", category: "Grill", price: 6, unit: "kg" },
  { id: "pork", name: "Pork", category: "Grill", price: 6, unit: "kg" },
];

const sideItems = [
  { id: "plain-chips", name: "Plain Chips", category: "Sides", price: 1, unit: "portion" },
  { id: "rice", name: "Rice", category: "Sides", price: 1, unit: "portion" },
  { id: "sadza", name: "Sadza", category: "Sides", price: 1, unit: "portion" },
  { id: "green-salad", name: "Green Salad", category: "Sides", price: 0.50, unit: "portion" },
];

type CartItem = { id: string; name: string; category: string; price: number; unit: string; quantity: number };
type OrderState = "idle" | "submitting" | "success" | "error";

export default function RestaurantPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderState, setOrderState] = useState<OrderState>("idle");
  const [orderRef, setOrderRef] = useState("");
  const [form, setForm] = useState({ customerName: "", customerEmail: "", customerPhone: "", notes: "" });
  const [formError, setFormError] = useState("");

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
  const totalAmount = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  function getQty(id: string) { return cart.find((c) => c.id === id)?.quantity ?? 0; }

  function updateCart(item: Omit<CartItem, "quantity">, delta: number) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      const newQty = Math.max(0, (existing?.quantity ?? 0) + delta);
      if (newQty === 0) return prev.filter((c) => c.id !== item.id);
      if (existing) return prev.map((c) => c.id === item.id ? { ...c, quantity: newQty } : c);
      return [...prev, { ...item, quantity: newQty }];
    });
  }

  function removeFromCart(id: string) { setCart((prev) => prev.filter((c) => c.id !== id)); }

  async function submitOrder(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    if (cart.length === 0) { setFormError("Your cart is empty."); return; }
    setOrderState("submitting");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerName: form.customerName, customerEmail: form.customerEmail, customerPhone: form.customerPhone, fulfillment: "collection", notes: form.notes, items: cart.map((i) => ({ name: i.name, category: i.category, price: i.price, unit: i.unit, quantity: i.quantity })) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Order failed");
      setOrderRef(data.orderRef);
      setOrderState("success");
      setCart([]);
      setCartOpen(false);
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Something went wrong.");
      setOrderState("error");
    }
  }

  if (orderState === "success") {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-brand-500 mx-auto mb-6" />
          <h1 className="font-display text-4xl text-charcoal font-light mb-3">Order Placed!</h1>
          <p className="font-body text-earth-600 mb-2">Your order reference is:</p>
          <div className="font-display text-3xl text-brand-600 font-semibold mb-6">{orderRef}</div>
          <div className="bg-brand-50 border border-brand-200 p-5 text-left mb-8">
            <p className="font-body text-sm text-earth-700 leading-relaxed">A confirmation has been sent to <strong>{form.customerEmail}</strong>. Please come to the counter when you arrive. We will contact you on <strong>{form.customerPhone}</strong> if needed.</p>
          </div>
          <button onClick={() => { setOrderState("idle"); setForm({ customerName: "", customerEmail: "", customerPhone: "", notes: "" }); }} className="btn-gold">Place Another Order</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image src="/images/TIN05190.jpg" alt="Chapungu Grill chef" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 to-charcoal/90" />
        <div className="absolute inset-0 flex items-end container-site pb-16">
          <div>
            <div className="section-label text-brand-300 mb-2">Restaurant &amp; Grill</div>
            <h1 className="font-display text-6xl text-white font-light">Chapungu<span className="block italic text-brand-300">Grill</span></h1>
            <p className="font-body text-earth-300 mt-3 max-w-md">Order online for collection at the restaurant — pay when you arrive.</p>
          </div>
        </div>
      </div>

      <div className="bg-charcoal">
        <div className="container-site py-5">
          <div className="flex flex-wrap gap-6 md:gap-12">
            {hours.map(({ day, time }) => (
              <div key={day} className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-brand-400" />
                <span className="font-body text-xs text-earth-400"><span className="text-white font-medium">{day}:</span> {time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-earth-950 py-8">
        <div className="container-site">
          <div className="flex flex-wrap justify-center gap-8">
            {[{step:"1",label:"Add to Order",desc:"Choose your meals and sides"},{step:"2",label:"Place Order",desc:"Fill in your details — no payment needed"},{step:"3",label:"We Prepare",desc:"Food freshly made for you"},{step:"4",label:"Pay at Counter",desc:"Cash or card when you collect"}].map((s) => (
              <div key={s.step} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center font-body font-bold text-white text-sm shrink-0">{s.step}</div>
                <div className="text-left"><div className="font-body text-sm font-semibold text-white">{s.label}</div><div className="font-body text-xs text-earth-400">{s.desc}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="breakfast" className="bg-cream py-16">
        <div className="container-site">
          <div className="text-center mb-12">
            <div className="section-label mb-3">Breakfast</div>
            <h2 className="section-title">Chapungu Grill Breakfast</h2>
            <p className="font-body text-earth-500 text-sm mt-2">Available 7:00 AM – 10:30 AM · All prices in USD · Order ahead for collection</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {breakfastOptions.map((opt) => {
              const qty = getQty(opt.id);
              return (
                <div key={opt.id} className={`card-luxury p-8 flex flex-col ${opt.badge ? "border-brand-400 border-2" : ""}`}>
                  {opt.badge && <div className="bg-brand-500 text-white font-body text-xs font-semibold px-3 py-1 self-start mb-4 tracking-wide">{opt.badge}</div>}
                  <div className="font-display text-xl text-charcoal mb-1">{opt.name}</div>
                  <div className="font-display text-5xl text-brand-600 font-light mb-6">${opt.price}</div>
                  <ul className="space-y-2 flex-1 mb-6">{opt.includes.map((item) => (<li key={item} className="flex items-start gap-2 font-body text-sm text-earth-600"><span className="text-brand-500 mt-0.5">✓</span>{item}</li>))}</ul>
                  {qty === 0 ? (
                    <button onClick={() => { updateCart({ id: opt.id, name: opt.name, category: opt.category, price: opt.price, unit: opt.unit }, 1); setCartOpen(true); }} className="btn-gold text-center text-sm py-3">Add to Order</button>
                  ) : (
                    <div className="flex items-center gap-3 justify-between">
                      <button onClick={() => updateCart({ id: opt.id, name: opt.name, category: opt.category, price: opt.price, unit: opt.unit }, -1)} className="w-9 h-9 flex items-center justify-center border border-earth-300 hover:border-brand-500 transition-colors"><Minus className="w-3.5 h-3.5" /></button>
                      <span className="font-body font-semibold text-charcoal">{qty}</span>
                      <button onClick={() => updateCart({ id: opt.id, name: opt.name, category: opt.category, price: opt.price, unit: opt.unit }, 1)} className="w-9 h-9 flex items-center justify-center border border-earth-300 hover:border-brand-500 transition-colors"><Plus className="w-3.5 h-3.5" /></button>
                      <span className="font-body text-sm text-brand-600 font-semibold ml-auto">${(opt.price * qty).toFixed(2)}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div id="menu" className="bg-earth-950 py-16">
        <div className="container-site">
          <div className="text-center mb-12">
            <div className="section-label text-brand-400 mb-3">Food Menu</div>
            <h2 className="font-display text-4xl text-white font-light">Grill &amp; Sides</h2>
            <p className="font-body text-earth-400 text-sm mt-2">Charcoal grilled · Freshly prepared · Available 12:00 PM – 9:00 PM · All prices in USD</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6"><span className="text-2xl">🔥</span><h3 className="font-display text-3xl text-white">Meat</h3><div className="flex-1 h-px bg-earth-800" /></div>
              <div className="space-y-3">
                {grillItems.map((item) => {
                  const qty = getQty(item.id);
                  return (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-earth-900 border border-earth-800">
                      <div className="flex-1"><span className="font-display text-lg text-white">{item.name}</span><span className="font-body text-xs text-earth-500 ml-2">per {item.unit}</span></div>
                      <span className="font-display text-xl text-brand-400 whitespace-nowrap">${item.price.toFixed(2)}</span>
                      {qty === 0 ? (
                        <button onClick={() => { updateCart(item, 1); setCartOpen(true); }} className="btn-gold text-xs py-1.5 px-3 whitespace-nowrap">Add</button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateCart(item, -1)} className="w-7 h-7 flex items-center justify-center border border-earth-600 text-white hover:border-brand-400 transition-colors"><Minus className="w-3 h-3" /></button>
                          <span className="font-body text-sm text-white w-5 text-center">{qty}</span>
                          <button onClick={() => updateCart(item, 1)} className="w-7 h-7 flex items-center justify-center border border-earth-600 text-white hover:border-brand-400 transition-colors"><Plus className="w-3 h-3" /></button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="font-body text-xs text-earth-500 mt-4">Customised menus available for special events — contact us to discuss.</p>
            </div>
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-6"><span className="text-2xl">🍟</span><h3 className="font-display text-3xl text-white">Sides</h3><div className="flex-1 h-px bg-earth-800" /></div>
                <div className="space-y-3">
                  {sideItems.map((item) => {
                    const qty = getQty(item.id);
                    return (
                      <div key={item.id} className="flex items-center gap-3 p-4 bg-earth-900 border border-earth-800">
                        <span className="font-display text-lg text-white flex-1">{item.name}</span>
                        <span className="font-display text-lg text-brand-400">${item.price.toFixed(2)}</span>
                        {qty === 0 ? (
                          <button onClick={() => { updateCart(item, 1); setCartOpen(true); }} className="w-7 h-7 flex items-center justify-center bg-brand-600 hover:bg-brand-700 text-white transition-colors"><Plus className="w-3.5 h-3.5" /></button>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => updateCart(item, -1)} className="w-6 h-6 flex items-center justify-center border border-earth-600 text-white"><Minus className="w-2.5 h-2.5" /></button>
                            <span className="font-body text-sm text-white w-4 text-center">{qty}</span>
                            <button onClick={() => updateCart(item, 1)} className="w-6 h-6 flex items-center justify-center border border-earth-600 text-white"><Plus className="w-2.5 h-2.5" /></button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-6"><span className="text-2xl">🥤</span><h3 className="font-display text-3xl text-white">Drinks</h3><div className="flex-1 h-px bg-earth-800" /></div>
                <div className="p-6 bg-earth-900 border border-earth-800 text-center">
                  <div className="font-display text-3xl text-brand-400 mb-2">$0.50 – $2.00</div>
                  <div className="font-body text-sm text-earth-400">Wide selection of soft drinks, juices &amp; water</div>
                  <div className="font-body text-xs text-earth-500 mt-2">Order drinks at the counter</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-brand-600 py-10">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div><p className="font-display text-2xl text-white font-light mb-2">Come eat with us</p><p className="font-body text-sm text-brand-100">Customised menus available for weddings, conferences &amp; special events.</p></div>
            <div className="space-y-3">
              <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-white" /><a href="tel:+263780114318" className="font-body text-sm text-white hover:underline">0780 114 318 · 0788 734 125</a></div>
              <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-white" /><span className="font-body text-sm text-white">Plot 1201, RG Mugabe Highway (Murombedzi Rd), Norton</span></div>
            </div>
          </div>
        </div>
      </div>

      <div id="reservations" className="bg-cream py-16">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <div className="section-label mb-3">Reservations</div>
              <h2 className="section-title mb-6">Reserve Your Table</h2>
              <p className="font-body text-earth-600 leading-relaxed mb-8">We recommend booking ahead, especially for weekends and special occasions. Walk-ins are welcome subject to availability.</p>
              <div className="space-y-4">
                <div className="flex gap-3"><Phone className="w-5 h-5 text-brand-500 mt-0.5" /><div><div className="font-body font-semibold text-charcoal text-sm">By Phone</div><a href="tel:+263780114318" className="font-body text-sm text-earth-600 hover:text-brand-600 transition-colors">+263 78 011 4318</a></div></div>
                <div className="flex gap-3"><MapPin className="w-5 h-5 text-brand-500 mt-0.5" /><div><div className="font-body font-semibold text-charcoal text-sm">In Person</div><div className="font-body text-sm text-earth-600">Reception is open 24/7</div></div></div>
              </div>
            </div>
            <div className="lg:col-span-3"><RestaurantReservationForm /></div>
          </div>
        </div>
      </div>

      {totalItems > 0 && (
        <button onClick={() => setCartOpen(true)} className="fixed bottom-6 right-6 z-40 bg-brand-600 hover:bg-brand-700 text-white px-5 py-3.5 shadow-2xl flex items-center gap-3 transition-colors">
          <ShoppingCart className="w-5 h-5" />
          <span className="font-body font-semibold">{totalItems} item{totalItems !== 1 ? "s" : ""}</span>
          <span className="font-display text-lg font-light">${totalAmount.toFixed(2)}</span>
        </button>
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-charcoal/50" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white flex flex-col h-full shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-earth-100 bg-charcoal text-white">
              <div className="flex items-center gap-2"><ShoppingCart className="w-5 h-5 text-brand-400" /><span className="font-body font-semibold">Your Order</span></div>
              <button onClick={() => setCartOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-3 flex-1">
              {cart.length === 0 ? (
                <p className="font-body text-earth-500 text-sm text-center py-8">Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-earth-50 border border-earth-100">
                    <div className="flex-1 min-w-0"><div className="font-body text-sm font-semibold text-charcoal truncate">{item.name}</div><div className="font-body text-xs text-earth-500">${item.price.toFixed(2)} / {item.unit}</div></div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateCart(item, -1)} className="w-7 h-7 flex items-center justify-center border border-earth-300 hover:border-brand-500"><Minus className="w-3 h-3" /></button>
                      <span className="font-body text-sm font-semibold w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateCart(item, 1)} className="w-7 h-7 flex items-center justify-center border border-earth-300 hover:border-brand-500"><Plus className="w-3 h-3" /></button>
                    </div>
                    <div className="font-body text-sm font-semibold text-brand-600 w-16 text-right">${(item.price * item.quantity).toFixed(2)}</div>
                    <button onClick={() => removeFromCart(item.id)} className="text-earth-400 hover:text-red-500"><X className="w-4 h-4" /></button>
                  </div>
                ))
              )}
              {cart.length > 0 && (
                <div className="flex justify-between items-center pt-3 border-t border-earth-200">
                  <span className="font-body font-semibold text-charcoal">Total</span>
                  <span className="font-display text-2xl text-brand-600">${totalAmount.toFixed(2)}</span>
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <form onSubmit={submitOrder} className="p-5 border-t border-earth-100 bg-cream space-y-4">
                <h3 className="font-display text-xl text-charcoal">Your Details</h3>
                <div><label className="font-body text-xs text-earth-600 font-semibold tracking-wide uppercase block mb-1">Full Name *</label><input type="text" required value={form.customerName} onChange={(e) => setForm((f) => ({ ...f, customerName: e.target.value }))} className="w-full border border-earth-200 bg-white px-3 py-2.5 font-body text-sm focus:outline-none focus:border-brand-500" placeholder="Your full name" /></div>
                <div><label className="font-body text-xs text-earth-600 font-semibold tracking-wide uppercase block mb-1">Email *</label><input type="email" required value={form.customerEmail} onChange={(e) => setForm((f) => ({ ...f, customerEmail: e.target.value }))} className="w-full border border-earth-200 bg-white px-3 py-2.5 font-body text-sm focus:outline-none focus:border-brand-500" placeholder="your@email.com" /></div>
                <div><label className="font-body text-xs text-earth-600 font-semibold tracking-wide uppercase block mb-1">Phone *</label><input type="tel" required value={form.customerPhone} onChange={(e) => setForm((f) => ({ ...f, customerPhone: e.target.value }))} className="w-full border border-earth-200 bg-white px-3 py-2.5 font-body text-sm focus:outline-none focus:border-brand-500" placeholder="+263 ..." /></div>
                <div className="bg-earth-50 border border-earth-100 p-3 text-xs font-body text-earth-600 flex items-start gap-2"><Store className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />Collection at Chapungu Grill counter. Pay on arrival.</div>
                <div><label className="font-body text-xs text-earth-600 font-semibold tracking-wide uppercase block mb-1">Special Instructions</label><textarea value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} rows={2} className="w-full border border-earth-200 bg-white px-3 py-2.5 font-body text-sm focus:outline-none focus:border-brand-500 resize-none" placeholder="e.g. preferred time, how you like your eggs..." /></div>
                {formError && <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-body px-3 py-2">{formError}</div>}
                <div className="bg-brand-50 border border-brand-100 p-3 text-xs font-body text-earth-700 flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />No payment now. Pay ${totalAmount.toFixed(2)} when you collect.</div>
                <button type="submit" disabled={orderState === "submitting"} className="btn-gold w-full justify-center text-sm py-3 disabled:opacity-60">{orderState === "submitting" ? "Placing Order..." : `Place Order — $${totalAmount.toFixed(2)}`}</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
