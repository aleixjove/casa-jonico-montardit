import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../i18n/LanguageContext';

const flags = {
  ca: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Catalonia.svg/40px-Flag_of_Catalonia.svg.png',
  es: 'https://flagcdn.com/w40/es.png',
  en: 'https://flagcdn.com/w40/gb.png',
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const location = useLocation();
  const { locale, setLocale, t } = useLanguage();

  const navLinks = [
    { name: t.nav.inicio, path: '/' },
    { name: t.nav.espacio, path: '/espacio' },
    { name: t.nav.servicios, path: '/servicios' },
    { 
      name: t.nav.nuestraTierra, 
      path: '#',
      submenu: [
        { name: t.nav.actividades, path: '/actividades' },
        { name: t.nav.tradiciones, path: '/tradiciones' },
      ]
    },
    { name: t.nav.testimonios, path: '/testimonios' },
    { name: t.nav.ubicacion, path: '/ubicacion' },
    { name: t.nav.faqs, path: '/faqs' },
    { name: t.nav.contacto, path: '/contacto' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-4',
      scrolled ? 'bg-primary py-3 shadow-lg' : 'bg-primary'
    )}>
      <div className="max-w-[1400px] mx-auto flex items-center pl-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0 mr-15">
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 100 30" className="w-10 h-auto text-white mb-0.5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M15 25 L50 5 L85 25" />
            </svg>
            <div className="flex flex-col items-center">
              <span className="text-lg md:text-xl font-display font-normal text-white uppercase tracking-[0.1em] leading-tight mt-1">
                Casa Jonico
              </span>
              <span className="text-[7px] md:text-[8px] font-sans font-light text-[#a0b4a0] uppercase tracking-[0.25em] mt-1">
                Allotjament Rural
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center flex-1 justify-between">

          {/* Links amb gap petit i lletra més gran */}
          <div className="flex items-center gap-5">
            {navLinks.map((link) => (
              <div
                key={link.path || link.name}
                className="relative group/item flex items-center justify-center"
                onMouseEnter={() => link.submenu && setShowSubmenu(true)}
                onMouseLeave={() => link.submenu && setShowSubmenu(false)}
              >
                {link.submenu ? (
                  <button className="text-[12px] font-bold uppercase tracking-wide transition-all flex items-center gap-1 text-white/70 hover:text-white py-2 whitespace-nowrap">
                    {link.name}
                    <ChevronDown className="w-3 h-3 flex-shrink-0" />
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={cn(
                      "text-[12px] font-bold uppercase tracking-wide transition-all py-2 whitespace-nowrap",
                      location.pathname === link.path
                        ? "text-white opacity-100"
                        : "text-white/70 opacity-70 hover:opacity-100"
                    )}
                  >
                    {link.name}
                  </Link>
                )}

                {link.submenu && (
                  <div className={cn(
                    "absolute top-full left-0 w-48 transition-all duration-300 origin-top pt-2",
                    showSubmenu ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  )}>
                    <div className="bg-primary rounded-xl shadow-2xl p-4">
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className="block py-2 text-[11px] font-bold uppercase tracking-wide text-secondary/70 hover:text-secondary transition-colors"
                          onClick={() => setShowSubmenu(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Reservar + Banderes */}
          <div className="flex items-center gap-3 flex-shrink-0 ml-4">
            <Link
              to="/reservas"
              className={cn(
                "px-5 py-2 rounded-full text-[12px] font-bold uppercase tracking-wide transition-all whitespace-nowrap",
                scrolled
                  ? "bg-secondary text-primary hover:bg-white"
                  : "bg-white text-primary hover:bg-secondary"
              )}
            >
              {t.nav.reservar}
            </Link>

            {/* Selector banderes */}
            <div className="flex items-center gap-1 border border-white/20 rounded-full px-2 py-1">
              {(['ca', 'es', 'en'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLocale(lang)}
                  title={lang.toUpperCase()}
                  className={cn(
                    "transition-all rounded-full p-0.5",
                    locale === lang ? "opacity-100 scale-110" : "opacity-40 hover:opacity-80"
                  )}
                >
                  <img src={flags[lang]} alt={lang} className="w-6 h-4 object-cover rounded-sm" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 ml-auto" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed top-0 left-0 w-full h-full bg-primary z-[60] flex flex-col items-center justify-start gap-4 transition-transform duration-500 md:hidden overflow-y-auto py-20 px-6",
        isOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
      )}>
        <button className="absolute top-5 right-6 text-white" onClick={() => setIsOpen(false)}>
          <X className="w-6 h-6" />
        </button>

        {/* Selector banderes mòbil */}
        <div className="flex items-center gap-3 border border-white/20 rounded-full px-4 py-2">
          {(['ca', 'es', 'en'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLocale(lang)}
              title={lang.toUpperCase()}
              className={cn(
                "transition-all rounded-full p-0.5",
                locale === lang ? "opacity-100 scale-110" : "opacity-40 hover:opacity-80"
              )}
            >
              <img src={flags[lang]} alt={lang} className="w-8 h-5 object-cover rounded-sm" />
            </button>
          ))}
        </div>

        {navLinks.map((link) => (
          link.submenu ? (
            <div key={link.name} className="flex flex-col items-center gap-2">
              <button
                onClick={() => setShowSubmenu(!showSubmenu)}
                className="text-2xl font-serif text-secondary opacity-60 flex items-center gap-2 whitespace-nowrap"
              >
                {link.name}
                <ChevronDown className={cn("w-5 h-5 transition-transform", showSubmenu && "rotate-180")} />
              </button>
              {showSubmenu && (
                <div className="flex flex-col items-center gap-2 mt-1">
                  {link.submenu.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      onClick={() => { setIsOpen(false); setShowSubmenu(false); }}
                      className="text-xl font-serif text-secondary opacity-80"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-2xl font-serif text-secondary transition-all",
                location.pathname === link.path ? "opacity-100 border-b border-[#b07d3a]" : "opacity-60"
              )}
            >
              {link.name}
            </Link>
          )
        ))}

        <Link
          to="/reservas"
          onClick={() => setIsOpen(false)}
          className="mt-4 px-10 py-4 bg-secondary text-primary rounded-full font-bold uppercase tracking-widest"
        >
          {t.nav.reservar}
        </Link>
      </div>
    </nav>
  );
}