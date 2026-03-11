import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../i18n/LanguageContext';
import ScrollToTop from '../components/ScrollToTop';

const platformsBase = [
  { id: 'Booking', name: 'Booking', score: '9.7', count: 18 },
  { id: 'Airbnb', name: 'Airbnb', score: '5.0', count: 3 },
  { id: 'Google', name: 'Google', score: '5.0', count: 14 }
];

const testimonialData = [
  // AIRBNB (3)
  {
    id: 'a1',
    score: '5.0',
    platform: 'Airbnb',
    quote: 'La casa es genial, con unas vistas preciosas, mucho espacio, las camas cómodas y equipada con todo lo necesario para pasar un finde genial. Ideal para grupos grandes. Si volvemos a Sort, volveremos aquí!',
    author: 'Ferran',
    meta: 'Airbnb · Julio 2025',
    featured: true
  },
  {
    id: 'a2',
    score: '5.0',
    platform: 'Airbnb',
    quote: 'Un anfitrión de 10, muy atento y muy amable.',
    author: 'Marc',
    meta: 'Airbnb · Febrero 2025',
    featured: false
  },
  {
    id: 'a3',
    score: '5.0',
    platform: 'Airbnb',
    quote: 'Todo desde la comunicación, la exactitud de las fotos y la descripción es genial. La casa Jonico está equipada con todo lo necesario para pasar unos días perfectos en familia, con unas vistas preciosas!! El trato de Josep y Roser es muy amable y familiar. Y la limpieza también es excelente. Gracias!',
    author: 'Natàlia',
    meta: 'Airbnb · Abril 2023',
    featured: true
  },
  // GOOGLE (14)
  { id: 'g1', score: '5.0', platform: 'Google', quote: 'Hemos pasado unos días de navidad en familia, éramos 8 y un bebé y hemos estado genial, la casa esta totalmente equipada con todo lo necesario (incluso juegos para niños).', author: 'Adriana Brull Esteve', meta: 'Google · Navidad 2025', featured: false },
  { id: 'g2', score: '5.0', platform: 'Google', quote: 'Entorno muy bonito, alojamiento totalmente equipado y dueños amables y atentos. Un lugar ideal para desconectar.', author: 'Alberto Sabater Gárriz', meta: 'Google · 2024', featured: false },
  { id: 'g3', score: '5.0', platform: 'Google', quote: 'Casa Jonico es una casa maravillosa, grande y acogedora en la montaña, en una ubicación muy buena y tranquila cerca de las estaciones de esquí. La casa tiene todo lo necesario.', author: 'Neus Ayuso Gabella', meta: 'Google · Invierno 2024', featured: true },
  { id: 'g4', score: '5.0', platform: 'Google', quote: 'El alojamiento es especial, con muchos detalles que se agradecen mucho, el entorno es idílico y los propietarios muy agradables. Los niños han estado encantados.', author: 'Chus EsGu', meta: 'Google · 2024', featured: false },
  { id: 'g5', score: '5.0', platform: 'Google', quote: 'Es la tercera vez que nos alojamos aquí y estamos encantados. La casa está totalmente equipada, amplia, limpia, camas muy cómodas, el salón tiene unas vistas impresionantes.', author: 'Sarah B.', meta: 'Google · 2024', featured: true },
  { id: 'g6', score: '5.0', platform: 'Google', quote: 'Estuvimos en Casa Jonico para pasar la navidad con la familia, una estancia perfecta en una casa preciosa y muy bien equipada. El pueblecito de Montardit era como una postal.', author: 'Maria cabrisas rivas', meta: 'Google · Navidad 2023', featured: false },
  { id: 'g7', score: '5.0', platform: 'Google', quote: 'Casa rural muy acogedora para pasar unas noches en este lado de Cataluña. Muy recomendable para grupos.', author: 'Katerina Margariti', meta: 'Google · 2024', featured: false },
  { id: 'g8', score: '5.0', platform: 'Google', quote: 'Una casa con todos los detalles para pasar una estancia inolvidable, en un enclave rodeado de naturaleza y atendidos por Josep que fue muy servicial. Sin duda nuestra experiencia fue de 10.', author: 'Jose Olmos Aznar', meta: 'Google · 2024', featured: true },
  { id: 'g9', score: '5.0', platform: 'Google', quote: 'Casa Jonico es una preciosidad, muy limpia y actualizada, con un toque rústico ideal. Hemos disfrutado de la estancia y nos hemos sentido como en casa. La recomiendo 100%.', author: 'Andrea Bedea', meta: 'Google · 2023', featured: false },
  { id: 'g10', score: '5.0', platform: 'Google', quote: 'Lugar excepcional, vistas increibles y sitio tranquilo. Perfecto para pasar unos días con família y amigos! Super recomendable!', author: 'Pablo BORQUE MONTAÑÉS', meta: 'Google · 2023', featured: false },
  { id: 'g11', score: '5.0', platform: 'Google', quote: '¡Fantástica estancia! La casa es muy bonita y espaciosa, con unas vistas preciosas. Ideal para pasar unos días en familia.', author: 'Elisabet Marsal', meta: 'Google · 2023', featured: false },
  { id: 'g12', score: '5.0', platform: 'Google', quote: 'Casa muy comoda, agradable, con una decoracion exquisita, situacion con vistas a un valle espectaculares, los dueños superamables. Os la recomiendo para relax total.', author: 'FRANCISCO MARTI MARTI', meta: 'Google · 2023', featured: false },
  { id: 'g13', score: '5.0', platform: 'Google', quote: 'Excepcional alojamiento con ubicación privilegiada en el Pallars Sobirà.', author: 'Marc Vendrell', meta: 'Google · 2023', featured: false },
  { id: 'g14', score: '5.0', platform: 'Google', quote: 'Excelente ubicación, vistas y entorno. Sin lugar a dudas volveré. Casa super grande y muy bien cuidada.', author: 'Miquel Albós', meta: 'Google · 2023', featured: false },
  // BOOKING (18)
  { id: 'b1', score: '10', platform: 'Booking', quote: 'Una casa limpia, acogedora y muy bien equipada, en un entorno maravilloso, con un anfitrión (Josep) muy atento y servicial.', author: 'Teresa', meta: 'Booking · Agosto 2023', featured: false },
  { id: 'b2', score: '10', platform: 'Booking', quote: 'Excepcional. La casa es muy bonita y está muy equipada no le falta detalle, las vistas que tiene la casa desde el comedor increíbles.', author: 'Carmen', meta: 'Booking · Mayo 2024', featured: false },
  { id: 'b3', score: '10', platform: 'Booking', quote: 'El confort de la zona y la disposición de la casa hacen que sea un lugar ideal para desconectar. Dispone de todas las instalaciones necesarias para pasar una estancia con familia.', author: 'Marina', meta: 'Booking · Julio 2024', featured: false },
  { id: 'b4', score: '10', platform: 'Booking', quote: 'Una casa muy bien acondicionada y equipada, con unas vistas espectaculares. El pueblo es muy tranquilo. Josep y Roser, los anfitriones, muy atentos.', author: 'Paula', meta: 'Booking · Agosto 2024', featured: true },
  { id: 'b5', score: '10', platform: 'Booking', quote: 'Hemos pasado unos días geniales, toda la casa estaba perfecta y no le faltaba ningún detalle. Los anfitriones, Josep y Roser, muy atentos.', author: 'Xavier', meta: 'Booking · Noviembre 2024', featured: false },
  { id: 'b6', score: '10', platform: 'Booking', quote: 'Entorno idílico. A la casa no lo faltaba detalle. Anfitriones muy atentos y amables. Todo perfecto.', author: 'Alberto', meta: 'Booking · Enero 2025', featured: false },
  { id: 'b7', score: '10', platform: 'Booking', quote: 'La casa está muy bien cuidada. Es espaciosa y muy bien equipada. Las vistas impresionantes y el entorno perfecto para desconectar.', author: 'Dana', meta: 'Booking · Agosto 2025', featured: false },
  { id: 'b8', score: '10', platform: 'Booking', quote: 'La casa está genial. Es muy amplia y no le falta detalle. Tiene unas vistas espectaculares. Josep y su pareja han estado en todo momento en contacto.', author: 'Francisco', meta: 'Booking · Septiembre 2025', featured: false },
  { id: 'b9', score: '10', platform: 'Booking', quote: 'Todo estuvo GENIAL. La casa cuenta con todas las cosas necesarias del día a día. Está rodeada de tranquilidad, tiene unas vistas impresionantes.', author: 'Verlisset', meta: 'Booking · Septiembre 2025', featured: false },
  { id: 'b10', score: '10', platform: 'Booking', quote: 'Trato inmejorable. Las instalaciones son geniales, la casa, el lugar, el entorno... todo de 10. Nos hicieron sentir como en casa.', author: 'Sílvia', meta: 'Booking · Septiembre 2025', featured: false },
  { id: 'b11', score: '9.0', platform: 'Booking', quote: 'La casa tiene espacios amplios para dos familias. Los anfitriones són super amables. Las vistas del comedor són preciosas.', author: 'Ros', meta: 'Booking · Marzo 2025', featured: false },
  { id: 'b12', score: '9.0', platform: 'Booking', quote: 'Ubicación perfecta y vistas muy bonitas desde el salón la casa está muy bien.', author: 'Jesus', meta: 'Booking · Enero 2026', featured: false },
  { id: 'b13', score: '10', platform: 'Booking', quote: 'Excepcional. Alojamiento de alta calidad en un entorno inmejorable.', author: 'Jarkko', meta: 'Booking · Octubre 2023', featured: false },
  { id: 'b14', score: '9.0', platform: 'Booking', quote: 'Fantástico. Una estancia muy agradable en el Pallars.', author: 'Ioannis', meta: 'Booking · Diciembre 2023', featured: false },
  { id: 'b15', score: '9.0', platform: 'Booking', quote: 'El paisaje y las tranquilidad. Muy recomendable.', author: 'Pintura', meta: 'Booking · Agosto 2024', featured: false },
  { id: 'b16', score: '9.0', platform: 'Booking', quote: 'Fantástico. Todo correcto y muy limpio.', author: 'Fco', meta: 'Booking · Agosto 2024', featured: false },
  { id: 'b17', score: '9.0', platform: 'Booking', quote: 'Fantástico. Repetiremos seguro.', author: 'Núria', meta: 'Booking · Agosto 2025', featured: false },
  { id: 'b18', score: '9.0', platform: 'Booking', quote: 'Fantástico. Una casa con mucho encanto.', author: 'Cristina', meta: 'Booking · Marzo 2026', featured: false },
];

