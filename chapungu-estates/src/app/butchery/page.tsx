"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Plus, Minus, X, Truck, Store, CheckCircle } from "lucide-react";

const categories = [
  {
    name: "Premium Beef",
    emoji: "🥩",
    items: [
      { name: "Beef Tenderloin", price: 12.50, unit: "kg", description: "Prime cut, aged 21 days" },
      { name: "T-Bone Steak", price: 10.00, unit: "kg", description: "Classic thick-cut steak" },
      { name: "Ribeye", price: 11.50, unit: "kg", description: "Well-marbled, full flavour" },
      { name: "Beef Short Ribs", price: 7.50, unit: "kg", description: "Ideal for slow braai" },
      { name: "Beef Mince", price: 5.00, unit: "kg", description: "Fresh ground daily" },
      { name: "Brisket", price: 6.50, unit: "kg", description: "Perfect for slow cooking" },
    ],
  },
  {
    name: "Pork",
    emoji: "🐷",
    items: [
      { name: "Pork Chops", price: 6.00, unit: "kg", description: "Thick-cut loin chops" },
      { name: "Baby Back Ribs", price: 8.00, unit: "kg", description: "Tender and flavourful" },
      { name: "Boerewors", price: 7.00, unit: "kg", description: "Traditional spiced sausage" },
      { name: "Pork Belly", price: 6.50, unit: "kg", description: "Great for slow roasting" },
    ],
  },
  {
    name: "Poultry",
    emoji: "🍗",
    items: [
      { name: "Whole Chicken", price: 8.00, unit: "each", description: "Free-range, fresh daily" },
      { name: "Chicken Breasts", price: 5.50, unit: "kg", description: "Boneless, skinless" },
      { name: "Chicken Wings", price: 4.50, unit: "kg", description: "Perfect for braai" },
      { name: "Turkey (seasonal)", price: 12.00, unit: "each", description: "Free-range whole bird" },
    ],
  },
  {
    name: "Game Meat",
    emoji: "🦌",
    items: [
      { name: "Kudu Steak", price: 18.00, unit: "kg", description: "Tender, lean game meat" },
      { name: "Impala Chops", price: 15.00, unit: "kg", description: "Traditional Zimbabwean game" },
      { name: "Biltong (beef)", price: 20.00, unit: "kg", description: "Air-dried, house seasoned" },
      { name: "Game Biltong", price: 25.00, unit: "kg", description: "Mixed game, premium quality" },
    ],
  },
];

type CartItem = { name: string; category: string; price: number; unit: string; quantity: number };
type OrderState = "idle" | "submitting" | "success" | "error";

