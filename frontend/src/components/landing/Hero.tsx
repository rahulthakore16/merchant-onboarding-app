import { Link } from "react-router"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative px-6 pt-12 pb-24 md:px-12 md:pt-20 md:pb-32">
      <div
        className="absolute right-0 top-0 h-[300px] w-[300px] animate-pulse rounded-full bg-gradient-to-br from-pink-400 via-orange-300 to-yellow-200 opacity-70 blur-3xl md:h-[500px] md:w-[500px]"
        aria-hidden="true"
      />

      <div className="relative">
        <h1 className="max-w-3xl font-heading text-5xl font-light leading-tight tracking-tight text-dark md:text-6xl lg:text-7xl">
          SIMPLE
          <br />
          MERCHANT
          <br />
          ONBOARDING.
        </h1>

        <div className="mt-16 flex flex-col gap-12 md:mt-24 md:flex-row md:justify-between">
          <div className="max-w-md">
            <Link to="/onboard">
              <Button variant="outline" className="rounded-full border-2 border-dark px-8 text-dark hover:bg-dark hover:text-page">
                <span className="relative">
                  START ONBOARDING
                  <div className="absolute -left-4 -right-4 -top-4 -bottom-4 animate-spin-slow rounded-full border border-dark opacity-50" />
                </span>
              </Button>
            </Link>
            <p className="mt-8 text-sm leading-relaxed text-muted uppercase tracking-wide">
              We simplify merchant registration
              <br />
              and payment processing.
            </p>
          </div>

          <div className="flex items-end">
            <a href="#how-it-works" className="flex items-center space-x-2 group">
              <span className="text-sm text-dark">HOW IT WORKS</span>
              <span className="h-px w-12 bg-dark transition-all group-hover:w-16" />
            </a>
          </div>
        </div>

        <p className="mt-16 max-w-xl text-sm leading-relaxed text-muted md:mt-24">
          Register your business, verify contact details, and go live in minutes.
          Our 3-step onboarding process is built for speed and accuracy — so you
          can focus on what matters most.
        </p>
      </div>
    </section>
  )
}
