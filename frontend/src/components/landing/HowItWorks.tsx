export default function HowItWorks() {
  const stats = [
    { label: "Processing Time", value: "Under 2 minutes" },
    { label: "Steps", value: "3 simple steps" },
    { label: "Built For", value: "All merchant types" },
  ]

  return (
    <section id="how-it-works" className="px-6 py-20 md:px-12 md:py-28">
      <div className="flex flex-col gap-16 md:flex-row md:gap-24">
        <div className="flex-1">
          <span className="text-xs uppercase tracking-widest text-muted">How It Works</span>
          <h2 className="mt-4 font-heading text-4xl font-light leading-tight tracking-tight text-dark md:text-5xl">
            SEAMLESS
            <br />
            <span className="font-serif italic font-normal">Onboarding</span>
          </h2>
        </div>

        <div className="flex-1 flex flex-col gap-8">
          <div className="flex flex-col gap-5 text-sm leading-relaxed text-muted">
            <p>
              Our platform streamlines merchant registration — helping businesses
              get set up quickly with validated data and a clean review process.
            </p>
            <p>
              With a simple 3-step form, accurate validation, and instant
              submission, you onboard merchants without the hassle.
            </p>
          </div>

          <div className="flex flex-col gap-3 border-t border-border pt-6">
            {stats.map(({ label, value }) => (
              <div key={label} className="flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-widest text-muted">{label}</span>
                <span className="text-sm font-heading font-light text-dark">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
