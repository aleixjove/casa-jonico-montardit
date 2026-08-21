import { useEffect } from 'react';
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
import Privacy from './pages/legal/Privacy';
import Terms from './pages/legal/Terms';
import Refund from './pages/legal/Refund';
import Accessibility from './pages/legal/Accessibility';
import CasaRuralPallars from './pages/CasaRuralPallars';
import CasaRuralGruposFamilias from './pages/CasaRuralGruposFamilias';
import Gastronomia from './pages/Gastronomia';
import NotFound from './pages/NotFound';

// NOTA: NO usem React.lazy per les rutes. Amb prerender + client-only
// hydration, el Suspense fallback substitueix el contingut prerenderitzat
// mentre el chunk arriba i causa un CLS massiu al Footer (mesurat 0.407
// al deploy 689ff22). El code splitting el fem via manual chunks a
// vite.config: React/Motion/Icons van a chunks vendor separats que es
// cachegen entre deploys, però les rutes s'inclouen al bundle inicial
// perquè el HTML prerenderitzat s'hidra sense flash.

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Actualitza <link rel="canonical"> a cada canvi de ruta perquè cada pàgina
// declari la seva pròpia URL canònica (evita que Google dedupliqui pàgines).
const CANONICAL_BASE = 'https://casajonicomontardit.com';
function CanonicalUpdater() {
  const { pathname } = useLocation();

  useEffect(() => {
    const el = document.querySelector('link[rel="canonical"]');
    if (!el) return;
    const path = pathname === '/' ? '' : pathname.replace(/\/$/, '');
    el.setAttribute('href', `${CANONICAL_BASE}${path}`);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <CanonicalUpdater />
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
            <Route path="/gastronomia" element={<Gastronomia />} />
            <Route path="/reservas" element={<Pricing />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/testimonios" element={<Testimonials />} />
            <Route path="/ubicacion" element={<Location />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/privacidad" element={<Privacy />} />
            <Route path="/terminos" element={<Terms />} />
            <Route path="/cancelacion" element={<Refund />} />
            <Route path="/accesibilitat" element={<Accessibility />} />
            <Route path="/casa-rural-pallars-sobira" element={<CasaRuralPallars />} />
            <Route path="/casa-rural-grupos-familias" element={<CasaRuralGruposFamilias />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
