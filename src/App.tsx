import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PromoPopup from './components/PromoPopup';

// Rutes carregades on-demand: cada pàgina és el seu propi chunk JS.
// El bundle inicial passa de ~640 KB a ~200-250 KB (només React, Router,
// Motion, Navbar, Footer + la ruta activa). El prerender de Puppeteer
// carrega el chunk específic per cada ruta abans de capturar el HTML,
// així que el SEO es manté intacte.
const Home = lazy(() => import('./pages/Home'));
const Space = lazy(() => import('./pages/Space'));
const Services = lazy(() => import('./pages/Services'));
const Activities = lazy(() => import('./pages/Activities'));
const Traditions = lazy(() => import('./pages/Traditions'));
const Gastronomia = lazy(() => import('./pages/Gastronomia'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Faqs = lazy(() => import('./pages/Faqs'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Location = lazy(() => import('./pages/Location'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/legal/Privacy'));
const Terms = lazy(() => import('./pages/legal/Terms'));
const Refund = lazy(() => import('./pages/legal/Refund'));
const Accessibility = lazy(() => import('./pages/legal/Accessibility'));
const CasaRuralPallars = lazy(() => import('./pages/CasaRuralPallars'));
const CasaRuralGruposFamilias = lazy(() => import('./pages/CasaRuralGruposFamilias'));
const NotFound = lazy(() => import('./pages/NotFound'));

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

// Fallback mentre un chunk es descarrega. Deliberadament transparent i sense
// text — la majoria de navegacions carreguen el chunk en <300ms i un spinner
// hi seria visible més que útil. El div manté l'alçada perquè no hi hagi
// layout shift si el chunk triga.
function RouteFallback() {
  return <div className="min-h-[60vh]" aria-hidden="true" />;
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
          <Suspense fallback={<RouteFallback />}>
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
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
