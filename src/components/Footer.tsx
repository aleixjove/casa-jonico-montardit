import { Link } from 'react-router-dom';
import { Instagram, MessageCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-secondary pt-12 pb-0 w-full">
      <div className="max-w-7xl mx-auto px-6 pb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
        
        {/* Brand Column */}
        <div className="footer-brand">
          <div className="flex flex-col items-start">
            <svg viewBox="0 0 100 30" className="w-12 h-auto text-secondary mb-1" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M15 25 L50 5 L85 25" />
            </svg>
            <div className="font-display text-xl font-normal text-secondary tracking-[0.06em] uppercase leading-tight mt-1">
              Casa Jonico
              <span className="block text-[9px] font-sans font-light tracking-[0.22em] text-[#a0b4a0] uppercase mt-1">
                Allotjament Rural
              </span>
            </div>
          </div>
          <p className="text-xs font-light text-[#a0b4a0] leading-relaxed mt-3.5 mb-5">
            {t.footer.tagline}
          </p>
          <div className="flex gap-2.5">
            <a 
              href="https://www.instagram.com/casajonico" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-[34px] h-[34px] border border-secondary/20 rounded-full flex items-center justify-center text-[#a0b4a0] transition-all hover:border-[#b07d3a] hover:text-secondary hover:bg-[#b07d3a]/15"
              title="Instagram"
            >
              <Instagram size={15} strokeWidth={1.5} />
            </a>
            <a 
              href="https://wa.me/34607830381" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-[34px] h-[34px] border border-secondary/20 rounded-full flex items-center justify-center text-[#a0b4a0] transition-all hover:border-[#b07d3a] hover:text-secondary hover:bg-[#b07d3a]/15"
              title="WhatsApp"
            >
              <MessageCircle size={15} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Contact Column */}
        <div>
          <div className="text-[9px] font-medium tracking-[0.2em] uppercase text-[#b07d3a] mb-4">{t.footer.contacto}</div>
          <div className="flex flex-col mb-3">
            <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-[#6a8a6a] mb-0.5">{t.footer.telefono}</span>
            <span className="text-sm font-light text-[#e0dcd4]">
              <a href="tel:+34607830381" className="hover:text-secondary transition-colors">+34 607 83 03 81</a>
            </span>
          </div>
          <div className="flex flex-col mb-3">
            <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-[#6a8a6a] mb-0.5">{t.footer.email}</span>
            <span className="text-sm font-light text-[#e0dcd4]">
              <a href="mailto:reserves@casajonico.com" className="hover:text-secondary transition-colors">reserves@casajonico.com</a>
            </span>
          </div>
          <div className="mt-3.5 pt-3.5 border-t border-secondary/10 text-xs font-light text-[#7a9a7a] leading-relaxed italic">
            Montardit de Dalt<br />
            Pallars Sobirà · Lleida, 25568
          </div>
        </div>

        {/* Explore Column */}
        <div>
          <div className="text-[9px] font-medium tracking-[0.2em] uppercase text-[#b07d3a] mb-4">{t.footer.explorar}</div>
          <ul className="flex flex-col gap-2.5">
            {[
              { name: t.nav.inicio, path: '/' },
              { name: t.nav.espacio, path: '/espacio' },
              { name: t.nav.servicios, path: '/servicios' },
              { name: t.nav.actividades, path: '/actividades' },
              { name: t.nav.tradiciones, path: '/tradiciones' },
              { name: t.nav.testimonios, path: '/testimonios' },
              { name: t.nav.ubicacion, path: '/ubicacion' },
              { name: t.nav.reservar, path: '/reservas' },
            ].map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className="group text-xs font-light text-[#a0b4a0] flex items-center gap-2 transition-colors hover:text-secondary"
                >
                  <span className="w-3.5 h-[1px] bg-[#b07d3a] opacity-50 transition-all group-hover:opacity-100 group-hover:w-5" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <div className="text-[9px] font-medium tracking-[0.2em] uppercase text-[#b07d3a] mb-4">{t.footer.legal}</div>
          <ul className="flex flex-col gap-2.5">
  <li><Link to="/privacidad" className="text-[11px] font-light text-[#7a9a7a] hover:text-[#a0b4a0] transition-colors">{t.footer.privacidad}</Link></li>
  <li><Link to="/terminos" className="text-[11px] font-light text-[#7a9a7a] hover:text-[#a0b4a0] transition-colors">{t.footer.terminos}</Link></li>
  <li><Link to="/cancelacion" className="text-[11px] font-light text-[#7a9a7a] hover:text-[#a0b4a0] transition-colors">{t.footer.reembolso}</Link></li>
  <li><Link to="/accesibilitat" className="text-[11px] font-light text-[#7a9a7a] hover:text-[#a0b4a0] transition-colors">{t.footer.accesibilidad}</Link></li>
  <li><span className="text-[11px] font-light text-[#7a9a7a]">HUTL-062592</span></li>
</ul>
        </div>

      </div>

      <div className="border-t border-secondary/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[11px] font-light text-[#5a7a5a] tracking-wider text-center sm:text-left">
            © {new Date().getFullYear()} Casa Jonico de Montardit. {t.footer.derechos}
          </span>
          <span className="flex items-center gap-2 text-[11px] font-light text-[#5a7a5a]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b07d3a] opacity-60" />
            {t.footer.reservaDirecta}
          </span>
        </div>
      </div>
    </footer>
  );
}