import { Briefcase, UserCheck, ClipboardCheck } from "lucide-react"
import type { ReactNode } from "react"

const features: { icon: ReactNode; step: string; title: string; description: string }[] = [
  {
    icon: <Briefcase className="w-5 h-5" strokeWidth={1.5} />,
    step: "01",
    title: "Business Info",
    description: "Register your business name, type and MCC code",
  },
  {
    icon: <UserCheck className="w-5 h-5" strokeWidth={1.5} />,
    step: "02",
    title: "Contact Details",
    description: "Verify email, phone and contact person",
  },
  {
    icon: <ClipboardCheck className="w-5 h-5" strokeWidth={1.5} />,
    step: "03",
    title: "Quick Review",
    description: "Review and submit in one click",
  },
]

export default function Features() {
  return (
    <section id="features" className="px-6 py-20 md:px-12 md:py-28">
      <div className="grid gap-8 md:grid-cols-3 md:gap-6">
        {features.map((f) => (
          <div key={f.step} className="flex flex-col gap-4 border-t border-border pt-6">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted tracking-widest">{f.step}</span>
              <span className="text-dark">{f.icon}</span>
            </div>
            <h3 className="font-heading text-xl font-light tracking-tight text-dark">
              {f.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
