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

const WHATSAPP_NUMBER = '4915123456789'; // ← replace with real number
const WHATSAPP_MESSAGE = encodeURIComponent('Hallo! Ich interessiere mich für eure Leistungen.');

function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp kontaktieren"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: '#25D366',
        boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = '0 6px 28px rgba(37,211,102,0.6)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.45)';
      }}
    >
      {/* WhatsApp SVG icon */}
      <svg width="28" height="28" viewBox="0 0 32 32" fill="white" aria-hidden="true">
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.648 4.804 1.782 6.818L2 30l7.374-1.758A13.932 13.932 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.52 11.52 0 01-5.874-1.608l-.42-.248-4.374 1.042 1.078-4.258-.274-.44A11.52 11.52 0 014.4 16C4.4 9.594 9.594 4.4 16 4.4S27.6 9.594 27.6 16 22.406 27.6 16 27.6zm6.32-8.62c-.346-.174-2.05-1.012-2.368-1.128-.318-.116-.55-.174-.78.174-.232.346-.896 1.128-1.098 1.36-.202.232-.404.26-.75.086-.346-.174-1.46-.538-2.78-1.714-1.028-.916-1.722-2.048-1.924-2.394-.202-.346-.022-.534.152-.706.156-.154.346-.404.52-.606.172-.202.23-.346.346-.578.116-.232.058-.434-.028-.608-.087-.174-.78-1.882-1.07-2.578-.282-.676-.568-.584-.78-.594l-.664-.012c-.232 0-.608.086-.926.434-.318.346-1.214 1.186-1.214 2.892s1.242 3.354 1.416 3.586c.174.232 2.444 3.732 5.922 5.234.828.358 1.474.572 1.978.732.832.264 1.588.226 2.186.138.666-.1 2.05-.838 2.34-1.648.29-.81.29-1.504.202-1.648-.086-.144-.318-.232-.664-.406z"/>
      </svg>
    </a>
  );
}

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
      <WhatsAppButton />
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
