import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';
import ScrollToTop from '../components/ScrollToTop';
import { useLanguage } from '../i18n/LanguageContext';

const activityLinks = [
  [
    'https://pirineu365.cat/ca/portaine/inici/',
    'https://pirineu365.cat/ca/espotesqui/inici/',
    'https://www.baqueira.es/',
  ],
  [
    'https://laraftingcompany.com/',
    'https://www.rocroi.com/ca/',
    'https://www.rubber-river.com/',
  ],
  [
    'https://ca.wikiloc.com/rutes-senderisme/cascada-de-gerber-o-salto-de-comials-desde-el-refugio-de-gerdar-40321844',
    'https://ca.wikiloc.com/rutes-senderisme/estany-de-sant-maurici-cascada-de-ratera-mirador-de-lestany-13381089',
    'https://ca.wikiloc.com/rutes-alpinisme/pica-destats-14557365',
  ],
  [
    'https://ca.wikiloc.com/rutes-btt/roques-pelades-63861140',
    'https://ca.wikiloc.com/rutes-btt/els-escorpins-96304313',
    'https://es.wikiloc.com/rutas-bicicleta-electrica/tremp-bosquet-up-casasses-rock-n-roll-up-susterris-views-lo-bunquer-up-maf-tremp-141231638',
  ],
];

const activityImages = [
  'https://static.wixstatic.com/media/fb9e9f_b6e02f3fce2b4b5d87a68858a9090336~mv2.png',
  'https://static.wixstatic.com/media/fb9e9f_1baa9e2f5d854a7e9331e020266c57b5~mv2.jpg',
  'https://static.wixstatic.com/media/fb9e9f_a41d0480f3604e909dd7373d27cfd367~mv2.png',
  'https://static.wixstatic.com/media/fb9e9f_696066c7140e4176857ee7a8c1f5f514~mv2.png',
];

const itemDark = [
  [false, true, false],
  [false, true, false],
  [false, true, false],
  [false, true, false],
];

export default function Activities() {
  const { t } = useLanguage();
  const acts = t.activities;

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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-5xl font-display text-[#2d4a2d] mb-10 leading-tight"
          >
            {acts.headerTitle}
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
            {acts.headerDesc}
          </motion.p>
        </div>
      </section>

      {/* Activities */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        {acts.items.map((activity, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 last:mb-0"
          >
            <div className="rounded-lg overflow-hidden shadow-xl mb-8">
              <img
                src={activityImages[idx]}
                alt={activity.title}
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="text-[12px] font-bold tracking-[0.12em] uppercase text-[#b07d3a] mb-3">
              {activity.tag}
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-black mb-6">
              {activity.title}
            </h2>
            <p className="text-base font-light text-[#4a4a4a] leading-relaxed mb-10 max-w-3xl">
              {activity.desc}
            </p>

            <div className="w-10 h-0.5 bg-[#b07d3a] mb-6" />
            <h3 className="font-display text-lg font-bold text-[#2d4a2d] mb-6 tracking-wide">
              {activity.subTitle}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activity.items.map((item, iIdx) => (
                <a
                  key={iIdx}
                  href={activityLinks[idx][iIdx]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "p-6 rounded-sm border-l-[3px] border-[#b07d3a] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col gap-2 group",
                    itemDark[idx][iIdx]
                      ? "bg-[#2d4a2d] text-[#f5f0e8] hover:bg-[#1e3620]"
                      : "bg-white text-[#2d4a2d] border-[#e0d8c8] hover:shadow-md"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display font-bold text-sm leading-tight">
                      {item.name}
                    </span>
                    <ExternalLink size={14} className="opacity-40 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </div>
                  <p className={cn(
                    "text-[11px] font-light leading-relaxed",
                    itemDark[idx][iIdx] ? "text-[#c8d4c8]" : "text-[#7a7a6a]"
                  )}>
                    {item.detail}
                  </p>
                </a>
              ))}
            </div>

            {idx < acts.items.length - 1 && (
              <div className="w-full h-px bg-[#d0c8b8] mt-24" />
            )}
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-12 text-center">
        <div className="w-16 h-px bg-[#d0c8b8] mx-auto mb-6" />
        <h2 className="font-display text-2xl text-black mb-4">{acts.ctaTitle}</h2>
        <p className="text-sm font-light text-[#6a6a5a] mb-8">{acts.ctaDesc}</p>
        <a
          href="/contacto"
          className="inline-block px-10 py-3 bg-[#2d4a2d] text-[#f5f0e8] font-display text-sm rounded-sm hover:bg-[#1e3620] transition-colors"
        >
          {acts.ctaButton}
        </a>
      </section>

      <ScrollToTop />
    </div>
  );
}