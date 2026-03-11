import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PromoPopup from './components/PromoPopup';
import Home from './pages/Home';
import Space from './pages/Space';
import Services from './pages/Services';
import Activities from './pages/Activities';
import Traditions from './pages/Traditions';
import Pricing from './pages/Pricing'; // This is now the Booking page
import Faqs from './pages/Faqs';
import Testimonials from './pages/Testimonials';
import Location from './pages/Location';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <PromoPopup />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/espacio" element={<Space />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/actividades" element={<Activities />} />
            <Route path="/tradiciones" element={<Traditions />} />
            <Route path="/reservas" element={<Pricing />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/testimonios" element={<Testimonials />} />
            <Route path="/ubicacion" element={<Location />} />
            <Route path="/contacto" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
