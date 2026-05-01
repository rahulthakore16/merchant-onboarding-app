import { BrowserRouter, Routes, Route } from "react-router"
import LandingPage from "./pages/LandingPage"
import OnboardPage from "./pages/OnboardPage"
import MerchantsPage from "./pages/MerchantsPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboard" element={<OnboardPage />} />
        <Route path="/merchants" element={<MerchantsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
