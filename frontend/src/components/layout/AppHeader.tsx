import { useState } from "react";
import { Link, useLocation } from "react-router";
import { X, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/onboard", label: "ONBOARD" },
  { to: "/merchants", label: "MERCHANTS" },
];

export default function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="flex items-center justify-between p-6 md:px-12">
      <Link to="/" className="flex items-center space-x-2">
        <div className="h-2 w-2 rounded-full bg-dark" />
        <div className="h-2 w-2 rounded-full bg-dark" />
        <span className="ml-2 text-sm font-heading font-semibold tracking-tight text-dark">
          MerchantPay
        </span>
      </Link>

      <nav className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={cn(
              "text-xs uppercase tracking-widest transition-colors",
              pathname === link.to
                ? "text-dark font-medium"
                : "text-muted hover:text-dark",
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <button
        className="md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? (
          <X className="h-6 w-6 text-dark" />
        ) : (
          <Menu className="h-6 w-6 text-dark" />
        )}
      </button>

      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 z-50 border-b border-border bg-page md:hidden">
          <nav className="flex flex-col space-y-4 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "text-xs uppercase tracking-widest",
                  pathname === link.to ? "text-dark font-medium" : "text-muted",
                )}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
