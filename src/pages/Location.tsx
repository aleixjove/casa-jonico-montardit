import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Car, Info, ExternalLink } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';
import { useLanguage } from '../i18n/LanguageContext';

export default function Location() {
  const { t } = useLanguage();
  const l = t.location;

  return (
    <div className="pt-20 bg-[#f5f0e8] min-h-screen">
      {/* Header */}
      <section className="bg-[#f5f2ed] pt-24 pb-16 px-6 relative overflow-hidden border-b border-[#ddd6c8]">
        <div className="absolute left-0 top-0 bottom-0 w-1/5 hidden xl:block opacity-10 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop"
            className="h-full w-full object-cover"
            alt=""
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/5 hidden xl:block opacity-10 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop"
            className="h-full w-full object-cover"
            alt=""
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#b07d3a] mb-4 block"
          >
            {l.badge}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-5xl font-display text-[#2d4a2d] mb-10 leading-tight"
          >
            {l.title} <br /> <span>{l.titleSpan}</span>
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
            {l.desc}
          </motion.p>
        </div>
      </section>

      {/* Distances */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl text-black mb-4">{l.distancesTitle}</h2>
          <p className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#7a7a6a]">{l.distancesSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {l.distances.map((item, idx) => (
            <motion.a
              key={item.place}
              href={item.routeUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-[#e0d8c8] rounded-sm p-8 text-center transition-all duration-300 hover:shadow-xl hover:border-[#2d4a2d] group block cursor-pointer"
            >
              <div className="font-display text-xl text-[#2d4a2d] mb-2 group-hover:scale-110 transition-transform">{item.place}</div>
              <div className="text-[13px] font-light text-[#7a7a6a] mb-4">{item.info}</div>
              <div className="font-display text-base text-[#b07d3a]">{item.km}</div>
              <div className="mt-4 text-[10px] font-bold uppercase tracking-widest text-[#b07d3a] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                {l.verRuta} <ExternalLink className="w-3 h-3" />
              </div>
            </motion.a>
          ))}
        </div>

        <div className="flex items-center max-w-3xl mx-auto mb-20">
          <div className="flex-1 h-px bg-[#d0c8b8]" />
          <div className="mx-4 w-2 h-2 rounded-full bg-[#b07d3a]" />
          <div className="flex-1 h-px bg-[#d0c8b8]" />
        </div>

        {/* Nearby Places */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl text-black mb-4">{l.nearbyTitle}</h2>
          <p className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#7a7a6a]">{l.nearbySubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {l.nearby.map((place, idx) => (
            <motion.div
              key={place.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#2d4a2d] rounded-sm p-8 text-[#f5f0e8] relative overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:bg-[#1e3620]"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-[#b07d3a]" />
              <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#b07d3a] mb-2">{place.distance}</div>
              <h3 className="font-display text-xl mb-4">{place.name}</h3>
              <p className="text-sm font-light text-[#c8d4c8] leading-relaxed">{place.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Map & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-8 md:p-12 rounded-sm shadow-sm border border-[#e0d8c8]">
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-2xl text-[#2d4a2d] mb-4 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-[#b07d3a]" />
                {l.montarditTitle}
              </h3>
              <p className="text-[#5a5a4a] font-light leading-relaxed">{l.montarditDesc}</p>
            </div>

            <div className="bg-[#f5f2ed] p-6 rounded-sm border-l-4 border-[#b07d3a]">
              <div className="flex items-start gap-4">
                <Info className="w-5 h-5 text-[#b07d3a] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#b07d3a] mb-2">{l.notaTitle}</p>
                  <p className="text-sm text-[#5a5a4a] font-light leading-snug">{l.notaDesc}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3 px-6 py-4 border border-[#e0d8c8] rounded-sm text-[#5a5a4a] text-[12px] font-medium uppercase tracking-widest">
                <Car className="w-4 h-4 text-[#b07d3a]" />
                {l.lleida}
              </div>
            </div>
          </div>

          <div className="relative h-[400px] rounded-sm overflow-hidden border border-[#e0d8c8] group">
            <img src="/vista1.jpg" alt="Vista de Montardit de Dalt" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-[#1a2e1a]/60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center shadow-lg mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <MapPin className="w-8 h-8 text-white animate-bounce" />
                </div>
                <p className="font-display text-xl text-white mb-2">{l.mapTitle}</p>
                <p className="text-white/70 text-sm font-light mb-8">{l.mapDesc}</p>
                <a
                  href="https://www.google.com/maps/search/Montardit+de+Dalt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f5c878] font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 hover:underline"
                >
                  {l.mapLink} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="max-w-4xl mx-auto px-6 pt-4 pb-16 text-center">
        <div className="w-16 h-px bg-[#d0c8b8] mx-auto mb-6" />
        <h2 className="font-display text-3xl md:text-4xl text-[#2d4a2d] mb-6">{l.quoteTitle}</h2>
        <p className="text-base font-light text-[#5a5a4a] max-w-2xl mx-auto">{l.quoteDesc}</p>
      </section>

      <ScrollToTop />
    </div>
  );
}