export default function ButcheryPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderState, setOrderState] = useState<OrderState>("idle");
  const [orderRef, setOrderRef] = useState("");
  const [form, setForm] = useState({ customerName: "", customerEmail: "", customerPhone: "", fulfillment: "collection" as "delivery" | "collection", address: "", notes: "" });
  const [formError, setFormError] = useState("");

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
  const totalAmount = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  function getQty(name: string) { return cart.find((c) => c.name === name)?.quantity ?? 0; }

  function updateCart(item: Omit<CartItem, "quantity">, delta: number) {
    setCart((prev) => {
      const existing = prev.find((c) => c.name === item.name);
      const newQty = Math.max(0, (existing?.quantity ?? 0) + delta);
      if (newQty === 0) return prev.filter((c) => c.name !== item.name);
      if (existing) return prev.map((c) => c.name === item.name ? { ...c, quantity: newQty } : c);
      return [...prev, { ...item, quantity: newQty }];
    });
  }

  function removeFromCart(name: string) { setCart((prev) => prev.filter((c) => c.name !== name)); }

  async function submitOrder(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    if (cart.length === 0) { setFormError("Your cart is empty."); return; }
    if (form.fulfillment === "delivery" && !form.address.trim()) { setFormError("Please enter your delivery address."); return; }
    setOrderState("submitting");
    try {
      const res = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, items: cart }) });
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
            <p className="font-body text-sm text-earth-700 leading-relaxed">A confirmation has been sent to <strong>{form.customerEmail}</strong>. We will contact you on <strong>{form.customerPhone}</strong> to confirm timing. Payment is due on {form.fulfillment}.</p>
          </div>
          <button onClick={() => { setOrderState("idle"); setForm({ customerName: "", customerEmail: "", customerPhone: "", fulfillment: "collection", address: "", notes: "" }); }} className="btn-gold">Place Another Order</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image src="/images/TIN05178 (1).jpg" alt="Chapungu Estates butchery" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-charcoal/70" />
        <div className="absolute inset-0 flex items-end container-site pb-12">
          <div>
            <div className="section-label text-brand-300 mb-2">Butchery & Shop</div>
            <h1 className="font-display text-5xl text-white font-light">Order Online,<span className="block italic text-brand-300">Pay on Collection or Delivery</span></h1>
          </div>
        </div>
      </div>

      <div className="bg-brand-600">
        <div className="container-site py-4 flex flex-wrap items-center gap-6">
          <div className="font-body text-white text-sm"><span className="font-semibold">Hours:</span> Mon–Sat 8:00 AM – 6:00 PM · Sun 9:00 AM – 1:00 PM</div>
          <div className="font-body text-white text-sm">📍 Plot 1201, Norton</div>
          <a href="tel:+263780114318" className="font-body text-white text-sm font-semibold hover:text-brand-100 ml-auto">📞 +263 78 011 4318</a>
        </div>
      </div>

      <div className="bg-earth-950 py-8">
        <div className="container-site">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[{ step:"1",label:"Add to Cart",desc:"Choose your cuts and quantities"},{ step:"2",label:"Place Order",desc:"Fill in your details — no payment needed"},{ step:"3",label:"We Prepare",desc:"Fresh cuts ready for you"},{ step:"4",label:"Pay on Arrival",desc:"Cash or card on collection/delivery"}].map((s) => (
              <div key={s.step} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center font-body font-bold text-white text-sm shrink-0">{s.step}</div>
                <div className="text-left">
                  <div className="font-body text-sm font-semibold text-white">{s.label}</div>
                  <div className="font-body text-xs text-earth-400">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-earth-50 py-16">
        <div className="container-site">
          <div className="text-center mb-12">
            <div className="section-label mb-3">Products</div>
            <h2 className="section-title">Select Your Cuts</h2>
            <p className="font-body text-earth-500 text-sm mt-2">All prices in USD. Add items to cart then place your order.</p>
          </div>
          <div className="space-y-12">
            {categories.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-2xl">{cat.emoji}</span>
                  <h3 className="font-display text-3xl text-charcoal">{cat.name}</h3>
                  <div className="flex-1 h-px bg-earth-200" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.items.map((item) => {
                    const qty = getQty(item.name);
                    return (
                      <div key={item.name} className="card-luxury p-5 flex flex-col gap-3">
                        <div className="flex justify-between items-start gap-3">
                          <div>
                            <div className="font-display text-lg text-charcoal">{item.name}</div>
                            <div className="font-body text-xs text-earth-500 mt-0.5">{item.description}</div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="font-display text-xl text-brand-600">${item.price.toFixed(2)}</div>
                            <div className="font-body text-xs text-earth-400">per {item.unit}</div>
                          </div>
                        </div>
                        {qty === 0 ? (
                          <button onClick={() => { updateCart({ name: item.name, category: cat.name, price: item.price, unit: item.unit }, 1); setCartOpen(true); }} className="btn-gold text-xs py-2 w-full justify-center">Add to Order</button>
                        ) : (
                          <div className="flex items-center gap-3">
                            <button onClick={() => updateCart({ name: item.name, category: cat.name, price: item.price, unit: item.unit }, -1)} className="w-8 h-8 flex items-center justify-center border border-earth-300 text-earth-600 hover:border-brand-500 hover:text-brand-600 transition-colors"><Minus className="w-3.5 h-3.5" /></button>
                            <span className="font-body font-semibold text-charcoal w-8 text-center">{qty}</span>
                            <button onClick={() => updateCart({ name: item.name, category: cat.name, price: item.price, unit: item.unit }, 1)} className="w-8 h-8 flex items-center justify-center border border-earth-300 text-earth-600 hover:border-brand-500 hover:text-brand-600 transition-colors"><Plus className="w-3.5 h-3.5" /></button>
                            <span className="font-body text-xs text-earth-500 ml-auto">${(item.price * qty).toFixed(2)}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
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
                  <div key={item.name} className="flex items-center gap-3 p-3 bg-earth-50 border border-earth-100">
                    <div className="flex-1 min-w-0">
                      <div className="font-body text-sm font-semibold text-charcoal truncate">{item.name}</div>
                      <div className="font-body text-xs text-earth-500">${item.price.toFixed(2)} / {item.unit}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateCart(item, -1)} className="w-7 h-7 flex items-center justify-center border border-earth-300 hover:border-brand-500"><Minus className="w-3 h-3" /></button>
                      <span className="font-body text-sm font-semibold w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateCart(item, 1)} className="w-7 h-7 flex items-center justify-center border border-earth-300 hover:border-brand-500"><Plus className="w-3 h-3" /></button>
                    </div>
                    <div className="font-body text-sm font-semibold text-brand-600 w-16 text-right">${(item.price * item.quantity).toFixed(2)}</div>
                    <button onClick={() => removeFromCart(item.name)} className="text-earth-400 hover:text-red-500"><X className="w-4 h-4" /></button>
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
                <div>
                  <label className="font-body text-xs text-earth-600 font-semibold tracking-wide uppercase block mb-1">Full Name *</label>
                  <input type="text" required value={form.customerName} onChange={(e) => setForm((f) => ({ ...f, customerName: e.target.value }))} className="w-full border border-earth-200 bg-white px-3 py-2.5 font-body text-sm focus:outline-none focus:border-brand-500" placeholder="Your full name" />
                </div>
                <div>
                  <label className="font-body text-xs text-earth-600 font-semibold tracking-wide uppercase block mb-1">Email *</label>
                  <input type="email" required value={form.customerEmail} onChange={(e) => setForm((f) => ({ ...f, customerEmail: e.target.value }))} className="w-full border border-earth-200 bg-white px-3 py-2.5 font-body text-sm focus:outline-none focus:border-brand-500" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="font-body text-xs text-earth-600 font-semibold tracking-wide uppercase block mb-1">Phone *</label>
                  <input type="tel" required value={form.customerPhone} onChange={(e) => setForm((f) => ({ ...f, customerPhone: e.target.value }))} className="w-full border border-earth-200 bg-white px-3 py-2.5 font-body text-sm focus:outline-none focus:border-brand-500" placeholder="+263 ..." />
                </div>
                <div>
                  <label className="font-body text-xs text-earth-600 font-semibold tracking-wide uppercase block mb-2">Fulfilment *</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => setForm((f) => ({ ...f, fulfillment: "collection" }))} className={`flex items-center gap-2 p-3 border text-sm font-body font-medium transition-colors ${form.fulfillment === "collection" ? "border-brand-500 bg-brand-50 text-brand-700" : "border-earth-200 bg-white text-earth-600"}`}><Store className="w-4 h-4" />Collection</button>
                    <button type="button" onClick={() => setForm((f) => ({ ...f, fulfillment: "delivery" }))} className={`flex items-center gap-2 p-3 border text-sm font-body font-medium transition-colors ${form.fulfillment === "delivery" ? "border-brand-500 bg-brand-50 text-brand-700" : "border-earth-200 bg-white text-earth-600"}`}><Truck className="w-4 h-4" />Delivery</button>
                  </div>
                </div>
                {form.fulfillment === "collection" && (<div className="bg-earth-50 border border-earth-100 p-3 text-xs font-body text-earth-600 flex items-start gap-2"><Store className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />Collect from Chapungu Estates, Plot 1201, Norton. Pay on collection.</div>)}
                {form.fulfillment === "delivery" && (
                  <div>
                    <label className="font-body text-xs text-earth-600 font-semibold tracking-wide uppercase block mb-1">Delivery Address *</label>
                    <textarea required value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} rows={2} className="w-full border border-earth-200 bg-white px-3 py-2.5 font-body text-sm focus:outline-none focus:border-brand-500 resize-none" placeholder="Full delivery address" />
                    <p className="font-body text-xs text-earth-500 mt-1">Delivery within Norton. Call +263 78 011 4318 to confirm availability.</p>
                  </div>
                )}
                <div>
                  <label className="font-body text-xs text-earth-600 font-semibold tracking-wide uppercase block mb-1">Special Instructions</label>
                  <textarea value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} rows={2} className="w-full border border-earth-200 bg-white px-3 py-2.5 font-body text-sm focus:outline-none focus:border-brand-500 resize-none" placeholder="e.g. preferred time, specific cut instructions..." />
                </div>
                {formError && <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-body px-3 py-2">{formError}</div>}
                <div className="bg-brand-50 border border-brand-100 p-3 text-xs font-body text-earth-700 flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />No payment now. Pay ${totalAmount.toFixed(2)} on {form.fulfillment}.</div>
                <button type="submit" disabled={orderState === "submitting"} className="btn-gold w-full justify-center text-sm py-3 disabled:opacity-60">{orderState === "submitting" ? "Placing Order..." : `Place Order — $${totalAmount.toFixed(2)}`}</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
