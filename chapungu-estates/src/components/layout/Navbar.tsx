"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
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

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const navBg = isScrolled || !isHome
    ? "bg-charcoal/98 backdrop-blur-md shadow-lg"
    : "bg-transparent";

  const logoColor = isScrolled || !isHome ? "text-white" : "text-white";
  const linkColor = isScrolled || !isHome ? "text-earth-200 hover:text-white" : "text-white/90 hover:text-white";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
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
          className={cn("flex flex-col leading-none group", logoColor)}
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
          {navigation.map((item) => (
            <div key={item.name} className="relative">
              {item.children ? (
                <>
                  <button
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 text-sm font-body font-medium tracking-wide transition-colors",
                      linkColor,
                      pathname.startsWith(item.href) && "text-brand-400"
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
                  </button>
                  {openDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-charcoal border border-earth-700 shadow-luxury-lg py-2 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm font-body text-earth-200 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-body font-medium tracking-wide transition-colors",
                    linkColor,
                    pathname === item.href && "text-brand-400"
                  )}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
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
          <Link
            href="/accommodation"
            className="hidden md:inline-flex btn-gold text-xs py-2.5 px-5"
          >
            Book Now
          </Link>
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
      {isOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-charcoal border-t border-earth-700"
          role="dialog"
          aria-label="Mobile navigation"
        >
          <div className="container-site py-4 space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
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
              </div>
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
          </div>
        </div>
      )}
    </header>
  );
}
