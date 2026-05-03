import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, MapPin } from "lucide-react";
import { cn } from "./lib/utils";

import { Home } from "./pages/Home";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { Terms } from "./pages/Terms";
import { AboutUs } from "./pages/AboutUs";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const handleWhatsApp = (productName = "") => {
  let text = "Hello! I would like to inquire about a floral arrangement.";
  if (productName) {
    text = `Hello! I would like to order the '${productName}' from your collection.`;
  }
  const encodedText = encodeURIComponent(text);
  fetch("/api/orders/initiate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId: productName || "general_inquiry", userPhone: "+918053351085" })
  }).catch(console.error);
  window.open(`https://wa.me/918053351085?text=${encodedText}`, "_blank");
};

function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] overflow-hidden selection:bg-[var(--color-sage)] selection:text-white">
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4 md:px-12 flex justify-between items-center",
          isScrolled ? "bg-[var(--color-ivory)]/90 backdrop-blur-md thin-border-b" : "bg-[var(--color-ivory)]/80 backdrop-blur-sm thin-border-b"
        )}
      >
        <div className="hidden md:flex gap-8 items-center text-[11px] uppercase tracking-[0.2em] font-semibold text-[var(--color-slate)]">
          <Link to="/#collections" className="hover:text-[var(--color-sage)] transition-colors">Collections</Link>
          <Link to="/about" className="hover:text-[var(--color-sage)] transition-colors">About Us</Link>
          <Link to="/#gallery" className="hover:text-[var(--color-sage)] transition-colors">Gallery</Link>
        </div>
        <Link to="/" className="text-2xl font-serif tracking-tighter italic lowercase font-light text-[var(--color-slate-dark)] absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
          petal.pixel_
        </Link>
        <div className="flex gap-4 md:gap-6 items-center">
          <button
            onClick={() => handleWhatsApp()}
            className="text-[11px] uppercase tracking-widest border border-[var(--color-slate)] text-[var(--color-slate)] px-5 py-2 hover:bg-[var(--color-slate)] hover:text-[var(--color-ivory)] transition-all hidden sm:flex items-center"
          >
            <span>Order via WhatsApp</span>
          </button>
          <button
            onClick={() => handleWhatsApp()}
            className="sm:hidden text-[var(--color-slate)] border border-[var(--color-slate)] p-2 hover:bg-[var(--color-slate)] hover:text-[var(--color-ivory)] transition-all flex items-center justify-center"
            aria-label="Order via WhatsApp"
          >
             <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {children}

      <footer className="bg-[var(--color-ivory)]/40 text-[var(--color-slate)] border-t border-[var(--color-slate)]/10 pt-20 pb-10 px-6 md:px-12 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 border-b border-[var(--color-slate)]/10 pb-12">
          <div className="col-span-1 lg:col-span-2">
            <h2 className="text-2xl font-serif tracking-tighter italic lowercase font-light mb-4 text-[var(--color-slate-dark)]">petal.pixel_</h2>
            <p className="text-[var(--color-slate-light)] text-xs max-w-sm mb-8 leading-relaxed">
              Curated floral artistry for the discerning eye. Delivered across the city, designed to stop time.
            </p>
            <div className="flex items-center space-x-2 text-[var(--color-slate)]/50 text-[10px] uppercase tracking-widest font-mono">
              <MapPin className="w-3 h-3" />
              <span>Panipat, Haryana</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-6 opacity-70">Explore</h4>
            <ul className="space-y-4 text-xs font-light">
              <li><Link to="/#collections" className="hover:text-[var(--color-sage)] transition-colors">Our Collection</Link></li>
              <li><Link to="/#process" className="hover:text-[var(--color-sage)] transition-colors">The Process</Link></li>
              <li><Link to="/about" className="hover:text-[var(--color-sage)] transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-6 opacity-70">Connect</h4>
            <ul className="space-y-4 text-xs font-light">
              <li><button onClick={() => handleWhatsApp()} className="hover:text-[var(--color-sage)] transition-colors">WhatsApp Order</button></li>
              <li><a href="https://instagram.com/petals.pixels_" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-sage)] transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-[1600px] mx-auto mt-6 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-widest text-[var(--color-slate)]/50">
          <div className="flex gap-4 md:gap-6 mb-4 md:mb-0 items-center">
            <div className="flex gap-4 text-[var(--color-slate-dark)] font-bold">
              <span>Panipat, Haryana</span>
            </div>
          </div>
          <div className="flex space-x-6 items-center">
            <Link to="/privacy" className="hover:text-[var(--color-slate)] transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-[var(--color-slate)] transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
