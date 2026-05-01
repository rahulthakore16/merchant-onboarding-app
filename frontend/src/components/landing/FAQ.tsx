import { useState } from "react"

const faqs = [
  { q: "What info do I need to register?", a: "You'll need your business name, business type, MCC code, and contact details including email and phone number." },
  { q: "How long does onboarding take?", a: "The entire process takes under 2 minutes. Fill in 3 simple steps and submit." },
  { q: "Can I edit my submission later?", a: "Currently, submissions are final. Make sure to review all details in Step 3 before submitting." },
  { q: "What is an MCC code?", a: "A Merchant Category Code (MCC) is a 4-digit number that classifies your business type for payment processing." },
  { q: "Is my data secure?", a: "Yes. All data is transmitted securely and stored with encryption. We never share your information with third parties." },
  { q: "Who can I contact for help?", a: "Reach out to our support team at support@merchantpay.com for any questions about the onboarding process." },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full border-b border-border py-6 text-left cursor-pointer"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-heading text-base font-light tracking-tight text-dark">
          {question}
        </span>
        <span className="text-muted text-xl shrink-0 transition-transform duration-200" style={{ transform: open ? "rotate(45deg)" : "none" }}>
          +
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p className="text-sm leading-relaxed text-muted">{answer}</p>
      </div>
    </button>
  )
}

export default function FAQ() {
  const left = faqs.filter((_, i) => i % 2 === 0)
  const right = faqs.filter((_, i) => i % 2 === 1)

  return (
    <section id="faq" className="px-6 py-20 md:px-12 md:py-28">
      <div className="mb-12">
        <span className="text-xs uppercase tracking-widest text-muted">FAQ</span>
        <h2 className="mt-4 font-heading text-4xl font-light leading-tight tracking-tight text-dark md:text-5xl">
          FREQUENTLY ASKED
          <br />
          <span className="font-serif italic font-normal">Questions</span>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-0 md:gap-12">
        <div className="flex-1 flex flex-col">
          {left.map((faq) => (
            <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
          ))}
        </div>
        <div className="flex-1 flex flex-col">
          {right.map((faq) => (
            <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  )
}
