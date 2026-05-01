import Header from "../components/landing/Header"
import Hero from "../components/landing/Hero"
import Features from "../components/landing/Features"
import HowItWorks from "../components/landing/HowItWorks"
import FAQ from "../components/landing/FAQ"
import Footer from "../components/landing/Footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-page">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
