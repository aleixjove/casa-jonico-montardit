import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';
import { useLanguage } from '../i18n/LanguageContext';

const zonePhotos: Record<string, string[]> = {
  sala: [
    '/p3/p31.webp', '/p3/p33.webp', '/p3/p34.webp', '/p3/p35.webp', '/p3/p311.webp', '/p3/p313.webp',
    '/p3/p322.webp', '/p3/p323.webp', '/p3/p325.webp', '/p3/p324.webp', '/p3/p321.webp',
  ],
  cocina: [
    '/p3/p314.webp', '/p3/p315.webp', '/p3/p318.webp', '/p3/p319.webp', '/p3/p320.webp',
  ],
  galfer: [
    '/p2/p21.webp', '/p2/p22.webp', '/p2/p29.webp', '/p2/p210.webp', '/p2/p211.webp', '/p2/p212.webp',
  ],
  cabirol: [
    '/p2/p26.webp', '/p2/p27.webp', '/p2/p28.webp',
  ],
  isard: [
    '/p1/p13.webp', '/p1/p14.webp', '/p1/p15.webp', '/p1/p17.webp', '/p1/p16.webp',
  ],
  altellSenglar: [
    '/altres/altell-escales.webp', '/altres/altell1.webp', '/altres/altell2.webp',
  ],
  banys: [
    '/p2/p23.webp', '/p2/p24.webp', '/p2/p25.webp', '/p1/p11.webp', '/p3/p36.webp', '/p3/p37.webp',
  ],
  bodega: [
    '/altres/garatge2.webp', '/altres/garatge1.webp', '/altres/garatge3.webp',
  ],
  patio: [
    '/altres/entrada1.webp', '/altres/entrada2.webp', '/altres/vistes.webp',
    '/altres/taula-fora.webp', '/altres/garatge4.webp', '/altres/fora-pati.webp',
  ],
};

const zoneOrder = ['sala', 'cocina', 'galfer', 'cabirol', 'isard', 'altellSenglar', 'banys', 'bodega', 'patio'];

