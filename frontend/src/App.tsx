import { BrowserRouter, Routes, Route, useLocation } from "react-router"
import { Toaster } from "sonner"
import { AnimatePresence } from "framer-motion"
import ErrorBoundary from "./components/ErrorBoundary"
import LandingPage from "./pages/LandingPage"
import OnboardPage from "./pages/OnboardPage"
import MerchantsPage from "./pages/MerchantsPage"

function AnimatedRoutes() {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboard" element={<OnboardPage />} />
        <Route path="/merchants" element={<MerchantsPage />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AnimatedRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            className: "font-sans text-sm",
          }}
        />
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
