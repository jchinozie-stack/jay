"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Stay",
    href: "/accommodation",
    children: [
      { name: "All Rooms", href: "/accommodation" },
      { name: "Standard Room", href: "/accommodation/standard-room" },
      { name: "Standard Twin", href: "/accommodation/standard-twin" },
      { name: "Deluxe Room", href: "/accommodation/deluxe-room" },
    ],
  },
  {
    name: "Dine",
    href: "/restaurant",
    children: [
      { name: "Restaurant & Grill", href: "/restaurant" },
      { name: "Reserve a Table", href: "/restaurant#reservations" },
    ],
  },
  {
    name: "Events",
    href: "/events",
    children: [
      { name: "Weddings", href: "/weddings" },
      { name: "Conferences", href: "/conferences" },
      { name: "Birthday & Functions", href: "/events" },
    ],
  },
  { name: "Gallery", href: "/gallery" },
  { name: "Butchery", href: "/butchery" },
  { name: "Contact", href: "/contact" },
];

const luxuryEase = [0.21, 0.47, 0.32, 0.98] as const;

function isItemActive(pathname: string, item: (typeof navigation)[number]) {
  if (item.href === "/") return pathname === "/";
  return pathname === item.href || pathname.startsWith(item.href + "/") ||
    (item.children?.some((c) => pathname === c.href) ?? false);
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const linkBase =
    "relative flex items-center gap-1 px-3.5 py-2 rounded-full text-sm font-body font-medium text-white/90 hover:text-white transition-colors";

  return (
    <motion.header
      initial={reduce ? false : { y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: luxuryEase }}
      className="fixed top-4 left-0 right-0 z-50 px-4 lg:px-10"
      role="banner"
    >
      <nav className="flex items-center justify-between gap-4" aria-label="Main navigation">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label="Chapungu Estates — Home"
        >
          <span className="liquid-glass bg-charcoal/30 w-12 h-12 rounded-full flex items-center justify-center font-display italic text-2xl text-white shrink-0">
            C
          </span>
          <span className="hidden md:flex flex-col leading-none text-white">
            <span className="font-display text-xl font-semibold tracking-tight">
              Chapungu
            </span>
            <span className="font-body text-[9px] tracking-[0.3em] uppercase text-brand-300 font-medium">
              Estates
            </span>
          </span>
        </Link>

        {/* Desktop glass pill */}
        <div
          className="hidden lg:flex items-center liquid-glass bg-charcoal/35 rounded-full px-1.5 py-1.5 gap-0.5"
          ref={dropdownRef}
        >
          {navigation.map((item) => {
            const active = isItemActive(pathname, item);
            return item.children ? (
              <div key={item.name} className="relative">
                <button
                  className={linkBase}
                  onClick={() =>
                    setOpenDropdown(openDropdown === item.name ? null : item.name)
                  }
                  aria-expanded={openDropdown === item.name}
                  aria-haspopup="true"
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                  <ChevronDown
                    className={cn(
                      "relative z-10 w-3.5 h-3.5 transition-transform duration-200",
                      openDropdown === item.name && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {openDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: luxuryEase }}
                      className="absolute top-full left-0 mt-3 w-56 liquid-glass bg-charcoal/75 rounded-[1.25rem] py-2 z-50 origin-top"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-5 py-2.5 text-sm font-body text-earth-200 hover:text-white hover:bg-white/5 transition-all duration-200"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link key={item.name} href={item.href} className={linkBase}>
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
          <Link
            href="/accommodation"
            className="ml-1 flex items-center gap-1.5 bg-white text-charcoal rounded-full px-4 py-2 text-sm font-body font-semibold whitespace-nowrap hover:bg-brand-50 transition-colors"
          >
            Book Now
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <a
            href="tel:+263780114318"
            className="liquid-glass bg-charcoal/30 w-12 h-12 rounded-full hidden md:flex items-center justify-center text-brand-300 hover:text-white transition-colors"
            aria-label="Call us"
          >
            <Phone className="w-4 h-4" />
          </a>
          <Link
            href="/accommodation"
            className="lg:hidden flex items-center gap-1.5 bg-white text-charcoal rounded-full px-4 py-2.5 text-sm font-body font-semibold"
          >
            Book
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden liquid-glass bg-charcoal/30 w-12 h-12 rounded-full flex items-center justify-center text-white"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: luxuryEase }}
            className="lg:hidden mt-3 liquid-glass bg-charcoal/80 rounded-[1.25rem] overflow-hidden"
            role="dialog"
            aria-label="Mobile navigation"
          >
            <motion.div
              className="p-4 space-y-1"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } },
              }}
            >
              {navigation.map((item) => (
                <motion.div
                  key={item.name}
                  variants={{
                    hidden: reduce ? { opacity: 0 } : { opacity: 0, x: -12 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: luxuryEase } },
                  }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-4 py-3 rounded-full text-base font-body font-medium text-earth-200 hover:text-white hover:bg-white/5 transition-colors",
                      pathname === item.href && "text-brand-300 bg-white/5"
                    )}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="ml-5 border-l border-white/10 pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-2 py-2 text-sm font-body text-earth-400 hover:text-earth-200 transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <div className="pt-3 pb-1 flex flex-col gap-3">
                <a
                  href="tel:+263780114318"
                  className="flex items-center gap-2 px-4 py-2 text-brand-300 font-body font-medium"
                >
                  <Phone className="w-4 h-4" />
                  +263 78 011 4318
                </a>
                <Link
                  href="/accommodation"
                  className="flex items-center justify-center gap-1.5 bg-white text-charcoal rounded-full px-4 py-3 text-sm font-body font-semibold mx-2"
                >
                  Book Now
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