export default function Space() {
  const { t } = useLanguage();
  const sp = t.space;

  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openViewer = (zoneId: string, index: number) => {
    setActiveZone(zoneId);
    setPhotoIndex(index);
  };
  const closeViewer = () => setActiveZone(null);

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeZone) return;
    setPhotoIndex((prev) => (prev + 1) % zonePhotos[activeZone].length);
  };
  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeZone) return;
    setPhotoIndex((prev) => (prev - 1 + zonePhotos[activeZone].length) % zonePhotos[activeZone].length);
  };

  return (
    <div className="pt-20 bg-[#f5f0e8] min-h-screen">
      {/* Header */}
      <section className="bg-[#f5f2ed] pt-24 pb-16 px-6 relative overflow-hidden border-b border-[#ddd6c8]">
        <div className="absolute left-0 top-0 bottom-0 w-1/5 hidden xl:block opacity-10 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop" className="h-full w-full object-cover" alt="" loading="lazy" referrerPolicy="no-referrer" />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/5 hidden xl:block opacity-10 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop" className="h-full w-full object-cover" alt="" loading="lazy" referrerPolicy="no-referrer" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl md:text-5xl font-display text-[#2d4a2d] mb-10 leading-tight">
            {sp.title} <br /> <span>{sp.titleSpan}</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="w-24 h-px bg-[#b07d3a] mx-auto mb-10" />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-base md:text-lg text-[#5a5a4a] leading-relaxed max-w-2xl mx-auto font-light">
            {sp.desc}
          </motion.p>
        </div>
      </section>

      {/* Stats bar */}
      <div className="grid grid-cols-4 border-b border-[#ddd6c8] bg-[#f5f0e8]">
        {[
          { num: 4, label: sp.stat1 },
          { num: 3, label: sp.stat2 },
          { num: 8, label: sp.stat3 },
          { num: 3, label: sp.stat4 },
        ].map((stat, i) => (
          <div key={i} className="text-center px-2 py-6 md:px-12 border-r border-[#ddd6c8] last:border-r-0 flex-shrink-0">
            <div className="font-display text-2xl text-[#2d4a2d]">{stat.num}</div>
            <div className="text-[8px] md:text-[10px] tracking-widest uppercase text-[#9a9a8a] mt-1 leading-tight">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Zones */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {zoneOrder.map((id, idx) => {
          const zone = sp.zones[id as keyof typeof sp.zones];
          const photos = zonePhotos[id];
          return (
            <React.Fragment key={id}>
              <div className="w-16 h-px bg-[#d0c8b8] mx-auto my-6" />
              <div className={cn('flex flex-col md:flex-row gap-12 items-center', idx % 2 !== 0 && 'md:flex-row-reverse')}>
                {/* Photos grid */}
                <div className="w-full md:w-1/2">
                  <div className="grid grid-cols-2 grid-rows-[200px_140px] gap-2">
                    <div
                      className={`relative overflow-hidden cursor-pointer group rounded-sm ${photos.length === 1 ? 'col-span-2 row-span-2' : 'row-span-2'}`}
                      onClick={() => openViewer(id, 0)}
                    >
                      <img src={photos[0]} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={('imgAlt' in zone && zone.imgAlt) || zone.title} loading="lazy" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <Maximize2 className="text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all" />
                      </div>
                    </div>
                    {photos[1] && (
                      <div
                        className="relative overflow-hidden cursor-pointer group rounded-sm"
                        onClick={() => openViewer(id, 1)}
                      >
                        <img src={photos[1]} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={`${('imgAlt' in zone && zone.imgAlt) || zone.title} — foto 2`} loading="lazy" referrerPolicy="no-referrer" />
                      </div>
                    )}
                    {photos[2] && (
                      <div
                        className="relative overflow-hidden cursor-pointer group rounded-sm"
                        onClick={() => openViewer(id, 2)}
                      >
                        <img src={photos[2]} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={`${('imgAlt' in zone && zone.imgAlt) || zone.title} — foto 3`} loading="lazy" referrerPolicy="no-referrer" />
                        {photos.length > 3 && (
                          <div className="absolute inset-0 bg-[#2d4a2d]/75 flex flex-col items-center justify-center text-white">
                            <span className="text-xl font-light">+{photos.length - 3}</span>
                            <span className="text-[10px] uppercase tracking-widest opacity-70">{sp.verTodas}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Text */}
                <div className="w-full md:w-1/2">
                  <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#b07d3a] mb-3">{zone.tag}</div>
                  <h2 className="font-display text-3xl text-black mb-4">{zone.title}</h2>
                  <div className="w-9 h-0.5 bg-[#b07d3a] mb-6" />
                  <p className="text-sm font-light text-[#5a5a4a] leading-relaxed mb-6">{zone.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {zone.features.map((f, i) => (
                      <span key={i} className="bg-white border border-[#ddd6c8] rounded-full px-3 py-1 text-[11px] font-light text-[#5a5a4a]">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}

        {/* CTA */}
        <div className="text-center py-10 border-t border-[#ddd6c8] mt-6">
          <h2 className="font-display text-2xl text-black mb-3">{sp.ctaTitle}</h2>
          <p className="text-sm font-light text-[#6a6a5a] mb-8">{sp.ctaDesc}</p>
          <Link to="/reservas" className="inline-block px-10 py-3 bg-[#2d4a2d] text-[#f5f0e8] font-display text-sm rounded-sm hover:bg-[#1e3620] transition-colors">
            {sp.ctaBtn}
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeZone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-6"
            onClick={closeViewer}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-3xl flex flex-col gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] bg-black rounded-lg overflow-hidden">
                <img
                  src={zonePhotos[activeZone][photoIndex]}
                  className="w-full h-full object-contain"
                  alt={`${sp.zones[activeZone as keyof typeof sp.zones].title} — foto ${photoIndex + 1}`}
                  referrerPolicy="no-referrer"
                />
                <button onClick={prevPhoto} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors">
                  <ChevronLeft />
                </button>
                <button onClick={nextPhoto} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors">
                  <ChevronRight />
                </button>
                <button onClick={closeViewer} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex justify-between items-center text-white px-1">
                <div className="font-display text-sm">{sp.zones[activeZone as keyof typeof sp.zones].title}</div>
                <div className="text-xs text-white/50">{photoIndex + 1} / {zonePhotos[activeZone].length}</div>
              </div>

              <div className="flex flex-row gap-2 overflow-x-auto pb-1">
                {zonePhotos[activeZone].map((p, i) => (
                  <img
                    key={i}
                    src={p}
                    onClick={() => setPhotoIndex(i)}
                    className={cn(
                      'w-16 h-12 object-cover cursor-pointer rounded-sm transition-all flex-shrink-0',
                      i === photoIndex ? 'opacity-100 border-2 border-[#b07d3a]' : 'opacity-40 hover:opacity-70'
                    )}
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollToTop />
    </div>
  );
}