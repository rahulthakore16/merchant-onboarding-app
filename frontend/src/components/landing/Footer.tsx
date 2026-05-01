import { Link } from "react-router"

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10 md:px-12">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <span className="text-xs uppercase tracking-widest text-muted">
          MerchantPay &copy; {new Date().getFullYear()}
        </span>
        <div className="flex items-center gap-6">
          <Link to="/onboard" className="text-xs uppercase tracking-widest text-dark hover:underline">
            Start Onboarding
          </Link>
          <Link to="/merchants" className="text-xs uppercase tracking-widest text-dark hover:underline">
            Merchants
          </Link>
        </div>
      </div>
    </footer>
  )
}
