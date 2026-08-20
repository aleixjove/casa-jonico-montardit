import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../i18n/LanguageContext';
import ScrollToTop from '../components/ScrollToTop';

const platformsBase = [
  { id: 'Booking',  name: 'Booking', score: '9.7', max: '10', count: 18 },
  { id: 'Airbnb',   name: 'Airbnb',  score: '5.0', max: '5',  count: 5  },
  { id: 'Google',   name: 'Google',  score: '5.0', max: '5',  count: 15 },
];

const TOTAL_REVIEWS = platformsBase.reduce((a, p) => a + p.count, 0);

const testimonialData = [
  // AIRBNB (3)
  { id: 'a1', score: '5.0', platform: 'Airbnb',  quote: 'La casa es genial, con unas vistas preciosas, mucho espacio, las camas cómodas y equipada con todo lo necesario para pasar un finde genial. Ideal para grupos grandes. Si volvemos a Sort, volveremos aquí!', author: 'Ferran',  meta: 'Airbnb · Julio 2025',    featured: true  },
  { id: 'a2', score: '5.0', platform: 'Airbnb',  quote: 'Un anfitrión de 10, muy atento y muy amable.',                                                                                                                                                                                                             author: 'Marc',    meta: 'Airbnb · Febrero 2025',   featured: false },
  { id: 'a3', score: '5.0', platform: 'Airbnb',  quote: 'Todo desde la comunicación, la exactitud de las fotos y la descripción es genial. La casa Jonico está equipada con todo lo necesario para pasar unos días perfectos en familia, con unas vistas preciosas!! El trato de Josep y Roser es muy amable y familiar. Y la limpieza también es excelente. Gracias!', author: 'Natàlia', meta: 'Airbnb · Abril 2023',     featured: true  },
  { id: 'a4', score: '5.0', platform: 'Airbnb',  quote: 'Todo perfecto. Josep muy atento. La casa es preciosa, con todas las comodidades, recomendable para volver. La zona es preciosa, llena de naturaleza.', author: 'Sole',    meta: 'Airbnb · Agosto 2026',    featured: false },
  { id: 'a5', score: '5.0', platform: 'Airbnb',  quote: 'La casa es preciosa, tiene unas vistas increíbles y Josep estaba pendiente en todo momento. Sin duda, vale la pena!', author: 'Yesika',  meta: 'Airbnb · Julio 2026',     featured: false },
  // GOOGLE (14)
  { id: 'g1',  score: '5.0', platform: 'Google', quote: 'Hemos pasado unos días de navidad en familia, éramos 8 y un bebé y hemos estado genial, la casa esta totalmente equipada con todo lo necesario (incluso juegos para niños).',                                                             author: 'Adriana Brull Esteve',     meta: 'Google · Navidad 2025',   featured: false },
  { id: 'g2',  score: '5.0', platform: 'Google', quote: 'Entorno muy bonito, alojamiento totalmente equipado y dueños amables y atentos. Un lugar ideal para desconectar.',                                                                                                                        author: 'Alberto Sabater Gárriz',   meta: 'Google · 2024',           featured: false },
  { id: 'g3',  score: '5.0', platform: 'Google', quote: 'Casa Jonico es una casa maravillosa, grande y acogedora en la montaña, en una ubicación muy buena y tranquila cerca de las estaciones de esquí. La casa tiene todo lo necesario.',                                                        author: 'Neus Ayuso Gabella',       meta: 'Google · Invierno 2024',  featured: true  },
  { id: 'g4',  score: '5.0', platform: 'Google', quote: 'El alojamiento es especial, con muchos detalles que se agradecen mucho, el entorno es idílico y los propietarios muy agradables. Los niños han estado encantados.',                                                                       author: 'Chus EsGu',                meta: 'Google · 2024',           featured: false },
  { id: 'g5',  score: '5.0', platform: 'Google', quote: 'Es la tercera vez que nos alojamos aquí y estamos encantados. La casa está totalmente equipada, amplia, limpia, camas muy cómodas, el salón tiene unas vistas impresionantes.',                                                           author: 'Sarah B.',                 meta: 'Google · 2024',           featured: true  },
  { id: 'g6',  score: '5.0', platform: 'Google', quote: 'Estuvimos en Casa Jonico para pasar la navidad con la familia, una estancia perfecta en una casa preciosa y muy bien equipada. El pueblecito de Montardit era como una postal.',                                                          author: 'Maria cabrisas rivas',     meta: 'Google · Navidad 2023',   featured: false },
  { id: 'g7',  score: '5.0', platform: 'Google', quote: 'Casa rural muy acogedora para pasar unas noches en este lado de Cataluña. Muy recomendable para grupos.',                                                                                                                                 author: 'Katerina Margariti',       meta: 'Google · 2024',           featured: false },
  { id: 'g8',  score: '5.0', platform: 'Google', quote: 'Una casa con todos los detalles para pasar una estancia inolvidable, en un enclave rodeado de naturaleza y atendidos por Josep que fue muy servicial. Sin duda nuestra experiencia fue de 10.',                                           author: 'Jose Olmos Aznar',         meta: 'Google · 2024',           featured: true  },
  { id: 'g9',  score: '5.0', platform: 'Google', quote: 'Casa Jonico es una preciosidad, muy limpia y actualizada, con un toque rústico ideal. Hemos disfrutado de la estancia y nos hemos sentido como en casa. La recomiendo 100%.',                                                             author: 'Andrea Bedea',             meta: 'Google · 2023',           featured: false },
  { id: 'g10', score: '5.0', platform: 'Google', quote: 'Lugar excepcional, vistas increibles y sitio tranquilo. Perfecto para pasar unos días con família y amigos! Super recomendable!',                                                                                                         author: 'Pablo BORQUE MONTAÑÉS',    meta: 'Google · 2023',           featured: false },
  { id: 'g11', score: '5.0', platform: 'Google', quote: '¡Fantástica estancia! La casa es muy bonita y espaciosa, con unas vistas preciosas. Ideal para pasar unos días en familia.',                                                                                                              author: 'Elisabet Marsal',          meta: 'Google · 2023',           featured: false },
  { id: 'g12', score: '5.0', platform: 'Google', quote: 'Casa muy comoda, agradable, con una decoracion exquisita, situacion con vistas a un valle espectaculares, los dueños superamables. Os la recomiendo para relax total.',                                                                   author: 'FRANCISCO MARTI MARTI',    meta: 'Google · 2023',           featured: false },
  { id: 'g13', score: '5.0', platform: 'Google', quote: 'Excepcional alojamiento con ubicación privilegiada en el Pallars Sobirà.',                                                                                                                                                                author: 'Marc Vendrell',            meta: 'Google · 2023',           featured: false },
  { id: 'g14', score: '5.0', platform: 'Google', quote: 'Excelente ubicación, vistas y entorno. Sin lugar a dudas volveré. Casa super grande y muy bien cuidada.',                                                                                                                                 author: 'Miquel Albós',             meta: 'Google · 2023',           featured: false },
  { id: 'g15', score: '5.0', platform: 'Google', quote: 'Hemos pasado una semana fantástica en familia con niños. La ubicación es ideal, cerca de Sort, que cubre todas las necesidades de intendencia, pero en un pueblo pequeño e idílico, tranquilo y auténtico, de los que ya no quedan. La casa está equipada con todas las comodidades que necesitas, todo muy bien pensado, también esos detalles en los que no reparas inicialmente. Los dueños son muy atentos y te ayudan a pasar una estancia perfecta. Totalmente recomendable. Deseando volver. Tuvimos mucha suerte encontrando disponibilidad.', author: 'Esther Mesas', meta: 'Google · 2026', featured: true },
  // BOOKING (18)
  { id: 'b1',  score: '10',  platform: 'Booking', quote: 'Una casa limpia, acogedora y muy bien equipada, en un entorno maravilloso, con un anfitrión (Josep) muy atento y servicial.',                                                                                                             author: 'Teresa',    meta: 'Booking · Agosto 2023',      featured: false },
  { id: 'b2',  score: '10',  platform: 'Booking', quote: 'Excepcional. La casa es muy bonita y está muy equipada no le falta detalle, las vistas que tiene la casa desde el comedor increíbles.',                                                                                                    author: 'Carmen',    meta: 'Booking · Mayo 2024',        featured: false },
  { id: 'b3',  score: '10',  platform: 'Booking', quote: 'El confort de la zona y la disposición de la casa hacen que sea un lugar ideal para desconectar. Dispone de todas las instalaciones necesarias para pasar una estancia con familia.',                                                     author: 'Marina',    meta: 'Booking · Julio 2024',       featured: false },
  { id: 'b4',  score: '10',  platform: 'Booking', quote: 'Una casa muy bien acondicionada y equipada, con unas vistas espectaculares. El pueblo es muy tranquilo. Josep y Roser, los anfitriones, muy atentos.',                                                                                     author: 'Paula',     meta: 'Booking · Agosto 2024',      featured: true  },
  { id: 'b5',  score: '10',  platform: 'Booking', quote: 'Hemos pasado unos días geniales, toda la casa estaba perfecta y no le faltaba ningún detalle. Los anfitriones, Josep y Roser, muy atentos.',                                                                                               author: 'Xavier',    meta: 'Booking · Noviembre 2024',   featured: false },
  { id: 'b6',  score: '10',  platform: 'Booking', quote: 'Entorno idílico. A la casa no lo faltaba detalle. Anfitriones muy atentos y amables. Todo perfecto.',                                                                                                                                      author: 'Alberto',   meta: 'Booking · Enero 2025',       featured: false },
  { id: 'b7',  score: '10',  platform: 'Booking', quote: 'La casa está muy bien cuidada. Es espaciosa y muy bien equipada. Las vistas impresionantes y el entorno perfecto para desconectar.',                                                                                                       author: 'Dana',      meta: 'Booking · Agosto 2025',      featured: false },
  { id: 'b8',  score: '10',  platform: 'Booking', quote: 'La casa está genial. Es muy amplia y no le falta detalle. Tiene unas vistas espectaculares. Josep y su pareja han estado en todo momento en contacto.',                                                                                    author: 'Francisco', meta: 'Booking · Septiembre 2025',  featured: false },
  { id: 'b9',  score: '10',  platform: 'Booking', quote: 'Todo estuvo GENIAL. La casa cuenta con todas las cosas necesarias del día a día. Está rodeada de tranquilidad, tiene unas vistas impresionantes.',                                                                                         author: 'Verlisset', meta: 'Booking · Septiembre 2025',  featured: false },
  { id: 'b10', score: '10',  platform: 'Booking', quote: 'Trato inmejorable. Las instalaciones son geniales, la casa, el lugar, el entorno... todo de 10. Nos hicieron sentir como en casa.',                                                                                                        author: 'Sílvia',    meta: 'Booking · Septiembre 2025',  featured: false },
  { id: 'b11', score: '9.0', platform: 'Booking', quote: 'La casa tiene espacios amplios para dos familias. Los anfitriones són super amables. Las vistas del comedor són preciosas.',                                                                                                              author: 'Ros',       meta: 'Booking · Marzo 2025',       featured: false },
  { id: 'b12', score: '9.0', platform: 'Booking', quote: 'Ubicación perfecta y vistas muy bonitas desde el salón la casa está muy bien.',                                                                                                                                                            author: 'Jesus',     meta: 'Booking · Enero 2026',       featured: false },
  { id: 'b13', score: '10',  platform: 'Booking', quote: 'Excepcional. Alojamiento de alta calidad en un entorno inmejorable.',                                                                                                                                                                     author: 'Jarkko',    meta: 'Booking · Octubre 2023',     featured: false },
  { id: 'b14', score: '9.0', platform: 'Booking', quote: 'Fantástico. Una estancia muy agradable en el Pallars.',                                                                                                                                                                                    author: 'Ioannis',   meta: 'Booking · Diciembre 2023',   featured: false },
  { id: 'b15', score: '9.0', platform: 'Booking', quote: 'El paisaje y las tranquilidad. Muy recomendable.',                                                                                                                                                                                         author: 'Pintura',   meta: 'Booking · Agosto 2024',      featured: false },
  { id: 'b16', score: '9.0', platform: 'Booking', quote: 'Fantástico. Todo correcto y muy limpio.',                                                                                                                                                                                                 author: 'Fco',       meta: 'Booking · Agosto 2024',      featured: false },
  { id: 'b17', score: '9.0', platform: 'Booking', quote: 'Fantástico. Repetiremos seguro.',                                                                                                                                                                                                          author: 'Núria',     meta: 'Booking · Agosto 2025',      featured: false },
  { id: 'b18', score: '9.0', platform: 'Booking', quote: 'Fantástico. Una casa con mucho encanto.',                                                                                                                                                                                                  author: 'Cristina',  meta: 'Booking · Marzo 2026',       featured: false },
];

