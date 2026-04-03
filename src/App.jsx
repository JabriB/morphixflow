import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import HowItWorks from './components/sections/HowItWorks';
import Results from './components/sections/Results';
import Pakete from './components/sections/Pakete';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <ThemeProvider>
      <div style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}>
        <Navbar />
        <main>
          <Hero />
          <Services />
          <HowItWorks />
          <Results />
          <Pakete />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
