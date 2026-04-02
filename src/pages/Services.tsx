import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { cn } from '../lib/utils';
import ScrollToTop from '../components/ScrollToTop';
import { useLanguage } from '../i18n/LanguageContext';

const serviceImages: Record<string, string> = {
  bienvenida: 'https://static.wixstatic.com/media/fb9e9f_15f181addf4545a681abae4625f42064~mv2.jpeg',
  detalle: '/benv1.jpg',
  ropa: '/toallas.jpg',
  cocina: '/cafe.jpg',
  juegos: '/juegos.jpg',
  calefaccion: '/aire.jpg',
  chimenea: '/fuego.jpg',
  barbacoa: '/barbacoa.jpg',
  lena: '/leña.jpg',
  parking: '/parking.jpg',
};

export default function Services() {
  const { t } = useLanguage();
  const s = t.services;
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  return (
    <div className="pt-20 bg-[#f5f0e8] min-h-screen">
      {/* Header */}
      <section className="bg-[#f5f2ed] pt-24 pb-16 px-6 relative overflow-hidden border-b border-[#ddd6c8]">
        <div className="absolute left-0 top-0 bottom-0 w-1/5 hidden xl:block opacity-10 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop" className="h-full w-full object-cover" alt="" referrerPolicy="no-referrer" />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/5 hidden xl:block opacity-10 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop" className="h-full w-full object-cover" alt="" referrerPolicy="no-referrer" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-5xl font-display text-[#2d4a2d] mb-10 leading-tight"
          >
            {s.title} <br /> <span>{s.titleSpan}</span>
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
            {s.desc}
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {s.items.map((service) => (
            <div
              key={service.id}
              className="[perspective:1000px] group h-[320px] md:h-[280px]"
            >
              <div
                className={cn(
                  'relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] cursor-pointer',
                  flippedCard === service.id && '[transform:rotateY(180deg)]'
                )}
                onClick={() => setFlippedCard(flippedCard === service.id ? null : service.id)}
              >
                {/* Front */}
                <div className="absolute inset-0 [backface-visibility:hidden] rounded-sm overflow-hidden border border-[#e0d8c8] bg-white shadow-sm">
                  <div className="h-full w-full relative flex flex-col">
                    <div className="flex-grow bg-[#d8d0c0] relative overflow-hidden">
                      {serviceImages[service.id] ? (
                        <img
                          src={serviceImages[service.id]}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#d8d0c0] flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                            <Plus className="text-white/30" size={24} />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4 bg-[#f5f0e8]/95 flex items-center justify-between border-t border-[#e0d8c8]">
                      <h3 className="font-display text-sm text-[#1a1a1a] leading-tight pr-4">{service.title}</h3>
                      <div className="w-8 h-8 rounded-full border border-[#d0c8b8] bg-[#2d4a2d]/5 flex items-center justify-center text-[#2d4a2d] transition-all group-hover:bg-[#2d4a2d] group-hover:border-[#2d4a2d] group-hover:text-[#f5f0e8] flex-shrink-0">
                        <Plus size={16} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-sm overflow-hidden border border-[#e0d8c8] bg-[#f5f0e8] p-5 md:p-8 flex flex-col shadow-md overflow-y-auto">
                  <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#b07d3a] mb-2">{service.tag}</div>
                  <h3 className="font-display text-lg text-black mb-3 leading-tight">{service.title}</h3>
                  <div className="w-8 h-0.5 bg-[#b07d3a] mb-6" />
                  <p className="text-sm font-light text-[#5a5a4a] leading-relaxed flex-grow">{service.desc}</p>
                  <button
                    className="mt-6 text-[10px] font-bold uppercase tracking-widest text-[#9a9a8a] hover:text-[#2d4a2d] transition-colors flex items-center gap-2 border-b border-transparent hover:border-[#2d4a2d] w-fit pb-0.5"
                    onClick={(e) => { e.stopPropagation(); setFlippedCard(null); }}
                  >
                    {s.cerrar}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="relative rounded-3xl overflow-hidden h-[400px] shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop"
            alt="Interior acollidor"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#2d4a2d]/40 flex items-center justify-center text-center p-6 backdrop-blur-[2px]">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-display text-white mb-6">{s.quoteTitle}</h2>
              <p className="text-white/90 text-lg font-light">{s.quoteDesc}</p>
            </div>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
}