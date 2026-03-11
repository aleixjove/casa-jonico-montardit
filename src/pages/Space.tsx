import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';
import { useLanguage } from '../i18n/LanguageContext';

const zonePhotos: Record<string, string[]> = {
  sala: [
    'https://static.wixstatic.com/media/fb9e9f_8e93fc3daf8249778d3fd4614dc85d66~mv2.png',
    'https://static.wixstatic.com/media/fb9e9f_15cd150a805d4cfc9ac4e633985ef63e~mv2.png',
    'https://static.wixstatic.com/media/fb9e9f_2bcedf5997ad4b8a99a435195ce08551~mv2.png',
    'https://static.wixstatic.com/media/fb9e9f_1e91fc0543a14bae95d39cfb47d623d8~mv2.png',
  ],
  cocina: [
    'https://static.wixstatic.com/media/fb9e9f_1a2d652b85f54d46b42d0c2bcad5ace7~mv2.png',
    'https://static.wixstatic.com/media/fb9e9f_9ac6da6e3fc148b6a0f2e8a1247c53cd~mv2.png',
    'https://static.wixstatic.com/media/fb9e9f_ff239d87fd1b476f86a04c7351f07a40~mv2.png',
    'https://static.wixstatic.com/media/fb9e9f_97f6061f8bf64503a632d9b43db08020~mv2.png',
  ],
  galfer: [
    'https://static.wixstatic.com/media/fb9e9f_6f08f1a09d9846898dfc3dfd9745525a~mv2.png',
    'https://static.wixstatic.com/media/fb9e9f_f827026be4a6444bbd7801408cef3d38~mv2.jpg',
    'https://static.wixstatic.com/media/fb9e9f_0a12a9abbdb84c558051fc601a518b61~mv2.png',
    'https://static.wixstatic.com/media/fb9e9f_975b61956f8a4551805705456c2bef8f~mv2.png',
    'https://static.wixstatic.com/media/fb9e9f_a7487e1db28f4f0e8192ede8e80142a7~mv2.png',
  ],
  cabirol: [
    'https://static.wixstatic.com/media/fb9e9f_f06bee44df414d5cb3b88b25451f4bca~mv2.png',
    'https://static.wixstatic.com/media/fb9e9f_ffd2bddd801446a3a44b8d017f15b3c0~mv2.png',
    'https://static.wixstatic.com/media/fb9e9f_1929035684d340a0bb52c1da9c3854a4~mv2.png',
  ],
  isard: [
    'https://static.wixstatic.com/media/fb9e9f_737473080e934330bae0c550133704bc~mv2.png',
    'https://static.wixstatic.com/media/fb9e9f_1393b9b69c134366a92dc9958b989c3e~mv2.png',
    'https://static.wixstatic.com/media/fb9e9f_cf474ba773b94e23beec9b85c48238c3~mv2.png',
  ],
  banys: [
    'https://static.wixstatic.com/media/fb9e9f_f6a1f3df313b427484c95bfa8468d6a1~mv2.png',
    'https://static.wixstatic.com/media/fb9e9f_56623a7f18604c60a381f3f418606339~mv2.png',
    'https://static.wixstatic.com/media/fb9e9f_410ae6eebc5a4f60af55b3e6d6aaece3~mv2.png',
    'https://static.wixstatic.com/media/fb9e9f_bed722632ffb4fbb862e5448950a2be2~mv2.png',
    'https://static.wixstatic.com/media/fb9e9f_11a2c6c12e474a97b0bd59a0d1780da4~mv2.png',
  ],
  bodega: [
    'https://static.wixstatic.com/media/fb9e9f_ecf9445710054bcab1ff082d3e8646d2~mv2.png',
  ],
  patio: [
    'https://static.wixstatic.com/media/fb9e9f_b452d48e048f45b59992f1e1ac44c0a7~mv2.png',
    'https://static.wixstatic.com/media/fb9e9f_8b1198ad9ca34f3b9b5ebd90f7924500~mv2.png',
    'https://static.wixstatic.com/media/fb9e9f_c12b6285a22e493fbd750ac9caf765fb~mv2.png',
  ],
};

const zoneOrder = ['sala', 'cocina', 'galfer', 'cabirol', 'isard', 'banys', 'bodega', 'patio'];

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
          <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop" className="h-full w-full object-cover" alt="" referrerPolicy="no-referrer" />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/5 hidden xl:block opacity-10 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop" className="h-full w-full object-cover" alt="" referrerPolicy="no-referrer" />
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
          { num: 3, label: sp.stat1 },
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
                    <div className="row-span-2 relative overflow-hidden cursor-pointer group rounded-sm" onClick={() => openViewer(id, 0)}>
                      <img src={photos[0]} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={zone.title} referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <Maximize2 className="text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all" />
                      </div>
                    </div>
                    <div className="relative overflow-hidden cursor-pointer group rounded-sm" onClick={() => openViewer(id, 1)}>
                      {photos[1]
                        ? <img src={photos[1]} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={`${zone.title} 2`} referrerPolicy="no-referrer" />
                        : <div className="w-full h-full bg-[#c8c0b0] flex items-center justify-center text-white/50">📸</div>
                      }
                    </div>
                    <div className="relative overflow-hidden cursor-pointer group rounded-sm" onClick={() => openViewer(id, 2)}>
                      {photos[2]
                        ? <img src={photos[2]} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={`${zone.title} 3`} referrerPolicy="no-referrer" />
                        : <div className="w-full h-full bg-[#c8c0b0] flex items-center justify-center text-white/50">📸</div>
                      }
                      {photos.length > 3 && (
                        <div className="absolute inset-0 bg-[#2d4a2d]/75 flex flex-col items-center justify-center text-white">
                          <span className="text-xl font-light">+{photos.length - 3}</span>
                          <span className="text-[10px] uppercase tracking-widest opacity-70">{sp.verTodas}</span>
                        </div>
                      )}
                    </div>
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
                  alt="foto ampliada"
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