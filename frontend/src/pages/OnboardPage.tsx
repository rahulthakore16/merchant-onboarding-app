import { Link } from "react-router"

export default function OnboardPage() {
  return (
    <div className="min-h-screen bg-page flex flex-col items-center justify-center px-6">
      <h1 className="font-heading text-4xl font-light tracking-tight text-dark">
        Onboarding
      </h1>
      <p className="mt-4 text-sm text-muted">
        Multi-step onboarding form coming soon.
      </p>
      <Link to="/" className="mt-8 text-xs uppercase tracking-widest text-dark hover:underline">
        Back to Home
      </Link>
    </div>
  )
}
