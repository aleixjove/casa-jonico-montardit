import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();
  const nf = t.notFound;

  // Actualitza <title> per reforçar el senyal de "not found" a Google i navegadors
  useEffect(() => {
    const prev = document.title;
    document.title = `${nf.code} · ${nf.title} — Casa Jonico de Montardit`;
    return () => {
      document.title = prev;
    };
  }, [nf.code, nf.title]);

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center px-6 pt-20 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg text-center"
      >
        <div className="font-display text-8xl md:text-9xl text-[#b07d3a]/40 leading-none mb-2 tabular-nums">
          {nf.code}
        </div>
        <div className="w-16 h-px bg-[#b07d3a] mx-auto mb-8" />
        <h1 className="font-display text-3xl md:text-4xl text-[#2d4a2d] mb-6 leading-tight">
          {nf.title}
        </h1>
        <p className="text-base text-[#5a5a4a] font-light leading-relaxed mb-10">
          {nf.desc}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-[#2d4a2d] text-[#f5f0e8] rounded-sm font-display text-sm hover:bg-[#1e3620] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {nf.cta}
        </Link>
      </motion.div>
    </div>
  );
}
