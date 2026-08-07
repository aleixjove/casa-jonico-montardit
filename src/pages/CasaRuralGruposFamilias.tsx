import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';
import { useLanguage } from '../i18n/LanguageContext';

export default function CasaRuralGruposFamilias() {
  const { t } = useLanguage();
  const p = t.casaRuralGrupos;

  useEffect(() => {
    const prevTitle = document.title;
    const descEl = document.querySelector('meta[name="description"]');
    const prevDesc = descEl?.getAttribute('content') ?? '';
    document.title = p.metaTitle;
    descEl?.setAttribute('content', p.metaDesc);
    return () => {
      document.title = prevTitle;
      descEl?.setAttribute('content', prevDesc);
    };
  }, [p.metaTitle, p.metaDesc]);

  return (
    <div className="pt-20 bg-[#f5f0e8] min-h-screen">
      {/* Header */}
      <section className="bg-[#f5f2ed] pt-24 pb-16 px-6 relative overflow-hidden border-b border-[#ddd6c8]">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#b07d3a] mb-4 block"
          >
            {p.badge}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-5xl font-display text-[#2d4a2d] mb-10 leading-tight"
          >
            {p.title} <br /> <span>{p.titleSpan}</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-24 h-px bg-[#b07d3a] mx-auto mb-10"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-lg text-[#5a5a4a] leading-relaxed max-w-2xl mx-auto font-light"
          >
            {p.desc}
          </motion.p>
        </div>
      </section>

      {/* Sections */}
      <section className="max-w-3xl mx-auto px-6 py-16 space-y-14">
        {p.sections.map((s, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl text-[#2d4a2d] mb-4 leading-tight">
              {s.h2}
            </h2>
            <div className="w-12 h-px bg-[#b07d3a] mb-6" />
            <div
              className="text-base font-light text-[#4a4a3a] leading-relaxed [&_a]:text-[#2d4a2d] [&_a]:font-medium [&_a]:underline [&_a]:decoration-[#b07d3a] [&_a]:underline-offset-4 hover:[&_a]:decoration-[#2d4a2d]"
              dangerouslySetInnerHTML={{ __html: s.body }}
            />
          </motion.article>
        ))}
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 pb-16 text-center">
        <h2 className="font-display text-2xl md:text-3xl text-[#2d4a2d] mb-8">
          {p.ctaTitle}
        </h2>
        <Link
          to="/reservas"
          className="inline-block px-10 py-4 bg-[#2d4a2d] text-[#f5f0e8] rounded-sm font-display text-sm hover:bg-[#1e3620] transition-colors"
        >
          {p.ctaButton}
        </Link>
      </section>

      {/* Quote */}
      <section className="max-w-4xl mx-auto px-6 pt-4 pb-16 text-center">
        <div className="w-16 h-px bg-[#d0c8b8] mx-auto mb-6" />
        <h2 className="font-display text-3xl md:text-4xl text-[#2d4a2d] mb-6">{p.quoteTitle}</h2>
        <p className="text-base font-light text-[#5a5a4a] max-w-2xl mx-auto">{p.quoteDesc}</p>
      </section>

      <ScrollToTop />
    </div>
  );
}