export default function Testimonials() {
  const { t } = useLanguage();
  const tm = t.testimonials;

  const [filter, setFilter] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  const platforms = [
    { id: 'all', name: tm.platformAll, count: 35 },
    ...platformsBase,
  ];

  const featuredReviews = useMemo(() => testimonialData.filter(r => r.featured), []);
  const filteredReviews = useMemo(() =>
    filter === 'all' ? testimonialData : testimonialData.filter(r => r.platform === filter),
    [filter]
  );

  const nextFeatured = () => setCurrentIndex((prev) => (prev + 1) % featuredReviews.length);
  const prevFeatured = () => setCurrentIndex((prev) => (prev - 1 + featuredReviews.length) % featuredReviews.length);

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
            className="text-2xl md:text-5xl font-display text-[#2d4a2d] mb-8 leading-tight"
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

      {/* Featured Slider */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="relative bg-[#2d4a2d] rounded-2xl overflow-hidden shadow-2xl p-8 md:p-16">
          <Quote className="absolute top-10 right-10 w-24 h-24 text-white/5 pointer-events-none" />

          <div className="relative z-10 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-[#b07d3a] text-[#b07d3a]" />)}
                </div>
                <p className="text-xl md:text-4xl font-display text-[#f5f0e8] leading-tight mb-8 italic">
                  "{featuredReviews[currentIndex].quote}"
                </p>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-px bg-[#b07d3a]" />
                  <div>
                    <div className="text-[#f5f0e8] font-bold text-lg">{featuredReviews[currentIndex].author}</div>
                    <div className="text-[#a0b4a0] text-sm uppercase tracking-widest">{featuredReviews[currentIndex].meta}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-4 md:absolute md:bottom-10 md:right-10">
              <button
                onClick={prevFeatured}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextFeatured}
                className="w-12 h-12 rounded-full bg-[#b07d3a] flex items-center justify-center text-white hover:bg-[#966a31] transition-colors shadow-lg"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-3 text-[#5a5a4a]">
            <Filter size={18} />
            <span className="text-sm font-bold uppercase tracking-widest">{tm.filterLabel}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {platforms.map(p => (
              <button
                key={p.id}
                onClick={() => setFilter(p.id)}
                className={cn(
                  "px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all border",
                  filter === p.id
                    ? "bg-[#2d4a2d] text-white border-[#2d4a2d] shadow-md"
                    : "bg-white text-[#5a5a4a] border-[#ddd6c8] hover:border-[#b07d3a]"
                )}
              >
                {p.name} <span className="opacity-50 ml-1">({p.count})</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white p-8 rounded-xl border border-[#e0d8c8] shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-[#b07d3a] text-[#b07d3a]" />)}
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 bg-[#f5f0e8] text-[#b07d3a] rounded-md border border-[#e0d8c8]">
                    {review.platform}
                  </span>
                </div>
                <p className="text-[#2c2c2c] font-light leading-relaxed mb-8 italic flex-grow">
                  "{review.quote}"
                </p>
                <div className="pt-6 border-t border-[#f5f0e8]">
                  <div className="text-sm font-bold text-[#2d4a2d]">{review.author}</div>
                  <div className="text-[11px] text-[#9a9a8a] uppercase tracking-wider mt-1">{review.meta}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-16 border-y border-[#ddd6c8]">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all">
          {platformsBase.map(p => (
            <div key={p.id} className="text-center">
              <div className="text-2xl font-display text-[#2d4a2d] mb-1">
                {p.score}<span className="text-sm text-[#9a9a8a]">/{p.id === 'Booking' ? '10' : '5'}</span>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#b07d3a]">{p.name}</div>
            </div>
          ))}
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
}