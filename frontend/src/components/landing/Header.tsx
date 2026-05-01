import { useState } from "react"
import { Link } from "react-router"
import { X, Menu } from "lucide-react"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="flex items-center justify-between p-6 md:px-12">
      <div className="flex items-center space-x-2">
        <div className="h-2 w-2 rounded-full bg-dark" />
        <div className="h-2 w-2 rounded-full bg-dark" />
        <span className="ml-2 text-sm font-heading font-semibold tracking-tight text-dark">
          MerchantPay
        </span>
      </div>

      <nav className="hidden md:flex items-center space-x-8">
        <a href="#features" className="text-sm text-muted hover:text-dark transition-colors">
          FEATURES
        </a>
        <a href="#how-it-works" className="text-sm text-muted hover:text-dark transition-colors">
          HOW IT WORKS
        </a>
        <a href="#faq" className="text-sm text-muted hover:text-dark transition-colors">
          FAQ
        </a>
        <Link to="/onboard" className="text-sm text-dark hover:underline">
          START ONBOARDING
        </Link>
      </nav>

      <button
        className="md:hidden flex flex-col space-y-1"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? (
          <X className="w-6 h-6 text-dark" />
        ) : (
          <Menu className="w-6 h-6 text-dark" />
        )}
      </button>

      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-page border-b border-border z-50 md:hidden">
          <nav className="flex flex-col p-6 space-y-4">
            <a href="#features" className="text-sm text-muted" onClick={() => setMenuOpen(false)}>
              FEATURES
            </a>
            <a href="#how-it-works" className="text-sm text-muted" onClick={() => setMenuOpen(false)}>
              HOW IT WORKS
            </a>
            <a href="#faq" className="text-sm text-muted" onClick={() => setMenuOpen(false)}>
              FAQ
            </a>
            <Link to="/onboard" className="text-sm text-dark font-semibold" onClick={() => setMenuOpen(false)}>
              START ONBOARDING
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
