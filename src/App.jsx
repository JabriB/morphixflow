import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { GradientDots } from './components/ui/gradient-dots';

// Landing page
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import HowItWorks from './components/sections/HowItWorks';
import Results from './components/sections/Results';
import Pakete from './components/sections/Pakete';
import GoogleReviews from './components/sections/GoogleReviews';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';

// App pages
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ResetPassword from './pages/auth/ResetPassword';

function LandingPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <HowItWorks />
        <Results />
        <GoogleReviews />
        <Pakete />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        {/* Fixed gradient-dot background behind all pages */}
        <GradientDots
          duration={40}
          colorCycleDuration={10}
          dotSize={5}
          spacing={18}
          style={{ position: 'fixed', zIndex: 0, pointerEvents: 'none' }}
        />
        <div className="bg-mesh" style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <Routes>
          <Route path="/"               element={<LandingPage />} />
          <Route path="/dashboard"      element={<Dashboard />} />
          <Route path="/login"          element={<Login />} />
          <Route path="/signup"         element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
