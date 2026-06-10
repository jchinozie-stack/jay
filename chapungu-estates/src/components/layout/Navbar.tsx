"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
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
  { name: "Butchery & Shop", href: "/butchery" },
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Glassmorphism: frosted charcoal once scrolled (or on inner pages),
  // fully transparent over the home hero.
  const navBg =
    isScrolled || !isHome
      ? "bg-charcoal/70 supports-[backdrop-filter]:bg-charcoal/60 backdrop-blur-xl backdrop-saturate-150 border-b border-white/10 shadow-lg shadow-charcoal/20"
      : "bg-transparent border-b border-transparent";

  const linkColor =
    isScrolled || !isHome
      ? "text-earth-200 hover:text-white"
      : "text-white/90 hover:text-white";

  return (
    <motion.header
      initial={reduce ? false : { y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: luxuryEase }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500",
        navBg
      )}
      role="banner"
    >
      <nav
        className="container-site flex items-center justify-between h-18"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex flex-col leading-none group text-white"
          aria-label="Chapungu Estates — Home"
        >
          <span className="font-display text-2xl font-semibold tracking-tight">
            Chapungu
          </span>
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-brand-400 font-medium">
            Estates
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
          {navigation.map((item) => {
            const active = isItemActive(pathname, item);
            return (
              <div key={item.name} className="relative">
                {item.children ? (
                  <>
                    <button
                      className={cn(
                        "relative flex items-center gap-1 px-3 py-2 text-sm font-body font-medium tracking-wide transition-colors",
                        linkColor,
                        active && "text-brand-400"
                      )}
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.name ? null : item.name)
                      }
                      aria-expanded={openDropdown === item.name}
                      aria-haspopup="true"
                    >
                      {item.name}
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          openDropdown === item.name && "rotate-180"
                        )}
                      />
                      {active && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute left-3 right-3 -bottom-px h-px bg-brand-400"
                          transition={{ type: "spring", stiffness: 420, damping: 36 }}
                        />
                      )}
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.22, ease: luxuryEase }}
                          className="absolute top-full left-0 mt-1 w-52 bg-charcoal/85 supports-[backdrop-filter]:bg-charcoal/75 backdrop-blur-xl backdrop-saturate-150 border border-white/10 shadow-luxury-lg py-2 z-50 origin-top"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block px-4 py-2.5 text-sm font-body text-earth-200 hover:text-white hover:bg-white/5 hover:pl-5 transition-all duration-200"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "relative block px-3 py-2 text-sm font-body font-medium tracking-wide transition-colors",
                      linkColor,
                      active && "text-brand-400"
                    )}
                  >
                    {item.name}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-3 right-3 -bottom-px h-px bg-brand-400"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    )}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+263780114318"
            className="hidden md:flex items-center gap-1.5 text-brand-400 hover:text-brand-300 transition-colors text-sm font-body font-medium"
            aria-label="Call us"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">+263 78 011 4318</span>
          </a>
          <motion.div
            whileHover={reduce ? undefined : { scale: 1.04 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            className="hidden md:block"
          >
            <Link href="/accommodation" className="btn-gold text-xs py-2.5 px-5">
              Book Now
            </Link>
          </motion.div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            className="lg:hidden bg-charcoal/85 supports-[backdrop-filter]:bg-charcoal/75 backdrop-blur-xl backdrop-saturate-150 border-t border-white/10 overflow-hidden"
            role="dialog"
            aria-label="Mobile navigation"
          >
            <motion.div
              className="container-site py-4 space-y-1"
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
                      "block px-4 py-3 text-base font-body font-medium text-earth-200 hover:text-white hover:bg-white/5 transition-colors",
                      pathname === item.href && "text-brand-400"
                    )}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="ml-4 border-l border-earth-700 pl-4">
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
              <div className="pt-4 pb-2 flex flex-col gap-3">
                <a
                  href="tel:+263780114318"
                  className="flex items-center gap-2 px-4 py-3 text-brand-400 font-body font-medium"
                >
                  <Phone className="w-4 h-4" />
                  +263 78 011 4318
                </a>
                <Link href="/accommodation" className="btn-gold text-center mx-4">
                  Book Now
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