export default function Testimonials() {
  const { t } = useLanguage();
  const tm = t.testimonials;

  const [filter, setFilter] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  const platforms = [
    { id: 'all', name: tm.platformAll, count: TOTAL_REVIEWS },
    ...platformsBase.map(p => ({ id: p.id, name: p.name, count: p.count })),
  ];

  const featuredReviews = useMemo(() => testimonialData.filter(r => r.featured), []);
  const filteredReviews = useMemo(() =>
    filter === 'all' ? testimonialData : testimonialData.filter(r => r.platform === filter),
    [filter]
  );

  const nextFeatured = () => setCurrentIndex((prev) => (prev + 1) % featuredReviews.length);
  const prevFeatured = () => setCurrentIndex((prev) => (prev - 1 + featuredReviews.length) % featuredReviews.length);
  const featured = featuredReviews[currentIndex];

  return (
    <div className="pt-20 bg-[#f5f0e8] min-h-screen">
      {/* Header */}
      <section className="bg-[#f5f2ed] pt-24 pb-14 px-6 relative overflow-hidden border-b border-[#ddd6c8]">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#b07d3a] mb-4"
          >
            {tm.badge}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-display text-[#2d4a2d] mb-8 leading-tight"
          >
            {tm.title1} <br /> <span>{tm.title2}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-[#5a5a4a] leading-relaxed max-w-2xl mx-auto font-light"
          >
            {tm.desc}
          </motion.p>
        </div>
      </section>

      {/* NEW: Global scores banner */}
      <section className="bg-white border-b border-[#ddd6c8]">
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-14">
          <div className="grid grid-cols-3 gap-4 md:gap-12">
            {platformsBase.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center border-r border-[#ddd6c8] last:border-r-0 px-2 md:px-6"
              >
                <div className="flex justify-center gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-[#b07d3a] text-[#b07d3a] md:w-4 md:h-4" />
                  ))}
                </div>
                <div className="font-display text-3xl md:text-5xl text-[#2d4a2d] leading-none mb-1">
                  {p.score}
                  <span className="text-sm md:text-lg text-[#9a9a8a] font-sans font-light">
                    /{p.max}
                  </span>
                </div>
                <div className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-[#b07d3a] mt-2">
                  {p.name}
                </div>
                <div className="text-[10px] text-[#9a9a8a] mt-1">
                  {p.count} {tm.reviewsLabel}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Slider — compacte i sobri */}
      <section className="max-w-4xl mx-auto px-6 py-14 md:py-20">
        <div className="relative bg-[#2d4a2d] rounded-2xl overflow-hidden shadow-xl">
          <Quote className="absolute top-6 right-6 w-16 h-16 text-white/10 pointer-events-none" strokeWidth={1} />

          <div className="relative p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={featured.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex gap-0.5 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#d4a05a] text-[#d4a05a]" />
                  ))}
                </div>
                <p className="text-lg md:text-2xl font-display text-[#f5f0e8] leading-snug mb-8 italic">
                  &ldquo;{featured.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-px bg-[#d4a05a]" />
                    <div>
                      <div className="text-[#f5f0e8] font-medium text-base">{featured.author}</div>
                      <div className="text-[#a8b8a8] text-[11px] uppercase tracking-widest mt-0.5">
                        {featured.meta}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#a8b8a8] font-light mr-2 tabular-nums">
                      {currentIndex + 1} / {featuredReviews.length}
                    </span>
                    <button
                      onClick={prevFeatured}
                      aria-label="Anterior"
                      className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={nextFeatured}
                      aria-label="Següent"
                      className="w-9 h-9 rounded-full bg-[#d4a05a] flex items-center justify-center text-[#2d4a2d] hover:bg-[#e0b070] transition-colors"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Filters + Masonry grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {platforms.map(p => (
            <button
              key={p.id}
              onClick={() => setFilter(p.id)}
              className={cn(
                "px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all border",
                filter === p.id
                  ? "bg-[#2d4a2d] text-white border-[#2d4a2d] shadow-sm"
                  : "bg-white text-[#5a5a4a] border-[#ddd6c8] hover:border-[#b07d3a] hover:text-[#2d4a2d]"
              )}
            >
              {p.name} <span className={cn("ml-1", filter === p.id ? "text-white/60" : "text-[#9a9a8a]")}>
                ({p.count})
              </span>
            </button>
          ))}
        </div>

        {/* Masonry via CSS columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5">
          <AnimatePresence>
            {filteredReviews.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: Math.min(idx * 0.03, 0.4) }}
                className="break-inside-avoid mb-5 bg-white p-6 md:p-7 rounded-xl border border-[#e0d8c8] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-[#b07d3a] text-[#b07d3a]" />
                    ))}
                  </div>
                  <span className={cn(
                    "text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full",
                    review.platform === 'Booking' && "bg-[#e8eef7] text-[#003580]",
                    review.platform === 'Airbnb'  && "bg-[#fdeceb] text-[#c94247]",
                    review.platform === 'Google'  && "bg-[#f0f0ee] text-[#5a5a4a]"
                  )}>
                    {review.platform}
                  </span>
                </div>
                <p className="text-[15px] text-[#3a3a3a] font-light leading-relaxed mb-5 italic">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="pt-4 border-t border-[#f0eae0]">
                  <div className="text-sm font-medium text-[#2d4a2d]">{review.author}</div>
                  <div className="text-[10px] text-[#9a9a8a] uppercase tracking-wider mt-0.5">
                    {review.meta}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
}
