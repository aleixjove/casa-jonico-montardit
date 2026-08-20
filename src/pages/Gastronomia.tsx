import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import ScrollToTop from '../components/ScrollToTop';
import { useLanguage } from '../i18n/LanguageContext';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'] as const;

// Fotos dels plats — ordre coincideix amb l'array `items` de translations.
const DISH_IMAGES = [
  '/girella.webp',
  '/trinxat.webp',
  '/tupi.webp',
  '/arros-carreretes.webp',
  '/xolis.webp',
  '/vianda.webp',
  '/farcit.webp',
];

export default function Gastronomia() {
  const { t } = useLanguage();
  const g = t.gastronomia;

  return (
    <div className="pt-20 bg-[#f5f0e8] min-h-screen">
      {/* Header — coherent amb la resta del site */}
      <section className="bg-[#f5f2ed] pt-24 pb-16 px-6 relative overflow-hidden border-b border-[#ddd6c8]">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#b07d3a] mb-4"
          >
            {g.badge}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-display text-[#2d4a2d] mb-8 leading-tight"
          >
            {g.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-24 h-px bg-[#b07d3a] mx-auto mb-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-lg text-[#5a5a4a] leading-relaxed max-w-2xl mx-auto font-light"
          >
            {g.desc}
          </motion.p>
        </div>
      </section>

      {/* Divider "menú" — evocador de receptari */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-8 text-center">
        <p className="font-display italic text-[#5a5a4a] text-lg md:text-xl">
          {g.dividerLabel}
        </p>
      </section>

      {/* Graella de plats — targetes tipus "menú de receptari" */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {g.items.map((dish, idx) => {
            const featured = idx === 0;
            return (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: Math.min(idx * 0.05, 0.3) }}
                className={cn(
                  'bg-[#faf6ee] border-t-2 border-[#b07d3a]/40 rounded-sm p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow',
                  featured && 'md:col-span-2'
                )}
              >
                {/* Encapçalament: numeral + tag */}
                <div className="flex items-baseline gap-4 mb-5">
                  <span
                    className={cn(
                      'font-display text-[#b07d3a]/60 leading-none tabular-nums',
                      featured ? 'text-5xl md:text-6xl' : 'text-3xl md:text-4xl'
                    )}
                  >
                    {ROMAN[idx]}
                  </span>
                  <span className="text-[10px] italic tracking-[0.15em] uppercase text-[#7a7a6a] leading-tight">
                    {dish.tag}
                  </span>
                </div>

                {/* Contingut: imatge + text */}
                <div className={cn('flex flex-col sm:flex-row items-start', featured ? 'gap-6' : 'gap-5')}>
                  <div
                    className={cn(
                      'shrink-0 bg-[#e0d8c8] rounded-sm overflow-hidden flex items-center justify-center text-[#9a9a8a]',
                      featured
                        ? 'w-full sm:w-[200px] h-[200px] text-4xl'
                        : 'w-full sm:w-[130px] h-[130px] text-2xl'
                    )}
                  >
                    {DISH_IMAGES[idx] ? (
                      <img
                        src={DISH_IMAGES[idx]}
                        alt={dish.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span aria-hidden="true">📸</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2
                      className={cn(
                        'font-display text-[#2d4a2d] mb-3 uppercase tracking-[0.15em]',
                        featured ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
                      )}
                    >
                      {dish.title}
                    </h2>
                    <p className="text-sm md:text-[15px] font-light text-[#4a4a3a] leading-relaxed">
                      {dish.desc}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Quote — mateix estil que altres pàgines per coherència */}
      <section className="bg-[#2d4a2d] py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-[#d4a05a] text-2xl mb-6">✦</div>
          <h2 className="font-display italic text-2xl md:text-4xl text-[#f5f0e8] mb-6 leading-tight">
            {g.quoteTitle}
          </h2>
          <p className="text-[#c8d4c8] font-light leading-relaxed max-w-2xl mx-auto">
            {g.quoteDesc}
          </p>
        </div>
      </section>

      {/* "On tastar-ho" — només renderitza si hi ha restaurants assignats */}
      {g.restaurants && g.restaurants.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-[#2d4a2d] mb-3">
              {g.restaurantsTitle}
            </h2>
            <p className="text-[#5a5a4a] font-light italic">{g.restaurantsDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {g.restaurants.map((r, idx) => {
              const cardBody = (
                <>
                  <div className="aspect-[4/3] bg-[#e0d8c8] overflow-hidden flex items-center justify-center text-[#9a9a8a] text-3xl">
                    {r.image ? (
                      <img
                        src={r.image}
                        alt={r.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span aria-hidden="true">📸</span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display text-lg text-[#2d4a2d] mb-2 uppercase tracking-widest">
                      {r.name}
                    </h3>
                    <p className="text-sm font-light text-[#5a5a4a] leading-relaxed mb-4 flex-1">
                      {r.desc}
                    </p>
                    {r.url && (
                      <span className="text-xs text-[#b07d3a] font-medium group-hover:text-[#2d4a2d] transition-colors self-start border-b border-[#b07d3a]/40 group-hover:border-[#2d4a2d] pb-0.5">
                        {g.restaurantsLinkText}
                      </span>
                    )}
                  </div>
                </>
              );

              const commonClasses =
                'group bg-white rounded-sm border border-[#e0d8c8] overflow-hidden hover:shadow-md transition-shadow flex flex-col';

              const animProps = {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: idx * 0.08 },
              };

              return r.url ? (
                <motion.a
                  key={idx}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={r.name}
                  className={commonClasses + ' cursor-pointer'}
                  {...animProps}
                >
                  {cardBody}
                </motion.a>
              ) : (
                <motion.article key={idx} className={commonClasses} {...animProps}>
                  {cardBody}
                </motion.article>
              );
            })}
          </div>
        </section>
      )}

      <ScrollToTop />
    </div>
  );
}
